// AIKYA — AI Service Layer
// Structured so an LLM API can replace the mock implementation.

import {
  employees,
  teams,
  departments,
  roles,
  aiRecommendations,
  hiringPlans,
  orgChanges,
} from './demo-data';
import {
  Employee,
  Team,
  Department,
  AIChatMessage,
  AIRecommendation,
  OrgHealth,
  OrgHealthIssue,
  OrgHealthCategory,
  HiringPlan,
  Simulation,
  SimulationAnalysis,
  SimulationChange,
  AIReport,
  AIReportSection,
  Confidence,
  Priority,
} from './types';

// ── Helpers ────────────────────────────────────────────────

function getDirectReports(managerId: string): Employee[] {
  return employees.filter((e) => e.managerId === managerId);
}

function getManagerName(emp: Employee): string | null {
  const m = employees.find((e) => e.id === emp.managerId);
  return m ? m.name : null;
}

function getTeamName(teamId: string | null): string | null {
  if (!teamId) return null;
  const t = teams.find((t) => t.id === teamId);
  return t ? t.name : null;
}

function getDeptName(deptId: string): string {
  const d = departments.find((d) => d.id === deptId);
  return d ? d.name : 'Unknown';
}

function getTeamMembers(teamId: string): Employee[] {
  return employees.filter((e) => e.teamId === teamId);
}

function getDeptEmployees(deptId: string): Employee[] {
  return employees.filter((e) => e.departmentId === deptId);
}

function getManagers(): Employee[] {
  return employees.filter((e) => getDirectReports(e.id).length > 0);
}

function avgSpan(): number {
  const managers = getManagers();
  if (managers.length === 0) return 0;
  const total = managers.reduce((sum, m) => sum + getDirectReports(m.id).length, 0);
  return total / managers.length;
}

// ── Public API ─────────────────────────────────────────────

export interface AIContext {
  employees: Employee[];
  teams: Team[];
  departments: Department[];
}

export function getAIContext(): AIContext {
  return { employees, teams, departments };
}

// 1. generateOrganization() — parse natural language description
export function generateOrganization(description: string): {
  departments: { name: string; teams: { name: string; count: number }[] }[];
  totalHeadcount: number;
  summary: string;
} {
  const lower = description.toLowerCase();

  // Extract numbers and department mentions
  const headcountMatch = description.match(/(\d+)\s*[-]?\s*(?:person|people|employee|ppl)/i);
  const headcount = headcountMatch ? parseInt(headcountMatch[1]) : 45;

  const knownDepts = [
    'engineering',
    'product',
    'design',
    'sales',
    'marketing',
    'operations',
    'ops',
    'finance',
    'growth',
    'customer success',
    'data',
    'people',
    'hr',
  ];

  const mentioned = knownDepts.filter((d) => lower.includes(d));

  const deptMap: Record<string, string[]> = {
    engineering: ['Frontend', 'Backend', 'DevOps'],
    product: ['Product Management'],
    design: ['Product Design'],
    sales: ['Sales', 'Growth'],
    marketing: ['Content', 'Demand Gen'],
    operations: ['People Ops', 'Finance'],
    ops: ['People Ops', 'Finance'],
    finance: ['Finance'],
    growth: ['Growth'],
    'customer success': ['CS'],
    data: ['Data'],
    people: ['People Ops'],
    hr: ['People Ops'],
  };

  const result = mentioned.map((d) => ({
    name: d.charAt(0).toUpperCase() + d.slice(1),
    teams: (deptMap[d] || ['Core']).map((t) => ({
      name: t,
      count: Math.max(2, Math.floor(headcount / (mentioned.length * 2.5))),
    })),
  }));

  return {
    departments: result,
    totalHeadcount: headcount,
    summary: `Based on your description, I've identified ${result.length} departments and approximately ${headcount} people. This is a proposed structure — you can review and adjust each team.`,
  };
}

