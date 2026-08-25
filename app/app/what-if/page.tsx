'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Users, GitBranch, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { AppHeader } from '@/components/app-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const suggestions = [
  'What if we hire 20 engineers?',
  'What if we merge Product and Design?',
  'What if we create a Growth team?',
  'What if we reach 100 employees?',
];

type WhatIfResult = {
  query: string;
  currentState: string;
  futureState: string;
  affectedTeams: string[];
  affectedPeople: number;
  managementImpact: string;
  risks: string[];
  benefits: string[];
  recommendation: string;
};

const results: Record<string, WhatIfResult> = {
  'What if we hire 20 engineers?': {
    query: 'What if we hire 20 engineers?',
    currentState: '17 engineers across 2 teams, managed by the CTO with 11 direct reports',
    futureState: '37 engineers across 4 teams, requiring 2 new Engineering Managers and an Engineering Director',
    affectedTeams: ['Backend', 'DevOps', 'Frontend', 'Platform (new)'],
    affectedPeople: 37,
    managementImpact: 'CTO span increases to 13 unless delegated. Two new EM roles needed.',
    risks: ['CTO overload worsens without delegation', 'Onboarding 20 engineers strains existing infrastructure', 'Team cohesion may dilute'],
    benefits: ['Increased engineering capacity', 'Ability to split into product-focused squads', 'Faster feature delivery'],
    recommendation: 'Hire in phases: 2 EMs first, then engineers in batches of 5. Delegate platform decisions immediately.',
  },
  'What if we merge Product and Design?': {
    query: 'What if we merge Product and Design?',
    currentState: 'Product (4 people, 2 PMs) and Design (2 people) as separate departments',
    futureState: 'Unified Product & Design department (6 people) under CPO',
    affectedTeams: ['Product', 'Design'],
    affectedPeople: 6,
    managementImpact: 'CPO gains 2 additional direct reports. Design Head role may become redundant.',
    risks: ['Design identity may be absorbed into Product', 'Design Head departure risk', 'Reporting ambiguity during transition'],
    benefits: ['Tighter product-design collaboration', 'Simpler reporting structure', 'Single product vision ownership'],
    recommendation: 'Merge with caution. Keep Design as a sub-team within Product & Design. Retain Design Head as Design Lead.',
  },
  'What if we create a Growth team?': {
    query: 'What if we create a Growth team?',
    currentState: 'No dedicated Growth team. Marketing (3) and Sales (7) operate separately.',
    futureState: 'Cross-functional Growth team (4 people) combining Marketing, Product, and Engineering',
    affectedTeams: ['Marketing', 'Sales', 'Product', 'Engineering'],
    affectedPeople: 4,
    managementImpact: 'New Growth Lead role. Reports to CPO. 1 person from each contributing team.',
    risks: ['Matrix reporting for Growth team members', 'Potential conflict with existing team priorities'],
    benefits: ['Focused growth experimentation', 'Faster iteration on acquisition', 'Clear ownership of growth metrics'],
    recommendation: 'Start with a small squad: 1 PM, 1 engineer, 1 designer, 1 marketer. Report to CPO. Review after 2 quarters.',
  },
  'What if we reach 100 employees?': {
    query: 'What if we reach 100 employees?',
    currentState: '45 employees, 6 departments, 9 teams, 4 reporting layers',
    futureState: '100 employees, 8 departments, 17 teams, 5 reporting layers',
    affectedTeams: ['All departments'],
    affectedPeople: 100,
    managementImpact: '21 managers needed (currently 10). New Engineering Director and VP roles needed.',
    risks: ['Management bottleneck at CTO level', 'Decision velocity slowdown', 'Role overlap across expanding teams', 'Culture dilution'],
    benefits: ['Scale to serve larger market', 'Specialized teams for focused execution', 'Clearer career progression paths'],
    recommendation: 'Plan leadership hires first: Engineering Director, VP Product, Head of People. Then hire ICs in batches of 10.',
  },
};

export default function WhatIfPage() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<WhatIfResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleQuery = (q: string) => {
    setQuery(q);
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      setResult(results[q] || null);
      setLoading(false);
    }, 800);
  };

  return (
    <div>
      <AppHeader title="What If?" subtitle="Ask AIKYA what happens before you do it." />
      <div className="p-6 space-y-6 max-w-7xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Ask a question</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && query && handleQuery(query)}
                placeholder="What if we..."
                className="flex-1 rounded-lg border border-border/60 bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
              />
              <Button onClick={() => query && handleQuery(query)} disabled={!query || loading}>
                {loading ? 'Analyzing...' : 'Simulate'} <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => handleQuery(s)}
                  className="text-xs px-3 py-1.5 rounded-full border border-border/60 hover:border-accent/40 hover:bg-accent/5 hover:text-accent transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center py-12"
            >
              <div className="flex items-center gap-3 text-muted-foreground">
                <Sparkles className="h-5 w-5 text-accent animate-pulse" />
                <span className="text-sm">AIKYA is analyzing your organization...</span>
              </div>
            </motion.div>
          )}

          {result && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <div className="grid lg:grid-cols-2 gap-4">
                <Card>
                  <CardHeader><CardTitle className="text-base">Current state</CardTitle></CardHeader>
                  <CardContent><p className="text-sm text-muted-foreground leading-relaxed">{result.currentState}</p></CardContent>
                </Card>
                <Card className="border-accent/30 bg-accent/5">
                  <CardHeader><CardTitle className="text-base text-accent">Future state</CardTitle></CardHeader>
                  <CardContent><p className="text-sm text-muted-foreground leading-relaxed">{result.futureState}</p></CardContent>
                </Card>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <Users className="h-4 w-4 text-indigo mb-2" />
                    <p className="font-serif text-2xl font-semibold">{result.affectedPeople}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">People affected</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <GitBranch className="h-4 w-4 text-orange mb-2" />
                    <p className="text-sm font-medium leading-relaxed">{result.managementImpact}</p>
                    <p className="text-xs text-muted-foreground mt-1">Management impact</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <p className="text-sm font-medium">Affected teams</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {result.affectedTeams.map((t) => (
                        <Badge key={t} variant="secondary" className="text-[10px]">{t}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid lg:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-warning" />
                      <CardTitle className="text-base">Risks</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {result.risks.map((r) => (
                      <div key={r} className="flex items-start gap-2 text-sm">
                        <span className="text-warning mt-0.5">—</span>
                        <span className="text-muted-foreground">{r}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      <CardTitle className="text-base">Benefits</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {result.benefits.map((b) => (
                      <div key={b} className="flex items-start gap-2 text-sm">
                        <span className="text-success mt-0.5">—</span>
                        <span className="text-muted-foreground">{b}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-accent/5 border-accent/30">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-accent" />
                    <CardTitle className="text-base">Recommendation</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed">{result.recommendation}</p>
                  <div className="mt-4 flex gap-2">
                    <Button size="sm" variant="outline">Simulate in Reorg</Button>
                    <Button size="sm" variant="ghost">Save scenario</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
