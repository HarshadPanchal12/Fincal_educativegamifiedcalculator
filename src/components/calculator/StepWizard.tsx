'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Input from '@/components/ui/Input';
import GlassCard from '@/components/ui/GlassCard';
import { calculateGoalPlanning } from '@/lib/calculations';
import { calculateFinancialHealth } from '@/lib/scoring';
import { useStore } from '@/store/useStore';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Target, Clock, TrendingUp, Sparkles, Brain, ChevronRight,
    ChevronLeft, Check, BookOpen, ArrowRight
} from 'lucide-react';
import InflationVisualizer from '@/components/education/InflationVisualizer';
import RiskSpectrum from '@/components/education/RiskSpectrum';
import ResultsDashboard from './ResultsDashboard';

const STEPS = [
    { id: 0, title: 'Set Your Dream', subtitle: 'What are you saving for?', icon: Target, color: '#224c87' },
    { id: 1, title: 'Choose Timeline', subtitle: 'When do you need it?', icon: Clock, color: '#1a3a66' },
    { id: 2, title: 'Pick Strategy', subtitle: 'How will you grow your money?', icon: TrendingUp, color: '#da3832' },
    { id: 3, title: 'Your Roadmap', subtitle: 'Here\'s your personalized plan', icon: Sparkles, color: '#059669' },
];

const schema = z.object({
    presentCost: z.number().min(1000, 'Min ₹1,000'),
    years: z.number().min(1, 'Min 1 year').max(50, 'Max 50 years'),
    inflation: z.number().min(0).max(20),
    expectedReturn: z.number().min(1).max(30),
    monthlyIncome: z.number().optional(),
});

type FormData = z.infer<typeof schema>;

interface StepWizardProps {
    onHealthChange?: (score: number) => void;
}

