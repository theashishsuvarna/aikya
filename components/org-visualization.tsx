'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface VizNode {
  id: string;
  label: string;
  x: number;
  y: number;
  parent?: string;
  color: string;
  radius: number;
}

const nodes: VizNode[] = [
  { id: 'ceo', label: 'CEO', x: 50, y: 8, color: 'hsl(var(--foreground))', radius: 6 },
  { id: 'cto', label: 'CTO', x: 22, y: 28, color: 'hsl(var(--chart-1))', radius: 5 },
  { id: 'cpo', label: 'CPO', x: 42, y: 28, color: 'hsl(var(--chart-2))', radius: 5 },
  { id: 'cdo', label: 'Design', x: 58, y: 28, color: 'hsl(var(--chart-3))', radius: 5 },
  { id: 'cro', label: 'Sales', x: 74, y: 28, color: 'hsl(var(--chart-4))', radius: 5 },
  { id: 'cmo', label: 'Mktg', x: 88, y: 28, color: 'hsl(var(--chart-5))', radius: 5 },
  { id: 'fe', label: 'Frontend', x: 12, y: 50, color: 'hsl(var(--chart-1))', radius: 4 },
  { id: 'be', label: 'Backend', x: 22, y: 50, color: 'hsl(var(--chart-1))', radius: 4 },
  { id: 'devops', label: 'DevOps', x: 32, y: 50, color: 'hsl(var(--chart-1))', radius: 4 },
  { id: 'pm1', label: 'PM', x: 38, y: 50, color: 'hsl(var(--chart-2))', radius: 4 },
  { id: 'pm2', label: 'PM', x: 47, y: 50, color: 'hsl(var(--chart-2))', radius: 4 },
  { id: 'ds1', label: 'Designer', x: 56, y: 50, color: 'hsl(var(--chart-3))', radius: 4 },
  { id: 'ae1', label: 'AE', x: 70, y: 50, color: 'hsl(var(--chart-4))', radius: 4 },
  { id: 'sdr', label: 'SDR', x: 78, y: 50, color: 'hsl(var(--chart-4))', radius: 4 },
  { id: 'cm', label: 'Content', x: 86, y: 50, color: 'hsl(var(--chart-5))', radius: 4 },
  { id: 'eng1', label: 'Eng', x: 8, y: 70, color: 'hsl(var(--chart-1))', radius: 3 },
  { id: 'eng2', label: 'Eng', x: 14, y: 70, color: 'hsl(var(--chart-1))', radius: 3 },
  { id: 'eng3', label: 'Eng', x: 20, y: 70, color: 'hsl(var(--chart-1))', radius: 3 },
  { id: 'eng4', label: 'Eng', x: 26, y: 70, color: 'hsl(var(--chart-1))', radius: 3 },
  { id: 'eng5', label: 'Eng', x: 32, y: 70, color: 'hsl(var(--chart-1))', radius: 3 },
  { id: 'apm', label: 'APM', x: 42, y: 70, color: 'hsl(var(--chart-2))', radius: 3 },
  { id: 'ae2', label: 'AE', x: 66, y: 70, color: 'hsl(var(--chart-4))', radius: 3 },
  { id: 'gr', label: 'Growth', x: 74, y: 70, color: 'hsl(var(--chart-4))', radius: 3 },
];

const edges: [string, string][] = [
  ['ceo', 'cto'], ['ceo', 'cpo'], ['ceo', 'cdo'], ['ceo', 'cro'], ['ceo', 'cmo'],
  ['cto', 'fe'], ['cto', 'be'], ['cto', 'devops'],
  ['cpo', 'pm1'], ['cpo', 'pm2'],
  ['cdo', 'ds1'],
  ['cro', 'ae1'], ['cro', 'sdr'],
  ['cmo', 'cm'],
  ['fe', 'eng1'], ['fe', 'eng2'], ['fe', 'eng3'],
  ['be', 'eng4'], ['be', 'eng5'],
  ['pm2', 'apm'],
  ['ae1', 'ae2'], ['cro', 'gr'],
];

export function OrgVisualization({ className }: { className?: string }) {
  const [pulsing, setPulsing] = useState<string | null>(null);

  useEffect(() => {
    const pulseOrder = ['be', 'cto', 'pm1', 'pm2', 'ds1'];
    let i = 0;
    const interval = setInterval(() => {
      setPulsing(pulseOrder[i % pulseOrder.length]);
      i++;
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative w-full overflow-hidden ${className ?? ''}`}>
      <svg viewBox="0 0 100 80" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        {/* Edges */}
        {edges.map(([from, to], i) => {
          const fromNode = nodes.find((n) => n.id === from)!;
          const toNode = nodes.find((n) => n.id === to)!;
          const isPulsed = pulsing === from || pulsing === to;
          return (
            <motion.line
              key={i}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              stroke="hsl(var(--border))"
              strokeWidth={isPulsed ? 0.5 : 0.2}
              strokeOpacity={isPulsed ? 0.8 : 0.5}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1, delay: i * 0.03 }}
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((node, i) => {
          const isPulsed = pulsing === node.id;
          return (
            <motion.g
              key={node.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.4,
                delay: i * 0.04,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {isPulsed && (
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={node.radius}
                  fill="none"
                  stroke={node.color}
                  strokeWidth={0.3}
                  initial={{ opacity: 0.6, r: node.radius }}
                  animate={{ opacity: 0, r: node.radius + 4 }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
              <circle
                cx={node.x}
                cy={node.y}
                r={node.radius}
                fill={node.color}
                fillOpacity={node.radius > 4 ? 0.9 : 0.7}
              />
              {node.radius >= 5 && (
                <text
                  x={node.x}
                  y={node.y + node.radius + 3}
                  textAnchor="middle"
                  fontSize="2.5"
                  fill="hsl(var(--muted-foreground))"
                  className="font-sans"
                >
                  {node.label}
                </text>
              )}
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}
