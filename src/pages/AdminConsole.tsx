import React, { useState } from 'react';
import {
  Activity,
  ShieldCheck,
  Cpu,
  Server,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Database,
  Download,
  Zap,
  Terminal,
  Layers,
  Search,
  Filter,
  Check,
  MoreVertical,
  Clock,
  ArrowRight,
  ExternalLink,
  ShieldAlert,
  SlidersHorizontal,
  Code2,
  RotateCcw,
  Sliders
} from 'lucide-react';

export const AdminConsole: React.FC = () => {
  // Top Actions state
  const [isReloading, setIsReloading] = useState(false);
  const [reloadSuccess, setReloadSuccess] = useState(false);

  // Prompt Tuning Sliders
  const [temperature, setTemperature] = useState(0.68);
  const [topP, setTopP] = useState(0.92);
  const [promptDeployed, setPromptDeployed] = useState(false);

  // Moderation Action State
  const [moderationAction, setModerationAction] = useState<string | null>(null);

  // Search in Tenant Workspaces
  const [workspaceSearch, setWorkspaceSearch] = useState('');
  const [tierFilter, setTierFilter] = useState('ALL');

  // Feature Flags
  const [flags, setFlags] = useState({
    ENABLE_CHARIOW_PAYOUTS: true,
    WEBTOON_CONTINUOUS_RENDER_V2: true,
    EXPERIMENTAL_THREEJS_DEPTH_MAP: false
  });
  const [flagSaved, setFlagSaved] = useState(false);

  // Dry-run simulation
  const [dryRunRunning, setDryRunRunning] = useState(false);
  const [dryRunSuccess, setDryRunSuccess] = useState(false);

  const handleFlushCache = () => {
    setIsReloading(true);
    setTimeout(() => {
      setIsReloading(false);
      setReloadSuccess(true);
      setTimeout(() => setReloadSuccess(false), 3500);
    }, 1200);
  };

  const handleDeployPrompt = () => {
    setPromptDeployed(true);
    setTimeout(() => setPromptDeployed(false), 3000);
  };

  const handleSaveFlags = () => {
    setFlagSaved(true);
    setTimeout(() => setFlagSaved(false), 3000);
  };

  const handleRunMigrationDryRun = () => {
    setDryRunRunning(true);
    setTimeout(() => {
      setDryRunRunning(false);
      setDryRunSuccess(true);
      setTimeout(() => setDryRunSuccess(false), 3500);
    }, 1500);
  };

  // Multi-Tenant Workspaces Data
  const workspacesData = [
    {
      name: 'Kurogane Creative Lab',
      tenantId: 'tenant_id: wks_88291a0c • Tokyo Cluster',
      avatarChar: 'K',
      avatarBg: 'bg-[#2D1B4E] border-[#553690] text-[#D8B4FE]',
      tier: 'PRO STUDIO',
      tierBadge: 'bg-[#2D1B4E] text-[#D8B4FE] border-[#553690]',
      characters: '18 Characters',
      charactersSub: '3 Master Canons',
      panels: '384 Panels',
      panelsSub: '99.4% Hi-Res Export',
      cost: '$42.10',
      tokens: '4,210,000 Tokens',
      safety: '0 Violations',
      safetyOk: true
    },
    {
      name: 'Neo-Kyoto Manga Syndicate',
      tenantId: 'tenant_id: wks_3301ff9b • US-East Cluster',
      avatarChar: 'N',
      avatarBg: 'bg-[#1A1F10] border-[#3E4A1E] text-[#D8FF65]',
      tier: 'STUDIO TIER',
      tierBadge: 'bg-[#1A1F10] text-[#D8FF65] border-[#3E4A1E]',
      characters: '42 Characters',
      charactersSub: '12 Serialized Series',
      panels: '1,200 Panels',
      panelsSub: 'Continuous Webtoon Engine',
      cost: '$114.80',
      tokens: '11.48M Tokens',
      safety: '1 Flag Review',
      safetyOk: false
    },
    {
      name: 'CyberPunk Odyssey Lab',
      tenantId: 'tenant_id: wks_0041ed27 • EU-Central Cluster',
      avatarChar: 'C',
      avatarBg: 'bg-[#10202F] border-[#1E3A5F] text-[#4FACFE]',
      tier: 'CREATOR TIER',
      tierBadge: 'bg-[#141824] text-slate-300 border-[#232A44]',
      characters: '6 Characters',
      charactersSub: '1 One-Shot Comic',
      panels: '82 Panels',
      panelsSub: 'Draft Mode',
      cost: '$9.40',
      tokens: '940K Tokens',
      safety: '0 Violations',
      safetyOk: true
    }
  ];

  const filteredWorkspaces = workspacesData.filter((w) => {
    const matchesSearch =
      w.name.toLowerCase().includes(workspaceSearch.toLowerCase()) ||
      w.tenantId.toLowerCase().includes(workspaceSearch.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-4 max-w-[1780px] mx-auto pb-20 font-sans select-none">
      
      {/* ======================================================== */}
      {/* 1. TOP HEADER STRIP & CLUSTER BADGES                     */}
      {/* ======================================================== */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1E2230] pb-4">
        
        {/* Left Badges & Title */}
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="px-2 py-0.5 rounded bg-[#1A1F10] text-[#D8FF65] border border-[#3E4A1E] font-bold text-[10px]">
              SYSTEM SRE TIER-0
            </span>
            <span className="px-2 py-0.5 rounded bg-[#10202F] text-[#4FACFE] border border-[#1E3A5F] font-bold text-[10px]">
              DOKPLOY CLUSTER: NODE-01
            </span>
            <span className="px-2 py-0.5 rounded bg-[#0E261B] text-[#38EF7D] border border-[#1E5037] font-bold text-[10px] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38EF7D] animate-pulse" />
              <span>99.94% GATEWAY UP</span>
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            Platform Telemetry & AI Gateway Dispatcher
          </h1>

          <p className="text-xs text-slate-400 font-sans max-w-4xl leading-relaxed">
            Real-time multi-tenant runtime metrics, Gemini 2.0 Flash inference routing, prompt configuration trees, and automated safety moderation pipelines across all production creative nodes.
          </p>
        </div>

        {/* Top Right Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 font-mono">
          <button
            onClick={() => alert('Generated audit snapshot for cluster node-01.')}
            className="px-3.5 py-2 rounded-xl bg-[#11131A] hover:bg-[#181B26] border border-[#262C40] text-xs font-bold text-slate-200 flex items-center gap-2 transition-all cursor-pointer shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span>Audit Snapshot</span>
          </button>

          <div className="px-3.5 py-2 rounded-xl bg-[#0E261B] border border-[#1E5037] text-xs font-bold text-[#38EF7D] flex items-center gap-2 shadow-sm">
            <Database className="w-3.5 h-3.5" />
            <span>Supabase RLS: 22/22</span>
          </div>

          <button
            onClick={handleFlushCache}
            disabled={isReloading}
            className="px-4 py-2 rounded-xl bg-[#D8FF65] hover:bg-[#cbfa4e] text-[#090A0F] text-xs font-black font-sans flex items-center gap-1.5 transition-all shadow-lg shadow-[#D8FF65]/20 cursor-pointer"
          >
            <Zap className={`w-3.5 h-3.5 fill-[#090A0F] ${isReloading ? 'animate-spin' : ''}`} />
            <span>{isReloading ? 'Flushing Redis...' : 'Flush Cache & Hot-Reload'}</span>
          </button>
        </div>

      </div>

      {/* Flush Cache Success Banner */}
      {reloadSuccess && (
        <div className="p-3 rounded-xl bg-[#091F14] border border-[#38EF7D]/40 text-xs font-mono text-[#38EF7D] flex items-center gap-2.5 animate-in fade-in">
          <Check className="w-4 h-4 stroke-[3]" />
          <span>CACHE FLUSHED: Invalidation dispatched to Redis BullMQ workers & edge prompt routers.</span>
        </div>
      )}

      {/* Dry Run Banner */}
      {dryRunSuccess && (
        <div className="p-3 rounded-xl bg-[#091F14] border border-[#38EF7D]/40 text-xs font-mono text-[#38EF7D] flex items-center gap-2.5 animate-in fade-in">
          <Check className="w-4 h-4 stroke-[3]" />
          <span>MIGRATION DRY-RUN PASSED: 0 schema conflicts detected across 22 multi-tenant tables.</span>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. TOP ROW: 4 KPI METRIC PODS                            */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
        
        {/* KPI 1: Active Workspaces */}
        <div className="p-4 rounded-2xl bg-[#11131A] border border-[#1E2230] space-y-2 shadow-xl">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-bold uppercase tracking-wider text-[11px]">ACTIVE WORKSPACES</span>
            <Layers className="w-4 h-4 text-[#D8FF65]" />
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">1,420</span>
            <span className="text-xs text-[#38EF7D] font-bold">+8.4% WoW</span>
          </div>

          <div className="text-[11px] text-slate-400 flex items-center gap-1.5 pt-1 border-t border-[#1E2230]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D8FF65]" />
            <span>184 Pro & Studio Seats</span>
          </div>
        </div>

        {/* KPI 2: Story Canons Active */}
        <div className="p-4 rounded-2xl bg-[#11131A] border border-[#1E2230] space-y-2 shadow-xl">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-bold uppercase tracking-wider text-[11px]">STORY CANONS ACTIVE</span>
            <Terminal className="w-4 h-4 text-[#68E7FF]" />
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">8,924</span>
            <span className="px-1.5 py-0.2 rounded bg-[#10202F] text-[#4FACFE] border border-[#1E3A5F] text-[10px] font-bold">
              14.2k Entities
            </span>
          </div>

          <div className="text-[11px] text-[#68E7FF] flex items-center gap-1.5 pt-1 border-t border-[#1E2230]">
            <span>▦</span>
            <span>Vector Embeddings RAG Sync</span>
          </div>
        </div>

        {/* KPI 3: Panels Synthesized */}
        <div className="p-4 rounded-2xl bg-[#11131A] border border-[#1E2230] space-y-2 shadow-xl">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-bold uppercase tracking-wider text-[11px]">PANELS SYNTHESIZED</span>
            <Cpu className="w-4 h-4 text-[#D8B4FE]" />
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">142,500</span>
            <span className="text-[10px] text-[#D8FF65] font-bold">Current Cycle</span>
          </div>

          <div className="text-[11px] text-slate-400 flex items-center gap-1.5 pt-1 border-t border-[#1E2230]">
            <span>☁</span>
            <span>Average render: 2.1s</span>
          </div>
        </div>

        {/* KPI 4: Cluster Security Status */}
        <div className="p-4 rounded-2xl bg-[#11131A] border border-[#1E2230] space-y-2 shadow-xl">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-bold uppercase tracking-wider text-[11px]">CLUSTER SECURITY STATUS</span>
            <ShieldCheck className="w-4 h-4 text-[#38EF7D]" />
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#38EF7D]">ZERO LEAKS</span>
            <span className="text-xs text-[#38EF7D] font-bold">Validated</span>
          </div>

          <div className="text-[11px] text-[#38EF7D] flex items-center gap-1.5 pt-1 border-t border-[#1E2230]">
            <span>🛡</span>
            <span>Postgres RLS: 22/22 Tables</span>
          </div>
        </div>

      </div>

      {/* ======================================================== */}
      {/* 3. ROW 2: AI GATEWAY INGRESS & PROMPT RELEASE ENGINE     */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left: AI Gateway Ingress & Routing Engine (7 cols) */}
        <div className="lg:col-span-7 bg-[#11131A] border border-[#1E2230] rounded-2xl p-5 shadow-xl space-y-4">
          
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#D8FF65]" />
                <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                  AI Gateway Ingress & Routing Engine
                </h3>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                ACTIVE PRIMARY PROVIDERS
              </span>
            </div>

            <span className="px-2.5 py-1 rounded-xl bg-[#10202F] text-[#4FACFE] border border-[#1E3A5F] text-[10px] font-mono font-bold">
              DYNAMIC FAILOVER READY
            </span>
          </div>

          {/* Providers Grid (2 Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 font-mono text-xs">
            
            {/* Provider 1: Gemini 2.0 Flash (Primary) */}
            <div className="p-4 rounded-xl bg-[#090A0F] border border-[#1E2230] space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#38EF7D]" />
                  <span>Gemini 2.0 Flash</span>
                </span>
                <span className="px-2 py-0.5 rounded bg-[#2D1B4E] text-[#D8B4FE] border border-[#553690] text-[9px] font-bold">
                  PRIMARY
                </span>
              </div>

              <p className="text-[11px] text-slate-400 font-sans leading-snug">
                Script generation, Character DNA synthesis, and scene dialogue branching orchestration.
              </p>

              <div className="space-y-1 text-[11px] pt-1 border-t border-[#1E2230]">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">P95 Latency:</span>
                  <span className="text-[#68E7FF] font-bold">240ms</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Error Rate:</span>
                  <span className="text-[#38EF7D] font-bold">0.01% (4 / 32,800)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Cost Unit:</span>
                  <span className="text-slate-300 font-bold">$0.0001 / 1K tokens</span>
                </div>
              </div>

              {/* Sparkline */}
              <div className="pt-2 border-t border-[#1E2230] space-y-1">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-slate-500">Throughput 24h</span>
                  <span className="text-[#D8FF65] font-bold">42.8 req/s</span>
                </div>
                {/* SVG Curve */}
                <svg className="w-full h-8" viewBox="0 0 200 40" fill="none">
                  <path
                    d="M 0 35 Q 25 30 50 25 T 100 20 T 150 15 T 200 10"
                    stroke="#9D78FF"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M 0 35 Q 25 30 50 25 T 100 20 T 150 15 T 200 10 L 200 40 L 0 40 Z"
                    fill="url(#geminiGrad)"
                    opacity="0.2"
                  />
                  <defs>
                    <linearGradient id="geminiGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#9D78FF" />
                      <stop offset="100%" stopColor="#9D78FF" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>

            {/* Provider 2: Imagen 3 & SDXL Cluster */}
            <div className="p-4 rounded-xl bg-[#090A0F] border border-[#1E2230] space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#D8FF65]" />
                  <span>Imagen 3 & SDXL Cluster</span>
                </span>
                <span className="px-2 py-0.5 rounded bg-[#161B26] text-slate-300 border border-[#232A44] text-[9px] font-bold">
                  WORKER POOL
                </span>
              </div>

              <p className="text-[11px] text-slate-400 font-sans leading-snug">
                Diffusion image generation, manga ink style LoRAs, and layered lineart separation.
              </p>

              <div className="space-y-1 text-[11px] pt-1 border-t border-[#1E2230]">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">P95 Latency:</span>
                  <span className="text-[#68E7FF] font-bold">2.42s</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Worker Nodes:</span>
                  <span className="text-[#D8FF65] font-bold">4 Active (A100 SXM4)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">BullMQ Queue:</span>
                  <span className="text-[#38EF7D] font-bold">98.2% Throughput</span>
                </div>
              </div>

              {/* GPU Load Sparkline */}
              <div className="pt-2 border-t border-[#1E2230] space-y-1">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-slate-500">GPU Memory Load</span>
                  <span className="text-[#68E7FF] font-bold">78.4% (62.7 GB)</span>
                </div>
                <svg className="w-full h-8" viewBox="0 0 200 40" fill="none">
                  <path
                    d="M 0 25 Q 30 15 60 22 T 120 18 T 160 12 T 200 16"
                    stroke="#68E7FF"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M 0 25 Q 30 15 60 22 T 120 18 T 160 12 T 200 16 L 200 40 L 0 40 Z"
                    fill="url(#gpuGrad)"
                    opacity="0.2"
                  />
                  <defs>
                    <linearGradient id="gpuGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#68E7FF" />
                      <stop offset="100%" stopColor="#68E7FF" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>

          </div>

          {/* Dynamic Token Rate Limiting Bar */}
          <div className="p-3.5 rounded-xl bg-[#090A0F] border border-[#1E2230] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2.5">
              <Sliders className="w-4 h-4 text-[#D8FF65] shrink-0" />
              <div className="space-y-0.5">
                <span className="font-bold text-white text-[11px] block">
                  Dynamic Token Rate Limiting
                </span>
                <p className="text-[10px] text-slate-400 font-sans">
                  Tier-based throttling active: Free (10 req/min), Pro (120 req/min), Studio (Unlimited)
                </p>
              </div>
            </div>

            <span className="px-2.5 py-1 rounded-xl bg-[#1A1F10] text-[#D8FF65] border border-[#3E4A1E] text-[10px] font-bold shrink-0">
              RATE LIMITER: OPTIMAL
            </span>
          </div>

        </div>

        {/* Right: Prompt Release Engine (5 cols) */}
        <div className="lg:col-span-5 bg-[#11131A] border border-[#1E2230] rounded-2xl p-5 shadow-xl space-y-4">
          
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-[#D8FF65]" />
                <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                  Prompt Release Engine
                </h3>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                JSON SCHEMA & DISPATCHER
              </span>
            </div>

            <span className="px-2 py-0.5 rounded bg-[#1A1F10] text-[#D8FF65] border border-[#3E4A1E] text-[10px] font-mono font-bold flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-[#D8FF65]" />
              <span>SHA #c8f921</span>
            </span>
          </div>

          {/* Active Version & Rollback */}
          <div className="flex items-center justify-between text-xs font-mono">
            <div>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block">
                ACTIVE PROMPT VERSION
              </span>
              <span className="text-white font-bold text-xs">
                sys_story_v3.2.1-shonen
              </span>
            </div>

            <button
              onClick={() => alert('Rolling back to sys_story_v3.2.0-stable...')}
              className="px-2.5 py-1 rounded-lg bg-[#090A0F] border border-[#1E2230] hover:border-slate-500 text-slate-300 text-[11px] font-bold flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Rollback</span>
            </button>
          </div>

          {/* Code Editor Container */}
          <div className="p-3.5 rounded-xl bg-[#090A0F] border border-[#1E2230] font-mono text-[11px] space-y-1.5 leading-relaxed text-slate-300">
            <span className="text-slate-500 block">
              // Directives applied to all story generation requests
            </span>
            <div className="space-y-0.5">
              <span>{`{`}</span>
              <div className="pl-4 space-y-0.5">
                <div>
                  <span className="text-[#68E7FF]">"system_prompt"</span>: <span className="text-[#D8FF65]">"You are the master narrative director for Kurogane Studio..."</span>,
                </div>
                <div>
                  <span className="text-[#68E7FF]">"enforce_json_schema"</span>: <span className="text-[#FFA94D]">true</span>,
                </div>
                <div>
                  <span className="text-[#68E7FF]">"output_format"</span>: <span className="text-[#D8FF65]">"WAZA_CANON_V2_AST"</span>,
                </div>
                <div>
                  <span className="text-[#68E7FF]">"safety_filter_level"</span>: <span className="text-[#D8FF65]">"BLOCK_HIGH_ONLY"</span>
                </div>
              </div>
              <span>{`}`}</span>
            </div>
          </div>

          {/* Temperature & Top-P Sliders */}
          <div className="space-y-3 font-mono text-xs pt-1">
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Temperature (Randomness vs Canon Fidelity)</span>
                <span className="text-[#D8FF65] font-black">{temperature.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min={0}
                max={1}
                step={0.02}
                value={temperature}
                onChange={(e) => setTemperature(Number(e.target.value))}
                className="w-full accent-[#4FACFE] cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Top-P (Nucleus Sampling Threshold)</span>
                <span className="text-[#68E7FF] font-black">{topP.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min={0}
                max={1}
                step={0.02}
                value={topP}
                onChange={(e) => setTopP(Number(e.target.value))}
                className="w-full accent-[#4FACFE] cursor-pointer"
              />
            </div>
          </div>

          {/* Footer Validation & Deploy */}
          <div className="flex items-center justify-between pt-2 border-t border-[#1E2230] font-mono text-xs">
            <span className="text-[#38EF7D] font-bold flex items-center gap-1.5 text-[11px]">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              <span>JSON AST Schema Validated</span>
            </span>

            <button
              onClick={handleDeployPrompt}
              className="px-4 py-2 rounded-xl bg-[#9D78FF] hover:bg-[#8B62FF] text-white font-bold text-xs transition-colors cursor-pointer shadow-md shadow-[#9D78FF]/20"
            >
              {promptDeployed ? 'Deployed!' : 'Deploy New Release'}
            </button>
          </div>

        </div>

      </div>

      {/* ======================================================== */}
      {/* 4. ROW 3: MULTI-TENANT WORKSPACES & AI COST ATTRIBUTION  */}
      {/* ======================================================== */}
      <div className="bg-[#11131A] border border-[#1E2230] rounded-2xl p-5 shadow-xl space-y-4">
        
        {/* Header & Filter */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-[#D8FF65]" />
              <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                Multi-Tenant Workspaces & AI Cost Attribution
              </h3>
            </div>
            <p className="text-xs text-slate-400 font-sans">
              Real-time usage breakdown, token consumption accounting, and RLS tenant boundaries.
            </p>
          </div>

          {/* Search Box */}
          <div className="flex items-center gap-2 font-mono">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                value={workspaceSearch}
                onChange={(e) => setWorkspaceSearch(e.target.value)}
                placeholder="Filter workspaces or IDs..."
                className="bg-[#090A0F] border border-[#1E2230] rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#4FACFE] w-64"
              />
            </div>

            <button className="px-3 py-1.5 rounded-xl bg-[#090A0F] border border-[#1E2230] text-slate-300 text-xs font-bold flex items-center gap-1.5">
              <span>All Tiers</span>
              <span className="text-[10px]">⌄</span>
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto rounded-xl border border-[#1E2230]">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#090A0F] text-slate-400 uppercase text-[10px] tracking-wider border-b border-[#1E2230]">
              <tr>
                <th className="py-3 px-4">WORKSPACE ENTITY</th>
                <th className="py-3 px-4">SUBSCRIPTION TIER</th>
                <th className="py-3 px-4">CHARACTER DNA</th>
                <th className="py-3 px-4">PANELS SYNTHESIZED</th>
                <th className="py-3 px-4">MONTHLY AI COST</th>
                <th className="py-3 px-4">SAFETY FLAGS</th>
                <th className="py-3 px-4 text-right">ADMINISTRATIVE CONTROLS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E2230] bg-[#11131A]">
              {filteredWorkspaces.map((w, idx) => (
                <tr key={idx} className="hover:bg-[#151924] transition-colors">
                  {/* Entity */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-7 h-7 rounded-lg border flex items-center justify-center font-bold text-xs shrink-0 ${w.avatarBg}`}>
                        {w.avatarChar}
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-white font-bold block">{w.name}</span>
                        <span className="text-[10px] text-slate-500 block">{w.tenantId}</span>
                      </div>
                    </div>
                  </td>

                  {/* Tier */}
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-1 rounded-xl border font-bold text-[10px] ${w.tierBadge}`}>
                      {w.tier}
                    </span>
                  </td>

                  {/* Characters */}
                  <td className="py-3 px-4 space-y-0.5">
                    <span className="text-white font-bold block">{w.characters}</span>
                    <span className="text-[10px] text-slate-400 block font-sans">{w.charactersSub}</span>
                  </td>

                  {/* Panels */}
                  <td className="py-3 px-4 space-y-0.5">
                    <span className="text-white font-bold block">{w.panels}</span>
                    <span className="text-[10px] text-[#4FACFE] block font-sans">{w.panelsSub}</span>
                  </td>

                  {/* Cost */}
                  <td className="py-3 px-4 space-y-0.5">
                    <span className="text-[#D8FF65] font-black text-sm block">{w.cost}</span>
                    <span className="text-[10px] text-slate-400 block font-mono">{w.tokens}</span>
                  </td>

                  {/* Safety */}
                  <td className="py-3 px-4">
                    {w.safetyOk ? (
                      <span className="text-[#38EF7D] font-bold text-[11px] flex items-center gap-1">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>{w.safety}</span>
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded bg-[#2D1616] text-[#FF6B6B] border border-[#592626] font-bold text-[10px] flex items-center gap-1 w-fit">
                        <AlertTriangle className="w-3 h-3 stroke-[2.5]" />
                        <span>{w.safety}</span>
                      </span>
                    )}
                  </td>

                  {/* Controls */}
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => alert(`Impersonating workspace: ${w.name}`)}
                        className="px-2.5 py-1 rounded-lg bg-[#090A0F] hover:bg-[#161B26] border border-[#1E2230] text-slate-300 hover:text-white text-[11px] cursor-pointer"
                      >
                        Impersonate
                      </button>

                      <button
                        onClick={() => alert(`Inspecting RLS policies for tenant: ${w.name}`)}
                        className="px-2.5 py-1 rounded-lg bg-[#10202F] hover:bg-[#162A40] border border-[#1E3A5F] text-[#4FACFE] font-bold text-[11px] cursor-pointer"
                      >
                        Inspect RLS
                      </button>

                      <button className="p-1 text-slate-500 hover:text-white cursor-pointer">
                        <MoreVertical className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* ======================================================== */}
      {/* 5. ROW 4: CONTENT MODERATION & FEATURE FLAGS             */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left: Content Moderation & Safety Classifier Queue (7 cols) */}
        <div className="lg:col-span-7 bg-[#11131A] border border-[#1E2230] rounded-2xl p-5 shadow-xl space-y-4">
          
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-[#FF6B6B]" />
                <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                  Content Moderation & Safety Classifier Queue
                </h3>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                AUTOMATED GEMINI SAFETY FILTER INTERCEPTIONS
              </span>
            </div>

            <span className="px-2.5 py-1 rounded-xl bg-[#E02424] text-white text-[10px] font-mono font-black uppercase tracking-wider">
              1 ACTION REQUIRED
            </span>
          </div>

          {/* Intercepted Incident Card */}
          <div className="p-4 rounded-xl bg-[#090A0F] border border-[#1E2230] space-y-3 font-mono text-xs">
            
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-[#10202F] text-[#4FACFE] border border-[#1E3A5F] font-bold text-[10px]">
                  INCIDENT #SEC-4091
                </span>
                <span className="text-slate-400 text-[11px]">
                  Tenant: Neo-Kyoto Manga Syndicate
                </span>
              </div>

              <span className="px-2 py-0.5 rounded bg-[#2D1616] text-[#FF6B6B] border border-[#592626] font-bold text-[10px]">
                NSFW/VIOLENCE TRIGGER
              </span>
            </div>

            {/* Quoted Prompt with Red Highlight */}
            <div className="p-3 rounded-lg bg-[#141824] border border-[#232A44] text-slate-300 font-mono text-xs leading-relaxed">
              <span>"Extreme close-up of cyborg assassin slicing katana through </span>
              <span className="bg-[#E02424] text-white px-1 py-0.5 rounded font-black">
                visceral spinal cord with arterial spray
              </span>
              <span> splashing against neon alley wall, hyperrealistic uncensored gore..."</span>
            </div>

            {/* Classifier Score Pods */}
            <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
              <div className="p-2 rounded-lg bg-[#11131A] border border-[#1E2230]">
                <span className="text-slate-500 uppercase block">Hate Speech</span>
                <span className="text-[#38EF7D] font-bold text-xs">0.02 (Low)</span>
              </div>
              <div className="p-2 rounded-lg bg-[#2D1616] border border-[#592626]">
                <span className="text-slate-400 uppercase block">Graphic Violence</span>
                <span className="text-[#FF6B6B] font-black text-xs">0.96 (CRITICAL)</span>
              </div>
              <div className="p-2 rounded-lg bg-[#11131A] border border-[#1E2230]">
                <span className="text-slate-500 uppercase block">Sexual / NSFW</span>
                <span className="text-[#D8FF65] font-bold text-xs">0.11 (Negligible)</span>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-[#1E2230]">
              <span className="text-slate-500 text-[11px] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>Intercepted 4 mins ago by Edge Proxy Guard</span>
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setModerationAction('Approved False Positive')}
                  className="px-3 py-1.5 rounded-xl bg-[#11131A] hover:bg-[#181B26] border border-[#262C40] text-slate-200 text-xs font-bold transition-all cursor-pointer"
                >
                  Approve False Positive
                </button>

                <button
                  onClick={() => setModerationAction('Account Frozen')}
                  className="px-3.5 py-1.5 rounded-xl bg-[#E02424] hover:bg-[#c81e1e] text-white text-xs font-bold transition-all cursor-pointer shadow-md shadow-[#E02424]/20"
                >
                  Reject & Freeze Account
                </button>
              </div>
            </div>

            {moderationAction && (
              <div className="p-2.5 rounded-lg bg-[#0E261B] border border-[#1E5037] text-[11px] text-[#38EF7D] font-bold">
                Action Executed: {moderationAction}
              </div>
            )}

          </div>

          {/* Cleared Incident Line */}
          <div className="p-3 rounded-xl bg-[#090A0F] border border-[#1E2230] flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-[#38EF7D] stroke-[3]" />
              <span className="text-white font-bold">Incident #SEC-4089:</span>
              <span className="text-slate-400">"Silhouette in toxic fog" auto-cleared after context i...</span>
            </div>
            <span className="text-slate-500 text-[10px]">Resolved by AI Audit</span>
          </div>

          {/* Footer Link */}
          <div className="flex items-center justify-between text-xs font-mono text-slate-500 pt-1">
            <span>Classifier Engine: Gemini Multimodal Guard v2</span>
            <button className="text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer">
              <span>View Full Safety Audit Trail</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

        </div>

        {/* Right: Feature Flags & Migrations (5 cols) */}
        <div className="lg:col-span-5 bg-[#11131A] border border-[#1E2230] rounded-2xl p-5 shadow-xl space-y-4">
          
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#D8FF65]" />
                <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                  Feature Flags & Migrations
                </h3>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                RUNTIME CONFIG & SUPABASE STATE
              </span>
            </div>

            <button
              onClick={() => alert('Syncing runtime flags with Supabase real-time channel...')}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 3 Flags */}
          <div className="space-y-3 font-mono text-xs">
            
            {/* Flag 1 */}
            <div className="p-3 rounded-xl bg-[#090A0F] border border-[#1E2230] space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-xs">ENABLE_CHARIOW_PAYOUTS</span>
                <span className="px-2 py-0.5 rounded bg-[#0E261B] text-[#38EF7D] border border-[#1E5037] text-[10px] font-bold">
                  ENABLED
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-sans">
                Automated creator royalty payouts via Stripe Connect
              </p>
            </div>

            {/* Flag 2 */}
            <div className="p-3 rounded-xl bg-[#090A0F] border border-[#1E2230] space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-xs">WEBTOON_CONTINUOUS_RENDER_V2</span>
                <span className="px-2 py-0.5 rounded bg-[#10202F] text-[#4FACFE] border border-[#1E3A5F] text-[10px] font-bold">
                  ROLLOUT 50%
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-sans">
                Stitchless vertical scroll generation buffer
              </p>
            </div>

            {/* Flag 3 */}
            <div className="p-3 rounded-xl bg-[#090A0F] border border-[#1E2230] space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-xs">EXPERIMENTAL_THREEJS_DEPTH_MAP</span>
                <span className="px-2 py-0.5 rounded bg-[#2D1B4E] text-[#D8B4FE] border border-[#553690] text-[10px] font-bold">
                  STAFF ONLY
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-sans">
                2.5D parallax camera rigs for panel showcase
              </p>
            </div>

          </div>

          {/* POSTGRES SCHEMA MIGRATIONS */}
          <div className="space-y-2 pt-2 border-t border-[#1E2230] font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">
                POSTGRES SCHEMA MIGRATIONS
              </span>
              <span className="text-[10px] text-[#38EF7D] font-bold">
                ALL APPLIED
              </span>
            </div>

            <div className="space-y-1 text-[11px]">
              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Check className="w-3 h-3 text-[#38EF7D]" />
                  <span>001_phase01_schema.sql</span>
                </span>
                <span className="text-slate-500 text-[10px]">Applied (Hash: 9e8a)</span>
              </div>

              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Check className="w-3 h-3 text-[#38EF7D]" />
                  <span>002_billing_ledger_v2.sql</span>
                </span>
                <span className="text-slate-500 text-[10px]">Applied (Hash: fc21)</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 pt-2 font-mono">
            <button
              onClick={handleRunMigrationDryRun}
              disabled={dryRunRunning}
              className="flex-1 py-2 rounded-xl bg-[#090A0F] hover:bg-[#161B26] border border-[#1E2230] text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-slate-400 ${dryRunRunning ? 'animate-spin' : ''}`} />
              <span>{dryRunRunning ? 'Dry-Running...' : 'Run Migration Dry-Run'}</span>
            </button>

            <button
              onClick={handleSaveFlags}
              className="px-4 py-2 rounded-xl bg-[#D8FF65] hover:bg-[#cbfa4e] text-[#090A0F] font-black text-xs font-sans transition-all shadow-md shadow-[#D8FF65]/20 cursor-pointer"
            >
              {flagSaved ? 'Saved!' : 'Save Flag Matrix'}
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
