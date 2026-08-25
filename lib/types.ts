// AIKYA — Core domain types

export type WorkspaceRole = 'OWNER' | 'ADMIN' | 'MANAGER' | 'EMPLOYEE';

export type EmployeeStatus = 'ACTIVE' | 'ON_LEAVE' | 'NOTICE_PERIOD';

export type Seniority =
  | 'C_LEVEL'
  | 'VP'
  | 'DIRECTOR'
  | 'MANAGER'
  | 'SENIOR'
  | 'MID'
  | 'JUNIOR';

export type Priority = 'HIGH' | 'MEDIUM' | 'LOW';

export type Confidence = 'HIGH' | 'MEDIUM' | 'LOW';

export interface Workspace {
  id: string;
  name: string;
  industry: string;
  size: string;
  location: string;
  growthStage: string;
  createdAt: string;
}

export interface Department {
  id: string;
  workspaceId: string;
  name: string;
  description: string;
  headId: string | null;
  createdAt: string;
}

export interface Team {
  id: string;
  departmentId: string;
  name: string;
  description: string;
  managerId: string | null;
  responsibilities: string[];
  health: number;
  createdAt: string;
}

export interface Role {
  id: string;
  title: string;
  departmentId: string;
  teamId: string | null;
  seniority: Seniority;
  responsibilities: string[];
  expectedSkills: string[];
}

export interface Employee {
  id: string;
  workspaceId: string;
  name: string;
  email: string;
  title: string;
  roleId: string | null;
  departmentId: string;
  teamId: string | null;
  managerId: string | null;
  location: string;
  status: EmployeeStatus;
  seniority: Seniority;
  skills: string[];
  responsibilities: string[];
  avatarColor: string;
  joinedAt: string;
}

export interface Responsibility {
  id: string;
  title: string;
  description: string;
  ownerIds: string[];
  teamId: string | null;
}

export interface OrganizationChange {
  id: string;
  type:
    | 'MOVE'
    | 'PROMOTION'
    | 'NEW_HIRE'
    | 'DEPARTURE'
    | 'TEAM_CREATED'
    | 'TEAM_MERGED'
    | 'ROLE_CHANGE'
    | 'DEPARTMENT_CREATED';
  description: string;
  actorName: string;
  affectedEmployeeIds: string[];
  previousState: string;
  newState: string;
  timestamp: string;
}

export interface Simulation {
  id: string;
  name: string;
  description: string;
  status: 'DRAFT' | 'ANALYZED' | 'APPLIED' | 'DISCARDED';
  changes: SimulationChange[];
  createdAt: string;
}

export interface SimulationChange {
  type: 'MOVE_TEAM' | 'CHANGE_MANAGER' | 'SPLIT_TEAM' | 'MERGE_TEAMS' | 'ADD_ROLE';
  description: string;
  affectedEmployeeIds: string[];
  fromContext: string;
  toContext: string;
}

export interface SimulationAnalysis {
  recommendation: 'RECOMMENDED' | 'RECOMMENDED_WITH_CONCERNS' | 'NOT_RECOMMENDED';
  confidence: Confidence;
  benefits: string[];
  risks: string[];
  affectedEmployees: number;
  reportingChanges: number;
  managementSpanBefore: Record<string, number>;
  managementSpanAfter: Record<string, number>;
  teamSizesBefore: Record<string, number>;
  teamSizesAfter: Record<string, number>;
}

export interface AIRecommendation {
  id: string;
  type:
    | 'MANAGEMENT_BOTTLENECK'
    | 'RESPONSIBILITY_OVERLAP'
    | 'STAFFING_GAP'
    | 'STRUCTURE_SIMPLIFICATION'
    | 'ROLE_CLARITY'
    | 'GROWTH_READINESS';
  title: string;
  description: string;
  priority: Priority;
  confidence: Confidence;
  affectedTeamIds: string[];
  affectedEmployeeIds: string[];
  reasoning: string;
  supportingData: string;
  recommendation: string;
  actions: string[];
  createdAt: string;
}

export interface HiringPlan {
  id: string;
  roleTitle: string;
  departmentId: string;
  teamId: string | null;
  priority: Priority;
  reason: string;
  expectedImpact: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'FILLED';
  createdAt: string;
}

export interface OrgHealthCategory {
  name: string;
  score: number;
  description: string;
  status: 'HEALTHY' | 'WARNING' | 'CRITICAL';
}

export interface OrgHealthIssue {
  id: string;
  priority: Priority;
  title: string;
  explanation: string;
  affectedTeamNames: string[];
  affectedEmployeeCount: number;
  impact: string;
  recommendation: string;
}

export interface OrgHealth {
  overall: number;
  categories: OrgHealthCategory[];
  issues: OrgHealthIssue[];
  summary: string;
}

export interface AIChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  reasoning?: string;
  supportingData?: string;
  recommendation?: string;
  confidence?: Confidence;
  actions?: string[];
  timestamp: string;
}

export interface AIReport {
  id: string;
  title: string;
  period: string;
  generatedAt: string;
  sections: AIReportSection[];
}

export interface AIReportSection {
  title: string;
  content: string;
  items?: string[];
}

export interface ActivityLog {
  id: string;
  type: string;
  description: string;
  actor: string;
  timestamp: string;
}