// 2. analyzeOrganization() — overall analysis
export function analyzeOrganization(): {
  summary: string;
  totalPeople: number;
  totalTeams: number;
  totalDepartments: number;
  totalManagers: number;
  openRoles: number;
  avgSpan: number;
} {
  const bottlenecks = getManagers().filter(
    (m) => getDirectReports(m.id).length > 8
  );
  const bottleneckNames = bottlenecks.map((m) => m.name).join(', ');

  const overlaps = findResponsibilityOverlaps();
  const overlapTeamNames = overlaps
    .map((o) => o.teamName)
    .filter((v, i, a) => a.indexOf(v) === i)
    .join(' and ');

  const summary = `Your organization is healthy overall, but ${
    bottlenecks.length > 0
      ? `${bottleneckNames} ${bottlenecks.length === 1 ? 'has' : 'have'} a management bottleneck`
      : 'management spans are within range'
  }${overlaps.length > 0 ? ` and ${overlapTeamNames} ${overlaps.length === 1 ? 'has' : 'have'} overlapping responsibilities` : ''}.`;

  return {
    summary,
    totalPeople: employees.length,
    totalTeams: teams.length,
    totalDepartments: departments.length,
    totalManagers: getManagers().length,
    openRoles: hiringPlans.filter((h) => h.status === 'OPEN').length,
    avgSpan: avgSpan(),
  };
}

// 3. getOrgHealth()
export function getOrgHealth(): OrgHealth {
  const managers = getManagers();
  const bottlenecks = managers.filter((m) => getDirectReports(m.id).length > 8);
  const overlaps = findResponsibilityOverlaps();

  const managementScore = Math.max(
    40,
    100 - bottlenecks.length * 18 - Math.max(0, avgSpan() - 5) * 6
  );
  const structureScore = 88 - overlaps.length * 8;
  const teamBalanceScore = 82;
  const roleClarityScore = 75 - overlaps.length * 6;
  const reportingScore = 85;
  const growthReadinessScore = 70;

  const overall = Math.round(
    (managementScore +
      structureScore +
      teamBalanceScore +
      roleClarityScore +
      reportingScore +
      growthReadinessScore) /
      6
  );

  const categories: OrgHealthCategory[] = [
    {
      name: 'Management',
      score: Math.round(managementScore),
      description: 'Span of control and management distribution',
      status: managementScore < 60 ? 'CRITICAL' : managementScore < 80 ? 'WARNING' : 'HEALTHY',
    },
    {
      name: 'Structure',
      score: Math.round(structureScore),
      description: 'Clarity of team and department boundaries',
      status: structureScore < 60 ? 'CRITICAL' : structureScore < 80 ? 'WARNING' : 'HEALTHY',
    },
    {
      name: 'Team balance',
      score: Math.round(teamBalanceScore),
      description: 'Team sizes and workload distribution',
      status: 'HEALTHY',
    },
    {
      name: 'Role clarity',
      score: Math.round(roleClarityScore),
      description: 'Ownership and responsibility boundaries',
      status: roleClarityScore < 60 ? 'CRITICAL' : roleClarityScore < 80 ? 'WARNING' : 'HEALTHY',
    },
    {
      name: 'Reporting',
      score: Math.round(reportingScore),
      description: 'Reporting layers and hierarchy depth',
      status: 'HEALTHY',
    },
    {
      name: 'Growth readiness',
      score: Math.round(growthReadinessScore),
      description: 'Preparedness for headcount growth',
      status: growthReadinessScore < 60 ? 'CRITICAL' : growthReadinessScore < 80 ? 'WARNING' : 'HEALTHY',
    },
  ];

  const issues: OrgHealthIssue[] = [];

  bottlenecks.forEach((m) => {
    const span = getDirectReports(m.id).length;
    issues.push({
      id: `issue_${m.id}`,
      priority: 'HIGH',
      title: `${m.title} management bottleneck`,
      explanation: `${m.name} (${m.title}) manages ${span} direct reports, which is significantly above the recommended span of 5–7 and the company average of ${avgSpan().toFixed(1)}.`,
      affectedTeamNames: getDirectReports(m.id)
        .map((r) => getTeamName(r.teamId))
        .filter((v, i, a) => v && a.indexOf(v) === i)
        .filter(Boolean) as string[],
      affectedEmployeeCount: span,
      impact: 'High risk of burnout, slower code reviews, delayed 1:1s, and limited career growth for reports.',
      recommendation: `Promote a senior IC to manager or split the team to reduce ${m.name}'s span to 5–7 reports.`,
    });
  });

  overlaps.forEach((o, i) => {
    issues.push({
      id: `issue_overlap_${i}`,
      priority: 'MEDIUM',
      title: `${o.teamName} responsibility overlap`,
      explanation: `${o.employees.join(' and ')} share overlapping responsibilities: ${o.overlaps.join(', ')}.`,
      affectedTeamNames: [o.teamName],
      affectedEmployeeCount: o.employees.length,
      impact: 'Unclear ownership leads to duplicated work, missed deadlines, and accountability gaps.',
      recommendation: `Clarify domain ownership between ${o.employees.join(' and ')} by assigning clear areas of responsibility.`,
    });
  });

  issues.push({
    id: 'issue_mktg',
    priority: 'LOW',
    title: 'Marketing team structure could be simplified',
    explanation: 'Two Content Marketers report to the Head of Marketing with overlapping content responsibilities and no clear channel ownership.',
    affectedTeamNames: ['Marketing'],
    affectedEmployeeCount: 2,
    impact: 'Low risk — but content ownership is ambiguous and efforts may be duplicated.',
    recommendation: 'Split content ownership: one owns long-form/SEO, the other owns social/community.',
  });

  const summary = `Your organization scores ${overall}/100. Management span is the primary concern (${Math.round(managementScore)}/100) — the CTO manages 11 direct reports. Role clarity also needs attention due to overlapping product responsibilities.`;

  return { overall, categories, issues, summary };
}

