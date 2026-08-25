'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import {
  LayoutDashboard,
  Network,
  Users,
  Users2,
  Bot,
  Activity,
  Dna,
  TrendingUp,
  HelpCircle,
  GitBranch,
  Brain,
  Workflow,
  FileCheck,
  UserPlus,
  Layers,
  FlaskConical,
  BarChart3,
  History,
  Settings,
  LogOut,
  ChevronsUpDown,
  Box,
  Briefcase,
} from 'lucide-react';
import { AikyaLogo } from '@/components/aikya-logo';
import { cn } from '@/lib/utils';
import { workspace } from '@/lib/demo-data';

const navGroups = [
  {
    label: 'Core',
    items: [
      { label: 'Overview', href: '/app/overview', icon: LayoutDashboard },
      { label: 'Organization', href: '/app/organization', icon: Network },
      { label: 'People', href: '/app/people', icon: Users },
      { label: 'Teams', href: '/app/teams', icon: Users2 },
    ],
  },
  {
    label: 'AI Intelligence',
    items: [
      { label: 'AI Advisor', href: '/app/ai-advisor', icon: Bot },
      { label: 'Digital Twin', href: '/app/digital-twin', icon: Box },
      { label: 'Org Health', href: '/app/org-health', icon: Activity },
      { label: 'Org DNA', href: '/app/org-dna', icon: Dna },
      { label: 'Forecast', href: '/app/forecast', icon: TrendingUp },
    ],
  },
  {
    label: 'Org Design',
    items: [
      { label: 'What If?', href: '/app/what-if', icon: HelpCircle },
      { label: 'Simulator', href: '/app/simulator', icon: GitBranch },
      { label: 'Decision Intelligence', href: '/app/decision-intelligence', icon: Brain },
      { label: 'Dependencies', href: '/app/dependencies', icon: Workflow },
      { label: 'Responsibilities', href: '/app/responsibilities', icon: FileCheck },
    ],
  },
  {
    label: 'Planning',
    items: [
      { label: 'Hiring', href: '/app/hiring', icon: UserPlus },
      { label: 'Org Copilot', href: '/app/org-copilot', icon: Layers },
      { label: 'Experiments', href: '/app/experiments', icon: FlaskConical },
    ],
  },
  {
    label: 'Insights',
    items: [
      { label: 'Analytics', href: '/app/analytics', icon: BarChart3 },
      { label: 'Activity', href: '/app/activity', icon: History },
      { label: 'Roles', href: '/app/roles', icon: Briefcase },
    ],
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = () => {
    setMenuOpen(false);
    router.push('/login');
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 border-r border-border/50 bg-card/50 backdrop-blur-sm flex flex-col z-40">
      <div className="h-16 flex items-center px-5 border-b border-border/50">
        <Link href="/app/overview"><AikyaLogo size="sm" /></Link>
      </div>

      <nav className="flex-1 px-3 py-3 overflow-y-auto scrollbar-thin">
        {navGroups.map((group, gi) => (
          <div key={gi} className="mb-1">
            <p className="px-3 pt-3 pb-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground/60">{group.label}</p>
            {group.items.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-sm transition-colors',
                    active
                      ? 'bg-secondary text-secondary-foreground font-medium'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                  )}
                >
                  <item.icon className="h-3.5 w-3.5 flex-shrink-0" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="px-3 py-3 border-t border-border/50 space-y-0.5">
        <Link
          href="/app/settings"
          className={cn(
            'flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors',
            pathname === '/app/settings'
              ? 'bg-secondary text-secondary-foreground font-medium'
              : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
          )}
        >
          <Settings className="h-4 w-4 flex-shrink-0" />
          Settings
        </Link>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-secondary/50 transition-colors"
          >
            <div className="h-7 w-7 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-medium">
              AS
            </div>
            <div className="flex-1 text-left">
              <p className="text-xs font-medium text-foreground truncate">Ashish Suvarna</p>
              <p className="text-xs truncate">Owner</p>
            </div>
            <ChevronsUpDown className="h-3.5 w-3.5 flex-shrink-0" />
          </button>

          {menuOpen && (
            <div className="absolute bottom-full left-0 right-0 mb-1 rounded-lg border border-border/60 bg-card shadow-lg overflow-hidden">
              <div className="px-3 py-2.5 border-b border-border/50">
                <p className="text-sm font-medium">Ashish Suvarna</p>
                <p className="text-xs text-muted-foreground">ashish@northstar.com</p>
              </div>
              <Link
                href="/app/settings"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 text-sm hover:bg-secondary/50 transition-colors"
              >
                <Settings className="h-3.5 w-3.5" />
                Workspace Settings
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-destructive hover:bg-destructive/5 transition-colors"
              >
                <LogOut className="h-3.5 w-3.5" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
