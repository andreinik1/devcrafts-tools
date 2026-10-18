import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, Layers, Image as ImageIcon, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';



export const DesignAssetsWorkspace: React.FC = () => {
    const { t } = useLanguage();
    // Получаем SEO и контентные данные из локализации для дизайн-воркспейса
    const seoData = {
        title: t.designWorkspace.seoTitle,
        paragraphs: [
            t.designWorkspace.seoContent1,
            t.designWorkspace.seoContent2,
            t.designWorkspace.seoContent3,
        ],
        features: t.designWorkspace.features,
        faq: t.designWorkspace.faq,
    };

    // Список инструментов, входящих в этот воркспейс
    const tools = [
        {
            name: t.nav.svgCleaner,
            path: '/tools/svg-cleaner',
            icon: Wrench,
            desc: t.toolsList.svgCleaner.desc,
            badge: 'SVG / XML',
        },
        {
            name: t.nav.cssShadow,
            path: '/tools/css-shadow-generator',
            icon: Layers,
            desc: t.toolsList.cssShadow.desc,
            badge: 'CSS / UI',
        },
        {
            name: t.nav.imageConverter,
            path: '/tools/image-converter',
            icon: ImageIcon,
            desc: t.toolsList.imageConverter.desc,
            badge: 'Raster / WebP',
        },
    ];

    return (
        <div className="mx-auto space-y-16">
            {/* Hero Section */}
            <div className="text-center space-y-4 max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-semibold uppercase tracking-wider">
                    Design & Assets Workspace
                </div>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                    {seoData.title}
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                    {seoData.paragraphs[0]} {seoData.paragraphs[1]}
                </p>
            </div>

            {/* Tools Grid (Карточки утилит) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {tools.map((tool) => {
                    const Icon = tool.icon;
                    return (
                        <Link
                            key={tool.path}
                            to={tool.path}
                            className="group relative flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-cyan-500/40 dark:hover:border-cyan-500/40 transition-all duration-300"
                        >
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                                        {tool.badge}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                                    {tool.name}
                                </h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 line-clamp-2">
                                    {tool.desc}
                                </p>
                            </div>
                            <div className="mt-6 flex items-center gap-1.5 text-sm font-semibold text-cyan-600 dark:text-cyan-400 group-hover:translate-x-1 transition-transform duration-200">
                                <span>Launch Tool</span>
                                <ArrowRight className="w-4 h-4" />
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};