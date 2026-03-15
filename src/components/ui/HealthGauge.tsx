'use client';

import { motion } from 'framer-motion';

interface HealthGaugeProps {
    score: number;
    size?: number;
}

export default function HealthGauge({ score = 70, size = 160 }: HealthGaugeProps) {
    const getColor = (s: number) => {
        if (s >= 80) return '#224c87';
        if (s >= 60) return '#1a3a66';
        if (s >= 40) return '#919090';
        return '#da3832';
    };

    const getLabel = (s: number) => {
        if (s >= 85) return 'Excellent';
        if (s >= 65) return 'Good';
        if (s >= 40) return 'Fair';
        return 'Critical';
    };

    const radius = (size / 2) - 10;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (circumference * score) / 100;
    const color = getColor(score);
    const label = getLabel(score);

    return (
        <div className="relative flex flex-col items-center justify-center" style={{ width: size, height: size + 24 }}>
            <div className="relative" style={{ width: size, height: size }}>
                <svg className="w-full h-full transform -rotate-90">
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        stroke="currentColor"
                        strokeWidth="10"
                        fill="transparent"
                        className="text-slate-100 dark:text-slate-800"
                    />
                    <motion.circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        stroke={color}
                        strokeWidth="10"
                        fill="transparent"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset }}
                        transition={{ duration: 1.5, ease: 'easeOut' }}
                        strokeLinecap="round"
                    />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.span
                        key={score}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-4xl font-black"
                        style={{ color }}
                    >
                        {score}
                    </motion.span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Health</span>
                </div>

                {score < 40 && (
                    <motion.div
                        className="absolute inset-0 rounded-full border-2 border-red-500/20"
                        animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 0.6, repeat: Infinity }}
                    />
                )}
            </div>

            {/* Label badge */}
            <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest"
                style={{
                    background: `${color}10`,
                    color: color,
                    border: `1px solid ${color}22`,
                }}
            >
                {label}
            </motion.div>
        </div>
    );
}
