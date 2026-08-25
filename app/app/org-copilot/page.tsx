'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Users, GitBranch, Layers, AlertTriangle, CheckCircle2, Edit, Save } from 'lucide-react';
import { AppHeader } from '@/components/app-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const prompts = [
  'Design a 100-person SaaS organization',
  'Design a 50-person fintech organization',
  'Design a 200-person e-commerce organization',
];

type OrgDesign = {
  departments: { name: string; teams: number; headcount: number }[];
  totalManagers: number;
  totalLayers: number;
  hiringPlan: string[];
  risks: string[];
  reporting: string;
};

const designs: Record<string, OrgDesign> = {
  'Design a 100-person SaaS organization': {
    departments: [
      { name: 'Engineering', teams: 6, headcount: 40 },
      { name: 'Product', teams: 3, headcount: 8 },
      { name: 'Design', teams: 2, headcount: 6 },
      { name: 'Sales', teams: 3, headcount: 18 },
      { name: 'Marketing', teams: 2, headcount: 8 },
      { name: 'Operations', teams: 2, headcount: 10 },
      { name: 'Customer Success', teams: 2, headcount: 10 },
    ],
    totalManagers: 21,
    totalLayers: 5,
    hiringPlan: ['VP of Engineering', '2 Engineering Managers', '2 Product Managers', '1 Senior Designer', 'Head of Customer Success'],
    risks: ['Engineering management bottleneck if VP not hired first', 'Product-Design collaboration may need dedicated rituals', 'Sales-Marketing alignment requires clear SLAs'],
    reporting: 'CEO → VPs (Eng, Product, Sales) → Department Heads → Team Leads → ICs',
  },
  'Design a 50-person fintech organization': {
    departments: [
      { name: 'Engineering', teams: 3, headcount: 20 },
      { name: 'Product', teams: 2, headcount: 4 },
      { name: 'Design', teams: 1, headcount: 3 },
      { name: 'Sales', teams: 2, headcount: 10 },
      { name: 'Operations', teams: 2, headcount: 8 },
      { name: 'Compliance', teams: 1, headcount: 5 },
    ],
    totalManagers: 12,
    totalLayers: 4,
    hiringPlan: ['Engineering Manager', 'Product Manager', 'Compliance Officer'],
    risks: ['Compliance bottleneck if not staffed early', 'Engineering span may exceed 8 without EM'],
    reporting: 'CEO → Department Heads → Team Leads → ICs',
  },
  'Design a 200-person e-commerce organization': {
    departments: [
      { name: 'Engineering', teams: 8, headcount: 70 },
      { name: 'Product', teams: 4, headcount: 12 },
      { name: 'Design', teams: 3, headcount: 10 },
      { name: 'Sales', teams: 4, headcount: 30 },
      { name: 'Marketing', teams: 3, headcount: 20 },
      { name: 'Operations', teams: 3, headcount: 25 },
      { name: 'Customer Success', teams: 3, headcount: 18 },
      { name: 'Logistics', teams: 2, headcount: 15 },
    ],
    totalManagers: 35,
    totalLayers: 6,
    hiringPlan: ['CTO', 'VP Product', 'VP Sales', '3 Engineering Managers', '2 Product Managers', 'Head of Logistics', 'Head of Customer Success'],
    risks: ['Logistics team needs dedicated leadership early', 'Engineering requires VP layer to prevent CTO bottleneck', 'Cross-team coordination overhead at this scale'],
    reporting: 'CEO → C-Suite (CTO, CPO, CRO, COO) → VPs → Department Heads → Team Leads → ICs',
  },
};

