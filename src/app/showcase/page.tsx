// app/showcase/page.tsx
"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  Code,
  Cpu,
  Database,
  FileText,
  Gamepad2,
  Globe,
  GraduationCap,
  Heart,
  Layers,
  Layout,
  Lightbulb,
  Monitor,
  Package,
  Palette,
  Rocket,
  Server,
  Settings,
  Shield,
  Sparkles,
  Target,
  Terminal,
  Timer,
  Trophy,
  TrendingUp,
  Users,
  Zap,
  Calculator,
  BarChart3,
  Brain,
  Clock,
  Flame,
  Award,
  ChevronRight,
  ExternalLink,
  Github,
  Play,
  Star,
  Check,
  AlertTriangle,
  Info,
  ArrowRight,
  Hash,
  Boxes,
  FolderTree,
  Workflow,
  TestTube,
  Gauge,
  Map,
  GitPullRequest,
  Scale,
  HandHeart,
  CreditCard,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// ─── ANIMATION VARIANTS ───────────────────────────────────────────────────────

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as any } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

const slideIn = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

// ─── TABLE OF CONTENTS DATA ───────────────────────────────────────────────────

const tocItems = [
  { id: "overview", label: "Project Overview", icon: BookOpen, num: "1" },
  { id: "problem", label: "Problem Statement", icon: AlertTriangle, num: "2" },
  { id: "solution", label: "Solution Architecture", icon: Layers, num: "3" },
  { id: "tech-stack", label: "Technology Stack", icon: Cpu, num: "4" },
  { id: "project-structure", label: "Project Structure", icon: FolderTree, num: "5" },
  { id: "features", label: "Core Features", icon: Sparkles, num: "6" },
  { id: "system-design", label: "System Design", icon: Workflow, num: "7" },
  { id: "installation", label: "Installation", icon: Terminal, num: "8" },
  { id: "deployment", label: "Deployment", icon: Rocket, num: "9" },
  { id: "configuration", label: "Configuration", icon: Settings, num: "10" },
  { id: "financial-logic", label: "Financial Logic", icon: Calculator, num: "11" },
  { id: "gamification", label: "Gamification Engine", icon: Gamepad2, num: "12" },
  { id: "ui-ux", label: "UI/UX Design", icon: Palette, num: "13" },
  { id: "api-reference", label: "API Reference", icon: Code, num: "14" },
  { id: "testing", label: "Testing Strategy", icon: TestTube, num: "15" },
  { id: "performance", label: "Performance", icon: Gauge, num: "16" },
  { id: "roadmap", label: "Future Roadmap", icon: Map, num: "17" },
  { id: "contributing", label: "Contributing", icon: GitPullRequest, num: "18" },
  { id: "license", label: "License", icon: Scale, num: "19" },
  { id: "acknowledgements", label: "Acknowledgements", icon: HandHeart, num: "20" },
];

// ─── REUSABLE COMPONENTS ──────────────────────────────────────────────────────

function SectionHeader({
  id,
  num,
  title,
  icon: Icon,
  gradient = "from-purple-400 to-cyan-400",
}: {
  id: string;
  num: string;
  title: string;
  icon: any;
  gradient?: string;
}) {
  return (
    <motion.div id={id} className="scroll-mt-24 mb-8" variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
      <div className="flex items-center gap-4">
        <div className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} shadow-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <span className="text-sm font-mono text-purple-400">Section {num}</span>
          <h2 className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>{title}</h2>
        </div>
      </div>
      <div className={`mt-4 h-1 w-32 rounded-full bg-gradient-to-r ${gradient}`} />
    </motion.div>
  );
}

function CodeBlock({ children, title }: { children: string; title?: string }) {
  return (
    <div className="my-6 rounded-xl border border-gray-700/50 overflow-hidden bg-[#0d1117]">
      {title && (
        <div className="px-4 py-2 bg-gray-800/80 border-b border-gray-700/50 flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-xs text-gray-400 font-mono ml-2">{title}</span>
        </div>
      )}
      <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
        <code className="text-gray-300 font-mono whitespace-pre">{children}</code>
      </pre>
    </div>
  );
}

