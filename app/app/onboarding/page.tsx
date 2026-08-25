'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Check, Sparkles, Upload, FileText, PenLine } from 'lucide-react';
import { AikyaLogo } from '@/components/aikya-logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { generateOrganization } from '@/lib/ai-service';
import { cn } from '@/lib/utils';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [orgDescription, setOrgDescription] = useState('');
  const [setupMethod, setSetupMethod] = useState<'scratch' | 'csv' | 'describe' | null>(null);
  const [generatedOrg, setGeneratedOrg] = useState<ReturnType<typeof generateOrganization> | null>(null);

  const steps = ['Company', 'Structure', 'Review', 'Confirm'];

  const handleDescribe = () => {
    if (orgDescription.trim()) {
      setGeneratedOrg(generateOrganization(orgDescription));
    }
    setStep(2);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="h-16 border-b border-border/50 flex items-center justify-between px-6">
        <AikyaLogo size="sm" />
        <div className="flex items-center gap-2">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={cn(
                  'flex items-center gap-2 text-xs transition-colors',
                  i <= step ? 'text-foreground font-medium' : 'text-muted-foreground'
                )}
              >
                <div
                  className={cn(
                    'h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-medium border transition-colors',
                    i < step
                      ? 'bg-primary text-primary-foreground border-primary'
                      : i === step
                      ? 'bg-accent text-accent-foreground border-accent'
                      : 'border-border text-muted-foreground'
                  )}
                >
                  {i < step ? <Check className="h-3 w-3" /> : i + 1}
                </div>
                <span className="hidden sm:inline">{s}</span>
              </div>
              {i < steps.length - 1 && <div className="w-4 sm:w-8 h-px bg-border" />}
            </div>
          ))}
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            {/* Step 0: Company Info */}
            {step === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h1 className="font-serif text-3xl font-semibold tracking-tight mb-2">Tell us about your company</h1>
                <p className="text-muted-foreground mb-8">We'll use this to set up your workspace.</p>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Company name</Label>
                    <Input placeholder="Northstar" defaultValue="Northstar" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Industry</Label>
                      <Select defaultValue="saas">
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="saas">SaaS / B2B</SelectItem>
                          <SelectItem value="fintech">Fintech</SelectItem>
                          <SelectItem value="ecommerce">E-commerce</SelectItem>
                          <SelectItem value="healthtech">Health Tech</SelectItem>
                          <SelectItem value="consumer">Consumer Tech</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Company size</Label>
                      <Select defaultValue="11-50">
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-10">1–10</SelectItem>
                          <SelectItem value="11-50">11–50</SelectItem>
                          <SelectItem value="51-200">51–200</SelectItem>
                          <SelectItem value="201-500">201–500</SelectItem>
                          <SelectItem value="500+">500+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Location</Label>
                      <Input placeholder="Mumbai, IN" defaultValue="Mumbai, IN" />
                    </div>
                    <div className="space-y-2">
                      <Label>Growth stage</Label>
                      <Select defaultValue="series-b">
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pre-seed">Pre-seed</SelectItem>
                          <SelectItem value="seed">Seed</SelectItem>
                          <SelectItem value="series-a">Series A</SelectItem>
                          <SelectItem value="series-b">Series B</SelectItem>
                          <SelectItem value="series-c">Series C+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex justify-end pt-4">
                    <Button onClick={() => setStep(1)} size="lg" className="gap-2">
                      Continue <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 1: Org Setup */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h1 className="font-serif text-3xl font-semibold tracking-tight mb-2">How is your organization structured?</h1>
                <p className="text-muted-foreground mb-8">Choose how you'd like to set up your team structure.</p>
                <div className="grid gap-3 mb-6">
                  {[
                    { id: 'scratch' as const, icon: PenLine, title: 'Start from scratch', desc: 'Build your org structure manually, team by team.' },
                    { id: 'csv' as const, icon: Upload, title: 'Import CSV', desc: 'Upload a spreadsheet of your people and reporting lines.' },
                    { id: 'describe' as const, icon: Sparkles, title: 'Describe with AI', desc: 'Tell us about your org in natural language. AI will generate a structure.' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setSetupMethod(opt.id)}
                      className={cn(
                        'flex items-start gap-4 p-4 rounded-xl border text-left transition-all',
                        setupMethod === opt.id
                          ? 'border-accent bg-accent/5 ring-1 ring-accent/20'
                          : 'border-border hover:border-foreground/20 hover:bg-secondary/50'
                      )}
                    >
                      <div className={cn(
                        'flex h-10 w-10 items-center justify-center rounded-lg flex-shrink-0',
                        setupMethod === opt.id ? 'bg-accent text-accent-foreground' : 'bg-secondary'
                      )}>
                        <opt.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">{opt.title}</p>
                        <p className="text-sm text-muted-foreground mt-0.5">{opt.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>

                {setupMethod === 'describe' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-3 mb-6"
                  >
                    <Label>Describe your organization</Label>
                    <Textarea
                      placeholder="We are a 45-person SaaS startup with Engineering, Product, Design, Sales and Marketing."
                      rows={4}
                      value={orgDescription}
                      onChange={(e) => setOrgDescription(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">AIKYA will parse this and generate a proposed structure.</p>
                  </motion.div>
                )}

                {setupMethod === 'csv' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="border-2 border-dashed border-border rounded-xl p-8 text-center mb-6"
                  >
                    <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                    <p className="text-sm font-medium">Drop your CSV file here</p>
                    <p className="text-xs text-muted-foreground mt-1">Expected columns: Name, Email, Title, Department, Team, Manager</p>
                  </motion.div>
                )}

                <div className="flex justify-between">
                  <Button variant="ghost" onClick={() => setStep(0)} className="gap-2">
                    <ArrowLeft className="h-4 w-4" /> Back
                  </Button>
                  <Button
                    onClick={() => {
                      if (setupMethod === 'describe' && orgDescription.trim()) {
                        handleDescribe();
                      } else {
                        setGeneratedOrg(generateOrganization('We are a 45-person SaaS startup with Engineering, Product, Design, Sales and Marketing.'));
                        setStep(2);
                      }
                    }}
                    size="lg"
                    className="gap-2"
                    disabled={!setupMethod}
                  >
                    {setupMethod === 'describe' ? 'Generate structure' : 'Continue'}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Review */}
            {step === 2 && generatedOrg && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-5 w-5 text-accent" />
                  <span className="text-sm font-medium text-accent">AI-Generated Structure</span>
                </div>
                <h1 className="font-serif text-3xl font-semibold tracking-tight mb-2">Review your proposed organization</h1>
                <p className="text-muted-foreground mb-6">{generatedOrg.summary}</p>
                <div className="rounded-xl border border-border bg-card p-6 mb-6 max-h-[300px] overflow-y-auto scrollbar-thin">
                  <div className="space-y-4">
                    {generatedOrg.departments.map((dept, i) => (
                      <div key={i}>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="h-2 w-2 rounded-full bg-accent" />
                          <p className="font-medium text-sm">{dept.name}</p>
                        </div>
                        <div className="ml-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {dept.teams.map((team, j) => (
                            <div key={j} className="flex items-center justify-between p-2.5 rounded-lg bg-secondary/50 text-xs">
                              <span>{team.name}</span>
                              <span className="text-muted-foreground">{team.count}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between">
                  <Button variant="ghost" onClick={() => setStep(1)} className="gap-2">
                    <ArrowLeft className="h-4 w-4" /> Back
                  </Button>
                  <Button onClick={() => setStep(3)} size="lg" className="gap-2">
                    Looks good <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Confirm */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="h-16 w-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6"
                >
                  <Check className="h-8 w-8 text-success" />
                </motion.div>
                <h1 className="font-serif text-3xl font-semibold tracking-tight mb-2">Your workspace is ready</h1>
                <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
                  AIKYA has set up your organization. You can explore the demo data from Northstar — a fictional 45-person SaaS company.
                </p>
                <Button onClick={() => router.push('/app/overview')} size="lg" className="gap-2">
                  Enter workspace <ArrowRight className="h-4 w-4" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