// 4. generateRecommendation() — return pre-built recommendations
export function generateRecommendations(): AIRecommendation[] {
  return aiRecommendations;
}

export function getRecommendationById(id: string): AIRecommendation | undefined {
  return aiRecommendations.find((r) => r.id === id);
}

// 5. simulateReorganization()
export function simulateReorganization(
  simulation: Simulation
): SimulationAnalysis {
  // Calculate management spans before and after
  const managementSpanBefore: Record<string, number> = {};
  getManagers().forEach((m) => {
    managementSpanBefore[m.name] = getDirectReports(m.id).length;
  });

  // Simulate the changes
  const managementSpanAfter: Record<string, number> = { ...managementSpanBefore };

  simulation.changes.forEach((change) => {
    if (change.type === 'CHANGE_MANAGER') {
      const emp = employees.find((e) =>
        change.description.includes(e.name.split(' ')[0])
      );
      if (emp) {
        managementSpanAfter[emp.name] = (managementSpanAfter[emp.name] || 0) + change.affectedEmployeeIds.length;
        const oldManager = getManagerName(emp);
        if (oldManager && managementSpanAfter[oldManager]) {
          managementSpanAfter[oldManager] -= change.affectedEmployeeIds.length;
        }
      }
    }
    if (change.type === 'SPLIT_TEAM') {
      // The CTO's span decreases
      if (managementSpanAfter['Rahul Khanna']) {
        managementSpanAfter['Rahul Khanna'] = Math.max(2, managementSpanAfter['Rahul Khanna'] - change.affectedEmployeeIds.length);
      }
    }
  });

  const teamSizesBefore: Record<string, number> = {};
  teams.forEach((t) => {
    teamSizesBefore[t.name] = getTeamMembers(t.id).length;
  });

  const teamSizesAfter: Record<string, number> = { ...teamSizesBefore };
  simulation.changes.forEach((change) => {
    if (change.type === 'SPLIT_TEAM') {
      teamSizesAfter['Platform Engineering'] = change.affectedEmployeeIds.length;
      if (teamSizesAfter['Backend']) {
        teamSizesAfter['Backend'] = Math.max(1, teamSizesAfter['Backend'] - 2);
      }
    }
  });

  const affectedEmployees = simulation.changes.reduce(
    (sum, c) => sum + c.affectedEmployeeIds.length,
    0
  );
  const reportingChanges = simulation.changes.filter(
    (c) => c.type === 'CHANGE_MANAGER' || c.type === 'MOVE_TEAM'
  ).length;

  const ctoSpanBefore = managementSpanBefore['Rahul Khanna'] || 0;
  const ctoSpanAfter = managementSpanAfter['Rahul Khanna'] || 0;
  const recommended = ctoSpanAfter <= 7 && ctoSpanAfter < ctoSpanBefore;

  return {
    recommendation: recommended
      ? 'RECOMMENDED'
      : ctoSpanAfter < ctoSpanBefore
      ? 'RECOMMENDED_WITH_CONCERNS'
      : 'NOT_RECOMMENDED',
    confidence: ctoSpanAfter < ctoSpanBefore ? 'HIGH' : 'MEDIUM',
    benefits: [
      'Clearer ownership — Platform Engineering has a dedicated manager',
      'Reduced management overlap — CTO focuses on strategy, not daily management',
      'Stronger platform accountability — dedicated team owns infrastructure',
      `CTO span reduced from ${ctoSpanBefore} to ${ctoSpanAfter} direct reports`,
    ],
    risks: [
      'Temporary reporting transition — team needs 2–4 weeks to stabilize',
      'Role ownership needs clarification — Backend engineers need to know which team owns which services',
      'New manager needs ramp-up time — first 30 days will require support',
    ],
    affectedEmployees,
    reportingChanges,
    managementSpanBefore,
    managementSpanAfter,
    teamSizesBefore,
    teamSizesAfter,
  };
}

