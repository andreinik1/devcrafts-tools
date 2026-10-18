import React from 'react';
import { Sparkles, Clock, ArrowLeft } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface WorkInProgressWorkspaceProps {
    title: string;
    description: string;
    badgeTitle: string;
    icon: LucideIcon;
}

export const WorkInProgressWorkspace: React.FC<WorkInProgressWorkspaceProps> = ({
    title,
    description,
    badgeTitle,
    icon: Icon,
}) => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-8 animate-in fade-in duration-300">
            {/* Статус-бейдж */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-semibold uppercase tracking-wider animate-pulse">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{badgeTitle} • Coming Soon</span>
            </div>

            {/* Заголовок и описание */}
            <div className="space-y-4 max-w-2xl mx-auto">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                    {title} is under construction 🚀
                </h1>
                <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                    {description}
                </p>
            </div>

            {/* Визуальная карточка-заглушка */}
            <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xl relative overflow-hidden">
                <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -left-12 -top-12 w-48 h-48 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-col items-center justify-center space-y-6 relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 text-cyan-500 dark:text-cyan-400 flex items-center justify-center shadow-inner">
                        <Icon className="w-8 h-8 animate-bounce" />
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-200/50 dark:border-slate-700">
                        <Clock className="w-4 h-4 text-cyan-500" />
                        <span>Expected in the upcoming release</span>
                    </div>

                    <div className="pt-2">
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-semibold text-xs transition-colors shadow-lg cursor-pointer"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span>Back to Tools Home</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};