export default function StepWizard({ onHealthChange }: StepWizardProps) {
    const [results, setResults] = useState<any>(null);
    const [localHealth, setLocalHealth] = useState<any>(null);
    const [expandedLearn, setExpandedLearn] = useState<Record<number, boolean>>({});

    const {
        xp, level, achievements, isRealismMode, setRealismMode,
        currentStep, setStep, nextStep, prevStep,
        recordCalculation, unlockTerm, incrementLearnMore,
        savePlan, resetWizard
    } = useStore();

    const { register, handleSubmit, watch, setValue, formState: { errors }, getValues } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            presentCost: 500000,
            years: 10,
            inflation: 6,
            expectedReturn: 12,
        },
        mode: 'onChange',
    });

    const watchedValues = watch();

    useEffect(() => {
        if (isRealismMode) {
            setValue('inflation', 6);
            setValue('expectedReturn', 12);
        }
    }, [isRealismMode, setValue]);

    // Fix Bug: Reset wizard on unmount
    useEffect(() => {
        return () => {
            resetWizard();
        };
    }, [resetWizard]);

    const computeResults = () => {
        const data = getValues();
        const calculation = calculateGoalPlanning(data);
        const healthResult = calculateFinancialHealth({
            ...data,
            requiredSIP: calculation.requiredSIP,
        });
        setResults(calculation);
        setLocalHealth(healthResult);
        recordCalculation(data.years, healthResult.score);

        // Save detailed plan to persistent store
        savePlan({
            goalCost: data.presentCost,
            years: data.years,
            inflation: data.inflation,
            expectedReturn: data.expectedReturn,
            requiredSIP: calculation.requiredSIP,
            totalInvestment: calculation.totalInvestment,
            estimatedEarnings: calculation.estimatedEarnings,
            healthScore: healthResult.score,
        });

        if (onHealthChange) onHealthChange(healthResult.score);
    };

    const handleNext = () => {
        if (currentStep === 2) {
            computeResults();
        }
        nextStep();
        unlockTerm(currentStep === 0 ? 'Goal Planning' : currentStep === 1 ? 'Inflation' : 'Equity Returns');
    };

    const toggleLearnMore = (step: number) => {
        const isNowExpanded = !expandedLearn[step];
        setExpandedLearn(prev => ({ ...prev, [step]: isNowExpanded }));
        if (isNowExpanded) incrementLearnMore();
    };

    const learnMoreContent: Record<number, { title: string; body: string }> = {
        0: {
            title: 'Why Set a Goal Amount?',
            body: 'Without a clear target, saving becomes random. A specific goal (like ₹5L for a car or ₹20L for higher education) gives your money a purpose and helps calculate exactly how much to invest each month.'
        },
        1: {
            title: 'The Rule of 72',
            body: 'Divide 72 by the inflation rate to find how many years it takes for prices to double. At 6% inflation: 72÷6 = 12 years. So a ₹10L goal today will cost ₹20L in just 12 years!'
        },
        2: {
            title: 'Equity vs. Fixed Deposits',
            body: 'FDs give guaranteed ~6% but barely beat inflation. Equity mutual funds average 12-14% over 10+ years, but with volatility. The key insight: time reduces equity risk dramatically — over 15 years, equity has never given negative returns in India.'
        },
    };

    return (
        <div className="w-full max-w-3xl mx-auto">
            {/* Progress Bar */}
            <div className="step-indicator mb-10 px-4">
                {STEPS.map((step, idx) => (
                    <div key={step.id} className="contents">
                        <button
                            type="button"
                            onClick={() => idx <= (results ? 3 : currentStep) && setStep(idx)}
                            className={`step-dot ${idx === currentStep ? 'active' :
                                idx < currentStep || (idx === 3 && results) ? 'completed' : 'pending'
                                }`}
                        >
                            {idx < currentStep || (idx === 3 && results) ? (
                                <Check className="w-4 h-4" />
                            ) : (
                                idx + 1
                            )}
                        </button>
                        {idx < STEPS.length - 1 && (
                            <div className={`step-line ${idx < currentStep ? 'completed' : ''}`} />
                        )}
                    </div>
                ))}
            </div>

            {/* Step Title */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="text-center mb-8"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 mb-3">
                        {(() => { const Icon = STEPS[currentStep].icon; return <Icon className="w-4 h-4 text-primary" />; })()}
                        <span className="text-xs font-bold text-primary uppercase tracking-widest">
                            Step {currentStep + 1} of 4
                        </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-1">
                        {STEPS[currentStep].title}
                    </h2>
                    <p className="text-sm text-muted-foreground">{STEPS[currentStep].subtitle}</p>
                </motion.div>
            </AnimatePresence>

            {/* Step Content */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                    {/* STEP 0: Set Your Dream */}
                    {currentStep === 0 && (
                        <GlassCard className="p-8 space-y-6">
                            <Input
                                label="How much does your goal cost today?"
                                type="number"
                                prefix="₹"
                                placeholder="e.g. 5,00,000"
                                {...register('presentCost', { valueAsNumber: true })}
                                error={errors.presentCost?.message}
                                onFocus={() => unlockTerm('Goal Planning')}
                            />

                            <div className="grid grid-cols-3 gap-2">
                                {[500000, 1000000, 2500000].map(val => (
                                    <button
                                        key={val}
                                        type="button"
                                        onClick={() => setValue('presentCost', val)}
                                        className={`py-3 rounded-xl text-xs font-bold transition-all border-2 ${watchedValues.presentCost === val
                                            ? 'bg-primary border-primary text-white shadow-md'
                                            : 'bg-white border-slate-400 text-slate-800 hover:bg-slate-50 hover:border-slate-500'
                                            }`}
                                    >
                                        ₹{(val / 100000).toFixed(0)}L
                                    </button>
                                ))}
                            </div>

                            {/* Learn More */}
                            <LearnMoreBlock
                                step={0}
                                expanded={expandedLearn[0]}
                                onToggle={() => toggleLearnMore(0)}
                                content={learnMoreContent[0]}
                            />
                        </GlassCard>
                    )}

                    {/* STEP 1: Choose Timeline */}
                    {currentStep === 1 && (
                        <GlassCard className="p-8 space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-2">Years to goal</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            {...register('years', { valueAsNumber: true })}
                                            className="w-full bg-white border-2 border-slate-400 rounded-xl px-4 py-3.5 text-slate-900 font-bold focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-mono text-lg"
                                        />
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-xs uppercase">Yrs</span>
                                    </div>
                                    {errors.years && <p className="text-red-500 text-xs mt-1">{errors.years.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-2">Inflation rate (%)</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            step="0.1"
                                            disabled={isRealismMode}
                                            {...register('inflation', { valueAsNumber: true })}
                                            className="w-full bg-white border-2 border-slate-400 rounded-xl px-4 py-3.5 text-slate-900 font-bold focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all disabled:opacity-60 disabled:bg-slate-50 font-mono text-lg"
                                        />
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">%</span>
                                    </div>
                                    {errors.inflation && <p className="text-red-500 text-xs mt-1">{errors.inflation.message}</p>}
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-3 rounded-xl bg-primary/5 border border-primary/10">
                                <div className="flex items-center gap-2">
                                    <Brain className="w-4 h-4 text-primary" />
                                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Realism Mode</span>
                                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold">
                                        +50 XP
                                    </span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setRealismMode(!isRealismMode)}
                                    className={`w-11 h-6 rounded-full transition-colors flex items-center px-1 ${isRealismMode ? 'bg-primary' : 'bg-slate-300'}`}
                                >
                                    <motion.div
                                        animate={{ x: isRealismMode ? 20 : 0 }}
                                        className="w-4 h-4 bg-white rounded-full shadow"
                                    />
                                </button>
                            </div>

                            {/* Live inflation visualizer */}
                            <InflationVisualizer
                                presentCost={watchedValues.presentCost || 500000}
                                years={watchedValues.years || 10}
                                inflation={watchedValues.inflation || 6}
                            />

                            <LearnMoreBlock
                                step={1}
                                expanded={expandedLearn[1]}
                                onToggle={() => toggleLearnMore(1)}
                                content={learnMoreContent[1]}
                            />
                        </GlassCard>
                    )}

                    {/* STEP 2: Pick Strategy */}
                    {currentStep === 2 && (
                        <GlassCard className="p-8 space-y-6">
                            <div className="mb-6">
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-2">Expected annual returns (%)</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        step="0.1"
                                        disabled={isRealismMode}
                                        {...register('expectedReturn', { valueAsNumber: true })}
                                        className="w-full bg-white border-2 border-slate-400 rounded-xl px-4 py-3.5 text-slate-900 font-bold focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-mono text-lg"
                                        onFocus={() => unlockTerm('Equity Returns')}
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">%</span>
                                </div>
                                {errors.expectedReturn && <p className="text-red-500 text-xs mt-1">{errors.expectedReturn.message}</p>}
                            </div>

                            <RiskSpectrum
                                selectedReturn={watchedValues.expectedReturn || 12}
                                onSelect={(rate) => !isRealismMode && setValue('expectedReturn', rate)}
                            />

                            <LearnMoreBlock
                                step={2}
                                expanded={expandedLearn[2]}
                                onToggle={() => toggleLearnMore(2)}
                                content={learnMoreContent[2]}
                            />
                        </GlassCard>
                    )}

                    {/* STEP 3: Results Dashboard */}
                    {currentStep === 3 && results && localHealth && (
                        <ResultsDashboard
                            results={results}
                            health={localHealth}
                            watchedYears={watchedValues.years}
                            monthlySip={results.requiredSIP}
                        />
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            {currentStep < 3 && (
                <div className="flex justify-between items-center mt-8 px-2">
                    <button
                        type="button"
                        onClick={prevStep}
                        disabled={currentStep === 0}
                        className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors disabled:opacity-0"
                    >
                        <ChevronLeft className="w-4 h-4" /> Back
                    </button>

                    {/* XP Indicator */}
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/10">
                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            <span className="text-[10px] font-bold text-primary">
                                Lv.{level} • {xp} XP
                            </span>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleNext}
                        className="flex items-center gap-2 px-6 py-3 gradient-premium text-white font-bold rounded-xl shadow-lg hover:shadow-primary/30 transition-all active:scale-[0.97] animate-pulse-glow"
                    >
                        {currentStep === 2 ? (
                            <>Generate Plan <Sparkles className="w-4 h-4" /></>
                        ) : (
                            <>Continue <ChevronRight className="w-4 h-4" /></>
                        )}
                    </button>
                </div>
            )}

            {currentStep === 3 && results && (
                <div className="flex justify-center mt-8">
                    <button
                        type="button"
                        onClick={() => { setStep(0); setResults(null); setLocalHealth(null); }}
                        className="flex items-center gap-2 text-sm font-bold text-primary hover:underline"
                    >
                        <ArrowRight className="w-4 h-4" /> Plan Another Goal
                    </button>
                </div>
            )}
        </div>
    );
}

/* ─── Learn More Expandable ─── */
function LearnMoreBlock({
    step, expanded, onToggle, content
}: { step: number; expanded: boolean; onToggle: () => void; content: { title: string; body: string } }) {
    return (
        <div>
            <button
                type="button"
                onClick={onToggle}
                className="flex items-center gap-2 text-xs font-bold text-primary hover:underline group"
            >
                <BookOpen className="w-3.5 h-3.5" />
                {expanded ? 'Hide' : 'Learn More'}
                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-secondary/10 text-secondary font-bold">
                    +15 XP
                </span>
            </button>
            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="mt-3 p-4 rounded-xl bg-primary/5 border border-primary/10">
                            <h4 className="text-sm font-bold text-primary mb-1">{content.title}</h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                {content.body}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
