-- ==============================================================================
-- WAZA-ZONE OS v2.4 - Phase 01 Database Security Migration
-- Migration: 003_comprehensive_workspace_rls_policies.sql
-- Description: Comprehensive Row-Level Security (RLS) policies for workspace_members
--              and related project/content tables with granular RBAC enforcement:
--              (OWNER, ADMIN, EDITOR, CREATOR, VIEWER).
-- ==============================================================================

-- 1. Helper Security Functions (SECURITY DEFINER to avoid recursive policy checks)

CREATE OR REPLACE FUNCTION public.get_workspace_member_role(ws_id UUID, u_id UUID DEFAULT auth.uid())
RETURNS TEXT AS $$
DECLARE
  m_role TEXT;
BEGIN
  IF u_id IS NULL THEN
    RETURN NULL;
  END IF;

  SELECT role INTO m_role
  FROM public.workspace_members
  WHERE workspace_id = ws_id AND user_id = u_id
  LIMIT 1;

  RETURN m_role;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

CREATE OR REPLACE FUNCTION public.user_has_workspace_role(ws_id UUID, allowed_roles TEXT[], u_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN AS $$
DECLARE
  m_role TEXT;
BEGIN
  m_role := public.get_workspace_member_role(ws_id, u_id);
  IF m_role IS NULL THEN
    RETURN FALSE;
  END IF;

  RETURN m_role = ANY(allowed_roles);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

CREATE OR REPLACE FUNCTION public.is_workspace_owner(ws_id UUID, u_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN AS $$
BEGIN
  RETURN public.user_has_workspace_role(ws_id, ARRAY['OWNER'], u_id);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

CREATE OR REPLACE FUNCTION public.is_workspace_admin_or_owner(ws_id UUID, u_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN AS $$
BEGIN
  RETURN public.user_has_workspace_role(ws_id, ARRAY['OWNER', 'ADMIN'], u_id);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

CREATE OR REPLACE FUNCTION public.can_mutate_workspace_content(ws_id UUID, u_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN AS $$
BEGIN
  -- OWNER, ADMIN, EDITOR, CREATOR can mutate content. VIEWER is strictly read-only.
  RETURN public.user_has_workspace_role(ws_id, ARRAY['OWNER', 'ADMIN', 'EDITOR', 'CREATOR'], u_id);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- 2. Drop existing basic policies if they exist to prevent conflicts
DROP POLICY IF EXISTS "Workspace members access workspace" ON public.workspaces;
DROP POLICY IF EXISTS "Workspace members access projects" ON public.projects;
DROP POLICY IF EXISTS "Workspace members access characters" ON public.characters;
DROP POLICY IF EXISTS "Workspace members access story bibles" ON public.story_bibles;
DROP POLICY IF EXISTS "Workspace members access episodes" ON public.episodes;
DROP POLICY IF EXISTS "Workspace members access generation jobs" ON public.generation_jobs;
DROP POLICY IF EXISTS "Workspace members view credits ledger" ON public.credits_ledger;

-- 3. WORKSPACE_MEMBERS RLS Policies
ALTER TABLE public.workspace_members ENABLE ROW LEVEL SECURITY;

-- 3.1 SELECT: Any active member can view fellow members of the same workspace
CREATE POLICY "workspace_members_select_policy"
ON public.workspace_members FOR SELECT
USING (
  public.is_workspace_member(workspace_id)
);

-- 3.2 INSERT: Only OWNER and ADMIN can invite/add new members
CREATE POLICY "workspace_members_insert_policy"
ON public.workspace_members FOR INSERT
WITH CHECK (
  public.is_workspace_admin_or_owner(workspace_id)
);

-- 3.3 UPDATE: OWNER can update any member; ADMIN can update non-owner roles
CREATE POLICY "workspace_members_update_policy"
ON public.workspace_members FOR UPDATE
USING (
  public.is_workspace_admin_or_owner(workspace_id)
)
WITH CHECK (
  CASE 
    WHEN public.is_workspace_owner(workspace_id) THEN true
    -- ADMINs cannot alter OWNER or promote someone to OWNER
    WHEN public.user_has_workspace_role(workspace_id, ARRAY['ADMIN']) THEN (
      role IN ('EDITOR', 'CREATOR', 'VIEWER')
    )
    ELSE false
  END
);

-- 3.4 DELETE: OWNER can remove anyone; ADMIN can remove non-owners; users can leave workspace
CREATE POLICY "workspace_members_delete_policy"
ON public.workspace_members FOR DELETE
USING (
  public.is_workspace_owner(workspace_id)
  OR (public.user_has_workspace_role(workspace_id, ARRAY['ADMIN']) AND role != 'OWNER')
  OR (user_id = auth.uid()) -- Self-leave
);

-- 4. WORKSPACES RLS Policies
ALTER TABLE public.workspaces ENABLE ROW LEVEL SECURITY;

-- 4.1 SELECT: All workspace members
CREATE POLICY "workspaces_select_policy"
ON public.workspaces FOR SELECT
USING (
  public.is_workspace_member(id)
);

-- 4.2 UPDATE: Only OWNER or ADMIN
CREATE POLICY "workspaces_update_policy"
ON public.workspaces FOR UPDATE
USING (
  public.is_workspace_admin_or_owner(id)
)
WITH CHECK (
  public.is_workspace_admin_or_owner(id)
);

-- 4.3 DELETE: Strictly OWNER only
CREATE POLICY "workspaces_delete_policy"
ON public.workspaces FOR DELETE
USING (
  public.is_workspace_owner(id)
);

-- 5. PROJECTS RLS Policies
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- 5.1 SELECT: All workspace members (including VIEWER)
CREATE POLICY "projects_select_policy"
ON public.projects FOR SELECT
USING (
  public.is_workspace_member(workspace_id)
);

-- 5.2 INSERT: OWNER, ADMIN, EDITOR, CREATOR (VIEWER blocked)
CREATE POLICY "projects_insert_policy"
ON public.projects FOR INSERT
WITH CHECK (
  public.can_mutate_workspace_content(workspace_id)
);

-- 5.3 UPDATE: OWNER, ADMIN, EDITOR, CREATOR (VIEWER blocked)
CREATE POLICY "projects_update_policy"
ON public.projects FOR UPDATE
USING (
  public.can_mutate_workspace_content(workspace_id)
)
WITH CHECK (
  public.can_mutate_workspace_content(workspace_id)
);

-- 5.4 DELETE: OWNER and ADMIN only (protective barrier against accidental deletion)
CREATE POLICY "projects_delete_policy"
ON public.projects FOR DELETE
USING (
  public.is_workspace_admin_or_owner(workspace_id)
);

-- 6. CHARACTERS RLS Policies
ALTER TABLE public.characters ENABLE ROW LEVEL SECURITY;

CREATE POLICY "characters_select_policy"
ON public.characters FOR SELECT
USING (
  public.is_workspace_member(workspace_id)
);

CREATE POLICY "characters_insert_policy"
ON public.characters FOR INSERT
WITH CHECK (
  public.can_mutate_workspace_content(workspace_id)
);

CREATE POLICY "characters_update_policy"
ON public.characters FOR UPDATE
USING (
  public.can_mutate_workspace_content(workspace_id)
)
WITH CHECK (
  public.can_mutate_workspace_content(workspace_id)
);

CREATE POLICY "characters_delete_policy"
ON public.characters FOR DELETE
USING (
  public.user_has_workspace_role(workspace_id, ARRAY['OWNER', 'ADMIN', 'EDITOR'])
);

-- 7. STORY BIBLES RLS Policies
ALTER TABLE public.story_bibles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "story_bibles_select_policy"
ON public.story_bibles FOR SELECT
USING (
  public.is_workspace_member(workspace_id)
);

CREATE POLICY "story_bibles_insert_policy"
ON public.story_bibles FOR INSERT
WITH CHECK (
  public.can_mutate_workspace_content(workspace_id)
);

CREATE POLICY "story_bibles_update_policy"
ON public.story_bibles FOR UPDATE
USING (
  public.can_mutate_workspace_content(workspace_id)
)
WITH CHECK (
  public.can_mutate_workspace_content(workspace_id)
);

CREATE POLICY "story_bibles_delete_policy"
ON public.story_bibles FOR DELETE
USING (
  public.user_has_workspace_role(workspace_id, ARRAY['OWNER', 'ADMIN', 'EDITOR'])
);

-- 8. EPISODES, SCENES & PANELS RLS Policies
ALTER TABLE public.episodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scenes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.panels ENABLE ROW LEVEL SECURITY;

CREATE POLICY "episodes_select_policy"
ON public.episodes FOR SELECT
USING (
  public.is_workspace_member(workspace_id)
);

CREATE POLICY "episodes_insert_policy"
ON public.episodes FOR INSERT
WITH CHECK (
  public.can_mutate_workspace_content(workspace_id)
);

CREATE POLICY "episodes_update_policy"
ON public.episodes FOR UPDATE
USING (
  public.can_mutate_workspace_content(workspace_id)
)
WITH CHECK (
  public.can_mutate_workspace_content(workspace_id)
);

CREATE POLICY "episodes_delete_policy"
ON public.episodes FOR DELETE
USING (
  public.user_has_workspace_role(workspace_id, ARRAY['OWNER', 'ADMIN', 'EDITOR'])
);

CREATE POLICY "panels_select_policy"
ON public.panels FOR SELECT
USING (
  public.is_workspace_member(workspace_id)
);

CREATE POLICY "panels_insert_policy"
ON public.panels FOR INSERT
WITH CHECK (
  public.can_mutate_workspace_content(workspace_id)
);

CREATE POLICY "panels_update_policy"
ON public.panels FOR UPDATE
USING (
  public.can_mutate_workspace_content(workspace_id)
)
WITH CHECK (
  public.can_mutate_workspace_content(workspace_id)
);

CREATE POLICY "panels_delete_policy"
ON public.panels FOR DELETE
USING (
  public.user_has_workspace_role(workspace_id, ARRAY['OWNER', 'ADMIN', 'EDITOR'])
);

-- 9. CREDITS LEDGER RLS (IMMUTABLE APPEND-ONLY)
ALTER TABLE public.credits_ledger ENABLE ROW LEVEL SECURITY;

-- 9.1 SELECT: Any workspace member can view immutable audit logs
CREATE POLICY "credits_ledger_select_policy"
ON public.credits_ledger FOR SELECT
USING (
  public.is_workspace_member(workspace_id)
);

-- 9.2 INSERT: Strictly server-side service role or OWNER/ADMIN manual grants
CREATE POLICY "credits_ledger_insert_policy"
ON public.credits_ledger FOR INSERT
WITH CHECK (
  public.is_workspace_admin_or_owner(workspace_id)
  OR auth.jwt() ->> 'role' = 'service_role'
);

-- 9.3 UPDATE & DELETE: FORBIDDEN to guarantee financial immutability
-- (No policies created for UPDATE or DELETE; operations will be blocked by default)

-- 10. GENERATION JOBS RLS Policies
ALTER TABLE public.generation_jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "generation_jobs_select_policy"
ON public.generation_jobs FOR SELECT
USING (
  public.is_workspace_member(workspace_id)
);

CREATE POLICY "generation_jobs_insert_policy"
ON public.generation_jobs FOR INSERT
WITH CHECK (
  public.can_mutate_workspace_content(workspace_id)
);

CREATE POLICY "generation_jobs_update_policy"
ON public.generation_jobs FOR UPDATE
USING (
  public.can_mutate_workspace_content(workspace_id)
  OR auth.jwt() ->> 'role' = 'service_role'
);
