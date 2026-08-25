'use client';

import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { AikyaLogo } from '@/components/aikya-logo';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <Link href="/"><AikyaLogo /></Link>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <Link href="/features" className="hover:text-foreground transition-colors">Features</Link>
            <Link href="/about" className="text-foreground">About</Link>
            <Link href="/pricing" className="hover:text-foreground transition-colors">Pricing</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login"><Button variant="ghost" size="sm">Log in</Button></Link>
            <Link href="/signup"><Button size="sm">Get started</Button></Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-40 pb-20 text-center">
        <div className="mx-auto max-w-4xl px-6">
          <FadeIn>
            <p className="text-sm text-accent font-medium uppercase tracking-widest mb-6">About</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="font-serif text-6xl md:text-8xl font-semibold tracking-tightest leading-[0.95]">
              AIKYA
            </h1>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="mt-4 font-serif text-3xl md:text-4xl text-muted-foreground">ऐक्य</p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-6 text-lg text-muted-foreground tracking-wide">
              Unity · Alignment · Oneness
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="mt-10 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto text-balance">
              AIKYA is an AI-powered organizational intelligence platform that helps companies understand, design, and continuously improve the way their organizations work.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* What is AIKYA */}
      <section className="py-20 border-t border-border/50">
        <div className="mx-auto max-w-3xl px-6">
          <FadeIn>
            <p className="text-sm font-medium text-accent uppercase tracking-widest mb-4">What is AIKYA?</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight leading-tight text-balance">
              An intelligent layer for your entire organization.
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              AIKYA creates a living model of your organization — not just an org chart, but an intelligent system that understands people, teams, roles, reporting relationships, dependencies, and decision ownership. It helps leaders make better structural decisions with confidence.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-20 border-t border-border/50 bg-muted/30">
        <div className="mx-auto max-w-3xl px-6">
          <FadeIn>
            <p className="text-sm font-medium text-accent uppercase tracking-widest mb-4">Why organizations become difficult to manage</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight leading-tight text-balance">
              Modern organizations become increasingly complex as they grow.
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              People, teams, responsibilities, reporting structures and decision-making relationships become difficult to understand. Spans of control balloon silently. Responsibilities blur. Bottlenecks form in the gaps between teams — and by the time the pain is obvious, the fix is expensive.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Spreadsheets and HRMS tools tell you who works where. They don't tell you if your structure is healthy, where the bottlenecks are, or what happens when you reorganize.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* The AIKYA Approach */}
      <section className="py-20 border-t border-border/50">
        <div className="mx-auto max-w-5xl px-6">
          <FadeIn>
            <p className="text-sm font-medium text-accent uppercase tracking-widest mb-4 text-center">How AIKYA uses AI</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight text-center text-balance mb-16">
              Understand. Analyze. Recommend. Simulate. Predict. Optimize.
            </h2>
          </FadeIn>
          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            <StaggerItem>
              <div className="border-l-2 border-accent pl-5">
                <p className="font-serif text-xl font-semibold mb-2">Understand</p>
                <p className="text-sm text-muted-foreground leading-relaxed">Map your organization as a living system — people, teams, roles, reporting lines, and dependencies.</p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="border-l-2 border-indigo pl-5">
                <p className="font-serif text-xl font-semibold mb-2">Analyze</p>
                <p className="text-sm text-muted-foreground leading-relaxed">AI identifies bottlenecks, overlaps, risks, and structural issues invisible from a spreadsheet.</p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="border-l-2 border-coral pl-5">
                <p className="font-serif text-xl font-semibold mb-2">Recommend</p>
                <p className="text-sm text-muted-foreground leading-relaxed">Every insight leads to a specific, data-backed recommendation — not just a diagnosis.</p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="border-l-2 border-orange pl-5">
                <p className="font-serif text-xl font-semibold mb-2">Simulate</p>
                <p className="text-sm text-muted-foreground leading-relaxed">Test reorganizations in a safe environment. See impact before you commit.</p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="border-l-2 border-green pl-5">
                <p className="font-serif text-xl font-semibold mb-2">Predict</p>
                <p className="text-sm text-muted-foreground leading-relaxed">Forecast how your structure will scale. See the organization you'll need before you need it.</p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="border-l-2 border-yellow pl-5">
                <p className="font-serif text-xl font-semibold mb-2">Optimize</p>
                <p className="text-sm text-muted-foreground leading-relaxed">Continuously improve. Every change feeds back into the intelligence loop.</p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* How AIKYA differs from HRMS */}
      <section className="py-20 border-t border-border/50 bg-muted/30">
        <div className="mx-auto max-w-3xl px-6">
          <FadeIn>
            <p className="text-sm font-medium text-accent uppercase tracking-widest mb-4">How AIKYA differs from a traditional HRMS</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight leading-tight text-balance">
              Not a chatbot. An intelligence system embedded in your organization.
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              AIKYA is not a traditional HRMS. It is not an employee directory. It is not an org chart tool. AIKYA is a new product category — AI-powered organizational intelligence.
            </p>
          </FadeIn>
          <StaggerContainer className="mt-8 space-y-3" delay={0.3}>
            <StaggerItem>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <p className="text-sm">An HRMS tells you who works where. AIKYA tells you if your structure is healthy.</p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <p className="text-sm">An HRMS stores employee data. AIKYA understands relationships between people, teams, and roles.</p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <p className="text-sm">An HRMS tracks headcount. AIKYA recommends who to hire and why.</p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <p className="text-sm">An HRMS records changes. AIKYA simulates them before they happen.</p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Human-in-the-Loop */}
      <section className="py-20 border-t border-border/50">
        <div className="mx-auto max-w-3xl px-6">
          <FadeIn>
            <p className="text-sm font-medium text-accent uppercase tracking-widest mb-4">Human-in-the-loop philosophy</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight leading-tight text-balance">
              AI recommends. Humans decide.
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              AIKYA believes that AI should augment organizational decision-making, not replace it. Every meaningful structural change requires human approval. Simulations never modify live data. Intelligence without action is just a dashboard — but action without intelligence is just guesswork. AIKYA bridges the two.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* The Future */}
      <section className="py-20 border-t border-border/50 bg-muted/30">
        <div className="mx-auto max-w-3xl px-6">
          <FadeIn>
            <p className="text-sm font-medium text-accent uppercase tracking-widest mb-4">The future of organizational intelligence</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight leading-tight text-balance">
              Every company will have an intelligent organizational layer.
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Just as every company adopted CRM, analytics, and cloud infrastructure, every scaling company will adopt an intelligent organizational layer. AIKYA is building that future — where organizational design is proactive, data-driven, and continuously improving.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-border/50">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight text-balance">
              Build an organization that scales.
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="mt-8 flex justify-center gap-3">
              <Link href="/signup">
                <Button size="lg" className="gap-2">
                  Get started <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline">Explore Demo</Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Founder credit — appears only once, at the very bottom */}
      <footer className="border-t border-border/50 py-12">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-sm text-muted-foreground">AIKYA is a project by Ashish Suvarna.</p>
          <p className="mt-3 text-xs text-muted-foreground/60">© 2026 AIKYA · ऐक्य — Unity. Alignment. Oneness.</p>
        </div>
      </footer>
    </div>
  );
}
