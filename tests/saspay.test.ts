import test from 'node:test';
import assert from 'node:assert/strict';
import crypto from 'crypto';
import { SasPayService } from '../server/services/saspay.js';
import { WebhookValidator } from '../server/services/webhookValidator.js';

test('SasPay Gateway - Compliant Decimal Amounts, Checkout & Webhook Guards', async (t) => {
  await t.test('formats numerical amounts into strictly 2-decimal strings', () => {
    assert.equal(SasPayService.formatAmount(2500), '2500.00');
    assert.equal(SasPayService.formatAmount(39), '39.00');
    assert.equal(SasPayService.formatAmount('915966'), '915966.00');
    assert.equal(SasPayService.formatAmount('invalid'), '0.00');
  });

  await t.test('creates hosted checkout session with decimal amount and slug', async () => {
    const session = await SasPayService.createCheckoutSession({
      amount: '5000.00',
      currency: 'XAF',
      description: 'WAZA-ZONE Pro Credits Pack',
      customer: { email: 'creator@waza.zone', name: 'Kai Vance' },
    });

    assert.ok(session.id);
    assert.ok(session.checkout_url);
    assert.equal(session.amount, '5000.00');
    assert.equal(session.currency, 'XAF');
  });

  await t.test('initiates softpay mobile money prompt with operator ref', async () => {
    const softpay = await SasPayService.createSoftpay({
      amount: '2500.00',
      currency: 'XAF',
      country: 'CM',
      phone: '+237690000000',
      network: 'MTN',
      description: 'Studio Credits Addon',
      idempotencyKey: 'idemp_test_saspay_01',
    });

    assert.ok(softpay.id);
    assert.equal(softpay.status, 'PENDING');
    assert.ok(softpay.operator_reference);
  });

  await t.test('verifies payment status on gateway', async () => {
    const verification = await SasPayService.verifyPayment('pay_demo_test_123');
    assert.equal(verification.status, 'SUCCESS');
    assert.ok(verification.paid_at);
  });

  await t.test('validates authentic webhook HMAC signature and rejects expired timestamps', () => {
    const secret = 'whsec_test_saspay_secret_key_123';
    const rawBody = JSON.stringify({
      event: 'payment.success',
      data: { id: 'pay_9921', status: 'SUCCESS', amount: '2500.00' },
    });

    const nowTs = Math.floor(Date.now() / 1000).toString();
    const validSignature = crypto
      .createHmac('sha256', secret)
      .update(`${nowTs}.${rawBody}`)
      .digest('hex');

    // 1. Valid signature and fresh timestamp -> OK
    const validResult = WebhookValidator.verifySasPayWebhook(rawBody, validSignature, nowTs, secret);
    assert.equal(validResult.valid, true);

    // 2. Expired timestamp (> 300s old) -> REJECT
    const expiredTs = (parseInt(nowTs, 10) - 400).toString();
    const expiredSig = crypto
      .createHmac('sha256', secret)
      .update(`${expiredTs}.${rawBody}`)
      .digest('hex');
    const expiredResult = WebhookValidator.verifySasPayWebhook(rawBody, expiredSig, expiredTs, secret);
    assert.equal(expiredResult.valid, false);
    assert.ok(expiredResult.reason?.includes('300s'));

    // 3. Invalid signature -> REJECT
    const invalidResult = WebhookValidator.verifySasPayWebhook(rawBody, 'deadbeef1234', nowTs, secret);
    assert.equal(invalidResult.valid, false);
  });
});
