/**
 * WAZA-ZONE OS & Invitiz Admin Master Service
 * Adheres to Prompt_maitre_backend_admin_.md
 * Provides stateful management for the 9 core administrative modules.
 * Currency: XAF (F CFA), Timezone: Africa/Douala (UTC+1).
 */

export interface AdminUser {
  id: string;
  email: string;
  fullName: string;
  role: 'SUPER_ADMIN' | 'FINANCE' | 'MODERATOR' | 'SUPPORT' | 'ANALYST';
  status: 'ACTIVE' | 'SUSPENDED';
  planTier: string;
  createdAt: string;
  lastLogin: string;
  projectsCount: number;
  totalSpentXaf: number;
  suspensionReason?: string;
}

export interface AdminProjectEvent {
  id: string;
  title: string;
  ownerEmail: string;
  ownerName: string;
  format: string;
  status: 'PUBLISHED' | 'IN_PRODUCTION' | 'DRAFT' | 'FLAGGED';
  invitationsCount: number;
  responsesCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface UnmatchedPayment {
  id: string;
  gatewayRef: string; // SasPay reference e.g. "sas_pay_998124"
  amountXaf: number;
  currency: 'XAF';
  payerPhone: string;
  payerName: string;
  paidAt: string;
  status: 'CONFIRMED';
  suggestedMatchUserId?: string;
  suggestedMatchReason?: string;
  matchedUserId?: string;
  matchedAt?: string;
  matchedBy?: string;
}

export interface ModerationCase {
  id: string;
  targetType: 'PROJECT' | 'PANEL' | 'COMMENT' | 'PROFILE';
  targetId: string;
  targetTitle: string;
  reportedBy: string;
  reason: string;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'PENDING' | 'RESOLVED' | 'DISMISSED';
  createdAt: string;
  assignedTo?: string;
  decisionNote?: string;
}

export interface AdminAuditEntry {
  id: string;
  actorEmail: string;
  action: string;
  targetEntity: string;
  targetId: string;
  details: string;
  timestamp: string;
}

export class AdminService {
  private static users: AdminUser[] = [
    {
      id: 'usr_kai_vance',
      email: 'kai.vance@neokyoto-studios.jp',
      fullName: 'Kai Vance',
      role: 'SUPER_ADMIN',
      status: 'ACTIVE',
      planTier: 'PRO_STUDIO',
      createdAt: '2026-01-14T08:00:00Z',
      lastLogin: new Date().toISOString(),
      projectsCount: 4,
      totalSpentXaf: 125000,
    },
    {
      id: 'usr_ren_kurogane',
      email: 'ren.ronin@shibuya.waza.zone',
      fullName: 'Ren Kurogane',
      role: 'FINANCE',
      status: 'ACTIVE',
      planTier: 'PRO_STUDIO',
      createdAt: '2026-02-10T12:30:00Z',
      lastLogin: '2026-11-16T14:20:00Z',
      projectsCount: 2,
      totalSpentXaf: 65000,
    },
    {
      id: 'usr_aoi_vance',
      email: 'aoi.netrunner@waza.zone',
      fullName: 'Aoi Vance',
      role: 'MODERATOR',
      status: 'ACTIVE',
      planTier: 'CREATOR',
      createdAt: '2026-03-01T09:15:00Z',
      lastLogin: '2026-11-17T07:45:00Z',
      projectsCount: 1,
      totalSpentXaf: 25000,
    },
    {
      id: 'usr_guest_fan',
      email: 'fan88@gmail.com',
      fullName: 'Kenji Fan',
      role: 'SUPPORT',
      status: 'ACTIVE',
      planTier: 'FREE_EXPLORER',
      createdAt: '2026-08-20T17:00:00Z',
      lastLogin: '2026-11-10T11:00:00Z',
      projectsCount: 0,
      totalSpentXaf: 0,
    },
    {
      id: 'usr_bad_actor',
      email: 'spammer_bot@darkweb.io',
      fullName: 'Auto Bot #49',
      role: 'ANALYST',
      status: 'SUSPENDED',
      planTier: 'FREE_EXPLORER',
      createdAt: '2026-10-12T03:00:00Z',
      lastLogin: '2026-10-15T04:12:00Z',
      projectsCount: 0,
      totalSpentXaf: 0,
      suspensionReason: 'Génération massive de requêtes non autorisées et violation CGU.',
    },
  ];

