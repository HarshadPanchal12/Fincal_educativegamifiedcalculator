'use client';

import { ReactNode } from 'react';
import { HTMLMotionProps, motion } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface GlassCardProps extends HTMLMotionProps<'div'> {
    children: React.ReactNode;
    hoverEffect?: boolean;
}

export default function GlassCard({
    children,
    className = '',
    hoverEffect = true,
    ...props
}: GlassCardProps) {
    return (
        <motion.div
            whileHover={hoverEffect ? { y: -5, scale: 1.01 } : {}}
            className={cn(
                "glass p-6 relative overflow-hidden group transition-all duration-300",
                className
            )}
            {...props}
        >
            {/* Decorative gradient blur */}
            <div className="absolute -top-12 -right-12 w-24 h-24 bg-primary/10 rounded-full blur-2xl transition-all group-hover:scale-150" />
            <div className="absolute -bottom-12 -left-12 w-24 h-24 bg-secondary/10 rounded-full blur-2xl transition-all group-hover:scale-150" />

            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    );
}
