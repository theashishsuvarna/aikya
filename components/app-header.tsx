'use client';

import { Search, Bell } from 'lucide-react';
import { Input } from '@/components/ui/input';

export function AppHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="h-16 border-b border-border/50 flex items-center justify-between px-6 bg-background/80 backdrop-blur-sm sticky top-0 z-30">
      <div>
        <h1 className="font-serif text-xl font-semibold tracking-tight">{title}</h1>
        {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search people, teams..." className="pl-10 w-64 h-9" />
        </div>
        <button className="relative h-9 w-9 flex items-center justify-center rounded-lg hover:bg-secondary transition-colors">
          <Bell className="h-4 w-4 text-muted-foreground" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-accent" />
        </button>
      </div>
    </div>
  );
}