// 6. analyzeRoleOverlap()
export function analyzeRoleOverlap(): {
  overlaps: {
    role1: string;
    role2: string;
    sharedResponsibilities: string[];
    teamName: string;
    recommendation: string;
  }[];
} {
  return {
    overlaps: [
      {
        role1: 'Product Lead (Sneha Kulkarni)',
        role2: 'Product Manager (Ishaan Choudhury)',
        sharedResponsibilities: ['Roadmap ownership', 'Stakeholder alignment', 'User research'],
        teamName: 'Product Management',
        recommendation: 'Clarify roadmap ownership and execution responsibility — assign Sneha to Growth/Revenue squads and Ishaan to Platform/Eng squads.',
      },
      {
        role1: 'Content Marketer (Tara Lal)',
        role2: 'Content Marketer (Harsh Dalal)',
        sharedResponsibilities: ['Content creation', 'Social media management'],
        teamName: 'Marketing',
        recommendation: 'Split content ownership: Tara owns long-form + SEO, Harsh owns social + community.',
      },
    ],
  };
}

// 7. generateHiringRecommendation()
export function generateHiringRecommendations(): HiringPlan[] {
  return hiringPlans;
}

// 8. naturalLanguageOrgSearch()
export function naturalLanguageOrgSearch(
  query: string
): { results: Employee[]; interpretation: string } {
  const lower = query.toLowerCase();

  // "Show everyone working in Growth"
  if (lower.includes('growth')) {
    const growthTeam = teams.find((t) => t.name.toLowerCase() === 'growth');
    const results = growthTeam
      ? getTeamMembers(growthTeam.id)
      : employees.filter(
          (e) =>
            e.departmentId === 'dept_sales' &&
            getTeamName(e.teamId)?.toLowerCase().includes('growth')
        );
    return {
      results,
      interpretation: `Showing everyone working in the Growth area — ${results.length} people found.`,
    };
  }

  // "Who reports to the Head of Engineering"
  if (lower.includes('reports to') && lower.includes('engineering')) {
    const cto = employees.find(
      (e) => e.title.toLowerCase().includes('cto') || e.title.toLowerCase().includes('head of eng')
    );
    if (cto) {
      const results = getDirectReports(cto.id);
      return {
        results,
        interpretation: `Showing everyone who reports to ${cto.name} (${cto.title}) — ${results.length} direct reports.`,
      };
    }
  }

  // "Which managers have more than 8 direct reports"
  if (lower.includes('more than') && (lower.includes('report') || lower.includes('manager'))) {
    const match = query.match(/(\d+)/);
    const threshold = match ? parseInt(match[1]) : 8;
    const overloaded = getManagers().filter(
      (m) => getDirectReports(m.id).length > threshold
    );
    const results = overloaded;
    return {
      results,
      interpretation: `Showing managers with more than ${threshold} direct reports — ${results.length} found. ${
        results.length > 0
          ? results.map((m) => `${m.name} (${getDirectReports(m.id).length})`).join(', ')
          : ''
      }`,
    };
  }

  // "Show all designers"
  if (lower.includes('designer')) {
    const results = employees.filter((e) => e.title.toLowerCase().includes('design'));
    return {
      results,
      interpretation: `Showing all designers — ${results.length} found.`,
    };
  }

  // "Who indirectly reports to the CEO"
  if (lower.includes('indirect') && lower.includes('ceo')) {
    const ceo = employees.find((e) => e.title.toLowerCase().includes('ceo'));
    if (ceo) {
      const directIds = getDirectReports(ceo.id).map((e) => e.id);
      const indirect = employees.filter(
        (e) =>
          e.managerId &&
          directIds.includes(e.managerId) &&
          !directIds.includes(e.id)
      );
      return {
        results: indirect,
        interpretation: `Showing everyone who indirectly reports to ${ceo.name} (CEO) — ${indirect.length} people across ${directIds.length} direct reports.`,
      };
    }
  }

  // "Show all designers in Mumbai"
  if (lower.includes('mumbai')) {
    const results = employees.filter((e) => e.location === 'Mumbai');
    return {
      results,
      interpretation: `Showing everyone based in Mumbai — ${results.length} people found.`,
    };
  }

  // Default: search by name or title
  const results = employees.filter(
    (e) =>
      e.name.toLowerCase().includes(lower) ||
      e.title.toLowerCase().includes(lower) ||
      getDeptName(e.departmentId).toLowerCase().includes(lower)
  );
  return {
    results,
    interpretation: `Searching for "${query}" — ${results.length} people found.`,
  };
}

