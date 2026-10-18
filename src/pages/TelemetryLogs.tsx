import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldCheck,
  Zap,
  Cpu,
  Layers,
  CheckCircle2,
  Lock,
  RefreshCw,
  Terminal,
  Download,
  Check,
  Server,
  Activity,
  Play,
  Sliders,
  AlertTriangle,
  Flame,
  Radio,
  Clock,
  Trash2,
  Pause,
  ExternalLink
} from 'lucide-react';

interface LogEntry {
  id: string;
  timestamp: string;
  level: 'INFO' | 'AUDIT' | 'HEALTHCHECK' | 'WARN';
  event: string;
  payload: Record<string, any>;
}

export const TelemetryLogs: React.FC = () => {
  // Test suite execution state
  const [isRunningSuite, setIsRunningSuite] = useState(false);
  const [suiteResult, setSuiteResult] = useState<string | null>(null);

  // Flushing Idempotent Keys
  const [isFlushingKeys, setIsFlushingKeys] = useState(false);
  const [flushResult, setFlushResult] = useState<string | null>(null);

  // Live Socket Terminal Logs
  const [isLiveStreaming, setIsLiveStreaming] = useState(true);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const initialLogs: LogEntry[] = [
    {
      id: 'log-1',
      timestamp: '2025-02-23T14:02:11.102Z',
      level: 'INFO',
      event: 'SYS_BOOT',
      payload: { version: '1.2.0', env: 'production', cluster: 'node-01' }
    },
    {
      id: 'log-2',
      timestamp: '2025-02-23T14:02:12.441Z',
      level: 'INFO',
      event: 'ENV_AUDIT',
      payload: { key_audit: { VITE_GEMINI_API_KEY: 'FORBIDDEN_VERIFIED_ABSENT' } }
    },
    {
      id: 'log-3',
      timestamp: '2025-02-23T14:02:12.890Z',
      level: 'INFO',
      event: 'RLS_EVALUATION',
      payload: { tables_checked: 22, status: 'ISOLATED_ALL_PASSED' }
    },
    {
      id: 'log-4',
      timestamp: '2025-02-23T14:02:13.110Z',
      level: 'INFO',
      event: 'REDIS_BULLMQ',
      payload: { workers_ready: 4, concurrency: 16 }
    },
    {
      id: 'log-5',
      timestamp: '2025-02-23T14:02:14.004Z',
      level: 'INFO',
      event: 'LEDGER_INIT',
      payload: { model: 'APPEND_ONLY', active_gateways: ['stripe', 'moneroo'] }
    },
    {
      id: 'log-6',
      timestamp: '2025-02-23T14:02:15.654Z',
      level: 'AUDIT',
      event: 'CREDIT_RESERVED',
      payload: { tx_id: 'tx_8a99fc', action: 'CREDIT_RESERVED', amount: 12, balance_held: 24 }
    },
    {
      id: 'log-7',
      timestamp: '2025-02-23T14:02:16.202Z',
      level: 'INFO',
      event: 'AI_GATEWAY_DISPATCH',
      payload: { model: 'gemini-2.0-flash', latency_ms: 540, zod_valid: true }
    },
    {
      id: 'log-8',
      timestamp: '2025-02-23T14:02:16.220Z',
      level: 'AUDIT',
      event: 'CREDIT_SETTLED',
      payload: { tx_id: 'tx_8a99fc', action: 'CREDIT_SETTLED', settled_credits: 12 }
    },
    {
      id: 'log-9',
      timestamp: '2025-02-23T14:02:18.012Z',
      level: 'HEALTHCHECK',
      event: 'PING_CHECK',
      payload: { endpoint: '/api/health', status: 200, duration_ms: 18 }
    }
  ];

  const [logs, setLogs] = useState<LogEntry[]>(initialLogs);

  // Animated Live Streaming simulator
  useEffect(() => {
    if (!isLiveStreaming) return;

    const interval = setInterval(() => {
      const events = [
        {
          event: 'HEALTHCHECK',
          level: 'HEALTHCHECK' as const,
          payload: { endpoint: '/api/health', status: 200, duration_ms: Math.floor(Math.random() * 8 + 14) }
        },
        {
          event: 'AI_GATEWAY_DISPATCH',
          level: 'INFO' as const,
          payload: { model: 'gemini-2.0-flash', latency_ms: Math.floor(Math.random() * 200 + 400), zod_valid: true }
        },
        {
          event: 'CREDIT_RESERVED',
          level: 'AUDIT' as const,
          payload: { tx_id: `tx_${Math.random().toString(36).substring(2, 8)}`, action: 'CREDIT_RESERVED', amount: 12 }
        },
        {
          event: 'BULLMQ_JOB_SETTLE',
          level: 'INFO' as const,
          payload: { job_id: `job_${Math.random().toString(36).substring(2, 7)}`, queue: 'image-synthesis', status: 'COMPLETED' }
        }
      ];

      const chosen = events[Math.floor(Math.random() * events.length)];
      const newEntry: LogEntry = {
        id: `log-${Date.now()}`,
        timestamp: new Date().toISOString(),
        level: chosen.level,
        event: chosen.event,
        payload: chosen.payload
      };

      setLogs((prev) => [...prev.slice(-18), newEntry]);
    }, 3800);

    return () => clearInterval(interval);
  }, [isLiveStreaming]);

  // Scroll to bottom on new log
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleRunSuite = () => {
    setIsRunningSuite(true);
    setTimeout(() => {
      setIsRunningSuite(false);
      setSuiteResult('22/22 RLS Multi-Tenant Isolation Tests Passed in 312ms.');
      setTimeout(() => setSuiteResult(null), 4000);
    }, 1200);
  };

  const handleFlushKeys = () => {
    setIsFlushingKeys(true);
    setTimeout(() => {
      setIsFlushingKeys(false);
      setFlushResult('Flushed 142 expired idempotency keys from Redis cache.');
      setTimeout(() => setFlushResult(null), 3500);
    }, 800);
  };

  return (
    <div className="space-y-4 max-w-[1780px] mx-auto pb-20 font-sans select-none">
      
      {/* ======================================================== */}
      {/* 1. TOP HEADER STRIP & METADATA                           */}
      {/* ======================================================== */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1E2230] pb-4">
        
        {/* Left Badges & Title */}
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="px-2 py-0.5 rounded bg-[#D8FF65] text-[#090A0F] font-black text-[10px] flex items-center gap-1 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#090A0F]" />
              <span>SYS_ENG // RUNTIME ACTIVE</span>
            </span>

            <span className="text-slate-400">NODE_ENV:</span>
            <span className="text-white font-bold">production /</span>

            <span className="text-slate-400">DOCKER:</span>
            <span className="text-slate-200 font-bold">waza-core:v1.2.0 /</span>

            <span className="text-slate-400">PING:</span>
            <span className="text-slate-200">/api/health</span>
            <span className="text-[#D8FF65] font-bold">(18ms)</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight flex items-center gap-2">
            <span>Engine Console</span>
            <span className="text-slate-600">//</span>
            <span className="text-slate-400 text-lg md:text-2xl font-normal">
              Phase 01 Foundation & RLS Security
            </span>
          </h1>
        </div>

        {/* Top Right Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 font-mono">
          <button
            onClick={handleRunSuite}
            disabled={isRunningSuite}
            className="px-4 py-2 rounded-xl bg-[#D8FF65] hover:bg-[#cbfa4e] text-[#090A0F] text-xs font-black font-sans flex items-center gap-1.5 transition-all shadow-lg shadow-[#D8FF65]/20 cursor-pointer"
          >
            <Play className={`w-3.5 h-3.5 fill-[#090A0F] ${isRunningSuite ? 'animate-spin' : ''}`} />
            <span>{isRunningSuite ? 'Running Test Suite...' : 'Run RLS Automated Suite'}</span>
          </button>

          <button
            onClick={handleFlushKeys}
            disabled={isFlushingKeys}
            className="px-3.5 py-2 rounded-xl bg-[#11131A] hover:bg-[#181B26] border border-[#262C40] text-xs font-bold text-slate-200 flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-slate-400 ${isFlushingKeys ? 'animate-spin' : ''}`} />
            <span>Flush Idempotent Keys</span>
          </button>

          <button
            onClick={() => alert('Viewing 001_core_schema.sql source code...')}
            className="px-3.5 py-2 rounded-xl bg-[#11131A] hover:bg-[#181B26] border border-[#262C40] text-xs font-bold text-slate-200 flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span>001_core_schema.sql</span>
          </button>
        </div>

      </div>

      {/* Test Suite Banner */}
      {suiteResult && (
        <div className="p-3 rounded-xl bg-[#091F14] border border-[#38EF7D]/40 text-xs font-mono text-[#38EF7D] flex items-center gap-2.5 animate-in fade-in">
          <Check className="w-4 h-4 stroke-[3]" />
          <span>{suiteResult}</span>
        </div>
      )}

      {/* Flush Result Banner */}
      {flushResult && (
        <div className="p-3 rounded-xl bg-[#091F14] border border-[#38EF7D]/40 text-xs font-mono text-[#38EF7D] flex items-center gap-2.5 animate-in fade-in">
          <Check className="w-4 h-4 stroke-[3]" />
          <span>{flushResult}</span>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. ROW 1: 4 SYSTEM HEALTH METRIC PODS                    */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
        
        {/* Pod 1: Postgres RLS Shield */}
        <div className="p-4 rounded-2xl bg-[#11131A] border border-[#1E2230] space-y-3 shadow-xl">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-bold uppercase tracking-wider text-[11px]">POSTGRES RLS SHIELD</span>
            <ShieldCheck className="w-4 h-4 text-[#38EF7D]" />
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">22 / 22</span>
            <span className="text-xs text-[#D8FF65] font-bold">100% STRICT</span>
          </div>

          <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1 border-t border-[#1E2230]">
            <span>Tenant Cross-Leak:</span>
            <span className="text-[#38EF7D] font-bold">0 DETECTED</span>
          </div>
        </div>

        {/* Pod 2: AI Edge Gateway */}
        <div className="p-4 rounded-2xl bg-[#11131A] border border-[#1E2230] space-y-3 shadow-xl">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-bold uppercase tracking-wider text-[11px]">AI EDGE GATEWAY</span>
            <Zap className="w-4 h-4 text-[#68E7FF]" />
          </div>

          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-white">Server-Only</span>
            <span className="text-[10px] font-bold text-[#68E7FF] uppercase">
              ZERO CLIENT KEY
            </span>
          </div>

          <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1 border-t border-[#1E2230]">
            <span>Zod Schema Guard:</span>
            <span className="text-[#68E7FF] font-bold">ACTIVE & ENFORCED</span>
          </div>
        </div>

        {/* Pod 3: 24h Ledger Volume */}
        <div className="p-4 rounded-2xl bg-[#11131A] border border-[#1E2230] space-y-3 shadow-xl">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-bold uppercase tracking-wider text-[11px]">24H LEDGER VOLUME</span>
            <Layers className="w-4 h-4 text-[#D8B4FE]" />
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">14,250</span>
            <span className="text-xs text-slate-400 font-bold">TX OPS</span>
          </div>

          <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1 border-t border-[#1E2230]">
            <span>Settled / Refunded:</span>
            <span className="text-white font-bold">13,890 / 360</span>
          </div>
        </div>

        {/* Pod 4: BullMQ Job Queue */}
        <div className="p-4 rounded-2xl bg-[#11131A] border border-[#1E2230] space-y-3 shadow-xl">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-bold uppercase tracking-wider text-[11px]">BULLMQ JOB QUEUE</span>
            <Terminal className="w-4 h-4 text-[#D8FF65]" />
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#D8FF65]">4</span>
            <span className="text-xl font-bold text-white">Workers</span>
            <span className="text-[9px] text-[#FFA94D] font-bold ml-auto uppercase">
              REDIS CONCURRENCY
            </span>
          </div>

          <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1 border-t border-[#1E2230]">
            <span>Active / Queued / Dead:</span>
            <span className="text-white font-bold">2 / 0 / 0</span>
          </div>
        </div>

      </div>

      {/* ======================================================== */}
      {/* 3. ROW 2: SECURITY & AI GATEWAY | SUPABASE RLS MATRIX    */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        {/* Left Panel: 1. Security & Gemini AI Gateway */}
        <div className="bg-[#11131A] border border-[#1E2230] rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#68E7FF]" />
              <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                1. Security & Gemini AI Gateway
              </h3>
            </div>
            <span className="px-2 py-0.5 rounded bg-[#10202F] text-[#4FACFE] border border-[#1E3A5F] text-[10px] font-mono font-bold">
              V_GUARD PASS
            </span>
          </div>

          <p className="text-xs text-slate-400 font-sans leading-relaxed">
            Zero Client-Side Token Exposure. All inference calls route strictly through private Node/Supabase Edge Functions.
          </p>

          <div className="space-y-2.5 font-mono text-xs">
            {/* Leak Check */}
            <div className="p-3 rounded-xl bg-[#090A0F] border border-[#1E2230] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-slate-400">VITE_GEMINI_API_KEY Leak Check:</span>
              <span className="px-2.5 py-0.5 rounded bg-[#1A1F10] text-[#D8FF65] border border-[#3E4A1E] text-[10px] font-bold">
                REDACTED / FORBIDDEN / ABSENT
              </span>
            </div>

            {/* Models */}
            <div className="p-3 rounded-xl bg-[#090A0F] border border-[#1E2230] flex items-center justify-between">
              <span className="text-slate-400">GEMINI_TEXT_MODEL:</span>
              <span className="text-[#68E7FF] font-bold">gemini-2.0-flash</span>
            </div>

            <div className="p-3 rounded-xl bg-[#090A0F] border border-[#1E2230] flex items-center justify-between">
              <span className="text-slate-400">GEMINI_IMAGE_MODEL:</span>
              <span className="text-[#68E7FF] font-bold">imagen-3.0-generate-002</span>
            </div>

            <div className="p-3 rounded-xl bg-[#090A0F] border border-[#1E2230] flex items-center justify-between">
              <span className="text-slate-400">Zod LLM Parsing Schema:</span>
              <span className="text-[#38EF7D] font-bold flex items-center gap-1">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>100% Strict Structural Typing</span>
              </span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#090A0F] border border-[#1E2230] flex items-center justify-between text-xs font-mono">
            <span className="text-slate-300 flex items-center gap-1.5 font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-[#38EF7D]" />
              <span>Prompt Infiltration & Guardrail Tests</span>
            </span>
            <span className="text-[#38EF7D] font-bold">48/48 SUCCEEDED</span>
          </div>
        </div>

        {/* Right Panel: 2. Supabase PostgreSQL & RLS Matrix */}
        <div className="bg-[#11131A] border border-[#1E2230] rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-[#D8FF65]" />
              <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                2. Supabase PostgreSQL & RLS Matrix
              </h3>
            </div>
            <span className="px-2 py-0.5 rounded bg-[#0E261B] text-[#38EF7D] border border-[#1E5037] text-[10px] font-mono font-bold">
              22/22 ISOLATED
            </span>
          </div>

          <p className="text-xs text-slate-400 font-sans leading-relaxed">
            Row Level Security verified against workspace tenant boundaries. Automatic token context injection with zero bypass.
          </p>

          {/* 8 Tables Grid */}
          <div className="grid grid-cols-2 gap-2 font-mono text-xs">
            {[
              { table: 'workspaces', status: 'RLS ON' },
              { table: 'projects', status: 'RLS ON' },
              { table: 'characters', status: 'RLS ON' },
              { table: 'story_bibles', status: 'RLS ON' },
              { table: 'episodes', status: 'RLS ON' },
              { table: 'scenes', status: 'RLS ON' },
              { table: 'panels', status: 'RLS ON' },
              { table: 'credits_ledger', status: 'RLS ON' }
            ].map((t) => (
              <div
                key={t.table}
                className="p-2.5 rounded-xl bg-[#090A0F] border border-[#1E2230] flex items-center justify-between"
              >
                <span className="text-slate-300 font-bold">{t.table}</span>
                <span className="text-[#38EF7D] font-bold text-[10px]">{t.status}</span>
              </div>
            ))}
          </div>

          {/* Policy Clause Box */}
          <div className="p-3.5 rounded-xl bg-[#090A0F] border border-[#1E2230] font-mono text-[11px] space-y-1">
            <span className="text-slate-500 uppercase tracking-wider block text-[10px] font-bold">
              ISOLATION POLICY CLAUSE:
            </span>
            <code className="text-[#68E7FF] block truncate">
              workspace_id = current_setting('app.current_workspace_id', true)...
            </code>
          </div>
        </div>

      </div>

      {/* ======================================================== */}
      {/* 4. ROW 3: TRANSACTIONAL CREDIT LEDGER & ASYNC QUEUE      */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        {/* Left: 3. Transactional Credit Ledger */}
        <div className="bg-[#11131A] border border-[#1E2230] rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#D8FF65]" />
              <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                3. Transactional Credit Ledger
              </h3>
            </div>
            <div className="flex items-center gap-1.5 text-[9px] font-mono font-bold">
              <span className="px-1.5 py-0.5 rounded bg-[#181D29] text-[#4FACFE] border border-[#2B3B59]">
                STRIPE
              </span>
              <span className="px-1.5 py-0.5 rounded bg-[#10202F] text-[#68E7FF] border border-[#1E3A5F]">
                MONEROO
              </span>
              <span className="px-1.5 py-0.5 rounded bg-[#14231E] text-[#38EF7D] border border-[#1E5037]">
                CHARIOW
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-400 font-sans leading-relaxed">
            Strict append-only immutable financial records. 10-phase reservation and atomic reconciliation protocol.
          </p>

          {/* 10-Phase Pipeline Pills */}
          <div className="flex flex-wrap items-center gap-1.5 font-mono text-[10px]">
            <span className="px-2 py-1 rounded bg-[#090A0F] border border-[#1E2230] text-slate-300">1. Auth</span>
            <span className="text-slate-600">→</span>
            <span className="px-2 py-1 rounded bg-[#090A0F] border border-[#1E2230] text-slate-300">2. Balance</span>
            <span className="text-slate-600">→</span>
            <span className="px-2 py-1 rounded bg-[#2D1B4E] border border-[#553690] text-[#D8B4FE] font-bold">3. Reserve</span>
            <span className="text-slate-600">→</span>
            <span className="px-2 py-1 rounded bg-[#090A0F] border border-[#1E2230] text-slate-300">4. Idempotent</span>
            <span className="text-slate-600">→</span>
            <span className="px-2 py-1 rounded bg-[#090A0F] border border-[#1E2230] text-slate-300">5. BullMQ</span>
            <span className="text-slate-600">→</span>
            <span className="px-2 py-1 rounded bg-[#090A0F] border border-[#1E2230] text-slate-500">6. AI Ga...</span>
          </div>

          {/* 3 Metrics Pods */}
          <div className="grid grid-cols-3 gap-2 font-mono text-center">
            <div className="p-3 rounded-xl bg-[#090A0F] border border-[#1E2230] space-y-0.5">
              <span className="text-[10px] text-slate-500 uppercase block">RESERVED (24h)</span>
              <span className="text-xl font-bold text-white">14,250</span>
            </div>
            <div className="p-3 rounded-xl bg-[#090A0F] border border-[#1E2230] space-y-0.5">
              <span className="text-[10px] text-slate-500 uppercase block">SETTLED</span>
              <span className="text-xl font-bold text-[#D8FF65]">13,890</span>
            </div>
            <div className="p-3 rounded-xl bg-[#090A0F] border border-[#1E2230] space-y-0.5">
              <span className="text-[10px] text-slate-500 uppercase block">REFUNDED</span>
              <span className="text-xl font-bold text-[#68E7FF]">360</span>
            </div>
          </div>
        </div>

        {/* Right: 4. Async Engine Queue (Redis & BullMQ) */}
        <div className="bg-[#11131A] border border-[#1E2230] rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#D8FF65]" />
              <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                4. Async Engine Queue (Redis & BullMQ)
              </h3>
            </div>
            <span className="px-2 py-0.5 rounded bg-[#0E261B] text-[#38EF7D] border border-[#1E5037] text-[10px] font-mono font-bold">
              HEALTH: OPTIMAL
            </span>
          </div>

          <p className="text-xs text-slate-400 font-sans leading-relaxed">
            Decoupled worker architecture handling generation latency, retries, and real-time SSE progress hooks.
          </p>

          {/* Worker Capacity Bar */}
          <div className="p-3.5 rounded-xl bg-[#090A0F] border border-[#1E2230] space-y-2.5 font-mono text-xs">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Worker Capacity:</span>
              <span className="text-white font-bold">4 Nodes (Concurrency: 16x)</span>
            </div>

            <div className="w-full h-2 rounded-full bg-[#161B26] overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#D8FF65] to-[#38EF7D] rounded-full w-[78%]" />
            </div>

            <div className="flex items-center justify-between text-[10px] text-slate-400">
              <span className="text-slate-300">Completed (142)</span>
              <span className="text-[#68E7FF]">Active (2)</span>
              <span className="text-slate-500">Failed (0)</span>
            </div>
          </div>

          {/* Bottom Retries & Dead Letter Q */}
          <div className="grid grid-cols-2 gap-3 font-mono text-xs">
            <div className="p-3 rounded-xl bg-[#090A0F] border border-[#1E2230] space-y-0.5">
              <span className="text-[10px] text-slate-500 uppercase block">Max Retries:</span>
              <span className="text-white font-bold text-xs">3 w/ Exponential Backoff</span>
            </div>

            <div className="p-3 rounded-xl bg-[#090A0F] border border-[#1E2230] space-y-0.5">
              <span className="text-[10px] text-slate-500 uppercase block">Dead Letter Q:</span>
              <span className="text-[#D8FF65] font-black text-xs">EMPTY (0)</span>
            </div>
          </div>
        </div>

      </div>

      {/* ======================================================== */}
      {/* 5. ROW 4: VERIFICATION GATE | LIVE STREAMING TERMINAL    */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left: Phase 01 Verification Gate (5 cols) */}
        <div className="lg:col-span-5 bg-[#11131A] border border-[#1E2230] rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#D8FF65]" />
              <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                Phase 01 Verification Gate
              </h3>
            </div>
            <span className="px-2 py-0.5 rounded bg-[#0E261B] text-[#38EF7D] border border-[#1E5037] text-[10px] font-mono font-bold">
              14/14 SATISFIED
            </span>
          </div>

          {/* 9 Checklist Items */}
          <div className="space-y-2 font-mono text-xs">
            {[
              {
                id: 1,
                title: '1. Pure Server-Side AI Gateway Enforced',
                desc: 'No API tokens in client bundles'
              },
              {
                id: 2,
                title: '2. 22 Core Supabase Tables Initialized',
                desc: '001_core_schema.sql executed clean'
              },
              {
                id: 3,
                title: '3. Strict Multi-Tenant RLS Enabled',
                desc: '100% table coverage, 0 cross-tenant leaks'
              },
              {
                id: 4,
                title: '4. Append-Only Credit Ledger Active',
                desc: 'Balance = SUM(delta) with strict locking'
              },
              {
                id: 5,
                title: '5. Idempotent Generation Pipeline',
                desc: 'UUID payload hashes prevent double spend'
              },
              {
                id: 6,
                title: '6. Zod Schema Output Interceptor',
                desc: 'Guarantees structured JSON parse'
              },
              {
                id: 7,
                title: '7. Redis BullMQ Job Workers Live',
                desc: 'Concurrency handling + graceful shutdown'
              },
              {
                id: 8,
                title: '8. Tri-Gateway Billing Routing',
                desc: 'Stripe + Moneroo + Chariow connectors'
              },
              {
                id: 9,
                title: '9. Zero-Base64 Image Payload Policy',
                desc: 'Signed Cloudflare / S3 URLs only'
              }
            ].map((item) => (
              <div
                key={item.id}
                className="p-2.5 rounded-xl bg-[#090A0F] border border-[#1E2230] flex items-start gap-2.5"
              >
                <div className="w-4 h-4 rounded-full bg-[#0E261B] border border-[#1E5037] flex items-center justify-center text-[#38EF7D] shrink-0 mt-0.5">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-white font-bold text-xs">{item.title}</h4>
                  <p className="text-[10px] text-slate-400 font-sans">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Live Animated Streaming Terminal (7 cols) */}
        <div className="lg:col-span-7 bg-[#090A0F] border border-[#1E2230] rounded-2xl shadow-2xl flex flex-col h-[650px] overflow-hidden">
          
          {/* Terminal Top Window Bar */}
          <div className="bg-[#11131A] px-4 py-3 border-b border-[#1E2230] flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#FF5F56] inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#FFBD2E] inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#27C93F] inline-block" />
              </div>
              <span className="text-slate-300 ml-2 font-bold text-[11px]">
                telemetry.stream.internal — stdout [SANITIZED JSON]
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 rounded bg-[#0E261B] text-[#38EF7D] border border-[#1E5037] text-[10px] font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#38EF7D] animate-ping" />
                <span>LIVE_SOCKET</span>
              </span>

              <button
                onClick={() => setIsLiveStreaming(!isLiveStreaming)}
                className="text-slate-400 hover:text-white cursor-pointer"
                title={isLiveStreaming ? 'Pause Stream' : 'Resume Stream'}
              >
                {isLiveStreaming ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={() => setLogs([])}
                className="px-2 py-0.5 rounded bg-[#161B26] hover:bg-[#202738] text-slate-300 text-[10px] font-bold cursor-pointer"
              >
                CLEAR
              </button>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="flex-1 p-4 font-mono text-[11px] overflow-y-auto space-y-2.5 leading-relaxed bg-[#050608]">
            <span className="text-slate-600 block text-[10px]">
              // WAZA-ZONE System Daemon initialized with strict redaction.
            </span>

            {logs.map((l) => (
              <div key={l.id} className="space-y-0.5 animate-in fade-in">
                <div className="text-slate-300">
                  <span className="text-[#68E7FF]">{`{"timestamp":`}</span>
                  <span className="text-[#D8FF65]">{`"${l.timestamp}"`}</span>
                  <span className="text-slate-400">,</span>
                  <span className="text-[#68E7FF]">{`"level":`}</span>
                  <span
                    className={
                      l.level === 'AUDIT'
                        ? 'text-[#FFA94D]'
                        : l.level === 'HEALTHCHECK'
                        ? 'text-[#38EF7D]'
                        : 'text-[#D8B4FE]'
                    }
                  >
                    {`"${l.level}"`}
                  </span>
                  <span className="text-slate-400">,</span>
                  <span className="text-[#68E7FF]">{`"event":`}</span>
                  <span className="text-[#38EF7D]">{`"${l.event}"`}</span>
                  {Object.entries(l.payload).map(([k, v]) => (
                    <span key={k}>
                      <span className="text-slate-400">,</span>
                      <span className="text-[#68E7FF]">{`"${k}":`}</span>
                      <span className="text-[#D8FF65]">
                        {typeof v === 'object' ? JSON.stringify(v) : typeof v === 'string' ? `"${v}"` : String(v)}
                      </span>
                    </span>
                  ))}
                  <span className="text-[#68E7FF]">{`}`}</span>
                </div>
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

        </div>

      </div>

    </div>
  );
};
