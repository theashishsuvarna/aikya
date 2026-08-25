'use client';

import { motion } from 'framer-motion';
import { FileCheck, Sparkles } from 'lucide-react';
import { AppHeader } from '@/components/app-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const responsibilities = [
  {
    area: 'Roadmap ownership',
    clarity: 62,
    owners: [
      { name: 'PM A (Aditya)', share: 60 },
      { name: 'PM B (Kabir)', share: 40 },
    ],
    issue: 'Ownership ambiguity — two PMs share roadmap ownership without clear domain boundaries.',
    recommendation: 'Split: PM A owns Growth & Monetization roadmap. PM B owns Platform & Infrastructure roadmap.',
  },
  {
    area: 'Architecture decisions',
    clarity: 45,
    owners: [
      { name: 'CTO (Rahul)', share: 90 },
      { name: 'Backend Lead', share: 10 },
    ],
    issue: 'Centralized ownership — 90% of architecture decisions require CTO approval.',
    recommendation: 'Delegate architecture decisions to team leads. CTO reviews only cross-team changes.',
  },
  {
    area: 'Design system',
    clarity: 88,
    owners: [
      { name: 'Design Head (Sana)', share: 80 },
      { name: 'Senior Designer', share: 20 },
    ],
    issue: 'Clear ownership with healthy delegation.',
    recommendation: 'No action needed. Consider formalizing the Senior Designer as Design System Owner.',
  },
  {
    area: 'Hiring decisions',
    clarity: 71,
    owners: [
      { name: 'CEO (Ashish)', share: 40 },
      { name: 'CTO (Rahul)', share: 35 },
      { name: 'CPO (Aditya)', share: 25 },
    ],
    issue: 'Distributed ownership — hiring decisions are shared across three leaders without a clear process.',
    recommendation: 'Create a hiring committee. Each leader owns hiring for their department.',
  },
];

export default function ResponsibilitiesPage() {
  return (
    <div>
      <AppHeader title="Responsibilities" subtitle="Map ownership across your organization." />
      <div className="p-6 space-y-6 max-w-7xl">
        <div className="grid md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <p className="font-serif text-3xl font-semibold">4</p>
              <p className="text-xs text-muted-foreground mt-0.5">Responsibility areas mapped</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="font-serif text-3xl font-semibold">2</p>
              <p className="text-xs text-muted-foreground mt-0.5">Ownership ambiguities detected</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="font-serif text-3xl font-semibold">67</p>
              <p className="text-xs text-muted-foreground mt-0.5">Average clarity score</p>
            </CardContent>
          </Card>
        </div>

        {responsibilities.map((resp, i) => (
          <motion.div
            key={resp.area}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileCheck className="h-4 w-4 text-accent" />
                    <CardTitle className="text-base">{resp.area}</CardTitle>
                  </div>
                  <Badge variant={resp.clarity < 60 ? 'destructive' : resp.clarity < 80 ? 'secondary' : 'outline'} className="text-xs">
                    Clarity: {resp.clarity}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Ownership distribution</p>
                  <div className="space-y-2">
                    {resp.owners.map((owner) => (
                      <div key={owner.name}>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span>{owner.name}</span>
                          <span className="text-muted-foreground">{owner.share}%</span>
                        </div>
                        <Progress value={owner.share} className="h-1.5" />
                      </div>
                    ))}
                  </div>
                </div>

                {resp.clarity < 80 && (
                  <div className="p-3 rounded-lg bg-accent/5 border border-accent/20">
                    <div className="flex items-start gap-2">
                      <Sparkles className="h-3.5 w-3.5 text-accent mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground leading-relaxed mb-1">{resp.issue}</p>
                        <p className="text-sm font-medium">{resp.recommendation}</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
