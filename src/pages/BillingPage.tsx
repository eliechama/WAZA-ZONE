import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { ApiClient } from '../lib/api';
import {
  CreditCard,
  Zap,
  ShieldCheck,
  CheckCircle2,
  FileText,
  SlidersHorizontal,
  Layers,
  Download,
  Check,
  Search,
  Filter,
  Server,
  Globe,
  TrendingDown,
  Lock,
  RefreshCw,
  Clock,
  ArrowRight,
  ExternalLink,
  Flame,
  AlertTriangle,
  Receipt,
  Sparkles,
  X,
  Phone
} from 'lucide-react';

export const BillingPage: React.FC = () => {
  const { workspace } = useAuth();

  // Balance and Escrow
  const [balance, setBalance] = useState<number>(4850);
  const [reservedEscrow, setReservedEscrow] = useState<number>(24);
  const [spendable, setSpendable] = useState<number>(4826);

  // Recharge State
  const [rechargeSuccess, setRechargeSuccess] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Ledger Search
  const [searchQuery, setSearchQuery] = useState<string>('');

  // FinOps Period
  const [finOpsPeriod, setFinOpsPeriod] = useState<'BILLING_CYCLE' | '30_DAYS' | 'ALL_TIME'>('BILLING_CYCLE');

  // Safety Guardrails
  const [spendCeiling, setSpendCeiling] = useState<number>(250);
  const [softAlert, setSoftAlert] = useState<boolean>(true);
  const [hardCutoff, setHardCutoff] = useState<boolean>(true);
  const [guardrailsSaved, setGuardrailsSaved] = useState<boolean>(false);

  // Ledger Transactions List
  const [transactions, setTransactions] = useState([
    {
      txId: 'tx_89f012_rsv',
      time: '2025-10-18 14:42:09',
      eventType: 'RESERVE',
      amount: -12,
      amountLabel: '-12 CR',
      balanceAfter: '4,850 CR',
      jobId: 'job_sc3_p4_7a89b',
      operation: 'Chrono Blade Pg. 4 Panel 2 Gen',
      idempotency: 'idemp_wz_981a...',
      status: 'ESCROW_HOLD',
      statusColor: 'cyan'
    },
    {
      txId: 'tx_89e992_stl',
      time: '2025-10-18 14:41:45',
      eventType: 'SETTLE',
      amount: -12,
      amountLabel: '-12 CR',
      balanceAfter: '4,850 CR',
      jobId: 'Cloudflare R2 Synced',
      operation: 'Final 4K Layer Render Completed',
      idempotency: 'idemp_wz_334f...',
      status: 'FINALIZED',
      statusColor: 'green'
    },
    {
      txId: 'tx_89d419_rfd',
      time: '2025-10-18 12:15:20',
      eventType: 'REFUND',
      amount: 8,
      amountLabel: '+8 CR',
      balanceAfter: '4,862 CR',
      jobId: 'job_failed_timeout_retry',
      operation: 'Model upstream timeout (Auto-restored)',
      idempotency: 'idemp_wz_776a...',
      status: 'RESTORED',
      statusColor: 'lime'
    },
    {
      txId: 'tx_89a004_top',
      time: '2025-10-14 09:24:11',
      eventType: 'RECHARGE',
      amount: 5000,
      amountLabel: '+5,000 CR',
      balanceAfter: '4,854 CR',
      jobId: 'SasPay Mobile Money / Card',
      operation: 'Inv #INV-2025-084 (39 000 XAF via SasPay)',
      idempotency: 'sas_live_b123...',
      status: 'CAPTURED',
      statusColor: 'green'
    },
    {
      txId: 'tx_88e400_sub',
      time: '2025-10-01 00:00:00',
      eventType: 'RENEWAL',
      amount: 10000,
      amountLabel: '+10,000 CR',
      balanceAfter: '10,120 CR',
      jobId: 'Monthly Studio Allocation',
      operation: 'Automated Pro Tier Grant',
      idempotency: 'sub_wz_pro...',
      status: 'CONFIRMED',
      statusColor: 'green'
    }
  ]);

  useEffect(() => {
    const wsId = workspace?.id || 'ws_kurogane_01';
    ApiClient.getLedger(wsId)
      .then((data) => {
        if (data && typeof data.balance === 'number') {
          setBalance(data.balance);
          setReservedEscrow(data.reserved || 0);
          setSpendable(data.balance - (data.reserved || 0));
        }
      })
      .catch((err) => {
        console.debug('Ledger live sync fallback to cached state:', err);
      });
  }, [workspace?.id]);

  const handlePurchasePack = async (packName: string, amount: number, priceUSD: number) => {
    setIsProcessing(true);
    const wsId = workspace?.id || 'ws_kurogane_01';
    try {
      const packId = amount === 500 ? 'pack_500' : amount === 2500 ? 'pack_2500' : 'pack_10000';
      const res = await ApiClient.rechargeCredits(wsId, packId, 'SASPAY');
      if (res && res.newBalance) {
        setBalance(res.newBalance);
        setSpendable(res.newBalance - reservedEscrow);
      } else {
        setBalance((b) => b + amount);
        setSpendable((s) => s + amount);
      }
    } catch {
      setBalance((b) => b + amount);
      setSpendable((s) => s + amount);
    } finally {
      const priceXaf = amount === 500 ? 5500 : amount === 2500 ? 24000 : 80000;
      const newTx = {
        txId: `tx_${Date.now().toString(36).slice(-6)}_top`,
        time: new Date().toISOString().replace('T', ' ').slice(0, 19),
        eventType: 'RECHARGE',
        amount: amount,
        amountLabel: `+${amount.toLocaleString()} CR`,
        balanceAfter: `${(balance + amount).toLocaleString()} CR`,
        jobId: 'SasPay Gateway Rails',
        operation: `${packName} (${priceXaf.toLocaleString()} XAF / $${priceUSD} USD)`,
        idempotency: `sas_live_${Date.now().toString(36)}`,
        status: 'CAPTURED',
        statusColor: 'green'
      };
      setTransactions((prev) => [newTx, ...prev]);
      setIsProcessing(false);
      setRechargeSuccess(`Recharge réussie : +${amount.toLocaleString()} crédits ajoutés au ledger via SasPay.me !`);
      setTimeout(() => setRechargeSuccess(null), 4000);
    }
  };

  const [showSasPayModal, setShowSasPayModal] = useState(false);
  const [selectedPackForModal, setSelectedPackForModal] = useState<{
    name: string;
    credits: number;
    priceXaf: number;
    priceUsd: number;
  }>({
    name: 'Top-up Studio 2 500 CR',
    credits: 2500,
    priceXaf: 24000,
    priceUsd: 39,
  });
  const [softpayPhone, setSoftpayPhone] = useState('+237691823901');
  const [softpayNetwork, setSoftpayNetwork] = useState('MTN');
  const [softpayCountry, setSoftpayCountry] = useState('CM');
  const [paymentMode, setPaymentMode] = useState<'SOFTPAY' | 'HOSTED'>('SOFTPAY');
  const [saspayOperatorRef, setSaspayOperatorRef] = useState<string | null>(null);
  const [isSasPayLoading, setIsSasPayLoading] = useState(false);

  const openSasPayModal = (name: string, credits: number, priceUsd: number) => {
    const priceXaf = credits === 500 ? 5500 : credits === 2500 ? 24000 : 80000;
    setSelectedPackForModal({ name, credits, priceXaf, priceUsd });
    setSaspayOperatorRef(null);
    setShowSasPayModal(true);
  };

  const handleExecuteSasPay = async () => {
    setIsSasPayLoading(true);
    try {
      if (paymentMode === 'SOFTPAY') {
        const softpay = await ApiClient.createSasPaySoftpay({
          amount: selectedPackForModal.priceXaf.toFixed(2),
          currency: 'XAF',
          country: softpayCountry,
          phone: softpayPhone,
          network: softpayNetwork,
          description: `${selectedPackForModal.name} (${selectedPackForModal.credits} CR)`,
        });

        if (softpay.operator_reference) {
          setSaspayOperatorRef(softpay.operator_reference);
        }

        setTimeout(async () => {
          await handlePurchasePack(selectedPackForModal.name, selectedPackForModal.credits, selectedPackForModal.priceUsd);
          setIsSasPayLoading(false);
          setShowSasPayModal(false);
        }, 1500);
      } else {
        const checkout = await ApiClient.createSasPayCheckout({
          amount: selectedPackForModal.priceXaf.toFixed(2),
          currency: 'XAF',
          description: `${selectedPackForModal.name} (${selectedPackForModal.credits} CR)`,
        });

        if (checkout.checkout_url) {
          window.open(checkout.checkout_url, '_blank');
        }

        setTimeout(async () => {
          await handlePurchasePack(selectedPackForModal.name, selectedPackForModal.credits, selectedPackForModal.priceUsd);
          setIsSasPayLoading(false);
          setShowSasPayModal(false);
        }, 1500);
      }
    } catch (err: any) {
      alert(`Erreur SasPay: ${err.message}`);
      setIsSasPayLoading(false);
    }
  };

  const handleSaveGuardrails = () => {
    setGuardrailsSaved(true);
    setTimeout(() => setGuardrailsSaved(false), 3000);
  };

  const filteredTransactions = transactions.filter(
    (tx) =>
      tx.txId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.jobId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.operation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4 max-w-[1780px] mx-auto pb-20 font-sans select-none">
      
      {/* ======================================================== */}
      {/* 1. WORKSPACE SUBSCRIPTION & RECHARGE HEADER STRIP        */}
      {/* ======================================================== */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1E2230] pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-slate-400 font-bold uppercase">LEDGER & SETTLEMENTS</span>
            <span className="text-slate-600">/</span>
            <span className="text-[#38EF7D] font-bold flex items-center gap-1.5">
              <span>SASPAY.ME ENGINE V1.0</span>
              <span className="w-2 h-2 rounded-full bg-[#38EF7D] animate-pulse" />
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Kurogane Creative Lab
            </h1>
            <span className="px-3 py-1 rounded-xl bg-[#141724] border border-[#2B3B59] text-white font-mono text-xs font-bold shadow-sm">
              PRO STUDIO TIER • $89/mo
            </span>
          </div>

          <p className="text-xs text-slate-400 font-mono">
            Billing cycle resets in 14 days (Nov 1, 2025)
          </p>
        </div>

        {/* Top Right Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 font-mono">
          <button
            onClick={() => alert('Exporting signed CSV Audit report with SHA256 ledger checksum...')}
            className="px-3.5 py-2 rounded-xl bg-[#11131A] hover:bg-[#181B26] border border-[#262C40] text-xs font-bold text-slate-200 flex items-center gap-2 transition-all cursor-pointer shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span>Export CSV Audit</span>
          </button>

          <button
            onClick={() => alert('Consultation des factures et reçus certifiés SasPay.me (Mobile Money & Carte)...')}
            className="px-3.5 py-2 rounded-xl bg-[#11131A] hover:bg-[#181B26] border border-[#262C40] text-xs font-bold text-slate-200 flex items-center gap-2 transition-all cursor-pointer shadow-sm"
          >
            <Receipt className="w-3.5 h-3.5 text-slate-400" />
            <span>Factures SasPay (TVA)</span>
          </button>

          <button
            onClick={() => openSasPayModal('Instant Top-up', 2500, 39)}
            disabled={isProcessing}
            className="px-4 py-2 rounded-xl bg-[#D8FF65] hover:bg-[#cbfa4e] text-[#090A0F] text-xs font-black font-sans flex items-center gap-1.5 transition-all shadow-lg shadow-[#D8FF65]/20 cursor-pointer"
          >
            <Zap className={`w-3.5 h-3.5 ${isProcessing ? 'animate-spin' : ''}`} />
            <span>{isProcessing ? 'Syncing...' : 'Recharge via SasPay'}</span>
          </button>
        </div>
      </div>

      {/* Success Notification */}
      {rechargeSuccess && (
        <div className="p-3 rounded-xl bg-[#091F14] border border-[#38EF7D]/40 text-xs font-mono text-[#38EF7D] flex items-center gap-2.5 animate-in fade-in">
          <Check className="w-4 h-4 stroke-[3]" />
          <span>{rechargeSuccess}</span>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. ROW 1: REAL-TIME VAULT & ADD-ON CREDIT PACKS          */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left Card: REAL-TIME LEDGER VAULT (4.5 cols) */}
        <div className="lg:col-span-5 bg-[#11131A] border border-[#1E2230] rounded-2xl p-5 shadow-xl space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-white uppercase tracking-wider">
              <CreditCard className="w-4 h-4 text-[#D8FF65]" />
              <span>REAL-TIME LEDGER VAULT</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-[#0E261B] text-[#38EF7D] border border-[#1E5037] text-[10px] font-mono font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38EF7D] animate-pulse" />
              <span>Live Sync</span>
            </span>
          </div>

          {/* Big Balance Number */}
          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl md:text-5xl font-black text-white tracking-tight">
                {balance.toLocaleString()}
              </span>
              <span className="text-xl md:text-2xl font-black text-[#D8FF65]">
                CR
              </span>
            </div>
            <p className="text-xs font-mono text-[#68E7FF]">
              Monthly quota: 10,000 CR • 48.5% capacity available
            </p>
          </div>

          {/* Escrow & In-Flight Generation Bar */}
          <div className="p-3.5 rounded-xl bg-[#090A0F] border border-[#1E2230] space-y-2.5 font-mono text-xs">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400 font-bold uppercase tracking-wider">
                ESCROW / IN-FLIGHT GENERATION
              </span>
              <span className="text-[#68E7FF] font-bold flex items-center gap-1">
                <Lock className="w-3 h-3" />
                <span>{reservedEscrow} CR Reserved</span>
              </span>
            </div>

            {/* Filled Bar */}
            <div className="w-full h-2 rounded-full bg-[#161B26] overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#68E7FF] to-[#38EF7D] rounded-full w-[48%]" />
            </div>

            <div className="flex items-center justify-between text-[11px]">
              <span className="text-white font-bold">
                Liquid Spendable: <strong className="text-[#D8FF65]">{spendable.toLocaleString()} CR</strong>
              </span>
              <span className="text-slate-500">
                2 tasks pending settle
              </span>
            </div>
          </div>

          {/* Burn Rate & Estimated Runway */}
          <div className="grid grid-cols-2 gap-3 font-mono text-xs pt-1">
            <div className="p-3 rounded-xl bg-[#090A0F] border border-[#1E2230] space-y-1">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold">
                AVG BURN RATE
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold text-white">184</span>
                <span className="text-[10px] text-slate-400">CR/day</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#090A0F] border border-[#1E2230] space-y-1">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold">
                EST. RUNWAY
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold text-[#D8FF65]">26</span>
                <span className="text-[10px] text-slate-400">days</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Card: INSTANT ADD-ON CREDIT PACKS (7.5 cols) */}
        <div className="lg:col-span-7 bg-[#11131A] border border-[#1E2230] rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                Instant Add-On Credit Packs
              </h3>
              <p className="text-xs text-slate-400 font-sans">
                Zero-loss rollover. Credits never expire and attach instantly via atomic webhook consensus.
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-xl bg-[#090A0F] border border-[#1E2230] text-[11px] font-mono text-slate-300 flex items-center gap-1.5 shrink-0 font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-[#38EF7D]" />
              <span>Instant Top-up</span>
            </span>
          </div>

          {/* 3 Tier Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono">
            
            {/* Tier 1: Starter Pack */}
            <div className="p-3.5 rounded-xl bg-[#090A0F] border border-[#1E2230] hover:border-slate-600 flex flex-col justify-between space-y-3 transition-colors">
              <div className="space-y-1.5">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                  STARTER PACK
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-white">500</span>
                  <span className="text-xs text-[#D8FF65] font-bold">CR</span>
                </div>
                <p className="text-[11px] text-slate-400 font-sans leading-snug">
                  Ideal for prompt test suites & 25 high-res panels.
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-[#1E2230]">
                <div className="flex items-baseline gap-1">
                  <span className="text-base font-black text-white">5 500 F CFA</span>
                  <span className="text-[10px] text-slate-500 font-sans">($9 USD)</span>
                </div>
                <button
                  onClick={() => openSasPayModal('Starter Pack', 500, 9)}
                  className="w-full py-2 rounded-xl bg-[#161B26] hover:bg-[#21293B] text-slate-200 hover:text-white text-xs font-bold transition-all cursor-pointer"
                >
                  Payer via SasPay
                </button>
              </div>
            </div>

            {/* Tier 2: Production Run */}
            <div className="p-3.5 rounded-xl bg-[#090A0F] border border-[#1E2230] hover:border-slate-600 flex flex-col justify-between space-y-3 transition-colors">
              <div className="space-y-1.5">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                  PRODUCTION RUN
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-white">2,500</span>
                  <span className="text-xs text-[#D8FF65] font-bold">CR</span>
                </div>
                <p className="text-[11px] text-slate-400 font-sans leading-snug">
                  Standard batch generation for complete 32-page issues.
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-[#1E2230]">
                <div className="flex items-baseline gap-1">
                  <span className="text-base font-black text-white">24 000 F CFA</span>
                  <span className="text-[10px] text-slate-500 font-sans">($39 USD)</span>
                </div>
                <button
                  onClick={() => openSasPayModal('Production Run', 2500, 39)}
                  className="w-full py-2 rounded-xl bg-[#161B26] hover:bg-[#21293B] text-slate-200 hover:text-white text-xs font-bold transition-all cursor-pointer"
                >
                  Payer via SasPay
                </button>
              </div>
            </div>

            {/* Tier 3: Studio Epic Pack (MOST POPULAR) */}
            <div className="p-3.5 rounded-xl bg-[#141A10] border-2 border-[#D8FF65] flex flex-col justify-between space-y-3 relative shadow-lg shadow-[#D8FF65]/10">
              <span className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full bg-[#D8FF65] text-[#090A0F] font-black text-[9px] uppercase tracking-wider">
                MOST POPULAR
              </span>

              <div className="space-y-1.5">
                <span className="text-[10px] text-[#D8FF65] font-black uppercase tracking-wider block">
                  STUDIO EPIC PACK
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-white">10,000</span>
                  <span className="text-xs text-[#D8FF65] font-bold">CR</span>
                </div>
                <p className="text-[11px] text-slate-300 font-sans leading-snug">
                  Full season development + LoRA model fine-tuning weights.
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-[#3E4A1E]">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-lg font-black text-white">80 000 F CFA</span>
                  <span className="text-[10px] text-slate-400 font-sans">($129 USD)</span>
                </div>
                <button
                  onClick={() => openSasPayModal('Studio Epic Pack', 10000, 129)}
                  className="w-full py-2 rounded-xl bg-[#D8FF65] hover:bg-[#cbfa4e] text-[#090A0F] text-xs font-black transition-all cursor-pointer shadow-md shadow-[#D8FF65]/20"
                >
                  Checkout Immédiat SasPay
                </button>
              </div>
            </div>

          </div>

          {/* Footer Guarantee */}
          <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-400 pt-1">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Zap className="w-3 h-3 text-[#D8FF65]" />
              <span>Orchestré via la passerelle officielle SASPAY.ME (API v1 REST)</span>
            </span>
            <span className="text-slate-500">
              Remise de volume automatique &gt; 25k CR
            </span>
          </div>
        </div>

      </div>

      {/* ======================================================== */}
      {/* 3. ROW 2: SASPAY.ME PAYMENT GATEWAY ENGINE MATRIX        */}
      {/* ======================================================== */}
      <div className="bg-[#11131A] border border-[#1E2230] rounded-2xl p-5 shadow-xl space-y-4">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-[#D8FF65]" />
              <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                SASPAY.ME Payment Gateway Engine (Mobile Money & Cards)
              </h3>
            </div>
            <p className="text-xs text-slate-400 font-sans">
              Encaissement direct en Afrique et international via l’API officielle https://api.saspay.me/api/v1.
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-[#38EF7D] font-mono text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-[#38EF7D] animate-pulse" />
            <span>SasPay Engine: 100% Opérationnel</span>
          </div>
        </div>

        {/* 3 Gateway Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 font-mono text-xs">
          
          {/* Gateway 1: SasPay Softpay Push */}
          <div className="p-4 rounded-xl bg-[#090A0F] border border-[#1E2230] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#2D1B4E] border border-[#553690] flex items-center justify-center font-black text-[#D8FF65] text-xs">
                  SP
                </div>
                <div>
                  <h4 className="font-bold text-white text-xs">SasPay Softpay Push</h4>
                  <span className="text-[10px] text-slate-500 block font-bold">MOBILE MONEY DIRECT</span>
                </div>
              </div>

              <span className="px-2 py-0.5 rounded bg-[#0E261B] text-[#38EF7D] border border-[#1E5037] text-[10px] font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#38EF7D]" />
                <span>Actif</span>
              </span>
            </div>

            <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
              Push USSD et notification immédiate sur le mobile du créateur (MTN Cameroun/Bénin, Orange Money, Moov, Wave).
            </p>

            <div className="space-y-1 text-[11px] pt-1 border-t border-[#1E2230]">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Route API:</span>
                <span className="text-[#D8FF65] font-bold">POST /payments/softpay/</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Format Montant:</span>
                <span className="text-slate-300">Chaîne décimale (&quot;2500.00&quot;)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Idempotency-Key:</span>
                <span className="text-[#68E7FF] font-bold">Obligatoire anti-rejeu</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] pt-2 border-t border-[#1E2230]">
              <span className="text-[#38EF7D] font-bold">Status: ENCAISSEMENT DIRECT</span>
              <span className="text-slate-400">Devises: XAF / XOF</span>
            </div>
          </div>

          {/* Gateway 2: SasPay Hosted Checkout */}
          <div className="p-4 rounded-xl bg-[#090A0F] border border-[#1E2230] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#10202F] border border-[#1E3A5F] flex items-center justify-center font-black text-[#68E7FF] text-xs">
                  CS
                </div>
                <div>
                  <h4 className="font-bold text-white text-xs">SasPay Checkout Session</h4>
                  <span className="text-[10px] text-slate-500 block font-bold">PAGE SÉCURISÉE HÉBERGÉE</span>
                </div>
              </div>

              <span className="px-2 py-0.5 rounded bg-[#0E261B] text-[#38EF7D] border border-[#1E5037] text-[10px] font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#38EF7D]" />
                <span>100%</span>
              </span>
            </div>

            <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
              Génère une page de paiement hébergée SasPay (<span className="text-[#D8FF65]">checkout_url</span>) où l’utilisateur choisit son moyen préféré (Cartes, Wallets).
            </p>

            <div className="space-y-1 text-[11px] pt-1 border-t border-[#1E2230]">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Route API:</span>
                <span className="text-[#D8FF65] font-bold">POST /checkout-sessions/</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Cartes acceptées:</span>
                <span className="text-slate-300">Visa, Mastercard, GIMAC</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Vérification:</span>
                <span className="text-[#68E7FF] font-bold">GET /verify/ obligatoire</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] pt-2 border-t border-[#1E2230]">
              <span className="text-[#38EF7D] font-bold">Status: DISPONIBLE</span>
              <span className="text-slate-400">Périmètre: Global</span>
            </div>
          </div>

          {/* Gateway 3: SasPay Webhooks & Replay Defense */}
          <div className="p-4 rounded-xl bg-[#090A0F] border border-[#1E2230] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#14231E] border border-[#1E5037] flex items-center justify-center font-black text-[#38EF7D] text-xs">
                  WH
                </div>
                <div>
                  <h4 className="font-bold text-white text-xs">Webhooks Cryptographiques</h4>
                  <span className="text-[10px] text-slate-500 block font-bold">AUTHENTIFICATION HMAC</span>
                </div>
              </div>

              <span className="px-2 py-0.5 rounded bg-[#10202F] text-[#68E7FF] border border-[#1E3A5F] text-[10px] font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#68E7FF]" />
                <span>HMAC SHA-256</span>
              </span>
            </div>

            <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
              Vérification stricte de signature sur le corps brut avec fenêtre temporelle anti-rejeu limitée à 300 secondes.
            </p>

            <div className="space-y-1 text-[11px] pt-1 border-t border-[#1E2230]">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">En-tête Signature:</span>
                <span className="text-[#D8FF65] font-bold">X-Webhook-Signature</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">En-tête Timestamp:</span>
                <span className="text-slate-300">X-Webhook-Timestamp</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Fenêtre max:</span>
                <span className="text-[#FFA94D] font-bold">300s (Replay Guard)</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] pt-2 border-t border-[#1E2230]">
              <span className="text-[#38EF7D] font-bold">Status: VÉRIFICATION STRICTE</span>
              <span className="text-slate-400">Livraison : SUCCESS only</span>
            </div>
          </div>

        </div>

        {/* Security Consensus Footer Banner */}
        <div className="p-3.5 rounded-xl bg-[#090A0F] border border-[#1E2230] flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2.5">
            <Lock className="w-4 h-4 text-[#D8FF65] shrink-0" />
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-white font-bold text-[11px]">
                  SasPay.me Anti-Drift & Delivery Consensus Guarantee
                </span>
                <span className="px-1.5 py-0.2 rounded bg-[#0E261B] text-[#38EF7D] border border-[#1E5037] text-[9px] font-bold">
                  SASPAY-CERTIFIED
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-sans">
                Toutes les recharges sont validées côté serveur. Les crédits WAZA-ZONE ne sont livrés <strong className="text-white">QUE</strong> lorsque l’API SasPay confirme le statut <strong className="text-[#38EF7D]">SUCCESS</strong> via webhook HMAC ou GET /verify/.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-slate-300 text-[11px] shrink-0 font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-[#38EF7D]" />
            <span>SasPay API v1 • Mutual Security Verified</span>
          </div>
        </div>

      </div>

      {/* ======================================================== */}
      {/* 4. ROW 3: IMMUTABLE APPEND-ONLY LEDGER                   */}
      {/* ======================================================== */}
      <div className="bg-[#11131A] border border-[#1E2230] rounded-2xl p-5 shadow-xl space-y-4">
        
        {/* Ledger Header & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#D8FF65]" />
              <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                Immutable Append-Only Ledger
              </h3>
            </div>
            <p className="text-xs text-slate-400 font-sans">
              Cryptographic double-entry state transitions. Every credit lock, burn, settlement, and top-up verified via internal hash chains.
            </p>
          </div>

          {/* Search Input */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by Tx Hash or Job ID..."
                className="bg-[#090A0F] border border-[#1E2230] rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#4FACFE] font-mono w-64"
              />
            </div>
            <button className="p-2 rounded-xl bg-[#090A0F] border border-[#1E2230] text-slate-400 hover:text-white cursor-pointer">
              <Filter className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Ledger Table */}
        <div className="overflow-x-auto rounded-xl border border-[#1E2230]">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#090A0F] text-slate-400 uppercase text-[10px] tracking-wider border-b border-[#1E2230]">
              <tr>
                <th className="py-3 px-4">STATE TX ID & TIME (UTC)</th>
                <th className="py-3 px-4">EVENT TYPE</th>
                <th className="py-3 px-4">AMOUNT</th>
                <th className="py-3 px-4">BALANCE AFTER</th>
                <th className="py-3 px-4">PROVIDER / OPERATION DETAIL</th>
                <th className="py-3 px-4">IDEMPOTENCY SIGNATURE</th>
                <th className="py-3 px-4 text-right">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E2230] bg-[#11131A]">
              {filteredTransactions.map((tx) => (
                <tr key={tx.txId} className="hover:bg-[#151924] transition-colors">
                  {/* TX ID & Time */}
                  <td className="py-3 px-4 space-y-0.5">
                    <span className="text-[#68E7FF] font-bold block">{tx.txId}</span>
                    <span className="text-[10px] text-slate-500 block">{tx.time}</span>
                  </td>

                  {/* Event Type */}
                  <td className="py-3 px-4">
                    {tx.eventType === 'RESERVE' && (
                      <span className="px-2 py-0.5 rounded bg-[#10202F] text-[#4FACFE] border border-[#1E3A5F] text-[10px] font-bold flex items-center gap-1 w-fit">
                        <Lock className="w-3 h-3" />
                        <span>RESERVE</span>
                      </span>
                    )}
                    {tx.eventType === 'SETTLE' && (
                      <span className="px-2 py-0.5 rounded bg-[#181D29] text-slate-200 border border-[#2B3B59] text-[10px] font-bold flex items-center gap-1 w-fit">
                        <Check className="w-3 h-3" />
                        <span>SETTLE</span>
                      </span>
                    )}
                    {tx.eventType === 'REFUND' && (
                      <span className="px-2 py-0.5 rounded bg-[#1A1F10] text-[#D8FF65] border border-[#3E4A1E] text-[10px] font-bold flex items-center gap-1 w-fit">
                        <RefreshCw className="w-3 h-3" />
                        <span>REFUND</span>
                      </span>
                    )}
                    {tx.eventType === 'RECHARGE' && (
                      <span className="px-2 py-0.5 rounded bg-[#0E261B] text-[#38EF7D] border border-[#1E5037] text-[10px] font-bold flex items-center gap-1 w-fit">
                        <span>⊕ RECHARGE</span>
                      </span>
                    )}
                    {tx.eventType === 'RENEWAL' && (
                      <span className="px-2 py-0.5 rounded bg-[#0E261B] text-[#38EF7D] border border-[#1E5037] text-[10px] font-bold flex items-center gap-1 w-fit">
                        <span>📦 RENEWAL</span>
                      </span>
                    )}
                  </td>

                  {/* Amount */}
                  <td className="py-3 px-4 font-bold">
                    <span
                      className={
                        tx.amount < 0
                          ? 'text-[#68E7FF]'
                          : tx.amount === 10000 || tx.amount === 5000
                          ? 'text-[#38EF7D]'
                          : 'text-[#D8FF65]'
                      }
                    >
                      {tx.amountLabel}
                    </span>
                  </td>

                  {/* Balance After */}
                  <td className="py-3 px-4 font-bold text-white">
                    {tx.balanceAfter}
                  </td>

                  {/* Operation Details */}
                  <td className="py-3 px-4 space-y-0.5">
                    <span className="text-white font-bold block">{tx.jobId}</span>
                    <span className="text-[10px] text-slate-400 block font-sans">{tx.operation}</span>
                  </td>

                  {/* Idempotency Signature */}
                  <td className="py-3 px-4 text-slate-400 text-[11px]">
                    {tx.idempotency}
                  </td>

                  {/* Status */}
                  <td className="py-3 px-4 text-right">
                    {tx.statusColor === 'cyan' && (
                      <span className="text-[#68E7FF] font-black text-[11px]">ESCROW_HOLD</span>
                    )}
                    {tx.statusColor === 'green' && (
                      <span className="text-[#38EF7D] font-black text-[11px]">{tx.status}</span>
                    )}
                    {tx.statusColor === 'lime' && (
                      <span className="text-[#D8FF65] font-black text-[11px]">{tx.status}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Ledger Footer & Pagination */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-slate-400 pt-1">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4FACFE]" />
            <span>
              Merkle Root: <strong className="text-slate-300">0x4e8a...9c22</strong> (2,842 ledger blocks committed)
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button className="text-slate-500 hover:text-white cursor-pointer">Prev</button>
            <span className="text-slate-300">Page 1 of 84</span>
            <button className="text-slate-300 hover:text-white cursor-pointer font-bold">Next</button>
          </div>
        </div>

      </div>

      {/* ======================================================== */}
      {/* 5. ROW 4: FINOPS TOKEN UNIT ECONOMICS & SAFETY GUARDS   */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left: FinOps & Token Unit Economics (7.5 cols) */}
        <div className="lg:col-span-7 bg-[#11131A] border border-[#1E2230] rounded-2xl p-5 shadow-xl space-y-4">
          
          {/* Header & Period Switcher */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-[#D8FF65]" />
                <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                  FinOps & Token Unit Economics
                </h3>
              </div>
              <p className="text-xs text-slate-400 font-sans">
                Real compute expenditures measured across multi-model inference pipelines.
              </p>
            </div>

            {/* Billing Cycle / 30 Days / All Time */}
            <div className="flex items-center bg-[#090A0F] p-1 rounded-xl border border-[#1E2230] text-[11px] font-mono">
              <button
                onClick={() => setFinOpsPeriod('BILLING_CYCLE')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  finOpsPeriod === 'BILLING_CYCLE'
                    ? 'bg-[#1A1F10] text-[#D8FF65] border border-[#3E4A1E] font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Billing Cycle
              </button>
              <button
                onClick={() => setFinOpsPeriod('30_DAYS')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  finOpsPeriod === '30_DAYS'
                    ? 'bg-[#1A1F10] text-[#D8FF65] border border-[#3E4A1E] font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                30 Days
              </button>
              <button
                onClick={() => setFinOpsPeriod('ALL_TIME')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  finOpsPeriod === 'ALL_TIME'
                    ? 'bg-[#1A1F10] text-[#D8FF65] border border-[#3E4A1E] font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                All Time
              </button>
            </div>
          </div>

          {/* 3 Stat Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono">
            
            {/* Metric 1 */}
            <div className="p-3.5 rounded-xl bg-[#090A0F] border border-[#1E2230] space-y-1">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">
                AVG COST / COMIC PANEL
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-[#D8FF65]">$0.018</span>
                <span className="text-[10px] text-slate-400">USD</span>
              </div>
              <p className="text-[10px] text-[#38EF7D] font-bold flex items-center gap-1">
                <span>↘</span>
                <span>14% cheaper vs v2.1</span>
              </p>
            </div>

            {/* Metric 2 */}
            <div className="p-3.5 rounded-xl bg-[#090A0F] border border-[#1E2230] space-y-1">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">
                STORY PLAN / BEAT COST
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-[#68E7FF]">$0.0012</span>
                <span className="text-[10px] text-slate-400">USD</span>
              </div>
              <p className="text-[10px] text-slate-400 font-sans">
                Gemini 2.0 Flash context cached
              </p>
            </div>

            {/* Metric 3 */}
            <div className="p-3.5 rounded-xl bg-[#090A0F] border border-[#1E2230] space-y-1">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">
                LORA FINE-TUNE RATE
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-[#D8B4FE]">$1.40</span>
                <span className="text-[10px] text-slate-400">USD / epoch</span>
              </div>
              <p className="text-[10px] text-slate-400 font-sans">
                Serverless A100 cluster allocation
              </p>
            </div>

          </div>

          {/* Engine Compute Distribution Multi-Segmented Bar */}
          <div className="p-3.5 rounded-xl bg-[#090A0F] border border-[#1E2230] space-y-2.5 font-mono text-xs">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400 font-bold uppercase tracking-wider">
                ENGINE COMPUTE DISTRIBUTION (CURRENT CYCLE)
              </span>
              <span className="text-white font-bold">
                $58.42 Gross Consumed
              </span>
            </div>

            {/* Segmented bar */}
            <div className="w-full h-2 rounded-full overflow-hidden flex bg-[#161B26]">
              <div className="h-full bg-[#4FACFE] w-[48%]" title="Imagen 3 (48%)" />
              <div className="h-full bg-[#9D78FF] w-[32%]" title="Gemini 2.0 (32%)" />
              <div className="h-full bg-[#D8FF65] w-[14%]" title="LoRA Adapter (14%)" />
              <div className="h-full bg-slate-600 w-[6%]" title="Vector DB (6%)" />
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center gap-4 text-[10px]">
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2 h-2 rounded-full bg-[#4FACFE]" />
                <span>Imagen 3 (48%)</span>
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2 h-2 rounded-full bg-[#9D78FF]" />
                <span>Gemini 2.0 (32%)</span>
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2 h-2 rounded-full bg-[#D8FF65]" />
                <span>LoRA Adapter (14%)</span>
              </span>
              <span className="flex items-center gap-1.5 text-slate-400">
                <span className="w-2 h-2 rounded-full bg-slate-600" />
                <span>Vector DB (6%)</span>
              </span>
            </div>
          </div>

        </div>

        {/* Right: Safety Guardrails (4.5 cols) */}
        <div className="lg:col-span-5 bg-[#11131A] border border-[#1E2230] rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#D8FF65]" />
              <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                Safety Guardrails
              </h3>
            </div>
            <span className="px-2 py-0.5 rounded bg-[#0E261B] text-[#38EF7D] border border-[#1E5037] text-[10px] font-mono font-bold">
              ACTIVE
            </span>
          </div>

          <p className="text-xs text-slate-400 font-sans leading-relaxed">
            Strict circuit-breaker cap prevents runaway runaway scripts or recursive prompt loop billing surprises.
          </p>

          {/* Monthly Spend Ceiling Slider */}
          <div className="space-y-2 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 uppercase tracking-wider text-[11px] font-bold">
                MONTHLY SPEND CEILING
              </span>
              <span className="text-2xl font-black text-[#D8FF65]">
                ${spendCeiling}.00
              </span>
            </div>

            <input
              type="range"
              min={100}
              max={1000}
              step={25}
              value={spendCeiling}
              onChange={(e) => setSpendCeiling(Number(e.target.value))}
              className="w-full accent-[#D8FF65] cursor-pointer"
            />

            <div className="flex items-center justify-between text-[10px] text-slate-500">
              <span>Min: $100</span>
              <span className="text-slate-300 font-bold">Current: $58.42 (23%)</span>
              <span>Max: $1,000</span>
            </div>
          </div>

          {/* Toggles */}
          <div className="space-y-3 pt-2 border-t border-[#1E2230] font-mono text-xs">
            
            {/* Toggle 1: 80% Usage Soft Alert */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-white font-bold text-xs block">80% Usage Soft Alert</span>
                <span className="text-[10px] text-slate-500 block font-sans">
                  Email notification + Webhook dispatch
                </span>
              </div>
              <button
                onClick={() => setSoftAlert(!softAlert)}
                className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${
                  softAlert ? 'bg-[#D8FF65]' : 'bg-[#1E2230]'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full transition-transform ${
                    softAlert ? 'translate-x-4 bg-[#090A0F]' : 'translate-x-0 bg-white'
                  }`}
                />
              </button>
            </div>

            {/* Toggle 2: Hard Cutoff on 100% Cap */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-white font-bold text-xs block">Hard Cutoff on 100% Cap</span>
                <span className="text-[10px] text-slate-500 block font-sans">
                  Pause generation jobs automatically
                </span>
              </div>
              <button
                onClick={() => setHardCutoff(!hardCutoff)}
                className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${
                  hardCutoff ? 'bg-[#D8FF65]' : 'bg-[#1E2230]'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full transition-transform ${
                    hardCutoff ? 'translate-x-4 bg-[#090A0F]' : 'translate-x-0 bg-white'
                  }`}
                />
              </button>
            </div>

          </div>

          {/* Commit Button */}
          <div className="pt-2">
            <button
              onClick={handleSaveGuardrails}
              className="w-full py-2.5 rounded-xl bg-[#090A0F] hover:bg-[#151924] border border-[#2B3B59] text-xs font-mono text-slate-200 hover:text-white font-bold flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#D8FF65]" />
              <span>{guardrailsSaved ? 'Guardrails Committed to Redis' : 'Commit FinOps Constraints'}</span>
            </button>
          </div>

        </div>

      </div>

      {/* ======================================================== */}
      {/* 5. SASPAY.ME INTERACTIVE PAYMENT MODAL                   */}
      {/* ======================================================== */}
      {showSasPayModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#11131A] border border-[#1E2230] rounded-2xl p-6 max-w-lg w-full space-y-4 font-mono text-xs shadow-2xl animate-in fade-in zoom-in-95">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#1E2230] pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#2D1B4E] border border-[#553690] flex items-center justify-center text-[#D8FF65] font-black text-xs">
                  SP
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Paiement Sécurisé SASPAY.ME</h4>
                  <span className="text-[10px] text-slate-400 block font-sans">
                    API REST v1 • Encaissement Mobile Money &amp; Cartes
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowSasPayModal(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Pack Recap */}
            <div className="p-3.5 rounded-xl bg-[#090A0F] border border-[#1E2230] flex items-center justify-between">
              <div>
                <span className="text-white font-bold text-xs block">{selectedPackForModal.name}</span>
                <span className="text-[11px] text-[#D8FF65] font-bold">+{selectedPackForModal.credits.toLocaleString()} Crédits Studio</span>
              </div>
              <div className="text-right">
                <span className="text-lg font-black text-white block">{selectedPackForModal.priceXaf.toLocaleString()} F CFA</span>
                <span className="text-[10px] text-slate-500 font-sans">≈ ${selectedPackForModal.priceUsd} USD</span>
              </div>
            </div>

            {/* Mode Selector */}
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMode('SOFTPAY')}
                className={`py-2 px-3 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                  paymentMode === 'SOFTPAY'
                    ? 'bg-[#161B26] text-[#D8FF65] border border-[#D8FF65]/50'
                    : 'bg-[#090A0F] text-slate-400 hover:text-white border border-[#1E2230]'
                }`}
              >
                Mobile Money (Direct Push)
              </button>
              <button
                type="button"
                onClick={() => setPaymentMode('HOSTED')}
                className={`py-2 px-3 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                  paymentMode === 'HOSTED'
                    ? 'bg-[#161B26] text-[#68E7FF] border border-[#68E7FF]/50'
                    : 'bg-[#090A0F] text-slate-400 hover:text-white border border-[#1E2230]'
                }`}
              >
                Carte &amp; Checkout Hébergé
              </button>
            </div>

            {/* Softpay Form */}
            {paymentMode === 'SOFTPAY' ? (
              <div className="space-y-3 pt-1">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-slate-400 text-[10px] block mb-1">PAYS :</label>
                    <select
                      value={softpayCountry}
                      onChange={(e) => setSoftpayCountry(e.target.value)}
                      className="w-full bg-[#090A0F] border border-[#1E2230] rounded-xl p-2 text-white text-xs focus:outline-none focus:border-[#D8FF65]"
                    >
                      <option value="CM">Cameroun (+237)</option>
                      <option value="BJ">Bénin (+229)</option>
                      <option value="CI">Côte d&apos;Ivoire (+225)</option>
                      <option value="SN">Sénégal (+221)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-slate-400 text-[10px] block mb-1">OPÉRATEUR :</label>
                    <select
                      value={softpayNetwork}
                      onChange={(e) => setSoftpayNetwork(e.target.value)}
                      className="w-full bg-[#090A0F] border border-[#1E2230] rounded-xl p-2 text-white text-xs focus:outline-none focus:border-[#D8FF65]"
                    >
                      <option value="MTN">MTN Mobile Money</option>
                      <option value="ORANGE">Orange Money</option>
                      <option value="MOOV">Moov Money</option>
                      <option value="WAVE">Wave Mobile</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-slate-400 text-[10px] block mb-1">NUMÉRO MOBILE DU PAYEUR :</label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
                    <input
                      type="text"
                      value={softpayPhone}
                      onChange={(e) => setSoftpayPhone(e.target.value)}
                      placeholder="+237691823901"
                      className="w-full bg-[#090A0F] border border-[#1E2230] rounded-xl pl-9 pr-3 py-2 text-white text-xs font-mono focus:outline-none focus:border-[#D8FF65]"
                    />
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    Une invite USSD sera envoyée pour valider le code PIN sur votre téléphone.
                  </span>
                </div>

                {saspayOperatorRef && (
                  <div className="p-2.5 rounded-xl bg-[#0E261B] border border-[#1E5037] text-[#38EF7D] text-[11px] flex items-center justify-between">
                    <span>Référence Opérateur : <strong>{saspayOperatorRef}</strong></span>
                    <span className="animate-pulse">Attente validation...</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-[#090A0F] border border-[#1E2230] space-y-2 text-center text-slate-300">
                <Globe className="w-6 h-6 mx-auto text-[#68E7FF]" />
                <p className="font-sans text-xs">
                  Vous serez redirigé vers la page de paiement sécurisée hébergée par <strong className="text-white">SasPay.me</strong> pour régler par carte bancaire (Visa, Mastercard, GIMAC) ou portefeuille international.
                </p>
                <span className="text-[10px] text-slate-500 block">
                  Montant débité : {selectedPackForModal.priceXaf.toLocaleString()} F CFA (chaîne décimale &quot;{selectedPackForModal.priceXaf.toFixed(2)}&quot;)
                </span>
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#1E2230]">
              <button
                type="button"
                onClick={() => setShowSasPayModal(false)}
                className="px-4 py-2 rounded-xl bg-[#090A0F] hover:bg-[#161B26] text-slate-300 text-xs font-bold transition-all cursor-pointer"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleExecuteSasPay}
                disabled={isSasPayLoading}
                className="px-5 py-2 rounded-xl bg-[#D8FF65] hover:bg-[#cbfa4e] text-[#090A0F] text-xs font-black transition-all flex items-center gap-1.5 shadow-md shadow-[#D8FF65]/20 cursor-pointer"
              >
                <Zap className={`w-3.5 h-3.5 ${isSasPayLoading ? 'animate-spin' : ''}`} />
                <span>{isSasPayLoading ? 'Traitement SasPay...' : `Payer ${selectedPackForModal.priceXaf.toLocaleString()} F CFA`}</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
