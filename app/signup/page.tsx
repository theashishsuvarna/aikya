'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ArrowRight, Mail, Lock, User, Building2 } from 'lucide-react';
import { AikyaLogo } from '@/components/aikya-logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FadeIn } from '@/components/motion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    company: '',
    companySize: '',
    role: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/app/onboarding');
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center px-6 py-12 overflow-y-auto">
        <div className="w-full max-w-sm my-8">
          <Link href="/"><AikyaLogo /></Link>
          <FadeIn>
            <div className="mt-10">
              <h1 className="font-serif text-3xl font-semibold tracking-tight">Create your workspace</h1>
              <p className="mt-2 text-sm text-muted-foreground">Start building a healthier organization.</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="name" placeholder="Ashish Suvarna" className="pl-10" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Work email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="email" type="email" placeholder="you@company.com" className="pl-10" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="password" type="password" placeholder="••••••••" className="pl-10" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company name</Label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="company" placeholder="Northstar" className="pl-10" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="size">Company size</Label>
                  <Select value={form.companySize} onValueChange={(v) => setForm({ ...form, companySize: v })}>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1–10</SelectItem>
                      <SelectItem value="11-50">11–50</SelectItem>
                      <SelectItem value="51-200">51–200</SelectItem>
                      <SelectItem value="201-500">201–500</SelectItem>
                      <SelectItem value="500+">500+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Your role</Label>
                  <Select value={form.role} onValueChange={(v) => setForm({ ...form, role: v })}>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="founder">Founder / CEO</SelectItem>
                      <SelectItem value="hr">HR / People</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="ops">Operations</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button type="submit" className="w-full" size="lg">
                Create workspace <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link href="/login" className="text-foreground font-medium hover:underline">Log in</Link>
            </p>
          </FadeIn>
        </div>
      </div>
      <div className="hidden lg:flex flex-1 items-center justify-center bg-muted/30 border-l border-border/50 p-12">
        <div className="max-w-md">
          <p className="font-serif text-3xl font-semibold leading-tight tracking-tight text-balance">
            Understand your organization. Improve it continuously. Scale with confidence.
          </p>
          <p className="mt-6 text-sm text-muted-foreground">AIKYA — ऐक्य — Unity. Alignment. Oneness.</p>
        </div>
      </div>
    </div>
  );
}