// 9. generateOrgReport()
export function generateOrgReport(): AIReport {
  const health = getOrgHealth();
  const analysis = analyzeOrganization();

  const sections: AIReportSection[] = [
    {
      title: 'Organization Health',
      content: health.summary,
    },
    {
      title: 'Important Changes',
      content: `${orgChanges.length} organizational changes were recorded in the last 30 days.`,
      items: orgChanges.slice(0, 4).map((c) => c.description),
    },
    {
      title: 'New Risks',
      content: `${health.issues.length} organizational risks identified.`,
      items: health.issues.map((i) => `${i.title} (${i.priority})`),
    },
    {
      title: 'Team Growth',
      content: `Northstar has grown to ${analysis.totalPeople} people across ${analysis.totalTeams} teams. The Growth team was recently created to support revenue operations.`,
    },
    {
      title: 'Management Bottlenecks',
      content: 'One high-priority management bottleneck identified.',
      items: health.issues
        .filter((i) => i.priority === 'HIGH')
        .map((i) => `${i.title}: ${i.explanation}`),
    },
    {
      title: 'Hiring Recommendations',
      content: `${hiringPlans.length} open hiring recommendations.`,
      items: hiringPlans.map((h) => `${h.roleTitle} (${h.priority}) — ${h.reason}`),
    },
    {
      title: 'AI Recommendations',
      content: `${aiRecommendations.length} active recommendations from AIKYA.`,
      items: aiRecommendations.map((r) => `${r.title} (${r.priority}, ${r.confidence} confidence)`),
    },
  ];

  return {
    id: 'report_weekly',
    title: 'Weekly Organization Intelligence',
    period: 'Aug 18 – Aug 24, 2026',
    generatedAt: new Date().toISOString(),
    sections,
  };
}

// ── AI Advisor (chat) ──────────────────────────────────────

