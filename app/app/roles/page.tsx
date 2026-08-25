'use client';

import { motion } from 'framer-motion';
import { Briefcase, Sparkles, AlertTriangle, ArrowRight, Check } from 'lucide-react';
import { AppHeader } from '@/components/app-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { roles, departments, teams } from '@/lib/demo-data';
import { analyzeRoleOverlap } from '@/lib/ai-service';

const seniorityLabels: Record<string, string> = {
  C_LEVEL: 'C-Level',
  VP: 'VP',
  DIRECTOR: 'Director',
  MANAGER: 'Manager',
  SENIOR: 'Senior',
  MID: 'Mid',
  JUNIOR: 'Junior',
};

export default function RolesPage() {
  const overlaps = analyzeRoleOverlap();
  const getDeptName = (id: string) => departments.find((d) => d.id === id)?.name ?? '';
  const getTeamName = (id: string | null) => id ? teams.find((t) => t.id === id)?.name ?? '' : '';

  return (
    <div>
      <AppHeader title="Roles & Responsibilities" subtitle="Understand ownership across your organization" />

      <div className="p-6 max-w-7xl space-y-6">
        {/* AI Overlap Detection */}
        <Card className="bg-accent/5 border-accent/20">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-accent" />
              <CardTitle className="text-sm">AI Role Analysis</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {overlaps.overlaps.map((overlap, i) => (
              <div key={i} className="p-4 rounded-lg bg-card border border-border/60">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">
                      {overlap.role1} and {overlap.role2} share significant responsibility
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Team: {overlap.teamName}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {overlap.sharedResponsibilities.map((r) => (
                    <Badge key={r} variant="secondary" className="text-xs gap-1">
                      <AlertTriangle className="h-2.5 w-2.5 text-warning" /> {r}
                    </Badge>
                  ))}
                </div>
                <div className="mt-3 p-2.5 rounded-lg bg-accent/5 border border-accent/15">
                  <p className="text-[10px] font-medium text-accent uppercase tracking-wider mb-1">Recommendation</p>
                  <p className="text-xs text-muted-foreground">{overlap.recommendation}</p>
                </div>
                <Button size="sm" variant="outline" className="mt-3 gap-1.5 text-xs">
                  Clarify ownership <ArrowRight className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Roles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {roles.map((role, i) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.03, 0.5) }}
            >
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-lg bg-secondary flex items-center justify-center">
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{role.title}</p>
                        <p className="text-xs text-muted-foreground">{getDeptName(role.departmentId)}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-[10px]">{seniorityLabels[role.seniority]}</Badge>
                  </div>

                  {getTeamName(role.teamId) && (
                    <p className="text-xs text-muted-foreground mb-2">Team: {getTeamName(role.teamId)}</p>
                  )}

                  <div className="space-y-1.5 mt-3">
                    {role.responsibilities.map((r, j) => (
                      <div key={j} className="flex items-start gap-1.5 text-xs">
                        <Check className="h-3 w-3 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{r}</span>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-3" />

                  <div>
                    <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-1.5">Expected skills</p>
                    <div className="flex flex-wrap gap-1">
                      {role.expectedSkills.map((s) => (
                        <Badge key={s} variant="outline" className="text-[10px]">{s}</Badge>
                      ))}
                    </div>
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
