'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Sparkles, Users, GitBranch, Layers, AlertTriangle } from 'lucide-react';
import { AppHeader } from '@/components/app-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const headcountOptions = [45, 60, 80, 100, 150, 250];

const forecasts: Record<number, { managers: number; teams: number; layers: number; bottlenecks: number; hires: number; risks: string[] }> = {
  45: { managers: 10, teams: 9, layers: 4, bottlenecks: 1, hires: 0, risks: ['CTO management bottleneck'] },
  60: { managers: 13, teams: 11, layers: 4, bottlenecks: 2, hires: 3, risks: ['CTO management bottleneck', 'Design capacity constraint'] },
  80: { managers: 17, teams: 14, layers: 5, bottlenecks: 3, hires: 8, risks: ['Multiple management bottlenecks', 'Role overlap in Product', 'Design capacity constraint'] },
  100: { managers: 21, teams: 17, layers: 5, bottlenecks: 5, hires: 15, risks: ['Multiple management bottlenecks', 'Role overlap in Product', 'Decision velocity slowdown', 'Dependency on single PM', 'Engineering split needed'] },
  150: { managers: 30, teams: 24, layers: 6, bottlenecks: 7, hires: 30, risks: ['Leadership layer needed', 'Department restructuring', 'Multiple management bottlenecks', 'Decision velocity slowdown', 'Dependency clusters', 'Role overlap across teams', 'Hiring pipeline capacity'] },
  250: { managers: 45, teams: 38, layers: 7, bottlenecks: 10, hires: 60, risks: ['VP layer needed', 'Department restructuring', 'Multiple management bottlenecks', 'Decision velocity slowdown', 'Dependency clusters', 'Role overlap across teams', 'Hiring pipeline capacity', 'Geographic distribution', 'Cross-team coordination overhead', 'Culture dilution risk'] },
};

export default function ForecastPage() {
  const [target, setTarget] = useState(100);
  const forecast = forecasts[target];
  const current = forecasts[45];

  const predictions = [
    { icon: Users, label: 'Managers required', value: forecast.managers, change: forecast.managers - current.managers, color: 'text-indigo' },
    { icon: Layers, label: 'Teams required', value: forecast.teams, change: forecast.teams - current.teams, color: 'text-green' },
    { icon: GitBranch, label: 'Leadership layers', value: forecast.layers, change: forecast.layers - current.layers, color: 'text-orange' },
    { icon: AlertTriangle, label: 'Potential bottlenecks', value: forecast.bottlenecks, change: forecast.bottlenecks - current.bottlenecks, color: 'text-coral' },
  ];

  return (
    <div>
      <AppHeader title="Forecast" subtitle="See your organization before you build it." />
      <div className="p-6 space-y-6 max-w-7xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Headcount target</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {headcountOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setTarget(opt)}
                  className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${opt === target ? 'bg-primary text-primary-foreground' : 'border border-border/60 hover:border-border hover:bg-secondary/50'}`}
                >
                  {opt} people
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <motion.div
          key={target}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {predictions.map((pred) => (
            <Card key={pred.label} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <pred.icon className={`h-4 w-4 ${pred.color} mb-2`} />
                <p className="font-serif text-3xl font-semibold">{pred.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{pred.label}</p>
                {pred.change > 0 && (
                  <p className="text-xs text-accent mt-1">+{pred.change} from current</p>
                )}
              </CardContent>
            </Card>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-accent" />
                <CardTitle className="text-base">Hiring needs at {target} people</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="font-serif text-4xl font-semibold mb-2">+{forecast.hires}</p>
              <p className="text-sm text-muted-foreground">new hires needed to reach this scale</p>
              <div className="mt-4 space-y-2">
                {target >= 60 && <div className="flex items-center gap-2 text-sm"><Badge variant="destructive" className="text-[10px]">HIGH</Badge><span>Engineering Manager — Backend</span></div>}
                {target >= 60 && <div className="flex items-center gap-2 text-sm"><Badge variant="destructive" className="text-[10px]">HIGH</Badge><span>Senior Product Designer</span></div>}
                {target >= 80 && <div className="flex items-center gap-2 text-sm"><Badge variant="secondary" className="text-[10px]">MED</Badge><span>Product Manager — Platform</span></div>}
                {target >= 100 && <div className="flex items-center gap-2 text-sm"><Badge variant="secondary" className="text-[10px]">MED</Badge><span>Engineering Director</span></div>}
                {target >= 150 && <div className="flex items-center gap-2 text-sm"><Badge variant="secondary" className="text-[10px]">MED</Badge><span>VP of Engineering</span></div>}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-warning" />
                <CardTitle className="text-base">Structural risks at {target} people</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {forecast.risks.map((risk, i) => (
                <motion.div
                  key={risk}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-3 p-3 rounded-lg border border-border/60"
                >
                  <div className="h-2 w-2 rounded-full bg-warning mt-1.5 flex-shrink-0" />
                  <p className="text-sm">{risk}</p>
                </motion.div>
              ))}
            </CardContent>
          </Card>
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
              At {target} employees, Northstar will need {forecast.managers} managers across {forecast.teams} teams with {forecast.layers} leadership layers. {forecast.hires > 0 && `Plan to hire ${forecast.hires} new people, prioritizing an Engineering Manager for Backend to relieve the CTO bottleneck.`} {forecast.layers > 4 && `Add a dedicated leadership layer to maintain decision velocity.`} {forecast.bottlenecks > 2 && `Address structural bottlenecks proactively — waiting until they become visible will slow execution significantly.`}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
