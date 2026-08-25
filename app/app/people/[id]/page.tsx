'use client';

import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, MapPin, GitBranch, Users, Briefcase, Sparkles, AlertTriangle, Calendar } from 'lucide-react';
import { AppHeader } from '@/components/app-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { employees, teams, departments, orgChanges } from '@/lib/demo-data';
import { cn } from '@/lib/utils';

export default function EmployeeProfilePage() {
  const params = useParams();
  const router = useRouter();
  const emp = employees.find((e) => e.id === params.id);

  if (!emp) {
    return (
      <div>
        <AppHeader title="Person not found" />
        <div className="p-6 text-center text-muted-foreground">This person doesn't exist in the organization.</div>
      </div>
    );
  }

  const manager = employees.find((e) => e.id === emp.managerId);
  const directReports = employees.filter((e) => e.managerId === emp.id);
  const team = teams.find((t) => t.id === emp.teamId);
  const dept = departments.find((d) => d.id === emp.departmentId);
  const recentChanges = orgChanges.filter((c) => c.affectedEmployeeIds.includes(emp.id));
  const isOverloaded = directReports.length > 8;

  return (
    <div>
      <AppHeader title={emp.name} subtitle={emp.title} />

      <div className="p-6 max-w-5xl">
        <Button variant="ghost" size="sm" className="gap-1.5 mb-4" onClick={() => router.push('/app/people')}>
          <ArrowLeft className="h-4 w-4" /> Back to people
        </Button>

        <div className="grid lg:grid-cols-3 gap-4">
          {/* Left: Profile */}
          <div className="space-y-4">
            <Card>
              <CardContent className="p-6 text-center">
                <div
                  className="h-20 w-20 rounded-full flex items-center justify-center text-white font-medium text-xl mx-auto mb-4"
                  style={{ background: emp.avatarColor }}
                >
                  {emp.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                </div>
                <h2 className="font-serif text-xl font-semibold">{emp.name}</h2>
                <p className="text-sm text-muted-foreground mt-1">{emp.title}</p>
                <div className="flex items-center justify-center gap-1.5 mt-3 flex-wrap">
                  <Badge variant="secondary" className="text-xs">{dept?.name}</Badge>
                  {team && <Badge variant="outline" className="text-xs">{team.name}</Badge>}
                </div>
                <Badge className={cn(
                  'mt-3 text-xs',
                  emp.status === 'ACTIVE' && 'bg-success text-success-foreground',
                  emp.status === 'ON_LEAVE' && 'bg-warning text-warning-foreground',
                  emp.status === 'NOTICE_PERIOD' && 'bg-destructive text-destructive-foreground'
                )}>
                  {emp.status.replace('_', ' ')}
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 space-y-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-3.5 w-3.5" />
                  <span className="truncate">{emp.email}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{emp.location}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Joined {new Date(emp.joinedAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="text-sm">Skills</CardTitle></CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1.5">
                  {emp.skills.map((s, i) => <Badge key={i} variant="outline" className="text-xs">{s}</Badge>)}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: Details */}
          <div className="lg:col-span-2 space-y-4">
            {/* AI Insights */}
            {(isOverloaded || (emp.responsibilities.length > 0 && directReports.length > 0)) && (
              <Card className="bg-accent/5 border-accent/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="h-4 w-4 text-accent" />
                    <p className="text-sm font-medium">AI Insights</p>
                  </div>
                  <div className="space-y-2">
                    {isOverloaded && (
                      <div className="flex items-start gap-2 text-xs">
                        <AlertTriangle className="h-3.5 w-3.5 text-destructive mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">Management load is above recommended range — {directReports.length} direct reports.</span>
                      </div>
                    )}
                    {emp.responsibilities.includes('Roadmap ownership') && (
                      <div className="flex items-start gap-2 text-xs">
                        <AlertTriangle className="h-3.5 w-3.5 text-warning mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">Possible responsibility overlap detected with another Product Manager.</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Responsibilities */}
            <Card>
              <CardHeader><CardTitle className="text-sm">Responsibilities</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {emp.responsibilities.map((r, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <div className="h-1.5 w-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                      <span>{r}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reporting Structure */}
            <Card>
              <CardHeader><CardTitle className="text-sm">Reporting structure</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {manager && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1.5">
                      <GitBranch className="h-3 w-3" /> Reports to
                    </p>
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-secondary/50">
                      <div className="h-8 w-8 rounded-full flex items-center justify-center text-white text-xs font-medium" style={{ background: manager.avatarColor }}>
                        {manager.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{manager.name}</p>
                        <p className="text-xs text-muted-foreground">{manager.title}</p>
                      </div>
                    </div>
                  </div>
                )}
                <div>
                  <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1.5">
                    <Users className="h-3 w-3" /> Direct reports ({directReports.length})
                  </p>
                  {directReports.length > 0 ? (
                    <div className="space-y-1.5">
                      {directReports.map((r) => (
                        <div key={r.id} className="flex items-center gap-2 p-2 rounded-lg bg-secondary/50">
                          <div className="h-8 w-8 rounded-full flex items-center justify-center text-white text-xs font-medium" style={{ background: r.avatarColor }}>
                            {r.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{r.name}</p>
                            <p className="text-xs text-muted-foreground">{r.title}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground">No direct reports.</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Activity */}
            <Card>
              <CardHeader><CardTitle className="text-sm">Recent activity</CardTitle></CardHeader>
              <CardContent>
                {recentChanges.length > 0 ? (
                  <div className="space-y-2">
                    {recentChanges.map((c) => (
                      <div key={c.id} className="text-xs border-l-2 border-border pl-3 py-1">
                        <p className="font-medium">{c.description}</p>
                        <p className="text-muted-foreground mt-0.5">{c.actorName} · {new Date(c.timestamp).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground">No recent organizational changes.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
