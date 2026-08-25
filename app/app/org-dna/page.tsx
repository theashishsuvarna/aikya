'use client';

import { motion } from 'framer-motion';
import { Dna, Sparkles } from 'lucide-react';
import { AppHeader } from '@/components/app-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export default function OrgDnaPage() {
  const dnaTraits = [
    { name: 'Structure', score: 82, color: 'bg-indigo', description: 'Departmental boundaries are clear with well-defined team structures.' },
    { name: 'Management', score: 68, color: 'bg-coral', description: 'Centralized decision-making with an emerging bottleneck in Engineering.' },
    { name: 'Role clarity', score: 74, color: 'bg-orange', description: 'Most roles have clear ownership, but two Product Manager roles overlap.' },
    { name: 'Decision velocity', score: 79, color: 'bg-green', description: 'Decisions flow quickly in most teams, but slow at the CTO bottleneck.' },
    { name: 'Collaboration', score: 81, color: 'bg-yellow', description: 'Cross-team collaboration is healthy, with strong Product-Engineering alignment.' },
    { name: 'Growth readiness', score: 86, color: 'bg-accent', description: 'Northstar is well-positioned to scale, with a clear hiring plan needed for Engineering.' },
  ];

  return (
    <div>
      <AppHeader title="Organization DNA" subtitle="The genetic blueprint of your organization." />
      <div className="p-6 space-y-6 max-w-7xl">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Dna className="h-4 w-4 text-accent" />
              <CardTitle className="text-base">DNA Analysis</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center mb-8">
              <div className="relative">
                <svg className="w-32 h-32" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--muted))" strokeWidth="6" />
                  <motion.circle
                    cx="50" cy="50" r="42"
                    fill="none"
                    stroke="hsl(var(--accent))"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray="264"
                    initial={{ strokeDashoffset: 264 }}
                    animate={{ strokeDashoffset: 264 - (264 * 78) / 100 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center font-serif text-3xl font-semibold">78</span>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {dnaTraits.map((trait, i) => (
                <motion.div
                  key={trait.name}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="p-4 rounded-lg border border-border/60"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{trait.name}</span>
                    <span className="font-serif text-lg font-semibold">{trait.score}</span>
                  </div>
                  <Progress value={trait.score} className="h-1.5 mb-2" />
                  <p className="text-xs text-muted-foreground leading-relaxed">{trait.description}</p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-accent/5 border-accent/30">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-accent" />
              <CardTitle className="text-base">AI Summary</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Northstar is engineering-heavy with centralized decision-making and an emerging management bottleneck. The CTO directly manages 11 people — significantly above the recommended span of 5–7. Role clarity is generally strong, but two Product Manager roles share roadmap ownership without clear domain boundaries. Growth readiness is high, but scaling past 60 people will require delegating platform decisions and adding a dedicated Engineering Manager for Backend.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
