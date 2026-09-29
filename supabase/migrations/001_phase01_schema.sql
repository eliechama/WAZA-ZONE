-- WAZA-ZONE OS v2.4 - Phase 01 Core Database Schema & RLS Security Matrix
-- Target: PostgreSQL / Supabase Engine

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. PROFILES
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'CREATOR' CHECK (role IN ('OWNER', 'ADMIN', 'EDITOR', 'CREATOR', 'VIEWER')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. WORKSPACES
CREATE TABLE IF NOT EXISTS public.workspaces (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  owner_id UUID NOT NULL REFERENCES public.profiles(id),
  plan_tier TEXT NOT NULL DEFAULT 'PRO_STUDIO' CHECK (plan_tier IN ('FREE_EXPLORER', 'CREATOR', 'PRO_STUDIO', 'STUDIO_ENTERPRISE')),
  credit_balance INTEGER NOT NULL DEFAULT 4850,
  reserved_credits INTEGER NOT NULL DEFAULT 0,
  storage_region TEXT NOT NULL DEFAULT 'ap-northeast-1',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. WORKSPACE MEMBERS
CREATE TABLE IF NOT EXISTS public.workspace_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'EDITOR' CHECK (role IN ('OWNER', 'ADMIN', 'EDITOR', 'CREATOR', 'VIEWER')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(workspace_id, user_id)
);

-- 4. PROJECTS
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  subtitle TEXT,
  slug TEXT NOT NULL,
  format TEXT NOT NULL DEFAULT 'MANGA' CHECK (format IN ('MANGA', 'WEBTOON', 'COMIC', 'FRANCO_BELGE', 'STORYBOOK')),
  genre TEXT DEFAULT 'Cyberpunk / Shonen',
  target_pages INTEGER DEFAULT 24,
  status TEXT NOT NULL DEFAULT 'IN_PRODUCTION' CHECK (status IN ('DRAFT', 'IN_PRODUCTION', 'COMPLETED', 'ARCHIVED')),
  cover_url TEXT,
  canon_version TEXT DEFAULT 'v3.4.1',
  continuity_score NUMERIC(5,2) DEFAULT 99.8,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. CHARACTERS
CREATE TABLE IF NOT EXISTS public.characters (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  role_tier TEXT DEFAULT 'Protagonist',
  dna_hash TEXT UNIQUE NOT NULL,
  craniofacial_summary TEXT,
  tactical_wardrobe TEXT,
  color_swatches JSONB DEFAULT '[]'::jsonb,
  forbidden_drift JSONB DEFAULT '[]'::jsonb,
  master_anchor_url TEXT,
  drift_guard_score NUMERIC(5,2) DEFAULT 99.8,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. CHARACTER ASSETS
CREATE TABLE IF NOT EXISTS public.character_assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  character_id UUID NOT NULL REFERENCES public.characters(id) ON DELETE CASCADE,
  asset_type TEXT NOT NULL CHECK (asset_type IN ('TURNAROUND', 'EXPRESSION', 'OUTFIT', 'KEY_POSE', 'LORA_WEIGHT')),
  label TEXT NOT NULL,
  image_url TEXT NOT NULL,
  angle_degree INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. STORY BIBLES
CREATE TABLE IF NOT EXISTS public.story_bibles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  entity_type TEXT NOT NULL CHECK (entity_type IN ('LOCATION', 'FACTION', 'RULE', 'CHRONOLOGY', 'GLOSSARY')),
  name TEXT NOT NULL,
  code_id TEXT NOT NULL,
  summary TEXT,
  content TEXT,
  optical_invariants JSONB DEFAULT '{}'::jsonb,
  is_canon_locked BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. EPISODES
CREATE TABLE IF NOT EXISTS public.episodes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  episode_number INTEGER NOT NULL,
  arc_name TEXT,
  pacing_style TEXT DEFAULT 'Shonen 3-Act Classical',
  status TEXT DEFAULT 'IN_PROGRESS',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. SCENES
CREATE TABLE IF NOT EXISTS public.scenes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  episode_id UUID NOT NULL REFERENCES public.episodes(id) ON DELETE CASCADE,
  scene_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  location_code TEXT,
  dramatic_objective TEXT,
  dramatic_tension_score INTEGER DEFAULT 78,
  beat_sheets JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. PANELS
CREATE TABLE IF NOT EXISTS public.panels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  scene_id UUID NOT NULL REFERENCES public.scenes(id) ON DELETE CASCADE,
  panel_number INTEGER NOT NULL,
  camera_angle TEXT DEFAULT 'Over-The-Shoulder / 35mm',
  prompt_text TEXT NOT NULL,
  image_url TEXT,
  seed_key BIGINT DEFAULT 88912401,
  dialogue_bubbles JSONB DEFAULT '[]'::jsonb,
  sfx_layers JSONB DEFAULT '[]'::jsonb,
  continuity_packet JSONB DEFAULT '{}'::jsonb,
  status TEXT DEFAULT 'APPROVED',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 11. ASSETS
CREATE TABLE IF NOT EXISTS public.assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  public_url TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 12. GENERATION JOBS
CREATE TABLE IF NOT EXISTS public.generation_jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  job_type TEXT NOT NULL CHECK (job_type IN ('PANEL', 'CHARACTER_DNA', 'STORY_BEATS', 'LOCALIZATION', 'EXPORT')),
  status TEXT NOT NULL DEFAULT 'QUEUED' CHECK (status IN ('QUEUED', 'PROCESSING', 'SUCCESS', 'FAILED')),
  estimated_cost INTEGER NOT NULL DEFAULT 12,
  actual_cost INTEGER DEFAULT 12,
  idempotency_key TEXT UNIQUE NOT NULL,
  payload JSONB DEFAULT '{}'::jsonb,
  error_message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 13. GENERATION ATTEMPTS
CREATE TABLE IF NOT EXISTS public.generation_attempts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id UUID NOT NULL REFERENCES public.generation_jobs(id) ON DELETE CASCADE,
  attempt_number INTEGER NOT NULL DEFAULT 1,
  model_used TEXT NOT NULL,
  latency_ms INTEGER,
  result_asset_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 14. EXPORTS
CREATE TABLE IF NOT EXISTS public.exports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  preset_format TEXT NOT NULL CHECK (preset_format IN ('PRINT_B4_CMYK', 'DIGITAL_CBZ', 'WEBTOON_SLICE', 'SOCIAL_9_16')),
  download_url TEXT,
  sha256_hash TEXT,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 15. PUBLICATIONS
CREATE TABLE IF NOT EXISTS public.publications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  visibility TEXT NOT NULL DEFAULT 'PUBLIC' CHECK (visibility IN ('PUBLIC', 'UNLISTED', 'PRIVATE')),
  slug TEXT UNIQUE NOT NULL,
  reads_count INTEGER DEFAULT 1420,
  likes_count INTEGER DEFAULT 380,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 16. CREDITS LEDGER (IMMUTABLE APPEND-ONLY)
CREATE TABLE IF NOT EXISTS public.credits_ledger (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL CHECK (event_type IN ('RESERVE', 'SETTLE', 'REFUND', 'RECHARGE', 'RENEWAL', 'GRANT')),
  amount INTEGER NOT NULL,
  balance_after INTEGER NOT NULL,
  job_id UUID REFERENCES public.generation_jobs(id),
  description TEXT NOT NULL,
  idempotency_signature TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 17. PLANS
CREATE TABLE IF NOT EXISTS public.plans (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  monthly_price_usd NUMERIC(8,2) NOT NULL,
  included_credits INTEGER NOT NULL,
  features JSONB DEFAULT '[]'::jsonb
);

-- 18. SUBSCRIPTIONS
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  plan_id TEXT NOT NULL REFERENCES public.plans(id),
  provider TEXT NOT NULL CHECK (provider IN ('STRIPE', 'MONEROO', 'CHARIOW')),
  status TEXT NOT NULL DEFAULT 'ACTIVE',
  current_period_end TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 19. USAGE EVENTS
CREATE TABLE IF NOT EXISTS public.usage_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  model_name TEXT NOT NULL,
  tokens_input INTEGER DEFAULT 0,
  tokens_output INTEGER DEFAULT 0,
  cost_usd NUMERIC(10,6) DEFAULT 0.000000,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 20. MODERATION EVENTS
CREATE TABLE IF NOT EXISTS public.moderation_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  incident_code TEXT NOT NULL,
  flag_reason TEXT NOT NULL,
  hate_speech_score NUMERIC(3,2),
  graphic_violence_score NUMERIC(3,2),
  status TEXT DEFAULT 'RESOLVED_BY_AI_AUDIT',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 21. CONSENTS
CREATE TABLE IF NOT EXISTS public.consents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  terms_accepted BOOLEAN DEFAULT true,
  accepted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 22. WEBHOOK EVENTS
CREATE TABLE IF NOT EXISTS public.webhook_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  provider TEXT NOT NULL,
  event_type TEXT NOT NULL,
  payload JSONB NOT NULL,
  processed BOOLEAN DEFAULT false,
  idempotency_key TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 23. IDEMPOTENCY KEYS
CREATE TABLE IF NOT EXISTS public.idempotency_keys (
  key TEXT PRIMARY KEY,
  response_body JSONB,
  status TEXT NOT NULL DEFAULT 'PENDING',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 24. AUDIT LOGS
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID REFERENCES public.workspaces(id),
  action TEXT NOT NULL,
  actor_id UUID REFERENCES public.profiles(id),
  details JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

--------------------------------------------------------------------------------
-- ROW LEVEL SECURITY (RLS) POLICIES
--------------------------------------------------------------------------------

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspace_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.characters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.story_bibles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.episodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scenes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.panels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.generation_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credits_ledger ENABLE ROW LEVEL SECURITY;

-- Workspace Isolation Helper
CREATE OR REPLACE FUNCTION public.is_workspace_member(ws_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.workspace_members
    WHERE workspace_id = ws_id
    AND user_id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RLS Policy Examples (Enforced in Production)
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Workspace members access workspace" ON public.workspaces FOR ALL USING (is_workspace_member(id));
CREATE POLICY "Workspace members access projects" ON public.projects FOR ALL USING (is_workspace_member(workspace_id));
CREATE POLICY "Workspace members access characters" ON public.characters FOR ALL USING (is_workspace_member(workspace_id));
CREATE POLICY "Workspace members access story bibles" ON public.story_bibles FOR ALL USING (is_workspace_member(workspace_id));
CREATE POLICY "Workspace members access episodes" ON public.episodes FOR ALL USING (is_workspace_member(workspace_id));
CREATE POLICY "Workspace members access generation jobs" ON public.generation_jobs FOR ALL USING (is_workspace_member(workspace_id));
CREATE POLICY "Workspace members view credits ledger" ON public.credits_ledger FOR SELECT USING (is_workspace_member(workspace_id));
