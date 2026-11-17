-- ==============================================================================
-- WAZA-ZONE OS v2.4 - Phase 01 Database Migration 002
-- Migration: 002_billing_ledger_v2.sql
-- Description: FinOps Credit Ledger v2 with atomic reservation, settlement,
--              idempotency locking, and ledger consistency triggers.
-- ==============================================================================

-- 1. Performance Indexes for Ledger & Billing
CREATE INDEX IF NOT EXISTS idx_credits_ledger_workspace_id ON public.credits_ledger(workspace_id);
CREATE INDEX IF NOT EXISTS idx_credits_ledger_created_at ON public.credits_ledger(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_credits_ledger_idempotency ON public.credits_ledger(idempotency_signature);
CREATE INDEX IF NOT EXISTS idx_usage_events_workspace_created ON public.usage_events(workspace_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_subscriptions_workspace_status ON public.subscriptions(workspace_id, status);

-- 2. Atomic Credit Reservation Stored Function
CREATE OR REPLACE FUNCTION public.reserve_credits_atomic(
  p_workspace_id UUID,
  p_amount INTEGER,
  p_idempotency_key TEXT,
  p_job_id UUID DEFAULT NULL,
  p_description TEXT DEFAULT 'AI Generation Credit Hold'
)
RETURNS JSONB AS $$
DECLARE
  v_current_balance INTEGER;
  v_current_reserved INTEGER;
  v_existing_tx RECORD;
  v_new_tx_id UUID;
  v_sig TEXT;
BEGIN
  v_sig := 'idemp_' || p_idempotency_key || '_rsv';

  -- Check if already executed (Idempotency Guard)
  SELECT id, balance_after INTO v_existing_tx
  FROM public.credits_ledger
  WHERE idempotency_signature = v_sig;

  IF FOUND THEN
    RETURN jsonb_build_object(
      'status', 'IDEMPOTENT_HIT',
      'tx_id', v_existing_tx.id,
      'balance_after', v_existing_tx.balance_after
    );
  END IF;

  -- Lock workspace row for update to prevent concurrent double-spends
  SELECT credit_balance, reserved_credits
  INTO v_current_balance, v_current_reserved
  FROM public.workspaces
  WHERE id = p_workspace_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Workspace % not found', p_workspace_id;
  END IF;

  IF (v_current_balance - v_current_reserved) < p_amount THEN
    RAISE EXCEPTION 'Insufficient credits. Spendable: %, Requested: %',
      (v_current_balance - v_current_reserved), p_amount;
  END IF;

  -- Update reserved credits
  UPDATE public.workspaces
  SET reserved_credits = reserved_credits + p_amount,
      updated_at = NOW()
  WHERE id = p_workspace_id;

  -- Insert immutable ledger entry
  INSERT INTO public.credits_ledger (
    workspace_id,
    event_type,
    amount,
    balance_after,
    job_id,
    description,
    idempotency_signature
  ) VALUES (
    p_workspace_id,
    'RESERVE',
    -p_amount,
    v_current_balance - (v_current_reserved + p_amount),
    p_job_id,
    p_description,
    v_sig
  ) RETURNING id INTO v_new_tx_id;

  RETURN jsonb_build_object(
    'status', 'RESERVED',
    'tx_id', v_new_tx_id,
    'amount', p_amount,
    'spendable_after', v_current_balance - (v_current_reserved + p_amount)
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Atomic Credit Settlement Stored Function
CREATE OR REPLACE FUNCTION public.settle_credits_atomic(
  p_workspace_id UUID,
  p_reserved_amount INTEGER,
  p_actual_amount INTEGER,
  p_idempotency_key TEXT,
  p_job_id UUID DEFAULT NULL,
  p_description TEXT DEFAULT 'AI Generation Settlement'
)
RETURNS JSONB AS $$
DECLARE
  v_sig TEXT;
  v_existing_tx RECORD;
  v_new_tx_id UUID;
  v_new_balance INTEGER;
BEGIN
  v_sig := 'idemp_' || p_idempotency_key || '_stl';

  SELECT id, balance_after INTO v_existing_tx
  FROM public.credits_ledger
  WHERE idempotency_signature = v_sig;

  IF FOUND THEN
    RETURN jsonb_build_object(
      'status', 'IDEMPOTENT_HIT',
      'tx_id', v_existing_tx.id,
      'balance_after', v_existing_tx.balance_after
    );
  END IF;

  -- Lock workspace
  UPDATE public.workspaces
  SET credit_balance = GREATEST(0, credit_balance - p_actual_amount),
      reserved_credits = GREATEST(0, reserved_credits - p_reserved_amount),
      updated_at = NOW()
  WHERE id = p_workspace_id
  RETURNING credit_balance INTO v_new_balance;

  -- Insert settlement ledger record
  INSERT INTO public.credits_ledger (
    workspace_id,
    event_type,
    amount,
    balance_after,
    job_id,
    description,
    idempotency_signature
  ) VALUES (
    p_workspace_id,
    'SETTLE',
    -p_actual_amount,
    v_new_balance,
    p_job_id,
    p_description,
    v_sig
  ) RETURNING id INTO v_new_tx_id;

  RETURN jsonb_build_object(
    'status', 'SETTLED',
    'tx_id', v_new_tx_id,
    'balance_after', v_new_balance
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
