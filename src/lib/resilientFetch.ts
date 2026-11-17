export interface RetryConfig {
  maxRetries?: number;
  initialDelayMs?: number;
  maxDelayMs?: number;
  timeoutMs?: number;
}

/**
 * Resilient Fetch with Exponential Backoff, Full Jitter, and AbortController Timeout.
 */
export async function resilientFetch<T>(
  url: string,
  options: RequestInit = {},
  config: RetryConfig = {}
): Promise<T> {
  const {
    maxRetries = 3,
    initialDelayMs = 300,
    maxDelayMs = 3000,
    timeoutMs = 15000,
  } = config;

  let attempt = 0;

  while (attempt <= maxRetries) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        return (await response.json()) as T;
      }

      // If client error that is non-retryable (400, 401, 403, 404), throw immediately
      if (response.status < 500 && response.status !== 429) {
        const errorData = await response.json().catch(() => ({ error: response.statusText }));
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      attempt++;
      if (attempt > maxRetries) {
        throw new Error(`Server returned HTTP ${response.status} after ${maxRetries} retries`);
      }
    } catch (err: any) {
      clearTimeout(timeoutId);
      if (err.name === 'AbortError') {
        throw new Error(`Request timed out after ${timeoutMs}ms`);
      }

      attempt++;
      if (attempt > maxRetries) {
        throw err;
      }
    }

    // Exponential backoff with Full Jitter
    const delay = Math.min(
      maxDelayMs,
      Math.random() * (initialDelayMs * Math.pow(2, attempt - 1))
    );
    await new Promise((resolve) => setTimeout(resolve, delay));
  }

  throw new Error('Unreachable state in resilientFetch');
}
