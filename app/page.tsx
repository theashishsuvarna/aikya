'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Network,
  Sparkles,
  GitBranch,
  Activity,
  Users,
  Target,
  ShieldCheck,
  TrendingUp,
  Bot,
  Layers,
  Search,
  Check,
} from 'lucide-react';
import { AikyaLogo } from '@/components/aikya-logo';
import { OrgVisualization } from '@/components/org-visualization';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* ── Nav ─────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <AikyaLogo />
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <Link href="/features" className="hover:text-foreground transition-colors">Features</Link>
            <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
            <Link href="/pricing" className="hover:text-foreground transition-colors">Pricing</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">Log in</Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Get started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────────── */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <FadeIn>
                <Badge variant="secondary" className="mb-6 gap-1.5">
                  <Sparkles className="h-3 w-3" />
                  AI-Powered Organizational Intelligence
                </Badge>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tightest leading-[1.05] text-balance">
                  Build an organization that scales.
                </h1>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl text-balance">
                  AIKYA helps companies design, understand, and continuously improve their organizational structure — from people and teams to roles, reporting lines, and future growth.
                </p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/signup">
                    <Button size="lg" className="gap-2">
                      Build your organization
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/features">
                    <Button size="lg" variant="outline">Explore AIKYA</Button>
                  </Link>
                </div>
              </FadeIn>
              <FadeIn delay={0.4}>
                <p className="mt-6 text-sm text-muted-foreground">
                  ऐक्य — Unity. Alignment. Oneness.
                </p>
              </FadeIn>
            </div>
            <FadeIn delay={0.3}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent rounded-2xl" />
                <div className="relative border border-border/60 rounded-2xl bg-card/50 backdrop-blur-sm p-6">
                  <div className="flex items-center gap-2 mb-4 text-xs text-muted-foreground">
                    <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                    Live organizational structure
                  </div>
                  <OrgVisualization className="aspect-[4/3] w-full" />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── The Problem ─────────────────────────────────── */}
      <section className="py-24 border-t border-border/50">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <FadeIn>
            <p className="text-sm font-medium text-accent uppercase tracking-widest mb-4">The Problem</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight leading-tight text-balance">
              Most companies outgrow their organizational structure before they realize it.
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed text-balance">
              Spreadsheets and HRMS tools tell you who works where. They don't tell you if your structure is healthy, where the bottlenecks are, or what happens when you reorganize.
            </p>
          </FadeIn>
          <StaggerContainer className="mt-16 grid md:grid-cols-3 gap-8 text-left">
            <StaggerItem>
              <div className="border-l-2 border-border pl-4">
                <p className="font-serif text-2xl font-semibold">1 in 3</p>
                <p className="mt-1 text-sm text-muted-foreground">managers have too many direct reports</p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="border-l-2 border-border pl-4">
                <p className="font-serif text-2xl font-semibold">40%</p>
                <p className="mt-1 text-sm text-muted-foreground">of roles have overlapping responsibilities</p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="border-l-2 border-border pl-4">
                <p className="font-serif text-2xl font-semibold">2x</p>
                <p className="mt-1 text-sm text-muted-foreground">faster growth outpaces structure clarity</p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* ── Brand Story ─────────────────────────────────── */}
      <section className="py-32 border-t border-border/50 bg-primary text-primary-foreground overflow-hidden">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <FadeIn>
            <h2 className="font-serif text-7xl md:text-9xl font-semibold tracking-tightest leading-none">
              AIKYA
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="mt-4 font-serif text-4xl md:text-5xl text-primary-foreground/60">ऐक्य</p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="mt-10 flex flex-col items-center gap-2">
              <p className="font-serif text-2xl md:text-3xl font-semibold tracking-tight">Unity.</p>
              <p className="font-serif text-2xl md:text-3xl font-semibold tracking-tight">Alignment.</p>
              <p className="font-serif text-2xl md:text-3xl font-semibold tracking-tight">Oneness.</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── How AIKYA Works ─────────────────────────────── */}
      <section className="py-24 border-t border-border/50 bg-muted/30">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <p className="text-sm font-medium text-accent uppercase tracking-widest mb-4 text-center">How AIKYA Works</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight text-center text-balance mb-16">
              From understanding to action — AI-guided at every step.
            </h2>
          </FadeIn>
          <StaggerContainer className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Search, step: 'Understand', desc: 'Map your current organization — people, teams, roles, and reporting lines.' },
              { icon: Network, step: 'Build', desc: 'Design your structure from scratch or describe it in natural language.' },
              { icon: Activity, step: 'Analyze', desc: 'AI identifies bottlenecks, overlaps, and risks in your structure.' },
              { icon: Sparkles, step: 'Recommend', desc: 'Get specific, data-backed recommendations for improvement.' },
              { icon: GitBranch, step: 'Simulate', desc: 'Test reorganizations without touching your live structure.' },
              { icon: TrendingUp, step: 'Predict', desc: 'Forecast how your structure will scale as you grow.' },
              { icon: Bot, step: 'Assist', desc: 'Ask questions in natural language and get organizational answers.' },
              { icon: ShieldCheck, step: 'Approve', desc: 'Humans review and approve every meaningful change.' },
            ].map((item, i) => (
              <StaggerItem key={item.step}>
                <div className="relative p-6 rounded-xl border border-border/60 bg-card hover:border-border transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent">
                      <item.icon className="h-4.5 w-4.5" />
                    </div>
                    <span className="text-xs text-muted-foreground">Step {i + 1}</span>
                  </div>
                  <h3 className="font-medium mb-1">{item.step}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── AI Intelligence ─────────────────────────────── */}
      <section className="py-24 border-t border-border/50">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <FadeIn>
                <p className="text-sm font-medium text-accent uppercase tracking-widest mb-4">AI-Powered Intelligence</p>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight leading-tight text-balance">
                  AI that understands your organization — not just a chatbot.
                </h2>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                  AIKYA's AI is deeply integrated into the product. It reads your organizational data, analyzes relationships, and provides specific, actionable intelligence — not generic advice.
                </p>
              </FadeIn>
              <StaggerContainer className="mt-8 space-y-4" delay={0.3}>
                <StaggerItem>
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <p className="text-sm">Detects management bottlenecks using real span-of-control data</p>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <p className="text-sm">Identifies overlapping responsibilities across roles</p>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <p className="text-sm">Recommends hires based on capacity and team structure</p>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <p className="text-sm">Simulates reorganizations before you commit</p>
                  </div>
                </StaggerItem>
              </StaggerContainer>
            </div>
            <FadeIn delay={0.2}>
              <div className="relative rounded-xl border border-border/60 bg-card p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="h-4 w-4 text-accent" />
                  <span className="text-sm font-medium">AIKYA Analysis</span>
                </div>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-muted/50 border border-border/40">
                    <p className="text-sm font-medium mb-1">Engineering management bottleneck</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      The CTO directly manages 11 people across Backend and DevOps — significantly above the recommended span of 5–7.
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <Badge variant="destructive" className="text-xs">HIGH</Badge>
                      <span className="text-xs text-muted-foreground">Confidence: High</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50 border border-border/40">
                    <p className="text-sm font-medium mb-1">Product responsibility overlap</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Two Product Managers share roadmap ownership without clear domain boundaries.
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">MEDIUM</Badge>
                      <span className="text-xs text-muted-foreground">Confidence: High</span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Org Visualization ───────────────────────────── */}
      <section className="py-24 border-t border-border/50 bg-muted/30">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <p className="text-sm font-medium text-accent uppercase tracking-widest mb-4 text-center">Organization Visualization</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight text-center text-balance mb-4">
              See your entire organization at a glance.
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-center text-muted-foreground max-w-xl mx-auto mb-12 text-balance">
              Zoom, pan, expand, and filter. Click any node to see details, responsibilities, and reporting structure.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="rounded-2xl border border-border/60 bg-card p-8 shadow-sm">
              <OrgVisualization className="aspect-[16/9] w-full" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── AI Advisor ──────────────────────────────────── */}
      <section className="py-24 border-t border-border/50">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <div className="relative rounded-xl border border-border/60 bg-card p-6 shadow-sm">
                <div className="space-y-3">
                  <div className="flex justify-end">
                    <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[80%]">
                      <p className="text-sm">Which team has the biggest management bottleneck?</p>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3 max-w-[90%]">
                      <p className="text-sm leading-relaxed">
                        Engineering currently has 17 people across 2 managers. One manager has 11 direct reports, significantly higher than the average.
                      </p>
                      <p className="text-sm leading-relaxed mt-2">
                        I recommend evaluating a Platform Engineering split.
                      </p>
                      <div className="mt-3 flex gap-2">
                        <span className="text-xs px-2.5 py-1 rounded-md bg-accent/10 text-accent font-medium">Simulate</span>
                        <span className="text-xs px-2.5 py-1 rounded-md bg-muted text-muted-foreground font-medium">Review</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
            <div>
              <FadeIn delay={0.1}>
                <p className="text-sm font-medium text-accent uppercase tracking-widest mb-4">AI Advisor</p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight leading-tight text-balance">
                  Ask AIKYA. Understand your organization in natural language.
                </h2>
              </FadeIn>
              <FadeIn delay={0.3}>
                <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                  Ask questions like "Which managers have too many reports?" or "Should Engineering be split?" — and get answers backed by your actual organizational data.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ── Reorganization Simulator ───────────────────── */}
      <section className="py-24 border-t border-border/50 bg-muted/30">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <FadeIn>
                <p className="text-sm font-medium text-accent uppercase tracking-widest mb-4">Reorganization Simulator</p>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight leading-tight text-balance">
                  Test changes before you make them.
                </h2>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                  Create a hypothetical organization state. AIKYA analyzes the impact — affected employees, reporting changes, management span, and potential risks — before you apply anything.
                </p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <div className="mt-8 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="h-1.5 w-1.5 rounded-full bg-success" />
                    <span className="text-sm">Clearer ownership</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-1.5 w-1.5 rounded-full bg-success" />
                    <span className="text-sm">Reduced management overlap</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-1.5 w-1.5 rounded-full bg-warning" />
                    <span className="text-sm">Temporary reporting transition</span>
                  </div>
                </div>
              </FadeIn>
            </div>
            <FadeIn delay={0.2}>
              <div className="rounded-xl border border-border/60 bg-card p-6 shadow-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wider">Current</p>
                    <div className="space-y-2">
                      <div className="p-3 rounded-lg bg-muted/50 border border-border/40">
                        <p className="text-xs font-medium">Engineering</p>
                        <p className="text-xs text-muted-foreground">17 people · 2 managers</p>
                      </div>
                      <div className="p-3 rounded-lg bg-muted/50 border border-border/40 ml-3">
                        <p className="text-xs font-medium">Backend</p>
                        <p className="text-xs text-muted-foreground">6 people</p>
                      </div>
                      <div className="p-3 rounded-lg bg-muted/50 border border-border/40 ml-3">
                        <p className="text-xs font-medium">DevOps</p>
                        <p className="text-xs text-muted-foreground">2 people</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-accent mb-3 uppercase tracking-wider">Proposed</p>
                    <div className="space-y-2">
                      <div className="p-3 rounded-lg bg-accent/5 border border-accent/30">
                        <p className="text-xs font-medium">Product Eng</p>
                        <p className="text-xs text-muted-foreground">9 people · 1 manager</p>
                      </div>
                      <div className="p-3 rounded-lg bg-accent/5 border border-accent/30 ml-3">
                        <p className="text-xs font-medium">Platform Eng</p>
                        <p className="text-xs text-muted-foreground">4 people · 1 manager</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-3 rounded-lg bg-success/5 border border-success/20">
                  <p className="text-xs font-medium text-success">Recommended with high confidence</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Org Health ──────────────────────────────────── */}
      <section className="py-24 border-t border-border/50">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <div className="rounded-xl border border-border/60 bg-card p-8 shadow-sm text-center">
                <p className="text-sm text-muted-foreground mb-4">Organization Health Score</p>
                <div className="relative inline-flex items-center justify-center">
                  <svg className="w-40 h-40" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="44" fill="none" stroke="hsl(var(--muted))" strokeWidth="6" />
                    <motion.circle
                      cx="50" cy="50" r="44"
                      fill="none"
                      stroke="hsl(var(--accent))"
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeDasharray="276"
                      initial={{ strokeDashoffset: 276 }}
                      whileInView={{ strokeDashoffset: 276 - (276 * 82) / 100 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <span className="absolute font-serif text-4xl font-semibold">82</span>
                </div>
                <div className="mt-6 grid grid-cols-3 gap-3">
                  {[
                    { label: 'Management', score: 68, status: 'warning' },
                    { label: 'Role clarity', score: 75, status: 'warning' },
                    { label: 'Structure', score: 88, status: 'healthy' },
                  ].map((cat) => (
                    <div key={cat.label} className="p-3 rounded-lg bg-muted/40 border border-border/40">
                      <p className="text-xs text-muted-foreground">{cat.label}</p>
                      <p className="text-lg font-semibold mt-1">{cat.score}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
            <div>
              <FadeIn delay={0.1}>
                <p className="text-sm font-medium text-accent uppercase tracking-widest mb-4">Org Health</p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight leading-tight text-balance">
                  A health score for your entire organization.
                </h2>
              </FadeIn>
              <FadeIn delay={0.3}>
                <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                  AIKYA scores your organization across management, structure, role clarity, reporting, and growth readiness — and tells you exactly what to fix.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ── Hiring Intelligence ─────────────────────────── */}
      <section className="py-24 border-t border-border/50 bg-muted/30">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <FadeIn>
                <p className="text-sm font-medium text-accent uppercase tracking-widest mb-4">Hiring Intelligence</p>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight leading-tight text-balance">
                  Know who to hire — and why.
                </h2>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                  AIKYA analyzes team capacity, management spans, and responsibility gaps to recommend the exact roles you need to hire — with the reasoning behind each recommendation.
                </p>
              </FadeIn>
            </div>
            <FadeIn delay={0.2}>
              <div className="space-y-3">
                <div className="rounded-xl border border-border/60 bg-card p-5 shadow-sm">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-medium">Senior Product Designer</p>
                      <p className="text-xs text-muted-foreground mt-1">Design team · 1 designer for 4 squads</p>
                    </div>
                    <Badge variant="destructive" className="text-xs">HIGH</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Current design capacity is constrained. Designer-to-engineer ratio is 1:18 (recommended 1:8).
                  </p>
                </div>
                <div className="rounded-xl border border-border/60 bg-card p-5 shadow-sm">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-medium">Engineering Manager — Backend</p>
                      <p className="text-xs text-muted-foreground mt-1">Engineering · CTO manages 11 reports</p>
                    </div>
                    <Badge variant="destructive" className="text-xs">HIGH</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Backend team needs a dedicated manager for sustainable growth.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Analytics ───────────────────────────────────── */}
      <section className="py-24 border-t border-border/50">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <p className="text-sm font-medium text-accent uppercase tracking-widest mb-4 text-center">Analytics</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight text-center text-balance mb-4">
              Understand how your organization changes over time.
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-center text-muted-foreground max-w-xl mx-auto mb-12 text-balance">
              Headcount growth, department evolution, management span, reporting layers, and organizational changes — visualized clearly.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="grid md:grid-cols-4 gap-4">
              {[
                { label: 'Headcount', value: '45', change: '+12%', icon: Users },
                { label: 'Teams', value: '9', change: '+2', icon: Layers },
                { label: 'Avg span', value: '4.2', change: '-0.3', icon: Network },
                { label: 'Reporting layers', value: '4', change: '0', icon: GitBranch },
              ].map((stat) => (
                <div key={stat.label} className="p-6 rounded-xl border border-border/60 bg-card">
                  <stat.icon className="h-5 w-5 text-muted-foreground mb-3" />
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <div className="flex items-baseline gap-2 mt-1">
                    <p className="font-serif text-2xl font-semibold">{stat.value}</p>
                    <span className="text-xs text-success">{stat.change}</span>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Security / Trust ────────────────────────────── */}
      <section className="py-24 border-t border-border/50 bg-muted/30">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <FadeIn>
            <ShieldCheck className="h-10 w-10 text-accent mx-auto mb-6" />
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight text-balance">
              Built for organizations that take structure seriously.
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed text-balance">
              Role-based permissions, audit trails, and human-in-the-loop approval for every structural change.
            </p>
          </FadeIn>
          <StaggerContainer className="mt-12 grid md:grid-cols-3 gap-6" delay={0.3}>
            <StaggerItem>
              <div className="p-6 rounded-xl border border-border/60 bg-card text-left">
                <ShieldCheck className="h-5 w-5 text-accent mb-3" />
                <p className="font-medium text-sm">Role-based access</p>
                <p className="text-xs text-muted-foreground mt-1">Employees see only what they're authorized to see.</p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="p-6 rounded-xl border border-border/60 bg-card text-left">
                <Target className="h-5 w-5 text-accent mb-3" />
                <p className="font-medium text-sm">Audit trails</p>
                <p className="text-xs text-muted-foreground mt-1">Every organizational change is tracked and attributable.</p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="p-6 rounded-xl border border-border/60 bg-card text-left">
                <Check className="h-5 w-5 text-accent mb-3" />
                <p className="font-medium text-sm">Human approval</p>
                <p className="text-xs text-muted-foreground mt-1">AI recommends. Humans decide. Nothing applies automatically.</p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────── */}
      <section className="py-32 border-t border-border/50">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <FadeIn>
            <AikyaLogo size="lg" className="justify-center mb-8" />
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold tracking-tightest leading-tight text-balance">
              Build an organization that scales.
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed text-balance">
              Start with a free workspace. Map your team in minutes, and get your first AI-powered organizational intelligence report today.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="mt-10 flex justify-center gap-3">
              <Link href="/signup">
                <Button size="lg" className="gap-2">
                  Build your organization
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/features">
                <Button size="lg" variant="outline">Learn more</Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────── */}
      <footer className="border-t border-border/50 py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <AikyaLogo size="sm" />
              <p className="mt-4 text-sm text-muted-foreground max-w-xs">
                AI-powered organizational intelligence for companies that scale.
              </p>
              <p className="mt-3 text-xs text-muted-foreground">ऐक्य — Unity. Alignment. Oneness.</p>
            </div>
            <div>
              <p className="text-sm font-medium mb-3">Product</p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <Link href="/features" className="block hover:text-foreground transition-colors">Features</Link>
                <Link href="/pricing" className="block hover:text-foreground transition-colors">Pricing</Link>
                <Link href="/app" className="block hover:text-foreground transition-colors">Dashboard</Link>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium mb-3">Company</p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <Link href="/about" className="block hover:text-foreground transition-colors">About</Link>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium mb-3">Legal</p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <span className="block">Privacy</span>
                <span className="block">Terms</span>
                <span className="block">Security</span>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-6 border-t border-border/50 flex items-center justify-between">
            <p className="text-xs text-muted-foreground">© 2026 AIKYA. A project by Ashish Suvarna.</p>
            <p className="text-xs text-muted-foreground">Built for organizations that scale.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
