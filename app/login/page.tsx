'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ArrowRight, Mail, Lock, Sparkles } from 'lucide-react';
import { AikyaLogo } from '@/components/aikya-logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FadeIn } from '@/components/motion';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/app/overview');
  };

  const handleDemo = () => {
    setEmail('Ashish@aikya');
    setPassword('Ashish@23');
    router.push('/app/overview');
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <Link href="/"><AikyaLogo /></Link>
          <FadeIn>
            <div className="mt-12">
              <h1 className="font-serif text-3xl font-semibold tracking-tight">Welcome back</h1>
              <p className="mt-2 text-sm text-muted-foreground">Log in to your AIKYA workspace.</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Work email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/login" className="text-xs text-muted-foreground hover:text-foreground">Forgot password?</Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full" size="lg">
                Log in <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="mt-4 relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border/60" />
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-wider">
                <span className="bg-background px-3 text-muted-foreground">or</span>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <button
              onClick={handleDemo}
              className="mt-4 w-full flex items-center justify-center gap-2 rounded-lg border border-accent/40 bg-accent/5 px-4 py-2.5 text-sm font-medium text-accent hover:bg-accent/10 hover:border-accent/60 transition-all"
            >
              <Sparkles className="h-4 w-4" />
              Explore Demo
            </button>
            <p className="mt-2 text-center text-xs text-muted-foreground">
              Instant access to a fully populated Northstar workspace
            </p>
          </FadeIn>

          <FadeIn delay={0.25}>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Link href="/signup" className="text-foreground font-medium hover:underline">Sign up</Link>
            </p>
          </FadeIn>
        </div>
      </div>
      <div className="hidden lg:flex flex-1 items-center justify-center bg-muted/30 border-l border-border/50 p-12">
        <div className="max-w-md">
          <p className="font-serif text-3xl font-semibold leading-tight tracking-tight text-balance">
            "AIKYA helped us spot a management bottleneck before it became a real problem."
          </p>
          <p className="mt-6 text-sm text-muted-foreground">— Ashish Suvarna, CEO of Northstar</p>
        </div>
      </div>
    </div>
  );
}
