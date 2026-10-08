import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { AdSlot } from '../components/common/AdSlot';
import { Mail, Send, MessageSquare, Clock } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { t, showToast } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(t.contact.successToast);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Feedback & Support</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
          {t.contact.title}
        </h1>
        <p className="text-base text-slate-400 max-w-xl mx-auto">
          {t.contact.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Form */}
        <div className="md:col-span-2 p-6 sm:p-8 rounded-2xl bg-slate-900/40 border border-slate-800 backdrop-blur-md">
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-medium mb-1">{t.contact.nameLabel}</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-100 outline-none focus:border-cyan-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">{t.contact.emailLabel}</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-100 outline-none focus:border-cyan-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">{t.contact.subjectLabel}</label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-100 outline-none focus:border-cyan-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">{t.contact.messageLabel}</label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-slate-100 outline-none focus:border-cyan-500 text-sm resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/20 transition-all"
            >
              <Send className="w-4 h-4" />
              <span>{t.contact.sendBtn}</span>
            </button>
          </form>
        </div>

        {/* Sidebar info */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 font-bold text-slate-200 text-sm">
              <Mail className="w-4 h-4 text-cyan-400" />
              <span>{t.contact.contactInfoTitle}</span>
            </div>
            <p className="text-xs text-slate-400 font-mono bg-slate-950 p-3 rounded-xl border border-slate-800">
              {t.contact.emailDirect}
            </p>
            <div className="flex items-start gap-2 text-xs text-slate-400 pt-2 border-t border-slate-800/60">
              <Clock className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
              <span>{t.contact.responseNotice}</span>
            </div>
          </div>

          <AdSlot type="sidebar" slotId="3344556677" />
        </div>
      </div>
    </div>
  );
};
