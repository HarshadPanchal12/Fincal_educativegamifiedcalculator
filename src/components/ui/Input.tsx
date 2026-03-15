'use client';

import { InputHTMLAttributes, forwardRef } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    prefix?: string;
    suffix?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, prefix, suffix, className, ...props }, ref) => {
        return (
            <div className="w-full space-y-2">
                {label && (
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-2 ml-1">
                        {label}
                    </label>
                )}
                <div className="relative group">
                    {prefix && (
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-700 font-bold">
                            {prefix}
                        </div>
                    )}
                    <input
                        {...props}
                        ref={ref}
                        className={cn(
                            "w-full bg-white border-2 border-slate-400 rounded-xl",
                            "focus:border-primary focus:ring-4 focus:ring-primary/10",
                            "text-slate-900 font-bold transition-all outline-none placeholder:font-normal placeholder:text-slate-400",
                            prefix ? "pl-10 pr-4 py-3.5" : suffix ? "pl-4 pr-16 py-3.5" : "px-4 py-3.5",
                            error ? "border-red-500 focus:border-red-500 focus:ring-red-100" : "",
                            className
                        )}
                    />
                    {suffix && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-bold uppercase tracking-wider">
                            {suffix}
                        </div>
                    )}
                </div>
                {error && (
                    <p className="text-xs text-red-500 font-medium ml-1">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";

export default Input;
