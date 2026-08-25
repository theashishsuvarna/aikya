'use client';

import { motion } from 'framer-motion';
import { History, ArrowRight, ArrowLeft, UserPlus, GitBranch, Building2, Briefcase, Sparkles } from 'lucide-react';
import { AppHeader } from '@/components/app-header';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { orgChanges } from '@/lib/demo-data';

const iconMap: Record<string, typeof UserPlus> = {
  employee: UserPlus,
  manager: GitBranch,
  team: Building2,
  role: Briefcase,
  simulation: Sparkles,
  recommendation: Sparkles,
};

export default function ActivityPage() {
  return (
    <div>
      <AppHeader title="Activity" subtitle="Every organizational change, tracked." />
      <div className="p-6 max-w-4xl">
        <div className="space-y-3">
          {orgChanges.map((change, i) => {
            const Icon = iconMap[change.type] || History;
            return (
              <motion.div
                key={change.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="h-9 w-9 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                        <Icon className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">{change.description}</p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className="text-xs text-muted-foreground">{change.actorName}</span>
                          <span className="text-xs text-muted-foreground">·</span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(change.timestamp).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                          {change.previousState && change.newState && (
                            <>
                              <span className="text-xs text-muted-foreground">·</span>
                              <span className="text-xs text-muted-foreground">{change.previousState} → {change.newState}</span>
                            </>
                          )}
                        </div>
                      </div>
                      <Badge variant="outline" className="text-[10px] capitalize">{change.type}</Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
