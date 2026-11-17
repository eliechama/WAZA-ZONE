/**
 * Keyed Async Mutex for FinOps Double-Entry Credit Ledger.
 * Ensures strict transaction serialization per workspaceId, eliminating race conditions.
 */
export class WorkspaceMutex {
  private static queues: Map<string, Promise<void>> = new Map();

  /**
   * Executes a FinOps operation under exclusive lock per workspaceId.
   */
  public static async runExclusive<T>(workspaceId: string, task: () => Promise<T> | T): Promise<T> {
    while (this.queues.has(workspaceId)) {
      try {
        await this.queues.get(workspaceId);
      } catch {
        // queue resolution safety
      }
    }

    let release: () => void = () => {};
    const lockPromise = new Promise<void>((resolve) => {
      release = resolve;
    });

    this.queues.set(workspaceId, lockPromise);

    try {
      return await task();
    } finally {
      this.queues.delete(workspaceId);
      release();
    }
  }
}
