/**
 * WAZA-ZONE OS Unified API Client
 * Connects frontend UI modules to Express server AI Gateway, FinOps Ledger,
 * SasPay.me Gateway, and the Admin Back-Office.
 */
import { resilientFetch } from './resilientFetch';

export interface PanelGenerationResponse {
  success: boolean;
  assetUrl: string;
  seedUsed: number;
  promptUsed: string;
  continuityPacket: any;
  ledger: {
    reserveTxId: string;
    settleTxId: string;
    creditsDeducted: number;
    remainingBalance: number;
  };
}

export interface LedgerResponse {
  workspaceId: string;
  balance: number;
  reserved: number;
  logs: any[];
}

export interface RechargeResponse {
  success: boolean;
  paymentRef: string;
  creditsAdded: number;
  newBalance: number;
  tx: any;
}

export interface TranslationResponse {
  translatedText: string;
  overflowRisk: boolean;
}

export interface SasPayCheckoutResponse {
  id: string;
  slug: string;
  checkout_url: string;
  amount: string;
  currency: string;
  status: string;
}

export interface SasPaySoftpayResponse {
  id: string;
  status: string;
  checkout_url?: string;
  message?: string;
  operator_reference?: string;
}

export class ApiClient {
  private static baseUrl = '';

  private static async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    return resilientFetch<T>(
      url,
      {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      },
      { maxRetries: 2, timeoutMs: 12000 }
    );
  }

  public static async getHealth() {
    return this.request<{ status: string; version: string }>('/api/health');
  }

  public static async getProjects() {
    return this.request<any[]>('/api/projects');
  }

  public static async getCharacters() {
    return this.request<any[]>('/api/characters');
  }

  public static async getWorld() {
    return this.request<any>('/api/world');
  }

  public static async getLedger(workspaceId = 'ws_kurogane_01'): Promise<LedgerResponse> {
    return this.request<LedgerResponse>(`/api/billing/ledger?workspaceId=${encodeURIComponent(workspaceId)}`);
  }

  public static async rechargeCredits(
    workspaceId = 'ws_kurogane_01',
    packId = 'pack_2500',
    provider = 'SASPAY'
  ): Promise<RechargeResponse> {
    return this.request<RechargeResponse>('/api/billing/recharge', {
      method: 'POST',
      body: JSON.stringify({ workspaceId, packId, provider }),
    });
  }

  // --- SASPAY.ME PAYMENTS ---
  public static async createSasPayCheckout(params: {
    amount: string;
    currency?: string;
    description: string;
    customer?: { email?: string; name?: string };
    metadata?: Record<string, any>;
  }): Promise<SasPayCheckoutResponse> {
    return this.request<SasPayCheckoutResponse>('/api/payments/saspay/checkout', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  public static async createSasPaySoftpay(params: {
    amount: string;
    currency?: string;
    country?: string;
    phone: string;
    network?: string;
    description?: string;
    metadata?: Record<string, any>;
  }): Promise<SasPaySoftpayResponse> {
    return this.request<SasPaySoftpayResponse>('/api/payments/saspay/softpay', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  public static async verifySasPayPayment(paymentId: string) {
    return this.request<any>(`/api/payments/saspay/verify/${paymentId}`);
  }

  // --- AI GATEWAY ---
  public static async generatePanel(params: {
    workspaceId?: string;
    projectId?: string;
    characterIds?: string[];
    sceneId?: string;
    panelNumber?: number;
    prompt?: string;
    aspectRatio?: string;
    cameraAngle?: string;
    idempotencyKey?: string;
  }): Promise<PanelGenerationResponse> {
    return this.request<PanelGenerationResponse>('/api/ai/generate-panel', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  public static async generateStoryPlan(params: {
    title: string;
    genre: string;
    format: string;
    premise: string;
  }) {
    return this.request<any>('/api/story/plan', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  public static async generateSceneBeats(params: {
    sceneTitle: string;
    locationName: string;
    charactersInScene: string[];
    dramaticObjective: string;
  }) {
    return this.request<any[]>('/api/story/beats', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  public static async translate(
    text: string,
    targetLocale: string,
    glossary?: Record<string, string>
  ): Promise<TranslationResponse> {
    return this.request<TranslationResponse>('/api/localization/translate', {
      method: 'POST',
      body: JSON.stringify({ text, targetLocale, glossary }),
    });
  }

  // --- ADMIN BACK-OFFICE ---
  public static async getAdminDashboard(period = '30_DAYS') {
    return this.request<any>(`/api/admin/v1/dashboard?period=${encodeURIComponent(period)}`);
  }

  public static async getAdminAcquisition() {
    return this.request<any>('/api/admin/v1/acquisition');
  }

  public static async getAdminUsers(search = '', status = 'ALL') {
    return this.request<any[]>(`/api/admin/v1/users?search=${encodeURIComponent(search)}&status=${encodeURIComponent(status)}`);
  }

  public static async toggleAdminUserStatus(id: string, reason: string, adminEmail: string) {
    return this.request<any>(`/api/admin/v1/users/${id}/status`, {
      method: 'POST',
      body: JSON.stringify({ reason, adminEmail }),
    });
  }

  public static async getAdminEvents() {
    return this.request<any[]>('/api/admin/v1/events');
  }

  public static async getAdminPlans() {
    return this.request<any>('/api/admin/v1/plans');
  }

  public static async getAdminUnmatchedPayments() {
    return this.request<any[]>('/api/admin/v1/payments/unmatched');
  }

  public static async attachAdminPayment(id: string, userId: string, adminEmail: string) {
    return this.request<any>(`/api/admin/v1/payments/${id}/attach`, {
      method: 'POST',
      body: JSON.stringify({ userId, adminEmail }),
    });
  }

  public static async getAdminFunnel() {
    return this.request<any[]>('/api/admin/v1/funnel');
  }

  public static async getAdminInfluencers() {
    return this.request<any[]>('/api/admin/v1/influencers');
  }

  public static async getAdminModeration() {
    return this.request<{ cases: any[]; pendingCount: number }>('/api/admin/v1/moderation');
  }

  public static async resolveAdminModeration(id: string, decision: 'RESOLVE' | 'DISMISS', note: string, adminEmail: string) {
    return this.request<any>(`/api/admin/v1/moderation/${id}/action`, {
      method: 'POST',
      body: JSON.stringify({ decision, note, adminEmail }),
    });
  }

  public static async getAdminAudit() {
    return this.request<any[]>('/api/admin/v1/audit');
  }
}
