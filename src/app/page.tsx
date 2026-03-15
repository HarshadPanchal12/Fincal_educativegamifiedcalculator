import ThreeScene from '@/components/landing/ThreeScene';
import Hero from '@/components/landing/Hero';
import Link from 'next/link';
import { Rocket } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Interactive 3D Background */}
      <ThreeScene />

      {/* Content Layer */}
      <div className="relative z-10 w-full">
        <Hero />
      </div>

      {/* Mandatory Footer with Disclaimer */}
      <footer className="relative z-10 py-12 px-6 border-t border-slate-400 bg-white/50 backdrop-blur-md mt-20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm font-bold text-emerald-600 mb-4">HDFC MUTUAL FUND</p>
          <p className="text-xs text-slate-500 max-w-3xl mx-auto leading-relaxed">
            This tool has been designed for information purposes only. Actual results may vary depending on various factors involved in capital market.
            Mutual Fund investments are subject to market risks, read all scheme related documents carefully.
          </p>
          <div className="mt-8 pt-8 border-t border-slate-400 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              © 2026 Technex | FinCal Innovation Hackathon
            </div>
            <Link href="/showcase">
              <button className="text-[10px] font-black text-emerald-600 hover:text-emerald-700 transition-colors uppercase tracking-widest flex items-center gap-1.5 border border-emerald-200 px-3 py-1 rounded-full bg-emerald-50">
                <Rocket className="w-3 h-3" /> Project Presentation
              </button>
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
