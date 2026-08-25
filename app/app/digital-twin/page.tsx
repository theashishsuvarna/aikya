'use client';

import { motion } from 'framer-motion';
import { Sparkles, AlertTriangle, Users, GitBranch, Layers } from 'lucide-react';
import { AppHeader } from '@/components/app-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { OrgVisualization } from '@/components/org-visualization';
import { analyzeOrganization } from '@/lib/ai-service';

export default function DigitalTwinPage() {
  const analysis = analyzeOrganization();

  const insights = [
    { icon: AlertTriangle, label: 'Structural bottlenecks', value: 3, color: 'text-destructive' },
    { icon: Layers, label: 'Responsibility overlaps', value: 2, color: 'text-warning' },
    { icon: GitBranch, label: 'Overloaded managers', value: 1, color: 'text-orange' },
    { icon: Users, label: 'Critical dependencies', value: 2, color: 'text-indigo' },
  ];

  return (
    <div>
      <AppHeader title="Digital Twin" subtitle="Your organization, understood." />
      <div className="p-6 space-y-6 max-w-7xl">
        <div className="grid lg:grid-cols-3 gap-4">
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Interactive organizational graph</CardTitle>
                <Badge variant="secondary" className="gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                  Live
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-xl border border-border/40 overflow-hidden">
                <OrgVisualization className="aspect-[16/10] w-full" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-accent" />
                <CardTitle className="text-base">AIKYA detected</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {insights.map((insight, i) => (
                <motion.div
                  key={insight.label}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-lg border border-border/60 hover:bg-secondary/30 transition-colors"
                >
                  <insight.icon className={`h-4 w-4 ${insight.color} flex-shrink-0`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{insight.value} {insight.label.toLowerCase()}</p>
                  </div>
                </motion.div>
              ))}
              <div className="pt-3 border-t border-border/50">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {analysis.summary}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
