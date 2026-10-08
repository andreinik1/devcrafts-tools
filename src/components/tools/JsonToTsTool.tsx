import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { convertJsonToTsAndZod, type JsonToTsOptions } from '../../utils/jsonToTs';
import {
  FileCode2,
  Copy,
  Download,
  AlertCircle,
  CheckCircle2,
  Settings2,
  Sparkles,
  Code,
} from 'lucide-react';

const sampleJson = `{
  "id": "usr_9984",
  "name": "Alex Mercer",
  "email": "alex.mercer@devcraft.tools",
  "role": "Lead Architect",
  "isActive": true,
  "metrics": {
    "commits": 1420,
    "rating": 4.95
  },
  "tags": ["react", "typescript", "tailwind", "vite"]
}`;

export const JsonToTsTool: React.FC = () => {
  const { t, showToast } = useLanguage();
  const [inputJson, setInputJson] = useState<string>(sampleJson);
  const [activeOutputTab, setActiveOutputTab] = useState<'ts' | 'zod'>('ts');

  const [options, setOptions] = useState<JsonToTsOptions>({
    rootName: 'UserResponse',
    useInterface: true,
    exportTypes: true,
    makeOptional: false,
  });

  const [result, setResult] = useState(() => convertJsonToTsAndZod(sampleJson, options));

  useEffect(() => {
    setResult(convertJsonToTsAndZod(inputJson, options));
  }, [inputJson, options]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast(t.common.copied);
  };

  const downloadFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Typescript file downloaded!');
  };

  const currentOutput = activeOutputTab === 'ts' ? result.tsCode : result.zodCode;

  return (
    <div className="space-y-6">
      {/* Tool Header */}
      <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 backdrop-blur-md">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight flex items-center gap-3">
          <FileCode2 className="w-7 h-7 text-cyan-400" />
          {t.jsonToTsTool.title}
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          {t.jsonToTsTool.subtitle}
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Input JSON */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-semibold uppercase text-slate-400">
            <span>{t.jsonToTsTool.inputLabel}</span>
            {result.isValidJson ? (
              <span className="flex items-center gap-1 text-emerald-400 font-mono text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {t.jsonToTsTool.validJson}
              </span>
            ) : (
              <span className="flex items-center gap-1 text-rose-400 font-mono text-[11px]">
                <AlertCircle className="w-3.5 h-3.5" />
                {t.jsonToTsTool.invalidJson}
              </span>
            )}
          </div>

          <textarea
            value={inputJson}
            onChange={(e) => setInputJson(e.target.value)}
            rows={14}
            className={`w-full font-mono text-xs bg-slate-950 border rounded-xl p-4 text-slate-200 outline-none resize-none transition-colors ${
              result.isValidJson
                ? 'border-slate-800 focus:border-cyan-500/60'
                : 'border-rose-500/60 focus:border-rose-500'
            }`}
            placeholder='{ "key": "value" }'
          />

          {/* Config Controls */}
          <div className="p-5 rounded-2xl bg-slate-900/30 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <Settings2 className="w-4 h-4 text-cyan-400" />
              <span>Generator Options</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">{t.jsonToTsTool.rootTypeName}</label>
                <input
                  type="text"
                  value={options.rootName}
                  onChange={(e) => setOptions({ ...options, rootName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200 text-xs font-mono outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex flex-col justify-end space-y-2">
                <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={options.useInterface}
                    onChange={(e) => setOptions({ ...options, useInterface: e.target.checked })}
                    className="rounded border-slate-700 bg-slate-950 text-cyan-500"
                  />
                  <span>{t.jsonToTsTool.useInterface}</span>
                </label>

                <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={options.exportTypes}
                    onChange={(e) => setOptions({ ...options, exportTypes: e.target.checked })}
                    className="rounded border-slate-700 bg-slate-950 text-cyan-500"
                  />
                  <span>{t.jsonToTsTool.exportTypes}</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Output TypeScript / Zod */}
        <div className="space-y-4 flex flex-col justify-between">
          <div>
            {/* Output Tabs */}
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
              <button
                type="button"
                onClick={() => setActiveOutputTab('ts')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeOutputTab === 'ts'
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Code className="w-4 h-4" />
                <span>TypeScript Interfaces</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveOutputTab('zod')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeOutputTab === 'zod'
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Zod Schema</span>
              </button>
            </div>

            {/* Output Textarea */}
            <div className="mt-4 relative">
              <textarea
                readOnly
                value={currentOutput}
                rows={18}
                className="w-full font-mono text-xs bg-slate-950 border border-slate-800 rounded-xl p-4 text-cyan-300 outline-none resize-none select-all"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => copyToClipboard(currentOutput)}
              className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/20 transition-all"
            >
              <Copy className="w-4 h-4" />
              <span>{t.common.copy}</span>
            </button>

            <button
              type="button"
              onClick={() =>
                downloadFile(
                  currentOutput,
                  `${options.rootName || 'types'}.${activeOutputTab === 'zod' ? 'zod.ts' : 'ts'}`
                )
              }
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-200 font-semibold text-sm transition-all"
            >
              <Download className="w-4 h-4" />
              <span>{t.common.download}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