export function askAIAdvisor(question: string): Omit<AIChatMessage, 'id' | 'role' | 'timestamp'> {
  const lower = question.toLowerCase();

  // "Which managers have too many direct reports"
  if (lower.includes('too many') || lower.includes('overloaded') || (lower.includes('manager') && lower.includes('report'))) {
    const bottlenecks = getManagers().filter((m) => getDirectReports(m.id).length > 8);
    if (bottlenecks.length > 0) {
      const m = bottlenecks[0];
      const span = getDirectReports(m.id).length;
      return {
        content: `${m.name} (${m.title}) currently has ${span} direct reports across ${getDeptName(m.departmentId)}. The company average is ${avgSpan().toFixed(1)} and the recommended span is 5–7.\n\nI recommend evaluating a Platform Engineering split — moving DevOps and 2 Backend engineers under a new Engineering Manager.`,
        reasoning: `Direct report count for ${m.name}: ${span}. Company average: ${avgSpan().toFixed(1)}. Threshold for concern: 8+.`,
        supportingData: `${m.name} span: ${span} | Company average: ${avgSpan().toFixed(1)} | Recommended: 5–7`,
        recommendation: 'Promote a Senior Engineer to Engineering Manager for Backend, or split into Platform and Product Engineering.',
        confidence: 'HIGH',
        actions: ['Simulate', 'Review', 'Apply'],
      };
    }
  }

  // "Where do we have overlapping responsibilities"
  if (lower.includes('overlap') || lower.includes('overlapping')) {
    const overlaps = findResponsibilityOverlaps();
    if (overlaps.length > 0) {
      const o = overlaps[0];
      return {
        content: `${o.employees.join(' and ')} in the ${o.teamName} team share overlapping responsibilities: ${o.overlaps.join(', ')}.\n\nThis creates ambiguity around ownership and can lead to duplicated work or missed deadlines.`,
        reasoning: `Both employees list the same responsibilities in their profiles. No domain boundary is defined.`,
        supportingData: `Overlapping responsibilities: ${o.overlaps.length} | Team: ${o.teamName} | Employees: ${o.employees.join(', ')}`,
        recommendation: `Clarify domain ownership — assign clear areas of responsibility to each person.`,
        confidence: 'HIGH',
        actions: ['Review', 'Apply'],
      };
    }
  }

  // "Should Engineering be split"
  if (lower.includes('split') && lower.includes('engineering')) {
    return {
      content: 'Yes — Engineering should be split into Platform Engineering and Product Engineering.\n\nThe CTO currently manages 11 direct reports across Backend and DevOps. A Platform Engineering team with a dedicated manager would:\n• Reduce the CTO\'s span from 11 to 2\n• Create clearer ownership for infrastructure\n• Improve career growth for Backend engineers\n\nI have a simulation ready for this scenario.',
      reasoning: 'CTO span is 11 (above recommended 5–7). Backend and DevOps share infrastructure concerns. A dedicated Platform Engineering manager is the cleanest split.',
      supportingData: 'CTO span: 11 | Backend team: 6 | DevOps team: 2 | Proposed Platform Eng: 4',
      recommendation: 'Split Engineering: move DevOps + 2 Backend engineers into a new Platform Engineering team with a promoted manager.',
      confidence: 'HIGH',
      actions: ['Simulate', 'Review'],
    };
  }

  // "Which roles are missing"
  if (lower.includes('missing') && lower.includes('role')) {
    return {
      content: 'Based on the current organization analysis, the most critical missing roles are:\n\n1. Senior Product Designer — Design capacity is at 1:18 designer-to-engineer ratio (recommended 1:8)\n2. Engineering Manager — Backend — CTO span is unsustainable at 11 reports\n3. Senior Software Engineer — Platform — DevOps on-call rotation needs a third engineer',
      reasoning: 'Hiring recommendations are generated from team capacity analysis, management span analysis, and responsibility coverage gaps.',
      supportingData: 'Open hiring plans: 4 | High priority: 2 | Medium priority: 2',
      recommendation: 'Prioritize the Senior Product Designer and Engineering Manager hires — both address HIGH priority organizational risks.',
      confidence: 'MEDIUM',
      actions: ['Create hiring plan', 'Review'],
    };
  }

  // "Who reports indirectly to the CEO"
  if (lower.includes('indirect') && lower.includes('ceo')) {
    const ceo = employees.find((e) => e.title === 'CEO');
    if (ceo) {
      const directIds = getDirectReports(ceo.id).map((e) => e.id);
      const indirect = employees.filter(
        (e) => e.managerId && directIds.includes(e.managerId)
      );
      return {
        content: `${indirect.length} people indirectly report to ${ceo.name} (CEO) through ${directIds.length} direct reports:\n\n${indirect.slice(0, 10).map((e) => `• ${e.name} — ${e.title}`).join('\n')}${indirect.length > 10 ? `\n...and ${indirect.length - 10} more` : ''}`,
        reasoning: 'Indirect reports are employees whose manager directly reports to the CEO.',
        supportingData: `Direct reports to CEO: ${directIds.length} | Indirect reports: ${indirect.length}`,
        confidence: 'HIGH',
        actions: ['View organization'],
      };
    }
  }

  // "biggest organizational risks"
  if (lower.includes('risk') || lower.includes('biggest')) {
    return {
      content: 'The biggest organizational risks I\'ve identified:\n\n1. **HIGH — Engineering management bottleneck**: CTO manages 11 direct reports. Risk of burnout and slowed decision-making.\n2. **HIGH — Design capacity constraint**: 1 designer for 4 squads. Risk of product quality degradation.\n3. **MEDIUM — Product responsibility overlap**: Two PMs share roadmap ownership without domain boundaries.\n4. **LOW — Marketing content ownership**: Two content marketers with overlapping responsibilities.',
      reasoning: 'Risks are ranked by priority, affected headcount, and potential organizational impact.',
      supportingData: 'Total risks: 4 | HIGH: 2 | MEDIUM: 1 | LOW: 1',
      recommendation: 'Address the Engineering bottleneck first — it has the highest impact and a clear simulation path.',
      confidence: 'HIGH',
      actions: ['Simulate', 'Review', 'View Org Health'],
    };
  }

  // "How should we structure Product as we grow"
  if (lower.includes('product') && (lower.includes('grow') || lower.includes('structure'))) {
    return {
      content: 'As Product grows, I recommend structuring around domain-aligned squads rather than a single Product Management team:\n\n1. **Growth/Revenue squad** — Sneha owns this, focused on monetization and retention\n2. **Platform/Engineering squad** — Ishaan owns this, focused on API and developer experience\n3. **Core Product squad** — A new PM hire for core user workflows\n\nEach squad should have a dedicated PM, designer, and engineering pod. This prevents the current responsibility overlap from scaling.',
      reasoning: 'Currently 2 PMs share roadmap ownership without domain boundaries. As the company grows to 80+, a single PM team will become a bottleneck.',
      supportingData: 'Current PMs: 2 | Squads: 4 | Overlapping responsibilities: 3',
      recommendation: 'Move to a domain-aligned squad structure with dedicated PMs per squad. Hire 1 additional PM.',
      confidence: 'MEDIUM',
      actions: ['Simulate', 'Create hiring plan', 'Review'],
    };
  }

  // "biggest management bottleneck"
  if (lower.includes('bottleneck') || lower.includes('management load')) {
    const bottlenecks = getManagers().filter((m) => getDirectReports(m.id).length > 8);
    if (bottlenecks.length > 0) {
      const m = bottlenecks[0];
      const span = getDirectReports(m.id).length;
      const teamNames = getDirectReports(m.id)
        .map((r) => getTeamName(r.teamId))
        .filter(Boolean)
        .filter((v, i, a) => a.indexOf(v) === i);
      return {
        content: `${getDeptName(m.departmentId)} currently has ${getDeptEmployees(m.departmentId).length} people across ${teamNames.length} teams. ${m.name} has ${span} direct reports, which is significantly higher than the current organization average of ${avgSpan().toFixed(1)}.\n\nI recommend evaluating a Platform Engineering split.`,
        reasoning: `${m.name}'s span of ${span} is well above the recommended 5–7 and the company average of ${avgSpan().toFixed(1)}.`,
        supportingData: `${m.name} span: ${span} | Company average: ${avgSpan().toFixed(1)} | Recommended: 5–7`,
        recommendation: 'Promote a Senior Engineer to Engineering Manager for Backend, or split into Platform and Product Engineering.',
        confidence: 'HIGH',
        actions: ['Simulate', 'Review', 'Apply'],
      };
    }
  }

  // Default fallback
  return {
    content: 'I can help you understand your organization\'s structure, identify management bottlenecks, find overlapping responsibilities, recommend hires, simulate reorganizations, and more.\n\nTry asking:\n• "Which managers have too many direct reports?"\n• "Where do we have overlapping responsibilities?"\n• "Should Engineering be split into two teams?"\n• "Which roles are missing?"',
    confidence: 'MEDIUM',
    actions: [],
  };
}

