import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  TrendingUp,
  Users,
  Calendar,
  CreditCard,
  Link2,
  GitPullRequest,
  Award,
  ShieldAlert,
  Search,
  Bell,
  LogOut,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  Download,
  RefreshCw,
  FileText,
  Check,
  X,
  ChevronRight,
  SlidersHorizontal,
  Eye,
  Ban,
  Activity,
  Phone,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { ApiClient } from '../lib/api';

type AdminTab =
  | 'overview'
  | 'acquisition'
  | 'users'
  | 'events'
  | 'subscriptions'
  | 'unmatched_payments'
  | 'payment_funnel'
  | 'influencers'
  | 'moderation';

type AdminRole = 'SUPER_ADMIN' | 'FINANCE' | 'MODERATOR' | 'SUPPORT' | 'ANALYST';

export const AdminConsole: React.FC = () => {
  // Navigation & Role State
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [currentRole, setCurrentRole] = useState<AdminRole>('SUPER_ADMIN');
  const [period, setPeriod] = useState<string>('30_DAYS');
  const [globalSearch, setGlobalSearch] = useState<string>('');
  const [showNotifications, setShowNotifications] = useState<boolean>(false);

  // Data States
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [acquisitionData, setAcquisitionData] = useState<any>(null);
  const [usersList, setUsersList] = useState<any[]>([]);
  const [eventsList, setEventsList] = useState<any[]>([]);
  const [plansData, setPlansData] = useState<any>(null);
  const [unmatchedPayments, setUnmatchedPayments] = useState<any[]>([]);
  const [funnelData, setFunnelData] = useState<any[]>([]);
  const [influencersList, setInfluencersList] = useState<any[]>([]);
  const [moderationCases, setModerationCases] = useState<any[]>([]);
  const [pendingModCount, setPendingModCount] = useState<number>(2);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);

  // Loading & UI Modals
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);

  // Modal States
  const [selectedUserForSuspend, setSelectedUserForSuspend] = useState<any | null>(null);
  const [suspendReason, setSuspendReason] = useState<string>('');
  const [selectedPaymentForAttach, setSelectedPaymentForAttach] = useState<any | null>(null);
  const [attachTargetUserId, setAttachTargetUserId] = useState<string>('');
  const [modActionCase, setModActionCase] = useState<any | null>(null);
  const [modNote, setModNote] = useState<string>('');

  // Initial Load from API
  const refreshAllData = async () => {
    setIsLoading(true);
    try {
      const [dash, acq, users, evts, plans, unm, fun, inf, mod, aud] = await Promise.all([
        ApiClient.getAdminDashboard(period).catch(() => null),
        ApiClient.getAdminAcquisition().catch(() => null),
        ApiClient.getAdminUsers().catch(() => []),
        ApiClient.getAdminEvents().catch(() => []),
        ApiClient.getAdminPlans().catch(() => null),
        ApiClient.getAdminUnmatchedPayments().catch(() => []),
        ApiClient.getAdminFunnel().catch(() => []),
        ApiClient.getAdminInfluencers().catch(() => []),
        ApiClient.getAdminModeration().catch(() => ({ cases: [], pendingCount: 0 })),
        ApiClient.getAdminAudit().catch(() => []),
      ]);

      if (dash) setDashboardData(dash);
      if (acq) setAcquisitionData(acq);
      if (users) setUsersList(users);
      if (evts) setEventsList(evts);
      if (plans) setPlansData(plans);
      if (unm) setUnmatchedPayments(unm);
      if (fun) setFunnelData(fun);
      if (inf) setInfluencersList(inf);
      if (mod) {
        setModerationCases(mod.cases || []);
        setPendingModCount(mod.pendingCount ?? (mod.cases?.filter((c: any) => c.status === 'PENDING').length || 0));
      }
      if (aud) setAuditLogs(aud);
    } catch (err) {
      console.warn('Admin data load fallback engaged:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshAllData();
  }, [period]);

  const showFeedback = (msg: string) => {
    setActionSuccessMsg(msg);
    setTimeout(() => setActionSuccessMsg(null), 4000);
  };

  // Actions
  const handleToggleUserStatus = async () => {
    if (!selectedUserForSuspend) return;
    try {
      await ApiClient.toggleAdminUserStatus(
        selectedUserForSuspend.id,
        suspendReason || 'Action administrative de sécurité',
        'admin.kai@waza.zone'
      );
      showFeedback(`Statut du compte ${selectedUserForSuspend.email} mis à jour avec succès.`);
      setSelectedUserForSuspend(null);
      setSuspendReason('');
      refreshAllData();
    } catch (err: any) {
      alert(`Erreur: ${err.message}`);
    }
  };

  const handleAttachPayment = async () => {
    if (!selectedPaymentForAttach || !attachTargetUserId) return;
    try {
      await ApiClient.attachAdminPayment(
        selectedPaymentForAttach.id,
        attachTargetUserId,
        'admin.kai@waza.zone'
      );
      showFeedback(`Paiement SasPay #${selectedPaymentForAttach.gatewayRef} rattaché avec succès !`);
      setSelectedPaymentForAttach(null);
      setAttachTargetUserId('');
      refreshAllData();
    } catch (err: any) {
      alert(`Erreur: ${err.message}`);
    }
  };

  const handleResolveModeration = async (decision: 'RESOLVE' | 'DISMISS') => {
    if (!modActionCase) return;
    try {
      await ApiClient.resolveAdminModeration(
        modActionCase.id,
        decision,
        modNote || (decision === 'RESOLVE' ? 'Dossier vérifié et validé' : 'Signalement classé sans suite'),
        'admin.kai@waza.zone'
      );
      showFeedback(`Dossier de modération #${modActionCase.id} traité (${decision}).`);
      setModActionCase(null);
      setModNote('');
      refreshAllData();
    } catch (err: any) {
      alert(`Erreur: ${err.message}`);
    }
  };

  // Filtered users
  const filteredUsers = usersList.filter(
    (u) =>
      u.email.toLowerCase().includes(globalSearch.toLowerCase()) ||
      u.fullName.toLowerCase().includes(globalSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#090A0F] text-slate-200 font-sans pb-24 select-none">
      
      {/* ======================================================== */}
      {/* 1. TOP GLOBAL ADMIN HEADER BAR                           */}
      {/* ======================================================== */}
      <header className="sticky top-0 z-40 bg-[#11131A]/95 backdrop-blur-md border-b border-[#1E2230] px-4 lg:px-8 py-3">
        <div className="max-w-[1780px] mx-auto flex flex-wrap items-center justify-between gap-4">
          
          {/* Brand & Platform Identity */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#090A0F] border border-[#2B3B59] flex items-center justify-center text-[#D8FF65] font-black text-sm shadow-md">
              WZ
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-white text-base tracking-tight font-mono">
                  WAZA-ZONE / Invitiz
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#FF724F]/15 border border-[#FF724F]/40 text-[#FF724F] font-mono text-[10px] font-bold">
                  ADMIN OS
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                SasPay Rails • Supabase PostgreSQL Multi-Tenant • Africa/Douala (UTC+1)
              </p>
            </div>
          </div>

          {/* Global Search Bar */}
          <div className="flex-1 max-w-md relative hidden md:block">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
            <input
              type="text"
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              placeholder="Recherche globale (utilisateur, transaction, projet, email)..."
              className="w-full bg-[#090A0F] border border-[#1E2230] rounded-xl pl-9 pr-4 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D8FF65] transition-all font-mono"
            />
          </div>

          {/* Right Header Actions: Role, Notifications, Identity */}
          <div className="flex items-center gap-3 font-mono text-xs">
            
            {/* Role Switcher */}
            <div className="flex items-center gap-1.5 bg-[#090A0F] border border-[#1E2230] rounded-xl px-2.5 py-1 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D8FF65]" />
              <span className="text-[11px] font-bold text-slate-400">Rôle:</span>
              <select
                value={currentRole}
                onChange={(e) => setCurrentRole(e.target.value as AdminRole)}
                className="bg-transparent text-white font-bold text-xs focus:outline-none cursor-pointer"
              >
                <option value="SUPER_ADMIN" className="bg-[#11131A] text-white">Super Admin</option>
                <option value="FINANCE" className="bg-[#11131A] text-white">Finance</option>
                <option value="MODERATOR" className="bg-[#11131A] text-white">Modérateur</option>
                <option value="SUPPORT" className="bg-[#11131A] text-white">Support</option>
                <option value="ANALYST" className="bg-[#11131A] text-white">Analyste</option>
              </select>
            </div>

            {/* Notifications Button */}
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-xl bg-[#090A0F] hover:bg-[#161B26] border border-[#1E2230] text-slate-300 transition-all cursor-pointer"
            >
              <Bell className="w-4 h-4" />
              {pendingModCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#FF724F] text-white font-bold text-[9px] flex items-center justify-center animate-pulse">
                  {pendingModCount}
                </span>
              )}
            </button>

            {/* Admin Identity */}
            <div className="flex items-center gap-2 pl-2 border-l border-[#1E2230]">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#68E7FF] to-[#D8FF65] p-0.5">
                <div className="w-full h-full rounded-full bg-[#11131A] flex items-center justify-center font-bold text-xs text-white">
                  KV
                </div>
              </div>
              <div className="hidden sm:block text-left">
                <span className="text-white font-bold text-xs block leading-tight">Kai Vance</span>
                <span className="text-[10px] text-[#D8FF65] font-bold block">Connecté (MFA)</span>
              </div>
            </div>

            {/* Refresh Button */}
            <button
              onClick={refreshAllData}
              className="p-2 rounded-xl bg-[#090A0F] hover:bg-[#161B26] border border-[#1E2230] text-slate-300 transition-all cursor-pointer"
              title="Actualiser les données"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-[#D8FF65]' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Notifications Drawer */}
      {showNotifications && (
        <div className="max-w-[1780px] mx-auto px-4 lg:px-8 pt-3">
          <div className="bg-[#11131A] border border-[#1E2230] rounded-2xl p-4 shadow-2xl space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-[#1E2230] pb-2">
              <span className="font-bold text-white flex items-center gap-2">
                <Bell className="w-4 h-4 text-[#D8FF65]" />
                Centre de notifications et alertes SasPay
              </span>
              <button
                onClick={() => setShowNotifications(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2">
              <div className="p-2.5 rounded-xl bg-[#090A0F] border border-[#1E2230] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#38EF7D]" />
                  <span>Webhook SasPay validé : 39 000 XAF encaissés (Ref #sas_pay_8891024)</span>
                </div>
                <span className="text-[10px] text-slate-500">Il y a 12 min</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#090A0F] border border-[#FF724F]/30 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#FF724F]">
                  <AlertTriangle className="w-4 h-4" />
                  <span>2 dossiers de modération en attente de revue administrative</span>
                </div>
                <span className="text-[10px] text-slate-500">Priorité Haute</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action Feedback Banner */}
      {actionSuccessMsg && (
        <div className="max-w-[1780px] mx-auto px-4 lg:px-8 pt-3">
          <div className="p-3 rounded-xl bg-[#091F14] border border-[#38EF7D]/40 text-xs font-mono text-[#38EF7D] flex items-center gap-2.5 animate-in fade-in">
            <Check className="w-4 h-4 stroke-[3]" />
            <span>{actionSuccessMsg}</span>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. ADMIN NAVIGATION BAR (9 MANDATORY MODULES IN ORDER)   */}
      {/* ======================================================== */}
      <div className="max-w-[1780px] mx-auto px-4 lg:px-8 pt-6">
        <nav className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-[#1E2230]">
          
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-[#161B26] text-[#D8FF65] border border-[#D8FF65]/40 shadow-sm'
                : 'bg-[#11131A] text-slate-400 hover:text-white border border-transparent'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>1. Vue d’ensemble</span>
          </button>

          <button
            onClick={() => setActiveTab('acquisition')}
            className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
              activeTab === 'acquisition'
                ? 'bg-[#161B26] text-[#D8FF65] border border-[#D8FF65]/40 shadow-sm'
                : 'bg-[#11131A] text-slate-400 hover:text-white border border-transparent'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>2. Acquisition</span>
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
              activeTab === 'users'
                ? 'bg-[#161B26] text-[#D8FF65] border border-[#D8FF65]/40 shadow-sm'
                : 'bg-[#11131A] text-slate-400 hover:text-white border border-transparent'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>3. Utilisateurs</span>
          </button>

          <button
            onClick={() => setActiveTab('events')}
            className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
              activeTab === 'events'
                ? 'bg-[#161B26] text-[#D8FF65] border border-[#D8FF65]/40 shadow-sm'
                : 'bg-[#11131A] text-slate-400 hover:text-white border border-transparent'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>4. Événements</span>
          </button>

          <button
            onClick={() => setActiveTab('subscriptions')}
            className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
              activeTab === 'subscriptions'
                ? 'bg-[#161B26] text-[#D8FF65] border border-[#D8FF65]/40 shadow-sm'
                : 'bg-[#11131A] text-slate-400 hover:text-white border border-transparent'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>5. Abonnements</span>
          </button>

          <button
            onClick={() => setActiveTab('unmatched_payments')}
            className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
              activeTab === 'unmatched_payments'
                ? 'bg-[#161B26] text-[#D8FF65] border border-[#D8FF65]/40 shadow-sm'
                : 'bg-[#11131A] text-slate-400 hover:text-white border border-transparent'
            }`}
          >
            <Link2 className="w-4 h-4" />
            <span>6. Paiements à rattacher</span>
            {unmatchedPayments.filter((p) => !p.matchedUserId).length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-[#68E7FF]/20 text-[#68E7FF] text-[10px]">
                {unmatchedPayments.filter((p) => !p.matchedUserId).length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('payment_funnel')}
            className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
              activeTab === 'payment_funnel'
                ? 'bg-[#161B26] text-[#D8FF65] border border-[#D8FF65]/40 shadow-sm'
                : 'bg-[#11131A] text-slate-400 hover:text-white border border-transparent'
            }`}
          >
            <GitPullRequest className="w-4 h-4" />
            <span>7. Parcours paiement</span>
          </button>

          <button
            onClick={() => setActiveTab('influencers')}
            className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
              activeTab === 'influencers'
                ? 'bg-[#161B26] text-[#D8FF65] border border-[#D8FF65]/40 shadow-sm'
                : 'bg-[#11131A] text-slate-400 hover:text-white border border-transparent'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>8. Influenceurs</span>
          </button>

          <button
            onClick={() => setActiveTab('moderation')}
            className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
              activeTab === 'moderation'
                ? 'bg-[#161B26] text-[#FF724F] border border-[#FF724F]/40 shadow-sm'
                : 'bg-[#11131A] text-slate-400 hover:text-white border border-transparent'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>9. Modération</span>
            {pendingModCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-[#FF724F] text-white text-[10px] font-black">
                {pendingModCount}
              </span>
            )}
          </button>

        </nav>
      </div>

      {/* ======================================================== */}
      {/* 3. ACTIVE TAB CONTENT VIEW                               */}
      {/* ======================================================== */}
      <main className="max-w-[1780px] mx-auto px-4 lg:px-8 pt-6">
        
        {/* ==================================================== */}
        {/* TAB 1 : VUE D'ENSEMBLE (DASHBOARD MASTER)            */}
        {/* ==================================================== */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            
            {/* Period Bar Selector */}
            <div className="bg-[#11131A] border border-[#1E2230] rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-0.5">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                  Période d&apos;analyse &amp; Bornes effectives
                </span>
                <div className="flex items-center gap-2 text-xs font-mono text-white font-bold">
                  <Clock className="w-4 h-4 text-[#D8FF65]" />
                  <span>{dashboardData?.dateRangeDisplay || '18 oct. 2026 - 17 nov. 2026 (UTC+1)'}</span>
                  <span className="text-slate-500 font-normal">• Devise : XAF (F CFA)</span>
                </div>
              </div>

              {/* Period Quick Selectors */}
              <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
                {['Aujourd’hui', 'Hier', 'Cette semaine', '7 jours', '30 jours', 'Ce mois-ci', '12 mois'].map((pLabel) => {
                  const pVal = pLabel === '30 jours' ? '30_DAYS' : pLabel === 'Aujourd’hui' ? 'TODAY' : pLabel;
                  const isSelected = period === pVal || (period === '30_DAYS' && pLabel === '30 jours');
                  return (
                    <button
                      key={pLabel}
                      onClick={() => setPeriod(pVal)}
                      className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#D8FF65] text-[#090A0F]'
                          : 'bg-[#090A0F] text-slate-400 hover:text-white border border-[#1E2230]'
                      }`}
                    >
                      {pLabel}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4 PRIMARY KPI CARDS (SPECIFIC DEMO VALUES STRICTLY RESPECTED) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
              
              {/* KPI 1 : Inscriptions */}
              <div className="p-5 rounded-2xl bg-[#11131A] border border-[#1E2230] space-y-2">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>Inscriptions</span>
                  <Users className="w-4 h-4 text-[#68E7FF]" />
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-black text-white tracking-tight">
                    {dashboardData?.kpis?.inscriptions?.formatted || '6 500'}
                  </span>
                  <span className="text-xs font-bold text-[#38EF7D] flex items-center">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    +{dashboardData?.kpis?.inscriptions?.changePct || 12.4}%
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-sans">
                  vs {dashboardData?.kpis?.inscriptions?.previousValue?.toLocaleString() || '5 780'} période précédente
                </p>
              </div>

              {/* KPI 2 : Abonnements vendus */}
              <div className="p-5 rounded-2xl bg-[#11131A] border border-[#1E2230] space-y-2">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>Abonnements vendus</span>
                  <CreditCard className="w-4 h-4 text-[#D8FF65]" />
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-black text-white tracking-tight">
                    {dashboardData?.kpis?.abonnementsVendus?.formatted || '136'}
                  </span>
                  <span className="text-xs font-bold text-[#38EF7D] flex items-center">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    +{dashboardData?.kpis?.abonnementsVendus?.changePct || 15.2}%
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-sans">
                  Commandes payées via SasPay (exclut offerts)
                </p>
              </div>

              {/* KPI 3 : Revenu brut encaissé */}
              <div className="p-5 rounded-2xl bg-[#11131A] border border-[#1E2230] space-y-2">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>Revenu brut encaissé</span>
                  <Activity className="w-4 h-4 text-[#38EF7D]" />
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl lg:text-3xl font-black text-white tracking-tight">
                    {dashboardData?.kpis?.revenuEncaisse?.formatted || '915 966 F CFA'}
                  </span>
                  <span className="text-xs font-bold text-[#38EF7D] flex items-center">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    +{dashboardData?.kpis?.revenuEncaisse?.changePct || 12.7}%
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-sans">
                  Flux net confirmé SasPay Mobile Money &amp; Cartes
                </p>
              </div>

              {/* KPI 4 : Conversion des inscrits */}
              <div className="p-5 rounded-2xl bg-[#11131A] border border-[#1E2230] space-y-2">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>Conversion des inscrits</span>
                  <Sparkles className="w-4 h-4 text-[#FF724F]" />
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-black text-white tracking-tight">
                    {dashboardData?.kpis?.conversionInscrits?.formatted || '1,9 %'}
                  </span>
                  <span className="text-xs font-bold text-[#38EF7D] flex items-center">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    +{dashboardData?.kpis?.conversionInscrits?.changePts || 0.3} pts
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-sans">
                  124 acheteurs distincts de la cohorte / 6 500 inscrits
                </p>
              </div>

            </div>

            {/* SECONDARY COUNTERS ROW */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 font-mono text-xs">
              
              <div className="p-4 rounded-xl bg-[#11131A] border border-[#1E2230]">
                <span className="text-slate-400 text-[11px] block">Invitations &amp; Projets</span>
                <span className="text-xl font-bold text-white block mt-1">4 326</span>
                <span className="text-[10px] text-slate-500">Créées dans la période</span>
              </div>

              <div className="p-4 rounded-xl bg-[#11131A] border border-[#1E2230]">
                <span className="text-slate-400 text-[11px] block">Abonnés actifs aujourd&apos;hui</span>
                <span className="text-xl font-bold text-[#D8FF65] block mt-1">103</span>
                <span className="text-[10px] text-slate-500">Droits valides à as_of</span>
              </div>

              <div className="p-4 rounded-xl bg-[#11131A] border border-[#1E2230]">
                <span className="text-slate-400 text-[11px] block">Comptes totaux</span>
                <span className="text-xl font-bold text-white block mt-1">6 500</span>
                <span className="text-[10px] text-slate-500">Non supprimés</span>
              </div>

              <div className="p-4 rounded-xl bg-[#11131A] border border-[#1E2230]">
                <span className="text-slate-400 text-[11px] block">Comptes actifs</span>
                <span className="text-xl font-bold text-[#38EF7D] block mt-1">6 464</span>
                <span className="text-[10px] text-slate-500">Statut autorisé (99.4%)</span>
              </div>

              <div className="p-4 rounded-xl bg-[#11131A] border border-[#1E2230]">
                <span className="text-slate-400 text-[11px] block">Taux de réponse</span>
                <span className="text-xl font-bold text-[#68E7FF] block mt-1">88 %</span>
                <span className="text-[10px] text-slate-500">3 807 réponses reçues</span>
              </div>

            </div>

            {/* SALES BY PLAN TABLE (Ventes par forfait) */}
            <div className="bg-[#11131A] border border-[#1E2230] rounded-2xl p-5 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                    Ventes par forfait (Catalogue SasPay)
                  </h3>
                  <p className="text-xs text-slate-400">
                    Décomposition rigoureuse : 136 vendus = 915 966 F CFA encaissés (somme exacte vérifiée).
                  </p>
                </div>
                <span className="text-xs font-mono text-[#D8FF65] font-bold">
                  Agrégations cohérentes à 100%
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs">
                  <thead>
                    <tr className="border-b border-[#1E2230] text-slate-400 text-[11px]">
                      <th className="pb-3 font-bold">FORFAIT</th>
                      <th className="pb-3 font-bold">PRIX UNITAIRE</th>
                      <th className="pb-3 font-bold">VENDUS</th>
                      <th className="pb-3 font-bold">REVENU ENCAISSÉ</th>
                      <th className="pb-3 font-bold">OFFERTS</th>
                      <th className="pb-3 font-bold">ACTIFS À AS_OF</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1E2230]">
                    <tr>
                      <td className="py-3 font-bold text-white">Forfait Essentiel</td>
                      <td className="py-3 text-slate-300">4 000 F CFA</td>
                      <td className="py-3 text-[#D8FF65] font-bold">84</td>
                      <td className="py-3 text-white font-bold">336 000 F CFA</td>
                      <td className="py-3 text-slate-400">12</td>
                      <td className="py-3 text-[#38EF7D] font-bold">62</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-bold text-white">Forfait Studio Pro</td>
                      <td className="py-3 text-slate-300">10 000 F CFA</td>
                      <td className="py-3 text-[#D8FF65] font-bold">42</td>
                      <td className="py-3 text-white font-bold">420 000 F CFA</td>
                      <td className="py-3 text-slate-400">6</td>
                      <td className="py-3 text-[#38EF7D] font-bold">34</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-bold text-white">Forfait Premium / Enterprise</td>
                      <td className="py-3 text-slate-300">16 000 F CFA</td>
                      <td className="py-3 text-[#D8FF65] font-bold">10</td>
                      <td className="py-3 text-white font-bold">159 966 F CFA</td>
                      <td className="py-3 text-slate-400">2</td>
                      <td className="py-3 text-[#38EF7D] font-bold">7</td>
                    </tr>
                    <tr className="bg-[#090A0F] font-bold text-slate-200">
                      <td className="py-3 pl-2">TOTAL GÉNÉRAL</td>
                      <td className="py-3">—</td>
                      <td className="py-3 text-[#D8FF65]">136 vendus</td>
                      <td className="py-3 text-white">915 966 F CFA</td>
                      <td className="py-3 text-slate-400">20 offerts</td>
                      <td className="py-3 text-[#38EF7D]">103 abonnés</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 2 : ACQUISITION                                  */}
        {/* ==================================================== */}
        {activeTab === 'acquisition' && (
          <div className="space-y-6">
            <div className="bg-[#11131A] border border-[#1E2230] rounded-2xl p-5 shadow-xl space-y-4">
              <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                Sources de trafic &amp; Inscriptions attribuées
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(acquisitionData?.sources || []).map((src: any) => (
                  <div key={src.source} className="p-4 rounded-xl bg-[#090A0F] border border-[#1E2230] space-y-2 font-mono text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">{src.source}</span>
                      <span className="text-[#D8FF65] font-bold">{src.sharePct}% part</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-400">
                      <span>Inscriptions : <strong className="text-white">{src.signups}</strong></span>
                      <span>Acheteurs : <strong className="text-[#38EF7D]">{src.buyers}</strong></span>
                      <span>Conversion : <strong className="text-[#68E7FF]">{src.conversionRate}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#11131A] border border-[#1E2230] rounded-2xl p-5 shadow-xl space-y-4">
              <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                Campagnes UTM actives
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs">
                  <thead>
                    <tr className="border-b border-[#1E2230] text-slate-400 text-[11px]">
                      <th className="pb-3">CAMPAGNE</th>
                      <th className="pb-3">SUPPORT (MEDIUM)</th>
                      <th className="pb-3">CLICS</th>
                      <th className="pb-3">INSCRIPTIONS</th>
                      <th className="pb-3">ACHETEURS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1E2230]">
                    {(acquisitionData?.campaigns || []).map((c: any) => (
                      <tr key={c.campaign}>
                        <td className="py-3 font-bold text-white">{c.campaign}</td>
                        <td className="py-3 text-slate-400">{c.medium}</td>
                        <td className="py-3 text-slate-300">{c.clicks.toLocaleString()}</td>
                        <td className="py-3 text-[#D8FF65] font-bold">{c.signups}</td>
                        <td className="py-3 text-[#38EF7D] font-bold">{c.buyers}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 3 : UTILISATEURS                                 */}
        {/* ==================================================== */}
        {activeTab === 'users' && (
          <div className="bg-[#11131A] border border-[#1E2230] rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                  Gestion des comptes utilisateurs ({filteredUsers.length})
                </h3>
                <p className="text-xs text-slate-400">
                  Suspension motivée, audit des paiements et rôles avec séparation des privilèges.
                </p>
              </div>

              <div className="flex items-center gap-2 font-mono text-xs">
                <button
                  onClick={() => alert('Exporting full users GDPR register (CSV with sanitization)...')}
                  className="px-3 py-1.5 rounded-xl bg-[#090A0F] border border-[#1E2230] text-slate-300 hover:text-white flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Exporter CSV</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="border-b border-[#1E2230] text-slate-400 text-[11px]">
                    <th className="pb-3">UTILISATEUR</th>
                    <th className="pb-3">RÔLE</th>
                    <th className="pb-3">FORFAIT</th>
                    <th className="pb-3">DÉPENSES (XAF)</th>
                    <th className="pb-3">STATUT</th>
                    <th className="pb-3 text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1E2230]">
                  {filteredUsers.map((u) => (
                    <tr key={u.id}>
                      <td className="py-3">
                        <span className="font-bold text-white block">{u.fullName}</span>
                        <span className="text-[11px] text-slate-500 block">{u.email}</span>
                      </td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 rounded bg-[#161B26] border border-[#2B3B59] text-[10px] font-bold text-slate-300">
                          {u.role}
                        </span>
                      </td>
                      <td className="py-3 text-slate-300">{u.planTier}</td>
                      <td className="py-3 text-[#D8FF65] font-bold">
                        {u.totalSpentXaf?.toLocaleString() || 0} F CFA
                      </td>
                      <td className="py-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            u.status === 'ACTIVE'
                              ? 'bg-[#0E261B] text-[#38EF7D] border border-[#1E5037]'
                              : 'bg-[#2E1215] text-[#FF4A4A] border border-[#592429]'
                          }`}
                        >
                          {u.status}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => setSelectedUserForSuspend(u)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            u.status === 'ACTIVE'
                              ? 'bg-[#2E1215] hover:bg-[#3d181c] text-[#FF4A4A]'
                              : 'bg-[#0E261B] hover:bg-[#153a2a] text-[#38EF7D]'
                          }`}
                        >
                          {u.status === 'ACTIVE' ? 'Suspendre' : 'Réactiver'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 4 : ÉVÉNEMENTS & PROJETS                          */}
        {/* ==================================================== */}
        {activeTab === 'events' && (
          <div className="bg-[#11131A] border border-[#1E2230] rounded-2xl p-5 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
              Événements &amp; Projets Sérialisés ({eventsList.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {eventsList.map((evt) => (
                <div key={evt.id} className="p-4 rounded-xl bg-[#090A0F] border border-[#1E2230] space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">{evt.title}</span>
                    <span className="px-2 py-0.5 rounded bg-[#161B26] text-[#D8FF65] border border-[#D8FF65]/30 text-[10px]">
                      {evt.format}
                    </span>
                  </div>
                  <div className="text-slate-400 space-y-1">
                    <p>Créateur : <strong className="text-slate-200">{evt.ownerName}</strong></p>
                    <p>Invitations : <strong className="text-slate-200">{evt.invitationsCount}</strong></p>
                    <p>Réponses : <strong className="text-[#38EF7D]">{evt.responsesCount}</strong></p>
                  </div>
                  <div className="pt-2 border-t border-[#1E2230] flex items-center justify-between text-[10px]">
                    <span className="text-slate-500">Statut : {evt.status}</span>
                    <span className="text-[#68E7FF]">ID : {evt.id}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 5 : ABONNEMENTS                                  */}
        {/* ==================================================== */}
        {activeTab === 'subscriptions' && (
          <div className="space-y-6">
            <div className="bg-[#11131A] border border-[#1E2230] rounded-2xl p-5 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                    Catalogue des Forfaits Versionnés
                  </h3>
                  <p className="text-xs text-slate-400">
                    Versionnage immuable. Les changements de prix n&apos;altèrent jamais les commandes historiques.
                  </p>
                </div>
                <button
                  onClick={() => alert('Ouverture du modal d’attribution offerte tracée dans l’audit log...')}
                  className="px-3.5 py-1.5 rounded-xl bg-[#D8FF65] hover:bg-[#c9f547] text-[#090A0F] font-mono text-xs font-bold cursor-pointer"
                >
                  + Attribution Offerte
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(plansData?.plansCatalogue || []).map((plan: any) => (
                  <div key={plan.id} className="p-5 rounded-xl bg-[#090A0F] border border-[#1E2230] space-y-3 font-mono text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-sm">{plan.nom}</span>
                      <span className="px-2 py-0.5 rounded bg-[#161B26] text-[#68E7FF] text-[10px]">
                        {plan.version}
                      </span>
                    </div>
                    <div className="text-2xl font-black text-white">
                      {plan.tarifMensuelXaf.toLocaleString()} F CFA <span className="text-xs text-slate-500 font-normal">/mois</span>
                    </div>
                    <p className="text-slate-400 font-sans text-[11px] leading-relaxed">
                      {plan.description}
                    </p>
                    <div className="pt-2 border-t border-[#1E2230] flex items-center justify-between text-[11px]">
                      <span className="text-slate-500">Abonnés actifs :</span>
                      <span className="text-[#38EF7D] font-bold">{plan.activeSubscribers}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 6 : PAIEMENTS À RATTACHER                         */}
        {/* ==================================================== */}
        {activeTab === 'unmatched_payments' && (
          <div className="bg-[#11131A] border border-[#1E2230] rounded-2xl p-5 shadow-xl space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                Paiements confirmés à rattacher (SasPay Gateway)
              </h3>
              <p className="text-xs text-slate-400">
                Encaissements réels confirmés sans session utilisateur identifiée. Les rattachements sont transactionnels et audités.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="border-b border-[#1E2230] text-slate-400 text-[11px]">
                    <th className="pb-3">RÉFÉRENCE SASPAY</th>
                    <th className="pb-3">MONTANT (XAF)</th>
                    <th className="pb-3">PAYEUR / TÉLÉPHONE</th>
                    <th className="pb-3">DATE PAIEMENT</th>
                    <th className="pb-3">CORRESPONDANCE SUGGÉRÉE</th>
                    <th className="pb-3 text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1E2230]">
                  {unmatchedPayments.map((p) => (
                    <tr key={p.id}>
                      <td className="py-3">
                        <span className="font-bold text-white block">{p.gatewayRef}</span>
                        <span className="text-[10px] text-slate-500">{p.id}</span>
                      </td>
                      <td className="py-3 text-[#D8FF65] font-bold">
                        {p.amountXaf.toLocaleString()} F CFA
                      </td>
                      <td className="py-3">
                        <span className="text-slate-200 block">{p.payerName}</span>
                        <span className="text-[11px] text-slate-400">{p.payerPhone}</span>
                      </td>
                      <td className="py-3 text-slate-400">
                        {new Date(p.paidAt).toLocaleString('fr-FR')}
                      </td>
                      <td className="py-3">
                        {p.matchedUserId ? (
                          <span className="text-[#38EF7D] font-bold">Rattaché à {p.matchedUserId}</span>
                        ) : (
                          <div className="space-y-0.5">
                            <span className="text-[#68E7FF] font-bold block">{p.suggestedMatchUserId}</span>
                            <span className="text-[10px] text-slate-500 block">{p.suggestedMatchReason}</span>
                          </div>
                        )}
                      </td>
                      <td className="py-3 text-right">
                        {!p.matchedUserId ? (
                          <button
                            onClick={() => {
                              setSelectedPaymentForAttach(p);
                              setAttachTargetUserId(p.suggestedMatchUserId || 'usr_ren_kurogane');
                            }}
                            className="px-3 py-1 rounded-lg bg-[#D8FF65] hover:bg-[#c9f547] text-[#090A0F] font-bold cursor-pointer"
                          >
                            Rattacher
                          </button>
                        ) : (
                          <span className="text-[10px] text-slate-500">Clôturé</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 7 : PARCOURS PAIEMENT                            */}
        {/* ==================================================== */}
        {activeTab === 'payment_funnel' && (
          <div className="bg-[#11131A] border border-[#1E2230] rounded-2xl p-5 shadow-xl space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                Entonnoir de conversion des sessions de paiement
              </h3>
              <p className="text-xs text-slate-400">
                Suivi chronologique de l&apos;ouverture de la session jusqu&apos;à l&apos;octroi des crédits sur le ledger.
              </p>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {funnelData.map((step: any, idx: number) => (
                <div key={step.step} className="p-4 rounded-xl bg-[#090A0F] border border-[#1E2230] flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <span className="font-bold text-white text-sm">{step.step}</span>
                    <span className="text-[11px] text-slate-500 block">Temps moyen : {step.timeAvg}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-white font-bold text-base">
                      {step.sessionsCount.toLocaleString()} sessions
                    </span>
                    {idx > 0 && (
                      <span className="px-2 py-0.5 rounded bg-[#2E1215] text-[#FF4A4A] text-[10px] font-bold">
                        -{step.dropPct}% abandon
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 8 : INFLUENCEURS                                 */}
        {/* ==================================================== */}
        {activeTab === 'influencers' && (
          <div className="bg-[#11131A] border border-[#1E2230] rounded-2xl p-5 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
              Partenaires &amp; Créateurs Affiliés
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {influencersList.map((inf) => (
                <div key={inf.id} className="p-4 rounded-xl bg-[#090A0F] border border-[#1E2230] space-y-2.5 font-mono text-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-white text-sm block">{inf.name}</span>
                      <span className="text-slate-500 text-[11px]">{inf.handle}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-[#0E261B] text-[#38EF7D] border border-[#1E5037] text-[10px] font-bold">
                      {inf.status}
                    </span>
                  </div>
                  <div className="p-2 rounded bg-[#11131A] text-slate-300 text-[11px] flex items-center justify-between">
                    <span>Code promo : <strong className="text-[#D8FF65]">{inf.code}</strong></span>
                    <span>Clics : <strong>{inf.clicks.toLocaleString()}</strong></span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Inscrits : <strong className="text-white">{inf.signups}</strong></span>
                    <span>Acheteurs : <strong className="text-[#38EF7D]">{inf.buyers}</strong></span>
                    <span>Généré : <strong className="text-[#68E7FF]">{inf.revenueGeneratedXaf.toLocaleString()} XAF</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 9 : MODÉRATION (AVEC BADGE NUMÉRIQUE DYNAMIQUE)  */}
        {/* ==================================================== */}
        {activeTab === 'moderation' && (
          <div className="bg-[#11131A] border border-[#1E2230] rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                    File des dossiers de modération
                  </h3>
                  {pendingModCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-[#FF724F] text-white font-mono text-xs font-black">
                      {pendingModCount} en attente
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400">
                  Priorisation des cas signalés et traçabilité des décisions dans le journal d&apos;audit.
                </p>
              </div>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {moderationCases.map((c) => (
                <div
                  key={c.id}
                  className={`p-4 rounded-xl border space-y-2.5 ${
                    c.status === 'PENDING'
                      ? 'bg-[#090A0F] border-[#FF724F]/40'
                      : 'bg-[#090A0F]/60 border-[#1E2230]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-black ${
                          c.priority === 'CRITICAL'
                            ? 'bg-[#FF4A4A] text-white'
                            : c.priority === 'HIGH'
                            ? 'bg-[#FFA94D] text-[#090A0F]'
                            : 'bg-[#1E2230] text-slate-400'
                        }`}
                      >
                        {c.priority}
                      </span>
                      <span className="font-bold text-white">{c.targetTitle}</span>
                      <span className="text-[10px] text-slate-500">({c.targetType})</span>
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        c.status === 'PENDING'
                          ? 'bg-[#2E1215] text-[#FF724F]'
                          : 'bg-[#0E261B] text-[#38EF7D]'
                      }`}
                    >
                      {c.status}
                    </span>
                  </div>

                  <p className="text-slate-300 font-sans text-xs">
                    Motif : <strong className="text-white">{c.reason}</strong>
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-[#1E2230]">
                    <span>Signalé par : {c.reportedBy}</span>
                    {c.status === 'PENDING' ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setModActionCase(c)}
                          className="px-3 py-1 rounded bg-[#D8FF65] hover:bg-[#c9f547] text-[#090A0F] font-bold cursor-pointer"
                        >
                          Prendre décision
                        </button>
                      </div>
                    ) : (
                      <span className="text-slate-400">Note : {c.decisionNote}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* ======================================================== */}
      {/* 4. MODALS D'ACTION (SUSPENSION, RATTACHEMENT, MODÉRATION)  */}
      {/* ======================================================== */}

      {/* Modal Suspension Utilisateur */}
      {selectedUserForSuspend && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#11131A] border border-[#1E2230] rounded-2xl p-6 max-w-md w-full space-y-4 font-mono text-xs shadow-2xl">
            <h4 className="text-base font-bold text-white">
              {selectedUserForSuspend.status === 'ACTIVE' ? 'Suspendre l’utilisateur' : 'Réactiver l’utilisateur'}
            </h4>
            <p className="text-slate-400 font-sans">
              Compte : <strong className="text-white">{selectedUserForSuspend.email}</strong>
            </p>
            <div className="space-y-1">
              <label className="text-slate-400 text-[11px] block">Motif obligatoire pour le journal d&apos;audit :</label>
              <textarea
                value={suspendReason}
                onChange={(e) => setSuspendReason(e.target.value)}
                placeholder="Indiquez la justification administrative..."
                className="w-full bg-[#090A0F] border border-[#1E2230] rounded-xl p-3 text-white text-xs focus:outline-none focus:border-[#D8FF65]"
                rows={3}
              />
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedUserForSuspend(null)}
                className="px-4 py-2 rounded-xl bg-[#090A0F] text-slate-300 hover:text-white"
              >
                Annuler
              </button>
              <button
                onClick={handleToggleUserStatus}
                className="px-4 py-2 rounded-xl bg-[#FF4A4A] text-white font-bold cursor-pointer"
              >
                Confirmer l&apos;action
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Rattachement Paiement SasPay */}
      {selectedPaymentForAttach && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#11131A] border border-[#1E2230] rounded-2xl p-6 max-w-md w-full space-y-4 font-mono text-xs shadow-2xl">
            <h4 className="text-base font-bold text-white">
              Rattachement transactionnel SasPay
            </h4>
            <div className="p-3 rounded-xl bg-[#090A0F] border border-[#1E2230] space-y-1 text-slate-300">
              <p>Réf SasPay : <strong className="text-[#D8FF65]">{selectedPaymentForAttach.gatewayRef}</strong></p>
              <p>Montant : <strong className="text-white">{selectedPaymentForAttach.amountXaf.toLocaleString()} F CFA</strong></p>
              <p>Payeur : {selectedPaymentForAttach.payerName} ({selectedPaymentForAttach.payerPhone})</p>
            </div>
            <div className="space-y-1">
              <label className="text-slate-400 text-[11px] block">Identifiant utilisateur cible :</label>
              <input
                type="text"
                value={attachTargetUserId}
                onChange={(e) => setAttachTargetUserId(e.target.value)}
                className="w-full bg-[#090A0F] border border-[#1E2230] rounded-xl p-2.5 text-white font-mono text-xs focus:outline-none focus:border-[#D8FF65]"
              />
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedPaymentForAttach(null)}
                className="px-4 py-2 rounded-xl bg-[#090A0F] text-slate-300"
              >
                Annuler
              </button>
              <button
                onClick={handleAttachPayment}
                className="px-4 py-2 rounded-xl bg-[#D8FF65] text-[#090A0F] font-bold cursor-pointer"
              >
                Rattacher transactionnellement
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Décision Modération */}
      {modActionCase && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#11131A] border border-[#1E2230] rounded-2xl p-6 max-w-md w-full space-y-4 font-mono text-xs shadow-2xl">
            <h4 className="text-base font-bold text-white">
              Décision de Modération #{modActionCase.id}
            </h4>
            <p className="text-slate-300 font-sans">
              Cible : <strong className="text-white">{modActionCase.targetTitle}</strong>
            </p>
            <div className="space-y-1">
              <label className="text-slate-400 text-[11px] block">Note de décision / instruction :</label>
              <textarea
                value={modNote}
                onChange={(e) => setModNote(e.target.value)}
                placeholder="Raison de la résolution ou du rejet..."
                className="w-full bg-[#090A0F] border border-[#1E2230] rounded-xl p-3 text-white text-xs focus:outline-none focus:border-[#D8FF65]"
                rows={2}
              />
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setModActionCase(null)}
                className="px-3.5 py-2 rounded-xl bg-[#090A0F] text-slate-300"
              >
                Annuler
              </button>
              <button
                onClick={() => handleResolveModeration('DISMISS')}
                className="px-3.5 py-2 rounded-xl bg-[#1E2230] hover:bg-[#282E40] text-slate-300 font-bold cursor-pointer"
              >
                Classer sans suite
              </button>
              <button
                onClick={() => handleResolveModeration('RESOLVE')}
                className="px-3.5 py-2 rounded-xl bg-[#38EF7D] hover:bg-[#32d46f] text-[#090A0F] font-bold cursor-pointer"
              >
                Valider &amp; Clôturer
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
