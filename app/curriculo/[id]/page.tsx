import React from 'react';
import { App } from 'antd';
import CurriculumContainer from '@/components/CurriculumContainer';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function CurriculoPage({ params }: any) {
    // Await params in newer Next.js if necessary (Next 15 params might be async in server components)
    // For now assuming params is object as per simple usage or standard page props.
    // Correction: Next 15 params are async.
    const { id } = await params;

    return (
        <App>
            <CurriculumContainer prisonerId={id} />
        </App>
    );
}
