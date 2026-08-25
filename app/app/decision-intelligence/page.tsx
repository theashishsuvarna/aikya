'use client';

import { motion } from 'framer-motion';
import { Brain, AlertTriangle, Users, ArrowRight } from 'lucide-react';
import { AppHeader } from '@/components/app-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export default function DecisionIntelligencePage() {
  const bottlenecks = [
    {
      title: 'Engineering decision bottleneck',
      description: '73% of major engineering decisions pass through one person (CTO).',
      affected: 17,
      impact: ['Slower execution', 'Management overload', 'Reduced team autonomy'],
      recommendation: 'Delegate platform decisions to a Platform Engineering Lead. Allow Backend EM to own architecture decisions for their team.',
      severity: 'HIGH',
      concentration: 73,
    },
    {
      title: 'Product roadmap bottleneck',
      description: 'All product roadmap decisions flow through the CPO, creating a single point of failure.',
      affected: 4,
      impact: ['Slower product iteration', 'PM dependency on CPO', 'Bottleneck during CPO absence'],
      recommendation: 'Empower PMs to own roadmap decisions within their product areas. CPO sets strategy, PMs execute.',
      severity: 'MEDIUM',
      concentration: 85,
    },
  ];

  return (
    <div>
      <AppHeader title="Decision Intelligence" subtitle="Where do decisions get stuck?" />
      <div className="p-6 space-y-6 max-w-7xl">
        {bottlenecks.map((b, i) => (
          <motion.div
            key={b.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className={b.severity === 'HIGH' ? 'border-destructive/30' : ''}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Brain className="h-4 w-4 text-accent" />
                    <CardTitle className="text-base">Decision Bottleneck Detected</CardTitle>
                  </div>
                  <Badge variant={b.severity === 'HIGH' ? 'destructive' : 'secondary'} className="text-xs">{b.severity}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm font-medium">{b.title}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{b.description}</p>

                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Decision concentration</span>
                    <span className="font-medium">{b.concentration}%</span>
                  </div>
                  <Progress value={b.concentration} className="h-1.5" />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Affected</p>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{b.affected} employees</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Potential impact</p>
                    <div className="space-y-1">
                      {b.impact.map((imp) => (
                        <div key={imp} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <AlertTriangle className="h-3 w-3 text-warning" />
                          {imp}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-accent/5 border border-accent/20">
                  <p className="text-xs font-medium text-accent uppercase tracking-wider mb-1">Recommendation</p>
                  <p className="text-sm leading-relaxed">{b.recommendation}</p>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="gap-1.5">Simulate <ArrowRight className="h-3 w-3" /></Button>
                  <Button size="sm" variant="ghost">Review details</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
