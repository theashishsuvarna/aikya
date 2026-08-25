'use client';

import Link from 'next/link';
import { ArrowRight, Network, Bot, GitBranch, Activity, Users, Target, ShieldCheck, Search, Layers } from 'lucide-react';
import { AikyaLogo } from '@/components/aikya-logo';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const features = [
  { icon: Network, title: 'Interactive Org Chart', desc: 'Zoom, pan, expand, and search your entire organizational structure. Click any node for details.' },
  { icon: Bot, title: 'AI Advisor', desc: 'Ask questions in natural language and get answers backed by your actual organizational data.' },
  { icon: GitBranch, title: 'Reorganization Simulator', desc: 'Test structural changes without affecting your live organization. AI analyzes the impact.' },
  { icon: Activity, title: 'Org Health Dashboard', desc: 'A health score across management, structure, role clarity, reporting, and growth readiness.' },
  { icon: Users, title: 'People & Team Management', desc: 'Directory, profiles, reporting structures, responsibilities, and team-level analysis.' },
  { icon: Target, title: 'AI Hiring Planner', desc: 'AI identifies staffing gaps and recommends hires with reasoning and expected impact.' },
  { icon: Search, title: 'Natural Language Search', desc: 'Search using plain English. Find people by team, manager, location, or reporting relationship.' },
  { icon: Layers, title: 'Roles & Responsibilities', desc: 'Detect duplicate responsibilities, unclear ownership, and role conflicts.' },
  { icon: ShieldCheck, title: 'Permissions & Audit', desc: 'Role-based access control, audit trails, and human approval for every structural change.' },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <Link href="/"><AikyaLogo /></Link>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <Link href="/features" className="text-foreground">Features</Link>
            <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
            <Link href="/pricing" className="hover:text-foreground transition-colors">Pricing</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login"><Button variant="ghost" size="sm">Log in</Button></Link>
            <Link href="/signup"><Button size="sm">Get started</Button></Link>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-16 text-center">
        <div className="mx-auto max-w-4xl px-6">
          <FadeIn>
            <Badge variant="secondary" className="mb-6">Features</Badge>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="font-serif text-4xl md:text-5xl font-semibold tracking-tightest leading-tight text-balance">
              Everything you need to understand and improve your organization.
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-6 text-lg text-muted-foreground text-balance">
              AIKYA is the intelligence layer for organizational design — not an HRMS, not a directory. It's how you understand, analyze, and continuously improve how your company is organized.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <StaggerItem key={f.title}>
                <div className="p-6 rounded-xl border border-border/60 bg-card hover:border-border transition-colors h-full">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent mb-4">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-medium mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-24 border-t border-border/50 bg-muted/30">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight text-balance">
              Ready to build a healthier organization?
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <Link href="/signup" className="inline-block mt-8">
              <Button size="lg" className="gap-2">
                Get started <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
