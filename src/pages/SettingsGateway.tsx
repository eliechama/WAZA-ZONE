import React, { useState, useEffect } from 'react';
import {
  Cpu,
  Zap,
  Server,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  Sliders,
  SlidersHorizontal,
  Wifi,
  Clock,
  Layers,
  Copy,
  Check,
  Lock,
  Terminal,
  Activity,
  AlertTriangle,
  Flame,
  Radio,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Database,
  ArrowRight
} from 'lucide-react';

export const SettingsGateway: React.FC = () => {
  // Top Action States
  const [isCommitting, setIsCommitting] = useState(false);
  const [commitSuccess, setCommitSuccess] = useState(false);

  // Fallback Cascade Toggle
  const [autoFallback, setAutoFallback] = useState(true);

  // Mode Tab
  const [tuningMode, setTuningMode] = useState<'MANGA' | 'VISUAL'>('MANGA');

  // Hyperparameters
  const [temperature, setTemperature] = useState(0.68);
  const [topP, setTopP] = useState(0.85);
  const [topK, setTopK] = useState(40);

  // FinOps Cap
  const [spendCap, setSpendCap] = useState('$500.00');
  const [capUpdated, setCapUpdated] = useState(false);

  // Webhook Triggers
  const [webhooks, setWebhooks] = useState({
    discord: true,
    slack: true,
    email: true
  });

  // Copied Fingerprint State
  const [copiedFingerprint, setCopiedFingerprint] = useState(false);
  const [copiedCli, setCopiedCli] = useState(false);

  // Animated Live Telemetry Stream Values
  const [streamPing, setStreamPing] = useState(109);
  const [generationDelay, setGenerationDelay] = useState(2.1);
  const [throughput, setThroughput] = useState(42);
  const [vramUsage, setVramUsage] = useState(68);

  useEffect(() => {
    const interval = setInterval(() => {
      setStreamPing((prev) => Math.min(135, Math.max(92, prev + (Math.floor(Math.random() * 9) - 4))));
      setGenerationDelay((prev) => Number((Math.min(2.4, Math.max(1.9, prev + (Math.random() * 0.1 - 0.05)))).toFixed(1)));
      setThroughput((prev) => Math.min(48, Math.max(38, prev + (Math.floor(Math.random() * 3) - 1))));
      setVramUsage((prev) => Math.min(72, Math.max(64, prev + (Math.floor(Math.random() * 3) - 1))));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleCommitRules = () => {
    setIsCommitting(true);
    setTimeout(() => {
      setIsCommitting(false);
      setCommitSuccess(true);
      setTimeout(() => setCommitSuccess(false), 4000);
    }, 1000);
  };

  const handleResetDefaults = () => {
    setTemperature(0.68);
    setTopP(0.85);
    setTopK(40);
    setAutoFallback(true);
    setSpendCap('$500.00');
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText('waza_live_sec_99a8x8872bca009fa2');
    setCopiedFingerprint(true);
    setTimeout(() => setCopiedFingerprint(false), 2500);
  };

  const handleCopyCli = () => {
    navigator.clipboard.writeText('waza gateway logs --tail');
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2500);
  };

  return (
    <div className="space-y-4 max-w-[1780px] mx-auto pb-20 font-sans select-none">
      
      {/* ======================================================== */}
      {/* 1. TOP HEADER STRIP & CLUSTER BADGES                     */}
      {/* ======================================================== */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1E2230] pb-4">
        
        {/* Left Badges & Title */}
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="px-2 py-0.5 rounded bg-[#D8FF65] text-[#090A0F] font-black text-[10px] shadow-sm">
              AUTONOMOUS NODE V2.4
            </span>
            <span className="text-[#68E7FF] font-bold text-[10px] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#68E7FF] animate-pulse" />
              <span>GATEWAY ROUTE: EDGE CLUSTER AP-EAST-1</span>
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            Settings & AI Gateway
          </h1>

          <p className="text-xs text-slate-400 font-sans max-w-4xl leading-relaxed">
            Autonomous serverless routing, model fallback cascades, FinOps expenditure safeguards, and pgvector character memory indexing for Kurogane Studios.
          </p>
        </div>

        {/* Top Right Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 font-mono">
          <button
            onClick={handleCommitRules}
            disabled={isCommitting}
            className="px-4 py-2 rounded-xl bg-[#D8FF65] hover:bg-[#cbfa4e] text-[#090A0F] text-xs font-black font-sans flex items-center gap-2 transition-all shadow-lg shadow-[#D8FF65]/20 cursor-pointer"
          >
            <CheckCircle2 className={`w-3.5 h-3.5 ${isCommitting ? 'animate-spin' : ''}`} />
            <span>{isCommitting ? 'Deploying to Gate...' : 'Commit Route Rules'}</span>
          </button>

          <button
            onClick={handleResetDefaults}
            className="px-3.5 py-2 rounded-xl bg-[#11131A] hover:bg-[#181B26] border border-[#262C40] text-xs font-bold text-slate-200 flex items-center gap-2 transition-all cursor-pointer shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
            <span>Reset Defaults</span>
          </button>
        </div>

      </div>

      {/* Success Notification Banner */}
      {commitSuccess && (
        <div className="p-3 rounded-xl bg-[#091F14] border border-[#38EF7D]/40 text-xs font-mono text-[#38EF7D] flex items-center gap-2.5 animate-in fade-in">
          <Check className="w-4 h-4 stroke-[3]" />
          <span>ROUTE RULES COMMITTED: Fallback cascade, pgvector similarity threshold, and spend limits pushed to Edge Worker mesh.</span>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. TOP ROW: 4 MODEL NODE CARDS                           */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
        
        {/* Card 1: Gemini 2.0 Flash (Primary) */}
        <div className="p-4 rounded-2xl bg-[#11131A] border border-[#1E2230] space-y-2.5 shadow-xl">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
              PRIMARY LLM
            </span>
            <span className="text-[#38EF7D] text-[10px] font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38EF7D]" />
              <span>99.98%</span>
            </span>
          </div>

          <h3 className="text-base font-extrabold text-white">Gemini 2.0 Flash</h3>
          <p className="text-[11px] text-slate-400 font-sans leading-snug">
            Story Architect, Canon Beats & Script Doctor
          </p>

          <div className="flex items-center justify-between text-[11px] pt-1 border-t border-[#1E2230]">
            <span className="text-slate-500">Active Token Window</span>
            <span className="text-white font-bold">1,048,576 ctx</span>
          </div>
        </div>

        {/* Card 2: Imagen 3 (Raster Diffusion) */}
        <div className="p-4 rounded-2xl bg-[#11131A] border border-[#1E2230] space-y-2.5 shadow-xl">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
              RASTER DIFFUSION
            </span>
            <span className="text-[#38EF7D] text-[10px] font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38EF7D]" />
              <span>Ready</span>
            </span>
          </div>

          <h3 className="text-base font-extrabold text-white">Imagen 3</h3>
          <p className="text-[11px] text-slate-400 font-sans leading-snug">
            Cinematic 300 DPI Multi-Angle Character Canvas
          </p>

          <div className="flex items-center justify-between text-[11px] pt-1 border-t border-[#1E2230]">
            <span className="text-slate-500">Aspect Profiles</span>
            <span className="text-white font-bold">2.39:1 / 16:9 / 9:16</span>
          </div>
        </div>

        {/* Card 3: Claude 3.5 Sonnet (Failover Fallback) */}
        <div className="p-4 rounded-2xl bg-[#11131A] border border-[#1E2230] space-y-2.5 shadow-xl">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
              FAILOVER FALLBACK
            </span>
            <span className="px-1.5 py-0.2 rounded bg-[#10202F] text-[#4FACFE] border border-[#1E3A5F] text-[9px] font-bold">
              Cascade Lv.1
            </span>
          </div>

          <h3 className="text-base font-extrabold text-white">Claude 3.5 Sonnet</h3>
          <p className="text-[11px] text-slate-400 font-sans leading-snug">
            Auto-engaged on HTTP 429 / 503 Gateway spikes
          </p>

          <div className="flex items-center justify-between text-[11px] pt-1 border-t border-[#1E2230]">
            <span className="text-slate-500">Trigger Threshold</span>
            <span className="text-white font-bold">&gt; 3,500ms delay</span>
          </div>
        </div>

        {/* Card 4: Local LoRA Cluster (On-Prem Node) */}
        <div className="p-4 rounded-2xl bg-[#11131A] border border-[#1E2230] space-y-2.5 shadow-xl">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
              ON-PREM NODE
            </span>
            <span className="text-[#FFA94D] text-[10px] font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFA94D]" />
              <span>4x A100</span>
            </span>
          </div>

          <h3 className="text-base font-extrabold text-white">Local LoRA Cluster</h3>
          <p className="text-[11px] text-slate-400 font-sans leading-snug">
            Dockerized ComfyUI Manga Lineart weights
          </p>

          <div className="flex items-center justify-between text-[11px] pt-1 border-t border-[#1E2230]">
            <span className="text-slate-500">VRAM Load</span>
            <span className="text-[#FFA94D] font-bold">{vramUsage}% allocated</span>
          </div>
        </div>

      </div>

      {/* ======================================================== */}
      {/* 3. ROW 2: LIVE TELEMETRY & LATENCY MATRIX CARD           */}
      {/* ======================================================== */}
      <div className="bg-[#11131A] border border-[#1E2230] rounded-2xl p-5 shadow-xl space-y-4">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#D8FF65]" />
              <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                Live Telemetry & Latency Matrix
              </h3>
            </div>
            <p className="text-xs text-slate-400 font-sans">
              Real-time edge proxy analytics across global routing planes
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-[#38EF7D] font-mono text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-[#38EF7D] animate-ping" />
            <span>Live Event Stream: SYNCHRONIZED (100ms cycle)</span>
          </div>
        </div>

        {/* 4 Metrics Pods */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 font-mono">
          
          {/* Pod 1: Stream Ping */}
          <div className="p-4 rounded-xl bg-[#090A0F] border border-[#1E2230] space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span className="text-[10px] uppercase font-bold tracking-wider">STREAM PING</span>
              <Wifi className="w-3.5 h-3.5 text-[#68E7FF]" />
            </div>

            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-[#68E7FF] transition-all">
                {streamPing}
              </span>
              <span className="text-xs text-slate-400">ms</span>
            </div>

            <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-[#1E2230]">
              <span>Optimal: &lt;150ms</span>
              <span className="text-[#68E7FF] font-bold">p50: 98ms</span>
            </div>
          </div>

          {/* Pod 2: P95 Generation Delay */}
          <div className="p-4 rounded-xl bg-[#090A0F] border border-[#1E2230] space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span className="text-[10px] uppercase font-bold tracking-wider">P95 GENERATION DELAY</span>
              <Clock className="w-3.5 h-3.5 text-white" />
            </div>

            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-white transition-all">
                {generationDelay}
              </span>
              <span className="text-xs text-slate-400">sec</span>
            </div>

            <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-[#1E2230]">
              <span>Target: &lt;3.5s</span>
              <span className="text-[#38EF7D] font-bold">Zero Drops</span>
            </div>
          </div>

          {/* Pod 3: Throughput Capacity */}
          <div className="p-4 rounded-xl bg-[#090A0F] border border-[#1E2230] space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span className="text-[10px] uppercase font-bold tracking-wider">THROUGHPUT CAPACITY</span>
              <Layers className="w-3.5 h-3.5 text-[#D8FF65]" />
            </div>

            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-[#D8FF65] transition-all">
                {throughput}
              </span>
              <span className="text-xs text-slate-400">panels / min</span>
            </div>

            <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-[#1E2230]">
              <span>Draft Mode Peak</span>
              <span className="text-slate-300 font-bold">60 Max limit</span>
            </div>
          </div>

          {/* Pod 4: A100 VRAM Pool */}
          <div className="p-4 rounded-xl bg-[#090A0F] border border-[#1E2230] space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span className="text-[10px] uppercase font-bold tracking-wider">A100 VRAM POOL</span>
              <Cpu className="w-3.5 h-3.5 text-[#FFA94D]" />
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-[#FFA94D] transition-all">
                {vramUsage}%
              </span>
              <span className="text-[11px] text-slate-400">217.6 / 320 GB</span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-1.5 rounded-full bg-[#161B26] overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#D8FF65] to-[#FFA94D] rounded-full transition-all duration-500"
                style={{ width: `${vramUsage}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
              <span>Cluster 01-04</span>
              <span className="text-[#FFA94D] font-bold">Thermal: 54°C</span>
            </div>
          </div>

        </div>

        {/* Security Zero-Secret Boundary Banner */}
        <div className="p-3.5 rounded-xl bg-[#090A0F] border border-[#1E2230] flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#1A1F10] border border-[#3E4A1E] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4 text-[#D8FF65]" />
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-white font-bold text-xs">
                  Client-Side Zero-Secret Boundary
                </span>
                <span className="px-1.5 py-0.2 rounded bg-[#2D1B4E] text-[#D8B4FE] border border-[#553690] text-[9px] font-bold">
                  ENFORCED
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-sans">
                Direct browser API keys are strictly forbidden. Requests execute through sovereign backend workers via <strong className="text-[#68E7FF]">@google/genai</strong> Node SDK.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] shrink-0">
            <span className="text-slate-500">Node Pipeline:</span>
            <span className="px-2.5 py-1 rounded-lg bg-[#141724] border border-[#23293D] text-slate-200 font-bold">
              Edge Worker → Supabase Vault → Gemini Gate
            </span>
          </div>
        </div>

      </div>

      {/* ======================================================== */}
      {/* 4. LOWER SECTION: TWO COLUMNS (LEFT 7 COLS | RIGHT 5)    */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* ====================================================== */}
        {/* LEFT COLUMN: MODEL CASCADE & FINOPS (7 COLS)           */}
        {/* ====================================================== */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Card A: Model Cascade & Hyperparameter Tuning */}
          <div className="bg-[#11131A] border border-[#1E2230] rounded-2xl p-5 shadow-xl space-y-4">
            
            {/* Header with Mode Switcher */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[#D8FF65]" />
                  <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                    Model Cascade & Hyperparameter Tuning
                  </h3>
                </div>
                <p className="text-xs text-slate-400 font-sans">
                  Granular sampling profiles optimized for episodic comic authoring
                </p>
              </div>

              {/* Mode Toggle Buttons */}
              <div className="flex items-center bg-[#090A0F] p-1 rounded-xl border border-[#1E2230] text-xs font-mono">
                <button
                  onClick={() => setTuningMode('MANGA')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    tuningMode === 'MANGA'
                      ? 'bg-[#9D78FF] text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Manga Scripting
                </button>
                <button
                  onClick={() => setTuningMode('VISUAL')}
                  className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                    tuningMode === 'VISUAL'
                      ? 'bg-[#9D78FF] text-white font-bold shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Visual Prompts
                </button>
              </div>
            </div>

            {/* Automatic Fallback Cascade on Error */}
            <div className="p-3.5 rounded-xl bg-[#090A0F] border border-[#1E2230] space-y-2.5 font-mono text-xs">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-white font-bold text-xs block">
                    Automatic Fallback Cascade on Error
                  </span>
                  <p className="text-[10px] text-slate-400 font-sans">
                    Seamless reroute on rate limit saturation (HTTP 429) or remote gateway degradation (503)
                  </p>
                </div>

                <button
                  onClick={() => setAutoFallback(!autoFallback)}
                  className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer shrink-0 ${
                    autoFallback ? 'bg-[#9D78FF]' : 'bg-[#1E2230]'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full transition-transform ${
                      autoFallback ? 'translate-x-4 bg-white' : 'translate-x-0 bg-slate-400'
                    }`}
                  />
                </button>
              </div>

              {/* Fallback Chain Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-[10px]">
                <span className="px-2.5 py-1 rounded-lg bg-[#141F1A] border border-[#1E5037] text-[#38EF7D] font-bold flex items-center gap-1.5">
                  <Check className="w-3 h-3 stroke-[3]" />
                  <span>1. Gemini 2.0 Flash (Fast Primary)</span>
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-2.5 py-1 rounded-lg bg-[#10202F] border border-[#1E3A5F] text-[#68E7FF] font-bold flex items-center gap-1.5">
                  <RefreshCw className="w-3 h-3" />
                  <span>2. Claude 3.5 Sonnet (Nuanced Fallback)</span>
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-2.5 py-1 rounded-lg bg-[#161B26] border border-[#232A44] text-slate-300 font-bold">
                  3. Local ComfyUI / Llama-3-70B
                </span>
              </div>
            </div>

            {/* Sampling Parameters (Scene Beats & Dialogue) */}
            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-white font-bold text-xs">
                  Sampling Parameters (Scene Beats & Dialogue)
                </span>
                <span className="px-2 py-0.5 rounded bg-[#1A1F10] text-[#D8FF65] border border-[#3E4A1E] text-[10px] font-bold">
                  Auteur Tuning Preset
                </span>
              </div>

              {/* Temperature Slider */}
              <div className="p-3 rounded-xl bg-[#090A0F] border border-[#1E2230] space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-300">Temperature (Creativity & Dialogue Volatility)</span>
                  <span className="text-[#9D78FF] font-black">{temperature.toFixed(2)}</span>
                </div>

                <input
                  type="range"
                  min={0.1}
                  max={1.0}
                  step={0.01}
                  value={temperature}
                  onChange={(e) => setTemperature(Number(e.target.value))}
                  className="w-full accent-[#9D78FF] cursor-pointer"
                />

                <div className="flex items-center justify-between text-[10px] text-slate-500">
                  <span>Deterministic Canon (0.1)</span>
                  <span>Surreal & Novel (1.0)</span>
                </div>
              </div>

              {/* Dual Sliders: Top-P & Top-K */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Top-P */}
                <div className="p-3 rounded-xl bg-[#090A0F] border border-[#1E2230] space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-300">Top-P (Nucleus Cutoff)</span>
                    <span className="text-[#68E7FF] font-black">{topP.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min={0.1}
                    max={1.0}
                    step={0.05}
                    value={topP}
                    onChange={(e) => setTopP(Number(e.target.value))}
                    className="w-full accent-[#68E7FF] cursor-pointer"
                  />
                </div>

                {/* Top-K */}
                <div className="p-3 rounded-xl bg-[#090A0F] border border-[#1E2230] space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-300">Top-K (Vocabulary Breadth)</span>
                    <span className="text-[#D8FF65] font-black">{topK}</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={100}
                    step={5}
                    value={topK}
                    onChange={(e) => setTopK(Number(e.target.value))}
                    className="w-full accent-[#D8FF65] cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Character Memory Indexer (Vector DNA) */}
            <div className="p-3.5 rounded-xl bg-[#090A0F] border border-[#1E2230] space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-white font-bold text-xs">
                  Character Memory Indexer (Vector DNA)
                </span>
                <span className="px-2 py-0.5 rounded bg-[#10202F] text-[#4FACFE] border border-[#1E3A5F] text-[10px] font-bold">
                  pgvector (cosine-1536)
                </span>
              </div>

              <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                Maintains multi-chapter continuity, character speech nuances, and aesthetic signature constraints via high-dimensional relational embeddings.
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-1 text-[10px] text-slate-400">
                <span className="px-2 py-0.5 rounded bg-[#141724] border border-[#23293D] text-slate-300">
                  Embed Model: text-embedding-004
                </span>
                <span className="px-2 py-0.5 rounded bg-[#141724] border border-[#23293D] text-slate-300">
                  HNSW M=16, efConstruction=64
                </span>
                <span className="px-2 py-0.5 rounded bg-[#1A1F10] text-[#D8FF65] border border-[#3E4A1E] font-bold">
                  Similarity Cutoff: ≥ 0.82
                </span>
              </div>
            </div>

          </div>

          {/* Card B: FinOps Token & Quota Governance */}
          <div className="bg-[#11131A] border border-[#1E2230] rounded-2xl p-5 shadow-xl space-y-4">
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-[#D8FF65]" />
                  <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                    FinOps Token & Quota Governance
                  </h3>
                </div>
                <p className="text-xs text-slate-400 font-sans">
                  Automated inference circuit breakers and spend safeguards
                </p>
              </div>

              <span className="px-2.5 py-1 rounded-xl bg-[#1A1F10] text-[#D8FF65] border border-[#3E4A1E] text-[10px] font-mono font-black">
                KILL-SWITCH ARMED
              </span>
            </div>

            {/* Two Side-by-side Pods */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 font-mono text-xs">
              
              {/* Monthly Hard Spend Ceiling */}
              <div className="p-3.5 rounded-xl bg-[#090A0F] border border-[#1E2230] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-[11px] font-bold">Monthly Hard Spend Ceiling</span>
                  <span className="text-[#D8FF65] font-black">$184.20 / $500.00</span>
                </div>

                <p className="text-[10px] text-slate-400 font-sans leading-snug">
                  Inference instantly falls back to CPU-based mock renderers if 100% is breached, preventing unexpected cloud overages.
                </p>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="text"
                    value={spendCap}
                    onChange={(e) => setSpendCap(e.target.value)}
                    className="bg-[#141724] border border-[#23293D] rounded-lg px-2.5 py-1.5 text-xs text-white font-mono w-28 focus:outline-none focus:border-[#D8FF65]"
                  />
                  <button
                    onClick={() => {
                      setCapUpdated(true);
                      setTimeout(() => setCapUpdated(false), 2500);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#161B26] hover:bg-[#202738] text-slate-200 hover:text-white border border-[#283248] text-xs font-bold transition-all cursor-pointer"
                  >
                    {capUpdated ? 'Updated!' : 'Update Cap'}
                  </button>
                </div>
              </div>

              {/* Per-Panel Inference Estimator */}
              <div className="p-3.5 rounded-xl bg-[#090A0F] border border-[#1E2230] space-y-1.5">
                <span className="text-slate-400 text-[11px] font-bold block">
                  Per-Panel Inference Estimator
                </span>

                <div className="space-y-1 text-[11px] pt-1">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Storyboard Rough Draft</span>
                    <span className="text-[#68E7FF] font-bold">0.8 Credits (~$0.004)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Inked Lineart + Screentone</span>
                    <span className="text-[#68E7FF] font-bold">1.5 Credits (~$0.012)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">350 DPI CMYK Master Double-Spread</span>
                    <span className="text-[#D8FF65] font-black">2.4 Credits (~$0.038)</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Studio Alert Webhook Triggers */}
            <div className="p-3 rounded-xl bg-[#090A0F] border border-[#1E2230] space-y-2 font-mono text-xs">
              <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block">
                Studio Alert Webhook Triggers
              </span>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setWebhooks({ ...webhooks, discord: !webhooks.discord })}
                  className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 cursor-pointer transition-all ${
                    webhooks.discord
                      ? 'bg-[#141F1A] border-[#1E5037] text-white'
                      : 'bg-[#141724] border-[#23293D] text-slate-500'
                  }`}
                >
                  <span>💬 Discord Alert</span>
                  <span className={`w-1.5 h-1.5 rounded-full ${webhooks.discord ? 'bg-[#38EF7D]' : 'bg-slate-600'}`} />
                </button>

                <button
                  onClick={() => setWebhooks({ ...webhooks, slack: !webhooks.slack })}
                  className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 cursor-pointer transition-all ${
                    webhooks.slack
                      ? 'bg-[#141F1A] border-[#1E5037] text-white'
                      : 'bg-[#141724] border-[#23293D] text-slate-500'
                  }`}
                >
                  <span>➤ Slack Production</span>
                  <span className={`w-1.5 h-1.5 rounded-full ${webhooks.slack ? 'bg-[#38EF7D]' : 'bg-slate-600'}`} />
                </button>

                <button
                  onClick={() => setWebhooks({ ...webhooks, email: !webhooks.email })}
                  className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 cursor-pointer transition-all ${
                    webhooks.email
                      ? 'bg-[#141F1A] border-[#1E5037] text-white'
                      : 'bg-[#141724] border-[#23293D] text-slate-500'
                  }`}
                >
                  <span>✉ Studio Exec Email</span>
                  <span className={`w-1.5 h-1.5 rounded-full ${webhooks.email ? 'bg-[#38EF7D]' : 'bg-slate-600'}`} />
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* ====================================================== */}
        {/* RIGHT COLUMN: SECURITY, NODES & CLI (5 COLS)           */}
        {/* ====================================================== */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Card 1: Security & Tenant Governance */}
          <div className="bg-[#11131A] border border-[#1E2230] rounded-2xl p-5 shadow-xl space-y-4">
            
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#D8FF65]" />
                <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                  Security & Tenant Governance
                </h3>
              </div>
              <p className="text-xs text-slate-400 font-sans">
                Enterprise boundary protections and tenant-isolated cryptographic policies.
              </p>
            </div>

            {/* 3 Status Items */}
            <div className="space-y-2.5 font-mono text-xs">
              
              {/* Item 1 */}
              <div className="p-3 rounded-xl bg-[#090A0F] border border-[#1E2230] flex items-center justify-between">
                <div className="space-y-0.5">
                  <h4 className="font-bold text-white text-xs">SOC-2 Type II Certified</h4>
                  <p className="text-[10px] text-slate-500">Audit passed Q4 2024</p>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#0E261B] text-[#38EF7D] border border-[#1E5037] text-[10px] font-bold">
                  VALID
                </span>
              </div>

              {/* Item 2 */}
              <div className="p-3 rounded-xl bg-[#090A0F] border border-[#1E2230] flex items-center justify-between">
                <div className="space-y-0.5">
                  <h4 className="font-bold text-white text-xs">Row-Level Security (RLS)</h4>
                  <p className="text-[10px] text-slate-500">Per-project isolation enabled</p>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#10202F] text-[#4FACFE] border border-[#1E3A5F] text-[10px] font-bold">
                  SCOPED
                </span>
              </div>

              {/* Item 3 */}
              <div className="p-3 rounded-xl bg-[#090A0F] border border-[#1E2230] flex items-center justify-between">
                <div className="space-y-0.5">
                  <h4 className="font-bold text-white text-xs">Cloudflare Turnstile</h4>
                  <p className="text-[10px] text-slate-500">Bot mitigation active on API gates</p>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#2D1B4E] text-[#D8B4FE] border border-[#553690] text-[10px] font-bold">
                  ACTIVE
                </span>
              </div>

            </div>

            {/* Tenant Key Fingerprint */}
            <div className="p-3.5 rounded-xl bg-[#090A0F] border border-[#1E2230] space-y-1.5 font-mono text-xs">
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
                TENANT KEY FINGERPRINT
              </span>

              <div className="flex items-center justify-between bg-[#141724] border border-[#23293D] rounded-xl px-3 py-2 text-slate-300">
                <span className="text-[#D8FF65] font-bold">waza_live_sec_99a8x...009fa2</span>
                <button
                  onClick={handleCopyKey}
                  className="hover:text-white cursor-pointer transition-colors"
                  title="Copy Key"
                >
                  {copiedFingerprint ? <Check className="w-3.5 h-3.5 text-[#38EF7D]" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <p className="text-[10px] text-slate-500 font-sans leading-snug">
                Master API token is never exposed to render threads or front-end bundles.
              </p>
            </div>

          </div>

          {/* Card 2: Active Studio Nodes */}
          <div className="bg-[#11131A] border border-[#1E2230] rounded-2xl p-5 shadow-xl space-y-3.5">
            <div className="flex items-center justify-between font-mono">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Active Studio Nodes
              </h3>
              <span className="text-[10px] text-[#38EF7D] font-bold flex items-center gap-1">
                <span>4 Online</span>
              </span>
            </div>

            {/* 4 Nodes */}
            <div className="space-y-2 font-mono text-xs">
              
              {/* Node 1 */}
              <div className="p-2.5 rounded-xl bg-[#090A0F] border border-[#1E2230] flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#38EF7D]" />
                    <span className="text-white font-bold text-xs">Tokyo-A100-Rack-01</span>
                  </div>
                  <p className="text-[10px] text-slate-500 pl-3">ComfyUI Custom Lineart LoRA</p>
                </div>
                <span className="text-[#38EF7D] font-bold text-[11px]">14ms</span>
              </div>

              {/* Node 2 */}
              <div className="p-2.5 rounded-xl bg-[#090A0F] border border-[#1E2230] flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#38EF7D]" />
                    <span className="text-white font-bold text-xs">Tokyo-A100-Rack-02</span>
                  </div>
                  <p className="text-[10px] text-slate-500 pl-3">Inpainting & Screentone Mesh</p>
                </div>
                <span className="text-[#38EF7D] font-bold text-[11px]">18ms</span>
              </div>

              {/* Node 3 */}
              <div className="p-2.5 rounded-xl bg-[#090A0F] border border-[#1E2230] flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#68E7FF]" />
                    <span className="text-white font-bold text-xs">US-West-Gemini-Direct</span>
                  </div>
                  <p className="text-[10px] text-slate-500 pl-3">Story Architect & Dialogue</p>
                </div>
                <span className="text-[#68E7FF] font-bold text-[11px]">112ms</span>
              </div>

              {/* Node 4 */}
              <div className="p-2.5 rounded-xl bg-[#090A0F] border border-[#1E2230] flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#68E7FF]" />
                    <span className="text-white font-bold text-xs">EU-Central-PgVector</span>
                  </div>
                  <p className="text-[10px] text-slate-500 pl-3">Multi-Tenant Canon Index</p>
                </div>
                <span className="text-[#68E7FF] font-bold text-[11px]">142ms</span>
              </div>

            </div>
          </div>

          {/* Card 3: Telemetry CLI & SDK */}
          <div className="p-4 rounded-2xl bg-[#090A0F] border border-[#1E2230] flex items-center justify-between gap-3 font-mono shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#161B26] border border-[#232A44] flex items-center justify-center shrink-0 text-[#68E7FF]">
                <Terminal className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <span className="text-white font-bold text-xs block">
                  Telemetry CLI & SDK
                </span>
                <p className="text-[10px] text-slate-400">
                  Stream logs via <code className="text-[#68E7FF] font-bold">waza gateway logs --tail</code>
                </p>
              </div>
            </div>

            <button
              onClick={handleCopyCli}
              className="p-2 rounded-xl bg-[#161B26] hover:bg-[#202738] text-slate-300 hover:text-white border border-[#283248] cursor-pointer transition-colors shrink-0"
              title="Copy CLI Command"
            >
              {copiedCli ? <Check className="w-3.5 h-3.5 text-[#38EF7D]" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
