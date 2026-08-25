'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { AikyaLogo } from '@/components/aikya-logo';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const plans = [
  {
    name: 'Starter',
    monthly: 2499,
    description: 'For small teams getting started with organizational intelligence.',
    features: [
      'Organization management',
      'Interactive org chart',
      'People & Teams',
      'Basic AI insights',
      'Org Health dashboard',
    ],
    cta: 'Start with Starter',
    highlighted: false,
  },
  {
    name: 'Growth',
    monthly: 6999,
    description: 'For growing organizations that need full intelligence.',
    features: [
      'Everything in Starter',
      'AI Advisor (unlimited)',
      'Reorganization Simulator',
      'Hiring Intelligence',
      'Roles & Responsibilities analysis',
      'Advanced analytics & reports',
    ],
    cta: 'Start with Growth',
    highlighted: true,
  },
  {
    name: 'Scale',
    monthly: 14999,
    description: 'For scaling organizations with advanced needs.',
    features: [
      'Everything in Growth',
      'Organization Digital Twin',
      'Future Org Forecast',
      'Decision Intelligence',
      'Dependency Intelligence',
      'Org DNA & Experiment Lab',
    ],
    cta: 'Start with Scale',
    highlighted: false,
  },
  {
    name: 'Enterprise',
    monthly: null,
    description: 'For large organizations with custom requirements.',
    features: [
      'Everything in Scale',
      'Custom deployment',
      'SSO & SAML',
      'Advanced permissions',
      'Enterprise integrations',
      'Dedicated support & custom AI policies',
    ],
    cta: 'Contact sales',
    highlighted: false,
  },
];

function formatINR(amount: number) {
  return '₹' + amount.toLocaleString('en-IN');
}

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <Link href="/"><AikyaLogo /></Link>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <Link href="/features" className="hover:text-foreground transition-colors">Features</Link>
            <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
            <Link href="/pricing" className="text-foreground">Pricing</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login"><Button variant="ghost" size="sm">Log in</Button></Link>
            <Link href="/signup"><Button size="sm">Get started</Button></Link>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-12 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <FadeIn>
            <h1 className="font-serif text-4xl md:text-5xl font-semibold tracking-tightest leading-tight text-balance">
              Pricing that scales with your organization.
            </h1>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="mt-6 text-lg text-muted-foreground text-balance">
              Start with a free trial. Upgrade when your organization needs deeper intelligence.
            </p>
          </FadeIn>
          <FadeIn delay={0.25}>
            <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-border/60 bg-card p-1">
              <button
                onClick={() => setAnnual(false)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${!annual ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Monthly
              </button>
              <button
                onClick={() => setAnnual(true)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${annual ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Annual
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${annual ? 'bg-primary-foreground/20 text-primary-foreground' : 'bg-accent/15 text-accent'}`}>Save 20%</span>
              </button>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
            {plans.map((plan) => {
              const displayPrice = plan.monthly === null
                ? 'Custom'
                : annual
                  ? formatINR(Math.round(plan.monthly * 0.8))
                  : formatINR(plan.monthly);
              return (
                <StaggerItem key={plan.name}>
                  <div className={`p-7 rounded-2xl border h-full flex flex-col ${plan.highlighted ? 'border-accent bg-accent/5 shadow-lg' : 'border-border/60 bg-card'}`}>
                    {plan.highlighted && (
                      <Badge className="mb-4 bg-accent text-accent-foreground w-fit">Most popular</Badge>
                    )}
                    <h3 className="font-serif text-xl font-semibold">{plan.name}</h3>
                    <div className="mt-4 flex items-baseline gap-1.5">
                      <span className="font-serif text-4xl font-semibold">{displayPrice}</span>
                      {plan.monthly !== null && (
                        <span className="text-sm text-muted-foreground">/month</span>
                      )}
                    </div>
                    {plan.monthly !== null && annual && (
                      <p className="mt-1 text-xs text-accent">Billed annually</p>
                    )}
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{plan.description}</p>
                    <div className="mt-6">
                      <Link href="/signup" className="block">
                        <Button className="w-full" variant={plan.highlighted ? 'default' : 'outline'}>
                          {plan.cta}
                        </Button>
                      </Link>
                    </div>
                    <div className="mt-7 space-y-3 flex-1">
                      {plan.features.map((f) => (
                        <div key={f} className="flex items-start gap-2.5">
                          <Check className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
          <FadeIn delay={0.3}>
            <p className="mt-10 text-center text-sm text-muted-foreground">
              All plans include a 14-day free trial. No credit card required. Prices in Indian Rupees (INR).
            </p>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
