import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  Key,
  Copy,
  CheckCircle,
  AlertTriangle,
  Trash2,
  Clock,
  Shield,
  ShieldCheck,
  ShieldX,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────
interface DecodedJwt {
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
  signature: string;
}

// ─── Utilities ────────────────────────────────────────────────────────────────
function base64UrlDecode(str: string): string {
  let s = str.replace(/-/g, '+').replace(/_/g, '/');
  while (s.length % 4) s += '=';
  try {
    return decodeURIComponent(
      atob(s)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
  } catch {
    return atob(s);
  }
}

function decodeJwt(token: string): { result: DecodedJwt | null; error: string | null } {
  const parts = token.trim().split('.');
  if (parts.length !== 3) return { result: null, error: 'invalid_format' };
  try {
    const header = JSON.parse(base64UrlDecode(parts[0])) as Record<string, unknown>;
    const payload = JSON.parse(base64UrlDecode(parts[1])) as Record<string, unknown>;
    return { result: { header, payload, signature: parts[2] }, error: null };
  } catch {
    return { result: null, error: 'decode_error' };
  }
}

function formatTs(unix: number): string {
  return new Date(unix * 1000).toLocaleString();
}

function getExpiry(exp: number): { label: string; expired: boolean; delta: string } {
  const now = Math.floor(Date.now() / 1000);
  const diff = exp - now;
  const expired = diff < 0;
  const abs = Math.abs(diff);
  const d = Math.floor(abs / 86400);
  const h = Math.floor((abs % 86400) / 3600);
  const m = Math.floor((abs % 3600) / 60);
  const s = abs % 60;
  let delta = '';
  if (d > 0) delta = `${d}d ${h}h`;
  else if (h > 0) delta = `${h}h ${m}m`;
  else if (m > 0) delta = `${m}m ${s}s`;
  else delta = `${s}s`;
  return { label: delta, expired, delta };
}

// ─── Syntax Highlighter ───────────────────────────────────────────────────────
function SyntaxHighlight({ json }: { json: Record<string, unknown> }) {
  const lines = JSON.stringify(json, null, 2).split('\n');

  return (
    <pre className="text-[13px] leading-relaxed font-mono overflow-auto whitespace-pre-wrap break-all">
      {lines.map((line, i) => {
        // Key coloring
        const keyMatch = line.match(/^(\s*)("[\w:@\-]+")(\s*:\s*)(.*)$/);
        if (keyMatch) {
          const [, indent, key, colon, rest] = keyMatch;
          const isStr = rest.startsWith('"');
          const isNum = /^-?\d/.test(rest.replace(/[,\s]$/, ''));
          const isBool = /^(true|false)/.test(rest);
          const isNull = /^null/.test(rest);
          const valColor = isStr
            ? 'text-emerald-400'
            : isNum
            ? 'text-amber-400'
            : isBool
            ? 'text-blue-400'
            : isNull
            ? 'text-rose-400'
            : 'text-slate-300';
          return (
            <span key={i} className="block">
              {indent}
              <span className="text-cyan-400">{key}</span>
              <span className="text-slate-400">{colon}</span>
              <span className={valColor}>{rest}</span>
              {'\n'}
            </span>
          );
        }
        return (
          <span key={i} className="block text-slate-300">
            {line}
            {'\n'}
          </span>
        );
      })}
    </pre>
  );
}

// ─── Block Card ───────────────────────────────────────────────────────────────
function BlockCard({
  label,
  color,
  children,
  onCopy,
  copied,
  copyLabel,
  copiedLabel,
}: {
  label: string;
  color: string;
  children: React.ReactNode;
  onCopy: () => void;
  copied: boolean;
  copyLabel: string;
  copiedLabel: string;
}) {
  return (
    <div className={`rounded-2xl border ${color} bg-slate-950/70 overflow-hidden`}>
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-800/80">
        <span className="text-xs font-bold uppercase tracking-widest text-slate-400">{label}</span>
        <button
          type="button"
          onClick={onCopy}
          className="flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 transition-all text-slate-300 hover:text-white cursor-pointer"
        >
          {copied ? (
            <CheckCircle className="w-3 h-3 text-emerald-400" />
          ) : (
            <Copy className="w-3 h-3" />
          )}
          {copied ? copiedLabel : copyLabel}
        </button>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export const JwtDecoderTool: React.FC = () => {
  const { t } = useLanguage();
  const jt = t.jwtDecoderTool;

  const [input, setInput] = useState('');
  const [decoded, setDecoded] = useState<DecodedJwt | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedHeader, setCopiedHeader] = useState(false);
  const [copiedPayload, setCopiedPayload] = useState(false);

  const decode = useCallback((val: string) => {
    if (!val.trim()) {
      setDecoded(null);
      setError(null);
      return;
    }
    const { result, error: err } = decodeJwt(val);
    setDecoded(result);
    setError(err);
  }, []);

  useEffect(() => {
    decode(input);
  }, [input, decode]);

  const copy = (text: string, setCopied: (v: boolean) => void) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Expiry info
  const exp = decoded?.payload?.exp as number | undefined;
  const iat = decoded?.payload?.iat as number | undefined;
  const nbf = decoded?.payload?.nbf as number | undefined;
  const expiryInfo = exp ? getExpiry(exp) : null;

  const SAMPLE_JWT =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyXzEyMyIsIm5hbWUiOiJBbGljZSBKb25lcyIsInJvbGVzIjpbImFkbWluIiwiZWRpdG9yIl0sImlhdCI6MTcyODQwMDAwMCwiZXhwIjoxNzYwMDAwMDAwfQ.dummySignature';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="p-3 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/10 border border-amber-500/30 text-amber-500 dark:text-amber-400 w-fit">
          <Key className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            {jt.title}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{jt.subtitle}</p>
        </div>
      </div>

      {/* Client-Side Badge */}
      <div className="flex items-center gap-2 text-xs text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 px-3 py-1.5 rounded-xl w-fit">
        <ShieldCheck className="w-3.5 h-3.5" />
        <span>{t.common.clientSideNotice}</span>
      </div>

      {/* Input */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-5 space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            {jt.inputLabel}
          </label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setInput(SAMPLE_JWT)}
              className="text-[11px] font-semibold px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 transition-all cursor-pointer"
            >
              {jt.loadSample}
            </button>
            <button
              type="button"
              onClick={() => setInput('')}
              className="flex items-center gap-1 text-[11px] font-semibold px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-rose-500 transition-all cursor-pointer"
            >
              <Trash2 className="w-3 h-3" />
              {jt.clearBtn}
            </button>
          </div>
        </div>
        <textarea
          id="jwt-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={jt.inputPlaceholder}
          rows={4}
          spellCheck={false}
          className="w-full font-mono text-sm rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 px-4 py-3 resize-none outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 placeholder-slate-400 dark:placeholder-slate-600 transition-all"
        />
        {error && (
          <div className="flex items-center gap-2 text-xs text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/40 px-3 py-2 rounded-xl">
            <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
            <span>{error === 'invalid_format' ? jt.errorFormat : jt.errorDecode}</span>
          </div>
        )}
      </div>

      {/* Decoded Output */}
      {decoded && (
        <div className="space-y-4">
          {/* Token Validity Badge */}
          <div className="flex flex-wrap gap-3">
            {expiryInfo && (
              <div
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold ${
                  expiryInfo.expired
                    ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-700 text-rose-600 dark:text-rose-400'
                    : 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700 text-emerald-600 dark:text-emerald-400'
                }`}
              >
                {expiryInfo.expired ? <ShieldX className="w-3.5 h-3.5" /> : <Shield className="w-3.5 h-3.5" />}
                {expiryInfo.expired ? jt.statusExpired : jt.statusActive}
                <span className="opacity-70">
                  {expiryInfo.expired
                    ? `(${jt.expiredAgo} ${expiryInfo.delta})`
                    : `(${jt.expiresIn} ${expiryInfo.delta})`}
                </span>
              </div>
            )}
            {iat && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 text-xs text-slate-500 dark:text-slate-400">
                <Clock className="w-3.5 h-3.5" />
                {jt.issuedAt}: {formatTs(iat)}
              </div>
            )}
            {nbf && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 text-xs text-slate-500 dark:text-slate-400">
                <Clock className="w-3.5 h-3.5" />
                {jt.notBefore}: {formatTs(nbf)}
              </div>
            )}
            {exp && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 text-xs text-slate-500 dark:text-slate-400">
                <Clock className="w-3.5 h-3.5" />
                {jt.expiresAt}: {formatTs(exp)}
              </div>
            )}
          </div>

          {/* Header Block */}
          <BlockCard
            label={jt.headerLabel}
            color="border-cyan-500/30"
            onCopy={() => copy(JSON.stringify(decoded.header, null, 2), setCopiedHeader)}
            copied={copiedHeader}
            copyLabel={jt.copyHeader}
            copiedLabel={t.common.copied}
          >
            <SyntaxHighlight json={decoded.header} />
          </BlockCard>

          {/* Payload Block */}
          <BlockCard
            label={jt.payloadLabel}
            color="border-purple-500/30"
            onCopy={() => copy(JSON.stringify(decoded.payload, null, 2), setCopiedPayload)}
            copied={copiedPayload}
            copyLabel={jt.copyPayload}
            copiedLabel={t.common.copied}
          >
            <SyntaxHighlight json={decoded.payload} />
            {/* Timestamp parsing inside payload */}
            {(exp || iat || nbf) && (
              <div className="mt-4 pt-3 border-t border-slate-800/60 space-y-1.5">
                <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">{jt.parsedTimestamps}</p>
                {iat && <p className="text-xs text-slate-400"><span className="text-cyan-400">iat</span> → {formatTs(iat)}</p>}
                {nbf && <p className="text-xs text-slate-400"><span className="text-cyan-400">nbf</span> → {formatTs(nbf)}</p>}
                {exp && <p className="text-xs text-slate-400"><span className="text-cyan-400">exp</span> → {formatTs(exp)}</p>}
              </div>
            )}
          </BlockCard>

          {/* Signature Block */}
          <div className={`rounded-2xl border border-rose-500/30 bg-slate-950/70 overflow-hidden`}>
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-800/80">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">{jt.signatureLabel}</span>
              <span className="text-[11px] font-mono text-slate-500 px-2 py-0.5 rounded bg-slate-800">{jt.signatureNote}</span>
            </div>
            <div className="p-4">
              <p className="font-mono text-sm text-rose-400 break-all leading-relaxed">{decoded.signature}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
