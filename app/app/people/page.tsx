'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Users, Sparkles, AlertTriangle } from 'lucide-react';
import { AppHeader } from '@/components/app-header';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { employees, departments, teams } from '@/lib/demo-data';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function PeoplePage() {
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');

  const locations = Array.from(new Set(employees.map((e) => e.location)));

  const filtered = employees.filter((e) => {
    const matchesSearch = e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.title.toLowerCase().includes(search.toLowerCase());
    const matchesDept = deptFilter === 'all' || e.departmentId === deptFilter;
    const matchesLoc = locationFilter === 'all' || e.location === locationFilter;
    return matchesSearch && matchesDept && matchesLoc;
  });

  const getManagerName = (id: string | null) => {
    if (!id) return null;
    return employees.find((e) => e.id === id)?.name ?? null;
  };
  const getTeamName = (id: string | null) => {
    if (!id) return null;
    return teams.find((t) => t.id === id)?.name ?? null;
  };
  const getDeptName = (id: string) => departments.find((d) => d.id === id)?.name ?? '';

  return (
    <div>
      <AppHeader title="People" subtitle={`${employees.length} people across ${departments.length} departments`} />

      <div className="p-6 space-y-4">
        {/* Filters */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by name or role..." className="pl-10 h-9" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <Select value={deptFilter} onValueChange={setDeptFilter}>
            <SelectTrigger className="w-[160px] h-9"><SelectValue placeholder="Department" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All departments</SelectItem>
              {departments.map((d) => <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={locationFilter} onValueChange={setLocationFilter}>
            <SelectTrigger className="w-[140px] h-9"><SelectValue placeholder="Location" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All locations</SelectItem>
              {locations.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        {/* AI Insight Banner */}
        <Card className="bg-accent/5 border-accent/20">
          <CardContent className="p-4 flex items-start gap-3">
            <Sparkles className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium">AI Insight</p>
              <p className="text-xs text-muted-foreground mt-1">
                Possible responsibility overlap detected in Product Management. Management load for the CTO is above recommended range.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* People Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((emp, i) => (
            <motion.div
              key={emp.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.03, 0.5) }}
            >
              <Link href={`/app/people/${emp.id}`}>
                <Card className="hover:shadow-md transition-all hover:border-foreground/15 cursor-pointer h-full">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div
                        className="h-10 w-10 rounded-full flex items-center justify-center text-white font-medium text-xs flex-shrink-0"
                        style={{ background: emp.avatarColor }}
                      >
                        {emp.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{emp.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{emp.title}</p>
                        <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                          <Badge variant="secondary" className="text-[10px]">{getDeptName(emp.departmentId)}</Badge>
                          {getTeamName(emp.teamId) && <Badge variant="outline" className="text-[10px]">{getTeamName(emp.teamId)}</Badge>}
                        </div>
                        <div className="flex items-center gap-3 mt-2 text-[10px] text-muted-foreground">
                          <span>{emp.location}</span>
                          {getManagerName(emp.managerId) && <span>· → {getManagerName(emp.managerId)}</span>}
                        </div>
                        <div className="mt-2">
                          <span className={cn(
                            'text-[10px] px-1.5 py-0.5 rounded-full font-medium',
                            emp.status === 'ACTIVE' && 'bg-success/10 text-success',
                            emp.status === 'ON_LEAVE' && 'bg-warning/10 text-warning',
                            emp.status === 'NOTICE_PERIOD' && 'bg-destructive/10 text-destructive'
                          )}>
                            {emp.status.replace('_', ' ')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <Users className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">No people found matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
