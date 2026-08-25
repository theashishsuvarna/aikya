'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Search, ZoomIn, ZoomOut, Maximize, ChevronDown, ChevronRight,
  Mail, MapPin, Users, GitBranch, Edit, Move, ArrowRightLeft, Briefcase,
} from 'lucide-react';
import { AppHeader } from '@/components/app-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription,
} from '@/components/ui/sheet';
import { getOrgChart, type OrgNode } from '@/lib/ai-service';
import { employees, teams, departments } from '@/lib/demo-data';
import { cn } from '@/lib/utils';

export default function OrganizationPage() {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [search, setSearch] = useState('');
  const [collapsedNodes, setCollapsedNodes] = useState<Set<string>>(new Set());
  const [selectedNode, setSelectedNode] = useState<OrgNode | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const dragRef = useRef<{ startX: number; startY: number; panX: number; panY: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const orgChart = getOrgChart();

  const toggleCollapse = (id: string) => {
    setCollapsedNodes((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    dragRef.current = { startX: e.clientX, startY: e.clientY, panX: pan.x, panY: pan.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragRef.current) {
      setPan({
        x: dragRef.current.panX + (e.clientX - dragRef.current.startX),
        y: dragRef.current.panY + (e.clientY - dragRef.current.startY),
      });
    }
  };

  const handleMouseUp = () => {
    dragRef.current = null;
  };

  const handleNodeClick = (node: OrgNode) => {
    if (node.type === 'employee' || node.type === 'team') {
      setSelectedNode(node);
      setPanelOpen(true);
    }
  };

  const renderNode = (node: OrgNode, level: number = 0): React.ReactNode => {
    const isCollapsed = collapsedNodes.has(node.id);
    const matchesSearch = search
      ? node.name.toLowerCase().includes(search.toLowerCase()) ||
        (node.title && node.title.toLowerCase().includes(search.toLowerCase()))
      : true;

    const nodeColors: Record<string, string> = {
      company: 'bg-primary text-primary-foreground',
      department: 'bg-indigo/10 text-indigo border-indigo/20',
      team: 'bg-orange/10 text-orange border-orange/20',
      employee: 'bg-card text-foreground border-border',
    };

    const nodeSizes: Record<string, string> = {
      company: 'px-5 py-3',
      department: 'px-4 py-2.5',
      team: 'px-3.5 py-2',
      employee: 'px-3 py-1.5',
    };

    return (
      <div key={node.id} className="flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: matchesSearch ? 1 : 0.3, scale: 1 }}
          transition={{ duration: 0.2 }}
          className={cn(
            'rounded-lg border cursor-pointer transition-all hover:shadow-md hover:scale-105 relative',
            nodeColors[node.type],
            nodeSizes[node.type],
            selectedNode?.id === node.id && 'ring-2 ring-accent'
          )}
          onClick={(e) => {
            e.stopPropagation();
            handleNodeClick(node);
          }}
        >
          <div className="flex items-center gap-2">
            {node.children && node.children.length > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleCollapse(node.id);
                }}
                className="flex-shrink-0"
              >
                {isCollapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
              </button>
            )}
            <div className="text-center">
              <p className={cn('font-medium', node.type === 'company' ? 'text-sm' : 'text-xs')}>
                {node.name}
              </p>
              {node.title && node.type !== 'employee' && (
                <p className={cn('opacity-70', node.type === 'company' ? 'text-xs' : 'text-[10px]')}>
                  {node.title}
                </p>
              )}
              {node.employeeCount && (
                <p className="text-[10px] opacity-60 mt-0.5">{node.employeeCount} people</p>
              )}
            </div>
          </div>
        </motion.div>

        {!isCollapsed && node.children && node.children.length > 0 && (
          <div className="relative flex flex-col items-center">
            <div className="w-px h-4 bg-border" />
            <div className="flex gap-4 relative">
              {/* Horizontal connector */}
              {node.children.length > 1 && (
                <div className="absolute top-0 left-0 right-0 h-px bg-border" style={{ left: '50%', transform: 'translateX(-50%)' }} />
              )}
              {node.children.map((child) => (
                <div key={child.id} className="flex flex-col items-center">
                  <div className="w-px h-4 bg-border" />
                  {renderNode(child, level + 1)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const selectedEmployee = selectedNode
    ? employees.find((e) => e.id === selectedNode.id)
    : null;
  const selectedTeam = selectedNode
    ? teams.find((t) => t.id === selectedNode.id)
    : null;

  const directReports = selectedEmployee
    ? employees.filter((e) => e.managerId === selectedEmployee.id)
    : [];
  const manager = selectedEmployee
    ? employees.find((e) => e.id === selectedEmployee.managerId)
    : null;
  const team = selectedEmployee
    ? teams.find((t) => t.id === selectedEmployee.teamId)
    : null;
  const dept = selectedEmployee
    ? departments.find((d) => d.id === selectedEmployee.departmentId)
    : null;

  return (
    <div>
      <AppHeader title="Organization" subtitle="Interactive structure of Northstar" />

      <div className="p-6">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search people or teams..."
              className="pl-10 w-64 h-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-1 border border-border rounded-lg p-1">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setZoom((z) => Math.max(0.5, z - 0.1))}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-xs text-muted-foreground px-2 min-w-[40px] text-center">{Math.round(zoom * 100)}%</span>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setZoom((z) => Math.min(2, z + 0.1))}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }); }}>
              <Maximize className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Chart canvas */}
        <div
          ref={containerRef}
          className="relative w-full h-[calc(100vh-220px)] overflow-hidden rounded-xl border border-border bg-card/30 bg-dots cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div
            className="absolute top-1/2 left-1/2 origin-center"
            style={{
              transform: `translate(-50%, -50%) translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            }}
          >
            {renderNode(orgChart)}
          </div>

          <div className="absolute bottom-4 left-4 text-xs text-muted-foreground bg-card/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-border">
            Drag to pan · Scroll to explore · Click a node for details
          </div>
        </div>
      </div>

      {/* Detail Panel */}
      <Sheet open={panelOpen} onOpenChange={setPanelOpen}>
        <SheetContent className="w-full sm:max-w-md overflow-y-auto">
          {selectedEmployee && (
            <>
              <SheetHeader>
                <div className="flex items-center gap-3">
                  <div
                    className="h-12 w-12 rounded-full flex items-center justify-center text-white font-medium text-sm"
                    style={{ background: selectedEmployee.avatarColor }}
                  >
                    {selectedEmployee.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <SheetTitle className="text-lg">{selectedEmployee.name}</SheetTitle>
                    <SheetDescription>{selectedEmployee.title}</SheetDescription>
                  </div>
                </div>
              </SheetHeader>

              <div className="px-6 pb-6 space-y-5">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="secondary" className="text-xs">{dept?.name}</Badge>
                  {team && <Badge variant="outline" className="text-xs">{team.name}</Badge>}
                  <Badge className={cn(
                    'text-xs',
                    selectedEmployee.status === 'ACTIVE' && 'bg-success text-success-foreground',
                    selectedEmployee.status === 'ON_LEAVE' && 'bg-warning text-warning-foreground',
                    selectedEmployee.status === 'NOTICE_PERIOD' && 'bg-destructive text-destructive-foreground'
                  )}>
                    {selectedEmployee.status.replace('_', ' ')}
                  </Badge>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-3.5 w-3.5" />
                    <span>{selectedEmployee.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{selectedEmployee.location}</span>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm font-medium mb-2">Responsibilities</h4>
                  <div className="space-y-1.5">
                    {selectedEmployee.responsibilities.map((r, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <div className="h-1 w-1 rounded-full bg-accent mt-2 flex-shrink-0" />
                        <span>{r}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm font-medium mb-2">Reporting structure</h4>
                  <div className="space-y-2 text-sm">
                    {manager && (
                      <div className="flex items-center gap-2">
                        <GitBranch className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-muted-foreground">Reports to</span>
                        <span className="font-medium">{manager.name}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Users className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-muted-foreground">Direct reports:</span>
                      <span className="font-medium">{directReports.length}</span>
                    </div>
                  </div>
                  {directReports.length > 0 && (
                    <div className="mt-2 space-y-1.5">
                      {directReports.map((r) => (
                        <div key={r.id} className="flex items-center gap-2 p-2 rounded-lg bg-secondary/50 text-xs">
                          <div className="h-6 w-6 rounded-full flex items-center justify-center text-white text-[10px] font-medium" style={{ background: r.avatarColor }}>
                            {r.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                          </div>
                          <span>{r.name}</span>
                          <span className="text-muted-foreground">· {r.title}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm font-medium mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedEmployee.skills.map((s, i) => (
                      <Badge key={i} variant="outline" className="text-xs">{s}</Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <Edit className="h-3.5 w-3.5" /> Edit
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <Move className="h-3.5 w-3.5" /> Move
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <ArrowRightLeft className="h-3.5 w-3.5" /> Change manager
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <Briefcase className="h-3.5 w-3.5" /> Change role
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground text-center">Changes require review and confirmation.</p>
              </div>
            </>
          )}

          {selectedTeam && !selectedEmployee && (
            <>
              <SheetHeader>
                <SheetTitle className="text-lg">{selectedTeam.name}</SheetTitle>
                <SheetDescription>{selectedTeam.description}</SheetDescription>
              </SheetHeader>
              <div className="px-6 pb-6 space-y-5">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="secondary" className="text-xs">
                    {departments.find((d) => d.id === selectedTeam.departmentId)?.name}
                  </Badge>
                  <Badge variant="outline" className="text-xs">{selectedTeam.health}/100 health</Badge>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Members</h4>
                  <div className="space-y-1.5">
                    {employees.filter((e) => e.teamId === selectedTeam.id).map((m) => (
                      <div key={m.id} className="flex items-center gap-2 p-2 rounded-lg bg-secondary/50 text-xs">
                        <div className="h-6 w-6 rounded-full flex items-center justify-center text-white text-[10px] font-medium" style={{ background: m.avatarColor }}>
                          {m.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                        </div>
                        <span>{m.name}</span>
                        <span className="text-muted-foreground">· {m.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