// ── Internal helpers for overlap detection ────────────────

function findResponsibilityOverlaps(): {
  teamName: string;
  employees: string[];
  overlaps: string[];
}[] {
  const overlaps: { teamName: string; employees: string[]; overlaps: string[] }[] = [];

  // Product team
  const productEmployees = getTeamMembers('team_product');
  if (productEmployees.length >= 2) {
    const shared = productEmployees[0].responsibilities.filter((r) =>
      productEmployees[1].responsibilities.includes(r)
    );
    if (shared.length > 0) {
      overlaps.push({
        teamName: 'Product Management',
        employees: productEmployees.map((e) => e.name),
        overlaps: shared,
      });
    }
  }

  // Marketing team
  const mktgEmployees = getTeamMembers('team_mktg');
  if (mktgEmployees.length >= 2) {
    const shared = mktgEmployees[0].responsibilities.filter((r) =>
      mktgEmployees[1].responsibilities.includes(r)
    );
    if (shared.length > 0) {
      overlaps.push({
        teamName: 'Marketing',
        employees: mktgEmployees.map((e) => e.name),
        overlaps: shared,
      });
    }
  }

  return overlaps;
}

// ── Org chart data for visualization ──────────────────────

export interface OrgNode {
  id: string;
  name: string;
  title: string;
  type: 'company' | 'department' | 'team' | 'employee';
  departmentId?: string;
  teamId?: string;
  children?: OrgNode[];
  employeeCount?: number;
  managerName?: string;
  avatarColor?: string;
}

