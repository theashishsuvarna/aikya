'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Users, Users2, Building2, GitBranch, UserPlus, Activity,
  ArrowRight, Sparkles, TrendingUp, AlertTriangle, CheckCircle2,
} from 'lucide-react';
import { AppHeader } from '@/components/app-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { analyzeOrganization, getOrgHealth, generateRecommendations } from '@/lib/ai-service';
import { orgChanges } from '@/lib/demo-data';

export default function OverviewPage() {
  const analysis = analyzeOrganization();
  const health = getOrgHealth();
  const recommendations = generateRecommendations();

  const metrics = [
    { label: 'Total people', value: analysis.totalPeople, icon: Users, color: 'text-indigo' },
    { label: 'Teams', value: analysis.totalTeams, icon: Users2, color: 'text-green' },
    { label: 'Departments', value: analysis.totalDepartments, icon: Building2, color: 'text-orange' },
    { label: 'Managers', value: analysis.totalManagers, icon: GitBranch, color: 'text-coral' },
    { label: 'Open roles', value: analysis.openRoles, icon: UserPlus, color: 'text-yellow' },
  ];

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  };

  return (
    <div>
      <AppHeader title="Good morning, Ashish." subtitle="Here's what's happening across your organization." />

      <div className="p-6 space-y-6 max-w-7xl">
        {/* Metrics */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3"
        >
          {metrics.map((m) => (
            <motion.div
              key={m.label}
              variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
            >
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <m.icon className={`h-4 w-4 ${m.color} mb-2`} />
                  <p className="font-serif text-2xl font-semibold">{m.value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{m.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
          <motion.div variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}>
            <Card className="bg-primary text-primary-foreground hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <Activity className="h-4 w-4 text-primary-foreground/70 mb-2" />
                <p className="font-serif text-2xl font-semibold">{health.overall}<span className="text-sm text-primary-foreground/60">/100</span></p>
                <p className="text-xs text-primary-foreground/70 mt-0.5">Org Health</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* AI Summary + Health */}
        <div className="grid lg:grid-cols-3 gap-4">
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-accent" />
                <CardTitle className="text-base">AI Summary</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">{analysis.summary}</p>
              <div className="mt-4 flex gap-2">
                <Link href="/app/ai-advisor"><Button size="sm" variant="outline" className="gap-1.5">Ask AIKYA <ArrowRight className="h-3 w-3" /></Button></Link>
                <Link href="/app/org-health"><Button size="sm" variant="ghost">View Org Health</Button></Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Organization Health</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center mb-4">
                <div className="relative">
                  <svg className="w-24 h-24" viewBox="0 0 100 100">
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
                  <span className="absolute inset-0 flex items-center justify-center font-serif text-2xl font-semibold">{health.overall}</span>
                </div>
              </div>
              <div className="space-y-2">
                {health.categories.slice(0, 4).map((cat) => (
                  <div key={cat.name}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-muted-foreground">{cat.name}</span>
                      <span className="font-medium">{cat.score}</span>
                    </div>
                    <Progress value={cat.score} className="h-1" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recommendations + Changes */}
        <div className="grid lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-warning" />
                  <CardTitle className="text-base">Your organization has a few things to fix</CardTitle>
                </div>
                <Link href="/app/org-health"><Button size="sm" variant="ghost">View all</Button></Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {recommendations.slice(0, 3).map((rec, i) => (
                <motion.div
                  key={rec.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3 p-3 rounded-lg border border-border/60 hover:bg-secondary/30 transition-colors"
                >
                  <div className={`h-2 w-2 rounded-full mt-1.5 flex-shrink-0 ${rec.priority === 'HIGH' ? 'bg-destructive' : rec.priority === 'MEDIUM' ? 'bg-warning' : 'bg-muted-foreground'}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{rec.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{rec.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant={rec.priority === 'HIGH' ? 'destructive' : 'secondary'} className="text-[10px]">{rec.priority}</Badge>
                      <span className="text-[10px] text-muted-foreground">{rec.confidence} confidence</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Recent organizational changes</CardTitle>
                <Link href="/app/activity"><Button size="sm" variant="ghost">View all</Button></Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {orgChanges.slice(0, 4).map((change, i) => (
                <motion.div
                  key={change.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="h-8 w-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="h-3.5 w-3.5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">{change.description}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{change.actorName} · {formatDate(change.timestamp)}</p>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Team Growth + Management Span */}
        <div className="grid lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Team growth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: 'Engineering', count: 17, max: 20, color: 'bg-indigo' },
                  { name: 'Sales', count: 7, max: 20, color: 'bg-coral' },
                  { name: 'Product', count: 4, max: 20, color: 'bg-green' },
                  { name: 'Marketing', count: 3, max: 20, color: 'bg-orange' },
                  { name: 'Design', count: 2, max: 20, color: 'bg-yellow' },
                  { name: 'Operations', count: 5, max: 20, color: 'bg-accent' },
                ].map((team) => (
                  <div key={team.name}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span>{team.name}</span>
                      <span className="text-muted-foreground">{team.count} people</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${team.color}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${(team.count / team.max) * 100}%` }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Management span</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: 'Rahul Khanna (CTO)', span: 11, status: 'overloaded' },
                  { name: 'Aisha Reddy (EM)', span: 7, status: 'healthy' },
                  { name: 'Vikram Shah (Sales)', span: 4, status: 'healthy' },
                  { name: 'Aditya Mehta (CPO)', span: 3, status: 'healthy' },
                  { name: 'Priya Gopal (Ops)', span: 2, status: 'healthy' },
                ].map((mgr) => (
                  <div key={mgr.name} className="flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="truncate">{mgr.name}</span>
                        <span className={`font-medium ${mgr.span > 8 ? 'text-destructive' : 'text-muted-foreground'}`}>{mgr.span} reports</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className={`h-full rounded-full ${mgr.span > 8 ? 'bg-destructive' : 'bg-success'}`}
                          style={{ width: `${Math.min((mgr.span / 12) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                    {mgr.span > 8 && <AlertTriangle className="h-3.5 w-3.5 text-destructive flex-shrink-0" />}
                  </div>
                ))}
                <div className="flex items-center gap-2 pt-2 border-t border-border/50">
                  <CheckCircle2 className="h-3.5 w-3.5 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">Company average: {analysis.avgSpan.toFixed(1)} reports per manager</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
