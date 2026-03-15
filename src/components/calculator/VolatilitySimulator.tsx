'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { runHistoricalSimulation, SimulationSummary } from '@/lib/simulator';
import GlassCard from '@/components/ui/GlassCard';
import { TrendingUp, AlertTriangle, ShieldCheck, Play, RotateCcw, Clock } from 'lucide-react';
import { useStore } from '@/store/useStore';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

export default function VolatilitySimulator({ monthlySip = 5000 }: { monthlySip?: number }) {
    const [startYear, setStartYear] = useState(2010);
    const [duration, setDuration] = useState(5);
    const [simulation, setSimulation] = useState<SimulationSummary | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [hasStayedInvested, setHasStayedInvested] = useState(true);
    const { unlockAchievement, addXP } = useStore();

    const runTest = async () => {
        setIsLoading(true);
        try {
            const result = await runHistoricalSimulation(monthlySip, startYear, duration);
            setSimulation(result);

            // Educational Achievement
            if (result.chartData.some(d => d.isCrash)) {
                setTimeout(() => {
                    unlockAchievement('diamond_hands');
                    addXP(100);
                }, 3000);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const chartData = simulation ? {
        labels: simulation.chartData.map(d => d.date),
        datasets: [
            {
                label: 'Portfolio Value',
                data: simulation.chartData.map(d => d.value),
                borderColor: '#224c87',
                backgroundColor: 'rgba(34, 76, 135, 0.1)',
                fill: true,
                tension: 0.4,
                pointRadius: 0,
            },
            {
                label: 'Total Invested',
                data: simulation.chartData.map(d => d.invested),
                borderColor: '#919090',
                borderDash: [5, 5],
                fill: false,
                pointRadius: 0,
            }
        ]
    } : null;

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                mode: 'index' as const,
                intersect: false,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                titleColor: '#224c87',
                bodyColor: '#334155',
                borderColor: '#e2e8f0',
                borderWidth: 1,
            },
        },
        scales: {
            x: { display: false },
            y: {
                beginAtZero: true,
                ticks: {
                    callback: (value: any) => '₹' + (value / 1000) + 'k'
                }
            }
        },
        interaction: {
            intersect: false,
        },
    };

    return (
        <GlassCard className="p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Clock className="w-6 h-6 text-primary" />
                        SIP Time Machine
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1 text-left">
                        Backtest your SIP of <strong>₹{monthlySip.toLocaleString()}</strong> in actual historical markets.
                    </p>
                </div>

                <div className="flex gap-2">
                    <select
                        value={startYear}
                        onChange={(e) => setStartYear(Number(e.target.value))}
                        className="skeuo-flat px-4 py-2 text-sm font-bold bg-white dark:bg-slate-900 border-none rounded-lg focus:ring-2 ring-primary/20 outline-none"
                    >
                        <option value={2010}>Start in 2010</option>
                        <option value={2020}>Start in 2020 (Crash Test)</option>
                    </select>

                    <button
                        onClick={runTest}
                        disabled={isLoading}
                        className="gradient-premium text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 hover:shadow-lg transition-all active:scale-95 disabled:opacity-50"
                    >
                        {isLoading ? 'Simulating...' : <><Play className="w-4 h-4" /> Run Simulation</>}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 relative">
                    <div className="h-[300px] w-full">
                        {simulation ? (
                            <Line data={chartData!} options={options} />
                        ) : (
                            <div className="h-full w-full bg-slate-50 dark:bg-slate-900/50 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-slate-400 dark:border-slate-800">
                                <TrendingUp className="w-12 h-12 text-slate-300 mb-4" />
                                <p className="text-sm text-slate-400 font-medium">Select a period and run the Time Machine!</p>
                            </div>
                        )}
                    </div>

                    <AnimatePresence>
                        {simulation && simulation.chartData.some(d => d.isCrash) && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="absolute top-4 right-4"
                            >
                                <div className="bg-red-500 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 shadow-lg animate-pulse">
                                    <AlertTriangle className="w-3 h-3" /> Market Volatility Detected
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="space-y-4">
                    {simulation ? (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-4"
                        >
                            <GlassCard className="p-4 border-emerald-500/20 bg-emerald-500/5" hoverEffect={false}>
                                <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1">Final Wealth</p>
                                <p className="text-2xl font-black text-slate-800 dark:text-white">₹{simulation.finalValue.toLocaleString()}</p>
                                <p className="text-xs font-bold text-emerald-500 mt-1">+{simulation.growth}% Growth</p>
                            </GlassCard>

                            <GlassCard className="p-4" hoverEffect={false}>
                                <div className="flex justify-between items-center text-xs mb-2">
                                    <span className="text-slate-500">Total Invested</span>
                                    <span className="font-bold">₹{simulation.totalInvested.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-slate-500">Absolute Returns</span>
                                    <span className="font-bold text-primary">₹{simulation.absReturn.toLocaleString()}</span>
                                </div>
                            </GlassCard>

                            <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10">
                                <p className="text-xs font-bold text-primary flex items-center gap-1 mb-2">
                                    <ShieldCheck className="w-4 h-4" /> Investor Lesson
                                </p>
                                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-tight">
                                    {simulation.growth > 0
                                        ? "Even during historical crashes, staying invested helped capital recovery and growth. Time in the market is better than timing the market."
                                        : "Market cycles are natural. This period shows the importance of having a longer vision for wealth creation."}
                                </p>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="p-6 h-full flex flex-col justify-center gap-4 text-center">
                            <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                <AlertTriangle className="w-6 h-6 text-primary" />
                            </div>
                            <h4 className="font-bold text-sm">Why Backtest?</h4>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                Real markets don't give "linear 12% returns" every year.
                                Seeing historical volatility helps you build realistic expectations.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </GlassCard>
    );
}