export default function OrgCopilotPage() {
  const [prompt, setPrompt] = useState('');
  const [design, setDesign] = useState<OrgDesign | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = (p: string) => {
    setPrompt(p);
    setLoading(true);
    setDesign(null);
    setTimeout(() => {
      setDesign(designs[p] || null);
      setLoading(false);
    }, 1000);
  };

  return (
    <div>
      <AppHeader title="Org Copilot" subtitle="Design an organization with AI." />
      <div className="p-6 space-y-6 max-w-7xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Describe the organization you need</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && prompt && handleGenerate(prompt)}
                placeholder="e.g. Design a 100-person SaaS organization"
                className="flex-1 rounded-lg border border-border/60 bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
              />
              <Button onClick={() => prompt && handleGenerate(prompt)} disabled={!prompt || loading}>
                {loading ? 'Designing...' : 'Generate'} <Sparkles className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {prompts.map((p) => (
                <button
                  key={p}
                  onClick={() => handleGenerate(p)}
                  className="text-xs px-3 py-1.5 rounded-full border border-border/60 hover:border-accent/40 hover:bg-accent/5 hover:text-accent transition-colors"
                >
                  {p}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <AnimatePresence mode="wait">
          {loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-center py-12">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Sparkles className="h-5 w-5 text-accent animate-pulse" />
                <span className="text-sm">AIKYA is designing your organization...</span>
              </div>
            </motion.div>
          )}

          {design && !loading && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <Card><CardContent className="p-4"><Users className="h-4 w-4 text-indigo mb-2" /><p className="font-serif text-2xl font-semibold">{design.departments.reduce((s, d) => s + d.headcount, 0)}</p><p className="text-xs text-muted-foreground">Total people</p></CardContent></Card>
                <Card><CardContent className="p-4"><GitBranch className="h-4 w-4 text-orange mb-2" /><p className="font-serif text-2xl font-semibold">{design.totalManagers}</p><p className="text-xs text-muted-foreground">Managers</p></CardContent></Card>
                <Card><CardContent className="p-4"><Layers className="h-4 w-4 text-green mb-2" /><p className="font-serif text-2xl font-semibold">{design.totalLayers}</p><p className="text-xs text-muted-foreground">Reporting layers</p></CardContent></Card>
              </div>

              <Card>
                <CardHeader><CardTitle className="text-base">Department structure</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                  {design.departments.map((dept) => (
                    <div key={dept.name} className="flex items-center justify-between p-3 rounded-lg border border-border/60">
                      <div>
                        <p className="text-sm font-medium">{dept.name}</p>
                        <p className="text-xs text-muted-foreground">{dept.teams} teams · {dept.headcount} people</p>
                      </div>
                      <div className="h-2 w-24 rounded-full bg-muted overflow-hidden">
                        <div className="h-full rounded-full bg-accent" style={{ width: `${(dept.headcount / 70) * 100}%` }} />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <div className="grid lg:grid-cols-2 gap-4">
                <Card>
                  <CardHeader><CardTitle className="text-base">Reporting structure</CardTitle></CardHeader>
                  <CardContent><p className="text-sm text-muted-foreground leading-relaxed">{design.reporting}</p></CardContent>
                </Card>
                <Card>
                  <CardHeader><CardTitle className="text-base">Hiring plan</CardTitle></CardHeader>
                  <CardContent className="space-y-2">
                    {design.hiringPlan.map((role) => (
                      <div key={role} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                        {role}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <Card className="border-warning/30">
                <CardHeader>
                  <div className="flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-warning" /><CardTitle className="text-base">Risks</CardTitle></div>
                </CardHeader>
                <CardContent className="space-y-2">
                  {design.risks.map((risk) => (
                    <div key={risk} className="flex items-start gap-2 text-sm"><span className="text-warning mt-0.5">—</span><span className="text-muted-foreground">{risk}</span></div>
                  ))}
                </CardContent>
              </Card>

              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="gap-1.5"><Edit className="h-3.5 w-3.5" /> Edit</Button>
                <Button size="sm" variant="outline" className="gap-1.5"><GitBranch className="h-3.5 w-3.5" /> Simulate</Button>
                <Button size="sm" variant="outline" className="gap-1.5"><Save className="h-3.5 w-3.5" /> Save</Button>
                <Button size="sm" className="gap-1.5">Apply <ArrowRight className="h-3.5 w-3.5" /></Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
