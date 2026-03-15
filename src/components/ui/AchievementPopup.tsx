'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { Award, X } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';

export default function AchievementPopup() {
    const { notifications, popNotification } = useStore();
    const [currentMessage, setCurrentMessage] = useState<string | null>(null);

    useEffect(() => {
        if (notifications.length > 0 && !currentMessage) {
            setCurrentMessage(notifications[0]);
            const timer = setTimeout(() => {
                handleClose();
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [notifications, currentMessage]);

    const handleClose = () => {
        setCurrentMessage(null);
        popNotification();
    };

    return (
        <div className="fixed top-8 right-8 z-[100] pointer-events-none">
            <AnimatePresence>
                {currentMessage && (
                    <motion.div
                        initial={{ opacity: 0, x: 50, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                        className="pointer-events-auto"
                    >
                        <GlassCard className="p-4 shadow-2xl border-secondary/30 bg-secondary/10 min-w-[300px] relative overflow-hidden">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl gradient-secondary flex items-center justify-center shadow-lg animate-bounce">
                                    <Award className="w-8 h-8 text-white" />
                                </div>
                                <div className="pr-8">
                                    <p className="text-[10px] font-bold text-secondary uppercase tracking-widest">Notification</p>
                                    <p className="text-sm font-bold text-slate-800 dark:text-white leading-tight">
                                        {currentMessage}
                                    </p>
                                </div>
                                <button
                                    onClick={handleClose}
                                    className="absolute top-2 right-2 p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors"
                                >
                                    <X className="w-4 h-4 text-slate-400" />
                                </button>
                            </div>
                            {/* Animated Progress Bar */}
                            <motion.div
                                initial={{ width: "100%" }}
                                animate={{ width: "0%" }}
                                transition={{ duration: 5, ease: "linear" }}
                                className="absolute bottom-0 left-0 h-1 bg-secondary/50"
                            />
                        </GlassCard>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
