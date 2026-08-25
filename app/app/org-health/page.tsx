'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, ArrowRight, Sparkles, GitBranch } from 'lucide-react';
import Link from 'next/link';
import { AppHeader } from '@/components/app-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { getOrgHealth } from '@/lib/ai-service';
import { cn } from '@/lib/utils';

export default function OrgHealthPage() {
  const health = getOrgHealth();

  const statusColor = (status: string) =>
    status === 'HEALTHY' ? 'text-success' : status === 'WARNING' ? 'text-warning' : 'text-destructive';
  const statusBg = (status: string) =>
    status === 'HEALTHY' ? 'bg-success' : status === 'WARNING' ? 'bg-warning' : 'bg-destructive';

  return (
    <div>
      <AppHeader title="Organization Health" subtitle="How healthy is your organization?" />

      <div className="p-6 max-w-7xl space-y-6">
        {/* Main Score */}
        <div className="grid lg:grid-cols-3 gap-4">
          <Card className="lg:col-span-1">
            <CardContent className="p-6 flex flex-col items-center">
              <p className="text-sm text-muted-foreground mb-4">Organization Health Score</p>
              <div className="relative">
                <svg className="w-36 h-36" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--muted))" strokeWidth="6" />
                  <motion.circle
                    cx="50" cy="50" r="42"
                    fill="none"
                    stroke="hsl(var(--accent))"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray="264"
                    initial={{ strokeDashoffset: 264 }}
                    animate={{ strokeDashoffset: 264 - (264 * health.overall) / 100 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-serif text-4xl font-semibold">{health.overall}</span>
                  <span className="text-xs text-muted-foreground">out of 100</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4 text-center max-w-xs">{health.summary}</p>
            </CardContent>
          </Card>

          {/* Categories */}
          <Card className="lg:col-span-2">
            <CardHeader><CardTitle className="text-base">Health breakdown</CardTitle></CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4">
                {health.categories.map((cat, i) => (
                  <motion.div
                    key={cat.name}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="text-sm font-medium">{cat.name}</p>
                        <p className="text-xs text-muted-foreground">{cat.description}</p>
                      </div>
                      <span className={cn('text-lg font-semibold', statusColor(cat.status))}>{cat.score}</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        className={cn('h-full rounded-full', statusBg(cat.status))}
                        initial={{ width: 0 }}
                        animate={{ width: `${cat.score}%` }}
                        transition={{ duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Issues */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="h-4 w-4 text-warning" />
            <h2 className="font-serif text-xl font-semibold">AI-identified issues</h2>
            <Badge variant="secondary" className="text-xs">{health.issues.length} issues</Badge>
          </div>

          <div className="space-y-3">
            {health.issues.map((issue, i) => (
              <motion.div
                key={issue.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Card>
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          'h-2 w-2 rounded-full',
                          issue.priority === 'HIGH' ? 'bg-destructive' : issue.priority === 'MEDIUM' ? 'bg-warning' : 'bg-muted-foreground'
                        )} />
                        <span className={cn(
                          'text-[10px] font-medium uppercase tracking-wider',
                          issue.priority === 'HIGH' ? 'text-destructive' : issue.priority === 'MEDIUM' ? 'text-warning' : 'text-muted-foreground'
                        )}>
                          {issue.priority} priority
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">{issue.affectedEmployeeCount} people affected</span>
                    </div>

                    <h3 className="font-medium mb-2">{issue.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{issue.explanation}</p>

                    <div className="grid sm:grid-cols-2 gap-3 mb-3">
                      <div className="p-3 rounded-lg bg-destructive/5 border border-destructive/15">
                        <p className="text-[10px] font-medium text-destructive uppercase tracking-wider mb-1">Impact</p>
                        <p className="text-xs text-muted-foreground">{issue.impact}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-accent/5 border border-accent/15">
                        <p className="text-[10px] font-medium text-accent uppercase tracking-wider mb-1">Recommendation</p>
                        <p className="text-xs text-muted-foreground">{issue.recommendation}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <GitBranch className="h-3 w-3" />
                        {issue.affectedTeamNames.join(', ')}
                      </div>
                      <Link href="/app/simulator" className="ml-auto">
                        <Button size="sm" variant="outline" className="gap-1.5 text-xs">
                          Simulate change <ArrowRight className="h-3 w-3" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
