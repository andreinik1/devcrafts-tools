import React from 'react';
import { Database } from 'lucide-react';
import { WorkInProgressWorkspace } from './WorkInProgressWorkspace';

export const ApiDataWorkspace: React.FC = () => {
    return (
        <WorkInProgressWorkspace
            badgeTitle="API & Data"
            title="API & Data Workspace"
            description="We are building a powerful environment for JSON formatting, instant TypeScript type generation, schema validation, and mock data utilities."
            icon={Database}
        />
    );
};