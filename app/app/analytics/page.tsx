'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Building2, GitBranch, TrendingUp, BarChart3 } from 'lucide-react';
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, Legend,
} from 'recharts';
import { AppHeader } from '@/components/app-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { employees, departments } from '@/lib/demo-data';

const headcountData = [
  { month: 'Mar', count: 28 },
  { month: 'Apr', count: 30 },
  { month: 'May', count: 33 },
  { month: 'Jun', count: 36 },
  { month: 'Jul', count: 39 },
  { month: 'Aug', count: 42 },
  { month: 'Sep', count: 45 },
];

const deptData = [
  { name: 'Engineering', count: 17, fill: 'hsl(222 80% 50%)' },
  { name: 'Sales', count: 7, fill: 'hsl(349 76% 58%)' },
  { name: 'Product', count: 4, fill: 'hsl(152 56% 42%)' },
  { name: 'Operations', count: 5, fill: 'hsl(43 88% 56%)' },
  { name: 'Marketing', count: 3, fill: 'hsl(24 88% 56%)' },
  { name: 'Design', count: 2, fill: 'hsl(222 80% 65%)' },
];

const spanData = [
  { name: 'Rahul', span: 11 },
  { name: 'Aisha', span: 7 },
  { name: 'Vikram', span: 4 },
  { name: 'Aditya', span: 3 },
  { name: 'Priya G', span: 2 },
  { name: 'Jaya', span: 3 },
];

const roleDist = [
  { name: 'C-Level', count: 6, fill: 'hsl(222 80% 50%)' },
  { name: 'Manager', count: 6, fill: 'hsl(24 88% 56%)' },
  { name: 'Senior', count: 8, fill: 'hsl(152 56% 42%)' },
  { name: 'Mid', count: 14, fill: 'hsl(43 88% 56%)' },
  { name: 'Junior', count: 11, fill: 'hsl(349 76% 58%)' },
];

export default function AnalyticsPage() {
  const [period, setPeriod] = useState('6m');

  const stats = [
    { label: 'Headcount', value: employees.length, change: '+17', icon: Users, color: 'text-indigo' },
    { label: 'Departments', value: departments.length, change: '0', icon: Building2, color: 'text-orange' },
    { label: 'Avg span', value: '4.2', change: '-0.3', icon: GitBranch, color: 'text-coral' },
    { label: 'Reporting layers', value: 4, change: '0', icon: TrendingUp, color: 'text-green' },
  ];

  return (
    <div>
      <AppHeader title="Analytics" subtitle="See how your structure is changing" />

      <div className="p-6 max-w-7xl space-y-6">
        {/* Period filter */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Organization analytics</span>
          </div>
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[140px] h-9"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="3m">Last 3 months</SelectItem>
              <SelectItem value="6m">Last 6 months</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
              <Card>
                <CardContent className="p-4">
                  <s.icon className={`h-4 w-4 ${s.color} mb-2`} />
                  <div className="flex items-baseline gap-2">
                    <p className="font-serif text-2xl font-semibold">{s.value}</p>
                    <span className="text-xs text-success">{s.change}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Headcount growth */}
        <Card>
          <CardHeader><CardTitle className="text-sm">Headcount growth</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={headcountData}>
                <defs>
                  <linearGradient id="colorHeadcount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(222 80% 50%)" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="hsl(222 80% 50%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    background: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Area type="monotone" dataKey="count" stroke="hsl(222 80% 50%)" strokeWidth={2} fill="url(#colorHeadcount)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-4">
          {/* Department distribution */}
          <Card>
            <CardHeader><CardTitle className="text-sm">Department distribution</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie data={deptData} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={80} innerRadius={40}>
                    {deptData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                  </Pie>
                  <Tooltip
                    contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Management span */}
          <Card>
            <CardHeader><CardTitle className="text-sm">Management span by manager</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={spanData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" width={70} />
                  <Tooltip
                    contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }}
                  />
                  <Bar dataKey="span" radius={[0, 4, 4, 0]}>
                    {spanData.map((entry, i) => (
                      <Cell key={i} fill={entry.span > 8 ? 'hsl(0 72% 50%)' : 'hsl(152 56% 42%)'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Role distribution */}
        <Card>
          <CardHeader><CardTitle className="text-sm">Role distribution by seniority</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={roleDist}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {roleDist.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
