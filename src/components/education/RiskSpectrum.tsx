'use client';

import { motion } from 'framer-motion';
import { Shield, TrendingUp, Flame, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

interface RiskSpectrumProps {
    selectedReturn: number;
    onSelect?: (rate: number) => void;
}

const SEGMENTS = [
    { label: 'Fixed Deposit', rate: 6, color: '#059669', icon: Shield, risk: 'Very Low', desc: 'Bank FDs give guaranteed ~6% returns. Safe but barely beats inflation.' },
    { label: 'Debt Funds', rate: 8, color: '#3b82f6', icon: Shield, risk: 'Low', desc: 'Government and corporate bonds. Stable returns with low volatility.' },
    { label: 'Balanced', rate: 10, color: '#f59e0b', icon: TrendingUp, risk: 'Medium', desc: 'Mix of equity & debt. Good for 5-7 year goals with moderate risk.' },
    { label: 'Equity (MF)', rate: 12, color: '#224c87', icon: TrendingUp, risk: 'High', desc: 'Nifty 50 average ~12% annually. Best for 7+ year goals.' },
    { label: 'Aggressive', rate: 15, color: '#da3832', icon: Flame, risk: 'Very High', desc: 'Small-cap, sectoral funds. Can give 15%+ but with severe volatility.' },
];

export default function RiskSpectrum({ selectedReturn, onSelect }: RiskSpectrumProps) {
    const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

    // Find closest segment
    const activeIdx = SEGMENTS.reduce((closest, seg, idx) => {
        return Math.abs(seg.rate - selectedReturn) < Math.abs(SEGMENTS[closest].rate - selectedReturn) ? idx : closest;
    }, 0);

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="w-4 h-4 text-slate-800" />
                <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest">Risk-Return Spectrum</span>
            </div>

            {/* Spectrum Bar */}
            <div className="relative pt-8 pb-4">
                <div className="flex h-12 rounded-2xl overflow-hidden border border-slate-400 dark:border-slate-700">
                    {SEGMENTS.map((seg, idx) => {
                        const Icon = seg.icon;
                        const isActive = idx === activeIdx;
                        const isHovered = idx === hoveredIdx;

                        return (
                            <button
                                key={seg.label}
                                type="button"
                                onMouseEnter={() => setHoveredIdx(idx)}
                                onMouseLeave={() => setHoveredIdx(null)}
                                onClick={() => onSelect?.(seg.rate)}
                                className="flex-1 relative transition-all duration-300 flex items-center justify-center gap-1"
                                style={{
                                    background: isActive ? seg.color : isHovered ? `${seg.color}22` : 'transparent',
                                    color: isActive ? 'white' : seg.color,
                                }}
                            >
                                <Icon className="w-3 h-3" />
                                <span className="text-[9px] font-bold uppercase tracking-tight hidden md:inline">
                                    {seg.rate}%
                                </span>
                                {isActive && (
                                    <motion.div
                                        layoutId="spectrum-indicator"
                                        className="absolute inset-0 rounded-xl"
                                        style={{ background: seg.color, zIndex: -1 }}
                                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                    />
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Labels */}
                <div className="flex justify-between mt-2 px-1">
                    <span className="text-[9px] text-emerald-600 font-bold">Safe</span>
                    <span className="text-[9px] text-amber-600 font-bold">Moderate</span>
                    <span className="text-[9px] text-red-600 font-bold">Aggressive</span>
                </div>
            </div>

            {/* Description Card */}
            <motion.div
                key={hoveredIdx ?? activeIdx}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-xl border text-xs leading-relaxed"
                style={{
                    borderColor: `${SEGMENTS[hoveredIdx ?? activeIdx].color}33`,
                    background: `${SEGMENTS[hoveredIdx ?? activeIdx].color}08`,
                }}
            >
                <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold" style={{ color: SEGMENTS[hoveredIdx ?? activeIdx].color }}>
                        {SEGMENTS[hoveredIdx ?? activeIdx].label}
                    </span>
                    <span className="text-[9px] px-2 py-0.5 rounded-full font-bold"
                        style={{
                            background: `${SEGMENTS[hoveredIdx ?? activeIdx].color}15`,
                            color: SEGMENTS[hoveredIdx ?? activeIdx].color,
                        }}
                    >
                        {SEGMENTS[hoveredIdx ?? activeIdx].risk} Risk
                    </span>
                </div>
                <p className="text-slate-500 dark:text-slate-400">
                    {SEGMENTS[hoveredIdx ?? activeIdx].desc}
                </p>
            </motion.div>
        </div>
    );
}
