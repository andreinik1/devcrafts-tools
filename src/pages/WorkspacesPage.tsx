import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { ApiDataWorkspace } from '../components/workspaces/ApiDataWorkspace';
import { DesignAssetsWorkspace } from '../components/workspaces/DesignAssetsWorkspace';
import { FrontendSuiteWorkspace } from '../components/workspaces/FrontendSuiteWorkspace';
import { SeoMetaWorkspace } from '../components/workspaces/SeoMetaWorkspace';
import { SEOContent } from '../components/common/SEOContent';
import { FAQAccordion } from '../components/common/FAQAccordion';
import { AdSlot } from '../components/common/AdSlot';

export const WorkspacesPage: React.FC = () => {
    const { workspaceId } = useParams<{ workspaceId: string }>();
    const { t } = useLanguage();

    if (!workspaceId) {
        return <Navigate to="/" replace />;
    }

    const renderToolComponent = () => {
        switch (workspaceId) {
            case 'frontend':
                return <FrontendSuiteWorkspace />;
            case 'design':
                return <DesignAssetsWorkspace />;
            case 'api-data':
                return <ApiDataWorkspace />;
            case 'seo-meta':
                return <SeoMetaWorkspace />;
            default:
                return <Navigate to="/" replace />;
        }
    };

    const getWorkspaceSEOData = (workspaceId: string) => {
        switch (workspaceId) {
            case 'frontend':
                return {
                    title: t.frontendWorkspace.seoTitle,
                    paragraphs: [
                        t.frontendWorkspace.seoContent1,
                        t.frontendWorkspace.seoContent2,
                        t.frontendWorkspace.seoContent3,
                    ],
                    features: t.frontendWorkspace.features,
                    faq: t.frontendWorkspace.faq,
                };

            case 'design':
                return {
                    title: t.designWorkspace.seoTitle,
                    paragraphs: [
                        t.designWorkspace.seoContent1,
                        t.designWorkspace.seoContent2,
                        t.designWorkspace.seoContent3,
                    ],
                    features: t.designWorkspace.features,
                    faq: t.designWorkspace.faq,
                };

            case 'api':
                return {
                    title: t.apiWorkspace.seoTitle,
                    paragraphs: [
                        t.apiWorkspace.seoContent1,
                        t.apiWorkspace.seoContent2,
                        t.apiWorkspace.seoContent3,
                    ],
                    features: t.apiWorkspace.features,
                    faq: t.apiWorkspace.faq,
                };

            case 'seo':
                return {
                    title: t.seoWorkspace.seoTitle,
                    paragraphs: [
                        t.seoWorkspace.seoContent1,
                        t.seoWorkspace.seoContent2,
                        t.seoWorkspace.seoContent3,
                    ],
                    features: t.seoWorkspace.features,
                    faq: t.seoWorkspace.faq,
                };

            default:
                return {
                    title: 'Workspace Documentation',
                    paragraphs: [],
                    features: [],
                    faq: [],
                };
        }
    };

    const seoData = getWorkspaceSEOData(workspaceId);

    return (
        <div className="space-y-8">
            {/* Main Tool Component */}
            <div className="min-h-112.5]">{renderToolComponent()}</div>

            {/* SEO Article & Sidebar Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-3">
                    <SEOContent
                        title={seoData.title}
                        paragraphs={seoData.paragraphs}
                        features={seoData.features}
                    />

                    <FAQAccordion items={seoData.faq} />
                </div>

            </div>

            {/* In-Article AdSlot */}
            <AdSlot type="in-article" slotId="5566778899" />
        </div>
    );
};

