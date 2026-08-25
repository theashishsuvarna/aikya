'use client';

import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, Sparkles, AlertTriangle, CheckCircle2, GitBranch, ArrowRight } from 'lucide-react';
import { AppHeader } from '@/components/app-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { teams, departments, employees, hiringPlans } from '@/lib/demo-data';
import Link from 'next/link';

export default function TeamDetailPage() {
  const params = useParams();
  const router = useRouter();
  const team = teams.find((t) => t.id === params.id);

  if (!team) {
    return (
      <div>
        <AppHeader title="Team not found" />
        <div className="p-6 text-center text-muted-foreground">This team doesn't exist.</div>
      </div>
    );
  }

  const dept = departments.find((d) => d.id === team.departmentId);
  const manager = team.managerId ? employees.find((e) => e.id === team.managerId) : null;
  const members = employees.filter((e) => e.teamId === team.id);
  const openRoles = hiringPlans.filter((h) => h.teamId === team.id);
  const managerSpan = manager ? employees.filter((e) => e.managerId === manager.id).length : 0;

  return (
    <div>
      <AppHeader title={team.name} subtitle={dept?.name} />

      <div className="p-6 max-w-5xl">
        <Button variant="ghost" size="sm" className="gap-1.5 mb-4" onClick={() => router.push('/app/teams')}>
          <ArrowLeft className="h-4 w-4" /> Back to teams
        </Button>

        <div className="grid lg:grid-cols-3 gap-4">
          {/* Left: Summary */}
          <div className="space-y-4">
            <Card>
              <CardContent className="p-5">
                <p className="text-sm text-muted-foreground mb-1">{dept?.name}</p>
                <h2 className="font-serif text-xl font-semibold">{team.name}</h2>
                <p className="text-sm text-muted-foreground mt-2">{team.description}</p>
                <div className="flex items-center gap-2 mt-3 flex-wrap">
                  <Badge variant="secondary" className="text-xs">{members.length} members</Badge>
                  <Badge variant="outline" className="text-xs">Health: {team.health}</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="text-sm">Manager</CardTitle></CardHeader>
              <CardContent>
                {manager ? (
                  <Link href={`/app/people/${manager.id}`}>
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
                      <div className="h-8 w-8 rounded-full flex items-center justify-center text-white text-xs font-medium" style={{ background: manager.avatarColor }}>
                        {manager.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{manager.name}</p>
                        <p className="text-xs text-muted-foreground">{manager.title}</p>
                      </div>
                    </div>
                  </Link>
                ) : <p className="text-xs text-muted-foreground">No manager assigned.</p>}
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="text-sm">Responsibilities</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {team.responsibilities.map((r, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <div className="h-1.5 w-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                      <span>{r}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: Members + AI Analysis */}
          <div className="lg:col-span-2 space-y-4">
            {/* AI Team Analysis */}
            <Card className="bg-accent/5 border-accent/20">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-accent" />
                  <CardTitle className="text-sm">AI Team Analysis</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-card border border-border/60">
                    <p className="text-xs text-muted-foreground">Team health</p>
                    <p className={`text-lg font-semibold mt-1 ${team.health >= 80 ? 'text-success' : team.health >= 65 ? 'text-warning' : 'text-destructive'}`}>{team.health}/100</p>
                  </div>
                  <div className="p-3 rounded-lg bg-card border border-border/60">
                    <p className="text-xs text-muted-foreground">Manager span</p>
                    <p className={`text-lg font-semibold mt-1 ${managerSpan > 8 ? 'text-destructive' : 'text-foreground'}`}>{managerSpan} reports</p>
                  </div>
                </div>

                <div className="space-y-2">
                  {team.health < 75 && (
                    <div className="flex items-start gap-2 text-xs p-2.5 rounded-lg bg-warning/5 border border-warning/20">
                      <AlertTriangle className="h-3.5 w-3.5 text-warning mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Staffing gap detected</p>
                        <p className="text-muted-foreground mt-0.5">Team health is below recommended. Consider adding headcount or redistributing work.</p>
                      </div>
                    </div>
                  )}
                  {managerSpan > 8 && (
                    <div className="flex items-start gap-2 text-xs p-2.5 rounded-lg bg-destructive/5 border border-destructive/20">
                      <AlertTriangle className="h-3.5 w-3.5 text-destructive mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Manager overload</p>
                        <p className="text-muted-foreground mt-0.5">Manager has {managerSpan} direct reports — above the recommended 5–7.</p>
                      </div>
                    </div>
                  )}
                  {team.responsibilities.length > 3 && (
                    <div className="flex items-start gap-2 text-xs p-2.5 rounded-lg bg-accent/5 border border-accent/20">
                      <CheckCircle2 className="h-3.5 w-3.5 text-accent mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Well-defined responsibilities</p>
                        <p className="text-muted-foreground mt-0.5">Team has clear ownership areas defined.</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Members */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">Members ({members.length})</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {members.map((m) => (
                  <Link key={m.id} href={`/app/people/${m.id}`}>
                    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer">
                      <div className="h-8 w-8 rounded-full flex items-center justify-center text-white text-xs font-medium" style={{ background: m.avatarColor }}>
                        {m.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{m.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{m.title}</p>
                      </div>
                      {m.id === team.managerId && <Badge variant="secondary" className="text-[10px]">Manager</Badge>}
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>

            {/* Open Roles */}
            {openRoles.length > 0 && (
              <Card>
                <CardHeader><CardTitle className="text-sm">Open roles ({openRoles.length})</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                  {openRoles.map((r) => (
                    <div key={r.id} className="flex items-start justify-between p-3 rounded-lg bg-secondary/50">
                      <div>
                        <p className="text-sm font-medium">{r.roleTitle}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{r.reason}</p>
                      </div>
                      <Badge variant={r.priority === 'HIGH' ? 'destructive' : 'secondary'} className="text-[10px]">{r.priority}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
