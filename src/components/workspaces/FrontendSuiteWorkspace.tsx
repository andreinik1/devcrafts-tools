import React from 'react';
import { Code2 } from 'lucide-react';
import { WorkInProgressWorkspace } from './WorkInProgressWorkspace';

export const FrontendSuiteWorkspace: React.FC = () => {
    return (
        <WorkInProgressWorkspace
            badgeTitle="Frontend Suite"
            title="Frontend Suite Workspace"
            description="We are crafting an all-in-one suite for React, Vue, and Tailwind developers with unit converters, component layout helpers, and live CSS utilities."
            icon={Code2}
        />
    );
};