  private static events: AdminProjectEvent[] = [
    {
      id: 'proj_chrono_omega',
      title: 'CHRONO BLADE: OMEGA',
      ownerEmail: 'kai.vance@neokyoto-studios.jp',
      ownerName: 'Kai Vance',
      format: 'MANGA_B4',
      status: 'IN_PRODUCTION',
      invitationsCount: 24,
      responsesCount: 21,
      createdAt: '2026-04-12T10:00:00Z',
      updatedAt: '2026-11-17T08:00:00Z',
    },
    {
      id: 'proj_solar_echoes',
      title: 'SOLAR ECHOES',
      ownerEmail: 'aoi.netrunner@waza.zone',
      ownerName: 'Aoi Vance',
      format: 'WEBTOON',
      status: 'PUBLISHED',
      invitationsCount: 40,
      responsesCount: 38,
      createdAt: '2026-06-01T14:00:00Z',
      updatedAt: '2026-11-16T19:30:00Z',
    },
    {
      id: 'proj_brumaire',
      title: 'LE CHANT DU BRUMAIRE',
      ownerEmail: 'ren.ronin@shibuya.waza.zone',
      ownerName: 'Ren Kurogane',
      format: 'FRANCO_BELGE',
      status: 'DRAFT',
      invitationsCount: 12,
      responsesCount: 9,
      createdAt: '2026-09-18T11:20:00Z',
      updatedAt: '2026-11-15T16:00:00Z',
    },
  ];

  private static unmatchedPayments: UnmatchedPayment[] = [
    {
      id: 'unm_sas_001',
      gatewayRef: 'sas_pay_8891024',
      amountXaf: 39000,
      currency: 'XAF',
      payerPhone: '+237691823901',
      payerName: 'Kurogane Mobile Payer',
      paidAt: '2026-11-17T06:30:00Z',
      status: 'CONFIRMED',
      suggestedMatchUserId: 'usr_ren_kurogane',
      suggestedMatchReason: 'Correspondance numéro de téléphone et montant Forfait Pro Studio',
    },
    {
      id: 'unm_sas_002',
      gatewayRef: 'sas_pay_7721890',
      amountXaf: 10000,
      currency: 'XAF',
      payerPhone: '+237670981245',
      payerName: 'Orange Money Aoi Client',
      paidAt: '2026-11-16T22:15:00Z',
      status: 'CONFIRMED',
      suggestedMatchUserId: 'usr_aoi_vance',
      suggestedMatchReason: 'Session de recharge non finalisée dans le navigateur',
    },
  ];

  private static moderationCases: ModerationCase[] = [
    {
      id: 'mod_case_001',
      targetType: 'PROJECT',
      targetId: 'proj_bad_content_09',
      targetTitle: 'Projet Illégal Sector 4',
      reportedBy: 'user_sentinel@waza.zone',
      reason: 'Contenu haineux et violation des règles de copyright',
      priority: 'CRITICAL',
      status: 'PENDING',
      createdAt: '2026-11-17T04:12:00Z',
    },
    {
      id: 'mod_case_002',
      targetType: 'PANEL',
      targetId: 'panel_shibuya_nsfw_33',
      targetTitle: 'Planche 03 Scène 4',
      reportedBy: 'ai_moderator_daemon',
      reason: 'Score de nudité explicite dépassant le seuil Tankobon Shonen (98%)',
      priority: 'HIGH',
      status: 'PENDING',
      createdAt: '2026-11-17T02:40:00Z',
    },
    {
      id: 'mod_case_003',
      targetType: 'COMMENT',
      targetId: 'comm_spam_882',
      targetTitle: 'Commentaire spam sur Solar Echoes',
      reportedBy: 'aoi.netrunner@waza.zone',
      reason: 'Lien d’affiliation externe suspect',
      priority: 'LOW',
      status: 'RESOLVED',
      createdAt: '2026-11-16T12:00:00Z',
      decisionNote: 'Commentaire supprimé et compte averti.',
    },
  ];

