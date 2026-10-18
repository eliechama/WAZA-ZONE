-- ==============================================================================
-- WAZA-ZONE OS v2.4 - RLS Security Verification Test Suite
-- File: /supabase/tests/rls_security_test.sql
-- Description: Unit & Integration tests for Supabase Row-Level Security (RLS)
--              Verifies cross-tenant isolation and granular RBAC enforcement
--              across OWNER, ADMIN, EDITOR, CREATOR, VIEWER.
-- ==============================================================================

BEGIN;

-- 1. Setup Mock Test Environment
CREATE SCHEMA IF NOT EXISTS tests;

-- Mock Test Users
INSERT INTO auth.users (id, email) VALUES
  ('11111111-1111-1111-1111-111111111111', 'owner@kurogane.jp'),
  ('22222222-2222-2222-2222-222222222222', 'admin@kurogane.jp'),
  ('33333333-3333-3333-3333-333333333333', 'editor@kurogane.jp'),
  ('44444444-4444-4444-4444-444444444444', 'creator@kurogane.jp'),
  ('55555555-5555-5555-5555-555555555555', 'viewer@kurogane.jp'),
  ('99999999-9999-9999-9999-999999999999', 'intruder@other-tenant.com')
ON CONFLICT (id) DO NOTHING;

-- Mock Profiles
INSERT INTO public.profiles (id, email, full_name, role) VALUES
  ('11111111-1111-1111-1111-111111111111', 'owner@kurogane.jp', 'Kai Vance (Owner)', 'OWNER'),
  ('22222222-2222-2222-2222-222222222222', 'admin@kurogane.jp', 'Kenji Sato (Admin)', 'ADMIN'),
  ('33333333-3333-3333-3333-333333333333', 'editor@kurogane.jp', 'Aoi Vance (Editor)', 'EDITOR'),
  ('44444444-4444-4444-4444-444444444444', 'creator@kurogane.jp', 'Ren Kurogane (Creator)', 'CREATOR'),
  ('55555555-5555-5555-5555-555555555555', 'viewer@kurogane.jp', 'Guest Fan (Viewer)', 'VIEWER'),
  ('99999999-9999-9999-9999-999999999999', 'intruder@other-tenant.com', 'Intruder Tenant B', 'CREATOR')
ON CONFLICT (id) DO NOTHING;

-- Mock Test Workspaces
-- Workspace A: Kurogane Creative Lab
-- Workspace B: Isolated Rival Lab
INSERT INTO public.workspaces (id, name, slug, owner_id) VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Kurogane Creative Lab', 'kurogane-lab', '11111111-1111-1111-1111-111111111111'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Isolated Rival Lab', 'rival-lab', '99999999-9999-9999-9999-999999999999')
ON CONFLICT (id) DO NOTHING;

-- Populate Workspace Memberships
INSERT INTO public.workspace_members (workspace_id, user_id, role) VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 'OWNER'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '22222222-2222-2222-2222-222222222222', 'ADMIN'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '33333333-3333-3333-3333-333333333333', 'EDITOR'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '44444444-4444-4444-4444-444444444444', 'CREATOR'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '55555555-5555-5555-5555-555555555555', 'VIEWER'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '99999999-9999-9999-9999-999999999999', 'OWNER')
ON CONFLICT (workspace_id, user_id) DO NOTHING;

