'use client';

import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import { BookOpen, HelpCircle } from 'lucide-react';

interface TermCardProps {
    term: string;
    definition: string;
    onUnlock?: () => void;
}

export default function TermCard({ term, definition, onUnlock }: TermCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="w-full"
        >
            <GlassCard className="p-4 border-l-4 border-primary">
                <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <BookOpen className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                            {term}
                            <span className="text-[10px] bg-secondary/10 text-secondary px-2 py-0.5 rounded-full uppercase tracking-tighter">
                                +50 XP
                            </span>
                        </h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                            {definition}
                        </p>
                    </div>
                </div>
            </GlassCard>
        </motion.div>
    );
}
