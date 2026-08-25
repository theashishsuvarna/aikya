'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Users2, Sparkles, ArrowRight } from 'lucide-react';
import { AppHeader } from '@/components/app-header';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { teams, departments, employees } from '@/lib/demo-data';

export default function TeamsPage() {
  const getDeptName = (id: string) => departments.find((d) => d.id === id)?.name ?? '';
  const getManager = (id: string | null) => id ? employees.find((e) => e.id === id) : null;
  const getMemberCount = (teamId: string) => employees.filter((e) => e.teamId === teamId).length;

  return (
    <div>
      <AppHeader title="Teams" subtitle={`${teams.length} teams across ${departments.length} departments`} />

      <div className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {teams.map((team, i) => {
            const manager = getManager(team.managerId);
            const count = getMemberCount(team.id);
            const healthColor = team.health >= 80 ? 'text-success' : team.health >= 65 ? 'text-warning' : 'text-destructive';
            const healthBg = team.health >= 80 ? 'bg-success' : team.health >= 65 ? 'bg-warning' : 'bg-destructive';

            return (
              <motion.div
                key={team.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.05, 0.4) }}
              >
                <Link href={`/app/teams/${team.id}`}>
                  <Card className="hover:shadow-md transition-all hover:border-foreground/15 cursor-pointer h-full">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-medium">{team.name}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{getDeptName(team.departmentId)}</p>
                        </div>
                        <Badge variant="outline" className="text-xs">{count} people</Badge>
                      </div>

                      <p className="text-xs text-muted-foreground line-clamp-2 mb-4">{team.description}</p>

                      {manager && (
                        <div className="flex items-center gap-2 mb-3">
                          <div className="h-6 w-6 rounded-full flex items-center justify-center text-white text-[10px] font-medium" style={{ background: manager.avatarColor }}>
                            {manager.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                          </div>
                          <span className="text-xs text-muted-foreground">{manager.name}</span>
                        </div>
                      )}

                      <div>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-muted-foreground">Team health</span>
                          <span className={`font-medium ${healthColor}`}>{team.health}</span>
                        </div>
                        <Progress value={team.health} className="h-1.5" />
                      </div>

                      <div className="mt-4 flex items-center gap-1 text-xs text-accent">
                        View team details <ArrowRight className="h-3 w-3" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
