import React, { useState } from 'react';
import { useProject } from '../context/ProjectContext';
import {
  Sparkles,
  MessageSquare,
  Type,
  Zap,
  RefreshCw,
  Layers,
  Eye,
  EyeOff,
  Plus,
  ShieldCheck,
  CreditCard,
  Scissors,
  Hand,
  MousePointer,
  Crop,
  Grid,
  FileText,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  Volume2,
  Check,
  Printer,
  Maximize2,
  ZoomIn,
  ZoomOut,
  Undo2,
  Redo2,
  ArrowRight,
  ArrowUpRight,
  MoreVertical,
  HelpCircle,
  FolderOpen,
  Circle,
  Radio,
  Cloud,
  Split,
  Square,
  Compass
} from 'lucide-react';

export const PanelEngine: React.FC = () => {
  const { setActiveView } = useProject();

  // Top Bar State
  const [selectedFormat, setSelectedFormat] = useState<'MANGA_B4' | 'WEBTOON' | 'FRANCO_BELGE'>('MANGA_B4');
  const [zoomLevel, setZoomLevel] = useState<number>(100);

  // Active Tool
  const [activeTool, setActiveTool] = useState<'SELECT' | 'PAN' | 'SLICE' | 'CROP' | 'BUBBLE' | 'SFX' | 'HALFTONE'>('SELECT');

  // Print Overlay Toggles
  const [showBleed, setShowBleed] = useState(true);
  const [showSafeZone, setShowSafeZone] = useState(true);
  const [showHalftoneDots, setShowHalftoneDots] = useState(true);

  // Archetype Cut Selection
  const [selectedArchetype, setSelectedArchetype] = useState<'SHONEN_DYNAMIC' | 'SEINEN_ASYM' | 'CLASSIC_6' | 'WATCHMEN_9'>('SHONEN_DYNAMIC');

  // Active Panel on the B4 Sheet
  const [selectedPanelIndex, setSelectedPanelIndex] = useState<number>(3); // Panel 03 selected

  // Right Inspector Tab
  const [inspectorTab, setInspectorTab] = useState<'LETTERING' | 'CAMERA'>('LETTERING');

  // Bubble Morphology
  const [bubbleShape, setBubbleShape] = useState<'ROUND' | 'SCREAM' | 'CLOUD' | 'WHISPER' | 'RADIO'>('SCREAM');
  const [tailAngle, setTailAngle] = useState(315);
  const [autoHyphenation, setAutoHyphenation] = useState(true);

  // Layer Visibility in Layer Stack
  const [layersVisibility, setLayersVisibility] = useState({
    L4: true,
    L3: true,
    L2: true,
    L1: true
  });

  const toggleLayer = (layer: keyof typeof layersVisibility) => {
    setLayersVisibility((prev) => ({ ...prev, [layer]: !prev[layer] }));
  };

  // Render Master Simulation
  const [isRenderingMaster, setIsRenderingMaster] = useState(false);
  const [renderSuccess, setRenderSuccess] = useState(false);

  const handleRenderMaster = () => {
    setIsRenderingMaster(true);
    setTimeout(() => {
      setIsRenderingMaster(false);
      setRenderSuccess(true);
      setTimeout(() => setRenderSuccess(false), 4000);
    }, 1500);
  };

  return (
    <div className="space-y-3.5 max-w-[1780px] mx-auto pb-16 font-sans select-none">
      
      {/* ======================================================== */}
      {/* 1. TOP NAVBAR / PROJECT BREADCRUMB & RUNTIME METRICS     */}
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
            <button onClick={() => setZoomLevel((z) => Math.max(50, z - 10))} className="hover:text-white cursor-pointer">-</button>
            <span className="text-white font-bold text-[11px]">{zoomLevel}%</span>
            <button onClick={() => setZoomLevel((z) => Math.min(200, z + 10))} className="hover:text-white cursor-pointer">+</button>
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
      {/* 2. SUB-HEADER TOOLBAR: FORMAT, TOOLS, BLEED & EXPORTS    */}
      {/* ======================================================== */}
      <div className="bg-[#11131A] border border-[#1E2230] rounded-2xl p-2.5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono shadow-md">
        
        {/* Active Print Standard Indicator */}
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 rounded-xl bg-[#14231E] border border-[#1E5037] text-[#38EF7D] font-bold flex items-center gap-1.5 shadow-sm">
            <span>⭐</span>
            <span>Manga B4 (180×260mm RTL)</span>
          </button>
          <button className="px-2.5 py-1 rounded-xl bg-[#090A0F] border border-[#1E2230] text-slate-400 hover:text-white hidden xl:inline">
            Webtoon Continuous 800PX ∞
          </button>
          <button className="px-2.5 py-1 rounded-xl bg-[#090A0F] border border-[#1E2230] text-slate-400 hover:text-white hidden 2xl:inline">
            Franco-Belge 48CC
          </button>
        </div>

        {/* Center Editing Canvas Tools */}
        <div className="flex items-center gap-1 bg-[#090A0F] p-1 rounded-xl border border-[#1E2230]">
          {[
            { id: 'SELECT', icon: MousePointer, title: 'Select Vector (V)' },
            { id: 'PAN', icon: Hand, title: 'Hand Pan (H)' },
            { id: 'SLICE', icon: Scissors, title: 'Slash Slice Cutter (C)' },
            { id: 'CROP', icon: Crop, title: 'Panel Frame Transform (K)' },
            { id: 'BUBBLE', icon: MessageSquare, title: 'Vector Speech Bubble (B)' },
            { id: 'SFX', icon: Zap, title: 'Onomatopoeia Stamping (S)' },
            { id: 'HALFTONE', icon: Grid, title: 'Halftone Screentone Brush (G)' }
          ].map((tool) => {
            const Icon = tool.icon;
            const isActive = activeTool === tool.id;
            return (
              <button
                key={tool.id}
                onClick={() => setActiveTool(tool.id as any)}
                title={tool.title}
                className={`p-2 rounded-lg transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#1C2333] text-[#68E7FF] border border-[#2B3B59] shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-[#141822]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
              </button>
            );
          })}
        </div>

        {/* Print Bleed & Raster Dot Toggles */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowBleed(!showBleed)}
            className={`px-2.5 py-1 rounded-lg border text-[11px] font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              showBleed
                ? 'bg-[#10202F] border-[#1E3A5F] text-[#4FACFE]'
                : 'bg-[#090A0F] border-[#1E2230] text-slate-500'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#4FACFE]" />
            <span>Bleed 3mm</span>
          </button>

          <button
            onClick={() => setShowSafeZone(!showSafeZone)}
            className={`px-2.5 py-1 rounded-lg border text-[11px] transition-all cursor-pointer ${
              showSafeZone
                ? 'bg-[#090A0F] border-slate-600 text-slate-200'
                : 'bg-[#090A0F] border-[#1E2230] text-slate-500'
            }`}
          >
            Safe Zone
          </button>

          <button
            onClick={() => setShowHalftoneDots(!showHalftoneDots)}
            className={`px-2.5 py-1 rounded-lg border text-[11px] font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              showHalftoneDots
                ? 'bg-[#2D2A14] border-[#524E22] text-[#D8FF65]'
                : 'bg-[#090A0F] border-[#1E2230] text-slate-500'
            }`}
          >
            <Grid className="w-3 h-3" />
            <span>60L Dots</span>
          </button>
        </div>

        {/* Actions CTAs */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#0E261B] border border-[#1E5037] text-xs font-mono font-bold text-[#38EF7D]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>PRE-FLIGHT: READY</span>
          </div>

          <button
            onClick={() => setActiveView('localization')}
            className="px-3.5 py-1.5 rounded-xl bg-[#11131A] hover:bg-[#181B26] border border-[#4FACFE]/50 text-xs font-mono text-[#68E7FF] font-bold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>Export To Localizer</span>
          </button>

          <button
            onClick={handleRenderMaster}
            disabled={isRenderingMaster}
            className="px-4 py-1.5 rounded-xl bg-[#D8FF65] hover:bg-[#cbfa4e] text-[#090A0F] text-xs font-black font-sans flex items-center gap-1.5 transition-all shadow-lg shadow-[#D8FF65]/20 cursor-pointer"
          >
            <Zap className={`w-3.5 h-3.5 ${isRenderingMaster ? 'animate-spin' : ''}`} />
            <span>{isRenderingMaster ? 'Inking 350DPI...' : 'Render Master 12 CR'}</span>
          </button>
        </div>

      </div>

      {/* Render Master Toast */}
      {renderSuccess && (
        <div className="p-3 rounded-xl bg-[#091F14] border border-[#38EF7D]/40 text-xs font-mono text-[#38EF7D] flex items-center gap-2.5 animate-in fade-in">
          <Check className="w-4 h-4 shrink-0 stroke-[3]" />
          <span>B4 MASTER PLATE RENDERED: 4096×5792px 350DPI TIFF + Screen Vectors serialized to /exports/ep01_page04_master.tif.</span>
        </div>
      )}

      {/* ======================================================== */}
      {/* 3. THREE-COLUMN WORKSPACE: STACK | CANVAS | LETTERING    */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

        {/* ====================================================== */}
        {/* COLUMN 1: PAGE STACK & ARCHETYPE CUTS (2 cols)         */}
        {/* ====================================================== */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Section: Page Stack */}
          <div className="bg-[#11131A] border border-[#1E2230] rounded-2xl p-3.5 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold tracking-wider text-slate-300 uppercase flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#4FACFE]" />
                <span>PAGE STACK</span>
              </span>
              <span className="text-[10px] font-mono text-slate-500">
                Act 1 • Ep 1
              </span>
            </div>

            {/* Vertical Page Stack Thumbnails */}
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              {/* Page 01 */}
              <div className="rounded-xl border border-[#1E2230] bg-[#090A0F] p-1.5 space-y-1 group hover:border-slate-600 cursor-pointer">
                <div className="aspect-[3/4] rounded-lg overflow-hidden bg-black/80 relative">
                  <img
                    src="/src/assets/images/waza_b4_panel01_city_1790682710454.jpg"
                    alt="P01"
                    className="w-full h-full object-cover grayscale opacity-80"
                  />
                  <span className="absolute bottom-1 right-1 px-1 bg-black/80 rounded text-[9px] text-slate-400">
                    P01
                  </span>
                </div>
                <p className="text-[10px] font-bold text-slate-300 truncate">Title Splash</p>
              </div>

              {/* Page 02-03 Spread */}
              <div className="rounded-xl border border-[#1E2230] bg-[#090A0F] p-1.5 space-y-1 group hover:border-slate-600 cursor-pointer">
                <div className="aspect-[3/4] rounded-lg overflow-hidden bg-black/80 relative">
                  <img
                    src="/src/assets/images/waza_chrono_blade_beat04_1790681240146.jpg"
                    alt="P02-03"
                    className="w-full h-full object-cover grayscale opacity-80"
                  />
                  <span className="absolute bottom-1 right-1 px-1 bg-black/80 rounded text-[9px] text-slate-400">
                    P02-03
                  </span>
                </div>
                <p className="text-[10px] font-bold text-slate-300 truncate">Double Spr...</p>
              </div>

              {/* Page 04: ACTIVE */}
              <div className="rounded-xl border-2 border-[#D8FF65] bg-[#1A1F10] p-1.5 space-y-1 shadow-lg shadow-[#D8FF65]/10 cursor-pointer relative">
                <span className="absolute -top-1.5 left-2 px-1.5 py-0.2 rounded bg-[#D8FF65] text-[#090A0F] font-black text-[8px] uppercase tracking-wider">
                  ACTIVE
                </span>
                <div className="aspect-[3/4] rounded-lg overflow-hidden bg-black relative border border-[#3E4A1E]">
                  <img
                    src="/src/assets/images/waza_b4_panel03_slash_1790682736817.jpg"
                    alt="P04"
                    className="w-full h-full object-cover grayscale"
                  />
                  <span className="absolute bottom-1 right-1 px-1 bg-black/80 rounded text-[9px] text-[#D8FF65] font-bold">
                    P04
                  </span>
                </div>
                <p className="text-[10px] font-black text-[#D8FF65] truncate">5-Panel Slash</p>
              </div>

              {/* Page 05: Draft */}
              <div className="rounded-xl border border-dashed border-[#1E2230] bg-[#090A0F] p-1.5 flex flex-col items-center justify-center space-y-1 hover:border-slate-500 cursor-pointer">
                <div className="aspect-[3/4] w-full rounded-lg bg-black/40 flex flex-col items-center justify-center text-slate-600">
                  <Plus className="w-4 h-4 mb-1" />
                  <span className="text-[9px]">Draft</span>
                </div>
                <p className="text-[10px] text-slate-500">P05</p>
              </div>
            </div>
          </div>

          {/* Section: Archetype Cuts */}
          <div className="bg-[#11131A] border border-[#1E2230] rounded-2xl p-3.5 shadow-xl space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold tracking-wider text-slate-300 uppercase flex items-center gap-1.5">
                <Scissors className="w-3.5 h-3.5 text-[#D8FF65]" />
                <span>ARCHETYPE CUTS</span>
              </span>
              <SlidersHorizontal className="w-3 h-3 text-slate-500" />
            </div>

            <div className="space-y-1.5 font-mono text-xs">
              {/* Preset 1: Shonen Dynamic Slash (Selected) */}
              <div
                onClick={() => setSelectedArchetype('SHONEN_DYNAMIC')}
                className="p-2.5 rounded-xl bg-[#1A1F10] border-2 border-[#D8FF65] text-[#D8FF65] cursor-pointer flex items-start justify-between shadow-md"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 font-black text-[11px]">
                    <Zap className="w-3.5 h-3.5 fill-[#D8FF65]" />
                    <span>Shonen Dynamic Slash</span>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-tight">
                    5 Asymmetric Kinetic Tiers
                  </p>
                </div>
                <Check className="w-4 h-4 text-[#D8FF65] stroke-[3]" />
              </div>

              {/* Preset 2: Seinen Cinematic Asym */}
              <div
                onClick={() => setSelectedArchetype('SEINEN_ASYM')}
                className="p-2.5 rounded-xl bg-[#090A0F] border border-[#1E2230] hover:bg-[#141822] text-slate-300 cursor-pointer space-y-0.5 transition-colors"
              >
                <div className="flex items-center gap-1.5 font-bold text-[11px]">
                  <Split className="w-3.5 h-3.5 text-slate-400" />
                  <span>Seinen Cinematic Asym</span>
                </div>
                <p className="text-[10px] text-slate-500 leading-tight">
                  Heavy Horizontal Tension (4P)
                </p>
              </div>

              {/* Preset 3: Classic 6-Box Grid */}
              <div
                onClick={() => setSelectedArchetype('CLASSIC_6')}
                className="p-2.5 rounded-xl bg-[#090A0F] border border-[#1E2230] hover:bg-[#141822] text-slate-300 cursor-pointer space-y-0.5 transition-colors"
              >
                <div className="flex items-center gap-1.5 font-bold text-[11px]">
                  <Grid className="w-3.5 h-3.5 text-slate-400" />
                  <span>Classic 6-Box Grid</span>
                </div>
                <p className="text-[10px] text-slate-500 leading-tight">
                  Even Paced Dialogue Layout
                </p>
              </div>

              {/* Preset 4: 9-Panel Rigid Watchmen */}
              <div
                onClick={() => setSelectedArchetype('WATCHMEN_9')}
                className="p-2.5 rounded-xl bg-[#090A0F] border border-[#1E2230] hover:bg-[#141822] text-slate-300 cursor-pointer space-y-0.5 transition-colors"
              >
                <div className="flex items-center gap-1.5 font-bold text-[11px]">
                  <Square className="w-3.5 h-3.5 text-slate-400" />
                  <span>9-Panel Rigid Watchmen</span>
                </div>
                <p className="text-[10px] text-slate-500 leading-tight">
                  3×3 Synchronized Beat
                </p>
              </div>
            </div>
          </div>

          {/* Panel Operators */}
          <div className="bg-[#11131A] border border-[#1E2230] rounded-2xl p-3 shadow-xl space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
              PANEL OPERATORS
            </span>
            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
              <button className="p-2 rounded-xl bg-[#090A0F] border border-[#1E2230] hover:border-slate-500 text-slate-200 flex items-center justify-center gap-1.5 cursor-pointer">
                <Scissors className="w-3 h-3 text-[#D8FF65]" />
                <span>Slash Cut</span>
              </button>
              <button className="p-2 rounded-xl bg-[#090A0F] border border-[#1E2230] hover:border-slate-500 text-slate-200 flex items-center justify-center gap-1.5 cursor-pointer">
                <Split className="w-3 h-3 text-[#4FACFE]" />
                <span>Wide Tier</span>
              </button>
            </div>
          </div>

        </div>

        {/* ====================================================== */}
        {/* COLUMN 2: CENTER STAGE - B4 MANGA SHEET CANVAS (7 cols) */}
        {/* ====================================================== */}
        <div className="lg:col-span-7 space-y-3">
          
          {/* Canvas Sheet Metadata Header */}
          <div className="bg-[#11131A] border border-[#1E2230] rounded-xl px-4 py-2 flex flex-wrap items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-3">
              <span className="text-white font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#D8FF65]" />
                <span>B4 SHEET: 250×353MM</span>
              </span>
              <span className="px-2 py-0.5 rounded bg-[#10202F] text-[#4FACFE] border border-[#1E3A5F] text-[10px] font-bold">
                Japanese Safe Trim 220×310mm
              </span>
              <span className="text-slate-400 text-[11px]">Zoom: 100%</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-[#2D1B4E] text-[#D8B4FE] border border-[#553690] text-[10px] font-bold">
                PANEL 03 ACTIVE
              </span>
              <span className="text-slate-400 text-[10px]">Cam: 28mm Dutch (-12°)</span>
              <span className="text-[#38EF7D] text-[10px]">Screentone: 60L 20%</span>
              <MoreVertical className="w-3.5 h-3.5 text-slate-400 cursor-pointer" />
            </div>
          </div>

          {/* THE B4 MANGA PAGE (Photorealistic Pure Inked Manga Sheet) */}
          <div className="relative bg-[#050608] border-2 border-slate-700/80 rounded-2xl p-4 sm:p-6 shadow-2xl overflow-hidden">
            
            {/* Safe Trim Guide Border Overlay */}
            {showSafeZone && (
              <div className="absolute inset-4 sm:inset-6 border border-dashed border-[#4FACFE]/30 pointer-events-none z-30" />
            )}

            {/* Bleed Guide Outer Overlay */}
            {showBleed && (
              <div className="absolute inset-1 border border-dotted border-red-500/20 pointer-events-none z-30" />
            )}

            {/* 5-Panel Shonen Dynamic Layout Grid */}
            <div className="space-y-2.5">
              
              {/* =================================================== */}
              {/* PANEL 01: Top Full-Width Panoramic Skyline (H: 28%) */}
              {/* =================================================== */}
              <div
                onClick={() => setSelectedPanelIndex(1)}
                className={`relative aspect-[16/7] rounded-lg overflow-hidden border-2 bg-black transition-all cursor-pointer group ${
                  selectedPanelIndex === 1
                    ? 'border-[#D8FF65] shadow-lg shadow-[#D8FF65]/10'
                    : 'border-black hover:border-slate-600'
                }`}
              >
                <img
                  src="/src/assets/images/waza_b4_panel01_city_1790682710454.jpg"
                  alt="Panel 01 - City Skyline"
                  className="w-full h-full object-cover grayscale contrast-125"
                />

                {/* Speech Bubble: "TARGET IN RANGE..." */}
                <div className="absolute top-3 left-4 z-20">
                  <div className="relative bg-white text-black px-3.5 py-1.5 rounded-2xl border-2 border-black font-black text-xs tracking-tight shadow-md font-sans">
                    <span>TARGET IN RANGE...</span>
                    {/* Tail Bézier */}
                    <div className="absolute -bottom-2 left-4 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-white" />
                  </div>
                </div>

                {/* Vertical Japanese SFX in Lightning */}
                <div className="absolute top-4 right-12 z-10 text-white font-black text-xl tracking-widest opacity-90 drop-shadow-[0_2px_4px_rgba(0,0,0,1)] select-none font-serif">
                  ドォン
                </div>

                {/* Panel Metric Label */}
                <div className="absolute bottom-1 right-2 z-10 text-[9px] font-mono text-slate-400 bg-black/70 px-1 rounded">
                  P.01 [W:100% H:28%]
                </div>
              </div>

              {/* =================================================== */}
              {/* TIER 2: Asymmetric Split (Panel 02 Eye & Panel 03 Slash) */}
              {/* =================================================== */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5">
                
                {/* PANEL 02: Ren's Cybernetic Eye (Left, 5 cols) */}
                <div
                  onClick={() => setSelectedPanelIndex(2)}
                  className={`md:col-span-5 relative aspect-[1/1] rounded-lg overflow-hidden border-2 bg-black transition-all cursor-pointer group ${
                    selectedPanelIndex === 2
                      ? 'border-[#D8FF65] shadow-lg shadow-[#D8FF65]/10'
                      : 'border-black hover:border-slate-600'
                  }`}
                >
                  <img
                    src="/src/assets/images/waza_b4_panel02_eye_1790682723937.jpg"
                    alt="Panel 02 - Cybernetic Eye"
                    className="w-full h-full object-cover grayscale contrast-150"
                  />

                  {/* SFX: GOGOGO... Rumble (Cyan) */}
                  <div className="absolute bottom-2 left-2 z-20">
                    <span className="text-xl font-black text-[#68E7FF] tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,1)] font-serif block">
                      ゴゴゴ...
                    </span>
                    <span className="text-[8px] font-mono text-[#68E7FF] tracking-widest uppercase block -mt-1 font-bold">
                      RUMBLE
                    </span>
                  </div>

                  {/* Dots top right */}
                  <div className="absolute top-2 right-2 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#68E7FF]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D8FF65]" />
                  </div>
                </div>

                {/* PANEL 03: CLIMAX SWORD SLASH (Right, 7 cols) - SELECTED */}
                <div
                  onClick={() => setSelectedPanelIndex(3)}
                  className={`md:col-span-7 relative aspect-[1/1] rounded-lg overflow-hidden border-2 bg-black transition-all cursor-pointer group ${
                    selectedPanelIndex === 3
                      ? 'border-2 border-[#9D78FF] ring-2 ring-[#9D78FF]/50 shadow-2xl shadow-[#9D78FF]/20'
                      : 'border-black hover:border-slate-600'
                  }`}
                >
                  <img
                    src="/src/assets/images/waza_b4_panel03_slash_1790682736817.jpg"
                    alt="Panel 03 - Action Slash"
                    className="w-full h-full object-cover grayscale contrast-150"
                  />

                  {/* Selected Tag Badge */}
                  <div className="absolute top-2 left-2 z-20 px-2 py-0.5 rounded bg-[#9D78FF] text-white font-mono font-bold text-[9px] uppercase tracking-wider shadow">
                    SELECTED
                  </div>

                  {/* Giant Electric Lime Katakana Onomatopoeia */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
                    <span className="text-4xl md:text-5xl font-black text-[#D8FF65] tracking-widest drop-shadow-[0_4px_12px_rgba(0,0,0,1)] rotate-[-6deg] font-serif">
                      ズバッ!
                    </span>
                    <span className="text-[10px] font-mono font-black text-[#D8FF65] tracking-widest uppercase px-2 py-0.5 rounded bg-black/80 border border-[#D8FF65]/40 mt-1">
                      SFX // ZUBAT_SLASH
                    </span>
                  </div>
                </div>

              </div>

              {/* =================================================== */}
              {/* TIER 3: Bottom Split (Panel 04 Enforcer & Panel 05 Katana) */}
              {/* =================================================== */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5">
                
                {/* PANEL 04: Enforcer on Catwalk (Left, 7 cols) */}
                <div
                  onClick={() => setSelectedPanelIndex(4)}
                  className={`md:col-span-7 relative aspect-[16/10] rounded-lg overflow-hidden border-2 bg-black transition-all cursor-pointer group ${
                    selectedPanelIndex === 4
                      ? 'border-[#D8FF65] shadow-lg shadow-[#D8FF65]/10'
                      : 'border-black hover:border-slate-600'
                  }`}
                >
                  <img
                    src="/src/assets/images/waza_b4_panel04_enforcer_1790682753475.jpg"
                    alt="Panel 04 - Enforcer"
                    className="w-full h-full object-cover grayscale contrast-125"
                  />

                  {/* Speech Burst Balloon: "PURGE PROTOCOL!" */}
                  <div className="absolute top-3 right-4 z-20">
                    <div className="relative bg-white text-black px-3.5 py-1.5 rounded-lg border-2 border-black font-black text-xs tracking-tight shadow-md font-sans">
                      <span>PURGE PROTOCOL!</span>
                      <div className="absolute -bottom-2 right-4 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-white" />
                    </div>
                  </div>
                </div>

                {/* PANEL 05: Katana Light Streak (Right, 5 cols) */}
                <div
                  onClick={() => setSelectedPanelIndex(5)}
                  className={`md:col-span-5 relative aspect-[16/10] rounded-lg overflow-hidden border-2 bg-black transition-all cursor-pointer group ${
                    selectedPanelIndex === 5
                      ? 'border-[#D8FF65] shadow-lg shadow-[#D8FF65]/10'
                      : 'border-black hover:border-slate-600'
                  }`}
                >
                  <img
                    src="/src/assets/images/waza_b4_panel05_katana_1790682760500.jpg"
                    alt="Panel 05 - Katana Flash"
                    className="w-full h-full object-cover grayscale contrast-150"
                  />

                  {/* Whisper Balloon: "...not today." */}
                  <div className="absolute bottom-3 left-4 z-20">
                    <div className="relative bg-black/90 text-slate-200 italic px-3 py-1 rounded-full border border-slate-600 font-serif text-xs shadow-md">
                      <span>...not today.</span>
                    </div>
                  </div>

                  {/* Panel Metric Label */}
                  <div className="absolute bottom-1 right-2 z-10 text-[9px] font-mono text-slate-400 bg-black/70 px-1 rounded">
                    P.05 (BEAT END)
                  </div>
                </div>

              </div>

            </div>

          </div>

          {/* Canvas Bottom Control & Reading Direction Bar */}
          <div className="bg-[#11131A] border border-[#1E2230] rounded-xl px-4 py-2 flex flex-wrap items-center justify-between text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <span className="text-[#38EF7D] font-bold">← MANGA READING FLOW (RIGHT TO LEFT)</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <Maximize2 className="w-3.5 h-3.5 cursor-pointer hover:text-white" />
                <ZoomOut className="w-3.5 h-3.5 cursor-pointer hover:text-white" />
                <span className="text-white font-bold">100%</span>
                <ZoomIn className="w-3.5 h-3.5 cursor-pointer hover:text-white" />
              </div>

              <span className="flex items-center gap-1.5 text-[#D8FF65] bg-[#1A1F10] px-2 py-0.5 rounded border border-[#3E4A1E] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D8FF65]" />
                <span>Inking Mode</span>
              </span>

              <span className="text-slate-500 hidden sm:inline">
                CHRONO BLADE: OMEGA • CH.01 • PAGE 04
              </span>
            </div>
          </div>

        </div>

        {/* ====================================================== */}
        {/* COLUMN 3: RIGHT PANEL - LETTERING & SFX (3 cols)       */}
        {/* ====================================================== */}
        <div className="lg:col-span-3 space-y-4">
          
          {/* Main Inspector Card */}
          <div className="bg-[#11131A] border border-[#1E2230] rounded-2xl p-4 shadow-xl space-y-4">
            
            {/* Inspector Tabs */}
            <div className="flex items-center justify-between border-b border-[#1E2230] pb-2 text-xs font-mono">
              <button
                onClick={() => setInspectorTab('LETTERING')}
                className={`font-black pb-1 transition-all cursor-pointer ${
                  inspectorTab === 'LETTERING'
                    ? 'text-[#D8FF65] border-b-2 border-[#D8FF65]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Lettering & SFX
              </button>
              <button
                onClick={() => setInspectorTab('CAMERA')}
                className={`font-bold pb-1 transition-all cursor-pointer ${
                  inspectorTab === 'CAMERA'
                    ? 'text-[#D8FF65] border-b-2 border-[#D8FF65]'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                Camera & Depth
              </button>
            </div>

            {/* BUBBLE MORPHOLOGY */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                  BUBBLE MORPHOLOGY
                </span>
                <span className="text-[10px] font-mono text-[#4FACFE]">
                  Vector Path Bézier
                </span>
              </div>

              {/* 5 Bubble Presets */}
              <div className="grid grid-cols-5 gap-1.5 text-center font-mono">
                {[
                  { id: 'ROUND', label: 'Round', icon: Circle },
                  { id: 'SCREAM', label: 'Scream', icon: Zap },
                  { id: 'CLOUD', label: 'Cloud', icon: Cloud },
                  { id: 'WHISPER', label: 'Whisper', icon: Circle },
                  { id: 'RADIO', label: 'Radio', icon: Square }
                ].map((b) => {
                  const Icon = b.icon;
                  const isSelected = bubbleShape === b.id;
                  return (
                    <button
                      key={b.id}
                      onClick={() => setBubbleShape(b.id as any)}
                      className={`p-2 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#1A1F10] border-[#D8FF65] text-[#D8FF65] shadow-sm'
                          : 'bg-[#090A0F] border-[#1E2230] text-slate-400 hover:text-white'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 mb-1" />
                      <span className="text-[9px]">{b.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tail Angle & Direction */}
            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-[11px]">Tail Angle / Direction</span>
                <span className="text-[#D8FF65] font-black text-[11px]">315° (Ren Anchor)</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <div className="p-2 rounded-xl bg-[#090A0F] border border-[#1E2230] space-y-0.5">
                  <span className="text-slate-500 uppercase tracking-wider block">Tail Root Width</span>
                  <p className="font-bold text-white text-xs">8.0 PX</p>
                </div>
                <div className="p-2 rounded-xl bg-[#090A0F] border border-[#1E2230] space-y-0.5">
                  <span className="text-slate-500 uppercase tracking-wider block">Tip Taper Curve</span>
                  <p className="font-bold text-[#68E7FF] text-xs">0.85 BÉZ</p>
                </div>
              </div>
            </div>

            {/* TYPOGRAPHY SYSTEM */}
            <div className="space-y-2 pt-2 border-t border-[#1E2230]">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                  TYPOGRAPHY SYSTEM
                </span>
                <span className="text-[10px] font-mono text-[#38EF7D] bg-[#0E261B] border border-[#1E5037] px-1.5 py-0.2 rounded font-bold">
                  0% OVERFLOW SAFE
                </span>
              </div>

              {/* Font Family Dropdown */}
              <div className="p-2.5 rounded-xl bg-[#090A0F] border border-[#1E2230] flex items-center justify-between cursor-pointer">
                <div>
                  <h4 className="text-xs font-bold text-white">Waza Manga Heavy</h4>
                  <p className="text-[10px] font-mono text-slate-500">Embedded OTF • Kanji + Western</p>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </div>

              {/* Size, Leading, Tracking */}
              <div className="grid grid-cols-3 gap-1.5 text-center font-mono">
                <div className="p-2 rounded-xl bg-[#090A0F] border border-[#1E2230]">
                  <span className="text-[9px] text-slate-500 uppercase block">SIZE</span>
                  <span className="font-black text-white text-xs">18 pt</span>
                </div>
                <div className="p-2 rounded-xl bg-[#090A0F] border border-[#1E2230]">
                  <span className="text-[9px] text-slate-500 uppercase block">LEADING</span>
                  <span className="font-black text-white text-xs">105%</span>
                </div>
                <div className="p-2 rounded-xl bg-[#090A0F] border border-[#1E2230]">
                  <span className="text-[9px] text-slate-500 uppercase block">TRACKING</span>
                  <span className="font-black text-[#D8FF65] text-xs">+0.04</span>
                </div>
              </div>

              {/* Auto-Hyphenation Guard Toggle */}
              <div className="flex items-center justify-between pt-1 text-xs font-mono">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <Type className="w-3.5 h-3.5 text-[#4FACFE]" />
                  <span>Auto-Hyphenation Guard</span>
                </span>
                <button
                  onClick={() => setAutoHyphenation(!autoHyphenation)}
                  className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${
                    autoHyphenation ? 'bg-[#9D78FF]' : 'bg-[#1E2230]'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      autoHyphenation ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* ONOMATOPOEIA (SFX) STAMPING */}
            <div className="space-y-2 pt-2 border-t border-[#1E2230]">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                  ONOMATOPOEIA (SFX) STAMPING
                </span>
                <span className="text-[10px] font-mono text-[#D8FF65]">
                  EN ↔ JP SYNC
                </span>
              </div>

              <div className="space-y-1.5 text-xs font-mono">
                {/* SFX 1: ZUBAT */}
                <div className="p-2 rounded-xl bg-[#1A1F10] border border-[#3E4A1E] flex items-center justify-between">
                  <div>
                    <h5 className="font-black text-[#D8FF65] text-xs">ズバッ! (ZUBAT)</h5>
                    <p className="text-[10px] text-slate-400">Blade Slash / High Velocity Strike</p>
                  </div>
                  <span className="text-[9px] font-mono text-[#D8FF65] font-bold uppercase">
                    STAMPED
                  </span>
                </div>

                {/* SFX 2: GOGOGO */}
                <div className="p-2 rounded-xl bg-[#090A0F] border border-[#1E2230] flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-[#68E7FF] text-xs">ゴゴゴ... (GOGOGO)</h5>
                    <p className="text-[10px] text-slate-400">Menacing Sub-bass Energy Rumble</p>
                  </div>
                  <span className="text-[9px] font-mono text-slate-400 font-bold uppercase">
                    STAMPED
                  </span>
                </div>

                {/* SFX 3: BACHI-CHI */}
                <div className="p-2 rounded-xl bg-[#090A0F] border border-[#1E2230] hover:bg-[#141822] flex items-center justify-between cursor-pointer">
                  <div>
                    <h5 className="font-bold text-slate-300 text-xs">バチチ (BACHI-CHI)</h5>
                    <p className="text-[10px] text-slate-500">Electric Plasma Arc Static</p>
                  </div>
                  <Plus className="w-3.5 h-3.5 text-slate-500" />
                </div>
              </div>
            </div>

            {/* PANEL 03 LAYER STACK */}
            <div className="space-y-2 pt-2 border-t border-[#1E2230]">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
                PANEL 03 LAYER STACK
              </span>

              <div className="space-y-1 text-xs font-mono">
                {[
                  { id: 'L4', label: 'L4: Text & Speech Vectors', icon: MessageSquare },
                  { id: 'L3', label: 'L3: SFX & Speedlines FX', icon: Zap },
                  { id: 'L2', label: 'L2: Ren Kurogane (Z: 1.2m)', icon: Circle },
                  { id: 'L1', label: 'L1: Shibuya Void Matte (Z: 18m)', icon: Square }
                ].map((l) => {
                  const isVisible = layersVisibility[l.id as keyof typeof layersVisibility];
                  return (
                    <div
                      key={l.id}
                      className="p-2 rounded-xl bg-[#090A0F] border border-[#1E2230] flex items-center justify-between hover:bg-[#141822]"
                    >
                      <div className="flex items-center gap-2">
                        <l.icon className="w-3 h-3 text-slate-500" />
                        <span className="text-slate-300 text-[11px] font-bold">{l.label}</span>
                      </div>
                      <button
                        onClick={() => toggleLayer(l.id as any)}
                        className="text-slate-500 hover:text-white cursor-pointer"
                      >
                        {isVisible ? <Eye className="w-3.5 h-3.5 text-[#38EF7D]" /> : <EyeOff className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Halftone Screentone Frequency */}
            <div className="p-3 rounded-xl bg-[#090A0F] border border-[#1E2230] flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Halftone Screentone Frequency</span>
              <span className="font-bold text-[#D8FF65]">60 LPI / 45°</span>
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
            CONTINUITY LOCKED: <strong className="text-[#38EF7D]">REN_KUROGANE_DNA#84920491</strong>
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-[11px]">
          <span className="flex items-center gap-1.5 text-slate-400">
            <span>☁</span>
            <span>Auto-saved (2s ago)</span>
          </span>

          <span className="flex items-center gap-1.5 text-[#4FACFE] font-bold">
            <Printer className="w-3.5 h-3.5" />
            <span>350 DPI Master Print (4096×5792px)</span>
          </span>

          <span className="px-2 py-0.5 rounded bg-[#090A0F] text-[#38EF7D] border border-[#1E5037] font-bold">
            {`{ } manga_page_v2.json: Validated`}
          </span>
        </div>
      </div>

    </div>
  );
};
