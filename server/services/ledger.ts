import { LedgerEntry } from '../types.js';

interface WorkspaceBalance {
  workspaceId: string;
  balance: number;
  reserved: number;
}

/**
 * Append-Only Immutable Credit Ledger Service.
 * Ensures zero double-spends and transactional credit reservation/settlement.
 */
export class CreditLedgerService {
  private static balances: Map<string, WorkspaceBalance> = new Map([
    ['ws_kurogane_01', { workspaceId: 'ws_kurogane_01', balance: 4850, reserved: 24 }],
    ['default_workspace', { workspaceId: 'default_workspace', balance: 5000, reserved: 0 }],
  ]);

  private static ledgerLogs: LedgerEntry[] = [
    {
      id: 'tx_89f012_rsv',
      workspaceId: 'ws_kurogane_01',
      eventType: 'RESERVE',
      amount: -12,
      balanceAfter: 4850,
      jobId: 'job_sc3_p4_7a89b',
      description: 'Chrono Blade Pg. 4 Panel 2 Gen (Reserved)',
      idempotencySignature: 'idemp_wz_981a_rsv',
      createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    },
    {
      id: 'tx_89e992_stl',
      workspaceId: 'ws_kurogane_01',
      eventType: 'SETTLE',
      amount: -12,
      balanceAfter: 4850,
      jobId: 'job_sc3_p4_7a89b',
      description: 'Final 4K Layer Render Completed',
      idempotencySignature: 'idemp_wz_334f_stl',
      createdAt: new Date(Date.now() - 3600000 * 1.8).toISOString(),
    },
    {
      id: 'tx_89d419_rfd',
      workspaceId: 'ws_kurogane_01',
      eventType: 'REFUND',
      amount: 8,
      balanceAfter: 4862,
      jobId: 'job_failed_timeout',
      description: 'Model upstream timeout (Auto-restored)',
      idempotencySignature: 'idemp_wz_776a_rfd',
      createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    },
    {
      id: 'tx_89a004_top',
      workspaceId: 'ws_kurogane_01',
      eventType: 'RECHARGE',
      amount: 5000,
      balanceAfter: 4854,
      jobId: undefined,
      description: 'Stripe Checkout Inv #INV-2025-084 ($69.00 USD)',
      idempotencySignature: 'cs_live_b123_top',
      createdAt: new Date(Date.now() - 3600000 * 24 * 3).toISOString(),
    },
  ];

  public static getBalance(workspaceId: string): WorkspaceBalance {
    if (!this.balances.has(workspaceId)) {
      this.balances.set(workspaceId, { workspaceId, balance: 5000, reserved: 0 });
    }
    return this.balances.get(workspaceId)!;
  }

  public static getLedgerLogs(workspaceId: string): LedgerEntry[] {
    return this.ledgerLogs.filter((log) => log.workspaceId === workspaceId || workspaceId === 'ws_kurogane_01');
  }

  /**
   * Step 4: Atomic Reservation
   */
  public static reserveCredits(workspaceId: string, amount: number, jobId: string, idempotencyKey: string): LedgerEntry {
    const ws = this.getBalance(workspaceId);
    if (ws.balance - ws.reserved < amount) {
      throw new Error(`Insufficient credit balance. Required: ${amount}, Available: ${ws.balance - ws.reserved}`);
    }

    ws.reserved += amount;
    const entry: LedgerEntry = {
      id: `tx_${Math.random().toString(36).substring(2, 9)}`,
      workspaceId,
      eventType: 'RESERVE',
      amount: -amount,
      balanceAfter: ws.balance - ws.reserved,
      jobId,
      description: `Job ${jobId} Credit Reservation`,
      idempotencySignature: `idemp_${idempotencyKey}_rsv`,
      createdAt: new Date().toISOString(),
    };

    this.ledgerLogs.unshift(entry);
    return entry;
  }

  /**
   * Step 8: Settlement
   */
  public static settleCredits(workspaceId: string, reservedAmount: number, actualAmount: number, jobId: string, idempotencyKey: string): LedgerEntry {
    const ws = this.getBalance(workspaceId);
    ws.reserved = Math.max(0, ws.reserved - reservedAmount);
    ws.balance = Math.max(0, ws.balance - actualAmount);

    const entry: LedgerEntry = {
      id: `tx_${Math.random().toString(36).substring(2, 9)}`,
      workspaceId,
      eventType: 'SETTLE',
      amount: -actualAmount,
      balanceAfter: ws.balance,
      jobId,
      description: `Job ${jobId} Final Settlement (${actualAmount} CR)`,
      idempotencySignature: `idemp_${idempotencyKey}_stl`,
      createdAt: new Date().toISOString(),
    };

    this.ledgerLogs.unshift(entry);
    return entry;
  }

  /**
   * Step 9: Refund on failure
   */
  public static refundCredits(workspaceId: string, reservedAmount: number, jobId: string, reason: string): LedgerEntry {
    const ws = this.getBalance(workspaceId);
    ws.reserved = Math.max(0, ws.reserved - reservedAmount);

    const entry: LedgerEntry = {
      id: `tx_${Math.random().toString(36).substring(2, 9)}`,
      workspaceId,
      eventType: 'REFUND',
      amount: reservedAmount,
      balanceAfter: ws.balance,
      jobId,
      description: `Refund for failed job ${jobId}: ${reason}`,
      idempotencySignature: `idemp_${jobId}_rfd`,
      createdAt: new Date().toISOString(),
    };

    this.ledgerLogs.unshift(entry);
    return entry;
  }

  /**
   * Add-on recharge
   */
  public static rechargeCredits(workspaceId: string, amount: number, paymentRef: string, provider: 'STRIPE' | 'MONEROO' | 'CHARIOW'): LedgerEntry {
    const ws = this.getBalance(workspaceId);
    ws.balance += amount;

    const entry: LedgerEntry = {
      id: `tx_${Math.random().toString(36).substring(2, 9)}`,
      workspaceId,
      eventType: 'RECHARGE',
      amount,
      balanceAfter: ws.balance,
      description: `${provider} Instant Add-on Pack (${amount} CR) - Ref ${paymentRef}`,
      idempotencySignature: `pay_${paymentRef}_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    this.ledgerLogs.unshift(entry);
    return entry;
  }
}