function InfoCard({
  icon: Icon,
  title,
  description,
  color = "purple",
}: {
  icon: any;
  title: string;
  description: string;
  color?: string;
}) {
  const colors: Record<string, string> = {
    purple: "from-purple-500/20 to-purple-600/5 border-purple-500/30",
    cyan: "from-cyan-500/20 to-cyan-600/5 border-cyan-500/30",
    amber: "from-amber-500/20 to-amber-600/5 border-amber-500/30",
    green: "from-green-500/20 to-green-600/5 border-green-500/30",
    red: "from-red-500/20 to-red-600/5 border-red-500/30",
  };
  const iconColors: Record<string, string> = {
    purple: "text-purple-400",
    cyan: "text-cyan-400",
    amber: "text-amber-400",
    green: "text-green-400",
    red: "text-red-400",
  };

  return (
    <div className={`rounded-xl border bg-gradient-to-br ${colors[color]} p-5`}>
      <Icon className={`w-6 h-6 ${iconColors[color]} mb-3`} />
      <h4 className="font-semibold text-white mb-1">{title}</h4>
      <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
}

function DataTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="my-6 overflow-x-auto rounded-xl border border-gray-700/50">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-800/60">
            {headers.map((h, i) => (
              <th key={i} className="px-4 py-3 text-left font-semibold text-purple-300 border-b border-gray-700/50">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={`${i % 2 === 0 ? "bg-gray-900/30" : "bg-gray-800/20"} hover:bg-gray-700/20 transition-colors`}>
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-gray-300 border-b border-gray-700/30">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Badge({ children, color = "purple" }: { children: React.ReactNode; color?: string }) {
  const colors: Record<string, string> = {
    purple: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    cyan: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
    amber: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    green: "bg-green-500/20 text-green-300 border-green-500/30",
    red: "bg-red-500/20 text-red-300 border-red-500/30",
  };
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors[color]}`}>{children}</span>;
}

function StepCard({ step, title, description, xp, items }: { step: number; title: string; description: string; xp: string; items: string[] }) {
  return (
    <div className="relative rounded-xl border border-gray-700/50 bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-6 hover:border-purple-500/40 transition-all duration-300">
      <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm shadow-lg">
        {step}
      </div>
      <div className="ml-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold text-white">{title}</h4>
          <Badge color="amber">{xp}</Badge>
        </div>
        <p className="text-sm text-gray-400 mb-3">{description}</p>
        <ul className="space-y-1">
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
              <ChevronRight className="w-3 h-3 text-purple-400 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function DiagramBox({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-lg border border-gray-600/50 bg-gray-800/50 p-4 text-center text-sm text-gray-300 ${className}`}>{children}</div>;
}

// ─── MAIN PAGE COMPONENT ─────────────────────────────────────────────────────

export default function ShowcasePage() {
  const [tocOpen, setTocOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-100">
      {/* ─── HERO SECTION ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-40 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-6 pt-32 pb-20">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 mb-8">
              <FileText className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-300">Complete Project Documentation</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">FinCal</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-4">Educative Gamified Financial Calculator</p>
            <p className="text-base text-gray-500 max-w-2xl mx-auto mb-10">
              A premium, gamified financial planning application that transforms the traditional experience of financial planning into an interactive,
              educational, and rewarding journey.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://github.com/HarshadPanchal12/Fincal_educativegamifiedcalculator"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-800 border border-gray-700 hover:border-gray-600 text-white font-medium transition-all"
              >
                <Github className="w-5 h-5" />
                View on GitHub
                <ExternalLink className="w-4 h-4 opacity-50" />
              </a>
              <Link
                href="/calculator"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-medium hover:opacity-90 transition-all shadow-lg shadow-purple-500/25"
              >
                <Play className="w-5 h-5" />
                Try FinCal Live
              </Link>
            </div>

            {/* Quick stats */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {[
                { label: "Framework", value: "Next.js 15", icon: Layers },
                { label: "3D Graphics", value: "Three.js", icon: Boxes },
                { label: "Auth", value: "Clerk", icon: Shield },
                { label: "Hackathon", value: "Technex 2026", icon: Trophy },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="rounded-xl border border-gray-700/50 bg-gray-800/30 p-4"
                >
                  <stat.icon className="w-5 h-5 text-purple-400 mb-2 mx-auto" />
                  <div className="text-lg font-semibold text-white">{stat.value}</div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── STICKY TOC (Mobile Toggle) ────────────────────────────────── */}
      <div className="sticky top-0 z-50 bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-gray-800/50">
        <div className="max-w-6xl mx-auto px-6">
          <button onClick={() => setTocOpen(!tocOpen)} className="w-full py-3 flex items-center justify-between text-sm text-gray-400 lg:hidden">
            <span className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Table of Contents
            </span>
            <ChevronRight className={`w-4 h-4 transition-transform ${tocOpen ? "rotate-90" : ""}`} />
          </button>
          <nav className={`${tocOpen ? "block" : "hidden"} lg:block py-3 overflow-x-auto`}>
            <div className="flex gap-1 min-w-max">
              {tocItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setTocOpen(false)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-gray-400 hover:text-purple-300 hover:bg-purple-500/10 transition-all whitespace-nowrap"
                >
                  <span className="text-purple-500/60 font-mono">{item.num}.</span>
                  {item.label}
                </a>
              ))}
            </div>
          </nav>
        </div>
      </div>

      {/* ─── MAIN CONTENT ──────────────────────────────────────────────── */}
      <main className="max-w-5xl mx-auto px-6 py-16 space-y-32">
        {/* ═══════ SECTION 1: PROJECT OVERVIEW ═══════ */}
        <section>
          <SectionHeader id="overview" num="1" title="Project Overview" icon={BookOpen} />

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-6">
            <motion.div variants={fadeIn} className="rounded-xl border border-purple-500/20 bg-gradient-to-br from-purple-900/20 to-transparent p-6">
              <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-400" />
                What is FinCal?
              </h3>
              <p className="text-gray-300 leading-relaxed">
                <strong className="text-white">FinCal</strong> (Financial Calculator) is a premium, gamified financial planning application built for the{" "}
                <strong className="text-purple-300">Technex Innovation Hackathon 2026</strong>. It reimagines how people interact with financial
                calculators by transforming a traditionally static, intimidating experience into an{" "}
                <em className="text-cyan-300">interactive, educational, and rewarding journey</em>.
              </p>
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="rounded-xl border border-cyan-500/20 bg-gradient-to-r from-cyan-900/10 to-purple-900/10 p-6"
            >
              <h4 className="text-lg font-semibold text-cyan-300 mb-2 flex items-center gap-2">
                <Target className="w-5 h-5" />
                Vision
              </h4>
              <blockquote className="text-lg italic text-gray-300 border-l-4 border-cyan-500/50 pl-4">
                &ldquo;Users should not just calculate numbers — they should understand their financial path.&rdquo;
              </blockquote>
            </motion.div>

            <motion.div variants={fadeIn}>
              <h3 className="text-xl font-semibold text-white mb-4">Key Differentiators</h3>
              <DataTable
                headers={["Traditional Calculators", "FinCal"]}
                rows={[
                  ["Static input → output", "Guided 4-step wizard with education"],
                  ["No context for assumptions", "Financial Health Gauge audits inputs"],
                  ["No engagement or retention", "XP, badges, levels, leaderboards"],
                  ["Flat 2D interfaces", "3D visualizations, premium animations"],
                  ["Ignores inflation impact", "Live Inflation Visualizer built in"],
                  ["No risk education", "Market volatility simulator (SIP Time Machine)"],
                ]}
              />
            </motion.div>

            <motion.div variants={fadeIn}>
              <h3 className="text-xl font-semibold text-white mb-4">At a Glance</h3>
              <DataTable
                headers={["Property", "Value"]}
                rows={[
                  ["Type", "Web Application (Progressive)"],
                  ["Framework", "Next.js 15 (App Router)"],
                  ["Target Users", "Young professionals, students, first-time investors"],
                  ["Hackathon", "Technex Innovation Hackathon 2026"],
                  ["Repository", "github.com/HarshadPanchal12/Fincal_educativegamifiedcalculator"],
                ]}
              />
            </motion.div>
          </motion.div>
        </section>

        {/* ═══════ SECTION 2: PROBLEM STATEMENT ═══════ */}
        <section>
          <SectionHeader id="problem" num="2" title="Problem Statement & Motivation" icon={AlertTriangle} gradient="from-red-400 to-amber-400" />

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-6">
            <motion.p variants={fadeIn} className="text-gray-300 leading-relaxed text-lg">
              Financial literacy remains one of the most critical gaps in modern education. Despite the availability of hundreds of financial calculators
              online, <strong className="text-white">three fundamental problems persist:</strong>
            </motion.p>

            <motion.div variants={fadeIn} className="grid md:grid-cols-3 gap-6">
              <InfoCard
                icon={TrendingUp}
                title="Unrealistic Assumptions"
                description="Users routinely input irrational parameters — such as expecting 25% annualized returns — because they have no contextual education about how markets actually perform."
                color="red"
              />
              <InfoCard
                icon={CreditCard}
                title="Inflation Blindness"
                description='Most calculators show a "future value" number without explaining what it actually buys in 20 years. Users confuse nominal value with real purchasing power.'
                color="amber"
              />
              <InfoCard
                icon={Users}
                title="Zero Engagement"
                description='Traditional calculators are "use-once-and-forget" tools. There is no incentive to return, no reward for learning, and no mechanism to track progress.'
                color="purple"
              />
            </motion.div>

            <motion.div variants={fadeIn} className="rounded-xl border border-green-500/20 bg-green-900/10 p-6">
              <h4 className="text-lg font-semibold text-green-300 mb-3 flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                The Motivation
              </h4>
              <p className="text-gray-300 leading-relaxed">
                FinCal was born from a simple observation:{" "}
                <strong className="text-white">the best financial calculator is one that teaches you why the numbers matter.</strong> By combining{" "}
                <Badge color="cyan">Education</Badge> <Badge color="green">Realism</Badge> <Badge color="amber">Gamification</Badge> — we create a tool
                that users <em>want</em> to come back to, not one they <em>have</em> to use.
              </p>
            </motion.div>
          </motion.div>
        </section>

        {/* ═══════ SECTION 3: SOLUTION ARCHITECTURE ═══════ */}
        <section>
          <SectionHeader id="solution" num="3" title="Solution Architecture" icon={Layers} gradient="from-cyan-400 to-blue-400" />

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-8">
            <motion.div variants={fadeIn}>
              <h3 className="text-xl font-semibold text-white mb-6">High-Level Architecture</h3>
              <div className="rounded-xl border border-gray-700/50 bg-gray-800/20 p-8">
                <div className="space-y-6">
                  {/* Client Layer */}
                  <div className="rounded-lg border border-cyan-500/30 bg-cyan-900/10 p-4">
                    <h4 className="text-sm font-semibold text-cyan-300 mb-3">CLIENT (Browser)</h4>
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <DiagramBox>
                        <Layers className="w-4 h-4 mx-auto mb-1 text-purple-400" />
                        Next.js 15<br />
                        <span className="text-xs text-gray-500">App Router</span>
                      </DiagramBox>
                      <DiagramBox>
                        <Boxes className="w-4 h-4 mx-auto mb-1 text-cyan-400" />
                        React Three Fiber<br />
                        <span className="text-xs text-gray-500">3D Graphics</span>
                      </DiagramBox>
                      <DiagramBox>
                        <Sparkles className="w-4 h-4 mx-auto mb-1 text-amber-400" />
                        Framer Motion<br />
                        <span className="text-xs text-gray-500">Animations</span>
                      </DiagramBox>
                    </div>
                    {/* State Layer */}
                    <div className="rounded-lg border border-purple-500/30 bg-purple-900/10 p-3">
                      <h5 className="text-xs font-semibold text-purple-300 mb-2">Zustand State Management</h5>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="text-xs text-center text-gray-400 bg-gray-800/50 rounded p-2">
                          🎮 GameState<br />
                          <span className="text-gray-600">(XP, Badges, Level)</span>
                        </div>
                        <div className="text-xs text-center text-gray-400 bg-gray-800/50 rounded p-2">
                          📊 PlanState<br />
                          <span className="text-gray-600">(Plans, Calcs)</span>
                        </div>
                        <div className="text-xs text-center text-gray-400 bg-gray-800/50 rounded p-2">
                          🎨 UIState<br />
                          <span className="text-gray-600">(Theme, Steps)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex justify-center">
                    <div className="flex flex-col items-center gap-1 text-gray-500">
                      <div className="w-px h-6 bg-gray-600" />
                      <span className="text-xs">localStorage + Clerk</span>
                      <div className="w-px h-6 bg-gray-600" />
                    </div>
                  </div>

                  {/* Infra Layer */}
                  <div className="grid grid-cols-2 gap-4">
                    <DiagramBox>
                      <Database className="w-4 h-4 mx-auto mb-1 text-green-400" />
                      LocalStorage<br />
                      <span className="text-xs text-gray-500">Persistence Layer</span>
                    </DiagramBox>
                    <DiagramBox>
                      <Server className="w-4 h-4 mx-auto mb-1 text-blue-400" />
                      Render<br />
                      <span className="text-xs text-gray-500">Hosting</span>
                    </DiagramBox>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeIn}>
              <h3 className="text-xl font-semibold text-white mb-4">Architecture Decisions</h3>
              <DataTable
                headers={["Decision", "Rationale"]}
                rows={[
                  ["Next.js 15 App Router", "Server Components for performance, file-based routing for maintainability"],
                  ["Client-side calculations", "Zero latency for financial computations; no server round-trips needed"],
                  ["Zustand over Redux", "Minimal boilerplate, built-in persistence middleware, perfect for medium-scale state"],
                  ["Three.js via R3F", "Declarative 3D in React; enables the signature spinning coin"],
                  ["Framer Motion", "Production-grade animations with layout animation support"],
                  ["Clerk Auth", "Enterprise-grade authentication with minimal integration overhead"],
                  ["LocalStorage persistence", "Offline-first approach; no database dependency for core functionality"],
                ]}
              />
            </motion.div>
          </motion.div>
        </section>

        {/* ═══════ SECTION 4: TECH STACK ═══════ */}
        <section>
          <SectionHeader id="tech-stack" num="4" title="Technology Stack" icon={Cpu} gradient="from-green-400 to-emerald-400" />

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-8">
            <motion.div variants={fadeIn} className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "Next.js 15", desc: "Framework", icon: Globe, color: "border-white/20" },
                { name: "TypeScript", desc: "Language", icon: Code, color: "border-blue-500/30" },
                { name: "Tailwind CSS", desc: "Styling", icon: Palette, color: "border-cyan-500/30" },
                { name: "Three.js", desc: "3D Graphics", icon: Boxes, color: "border-green-500/30" },
                { name: "Framer Motion", desc: "Animations", icon: Sparkles, color: "border-purple-500/30" },
                { name: "Zustand", desc: "State Mgmt", icon: Database, color: "border-amber-500/30" },
                { name: "Clerk", desc: "Auth", icon: Shield, color: "border-indigo-500/30" },
                { name: "Recharts", desc: "Charts", icon: BarChart3, color: "border-pink-500/30" },
              ].map((tech, i) => (
                <motion.div
                  key={i}
                  variants={fadeIn}
                  className={`rounded-xl border ${tech.color} bg-gray-800/30 p-4 text-center hover:bg-gray-800/50 transition-all`}
                >
                  <tech.icon className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  <div className="font-semibold text-white text-sm">{tech.name}</div>
                  <div className="text-xs text-gray-500">{tech.desc}</div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={fadeIn}>
              <h3 className="text-xl font-semibold text-white mb-4">Production Dependencies</h3>
              <DataTable
                headers={["Package", "Version", "Purpose"]}
                rows={[
                  ["next", "15.x", "React meta-framework with SSR/SSG"],
                  ["react", "19.x", "UI component library"],
                  ["three", "^0.170", "3D WebGL rendering engine"],
                  ["@react-three/fiber", "^9.x", "React reconciler for Three.js"],
                  ["@react-three/drei", "^10.x", "Useful helpers for R3F"],
                  ["framer-motion", "^12.x", "Animation library for React"],
                  ["zustand", "^5.x", "Lightweight state management"],
                  ["recharts", "^2.x", "Composable charting library"],
                  ["@clerk/nextjs", "^6.x", "Authentication & user management"],
                  ["tailwindcss", "^4.x", "Utility-first CSS framework"],
                  ["lucide-react", "^0.47x", "Icon library"],
                ]}
              />
            </motion.div>
          </motion.div>
        </section>

        {/* ═══════ SECTION 5: PROJECT STRUCTURE ═══════ */}
        <section>
          <SectionHeader id="project-structure" num="5" title="Project Structure" icon={FolderTree} gradient="from-amber-400 to-orange-400" />

          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <CodeBlock title="Fincal_educativegamifiedcalculator/">{`Fincal_educativegamifiedcalculator/
│
├── 📁 app/                          # Next.js App Router (Pages)
│   ├── layout.tsx                   # Root layout (fonts, providers, metadata)
│   ├── page.tsx                     # Landing / Home page
│   ├── globals.css                  # Global styles + Tailwind directives
│   │
│   ├── 📁 calculator/
│   │   └── page.tsx                 # Main calculator wizard (4-step flow)
│   │
│   ├── 📁 dashboard/
│   │   └── page.tsx                 # User dashboard (saved plans, progress)
│   │
│   ├── 📁 gamification/
│   │   └── page.tsx                 # Gamification hub (XP, badges, leaderboard)
│   │
│   ├── 📁 sip-time-machine/
│   │   └── page.tsx                 # SIP market volatility simulator
│   │
│   ├── 📁 showcase/
│   │   └── page.tsx                 # Documentation & showcase (this page)
│   │
│   ├── 📁 sign-in/[[...sign-in]]/
│   │   └── page.tsx                 # Clerk sign-in page
│   │
│   └── 📁 sign-up/[[...sign-up]]/
│       └── page.tsx                 # Clerk sign-up page
│
├── 📁 components/                   # Reusable React components
│   ├── 📁 ui/                       # Primitive UI components
│   ├── 📁 three/                    # Three.js / R3F components
│   ├── Navbar.tsx                   # Top navigation bar
│   ├── HeroSection.tsx              # Landing page hero
│   ├── FinancialHealthGauge.tsx     # Animated input-audit gauge
│   ├── InflationVisualizer.tsx      # Real-time inflation chart
│   └── ...more components
│
├── 📁 lib/                          # Utility functions & business logic
│   ├── calculations.ts             # All financial formulas
│   ├── gamification.ts             # XP, leveling, badge logic
│   └── utils.ts                    # General utilities
│
├── 📁 store/                        # Zustand state stores
│   ├── useGameStore.ts             # Gamification state
│   └── usePlanStore.ts             # Financial plans state
│
├── 📄 render.yaml                   # Render deployment config
├── 📄 next.config.ts                # Next.js configuration
├── 📄 tailwind.config.ts            # Tailwind CSS configuration
├── 📄 tsconfig.json                 # TypeScript configuration
└── 📄 package.json                  # Dependencies & scripts`}</CodeBlock>

            <DataTable
              headers={["Directory", "Responsibility", "Design Principle"]}
              rows={[
                ["app/", "Routing & page composition", "Each route = one feature"],
                ["components/", "Reusable, presentational", "Stateless where possible"],
                ["components/ui/", "Design system primitives", "shadcn/ui inspired"],
                ["components/three/", "WebGL/3D components", "Isolated from 2D UI"],
                ["lib/", "Pure business logic", "Zero UI dependencies"],
                ["store/", "Application state", "Single source of truth"],
              ]}
            />
          </motion.div>
        </section>

        {/* ═══════ SECTION 6: CORE FEATURES ═══════ */}
        <section>
          <SectionHeader id="features" num="6" title="Core Features — Detailed Breakdown" icon={Sparkles} gradient="from-pink-400 to-rose-400" />

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-12">
            {/* 6.1 The 4-Step Wizard */}
            <motion.div variants={fadeIn}>
              <h3 className="text-2xl font-semibold text-white mb-2 flex items-center gap-3">
                <span className="text-purple-400 font-mono text-lg">6.1</span>
                The 4-Step Financial Wizard
              </h3>
              <p className="text-gray-400 mb-6">
                The heart of FinCal. Instead of dumping all inputs on one screen, we guide users through a pedagogical journey.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <StepCard
                  step={1}
                  title="LEARN — Education Module"
                  description="Teaches compounding, inflation erosion, and risk-return relationship"
                  xp="+50 XP"
                  items={["Power of compounding", "Inflation impact", "Risk vs Return basics"]}
                />
                <StepCard
                  step={2}
                  title="PLAN — Input Parameters"
                  description="Goal amount, timeline, return rate, SIP amount with smart defaults"
                  xp="+25 XP"
                  items={["Pre-populated benchmarks", "Contextual tooltips", "Real-world examples"]}
                />
                <StepCard
                  step={3}
                  title="AUDIT — Financial Health Gauge"
                  description="Evaluates whether the user's assumptions are realistic"
                  xp="+25 XP"
                  items={["Return rate validation", "Timeline-risk check", "SIP adequacy analysis"]}
                />
                <StepCard
                  step={4}
                  title="RESULTS — Detailed Dashboard"
                  description="Complete breakdown with inflation-adjusted values and charts"
                  xp="+100 XP"
                  items={["Nominal & real future value", "Investment vs returns", "Year-by-year projection"]}
                />
              </div>
            </motion.div>

            {/* 6.2 SIP Time Machine */}
            <motion.div variants={fadeIn}>
              <h3 className="text-2xl font-semibold text-white mb-2 flex items-center gap-3">
                <span className="text-purple-400 font-mono text-lg">6.2</span>
                SIP Time Machine
              </h3>
              <p className="text-gray-400 mb-6">
                A market volatility simulator that demonstrates the power of staying invested through market turbulence.
              </p>

              <div className="rounded-xl border border-gray-700/50 bg-gray-800/20 p-6">
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="rounded-lg border border-green-500/30 bg-green-900/10 p-4 text-center">
                    <TrendingUp className="w-6 h-6 text-green-400 mx-auto mb-2" />
                    <div className="text-sm font-semibold text-green-300">Stayed Invested</div>
                    <div className="text-2xl font-bold text-white mt-1">₹1,00,45,893</div>
                    <div className="text-xs text-green-400">Baseline</div>
                  </div>
                  <div className="rounded-lg border border-amber-500/30 bg-amber-900/10 p-4 text-center">
                    <Timer className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                    <div className="text-sm font-semibold text-amber-300">Missed 10 Best Days</div>
                    <div className="text-2xl font-bold text-white mt-1">₹58,23,441</div>
                    <div className="text-xs text-red-400">-42%</div>
                  </div>
                  <div className="rounded-lg border border-red-500/30 bg-red-900/10 p-4 text-center">
                    <AlertTriangle className="w-6 h-6 text-red-400 mx-auto mb-2" />
                    <div className="text-sm font-semibold text-red-300">Panic Seller</div>
                    <div className="text-2xl font-bold text-white mt-1">₹32,15,000</div>
                    <div className="text-xs text-red-400">-68%</div>
                  </div>
                </div>
                <div className="rounded-lg bg-blue-900/20 border border-blue-500/20 p-4 flex items-start gap-3">
                  <GraduationCap className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-blue-200">
                    <strong>Lesson:</strong> Time IN the market beats TIMING the market. Missing just the 10 best trading days over 20 years can reduce
                    your wealth by 42%.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* 6.3 Inflation Visualizer */}
            <motion.div variants={fadeIn}>
              <h3 className="text-2xl font-semibold text-white mb-2 flex items-center gap-3">
                <span className="text-purple-400 font-mono text-lg">6.3</span>
                Live Inflation Visualizer
              </h3>
              <p className="text-gray-400 mb-6">
                An interactive visualization that answers: <em>&ldquo;What will ₹1 Crore actually buy in 20 years?&rdquo;</em>
              </p>

              <div className="rounded-xl border border-gray-700/50 bg-gray-800/20 p-6">
                <div className="space-y-3">
                  {[
                    { year: "Today", value: "₹1,00,00,000", width: "100%", color: "bg-green-500" },
                    { year: "After 5 years", value: "₹74,73,000", width: "74%", color: "bg-green-400" },
                    { year: "After 10 years", value: "₹55,84,000", width: "56%", color: "bg-yellow-400" },
                    { year: "After 15 years", value: "₹41,73,000", width: "42%", color: "bg-orange-400" },
                    { year: "After 20 years", value: "₹31,18,000", width: "31%", color: "bg-red-400" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <span className="text-xs text-gray-400 w-28 text-right flex-shrink-0">{item.year}</span>
                      <div className="flex-1 bg-gray-700/30 rounded-full h-6 overflow-hidden">
                        <motion.div
                          className={`h-full ${item.color} rounded-full flex items-center justify-end pr-2`}
                          initial={{ width: 0 }}
                          whileInView={{ width: item.width }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: i * 0.15, ease: "easeOut" as any }}
                        >
                          <span className="text-xs font-semibold text-black">{item.value}</span>
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-lg bg-amber-900/20 border border-amber-500/20 p-3 text-sm text-amber-200 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  Your ₹1 Crore will only buy what ₹31.2 Lakhs buys today! You actually need ₹3.21 Crore.
                </div>
              </div>
            </motion.div>

            {/* 6.4 Financial Health Gauge */}
            <motion.div variants={fadeIn}>
              <h3 className="text-2xl font-semibold text-white mb-2 flex items-center gap-3">
                <span className="text-purple-400 font-mono text-lg">6.4</span>
                Financial Health Gauge
              </h3>
              <p className="text-gray-400 mb-4">An input auditing system that evaluates the realism of user-provided financial assumptions.</p>

              <div className="grid md:grid-cols-4 gap-3">
                {[
                  { range: "0–30", label: "High Risk", color: "red", desc: "Assumptions may lead to disappointment" },
                  { range: "31–60", label: "Moderate", color: "amber", desc: "Consider adjusting some parameters" },
                  { range: "61–80", label: "Good", color: "green", desc: "Reasonably grounded plan" },
                  { range: "81–100", label: "Excellent", color: "cyan", desc: "Conservative and realistic plan" },
                ].map((item, i) => (
                  <div key={i} className={`rounded-lg border p-3 text-center border-${item.color}-500/30 bg-${item.color}-900/10`}>
                    <div className="text-lg font-bold text-white">{item.range}</div>
                    <Badge color={item.color}>{item.label}</Badge>
                    <p className="text-xs text-gray-400 mt-2">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 6.5 3D Coin */}
            <motion.div variants={fadeIn}>
              <h3 className="text-2xl font-semibold text-white mb-2 flex items-center gap-3">
                <span className="text-purple-400 font-mono text-lg">6.5</span>
                3D Financial Coin
              </h3>
              <p className="text-gray-400 mb-4">
                A signature visual element: a rotating, interactive 3D coin rendered using Three.js via React Three Fiber.
              </p>
              <DataTable
                headers={["Property", "Detail"]}
                rows={[
                  ["Geometry", "CylinderGeometry with custom texturing"],
                  ["Material", "MeshStandardMaterial with metallic gold finish"],
                  ["Animation", "Continuous Y-axis rotation + sine wave float"],
                  ["Interaction", "Hover → speed up; Click → flip animation"],
                  ["Lighting", "Three-point: ambient + directional + point"],
                  ["Performance", "Lazy-loaded with Suspense boundary"],
                ]}
              />
            </motion.div>

            {/* 6.6 Gamification Hub */}
            <motion.div variants={fadeIn}>
              <h3 className="text-2xl font-semibold text-white mb-2 flex items-center gap-3">
                <span className="text-purple-400 font-mono text-lg">6.6</span>
                Gamification Hub
              </h3>
              <p className="text-gray-400 mb-4">The engagement engine that keeps users returning and learning.</p>

              <div className="grid md:grid-cols-2 gap-6">
                {/* XP Table */}
                <div>
                  <h4 className="text-sm font-semibold text-purple-300 mb-3">XP System</h4>
                  <DataTable
                    headers={["Action", "XP Earned"]}
                    rows={[
                      ["Complete education module", "+50"],
                      ["Create a financial plan", "+100"],
                      ['Achieve "Realistic" health score (>70)', "+75"],
                      ["Use SIP Time Machine", "+50"],
                      ["Use Inflation Visualizer", "+30"],
                      ["Daily login streak", "+10/day"],
                      ["Share a plan", "+25"],
                    ]}
                  />
                </div>

                {/* Badge Grid */}
                <div>
                  <h4 className="text-sm font-semibold text-purple-300 mb-3">Badges</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { icon: "🧠", name: "Curious Mind", criteria: "Complete first education module" },
                      { icon: "📊", name: "Rational Investor", criteria: "Health score > 80" },
                      { icon: "⏰", name: "Time Traveler", criteria: "Use SIP Time Machine 3x" },
                      { icon: "🛡️", name: "Inflation Warrior", criteria: "Create inflation-adjusted plan" },
                      { icon: "🔥", name: "Streak Master", criteria: "7-day login streak" },
                      { icon: "🏆", name: "Financial Guru", criteria: "Reach Level 5" },
                    ].map((badge, i) => (
                      <div key={i} className="rounded-lg border border-gray-700/50 bg-gray-800/30 p-3">
                        <span className="text-2xl">{badge.icon}</span>
                        <div className="text-sm font-semibold text-white mt-1">{badge.name}</div>
                        <div className="text-xs text-gray-500">{badge.criteria}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Leveling */}
              <div className="mt-6">
                <h4 className="text-sm font-semibold text-purple-300 mb-3">Leveling System</h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    { level: 1, name: "Beginner", xp: "0–99" },
                    { level: 2, name: "Curious Learner", xp: "100–299" },
                    { level: 3, name: "Smart Planner", xp: "300–599" },
                    { level: 4, name: "Financial Thinker", xp: "600–999" },
                    { level: 5, name: "Wealth Architect", xp: "1000–1499" },
                    { level: 6, name: "Money Master", xp: "1500+" },
                  ].map((l) => (
                    <div key={l.level} className="inline-flex items-center gap-2 rounded-full border border-gray-700/50 bg-gray-800/30 px-4 py-2">
                      <span className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-xs font-bold text-white">
                        {l.level}
                      </span>
                      <span className="text-sm text-white">{l.name}</span>
                      <span className="text-xs text-gray-500">({l.xp} XP)</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* ═══════ SECTION 7: SYSTEM DESIGN ═══════ */}
        <section>
          <SectionHeader id="system-design" num="7" title="System Design & Data Flow" icon={Workflow} gradient="from-indigo-400 to-violet-400" />

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-8">
            <motion.div variants={fadeIn}>
              <h3 className="text-xl font-semibold text-white mb-4">User Journey Flow</h3>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {["Landing Page", "Sign Up (Clerk)", "Calculator Wizard", "Results + Save", "Dashboard"].map((step, i, arr) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="rounded-lg border border-gray-600/50 bg-gray-800/50 px-4 py-2 text-sm text-gray-300">{step}</div>
                    {i < arr.length - 1 && <ArrowRight className="w-4 h-4 text-purple-400" />}
                  </div>
                ))}
              </div>
              <div className="flex justify-center mt-4 gap-8 flex-wrap">
                {["SIP Time Machine", "Inflation Visualizer", "Gamification Hub"].map((item, i) => (
                  <div key={i} className="rounded-lg border border-purple-500/30 bg-purple-900/10 px-4 py-2 text-sm text-purple-300">
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeIn}>
              <h3 className="text-xl font-semibold text-white mb-4">Data Persistence Strategy</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <InfoCard icon={Zap} title="Zustand Store (In-Memory)" description="Fast reads, reactive updates, type-safe state management" color="purple" />
                <InfoCard
                  icon={Database}
                  title="LocalStorage (Persistent)"
                  description="Survives browser refresh, offline support, ~5MB capacity"
                  color="green"
                />
                <InfoCard icon={Shield} title="Clerk Auth (Cloud)" description="User identity, session management, OAuth/Social login" color="cyan" />
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* ═══════ SECTION 8: INSTALLATION ═══════ */}
        <section>
          <SectionHeader id="installation" num="8" title="Installation & Local Development" icon={Terminal} gradient="from-emerald-400 to-teal-400" />

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-6">
            <motion.div variants={fadeIn}>
              <h3 className="text-xl font-semibold text-white mb-4">Prerequisites</h3>
              <DataTable
                headers={["Requirement", "Minimum Version"]}
                rows={[
                  ["Node.js", "18.17+"],
                  ["npm", "9.0+"],
                  ["Git", "2.0+"],
                  ["Modern Browser", "Chrome 90+, Firefox 88+, Safari 15+"],
                ]}
              />
            </motion.div>

            <motion.div variants={fadeIn}>
              <h3 className="text-xl font-semibold text-white mb-4">Quick Start</h3>
              <CodeBlock title="Terminal">{`# 1. Clone the repository
git clone https://github.com/HarshadPanchal12/Fincal_educativegamifiedcalculator.git

# 2. Navigate to project directory
cd Fincal_educativegamifiedcalculator

# 3. Install dependencies
npm install

# 4. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Clerk keys

# 5. Run development server
npm run dev

# 6. Open in browser → http://localhost:3000`}</CodeBlock>
            </motion.div>

            <motion.div variants={fadeIn}>
              <h3 className="text-xl font-semibold text-white mb-4">Available Scripts</h3>
              <DataTable
                headers={["Command", "Description"]}
                rows={[
                  ["npm run dev", "Start development server with hot reload (port 3000)"],
                  ["npm run build", "Create production build"],
                  ["npm run start", "Start production server"],
                  ["npm run lint", "Run ESLint across the codebase"],
                ]}
              />
            </motion.div>

            <motion.div variants={fadeIn}>
              <h3 className="text-xl font-semibold text-white mb-4">Troubleshooting</h3>
              <DataTable
                headers={["Issue", "Solution"]}
                rows={[
                  ["Module not found: three", "Run npm install again; check node_modules"],
                  ["Clerk auth not working", "Ensure .env.local has valid Clerk keys"],
                  ["3D coin not rendering", "Check WebGL support; disable HW acceleration blockers"],
                  ["Hydration mismatch", "Ensure Zustand persist middleware handles SSR"],
                  ["Port 3000 in use", "Kill process or use PORT=3001 npm run dev"],
                ]}
              />
            </motion.div>
          </motion.div>
        </section>

        {/* ═══════ SECTION 9: DEPLOYMENT ═══════ */}
        <section>
          <SectionHeader id="deployment" num="9" title="Deployment Guide" icon={Rocket} gradient="from-orange-400 to-red-400" />

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-6">
            <motion.div variants={fadeIn}>
              <h3 className="text-xl font-semibold text-white mb-4">Render Deployment (Primary)</h3>
              <CodeBlock title="render.yaml">{`services:
  - type: web
    name: fincal
    runtime: node
    plan: free
    buildCommand: npm install && npm run build
    startCommand: npm run start
    envVars:
      - key: NODE_ENV
        value: production
      - key: NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
        sync: false
      - key: CLERK_SECRET_KEY
        sync: false`}</CodeBlock>
            </motion.div>

            <motion.div variants={fadeIn}>
              <h3 className="text-xl font-semibold text-white mb-4">Deployment Steps</h3>
              <ol className="space-y-3">
                {[
                  "Go to Render Dashboard → Click 'New' → 'Blueprint'",
                  "Connect your GitHub repository — Render auto-detects render.yaml",
                  "Configure environment variables (Clerk keys, NODE_ENV=production)",
                  "Click 'Apply' — Render builds and deploys automatically",
                  "Subsequent pushes to main trigger auto-deploy",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-xs font-bold text-white flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-gray-300">{step}</span>
                  </li>
                ))}
              </ol>
            </motion.div>
          </motion.div>
        </section>

        {/* ═══════ SECTION 10: CONFIGURATION ═══════ */}
        <section>
          <SectionHeader id="configuration" num="10" title="Configuration & Environment Variables" icon={Settings} gradient="from-slate-400 to-gray-400" />

          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <CodeBlock title=".env.local">{`# ===== CLERK AUTHENTICATION =====
# Get these from https://dashboard.clerk.com
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxx
CLERK_SECRET_KEY=sk_test_xxxxxxxxxxxxx

# Clerk redirect URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/calculator`}</CodeBlock>
          </motion.div>
        </section>

        {/* ═══════ SECTION 11: FINANCIAL LOGIC ═══════ */}
        <section>
          <SectionHeader id="financial-logic" num="11" title="Financial Logic & Formulas" icon={Calculator} gradient="from-blue-400 to-indigo-400" />

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-8">
            {/* SIP FV */}
            <motion.div variants={fadeIn}>
              <h3 className="text-xl font-semibold text-white mb-2">11.1 — Future Value of SIP</h3>
              <div className="rounded-lg bg-blue-900/20 border border-blue-500/20 p-4 mb-4 font-mono text-blue-200 text-center text-lg">
                FV = P × [((1 + r)<sup>n</sup> - 1) / r] × (1 + r)
              </div>
              <DataTable
                headers={["Variable", "Meaning"]}
                rows={[
                  ["FV", "Future Value"],
                  ["P", "Monthly SIP amount"],
                  ["r", "Monthly rate of return (annual / 12 / 100)"],
                  ["n", "Total months (years × 12)"],
                ]}
              />
              <CodeBlock title="lib/calculations.ts — calculateSIPFutureValue">{`function calculateSIPFutureValue(
  monthlyInvestment: number,
  annualReturnRate: number,
  years: number
): number {
  const monthlyRate = annualReturnRate / 12 / 100;
  const months = years * 12;
  
  if (monthlyRate === 0) return monthlyInvestment * months;
  
  const futureValue = monthlyInvestment * 
    (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * 
    (1 + monthlyRate));
  
  return Math.round(futureValue);
}`}</CodeBlock>
            </motion.div>

            {/* Inflation Adjusted */}
            <motion.div variants={fadeIn}>
              <h3 className="text-xl font-semibold text-white mb-2">11.2 — Inflation-Adjusted Future Value</h3>
              <div className="rounded-lg bg-blue-900/20 border border-blue-500/20 p-4 mb-4 font-mono text-blue-200 text-center text-lg">
                Real Value = Nominal Value / (1 + i)<sup>t</sup>
              </div>
              <CodeBlock title="lib/calculations.ts — adjustForInflation">{`function adjustForInflation(
  nominalValue: number,
  inflationRate: number,
  years: number
): number {
  const realValue = nominalValue / Math.pow(1 + inflationRate / 100, years);
  return Math.round(realValue);
}`}</CodeBlock>
            </motion.div>

            {/* Required SIP */}
            <motion.div variants={fadeIn}>
              <h3 className="text-xl font-semibold text-white mb-2">11.3 — Required SIP for a Goal</h3>
              <div className="rounded-lg bg-blue-900/20 border border-blue-500/20 p-4 mb-4 font-mono text-blue-200 text-center text-lg">
                P = FV × r / [((1 + r)<sup>n</sup> - 1) × (1 + r)]
              </div>
              <CodeBlock title="lib/calculations.ts — calculateRequiredSIP">{`function calculateRequiredSIP(
  goalAmount: number,
  annualReturnRate: number,
  years: number
): number {
  const monthlyRate = annualReturnRate / 12 / 100;
  const months = years * 12;
  
  if (monthlyRate === 0) return goalAmount / months;
  
  const sip = goalAmount * monthlyRate / 
    ((Math.pow(1 + monthlyRate, months) - 1) * (1 + monthlyRate));
  
  return Math.round(sip);
}`}</CodeBlock>
            </motion.div>

            {/* Lumpsum */}
            <motion.div variants={fadeIn}>
              <h3 className="text-xl font-semibold text-white mb-2">11.4 — Lumpsum Future Value</h3>
              <div className="rounded-lg bg-blue-900/20 border border-blue-500/20 p-4 mb-4 font-mono text-blue-200 text-center text-lg">
                FV = PV × (1 + r)<sup>n</sup>
              </div>
            </motion.div>

            {/* Benchmarks */}
            <motion.div variants={fadeIn}>
              <h3 className="text-xl font-semibold text-white mb-4">Calculation Accuracy Benchmarks</h3>
              <DataTable
                headers={["Assumption", "Value", "Source"]}
                rows={[
                  ["Default Inflation Rate", "6% p.a.", "RBI long-term average (India)"],
                  ["Conservative Equity Return", "12% p.a.", "Nifty 50 historical CAGR (20yr)"],
                  ["Debt Fund Return", "7–8% p.a.", "Historical average for quality debt"],
                  ["FD Return", "6–7% p.a.", "Current SBI FD rates"],
                  ["Gold Return", "8–10% p.a.", "Historical average"],
                ]}
              />
            </motion.div>
          </motion.div>
        </section>

        {/* ═══════ SECTION 12: GAMIFICATION ENGINE ═══════ */}
        <section>
          <SectionHeader id="gamification" num="12" title="Gamification Engine" icon={Gamepad2} gradient="from-amber-400 to-yellow-400" />

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-6">
            <motion.div variants={fadeIn}>
              <h3 className="text-xl font-semibold text-white mb-4">State Architecture</h3>
              <CodeBlock title="store/useGameStore.ts — Interface">{`interface GameState {
  // Core State
  xp: number;
  level: number;
  badges: Badge[];
  completedModules: string[];
  loginStreak: number;
  lastLoginDate: string | null;
  
  // Actions
  addXP: (amount: number, source: string) => void;
  unlockBadge: (badgeId: string) => void;
  completeModule: (moduleId: string) => void;
  checkAndUpdateStreak: () => void;
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: string | null;
  criteria: string;
}`}</CodeBlock>
            </motion.div>

            <motion.div variants={fadeIn}>
              <h3 className="text-xl font-semibold text-white mb-4">Persistence via Zustand</h3>
              <CodeBlock title="Zustand persist middleware">{`export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      // ... state and actions
    }),
    {
      name: 'fincal-game-state',  // localStorage key
      version: 1,
    }
  )
);`}</CodeBlock>
            </motion.div>
          </motion.div>
        </section>

        {/* ═══════ SECTION 13: UI/UX DESIGN ═══════ */}
        <section>
          <SectionHeader id="ui-ux" num="13" title="UI/UX Design Philosophy" icon={Palette} gradient="from-pink-400 to-fuchsia-400" />

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-8">
            <motion.div variants={fadeIn}>
              <h3 className="text-xl font-semibold text-white mb-4">Design Principles</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { icon: Monitor, title: "Premium Dark Theme", desc: "High-contrast dark backgrounds with vibrant accent colors" },
                  { icon: Layout, title: "Guided Experience", desc: "Progressive disclosure through wizard steps — never overwhelm" },
                  { icon: Sparkles, title: "Micro-interactions", desc: "Every button, card, and transition has purposeful animation" },
                  { icon: BarChart3, title: "Data Viz First", desc: "Numbers alone don't tell the story — charts and gauges do" },
                  { icon: Monitor, title: "Mobile Responsive", desc: "All features work on screens 320px and wider" },
                ].map((p, i) => (
                  <InfoCard key={i} icon={p.icon} title={p.title} description={p.desc} color={["purple", "cyan", "amber", "green", "purple"][i]} />
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeIn}>
              <h3 className="text-xl font-semibold text-white mb-4">Color System</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {[
                  { name: "Background", hex: "#0a0a0f", bg: "bg-[#0a0a0f]" },
                  { name: "Primary", hex: "#7c3aed", bg: "bg-purple-600" },
                  { name: "Accent Cyan", hex: "#06b6d4", bg: "bg-cyan-500" },
                  { name: "Accent Gold", hex: "#f59e0b", bg: "bg-amber-500" },
                  { name: "Success", hex: "#10b981", bg: "bg-emerald-500" },
                ].map((c) => (
                  <div key={c.name} className="text-center">
                    <div className={`w-full h-16 rounded-lg ${c.bg} border border-gray-700/50 mb-2`} />
                    <div className="text-xs font-semibold text-white">{c.name}</div>
                    <div className="text-xs text-gray-500 font-mono">{c.hex}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeIn}>
              <h3 className="text-xl font-semibold text-white mb-4">Animation Standards</h3>
              <DataTable
                headers={["Element", "Animation", "Duration", "Easing"]}
                rows={[
                  ["Page transitions", "Fade + slide up", "300ms", "easeOut"],
                  ["Card hover", "Scale(1.02) + shadow", "200ms", "spring"],
                  ["Button click", "Scale(0.95)", "100ms", "easeInOut"],
                  ["Gauge fill", "Width animation", "1000ms", "easeOut"],
                  ["3D coin", "Continuous rotation", "∞", "linear"],
                  ["Number counters", "Count-up", "800ms", "easeOut"],
                ]}
              />
            </motion.div>
          </motion.div>
        </section>

        {/* ═══════ SECTION 14: API REFERENCE ═══════ */}
        <section>
          <SectionHeader id="api-reference" num="14" title="API & State Management Reference" icon={Code} gradient="from-violet-400 to-purple-400" />

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-6">
            <motion.div variants={fadeIn}>
              <h3 className="text-xl font-semibold text-white mb-4">useGameStore — Usage</h3>
              <CodeBlock title="Reading & dispatching game state">{`// READING STATE
const xp = useGameStore((state) => state.xp);
const level = useGameStore((state) => state.level);
const badges = useGameStore((state) => state.badges);

// DISPATCHING ACTIONS
const addXP = useGameStore((state) => state.addXP);
addXP(50, 'education-complete');

const unlockBadge = useGameStore((state) => state.unlockBadge);
unlockBadge('curious-mind');`}</CodeBlock>
            </motion.div>

            <motion.div variants={fadeIn}>
              <h3 className="text-xl font-semibold text-white mb-4">usePlanStore — Usage</h3>
              <CodeBlock title="Reading & dispatching plan state">{`// READING STATE
const plans = usePlanStore((state) => state.plans);
const currentPlan = usePlanStore((state) => state.currentPlan);

// SAVE A NEW PLAN
const savePlan = usePlanStore((state) => state.savePlan);
savePlan({
  id: crypto.randomUUID(),
  name: "Retirement Fund",
  goalAmount: 10000000,
  monthlyInvestment: 25000,
  expectedReturn: 12,
  timeline: 20,
  inflationRate: 6,
  createdAt: new Date().toISOString()
});

// DELETE A PLAN
const deletePlan = usePlanStore((state) => state.deletePlan);
deletePlan('plan-uuid-here');`}</CodeBlock>
            </motion.div>

            <motion.div variants={fadeIn}>
              <h3 className="text-xl font-semibold text-white mb-4">Calculation Functions</h3>
              <DataTable
                headers={["Function", "Parameters", "Returns"]}
                rows={[
                  ["calculateSIPFutureValue", "(monthly, annualReturn, years)", "number"],
                  ["adjustForInflation", "(nominal, inflationRate, years)", "number"],
                  ["calculateRequiredSIP", "(goal, annualReturn, years)", "number"],
                  ["calculateLumpsumFV", "(principal, annualReturn, years)", "number"],
                  ["inflationAdjustedGoal", "(currentGoal, inflationRate, years)", "number"],
                  ["generateYearlyProjection", "(monthly, return, years, inflation)", "YearlyData[]"],
                  ["calculateHealthScore", "(inputs: FinancialInputs)", "number (0-100)"],
                ]}
              />
            </motion.div>
          </motion.div>
        </section>

        {/* ═══════ SECTION 15: TESTING ═══════ */}
        <section>
          <SectionHeader id="testing" num="15" title="Testing Strategy" icon={TestTube} gradient="from-teal-400 to-cyan-400" />

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-6">
            <motion.div variants={fadeIn}>
              <h3 className="text-xl font-semibold text-white mb-4">Testing Pyramid</h3>
              <div className="flex justify-center">
                <div className="space-y-2 text-center">
                  <div className="mx-auto w-32 rounded-t-lg bg-red-500/20 border border-red-500/30 px-4 py-2 text-xs text-red-300">E2E Tests</div>
                  <div className="mx-auto w-48 bg-amber-500/20 border border-amber-500/30 px-4 py-2 text-xs text-amber-300">Integration Tests</div>
                  <div className="mx-auto w-64 rounded-b-lg bg-green-500/20 border border-green-500/30 px-4 py-2 text-xs text-green-300">
                    Unit Tests (Priority)
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeIn}>
              <h3 className="text-xl font-semibold text-white mb-4">Unit Test Examples</h3>
              <CodeBlock title="__tests__/calculations.test.ts">{`describe('calculateSIPFutureValue', () => {
  test('₹10,000/month at 12% for 10 years', () => {
    const result = calculateSIPFutureValue(10000, 12, 10);
    expect(result).toBeCloseTo(2323391, -2);
  });

  test('handles 0% return rate', () => {
    const result = calculateSIPFutureValue(10000, 0, 10);
    expect(result).toBe(1200000);
  });
});

describe('calculateHealthScore', () => {
  test('penalizes unrealistic returns', () => {
    const score = calculateHealthScore({
      expectedReturn: 25, timeline: 5,
      sipAmount: 10000, goal: 10000000,
      inflationAdjusted: false
    });
    expect(score).toBeLessThan(50);
  });
});`}</CodeBlock>
            </motion.div>
          </motion.div>
        </section>

        {/* ═══════ SECTION 16: PERFORMANCE ═══════ */}
        <section>
          <SectionHeader id="performance" num="16" title="Performance Optimizations" icon={Gauge} gradient="from-lime-400 to-green-400" />

          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <DataTable
              headers={["Optimization", "Technique", "Impact"]}
              rows={[
                ["Code Splitting", "Next.js automatic route-based splitting", "~60% smaller initial bundle"],
                ["3D Lazy Loading", "React.lazy + Suspense for Three.js canvas", "3D only loads when visible"],
                ["Image Optimization", "Next.js <Image> with WebP conversion", "~40% smaller images"],
                ["State Persistence", 'Zustand persist with "partialize"', "Minimal localStorage writes"],
                ["Animation Performance", "Framer Motion GPU-accelerated transforms", "60fps animations"],
                ["Font Optimization", "next/font with subsets + display:swap", "Zero layout shift"],
                ["Tree Shaking", "ES module imports from lucide-react", "Only used icons in bundle"],
              ]}
            />

            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Performance", score: "90+", color: "text-green-400" },
                { label: "Accessibility", score: "85+", color: "text-green-400" },
                { label: "Best Practices", score: "90+", color: "text-green-400" },
                { label: "SEO", score: "90+", color: "text-green-400" },
              ].map((item) => (
                <div key={item.label} className="rounded-xl border border-gray-700/50 bg-gray-800/30 p-4 text-center">
                  <div className={`text-3xl font-bold ${item.color}`}>{item.score}</div>
                  <div className="text-xs text-gray-500 mt-1">{item.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ═══════ SECTION 17: ROADMAP ═══════ */}
        <section>
          <SectionHeader id="roadmap" num="17" title="Future Roadmap" icon={Map} gradient="from-sky-400 to-blue-400" />

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-6">
            <motion.div variants={fadeIn}>
              <h3 className="text-xl font-semibold text-white mb-4">
                Version 2.0 <Badge color="purple">Planned</Badge>
              </h3>
              <DataTable
                headers={["Feature", "Description", "Priority"]}
                rows={[
                  ["Backend Integration", "Supabase/PostgreSQL for persistent plans across devices", "🔴 High"],
                  ["Real Market Data", "NSE/BSE API integration for live benchmarks", "🔴 High"],
                  ["Social Features", "Share plans, compare with friends, community leaderboard", "🟡 Medium"],
                  ["Goal Templates", "Pre-built plans for Home, Car, Education, Retirement", "🟡 Medium"],
                  ["PDF Report Export", "Download detailed financial plan as styled PDF", "🟡 Medium"],
                  ["Multi-Currency", "Support for USD, EUR, GBP", "🟢 Low"],
                  ["AI Financial Advisor", "GPT-powered chatbot for personalized advice", "🟢 Low"],
                ]}
              />
            </motion.div>

            <motion.div variants={fadeIn}>
              <h3 className="text-xl font-semibold text-white mb-4">
                Version 2.5 <Badge color="cyan">Aspirational</Badge>
              </h3>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  "Tax Calculator Integration (Section 80C, LTCG, STCG)",
                  "Insurance Planning Module (Term, Health, ULIP)",
                  "EMI + Loan Module (Home, Car, Education loans)",
                  "Portfolio Optimizer (Markowitz-inspired allocation)",
                  "Collaborative Planning (Families plan together real-time)",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 rounded-lg border border-gray-700/50 bg-gray-800/20 px-4 py-3 text-sm text-gray-300">
                    <Star className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* ═══════ SECTION 18: CONTRIBUTING ═══════ */}
        <section>
          <SectionHeader id="contributing" num="18" title="Contributing Guidelines" icon={GitPullRequest} gradient="from-fuchsia-400 to-pink-400" />

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-6">
            <motion.div variants={fadeIn}>
              <h3 className="text-xl font-semibold text-white mb-4">Getting Started</h3>
              <ol className="space-y-3">
                {[
                  "Fork the repository",
                  "Clone your fork locally",
                  "Create a feature branch: git checkout -b feature/amazing-feature",
                  "Commit your changes: git commit -m 'feat: add amazing feature'",
                  "Push to the branch: git push origin feature/amazing-feature",
                  "Open a Pull Request",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-gradient-to-br from-fuchsia-500 to-pink-500 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-gray-300 font-mono text-sm">{step}</span>
                  </li>
                ))}
              </ol>
            </motion.div>

            <motion.div variants={fadeIn}>
              <h3 className="text-xl font-semibold text-white mb-4">Commit Convention</h3>
              <DataTable
                headers={["Prefix", "Usage"]}
                rows={[
                  ["feat:", "New feature"],
                  ["fix:", "Bug fix"],
                  ["docs:", "Documentation changes"],
                  ["style:", "Code style changes (formatting)"],
                  ["refactor:", "Code refactoring"],
                  ["perf:", "Performance improvements"],
                  ["test:", "Adding or fixing tests"],
                  ["chore:", "Maintenance tasks"],
                ]}
              />
            </motion.div>
          </motion.div>
        </section>

        {/* ═══════ SECTION 19: LICENSE ═══════ */}
        <section>
          <SectionHeader id="license" num="19" title="License" icon={Scale} gradient="from-gray-400 to-slate-400" />

          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <CodeBlock title="MIT License">{`MIT License

Copyright (c) 2025 Harshad Panchal

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.`}</CodeBlock>
          </motion.div>
        </section>

        {/* ═══════ SECTION 20: ACKNOWLEDGEMENTS ═══════ */}
        <section>
          <SectionHeader id="acknowledgements" num="20" title="Acknowledgements" icon={HandHeart} gradient="from-rose-400 to-red-400" />

          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { icon: Trophy, name: "Technex Innovation Hackathon 2026", desc: "For providing the platform to build this" },
                { icon: Layers, name: "Next.js Team", desc: "For the incredible App Router architecture" },
                { icon: Boxes, name: "Three.js Community", desc: "For making 3D on the web accessible" },
                { icon: Shield, name: "Clerk", desc: "For enterprise-grade authentication" },
                { icon: Layout, name: "shadcn/ui", desc: "For the component design inspiration" },
                { icon: TrendingUp, name: "Indian Financial Markets", desc: "For the data benchmarks used in calculations" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 rounded-xl border border-gray-700/50 bg-gray-800/20 p-4">
                  <item.icon className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-white">{item.name}</div>
                    <div className="text-sm text-gray-400">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ═══════ QUICK REFERENCE CARD ═══════ */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-900/20 via-gray-900/50 to-cyan-900/20 p-8 md:p-12"
          >
            <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              📊 Quick Reference Card
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Github className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-400">Repo:</span>
                  <a href="https://github.com/HarshadPanchal12/Fincal_educativegamifiedcalculator" className="text-sm text-purple-300 hover:underline truncate" target="_blank" rel="noopener noreferrer">
                    github.com/HarshadPanchal12/Fincal...
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Cpu className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-400">Stack:</span>
                  <span className="text-sm text-white">Next.js 15 + Three.js + Zustand + Clerk + Tailwind</span>
                </div>
                <div className="flex items-center gap-3">
                  <Rocket className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-400">Deploy:</span>
                  <span className="text-sm text-white">Render (render.yaml included)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Package className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-400">Install:</span>
                  <code className="text-sm text-cyan-300 font-mono">npm install && npm run dev</code>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-purple-300">🎮 Features</h4>
                <ul className="space-y-2">
                  {[
                    "4-Step Financial Wizard",
                    "SIP Time Machine",
                    "Live Inflation Visualizer",
                    "Financial Health Gauge",
                    "Gamification (XP/Badges/Levels)",
                    "3D Interactive Coin",
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                      <Check className="w-4 h-4 text-green-400" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-700/50 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <Users className="w-4 h-4" />
                Author: <span className="text-white font-semibold">Harshad Panchal</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <Trophy className="w-4 h-4" />
                Event: <span className="text-white font-semibold">Technex Innovation Hackathon 2026</span>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      {/* ─── FOOTER ──────────────────────────────────────────────────── */}
      <footer className="border-t border-gray-800/50 bg-gray-900/30">
        <div className="max-w-5xl mx-auto px-6 py-12 text-center">
          <p className="text-gray-500 text-sm">
            This documentation was crafted to provide complete transparency into every aspect of the FinCal project — from high-level architecture
            decisions down to individual formula implementations.
          </p>
          <p className="text-gray-600 text-xs mt-4">
            © 2025 Harshad Panchal — Built for Technex Innovation Hackathon 2026
          </p>
        </div>
      </footer>

      {/* ─── BACK TO TOP ─────────────────────────────────────────────── */}
      <a
        href="#"
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-purple-600 hover:bg-purple-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/25 transition-all z-50"
        aria-label="Back to top"
      >
        ↑
      </a>
    </div>
  );
}