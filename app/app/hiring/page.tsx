'use client';

import { motion } from 'framer-motion';
import { UserPlus, Sparkles, ArrowRight, TrendingUp } from 'lucide-react';
import { AppHeader } from '@/components/app-header';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { generateHiringRecommendations } from '@/lib/ai-service';
import { departments, teams } from '@/lib/demo-data';
import { cn } from '@/lib/utils';

export default function HiringPage() {
  const plans = generateHiringRecommendations();
  const getDeptName = (id: string) => departments.find((d) => d.id === id)?.name ?? '';
  const getTeamName = (id: string | null) => id ? teams.find((t) => t.id === id)?.name ?? '' : '';

  const priorityColors: Record<string, string> = {
    HIGH: 'border-destructive/20 bg-destructive/5',
    MEDIUM: 'border-warning/20 bg-warning/5',
    LOW: 'border-muted bg-secondary/30',
  };

  return (
    <div>
      <AppHeader title="AI Hiring Planner" subtitle="Know who to hire — and why" />

      <div className="p-6 max-w-7xl space-y-6">
        {/* AI Banner */}
        <Card className="bg-accent/5 border-accent/20">
          <CardContent className="p-5 flex items-start gap-3">
            <Sparkles className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">AIKYA analyzed your organization</p>
              <p className="text-sm text-muted-foreground mt-1">
                {plans.length} hiring recommendations based on team capacity, management spans, and responsibility gaps.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Hiring Cards */}
        <div className="grid md:grid-cols-2 gap-4">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Card className={cn('h-full', priorityColors[plan.priority])}>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-card border border-border flex items-center justify-center">
                        <UserPlus className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">{plan.roleTitle}</p>
                        <p className="text-xs text-muted-foreground">{getDeptName(plan.departmentId)} · {getTeamName(plan.teamId)}</p>
                      </div>
                    </div>
                    <Badge variant={plan.priority === 'HIGH' ? 'destructive' : plan.priority === 'MEDIUM' ? 'secondary' : 'outline'} className="text-xs">
                      {plan.priority}
                    </Badge>
                  </div>

                  <div className="space-y-3 mt-4">
                    <div>
                      <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-1">Why</p>
                      <p className="text-sm text-muted-foreground">{plan.reason}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-1">Expected impact</p>
                      <p className="text-sm text-muted-foreground">{plan.expectedImpact}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between pt-3 border-t border-border/40">
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        'text-[10px] px-2 py-0.5 rounded-full font-medium',
                        plan.status === 'OPEN' && 'bg-accent/10 text-accent',
                        plan.status === 'IN_PROGRESS' && 'bg-warning/10 text-warning',
                        plan.status === 'FILLED' && 'bg-success/10 text-success'
                      )}>
                        {plan.status.replace('_', ' ')}
                      </span>
                    </div>
                    <Button size="sm" variant="outline" className="gap-1.5 text-xs">
                      Create hiring plan <ArrowRight className="h-3 w-3" />
                    </Button>
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
