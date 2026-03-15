'use client';

import StepWizard from './StepWizard';

export default function GoalForm({ onHealthChange }: { onHealthChange?: (score: number) => void }) {
    return <StepWizard onHealthChange={onHealthChange} />;
}
