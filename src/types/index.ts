export type FormatType = 'MANGA' | 'WEBTOON' | 'COMIC' | 'FRANCO_BELGE' | 'STORYBOOK';
export type UserRole = 'OWNER' | 'ADMIN' | 'EDITOR' | 'CREATOR' | 'VIEWER';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  role: UserRole;
}

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  planTier: 'FREE_EXPLORER' | 'CREATOR' | 'PRO_STUDIO' | 'STUDIO_ENTERPRISE';
  creditBalance: number;
  reservedCredits: number;
  storageRegion: string;
}

export interface Project {
  id: string;
  workspaceId?: string;
  title: string;
  subtitle?: string;
  slug?: string;
  format: FormatType;
  genre?: string;
  targetPages?: number;
  status: 'DRAFT' | 'IN_PROGRESS' | 'IN_PRODUCTION' | 'COMPLETED' | 'ARCHIVED';
  coverImage: string;
  coverUrl?: string;
  description: string;
  canonVersion?: string;
  continuityScore?: number;
  episodesCount: number;
  charactersCount: number;
  castCount?: number;
  renderedPanels?: number;
  lastModified?: string;
  updatedAt?: string;
}

export interface Character {
  id: string;
  projectId: string;
  name: string;
  roleTier: string;
  avatarUrl: string;
  dnaHash: string;
  craniofacialSummary: string;
  tacticalWardrobe: string;
  colorSwatches: { name: string; hex: string }[];
  forbiddenDrift: string[];
  masterPrompt: string;
  referenceImages: string[];
  expressions: string[];
  outfits: string[];
  relationships: string[];
}

export interface WorldLocation {
  id: string;
  name: string;
  description: string;
  opticalInvariants: string;
}

export interface WorldRule {
  id?: string;
  ruleText?: string;
}

export interface WorldBible {
  id: string;
  projectId: string;
  title: string;
  genre: string;
  artStyle: string;
  canonSummary: string;
  locations: WorldLocation[];
  rules: string[];
  chronology: { era: string; event: string }[];
  glossary: { term: string; definition: string }[];
}

export interface SceneBeat {
  id: string;
  shotType: string;
  description: string;
  dialogue?: string;
  suggestedComposition: string;
}

export interface StoryScene {
  id: string;
  title: string;
  location: string;
  mood: string;
  beats: SceneBeat[];
}

export interface StoryEpisode {
  id: string;
  title: string;
  summary: string;
  scenes: StoryScene[];
}

export interface StoryAct {
  id: string;
  title: string;
  episodes: StoryEpisode[];
}

export interface StoryPlan {
  id: string;
  projectId: string;
  title: string;
  premise: string;
  acts: StoryAct[];
}

export interface SpeechBubble {
  id: string;
  type: 'SPEECH' | 'THOUGHT' | 'SHOUT' | 'RADIO';
  speaker: string;
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
  tailDirection?: 'top' | 'bottom' | 'left' | 'right';
}

export interface CaptionLayer {
  id: string;
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface SFXLayer {
  id: string;
  text: string;
  x: number;
  y: number;
  rotation?: number;
  color?: string;
}

export interface PanelLayers {
  speechBubbles: SpeechBubble[];
  captions: CaptionLayer[];
  sfx: SFXLayer[];
}

export interface Panel {
  id: string;
  sceneId: string;
  sequence: number;
  shotType: string;
  cameraAngle: string;
  composition: string;
  promptUsed: string;
  imageUrl?: string;
  layers: PanelLayers;
  status: 'PENDING' | 'GENERATING' | 'COMPLETED' | 'FAILED';
  creditCost: number;
}

export interface CreditLedgerEntry {
  id: string;
  workspaceId: string;
  amount: number;
  type: 'GRANT' | 'SPEND' | 'REFUND' | 'REFILL';
  description: string;
  createdAt: string;
  balanceAfter: number;
  jobId?: string;
}