export function getOrgChart(): OrgNode {
  const ceo = employees.find((e) => e.title === 'CEO')!;

  const buildDepartmentNode = (deptId: string): OrgNode => {
    const dept = departments.find((d) => d.id === deptId)!;
    const deptTeams = teams.filter((t) => t.departmentId === deptId);
    const head = employees.find((e) => e.id === dept.headId);

    const teamNodes: OrgNode[] = deptTeams.map((team) => {
      const members = getTeamMembers(team.id);
      const manager = employees.find((e) => e.id === team.managerId);

      const employeeNodes: OrgNode[] = members
        .filter((m) => m.id !== team.managerId)
        .map((m) => ({
          id: m.id,
          name: m.name,
          title: m.title,
          type: 'employee' as const,
          teamId: team.id,
          avatarColor: m.avatarColor,
        }));

      return {
        id: team.id,
        name: team.name,
        title: manager ? manager.title : 'Team',
        type: 'team' as const,
        teamId: team.id,
        children: employeeNodes,
        employeeCount: members.length,
        managerName: manager?.name,
      };
    });

    // Direct reports to department head that aren't in a team
    const directToHead = getDeptEmployees(deptId).filter(
      (e) => e.id === dept.headId || (!e.teamId && e.managerId === dept.headId)
    );
    if (directToHead.length > 0 && deptTeams.length === 0) {
      directToHead.forEach((e) => {
        if (e.id !== dept.headId) {
          teamNodes.push({
            id: e.id,
            name: e.name,
            title: e.title,
            type: 'employee' as const,
            avatarColor: e.avatarColor,
          });
        }
      });
    }

    return {
      id: dept.id,
      name: dept.name,
      title: head ? head.name : 'Department',
      type: 'department' as const,
      departmentId: dept.id,
      children: teamNodes,
      employeeCount: getDeptEmployees(deptId).length,
    };
  };

  const deptHeads = getDirectReports(ceo.id);

  return {
    id: 'company',
    name: 'Northstar',
    title: 'Ashish Suvarna, CEO',
    type: 'company',
    children: deptHeads.map((head) => {
      const dept = departments.find((d) => d.headId === head.id);
      if (dept) return buildDepartmentNode(dept.id);
      return {
        id: head.id,
        name: head.name,
        title: head.title,
        type: 'employee' as const,
        avatarColor: head.avatarColor,
      };
    }),
    employeeCount: employees.length,
  };
}
