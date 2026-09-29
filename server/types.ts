export interface CharacterDNA {
  id: string;
  name: string;
  roleTier: string;
  dnaHash: string;
  craniofacialSummary: string;
  tacticalWardrobe: string;
  colorSwatches: { name: string; hex: string }[];
  forbiddenDrift: string[];
  masterAnchorUrl?: string;
  driftGuardScore: number;
}

export interface ContinuityPacketPayload {
  projectId: string;
  characterId: string;
  characterName: string;
  lockedCharacterTraits: string[];
  currentOutfits: string[];
  worldRules: string[];
  location: {
    code: string;
    name: string;
    coordinates?: string;
    opticalInvariants: Record<string, any>;
  };
  chronologyYear: string;
  previousApprovedPanelId?: string;
  emotionalState: string;
  artDirection: {
    style: string;
    renderingMode: string;
    cameraAngle: string;
    lighting: string;
  };
  forbiddenDrift: string[];
  seedLock: number;
  continuityConfidence: number;
}

export interface StoryPlanRequest {
  title: string;
  genre: string;
  format: 'MANGA' | 'WEBTOON' | 'COMIC' | 'FRANCO_BELGE' | 'STORYBOOK';
  premise: string;
  targetEpisodesCount?: number;
}

export interface StoryPlan {
  title: string;
  logline: string;
  arcs: {
    arcNumber: number;
    title: string;
    summary: string;
    episodes: {
      episodeNumber: number;
      title: string;
      dramaticGoal: string;
      scenes: {
        sceneNumber: number;
        title: string;
        locationCode: string;
        dramaticObjective: string;
        estimatedPanels: number;
      }[];
    }[];
  }[];
}

export interface SceneBeatRequest {
  sceneTitle: string;
  locationName: string;
  charactersInScene: string[];
  dramaticObjective: string;
}

export interface SceneBeat {
  beatNumber: number;
  type: 'Action' | 'Dialogue' | 'Sensory Twist' | 'Climax' | 'Suspense' | 'Establishing';
  cameraShot: string;
  description: string;
  dialogue?: {
    speaker: string;
    line: string;
    sfx?: string;
  };
  suggestedPanelsCount: number;
}

export interface GeneratePanelRequest {
  workspaceId: string;
  projectId: string;
  characterIds: string[];
  sceneId: string;
  panelNumber: number;
  prompt: string;
  cameraAngle?: string;
  aspectRatio?: '1:1' | '3:4' | '4:3' | '9:16' | '16:9';
  referenceImageUrl?: string;
  idempotencyKey: string;
}

export interface LedgerEntry {
  id: string;
  workspaceId: string;
  eventType: 'RESERVE' | 'SETTLE' | 'REFUND' | 'RECHARGE' | 'RENEWAL' | 'GRANT';
  amount: number;
  balanceAfter: number;
  jobId?: string;
  description: string;
  idempotencySignature: string;
  createdAt: string;
}