  private static auditLogs: AdminAuditEntry[] = [
    {
      id: 'aud_01',
      actorEmail: 'kai.vance@neokyoto-studios.jp',
      action: 'SUSPEND_USER',
      targetEntity: 'USER',
      targetId: 'usr_bad_actor',
      details: 'Suspension pour abus de requêtes API non conformes.',
      timestamp: '2026-10-15T05:00:00Z',
    },
    {
      id: 'aud_02',
      actorEmail: 'kai.vance@neokyoto-studios.jp',
      action: 'UPDATE_SASPAY_CONFIG',
      targetEntity: 'GATEWAY',
      targetId: 'saspay_v1',
      details: 'Validation de l’IP whitelisted et bascule production SasPay rails.',
      timestamp: '2026-11-10T10:00:00Z',
    },
  ];

  /**
   * 1. Vue d'ensemble (Dashboard Master Metrics)
   * Exact match with Prompt_maitre_backend_admin_.md specs:
   * 6 500 inscriptions, 136 abonnements vendus, 915 966 F CFA encaissés, 1,9% conversion.
   */
  public static getDashboard(period = '30_DAYS') {
    const asOf = new Date().toISOString();
    return {
      asOf,
      period,
      currency: 'XAF',
      timezone: 'Africa/Douala',
      dateRangeDisplay: '18 oct. 2026 - 17 nov. 2026 (UTC+1)',
      kpis: {
        inscriptions: {
          label: 'Inscriptions',
          value: 6500,
          formatted: '6 500',
          previousValue: 5780,
          changePct: 12.4,
          description: 'Nombre de comptes créés pendant la période sélectionnée.',
        },
        abonnementsVendus: {
          label: 'Abonnements vendus',
          value: 136,
          formatted: '136',
          previousValue: 118,
          changePct: 15.2,
          description: 'Commandes d’abonnement payées via SasPay pendant la période.',
        },
        revenuEncaisse: {
          label: 'Revenu encaissé',
          value: 915966,
          formatted: '915 966 F CFA',
          previousValue: 812400,
          changePct: 12.7,
          description: 'Total brut encaissé et confirmé sur les passerelles SasPay (Mobile Money & Carte).',
        },
        conversionInscrits: {
          label: 'Conversion des inscrits',
          value: 1.9,
          formatted: '1,9 %',
          cohortSignups: 6500,
          cohortBuyers: 124, // 124 / 6500 = 1.907% -> exactly 1.9% rounded
          changePts: 0.3,
          description: '124 acheteurs distincts de la cohorte sur 6 500 inscrits.',
        },
      },
      secondaryCounters: {
        invitationsCreees: { value: 4326, formatted: '4 326', label: 'Invitations & Projets créés' },
        abonnesActifsAujourdhui: { value: 103, formatted: '103', label: 'Abonnés actifs aujourd’hui' },
        comptesTotaux: { value: 6500, formatted: '6 500', label: 'Comptes totaux' },
        comptesActifs: { value: 6464, formatted: '6 464', label: 'Comptes actifs autorisés' },
        tauxReponse: { value: 88, formatted: '88 %', label: 'Taux de réponse des invités' },
      },
      ventesParForfait: [
        {
          id: 'plan_essentiel',
          nom: 'Forfait Essentiel',
          vendus: 84,
          montantEncaisseXaf: 336000,
          offerts: 12,
          actifs: 62,
          prixUnitaireXaf: 4000,
        },
        {
          id: 'plan_studio_pro',
          nom: 'Forfait Studio Pro',
          vendus: 42,
          montantEncaisseXaf: 420000,
          offerts: 6,
          actifs: 34,
          prixUnitaireXaf: 10000,
        },
        {
          id: 'plan_premium',
          nom: 'Forfait Premium / Enterprise',
          vendus: 10,
          montantEncaisseXaf: 159966,
          offerts: 2,
          actifs: 7,
          prixUnitaireXaf: 16000,
        },
      ],
      timeseries: [
        { date: '18 Oct', inscriptions: 180, revenuXaf: 28000, ventes: 4 },
        { date: '25 Oct', inscriptions: 210, revenuXaf: 34000, ventes: 5 },
        { date: '01 Nov', inscriptions: 245, revenuXaf: 41000, ventes: 6 },
        { date: '08 Nov', inscriptions: 310, revenuXaf: 58000, ventes: 9 },
        { date: '15 Nov', inscriptions: 420, revenuXaf: 82000, ventes: 12 },
        { date: '17 Nov', inscriptions: 450, revenuXaf: 94000, ventes: 14 },
      ],
    };
  }

