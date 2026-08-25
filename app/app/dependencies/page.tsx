'use client';

import { motion } from 'framer-motion';
import { Workflow, AlertTriangle, ArrowRight } from 'lucide-react';
import { AppHeader } from '@/components/app-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const dependencies = [
  { from: 'Product', to: 'Engineering', type: 'delivery', strength: 'Critical', description: 'Product depends on Engineering for all feature delivery.' },
  { from: 'Design', to: 'Product', type: 'design', strength: 'High', description: 'Design depends on Product for requirements and prioritization.' },
  { from: 'Sales', to: 'Product', type: 'roadmap', strength: 'High', description: 'Sales depends on Product for roadmap commitments to customers.' },
  { from: 'Marketing', to: 'Sales', type: 'pipeline', strength: 'Medium', description: 'Marketing depends on Sales for pipeline feedback and conversion data.' },
  { from: 'Engineering', to: 'Design', type: 'implementation', strength: 'Medium', description: 'Engineering depends on Design for specs and design system.' },
];

const criticalDeps = [
  {
    title: 'Critical dependency on single Product Manager',
    description: 'Product currently depends on one Product Manager for four squads. If this person is unavailable, product decisions stall across the entire department.',
    risk: 'Single point of failure for product roadmap decisions',
    impact: '4 squads affected',
    recommendation: 'Hire a second PM to split ownership. Assign PM A to Growth squads and PM B to Platform squads.',
  },
  {
    title: 'Engineering dependency on CTO for architecture',
    description: 'All architecture decisions require CTO approval, creating a dependency bottleneck for 17 engineers.',
    risk: 'Decision velocity reduced for all engineering teams',
    impact: '17 engineers affected',
    recommendation: 'Delegate architecture decisions to team leads. CTO reviews only cross-team architectural changes.',
  },
];

export default function DependenciesPage() {
  return (
    <div>
      <AppHeader title="Dependencies" subtitle="Who depends on whom?" />
      <div className="p-6 space-y-6 max-w-7xl">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Workflow className="h-4 w-4 text-accent" />
              <CardTitle className="text-base">Dependency map</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {dependencies.map((dep, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-4 p-3 rounded-lg border border-border/60 hover:bg-secondary/30 transition-colors"
              >
                <div className="flex items-center gap-2 flex-1">
                  <Badge variant="secondary" className="text-xs">{dep.from}</Badge>
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                  <Badge variant="secondary" className="text-xs">{dep.to}</Badge>
                </div>
                <span className="text-sm text-muted-foreground hidden md:block">{dep.description}</span>
                <Badge variant={dep.strength === 'Critical' ? 'destructive' : dep.strength === 'High' ? 'secondary' : 'outline'} className="text-[10px]">{dep.strength}</Badge>
              </motion.div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-4">
          <p className="text-sm font-medium text-accent uppercase tracking-widest">Critical Dependencies Detected</p>
          {criticalDeps.map((dep, i) => (
            <motion.div
              key={dep.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="border-warning/30">
                <CardHeader>
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-warning flex-shrink-0 mt-0.5" />
                    <div>
                      <CardTitle className="text-base">{dep.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground leading-relaxed">{dep.description}</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Risk</p>
                      <p className="text-sm">{dep.risk}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Impact</p>
                      <p className="text-sm">{dep.impact}</p>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-accent/5 border border-accent/20">
                    <p className="text-xs font-medium text-accent uppercase tracking-wider mb-1">Recommendation</p>
                    <p className="text-sm leading-relaxed">{dep.recommendation}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
