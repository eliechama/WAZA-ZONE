import { Request, Response, NextFunction } from 'express';

interface ClientQuota {
  tokens: number;
  lastRefill: number;
}

const buckets = new Map<string, ClientQuota>();
const MAX_TOKENS = 60; // 60 requests burst limit
const REFILL_RATE_PER_SEC = 2; // 2 tokens refilled per second

/**
 * Token Bucket Rate Limiter
 * Guards generative and payment endpoints against abuse and DoS.
 */
export function rateLimiter(req: Request, res: Response, next: NextFunction) {
  const clientKey = (req.headers['x-workspace-id'] as string) || req.ip || 'anonymous';
  const now = Date.now();

  let bucket = buckets.get(clientKey);
  if (!bucket) {
    bucket = { tokens: MAX_TOKENS, lastRefill: now };
    buckets.set(clientKey, bucket);
  } else {
    const elapsedSeconds = (now - bucket.lastRefill) / 1000;
    bucket.tokens = Math.min(MAX_TOKENS, bucket.tokens + elapsedSeconds * REFILL_RATE_PER_SEC);
    bucket.lastRefill = now;
  }

  if (bucket.tokens < 1) {
    res.setHeader('Retry-After', '2');
    return res.status(429).json({
      error: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many concurrent requests. Please throttle your rate.',
    });
  }

  bucket.tokens -= 1;
  res.setHeader('X-RateLimit-Remaining', Math.floor(bucket.tokens).toString());
  next();
}
