import test from 'node:test';
import assert from 'node:assert/strict';
import { CreditLedgerService } from '../server/services/ledger.js';

test('FinOps Credit Ledger - Double-Entry Balance & Reservation Invariants', async (t) => {
  const wsId = 'test_ws_quantum_01';
  
  await t.test('initializes default balance correctly', () => {
    const bal = CreditLedgerService.getBalance(wsId);
    assert.equal(bal.balance, 5000);
    assert.equal(bal.reserved, 0);
  });

  await t.test('reserves credits and updates spendable balance', () => {
    const tx = CreditLedgerService.reserveCredits(wsId, 50, 'job_test_01', 'idemp_key_100');
    assert.equal(tx.eventType, 'RESERVE');
    assert.equal(tx.amount, -50);
    assert.equal(tx.balanceAfter, 4950);

    const bal = CreditLedgerService.getBalance(wsId);
    assert.equal(bal.balance, 5000);
    assert.equal(bal.reserved, 50);
  });

  await t.test('enforces idempotency on duplicate reservation', () => {
    // Calling with same idempotency key must NOT reserve twice
    const duplicateTx = CreditLedgerService.reserveCredits(wsId, 50, 'job_test_01', 'idemp_key_100');
    assert.equal(duplicateTx.idempotencySignature, 'idemp_idemp_key_100_rsv');

    const bal = CreditLedgerService.getBalance(wsId);
    assert.equal(bal.reserved, 50, 'Reserved credits should not double-count');
  });

  await t.test('settles reserved credits into permanent deduction', () => {
    const tx = CreditLedgerService.settleCredits(wsId, 50, 50, 'job_test_01', 'idemp_key_100');
    assert.equal(tx.eventType, 'SETTLE');
    assert.equal(tx.amount, -50);
    assert.equal(tx.balanceAfter, 4950);

    const bal = CreditLedgerService.getBalance(wsId);
    assert.equal(bal.balance, 4950);
    assert.equal(bal.reserved, 0);
  });

  await t.test('recharges credits and appends ledger record', () => {
    const tx = CreditLedgerService.rechargeCredits(wsId, 2500, 'test_inv_882', 'SASPAY');
    assert.equal(tx.eventType, 'RECHARGE');
    assert.equal(tx.amount, 2500);
    assert.equal(tx.balanceAfter, 7450);

    const bal = CreditLedgerService.getBalance(wsId);
    assert.equal(bal.balance, 7450);
  });

  await t.test('prevents over-reservation past available spendable credits', () => {
    assert.throws(() => {
      CreditLedgerService.reserveCredits(wsId, 999999, 'job_overflow', 'idemp_overflow');
    }, /Insufficient credit balance/);
  });
});
