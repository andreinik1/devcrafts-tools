import React from 'react';
import { Globe } from 'lucide-react';
import { WorkInProgressWorkspace } from './WorkInProgressWorkspace';

export const SeoMetaWorkspace: React.FC = () => {
    return (
        <WorkInProgressWorkspace
            badgeTitle="SEO & Meta"
            title="SEO & Social Meta Workspace"
            description="We are developing an advanced workspace for real-time OpenGraph image generation, social card previews, and meta tag validation."
            icon={Globe}
        />
    );
};