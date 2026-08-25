'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GitBranch, Users, ArrowRight, Check, X, AlertTriangle, Plus,
  TrendingUp, TrendingDown, Sparkles,
} from 'lucide-react';
import { AppHeader } from '@/components/app-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { simulateReorganization } from '@/lib/ai-service';
import { simulations, employees, teams, departments } from '@/lib/demo-data';
import { cn } from '@/lib/utils';

export default function SimulatorPage() {
  const [selectedSim, setSelectedSim] = useState(simulations[0]);
  const [analysis, setAnalysis] = useState(simulateReorganization(selectedSim));
  const [showResult, setShowResult] = useState(true);

  const handleSimulate = () => {
    setAnalysis(simulateReorganization(selectedSim));
    setShowResult(true);
  };

  const getTeamName = (id: string) => teams.find((t) => t.id === id)?.name ?? '';
  const getDeptName = (id: string) => departments.find((d) => d.id === id)?.name ?? '';

  return (
    <div>
      <AppHeader title="Reorganization Simulator" subtitle="Test changes before you make them" />

      <div className="p-6 max-w-7xl space-y-6">
        {/* Simulation selector */}
        <div className="flex items-center gap-3 flex-wrap">
          {simulations.map((sim) => (
            <button
              key={sim.id}
              onClick={() => { setSelectedSim(sim); setShowResult(false); }}
              className={cn(
                'px-4 py-2.5 rounded-lg border text-sm text-left transition-all max-w-md',
                selectedSim.id === sim.id
                  ? 'border-accent bg-accent/5 ring-1 ring-accent/20'
                  : 'border-border hover:border-foreground/15'
              )}
            >
              <p className="font-medium truncate">{sim.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{sim.status}</p>
            </button>
          ))}
          <Button variant="outline" size="sm" className="gap-1.5">
            <Plus className="h-3.5 w-3.5" /> New simulation
          </Button>
        </div>

        {/* Description */}
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">{selectedSim.description}</p>
            <div className="mt-3 flex items-center gap-2 flex-wrap">
              {selectedSim.changes.map((change, i) => (
                <Badge key={i} variant="outline" className="text-xs gap-1">
                  <GitBranch className="h-3 w-3" />
                  {change.type.replace('_', ' ')}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Current vs Proposed */}
        <div className="grid lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-muted-foreground" />
                Current Structure
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {/* Engineering current */}
                <div className="p-3 rounded-lg bg-secondary/50">
                  <p className="text-sm font-medium">Engineering</p>
                  <p className="text-xs text-muted-foreground">17 people · 2 managers</p>
                  <div className="mt-2 ml-3 space-y-1.5">
                    <div className="text-xs flex items-center justify-between">
                      <span>Frontend</span><span className="text-muted-foreground">7 people</span>
                    </div>
                    <div className="text-xs flex items-center justify-between">
                      <span>Backend</span><span className="text-muted-foreground">6 people</span>
                    </div>
                    <div className="text-xs flex items-center justify-between">
                      <span>DevOps</span><span className="text-muted-foreground">2 people</span>
                    </div>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-secondary/50">
                  <p className="text-sm font-medium">CTO direct reports</p>
                  <p className="text-xs text-destructive">11 direct reports (overloaded)</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-accent/30 bg-accent/5">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-accent" />
                Proposed Structure
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="p-3 rounded-lg bg-card border border-accent/20">
                  <p className="text-sm font-medium">Product Engineering</p>
                  <p className="text-xs text-muted-foreground">9 people · 1 manager (Aisha Reddy)</p>
                  <div className="mt-2 ml-3 space-y-1.5">
                    <div className="text-xs flex items-center justify-between">
                      <span>Frontend</span><span className="text-muted-foreground">7 people</span>
                    </div>
                    <div className="text-xs flex items-center justify-between">
                      <span>Backend (core)</span><span className="text-muted-foreground">2 people</span>
                    </div>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-card border border-accent/20">
                  <p className="text-sm font-medium">Platform Engineering</p>
                  <p className="text-xs text-muted-foreground">4 people · 1 manager (Dev Sharma, promoted)</p>
                  <div className="mt-2 ml-3 space-y-1.5">
                    <div className="text-xs flex items-center justify-between">
                      <span>DevOps</span><span className="text-muted-foreground">2 people</span>
                    </div>
                    <div className="text-xs flex items-center justify-between">
                      <span>Backend (infra)</span><span className="text-muted-foreground">2 people</span>
                    </div>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-success/5 border border-success/20">
                  <p className="text-xs font-medium text-success">CTO span reduced from 11 to 2</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Simulate button */}
        {!showResult && (
          <div className="flex justify-center">
            <Button onClick={handleSimulate} size="lg" className="gap-2">
              <Sparkles className="h-4 w-4" /> Run AI analysis
            </Button>
          </div>
        )}

        {/* AI Analysis */}
        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <Card className={cn(
                'border-2',
                analysis.recommendation === 'RECOMMENDED' ? 'border-success/30 bg-success/5' :
                analysis.recommendation === 'RECOMMENDED_WITH_CONCERNS' ? 'border-warning/30 bg-warning/5' :
                'border-destructive/30 bg-destructive/5'
              )}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <Sparkles className={cn(
                      'h-5 w-5 mt-0.5',
                      analysis.recommendation === 'RECOMMENDED' ? 'text-success' :
                      analysis.recommendation === 'RECOMMENDED_WITH_CONCERNS' ? 'text-warning' : 'text-destructive'
                    )} />
                    <div>
                      <p className="font-medium">
                        {analysis.recommendation === 'RECOMMENDED' && 'Recommended'}
                        {analysis.recommendation === 'RECOMMENDED_WITH_CONCERNS' && 'Recommended with moderate confidence'}
                        {analysis.recommendation === 'NOT_RECOMMENDED' && 'Not recommended'}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">Confidence: {analysis.confidence}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Impact metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Card><CardContent className="p-4 text-center">
                  <Users className="h-4 w-4 text-muted-foreground mx-auto mb-2" />
                  <p className="font-serif text-2xl font-semibold">{analysis.affectedEmployees}</p>
                  <p className="text-xs text-muted-foreground">People affected</p>
                </CardContent></Card>
                <Card><CardContent className="p-4 text-center">
                  <GitBranch className="h-4 w-4 text-muted-foreground mx-auto mb-2" />
                  <p className="font-serif text-2xl font-semibold">{analysis.reportingChanges}</p>
                  <p className="text-xs text-muted-foreground">Reporting changes</p>
                </CardContent></Card>
                <Card><CardContent className="p-4 text-center">
                  <TrendingDown className="h-4 w-4 text-success mx-auto mb-2" />
                  <p className="font-serif text-2xl font-semibold text-success">11→2</p>
                  <p className="text-xs text-muted-foreground">CTO span</p>
                </CardContent></Card>
                <Card><CardContent className="p-4 text-center">
                  <TrendingUp className="h-4 w-4 text-accent mx-auto mb-2" />
                  <p className="font-serif text-2xl font-semibold">+1</p>
                  <p className="text-xs text-muted-foreground">New team</p>
                </CardContent></Card>
              </div>

              {/* Benefits & Risks */}
              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader><CardTitle className="text-sm flex items-center gap-2"><Check className="h-4 w-4 text-success" /> Benefits</CardTitle></CardHeader>
                  <CardContent className="space-y-2">
                    {analysis.benefits.map((b, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm">
                        <TrendingUp className="h-3.5 w-3.5 text-success mt-0.5 flex-shrink-0" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader><CardTitle className="text-sm flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-warning" /> Risks</CardTitle></CardHeader>
                  <CardContent className="space-y-2">
                    {analysis.risks.map((r, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm">
                        <TrendingDown className="h-3.5 w-3.5 text-warning mt-0.5 flex-shrink-0" />
                        <span>{r}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 justify-center pt-2">
                <Button variant="outline" className="gap-1.5">Save simulation</Button>
                <Button variant="ghost" className="gap-1.5">Discard</Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="gap-1.5">Apply changes <ArrowRight className="h-4 w-4" /></Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Apply this reorganization?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will move {analysis.affectedEmployees} people and create a new Platform Engineering team. This action will be recorded in the activity log.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction>Apply changes</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