  /**
   * 2. Acquisition (Sources & UTM Campaigns)
   */
  public static getAcquisition() {
    return {
      sources: [
        { source: 'Accès Direct / Notoriété', signups: 2450, buyers: 48, conversionRate: '1,96 %', sharePct: 37.7 },
        { source: 'Recherche Google Organique', signups: 1820, buyers: 34, conversionRate: '1,87 %', sharePct: 28.0 },
        { source: 'Créateurs TikTok / Instagram', signups: 1430, buyers: 38, conversionRate: '2,66 %', sharePct: 22.0 },
        { source: 'Twitter / X Mangaka Hub', signups: 800, buyers: 16, conversionRate: '2,00 %', sharePct: 12.3 },
      ],
      campaigns: [
        { campaign: 'waza_launch_2088', medium: 'social_video', clicks: 12400, signups: 980, buyers: 26 },
        { campaign: 'chrono_blade_teaser', medium: 'newsletter', clicks: 8200, signups: 640, buyers: 18 },
        { campaign: 'douala_webtoon_workshop', medium: 'partner', clicks: 4300, signups: 320, buyers: 11 },
      ],
    };
  }

  /**
   * 3. Utilisateurs
   */
  public static getUsers(searchQuery = '', statusFilter = 'ALL') {
    return this.users.filter((u) => {
      const matchSearch =
        u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.fullName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus = statusFilter === 'ALL' || u.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }

  public static toggleUserStatus(userId: string, reason: string, adminEmail: string) {
    const user = this.users.find((u) => u.id === userId);
    if (!user) throw new Error('Utilisateur non trouvé');

    user.status = user.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
    if (user.status === 'SUSPENDED') {
      user.suspensionReason = reason;
    } else {
      delete user.suspensionReason;
    }

    this.auditLogs.unshift({
      id: `aud_${Date.now()}`,
      actorEmail: adminEmail,
      action: user.status === 'ACTIVE' ? 'REACTIVATE_USER' : 'SUSPEND_USER',
      targetEntity: 'USER',
      targetId: userId,
      details: reason,
      timestamp: new Date().toISOString(),
    });

    return user;
  }

  /**
   * 4. Événements & Projets
   */
  public static getEvents() {
    return this.events;
  }

  /**
   * 5. Abonnements
   */
  public static getSubscriptions() {
    return {
      plansCatalogue: [
        {
          id: 'plan_essentiel',
          nom: 'Essentiel Mangaka',
          version: 'v2.1',
          tarifMensuelXaf: 4000,
          creditsInclus: 500,
          description: 'Accès moteur B4 et export PDF web standard.',
          activeSubscribers: 62,
        },
        {
          id: 'plan_studio_pro',
          nom: 'Studio Pro',
          version: 'v2.4',
          tarifMensuelXaf: 10000,
          creditsInclus: 2500,
          description: 'DNA persistant Zero Drift, export Tankobon 350DPI, passerelle SasPay.',
          activeSubscribers: 34,
        },
        {
          id: 'plan_premium',
          nom: 'Studio Enterprise / Élite',
          version: 'v3.0',
          tarifMensuelXaf: 25000,
          creditsInclus: 10000,
          description: 'Multi-auteurs illimité, API Gemini dédiée, support dédié Douala/Tokyo.',
          activeSubscribers: 7,
        },
      ],
      totalActiveSubscribers: 103,
    };
  }

  /**
   * 6. Paiements à rattacher
   */
  public static getUnmatchedPayments() {
    return this.unmatchedPayments;
  }

  public static attachPayment(paymentId: string, userId: string, adminEmail: string) {
    const payment = this.unmatchedPayments.find((p) => p.id === paymentId);
    if (!payment) throw new Error('Paiement non trouvé');
    if (payment.matchedUserId) throw new Error('Ce paiement est déjà rattaché à un utilisateur');

    const user = this.users.find((u) => u.id === userId);
    if (!user) throw new Error('Utilisateur cible introuvable');

    payment.matchedUserId = userId;
    payment.matchedAt = new Date().toISOString();
    payment.matchedBy = adminEmail;

    user.totalSpentXaf += payment.amountXaf;

    this.auditLogs.unshift({
      id: `aud_${Date.now()}`,
      actorEmail: adminEmail,
      action: 'ATTACH_PAYMENT',
      targetEntity: 'PAYMENT',
      targetId: paymentId,
      details: `Rattachement transactionnel de ${payment.amountXaf} XAF au compte ${user.email} (SasPay Ref: ${payment.gatewayRef})`,
      timestamp: new Date().toISOString(),
    });

    return payment;
  }

  /**
   * 7. Parcours Paiement (Funnel)
   */
  public static getCheckoutFunnel() {
    return [
      { step: '1. Ouverture du catalogue', sessionsCount: 10240, dropPct: 0, timeAvg: '0s' },
      { step: '2. Choix du forfait', sessionsCount: 5820, dropPct: 43.2, timeAvg: '42s' },
      { step: '3. Initialisation SasPay (Softpay/Checkout)', sessionsCount: 2140, dropPct: 63.2, timeAvg: '1m 12s' },
      { step: '4. Validation OTP / Mobile Money', sessionsCount: 1360, dropPct: 36.4, timeAvg: '2m 04s' },
      { step: '5. Droits & Crédits accordés', sessionsCount: 1360, dropPct: 0, timeAvg: '2m 06s' },
    ];
  }

  /**
   * 8. Influenceurs
   */
  public static getInfluencers() {
    return [
      {
        id: 'inf_01',
        name: 'MangaVerse Cameroun',
        handle: '@mangaverse_cm',
        code: 'MVCM2088',
        referralLink: 'https://waza.zone/?ref=MVCM2088',
        clicks: 4200,
        signups: 540,
        buyers: 22,
        revenueGeneratedXaf: 145000,
        status: 'ACTIVE',
      },
      {
        id: 'inf_02',
        name: 'Otaku Webtoon Hub Abidjan',
        handle: '@otakuhub_ci',
        code: 'OTAKUCI',
        referralLink: 'https://waza.zone/?ref=OTAKUCI',
        clicks: 2900,
        signups: 380,
        buyers: 14,
        revenueGeneratedXaf: 98000,
        status: 'ACTIVE',
      },
    ];
  }

  /**
   * 9. Modération (Queue avec Badge Numérique)
   */
  public static getModerationCases() {
    return this.moderationCases;
  }

  public static getPendingModerationCount(): number {
    return this.moderationCases.filter((c) => c.status === 'PENDING').length;
  }

  public static resolveModerationCase(caseId: string, decision: 'RESOLVE' | 'DISMISS', note: string, adminEmail: string) {
    const modCase = this.moderationCases.find((c) => c.id === caseId);
    if (!modCase) throw new Error('Dossier de modération introuvable');

    modCase.status = decision === 'RESOLVE' ? 'RESOLVED' : 'DISMISSED';
    modCase.decisionNote = note;
    modCase.assignedTo = adminEmail;

    this.auditLogs.unshift({
      id: `aud_${Date.now()}`,
      actorEmail: adminEmail,
      action: `MODERATION_${decision}`,
      targetEntity: 'MODERATION',
      targetId: caseId,
      details: note,
      timestamp: new Date().toISOString(),
    });

    return modCase;
  }

  public static getAuditLogs() {
    return this.auditLogs;
  }
}
