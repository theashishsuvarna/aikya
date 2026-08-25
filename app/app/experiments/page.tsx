'use client';

import { motion } from 'framer-motion';
import { FlaskConical, Sparkles, Check } from 'lucide-react';
import { AppHeader } from '@/components/app-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const scenarios = [
  {
    name: 'Scenario A: Centralized Product',
    description: 'All product decisions flow through CPO. Single product vision, slower execution.',
    metrics: { management: 72, clarity: 68, growth: 65, velocity: 60, risk: 45, complexity: 40 },
    recommendation: false,
  },
  {
    name: 'Scenario B: Autonomous Product Squads',
    description: 'PMs own roadmap decisions within their domains. CPO sets strategy only.',
    metrics: { management: 84, clarity: 86, growth: 82, velocity: 88, risk: 72, complexity: 65 },
    recommendation: true,
  },
  {
    name: 'Scenario C: Split Engineering',
    description: 'Engineering splits into Product Eng and Platform Eng with separate EMs.',
    metrics: { management: 88, clarity: 80, growth: 85, velocity: 82, risk: 78, complexity: 70 },
    recommendation: false,
  },
];

const metricLabels: Record<string, string> = {
  management: 'Management efficiency',
  clarity: 'Role clarity',
  growth: 'Growth readiness',
  velocity: 'Decision velocity',
  risk: 'Risk (lower is better)',
  complexity: 'Complexity (lower is better)',
};

export default function ExperimentsPage() {
  return (
    <div>
      <AppHeader title="Experiment Lab" subtitle="Compare organizational scenarios side by side." />
      <div className="p-6 space-y-6 max-w-7xl">
        <div className="grid lg:grid-cols-3 gap-4">
          {scenarios.map((scenario, i) => (
            <motion.div
              key={scenario.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className={scenario.recommendation ? 'border-accent bg-accent/5' : ''}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <FlaskConical className="h-4 w-4 text-accent" />
                      <CardTitle className="text-sm">{scenario.name}</CardTitle>
                    </div>
                    {scenario.recommendation && <Badge className="text-[10px] bg-accent text-accent-foreground">Recommended</Badge>}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-xs text-muted-foreground leading-relaxed">{scenario.description}</p>
                  <div className="space-y-2">
                    {Object.entries(scenario.metrics).map(([key, value]) => (
                      <div key={key}>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-muted-foreground">{metricLabels[key]}</span>
                          <span className="font-medium">{value}</span>
                        </div>
                        <Progress value={key === 'risk' || key === 'complexity' ? 100 - value : value} className="h-1" />
                      </div>
                    ))}
                  </div>
                  {scenario.recommendation && (
                    <div className="pt-2 border-t border-border/50 flex items-center gap-2">
                      <Sparkles className="h-3.5 w-3.5 text-accent" />
                      <p className="text-xs text-accent">Best overall score</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Card className="bg-accent/5 border-accent/30">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-accent" />
              <CardTitle className="text-base">AIKYA recommends</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Scenario B (Autonomous Product Squads) scores highest overall. It improves decision velocity by 28 points over the current centralized model while maintaining role clarity. Combine with Scenario C (Split Engineering) for maximum impact — autonomous product squads plus a dedicated Platform Engineering team would address both the product and engineering bottlenecks simultaneously.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <Check className="h-4 w-4 text-success" />
              <span className="text-sm font-medium">Combine B + C for optimal results</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
