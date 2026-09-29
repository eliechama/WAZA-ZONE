import React, { useState } from 'react';
import { useProject } from '../context/ProjectContext';
import {
  Globe,
  Languages,
  Lock,
  ShieldCheck,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  ArrowLeftRight,
  Download,
  Zap,
  Clock,
  Printer,
  Archive,
  Film,
  Smartphone,
  BookOpen,
  MessageSquare,
  QrCode,
  FolderOpen,
  ChevronUp,
  ChevronDown,
  Undo2,
  Redo2,
  Check,
  Layers,
  Cpu,
  ExternalLink
} from 'lucide-react';

export const LocalizationView: React.FC = () => {
  const { setActiveView } = useProject();

  // Top Bar Format and Zoom State
  const [selectedFormat, setSelectedFormat] = useState<'MANGA_B4' | 'WEBTOON' | 'FRANCO_BELGE'>('MANGA_B4');
  const [zoomLevel, setZoomLevel] = useState<number>(85);

  // Active Locale Selection
  const [activeLocale, setActiveLocale] = useState<string>('FR-FR');

  // Active Pipeline Preset Selection
  const [selectedPreset, setSelectedPreset] = useState<'PRESET_A' | 'PRESET_B' | 'PRESET_C' | 'PRESET_D'>('PRESET_A');

  // Access Scope
  const [accessScope, setAccessScope] = useState<'PUBLIC' | 'UNLISTED' | 'PRIVATE'>('PUBLIC');

  // Async Execution States
  const [isTranslating, setIsTranslating] = useState(false);
  const [translateSuccess, setTranslateSuccess] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  // Target Locales Matrix Data
  const locales = [
    {
      code: 'EN - US',
      name: 'English (Master Canonical)',
      details: 'Source Script • LTR Standard',
      status: '100% LOCKED',
      statusType: 'locked'
    },
    {
      code: 'JA - JP',
      name: 'Japanese (日本語)',
      details: 'Tategaki Vertical • Katakana SFX Matched',
      status: '100% SYNCED',
      statusType: 'synced'
    },
    {
      code: 'FR - FR',
      name: 'French (Français)',
      details: 'Expansion +14% • Overflow Guard Enabled',
      status: '98% INSPECT',
      statusType: 'inspect'
    },
    {
      code: 'KO - KR',
      name: 'Korean (한국어)',
      details: 'Webtoon Vertical Fit • Dynamic Bubble Kerning',
      status: '100% SYNCED',
      statusType: 'synced'
    },
    {
      code: 'AR - ME',
      name: 'Arabic (العربية)',
      details: 'RTL Inverted Frame Flow • Bubble Tail Flipped',
      status: 'RTL READY',
      statusType: 'rtl'
    },
    {
      code: 'ES - LATAM',
      name: 'Spanish (Español Neutral)',
      details: 'Castilian SFX Excluded • Slang Synced',
      status: '92% SYNCED',
      statusType: 'syncing'
    }
  ];

  // World Bible Lore Terms Locked
  const glossaryTerms = [
    {
      term: 'Chrono Blade',
      desc: 'Proto-Blade artifact • Key lore token',
      token: 'クロノ・ブレード',
      type: 'STRICT ID'
    },
    {
      term: 'Kurogane Syndicate',
      desc: 'Faction name • Do not translate literally',
      token: '黒金シンジケート',
      type: 'CANON',
      isCyan: true
    },
    {
      term: 'Helipad Sub-09',
      desc: 'Designated battlefield coordinate',
      token: 'サブ09ヘリポート',
      type: 'GEO TAG'
    }
  ];

  const handleBatchTranslate = () => {
    setIsTranslating(true);
    setTranslateSuccess(false);
    setTimeout(() => {
      setIsTranslating(false);
      setTranslateSuccess(true);
      setTimeout(() => setTranslateSuccess(false), 4000);
    }, 1200);
  };

  const handleLaunchExport = () => {
    setIsExporting(true);
    setExportSuccess(false);
    setTimeout(() => {
      setIsExporting(false);
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="space-y-4 max-w-[1780px] mx-auto pb-16 font-sans select-none">
      
      {/* ======================================================== */}
      {/* 1. TOP NAVBAR / PROJECT BREADCRUMB                       */}
      {/* ======================================================== */}
      <div className="bg-[#11131A] border border-[#1E2230] rounded-2xl p-3 flex flex-wrap items-center justify-between gap-3 text-xs font-mono shadow-xl">
        
        {/* Project Breadcrumb */}
        <div className="flex items-center gap-2 text-slate-300">
          <FolderOpen className="w-4 h-4 text-[#D8FF65]" />
          <span className="font-extrabold text-white text-sm">CHRONO BLADE: OMEGA</span>
          <span className="text-slate-600">/</span>
          <span className="text-slate-400">Act 01</span>
          <span className="text-slate-600">/</span>
          <span className="text-slate-400">Ep 01</span>
          <span className="text-slate-600">/</span>
          <div className="flex items-center gap-1 bg-[#181D29] px-2 py-0.5 rounded border border-[#2B3B59] text-[#68E7FF] font-bold">
            <span>Page 04</span>
            <div className="flex flex-col text-[8px] leading-tight text-slate-500">
              <ChevronUp className="w-2.5 h-2.5 hover:text-white cursor-pointer" />
              <ChevronDown className="w-2.5 h-2.5 hover:text-white cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Quick Format Switcher */}
        <div className="flex items-center gap-1.5 bg-[#090A0F] p-1 rounded-xl border border-[#1E2230] text-[11px]">
          <button
            onClick={() => setSelectedFormat('MANGA_B4')}
            className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
              selectedFormat === 'MANGA_B4'
                ? 'bg-[#1A1F10] text-[#D8FF65] border border-[#3E4A1E]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Manga B4
          </button>
          <button
            onClick={() => setSelectedFormat('WEBTOON')}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
              selectedFormat === 'WEBTOON'
                ? 'bg-[#1A1F10] text-[#D8FF65] border border-[#3E4A1E] font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Webtoon Vertical
          </button>
          <button
            onClick={() => setSelectedFormat('FRANCO_BELGE')}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
              selectedFormat === 'FRANCO_BELGE'
                ? 'bg-[#1A1F10] text-[#D8FF65] border border-[#3E4A1E] font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Franco-Belge 48CC
          </button>
        </div>

        {/* Undo/Redo & Zoom & Credits */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-slate-400">
            <button className="p-1.5 hover:text-white bg-[#090A0F] rounded-lg border border-[#1E2230] cursor-pointer">
              <Undo2 className="w-3.5 h-3.5" />
            </button>
            <button className="p-1.5 hover:text-white bg-[#090A0F] rounded-lg border border-[#1E2230] cursor-pointer">
              <Redo2 className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-1.5 bg-[#090A0F] px-2 py-1 rounded-xl border border-[#1E2230]">
            <button onClick={() => setZoomLevel((z) => Math.max(50, z - 5))} className="hover:text-white cursor-pointer">-</button>
            <span className="text-white font-bold text-[11px]">{zoomLevel}%</span>
            <button onClick={() => setZoomLevel((z) => Math.min(200, z + 5))} className="hover:text-white cursor-pointer">+</button>
          </div>

          <span className="px-2.5 py-1 rounded-xl bg-[#1A1F10] text-[#D8FF65] border border-[#3E4A1E] font-bold flex items-center gap-1">
            <Zap className="w-3.5 h-3.5" />
            <span>4,838 CR</span>
          </span>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#0D211A] border border-[#144A32] text-[#38EF7D] font-bold text-[11px]">
            <span className="w-2 h-2 rounded-full bg-[#38EF7D] animate-pulse" />
            <span>GEMINI 2.0 READY</span>
          </div>

          <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-[#9D78FF] to-[#68E7FF] p-0.5 relative">
            <div className="w-full h-full bg-[#090A0F] rounded-[10px] flex items-center justify-center font-bold text-[10px] text-white">
              H
            </div>
            <span className="absolute -bottom-1 -right-1 px-1 rounded bg-[#D8FF65] text-[#090A0F] font-black text-[8px]">
              PRO
            </span>
          </div>
        </div>

      </div>

      {/* ======================================================== */}
      {/* 2. SUB-HEADER / MODULE HEADER & STATUS PILLS             */}
      {/* ======================================================== */}
      <div className="border-b border-[#1E2230] pb-3">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          
          {/* Module Tag & Title */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="px-2.5 py-0.5 rounded bg-[#2D1B4E] text-[#D8B4FE] border border-[#553690] font-black text-[10px] uppercase">
                MODULE J & K
              </span>
              <span className="text-slate-600">/</span>
              <h2 className="text-xs font-black text-white tracking-wider uppercase">
                LOCALIZATION ENGINE & ASYNC EXPORT MATRIX
              </h2>
              <span className="px-1.5 py-0.2 rounded bg-[#10202F] text-[#4FACFE] border border-[#1E3A5F] text-[9px] font-bold">
                v4.12-PRO
              </span>
            </div>

            {/* Badges Strip */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="px-2.5 py-1 rounded-xl bg-[#090A0F] text-[#68E7FF] border border-[#1E3A5F] flex items-center gap-1.5 font-bold">
                <Lock className="w-3 h-3 text-[#68E7FF]" />
                <span>GLOSSARY LOCK: 14 TERMS ACTIVE</span>
              </span>

              <span className="px-2.5 py-1 rounded-xl bg-[#0D211A] text-[#38EF7D] border border-[#144A32] flex items-center gap-1.5 font-bold">
                <ShieldCheck className="w-3 h-3 text-[#38EF7D]" />
                <span>OVERFLOW GUARD: REAL-TIME SCANNING</span>
              </span>

              <span className="px-2.5 py-1 rounded-xl bg-[#1A1F10] text-[#D8FF65] border border-[#3E4A1E] flex items-center gap-1.5 font-bold">
                <span className="w-2 h-2 rounded-full bg-[#D8FF65] animate-pulse" />
                <span>REDIS / BULLMQ: 3 WORKERS ACTIVE</span>
              </span>

              <span className="px-2.5 py-1 rounded-xl bg-[#141724] text-slate-300 border border-[#23293D] flex items-center gap-1.5 font-bold">
                <Layers className="w-3 h-3 text-slate-400" />
                <span>LEDGER: 4,850 CR</span>
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 font-mono">
            <button
              onClick={handleBatchTranslate}
              disabled={isTranslating}
              className="px-3.5 py-2 rounded-xl bg-[#11131A] hover:bg-[#181B26] border border-[#4FACFE]/50 text-xs font-bold text-[#68E7FF] flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
            >
              <Languages className={`w-3.5 h-3.5 ${isTranslating ? 'animate-spin' : ''}`} />
              <span>{isTranslating ? 'Translating Matrix...' : 'Batch Translate All'}</span>
            </button>

            <button
              onClick={() => {}}
              className="px-3.5 py-2 rounded-xl bg-[#11131A] hover:bg-[#181B26] border border-[#262C40] text-xs font-bold text-slate-200 flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
            >
              <Smartphone className="w-3.5 h-3.5 text-slate-400" />
              <span>Preview Continuous Slice</span>
            </button>

            <button
              onClick={handleLaunchExport}
              disabled={isExporting}
              className="px-4 py-2 rounded-xl bg-[#D8FF65] hover:bg-[#cbfa4e] text-[#090A0F] text-xs font-black font-sans flex items-center gap-1.5 transition-all shadow-lg shadow-[#D8FF65]/20 cursor-pointer"
            >
              <Zap className={`w-3.5 h-3.5 ${isExporting ? 'animate-spin' : ''}`} />
              <span>{isExporting ? 'Dispatching to BullMQ...' : 'Launch Async Export Job'}</span>
            </button>
          </div>

        </div>

        {/* Translation Banner */}
        {translateSuccess && (
          <div className="mt-3 p-3 rounded-xl bg-[#091F14] border border-[#38EF7D]/40 text-xs font-mono text-[#38EF7D] flex items-center gap-2.5 animate-in fade-in">
            <Check className="w-4 h-4 shrink-0 stroke-[3]" />
            <span>TRANSLATION MATRIX COMPLETE: 6 locales synthesized with zero lore drift. French expansion overflow handled with scale compensator.</span>
          </div>
        )}

        {/* Export Banner */}
        {exportSuccess && (
          <div className="mt-3 p-3 rounded-xl bg-[#091F14] border border-[#38EF7D]/40 text-xs font-mono text-[#38EF7D] flex items-center gap-2.5 animate-in fade-in">
            <Check className="w-4 h-4 shrink-0 stroke-[3]" />
            <span>JOB DISPATCHED TO BULLMQ: `job_exp_8829_b4` queued across 3 Redis workers with signed Cloudflare R2 bucket target.</span>
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* 3. TWO-COLUMN WORKSPACE: LEFT (7 COLS) | RIGHT (5 COLS)  */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

        {/* ====================================================== */}
        {/* LEFT COLUMN: TARGET MATRIX, LORE LOCK & BUBBLE (7 COLS)*/}
        {/* ====================================================== */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Card A: Target Language Matrix */}
          <div className="bg-[#11131A] border border-[#1E2230] rounded-2xl p-4 md:p-5 shadow-xl space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#D8FF65]" />
                <h3 className="text-xs font-mono font-bold tracking-wider text-white uppercase">
                  Target Language Matrix
                </h3>
              </div>
              <span className="text-[10px] font-mono text-slate-400 bg-[#090A0F] border border-[#1E2230] px-2 py-0.5 rounded">
                6 LOCALES CONFIGURED
              </span>
            </div>

            {/* Matrix Items */}
            <div className="space-y-2 font-mono text-xs">
              {locales.map((loc) => {
                const isSelected = activeLocale === loc.code;
                return (
                  <div
                    key={loc.code}
                    onClick={() => setActiveLocale(loc.code)}
                    className={`p-3 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#151924] border-[#4FACFE]/70 shadow-md'
                        : 'bg-[#090A0F] border-[#1E2230] hover:bg-[#141822]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="px-2 py-1 rounded bg-[#161B26] text-slate-300 font-bold border border-[#23293D] text-[11px] shrink-0">
                        {loc.code}
                      </span>
                      <div className="space-y-0.5">
                        <h4 className="font-bold text-white text-xs">{loc.name}</h4>
                        <p className={`text-[10px] ${loc.code === 'AR - ME' ? 'text-[#68E7FF]' : 'text-slate-400'}`}>
                          {loc.details}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      {loc.statusType === 'locked' && (
                        <span className="px-2.5 py-0.5 rounded bg-[#0E261B] text-[#38EF7D] border border-[#1E5037] text-[10px] font-bold flex items-center gap-1">
                          <span>{loc.status}</span>
                          <CheckCircle2 className="w-3 h-3 stroke-[2.5]" />
                        </span>
                      )}

                      {loc.statusType === 'synced' && (
                        <span className="px-2.5 py-0.5 rounded bg-[#0E261B] text-[#38EF7D] border border-[#1E5037] text-[10px] font-bold flex items-center gap-1">
                          <span>{loc.status}</span>
                          <CheckCircle2 className="w-3 h-3 stroke-[2.5]" />
                        </span>
                      )}

                      {loc.statusType === 'inspect' && (
                        <span className="px-2.5 py-0.5 rounded bg-[#2D1616] text-[#FF6B6B] border border-[#592626] text-[10px] font-bold flex items-center gap-1">
                          <span>{loc.status}</span>
                          <AlertTriangle className="w-3 h-3 stroke-[2.5]" />
                        </span>
                      )}

                      {loc.statusType === 'rtl' && (
                        <span className="px-2.5 py-0.5 rounded bg-[#10202F] text-[#4FACFE] border border-[#1E3A5F] text-[10px] font-bold flex items-center gap-1">
                          <span>{loc.status}</span>
                          <ArrowLeftRight className="w-3 h-3 stroke-[2.5]" />
                        </span>
                      )}

                      {loc.statusType === 'syncing' && (
                        <span className="px-2.5 py-0.5 rounded bg-[#2B2312] text-[#FFA94D] border border-[#4E3E1E] text-[10px] font-bold flex items-center gap-1">
                          <span>{loc.status}</span>
                          <RefreshCw className="w-3 h-3 stroke-[2.5]" />
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Card B: World Bible & Slang Lock */}
          <div className="bg-[#11131A] border border-[#1E2230] rounded-2xl p-4 md:p-5 shadow-xl space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#D8FF65]" />
                <h3 className="text-xs font-mono font-bold tracking-wider text-white uppercase">
                  World Bible & Slang Lock
                </h3>
              </div>
              <span className="text-[10px] font-mono text-[#38EF7D] bg-[#0E261B] border border-[#1E5037] px-2 py-0.5 rounded font-bold">
                SUPABASE RLS ACTIVE
              </span>
            </div>

            <div className="space-y-2 font-mono text-xs">
              {glossaryTerms.map((g, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-[#090A0F] border border-[#1E2230] flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="space-y-0.5">
                    <h4 className="font-bold text-white text-xs">{g.term}</h4>
                    <p className="text-[10px] text-slate-400">{g.desc}</p>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-center">
                    <span
                      className={`px-2.5 py-1 rounded-lg bg-[#141824] border border-[#232A44] font-bold text-xs ${
                        g.isCyan ? 'text-[#68E7FF]' : 'text-slate-200'
                      }`}
                    >
                      {g.token}
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">
                      {g.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card C: Live Bubble Inspector: Panel 04 */}
          <div className="bg-[#11131A] border border-[#1E2230] rounded-2xl p-4 md:p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#D8FF65]" />
                <h3 className="text-xs font-mono font-bold tracking-wider text-white uppercase">
                  Live Bubble Inspector: Panel 04
                </h3>
              </div>
              <span className="text-[10px] font-mono text-[#D8B4FE] bg-[#2D1B4E] border border-[#553690] px-2 py-0.5 rounded font-bold">
                Bubble #B-041
              </span>
            </div>

            {/* Source (English) vs Target (French) Side-by-Side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {/* Source Card */}
              <div className="p-3.5 rounded-xl bg-[#090A0F] border border-[#1E2230] space-y-2">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block font-bold">
                  SOURCE (ENGLISH)
                </span>
                <p className="text-slate-100 font-serif italic text-sm leading-relaxed">
                  "Too easy. Where is the commandante?"
                </p>
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400 pt-1 border-t border-[#1E2230]">
                  <span>👤</span>
                  <span>Speaker: Ren Kurogane</span>
                </div>
              </div>

              {/* Target Card */}
              <div className="p-3.5 rounded-xl bg-[#090A0F] border border-[#1E2230] space-y-2">
                <span className="text-[10px] font-mono text-[#4FACFE] uppercase tracking-wider block font-bold">
                  TARGET (FRENCH)
                </span>
                <p className="text-slate-100 font-serif italic text-sm leading-relaxed">
                  "Trop facile. Où se cache le commandant ?"
                </p>
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#38EF7D] pt-1 border-t border-[#1E2230]">
                  <Check className="w-3 h-3 stroke-[3]" />
                  <span>Tone: Cynical / Military</span>
                </div>
              </div>
            </div>

            {/* Bubble Vector Capacity Progress Bar */}
            <div className="p-3.5 rounded-xl bg-[#090A0F] border border-[#1E2230] space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Bubble Vector Capacity</span>
                <span className="text-[#D8FF65] font-black">82% Used (18% Safe Margin)</span>
              </div>

              {/* Filled Bar */}
              <div className="w-full h-2 rounded-full bg-[#161B26] overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#38EF7D] to-[#D8FF65] rounded-full w-[82%]" />
              </div>

              <div className="flex flex-wrap items-center justify-between text-[10px] text-slate-400 pt-1">
                <span>Bounding Area: 480x320px</span>
                <span>Font Adapt: -0.5pt Applied</span>
                <span className="text-[#38EF7D] font-bold">STATUS: SAFE / NO OVERFLOW</span>
              </div>
            </div>

            {/* 3 Metric Pods */}
            <div className="grid grid-cols-3 gap-2 font-mono text-center">
              <div className="p-2 rounded-xl bg-[#090A0F] border border-[#1E2230]">
                <span className="text-[9px] text-slate-500 uppercase block">Auto Hyphen</span>
                <span className="text-[#D8FF65] font-black text-xs">ACTIVE</span>
              </div>
              <div className="p-2 rounded-xl bg-[#090A0F] border border-[#1E2230]">
                <span className="text-[9px] text-slate-500 uppercase block">Scale Compensator</span>
                <span className="text-white font-black text-xs">1.04x AUTO</span>
              </div>
              <div className="p-2 rounded-xl bg-[#090A0F] border border-[#1E2230]">
                <span className="text-[9px] text-slate-500 uppercase block">Katakana SFX</span>
                <span className="text-[#4FACFE] font-black text-xs">LAYER PASS</span>
              </div>
            </div>
          </div>

        </div>

        {/* ====================================================== */}
        {/* RIGHT COLUMN: PUBLICATION PRESETS & BULLMQ (5 COLS)    */}
        {/* ====================================================== */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Card 1: Publication Presets */}
          <div className="bg-[#11131A] border border-[#1E2230] rounded-2xl p-4 md:p-5 shadow-xl space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Printer className="w-4 h-4 text-[#D8FF65]" />
                <h3 className="text-xs font-mono font-bold tracking-wider text-white uppercase">
                  Publication Presets
                </h3>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                SELECT PIPELINE TARGET
              </span>
            </div>

            {/* 4 Presets 2x2 Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-mono text-xs">
              
              {/* Preset A */}
              <div
                onClick={() => setSelectedPreset('PRESET_A')}
                className={`p-3 rounded-xl border space-y-2 cursor-pointer transition-all ${
                  selectedPreset === 'PRESET_A'
                    ? 'bg-[#181D29] border-[#4FACFE] ring-1 ring-[#4FACFE]/50 shadow-md'
                    : 'bg-[#090A0F] border-[#1E2230] hover:bg-[#141822]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-bold">PRESET A</span>
                  <span className="px-1.5 py-0.2 rounded bg-[#0E261B] text-[#38EF7D] border border-[#1E5037] text-[9px] font-bold">
                    PRINT
                  </span>
                </div>
                <h4 className="font-bold text-white text-xs leading-snug">
                  Print Master B4 (CMYK PDF/X-1a)
                </h4>
                <p className="text-[10px] text-slate-400 leading-relaxed font-sans">
                  Japanese Trim 220x310mm, 3mm Bleed, Embedded Vector Kanji + TrueType, Screentone Moire Prevention Filter ON.
                </p>
                <div className="flex items-center justify-between text-[10px] pt-1 border-t border-[#1E2230] text-slate-500">
                  <span className="text-white font-bold">350 DPI Lossless</span>
                  <span className="text-[#4FACFE]">PDF/X-1a</span>
                </div>
              </div>

              {/* Preset B */}
              <div
                onClick={() => setSelectedPreset('PRESET_B')}
                className={`p-3 rounded-xl border space-y-2 cursor-pointer transition-all ${
                  selectedPreset === 'PRESET_B'
                    ? 'bg-[#181D29] border-[#4FACFE] ring-1 ring-[#4FACFE]/50 shadow-md'
                    : 'bg-[#090A0F] border-[#1E2230] hover:bg-[#141822]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-bold">PRESET B</span>
                  <span className="px-1.5 py-0.2 rounded bg-[#10202F] text-[#4FACFE] border border-[#1E3A5F] text-[9px] font-bold">
                    ARCHIVE
                  </span>
                </div>
                <h4 className="font-bold text-white text-xs leading-snug">
                  Digital Archive CBZ / CBR
                </h4>
                <p className="text-[10px] text-slate-400 leading-relaxed font-sans">
                  Lossless WebP 4096px, Metadata JSON comicinfo.xml embedded, Chapter-indexed, zero quality loss.
                </p>
                <div className="flex items-center justify-between text-[10px] pt-1 border-t border-[#1E2230] text-slate-500">
                  <span className="text-white font-bold">4096px Max</span>
                  <span className="text-[#68E7FF]">ZIP / WebP</span>
                </div>
              </div>

              {/* Preset C */}
              <div
                onClick={() => setSelectedPreset('PRESET_C')}
                className={`p-3 rounded-xl border space-y-2 cursor-pointer transition-all ${
                  selectedPreset === 'PRESET_C'
                    ? 'bg-[#181D29] border-[#4FACFE] ring-1 ring-[#4FACFE]/50 shadow-md'
                    : 'bg-[#090A0F] border-[#1E2230] hover:bg-[#141822]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-bold">PRESET C</span>
                  <span className="px-1.5 py-0.2 rounded bg-[#1A1F10] text-[#D8FF65] border border-[#3E4A1E] text-[9px] font-bold">
                    WEBTOON
                  </span>
                </div>
                <h4 className="font-bold text-white text-xs leading-snug">
                  Continuous Scroll Slice
                </h4>
                <p className="text-[10px] text-slate-400 leading-relaxed font-sans">
                  Auto-slice 800x1280px tiles, seamless vertical stitch, 0px seam artifacts, optimized for mobile readers.
                </p>
                <div className="flex items-center justify-between text-[10px] pt-1 border-t border-[#1E2230] text-slate-500">
                  <span className="text-white font-bold">Vertical Slice</span>
                  <span className="text-[#D8FF65]">0px Gap</span>
                </div>
              </div>

              {/* Preset D */}
              <div
                onClick={() => setSelectedPreset('PRESET_D')}
                className={`p-3 rounded-xl border space-y-2 cursor-pointer transition-all ${
                  selectedPreset === 'PRESET_D'
                    ? 'bg-[#181D29] border-[#4FACFE] ring-1 ring-[#4FACFE]/50 shadow-md'
                    : 'bg-[#090A0F] border-[#1E2230] hover:bg-[#141822]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-bold">PRESET D</span>
                  <span className="px-1.5 py-0.2 rounded bg-[#2D1B4E] text-[#D8B4FE] border border-[#553690] text-[9px] font-bold">
                    MOTION
                  </span>
                </div>
                <h4 className="font-bold text-white text-xs leading-snug">
                  Social Promo Reel (9:16)
                </h4>
                <p className="text-[10px] text-slate-400 leading-relaxed font-sans">
                  Dynamic panel reveals with SFX sound layer preview, 60fps MP4/WebM render ready for distribution.
                </p>
                <div className="flex items-center justify-between text-[10px] pt-1 border-t border-[#1E2230] text-slate-500">
                  <span className="text-white font-bold">1080x1920</span>
                  <span className="text-[#D8B4FE]">H.265 / AV1</span>
                </div>
              </div>

            </div>
          </div>

          {/* Card 2: Async Worker Queue (BullMQ) */}
          <div className="bg-[#11131A] border border-[#1E2230] rounded-2xl p-4 md:p-5 shadow-xl space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#D8FF65]" />
                <h3 className="text-xs font-mono font-bold tracking-wider text-white uppercase">
                  Async Worker Queue (BullMQ)
                </h3>
              </div>
              <span className="text-[10px] font-mono text-[#D8FF65] flex items-center gap-1.5 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D8FF65] animate-pulse" />
                <span>WORKER #02 BUSY</span>
              </span>
            </div>

            {/* Active Job Bar */}
            <div className="p-3 rounded-xl bg-[#090A0F] border border-[#1E2230] space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[#4FACFE] font-bold">job_exp_8829_b4</span>
                  <span className="text-slate-300">Chrono Blade Ep 01 (FR/JP/EN Multi-Pack)</span>
                </div>
                <span className="text-[#D8FF65] font-black">78%</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1.5 rounded-full bg-[#161B26] overflow-hidden">
                <div className="h-full bg-[#D8FF65] rounded-full w-[78%]" />
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-500">
                <span>Task: Generating 350 DPI CMYK Separations</span>
                <span className="text-slate-400">ETA: ~3.2s remaining</span>
              </div>
            </div>

            {/* Recent Completed Dispatches */}
            <div className="space-y-2 pt-1 font-mono text-xs">
              <div className="flex items-center justify-between text-[10px] text-slate-500 uppercase tracking-wider">
                <span>RECENT COMPLETED DISPATCHES</span>
                <span className="text-[#68E7FF]">SIGNED CLOUDFLARE R2 URL</span>
              </div>

              {/* Dispatch 1 */}
              <div className="p-3 rounded-xl bg-[#090A0F] border border-[#1E2230] flex items-center justify-between gap-2">
                <div className="space-y-0.5 max-w-[80%]">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold text-[11px]">job_exp_8812_cbz</span>
                    <span className="text-slate-400 text-[10px]">Ep 01 Digital Master (WebP 4K)</span>
                  </div>
                  <p className="text-[9px] text-slate-600 truncate font-mono">
                    SHA256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[9px] text-[#38EF7D]">Expires in 23h</span>
                  <button className="p-1.5 rounded-lg bg-[#161B26] hover:bg-[#202738] text-slate-300 hover:text-white border border-[#252D3F] cursor-pointer">
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Dispatch 2 */}
              <div className="p-3 rounded-xl bg-[#090A0F] border border-[#1E2230] flex items-center justify-between gap-2">
                <div className="space-y-0.5 max-w-[80%]">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold text-[11px]">job_slice_7701_kr</span>
                    <span className="text-slate-400 text-[10px]">Ep 01 Webtoon Slices (24 Tiles)</span>
                  </div>
                  <p className="text-[9px] text-slate-600 truncate font-mono">
                    SHA256: 8a5d3f2182c3d182bcf201948a31e8471b302c9182a47291a0293c4b5d6e7f8a
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[9px] text-[#38EF7D]">Expires in 18h</span>
                  <button className="p-1.5 rounded-lg bg-[#161B26] hover:bg-[#202738] text-slate-300 hover:text-white border border-[#252D3F] cursor-pointer">
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Access Scope & Instant Review */}
          <div className="bg-[#11131A] border border-[#1E2230] rounded-2xl p-4 md:p-5 shadow-xl space-y-3.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
              ACCESS SCOPE & INSTANT REVIEW
            </span>

            {/* Scope Pills */}
            <div className="flex items-center gap-2 text-[11px] font-mono">
              <button
                onClick={() => setAccessScope('PUBLIC')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  accessScope === 'PUBLIC'
                    ? 'bg-[#D8FF65] text-[#090A0F]'
                    : 'bg-[#090A0F] border border-[#1E2230] text-slate-400 hover:text-white'
                }`}
              >
                PUBLIC
              </button>

              <button
                onClick={() => setAccessScope('UNLISTED')}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                  accessScope === 'UNLISTED'
                    ? 'bg-[#D8FF65] text-[#090A0F] font-bold'
                    : 'bg-[#090A0F] border border-[#1E2230] text-slate-400 hover:text-white'
                }`}
              >
                UNLISTED
              </button>

              <button
                onClick={() => setAccessScope('PRIVATE')}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                  accessScope === 'PRIVATE'
                    ? 'bg-[#D8FF65] text-[#090A0F] font-bold'
                    : 'bg-[#090A0F] border border-[#1E2230] text-slate-400 hover:text-white'
                }`}
              >
                PRIVATE (TEAM ONLY)
              </button>
            </div>

            {/* QR Code and Live Preview Info */}
            <div className="flex items-center justify-between gap-4 pt-1 font-mono">
              <p className="text-[11px] text-slate-400 leading-relaxed font-sans max-w-[240px]">
                Scan QR with test device to test continuous scroll & speech bubble rendering.
              </p>

              <div className="flex items-center gap-3 shrink-0">
                {/* Visual QR Code Mock */}
                <div className="w-12 h-12 bg-white rounded-lg p-1 flex items-center justify-center shadow">
                  <div className="w-full h-full border-2 border-black grid grid-cols-2 grid-rows-2 p-0.5 gap-0.5">
                    <div className="bg-black rounded-xs" />
                    <div className="bg-black rounded-xs" />
                    <div className="bg-black rounded-xs" />
                    <div className="border border-black" />
                  </div>
                </div>

                <div className="space-y-0.5">
                  <span className="text-[#38EF7D] font-bold text-xs block">
                    LIVE PREVIEW
                  </span>
                  <span className="text-[10px] text-slate-500 block">
                    PORT: 8099/live-stream
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* ======================================================== */}
      {/* 4. BOTTOM STATUS FOOTER BAR                              */}
      {/* ======================================================== */}
      <div className="bg-[#11131A] border border-[#1E2230] rounded-xl px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-400 shadow-md">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#38EF7D] animate-pulse" />
          <span className="text-slate-300">
            CONTINUITY PACKET VALIDATED • <strong className="text-slate-400">IDEMPOTENT EXPORT TOKEN: tok_7f8a92b_09</strong>
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-[11px]">
          <span className="text-[#D8FF65] font-bold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D8FF65]" />
            <span>ZERO-BASE64 STRICT</span>
          </span>

          <span className="text-[#4FACFE] font-bold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4FACFE]" />
            <span>NODE/SUPABASE RLS ACTIVE</span>
          </span>

          <span className="text-[#D8B4FE] font-bold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D8B4FE]" />
            <span>CLOUDFLARE R2 SYNC READY</span>
          </span>
        </div>
      </div>

    </div>
  );
};
