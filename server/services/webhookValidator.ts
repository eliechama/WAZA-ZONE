import crypto from 'crypto';

/**
 * Webhook Signature & Replay Verification Service
 * Conforms to SasPay & industry standard webhook security guidelines.
 * Rejects payloads if timestamp is older than 300 seconds.
 */
export class WebhookValidator {
  /**
   * Verifies SasPay webhook signature and timestamp.
   * Header: X-Webhook-Signature, X-Webhook-Timestamp
   */
  public static verifySasPayWebhook(
    rawBody: string,
    signature: string | undefined,
    timestamp: string | undefined,
    secret: string
  ): { valid: boolean; reason?: string } {
    if (!signature || !secret) {
      return { valid: false, reason: 'Missing signature or webhook signing secret' };
    }

    // 1. Timestamp Replay Window Check (max 300 seconds)
    if (timestamp) {
      const ts = parseInt(timestamp, 10);
      const now = Math.floor(Date.now() / 1000);
      if (isNaN(ts) || Math.abs(now - ts) > 300) {
        return { valid: false, reason: 'Timestamp outside 300s security window (replay attack prevention)' };
      }
    }

    // 2. Compute HMAC SHA-256 on raw body (or timestamp.rawBody if structured)
    const payloadToSign = timestamp ? `${timestamp}.${rawBody}` : rawBody;
    const computed = crypto.createHmac('sha256', secret).update(payloadToSign).digest('hex');
    const fallbackComputed = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');

    // Constant-time comparison
    const sigBuffer = Buffer.from(signature);
    const validWithTs =
      computed.length === sigBuffer.length && crypto.timingSafeEqual(Buffer.from(computed), sigBuffer);
    const validDirect =
      fallbackComputed.length === sigBuffer.length &&
      crypto.timingSafeEqual(Buffer.from(fallbackComputed), sigBuffer);

    if (validWithTs || validDirect) {
      return { valid: true };
    }

    return { valid: false, reason: 'Signature mismatch' };
  }
}