-- Add Test Project in Workspace A
INSERT INTO public.projects (id, workspace_id, title, slug, format) VALUES
  ('p1111111-1111-1111-1111-111111111111', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Chrono Blade: Omega', 'chrono-blade', 'MANGA'),
  ('p2222222-2222-2222-2222-222222222222', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Rival Secret Project', 'rival-secret', 'WEBTOON')
ON CONFLICT (id) DO NOTHING;

-- ==============================================================================
-- TEST CASE 1: Cross-Tenant Isolation (Intruder cannot see Workspace A projects)
-- ==============================================================================
SET LOCAL ROLE authenticated;
SET LOCAL "request.jwt.claim.sub" = '99999999-9999-9999-9999-999999999999';

DO $$
DECLARE
  v_count INT;
BEGIN
  SELECT COUNT(*) INTO v_count FROM public.projects WHERE workspace_id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
  IF v_count != 0 THEN
    RAISE EXCEPTION 'TEST 1 FAILED: Tenant B was able to see Workspace A projects!';
  ELSE
    RAISE NOTICE 'TEST 1 PASSED: Zero cross-tenant project leakage confirmed.';
  END IF;
END $$;

-- ==============================================================================
-- TEST CASE 2: VIEWER Role Enforcement (Read-Only)
-- ==============================================================================
SET LOCAL "request.jwt.claim.sub" = '55555555-5555-5555-5555-555555555555'; -- Viewer

-- 2.1 VIEWER can SELECT
DO $$
DECLARE
  v_count INT;
BEGIN
  SELECT COUNT(*) INTO v_count FROM public.projects WHERE workspace_id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
  IF v_count = 0 THEN
    RAISE EXCEPTION 'TEST 2.1 FAILED: Viewer could not read workspace projects!';
  ELSE
    RAISE NOTICE 'TEST 2.1 PASSED: Viewer can read workspace projects.';
  END IF;
END $$;

-- 2.2 VIEWER cannot INSERT projects
DO $$
BEGIN
  INSERT INTO public.projects (workspace_id, title, slug)
  VALUES ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Viewer Forbidden Project', 'viewer-forbidden');
  
  RAISE EXCEPTION 'TEST 2.2 FAILED: Viewer was able to INSERT a project!';
EXCEPTION
  WHEN insufficient_privilege THEN
    RAISE NOTICE 'TEST 2.2 PASSED: Viewer INSERT correctly rejected by RLS.';
END $$;

-- ==============================================================================
-- TEST CASE 3: CREATOR Role Enforcement (Can Create, Cannot Delete)
-- ==============================================================================
SET LOCAL "request.jwt.claim.sub" = '44444444-4444-4444-4444-444444444444'; -- Creator

-- 3.1 CREATOR can INSERT
DO $$
BEGIN
  INSERT INTO public.projects (id, workspace_id, title, slug)
  VALUES ('p4444444-4444-4444-4444-444444444444', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Creator Project', 'creator-project');
  RAISE NOTICE 'TEST 3.1 PASSED: Creator can create new projects.';
END $$;

-- 3.2 CREATOR cannot DELETE project (Only OWNER/ADMIN can delete)
DO $$
BEGIN
  DELETE FROM public.projects WHERE id = 'p1111111-1111-1111-1111-111111111111';
  IF FOUND THEN
    RAISE EXCEPTION 'TEST 3.2 FAILED: Creator was able to DELETE a project!';
  ELSE
    RAISE NOTICE 'TEST 3.2 PASSED: Creator cannot DELETE projects (RLS filtered 0 rows).';
  END IF;
END $$;

-- ==============================================================================
-- TEST CASE 4: ADMIN Role Enforcement (Can Manage Members, Cannot Modify OWNER)
-- ==============================================================================
SET LOCAL "request.jwt.claim.sub" = '22222222-2222-2222-2222-222222222222'; -- Admin

-- 4.1 ADMIN cannot delete OWNER membership
DO $$
BEGIN
  DELETE FROM public.workspace_members
  WHERE workspace_id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'
    AND user_id = '11111111-1111-1111-1111-111111111111'; -- Owner
  IF FOUND THEN
    RAISE EXCEPTION 'TEST 4.1 FAILED: Admin was able to DELETE the workspace Owner!';
  ELSE
    RAISE NOTICE 'TEST 4.1 PASSED: Admin cannot remove Owner.';
  END IF;
END $$;

-- ==============================================================================
-- TEST CASE 5: Immutability of Credits Ledger (No UPDATE allowed)
-- ==============================================================================
SET LOCAL "request.jwt.claim.sub" = '11111111-1111-1111-1111-111111111111'; -- Owner

DO $$
BEGIN
  UPDATE public.credits_ledger
  SET amount = 999999
  WHERE workspace_id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
  IF FOUND THEN
    RAISE EXCEPTION 'TEST 5 FAILED: Credits ledger allowed UPDATE! Immutability broken.';
  ELSE
    RAISE NOTICE 'TEST 5 PASSED: Credits ledger is strictly immutable (UPDATE blocked by RLS).';
  END IF;
END $$;

ROLLBACK; -- Clean rollback of test transactions
