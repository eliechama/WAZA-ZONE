import React, { useState } from 'react';
import {
  Sparkles,
  Zap,
  Shield,
  Globe2,
  Layers,
  BookOpen,
  ArrowRight,
  Play,
  Check,
  X,
  Compass,
  Cpu,
  Lock,
  MessageSquare,
  FileText,
  Sliders,
  User,
  CheckCircle2,
  Terminal,
  Activity,
  ChevronRight
} from 'lucide-react';

import heroPanelImg from '../assets/images/waza_hero_panel_1790673692187.jpg';
import turnaround1Img from '../assets/images/waza_turnaround_1_1790673706903.jpg';
import turnaround2Img from '../assets/images/waza_turnaround_2_1790673720643.jpg';
import turnaround3Img from '../assets/images/waza_turnaround_3_1790673733219.jpg';
import featMicroImg from '../assets/images/waza_feat_micro_1790673744814.jpg';
import featOutfitImg from '../assets/images/waza_feat_outfit_1790673759471.jpg';
import featLightingImg from '../assets/images/waza_feat_lighting_1790673776975.jpg';
import featAgingImg from '../assets/images/waza_feat_aging_1790673789232.jpg';
import showcaseLeftImg from '../assets/images/waza_showcase_left_1790673802571.jpg';
import showcaseRightImg from '../assets/images/waza_showcase_right_1790673815665.jpg';

interface LandingPageProps {
  onEnterApp: () => void;
  onOpenReader: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp, onOpenReader }) => {
  const [isAnnual, setIsAnnual] = useState(true);
  const [slicerFormat, setSlicerFormat] = useState<'TANKOBON' | 'WEBTOON' | 'COMIC'>('TANKOBON');
  const [subscribeEmail, setSubscribeEmail] = useState('');
  const [subscribedSuccess, setSubscribedSuccess] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscribeEmail.trim()) return;
    setSubscribedSuccess(true);
  };

  return (
    <div className="min-h-screen bg-[#06070B] text-slate-100 font-sans selection:bg-[#D8FF65] selection:text-[#06070B] overflow-x-hidden">
      {/* 1. TOP NAVBAR */}
      <header className="sticky top-0 z-50 bg-[#06070B]/90 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Zone 1: Logo & OS Badge */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D8FF65] via-[#68E7FF] to-[#9D78FF] p-0.5 flex items-center justify-center shadow-lg shadow-[#D8FF65]/10">
              <div className="w-full h-full bg-[#06070B] rounded-[6px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#D8FF65]" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-wider text-white">
                WAZA<span className="text-[#D8FF65]">-ZONE</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#68E7FF]/10 text-[#68E7FF] border border-[#68E7FF]/30 font-bold">
                OS v2.4
              </span>
            </div>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold text-slate-300">
            <a href="#features" className="hover:text-[#D8FF65] transition-colors">Features</a>
            <a href="#continuity" className="hover:text-[#D8FF65] transition-colors">Zero-Drift Continuity</a>
            <a href="#multi-format" className="hover:text-[#D8FF65] transition-colors">Multi-Format</a>
            <a href="#showcase" className="hover:text-[#D8FF65] transition-colors">Showcase</a>
            <a href="#pricing" className="hover:text-[#D8FF65] transition-colors">Pricing</a>
            <a href="#docs" className="hover:text-[#D8FF65] transition-colors">Docs</a>
          </nav>

          {/* Zone 3: Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenReader}
              className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#11131A] border border-slate-700 hover:border-[#68E7FF] text-xs font-mono text-slate-300 hover:text-white transition-all"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <BookOpen className="w-3.5 h-3.5 text-[#68E7FF]" />
              <span>Live Reader</span>
            </button>

            <button
              onClick={onEnterApp}
              className="text-xs font-mono text-slate-300 hover:text-white px-3 py-1.5"
            >
              Sign In
            </button>

            <button
              onClick={onEnterApp}
              className="px-4 py-2 rounded-full bg-[#D8FF65] text-[#06070B] font-extrabold text-xs hover:bg-[#cbf54f] shadow-md shadow-[#D8FF65]/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-1.5"
            >
              <span>Start Creating Free</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 cursor-pointer hover:border-[#D8FF65]">
              <User className="w-4 h-4" />
            </div>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative pt-16 pb-24 px-4 lg:px-8 border-b border-slate-800/60">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* Top Pill Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#68E7FF]/10 border border-[#68E7FF]/30 text-[#68E7FF] text-[11px] font-mono mb-8 font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#D8FF65]" />
            <span>WAZA-ZONE OS V2.4 • GEMINI 2.0 FLASH + IMAGEN 3</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08] mb-6 max-w-5xl mx-auto">
            From Raw Premise to <span className="text-[#9D78FF]">100-Chapter</span>{' '}
            <span className="text-[#D8FF65]">Canon</span> with Zero Character Drift.
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base lg:text-lg text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
            The production-grade creative OS for Mangaka, Webtoon auteurs, and serialized comic studios.
            Persistent visual DNA, vector speech balloons, multi-format print export, and serverless AI pipelines.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              onClick={onEnterApp}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#D8FF65] text-[#06070B] font-extrabold text-sm hover:bg-[#cbf54f] shadow-xl shadow-[#D8FF65]/20 transition-all flex items-center justify-center gap-2 group"
            >
              <span>Start Creating Free (500 Credits Included)</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onOpenReader}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#11131A] border border-slate-700 hover:border-slate-500 text-slate-200 font-semibold text-sm transition-all flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4 text-[#68E7FF]" />
              <span>Explore Live Manga Reader</span>
            </button>
          </div>

          {/* Trust Bar */}
          <div className="pt-8 border-t border-slate-800/80">
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-6 font-bold">
              TRUSTED BY 1,400+ CREATIVE WORKSPACES & STUDIOS WORLDWIDE
            </div>
            <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16 text-xs font-mono text-slate-400 font-bold opacity-80">
              <span className="hover:text-white transition-colors">NEO-KYOTO LAB</span>
              <span>•</span>
              <span className="hover:text-white transition-colors">CYBER-INK INC</span>
              <span>•</span>
              <span className="hover:text-white transition-colors">PANELFORCE VR</span>
              <span>•</span>
              <span className="hover:text-white transition-colors">SEIREN MANGAWORKS</span>
              <span>•</span>
              <span className="hover:text-white transition-colors">SHADOW-TOON</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HERO INTERACTIVE SHOWCASE CARD (VALKYRIE PROTOCOL // CH.04) */}
      <section className="py-12 px-4 lg:px-8 border-b border-slate-800/60 bg-[#06070B]">
        <div className="max-w-6xl mx-auto">
          <div className="bg-[#0E1017] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            {/* Window Top Controls */}
            <div className="px-5 py-3 bg-[#090A0F] border-b border-slate-800 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-slate-400 font-bold">Project: VALKYRIE PROTOCOL // CH.04</span>
              </div>

              <div className="flex items-center gap-3 text-[11px]">
                <span className="px-2.5 py-0.5 rounded bg-[#9D78FF]/10 text-[#9D78FF] border border-[#9D78FF]/30 font-bold">
                  3D TONE MATRIX - ACTIVE
                </span>
                <span className="text-slate-500">LATENCY: 620ms</span>
              </div>
            </div>

            {/* Showcase Main Split Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 p-4 lg:p-6 gap-6">
              {/* Left Panel Frame (8 cols) */}
              <div className="lg:col-span-8 relative bg-[#06070B] rounded-xl overflow-hidden border border-slate-800 flex flex-col justify-between min-h-[380px]">
                <img
                  src={heroPanelImg}
                  alt="Valkyrie Protocol Manga Panel"
                  className="w-full h-full object-cover max-h-[460px]"
                />

                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded bg-[#06070B]/90 text-white font-mono font-bold text-[11px] border border-slate-700">
                    PANEL 01 - SCENE 12
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-20 bg-[#06070B]/90 backdrop-blur-md p-3.5 rounded-lg border border-slate-800">
                  <p className="text-sm font-extrabold text-white font-sans tracking-wide">
                    &quot;The singularity won&apos;t wait for your signal.&quot;
                  </p>
                </div>

                <div className="absolute bottom-4 right-4">
                  <span className="px-2.5 py-1 rounded bg-[#D8FF65] text-[#06070B] font-mono font-extrabold text-[10px]">
                    300 DPI READY
                  </span>
                </div>
              </div>

              {/* Right DNA Lock Matrix Sidebar (4 cols) */}
              <div className="lg:col-span-4 bg-[#090A0F] rounded-xl border border-slate-800 p-5 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                    <span className="text-xs font-mono font-bold text-[#D8FF65]">DNA LOCK : REN KUROGANE</span>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold">100.0% DRIFT GUARD</span>
                  </div>

                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans mb-4">
                    Persistent high-dimensional embedding anchoring jawline, ear topology, eye hue (#68E7FF), and cybernetic left arm across every scene generator node.
                  </p>

                  {/* 3 Turnaround Thumbnails */}
                  <div className="grid grid-cols-3 gap-2 my-4">
                    <img src={turnaround1Img} alt="Turnaround 1" className="w-full h-20 rounded-lg object-cover border border-slate-800" />
                    <img src={turnaround2Img} alt="Turnaround 2" className="w-full h-20 rounded-lg object-cover border border-slate-800" />
                    <img src={turnaround3Img} alt="Turnaround 3" className="w-full h-20 rounded-lg object-cover border border-slate-800" />
                  </div>
                </div>

                {/* Progress Indicators */}
                <div className="space-y-3 pt-2 border-t border-slate-800">
                  <div>
                    <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-1">
                      <span>CANON INTEGRITY VECTOR</span>
                      <span className="text-[#68E7FF] font-bold">98.8%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-[#68E7FF] w-[98.8%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-1">
                      <span>STYLE COHERENCE (SHONEN DARK)</span>
                      <span className="text-[#D8FF65] font-bold">99.4%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-[#D8FF65] w-[99.4%]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CORE TECHNOLOGY 01 SECTION (Zero-Drift Character Continuity Engine) */}
      <section id="continuity" className="py-20 px-4 lg:px-8 border-b border-slate-800/60 bg-[#06070B]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-[#D8FF65]/10 text-[#D8FF65] border border-[#D8FF65]/30 font-bold uppercase tracking-wider">
                CORE TECHNOLOGY 01
              </span>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight mt-3">
                Zero-Drift Character Continuity Engine
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed">
              Standard generative tools produce a new face on every generation. WAZA-ZONE freezes biometric DNA across infinite scene rotations, combat states, and aging arcs.
            </p>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="bg-[#0E1017] border border-slate-800 rounded-xl overflow-hidden hover:border-[#D8FF65]/50 transition-all group flex flex-col justify-between">
              <div className="relative h-48 overflow-hidden bg-black">
                <img src={featMicroImg} alt="Micro Expressions" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono font-bold text-white">01 • CLOSE TENSION</span>
                </div>
                <div className="absolute top-2.5 right-2.5">
                  <span className="px-2 py-0.5 rounded bg-[#9D78FF] text-[10px] font-mono font-extrabold text-black">FACS LOCKED</span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-base font-bold text-white mb-2">Micro-Expressions</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Maintains millimeter-exact facial proportions through extreme grief, sneers, and heroic rest poses.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-[#0E1017] border border-slate-800 rounded-xl overflow-hidden hover:border-[#68E7FF]/50 transition-all group flex flex-col justify-between">
              <div className="relative h-48 overflow-hidden bg-black">
                <img src={featOutfitImg} alt="Outfit Lock" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-2.5 left-2.5">
                  <span className="px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono font-bold text-white">02 • DYNAMIC ACTION</span>
                </div>
                <div className="absolute top-2.5 right-2.5">
                  <span className="px-2 py-0.5 rounded bg-[#68E7FF] text-[10px] font-mono font-extrabold text-black">DNA RIGGED</span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-base font-bold text-white mb-2">Outfit & Regalia Lock</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Buckles, trench coats, cybernetics, and insignias remain identical across impossible camera perspectives.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-[#0E1017] border border-slate-800 rounded-xl overflow-hidden hover:border-[#D8FF65]/50 transition-all group flex flex-col justify-between">
              <div className="relative h-48 overflow-hidden bg-black">
                <img src={featLightingImg} alt="Dynamic Chiaroscuro" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-2.5 left-2.5">
                  <span className="px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono font-bold text-white">03 • LIGHTING EXTREMES</span>
                </div>
                <div className="absolute top-2.5 right-2.5">
                  <span className="px-2 py-0.5 rounded bg-[#D8FF65] text-[10px] font-mono font-extrabold text-black">ILLUM NORM</span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-base font-bold text-white mb-2">Dynamic Chiaroscuro</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Preserves skin undertones, hair volume, and silhouette even under harsh volumetric rim lighting.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-[#0E1017] border border-slate-800 rounded-xl overflow-hidden hover:border-emerald-400/50 transition-all group flex flex-col justify-between">
              <div className="relative h-48 overflow-hidden bg-black">
                <img src={featAgingImg} alt="Time Skip" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-2.5 left-2.5">
                  <span className="px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono font-bold text-white">04 • TEMPORAL AGING</span>
                </div>
                <div className="absolute top-2.5 right-2.5">
                  <span className="px-2 py-0.5 rounded bg-emerald-400 text-[10px] font-mono font-extrabold text-black">CANON SAFE</span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-base font-bold text-white mb-2">Time-Skip Continuity</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Progressive maturity sliders let you age characters across multi-season arcs without losing recognition.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CORE TECHNOLOGY 02 & 03 (Multi-Format Slicer & Vector Lettering) */}
      <section id="multi-format" className="py-20 px-4 lg:px-8 border-b border-slate-800/60 bg-[#06070B]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Core Tech 02 */}
          <div className="bg-[#0E1017] border border-slate-800 rounded-2xl p-6 lg:p-8 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-[#D8FF65]/10 text-[#D8FF65] border border-[#D8FF65]/30 font-bold uppercase tracking-wider">
                CORE TECHNOLOGY 02
              </span>
              <h3 className="text-2xl font-extrabold text-white mt-3">Unified Multi-Format Slicer</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Generate your narrative once. Publish across every global comic medium without redrawing or reformatting gutters by hand.
              </p>

              {/* Format Selector Tabs */}
              <div className="flex gap-2 my-6">
                {[
                  { id: 'TANKOBON', label: 'Japanese B4 Tankobon' },
                  { id: 'WEBTOON', label: 'Korean Webtoon' },
                  { id: 'COMIC', label: 'US Comic CBZ' }
                ].map((fmt) => (
                  <button
                    key={fmt.id}
                    onClick={() => setSlicerFormat(fmt.id as any)}
                    className={`px-3 py-1.5 rounded-md text-xs font-mono font-semibold transition-all ${
                      slicerFormat === fmt.id
                        ? 'bg-[#68E7FF] text-[#06070B]'
                        : 'bg-[#06070B] text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {fmt.label}
                  </button>
                ))}
              </div>

              {/* Details Box */}
              <div className="p-5 bg-[#06070B] rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-bold text-white font-mono">Standard Japanese B4 Tankobon</span>
                  <span className="text-[10px] font-mono text-[#68E7FF] font-bold">350 DPI CMYK PDF/X-1a</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Automated right-to-left pacing algorithm, strict standard print bleed margin (3mm), authentic 68-line screentone moiré filtering.
                </p>
                <div className="space-y-1.5 pt-2 text-[11px] font-mono text-emerald-400 font-semibold">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Automated Bleed Safe Zones</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>True K100 Print Ink Separation</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-[10px] font-mono text-slate-500">
              <span>Native Export Engine 3.2</span>
              <span className="text-white font-bold">ZERO RESOLUTION DEGRADE</span>
            </div>
          </div>

          {/* Right: Core Tech 03 */}
          <div className="bg-[#0E1017] border border-slate-800 rounded-2xl p-6 lg:p-8 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-[#68E7FF]/10 text-[#68E7FF] border border-[#68E7FF]/30 font-bold uppercase tracking-wider">
                CORE TECHNOLOGY 03
              </span>
              <h3 className="text-2xl font-extrabold text-white mt-3">Vector Lettering & Overflow Guard</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Eliminate ruined translations and broken speech bubbles. Bézier curvature nodes deform smoothly with multi-lingual automated reflow.
              </p>

              {/* Live Vector Bubble Preview Canvas */}
              <div className="my-6 p-8 bg-[#06070B] rounded-xl border border-slate-800 relative flex items-center justify-center min-h-[180px]">
                <div className="bg-white text-black p-5 rounded-3xl border-2 border-black max-w-sm shadow-2xl relative font-sans font-black text-xs text-center tracking-wide leading-snug">
                  &quot;TARGET SYSTEMS COMPROMISED. RE-ROUTING NEURAL DRIVE IN 3 SECONDS!&quot;

                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[14px] border-t-black" />

                  <div className="mt-2 pt-2 border-t border-slate-200">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[9px] font-mono font-bold">
                      Auto-Fitted: EN / JA / RD / FR / ES / DE (0% Overflow)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-[10px] font-mono text-slate-500">
              <span>HarfBuzz Vector Pipeline</span>
              <span className="text-[#68E7FF] font-bold">BÉZIER DYNAMIC TAIL RIG</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PRICING & TIERS SECTION */}
      <section id="pricing" className="py-20 px-4 lg:px-8 border-b border-slate-800/60 bg-[#06070B]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-[#9D78FF]/10 text-[#9D78FF] border border-[#9D78FF]/30 font-bold uppercase tracking-wider">
              TRANSPARENT PREDICTABLE TIERS
            </span>
            <h2 className="text-3xl lg:text-5xl font-extrabold text-white tracking-tight mt-4">
              Invest in Your Serialized IP. Never Run Out of Inference Muscle.
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-3">
              All plans include real-time DNA caching, vector lettering, and automatic lossless image upscaling.
            </p>

            {/* Monthly / Annual Toggle Switch */}
            <div className="inline-flex items-center gap-3 mt-8 p-1.5 bg-[#0E1017] border border-slate-800 rounded-full">
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold transition-all ${
                  !isAnnual ? 'bg-[#D8FF65] text-[#06070B]' : 'text-slate-400 hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                  isAnnual ? 'bg-[#D8FF65] text-[#06070B]' : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>Annual</span>
                <span className="px-1.5 py-0.2 rounded bg-[#06070B] text-[#D8FF65] text-[9px]">Save 20%</span>
              </button>
            </div>
          </div>

          {/* 4 Pricing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Free Explorer */}
            <div className="bg-[#0E1017] border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">FREE EXPLORER</span>
                <div className="text-4xl font-black text-white my-3">$0 <span className="text-xs font-normal text-slate-500">/ month</span></div>
                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  Perfect for sandbox ideation and character concept test generation.
                </p>
                <ul className="space-y-2.5 text-xs font-mono text-slate-300 border-t border-slate-800 pt-6">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#D8FF65]" /> 100 Credits / mo</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#D8FF65]" /> 1 Active Story Project</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#D8FF65]" /> Standard Resolution (720p)</li>
                  <li className="flex items-center gap-2 text-slate-500"><X className="w-3.5 h-3.5 text-slate-600" /> Discreet Watermarked Export</li>
                  <li className="flex items-center gap-2 text-slate-500"><X className="w-3.5 h-3.5 text-slate-600" /> No CMYK Print Profiles</li>
                </ul>
              </div>
              <button
                onClick={onEnterApp}
                className="mt-8 w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono font-bold text-xs transition-colors"
              >
                Explore Free
              </button>
            </div>

            {/* Creator */}
            <div className="bg-[#0E1017] border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-[#68E7FF] uppercase font-bold">CREATOR</span>
                <div className="text-4xl font-black text-white my-3">${isAnnual ? 23 : 29} <span className="text-xs font-normal text-slate-500">/ month</span></div>
                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  For indie webtoonists and mangaka building their first serialized run.
                </p>
                <ul className="space-y-2.5 text-xs font-mono text-slate-300 border-t border-slate-800 pt-6">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#68E7FF]" /> 1,500 Credits / mo</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#68E7FF]" /> Unlimited Character DNA Slots</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#68E7FF]" /> 3 Active Series Canvases</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#68E7FF]" /> Infinite Webtoon Slicer (800px)</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#68E7FF]" /> CBZ & Unbranded Web Export</li>
                </ul>
              </div>
              <button
                onClick={onEnterApp}
                className="mt-8 w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono font-bold text-xs transition-colors"
              >
                Choose Creator
              </button>
            </div>

            {/* Pro Studio (Highlighted) */}
            <div className="bg-gradient-to-b from-[#0E1017] to-[#141724] border-2 border-[#D8FF65] rounded-2xl p-6 flex flex-col justify-between relative shadow-2xl shadow-[#D8FF65]/10">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#D8FF65] text-[#06070B] font-mono font-extrabold text-[9px] uppercase tracking-wider whitespace-nowrap">
                MOST POPULAR FOR AUTEURS
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#D8FF65] uppercase font-bold">PRO STUDIO</span>
                <div className="text-4xl font-black text-[#D8FF65] my-3">${isAnnual ? 71 : 89} <span className="text-xs font-normal text-slate-400">/ month</span></div>
                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  For professional serialization with high-res physical print requirements.
                </p>
                <ul className="space-y-2.5 text-xs font-mono text-slate-200 border-t border-slate-800 pt-6">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#D8FF65]" /> 5,000 Credits / mo</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#D8FF65]" /> 300 DPI CMYK PDF/X-1a Export</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#D8FF65]" /> Dialogue Slang & World Bible Lock</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#D8FF65]" /> High-Priority BullMQ Queue</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#D8FF65]" /> Multi-Voice Speech Balloon Engine</li>
                </ul>
              </div>
              <button
                onClick={onEnterApp}
                className="mt-8 w-full py-3 rounded-xl bg-[#D8FF65] text-[#06070B] font-mono font-extrabold text-xs hover:bg-[#cbf54f] shadow-lg shadow-[#D8FF65]/20 transition-all"
              >
                Start Pro Free Trial
              </button>
            </div>

            {/* Studio Enterprise */}
            <div className="bg-[#0E1017] border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-[#9D78FF] uppercase font-bold">STUDIO ENTERPRISE</span>
                <div className="text-4xl font-black text-white my-3">${isAnnual ? 199 : 249} <span className="text-xs font-normal text-slate-500">/ month</span></div>
                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  Dedicated clusters and custom LoRA models for comic production houses.
                </p>
                <ul className="space-y-2.5 text-xs font-mono text-slate-300 border-t border-slate-800 pt-6">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#9D78FF]" /> 15,000 Credits / mo</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#9D78FF]" /> Dedicated Supabase RLS Tenant</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#9D78FF]" /> Custom Proprietary LoRA Training</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#9D78FF]" /> 99.9% Production SLA Guarantee</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#9D78FF]" /> 24/7 Slack Director Support</li>
                </ul>
              </div>
              <button
                onClick={onEnterApp}
                className="mt-8 w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono font-bold text-xs transition-colors"
              >
                Contact Enterprise
              </button>
            </div>
          </div>

          {/* Payment Providers Line */}
          <div className="mt-12 p-4 bg-[#0E1017] rounded-xl border border-slate-800 text-center text-xs font-mono text-slate-400">
            <span className="text-[#D8FF65] font-bold">⚡ Tri-Gateway Instant Checkout</span> • Frictionless payment globally supported via <strong className="text-white">Stripe</strong>, <strong className="text-white">Moneroo</strong> (All Africa Mobile Money: MTN, Orange, Moov), and <strong className="text-white">Chariow</strong>.
          </div>
        </div>
      </section>

      {/* 7. PROOF OF FIDELITY / SHOWCASE SECTION */}
      <section id="showcase" className="py-20 px-4 lg:px-8 border-b border-slate-800/60 bg-[#06070B]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-[#68E7FF]/10 text-[#68E7FF] border border-[#68E7FF]/30 font-bold uppercase tracking-wider">
                PROOF OF FIDELITY
              </span>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight mt-3">
                Experience Serialization Rendered 100% on WAZA-ZONE
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed">
              Read Chapter 1 of <em>AURA_DRIFT: 2099</em> created entirely by solo director Kai Vance with zero external Photoshop touchups. Seamless speech reflow, 4K canvas zoom, and zero continuity flicker.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-6">
              <button
                onClick={onOpenReader}
                className="px-6 py-3.5 rounded-xl bg-[#9D78FF] text-[#06070B] font-extrabold text-xs font-mono hover:bg-[#8b63f5] shadow-lg shadow-[#9D78FF]/20 transition-all flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>Launch Interactive Reader</span>
              </button>
              <div className="text-xs font-mono text-slate-400">
                48 Pages • 60 FPS Canvas Zoom
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-2 gap-4">
              <img src={showcaseLeftImg} alt="Showcase Left" className="w-full h-64 rounded-xl object-cover border border-slate-800 shadow-2xl" />
              <img src={showcaseRightImg} alt="Showcase Right" className="w-full h-64 rounded-xl object-cover border border-slate-800 shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA BANNER */}
      <section className="py-24 px-4 lg:px-8 border-b border-slate-800/60 bg-gradient-to-b from-[#06070B] to-[#0E1017]">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-[#D8FF65]/10 text-[#D8FF65] border border-[#D8FF65]/30 font-bold uppercase tracking-wider">
            LAUNCH YOUR SAGA NOW
          </span>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-4 mb-4">
            Stop wrestling with drifting AI images. Build a serialized legacy today.
          </h2>

          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto mb-8">
            Claim your 500 free credits today. No credit card required. Export to PDF, Webtoon, and CBZ in seconds.
          </p>

          <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              required
              placeholder="director@studio.com"
              value={subscribeEmail}
              onChange={(e) => setSubscribeEmail(e.target.value)}
              className="flex-1 bg-[#06070B] border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#D8FF65]"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-[#D8FF65] text-[#06070B] font-mono font-extrabold text-xs hover:bg-[#cbf54f] transition-all whitespace-nowrap"
            >
              Claim Credits
            </button>
          </form>

          {subscribedSuccess && (
            <div className="mt-4 text-xs font-mono text-[#D8FF65]">
              ✓ 500 Free Credits Allocated! Redirecting to Studio...
            </div>
          )}
        </div>
      </section>

      {/* 9. FOOTER */}
      <footer id="docs" className="py-16 px-4 lg:px-8 bg-[#06070B] text-xs font-mono text-slate-400">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-slate-800/80">
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-wider text-white">WAZA<span className="text-[#D8FF65]">-ZONE</span></span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed max-w-sm">
              The high-precision neural storytelling operating system for world-builders, mangaka, and generative narrative directors.
            </p>
            <div className="flex items-center gap-2 text-emerald-400 text-[10px]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>All Inference Clusters Nominal</span>
            </div>
          </div>

          <div>
            <div className="text-white font-bold mb-3 uppercase text-[10px]">PRODUCT</div>
            <ul className="space-y-2 text-slate-400 text-[11px]">
              <li><a href="#" className="hover:text-white transition-colors">Manga Studio</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Webtoon Slicer</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Character DNA Matrix</a></li>
              <li><a href="#" className="hover:text-white transition-colors">World Bible Engine</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Neural Localization</a></li>
            </ul>
          </div>

          <div>
            <div className="text-white font-bold mb-3 uppercase text-[10px]">DEVELOPERS & API</div>
            <ul className="space-y-2 text-slate-400 text-[11px]">
              <li><a href="#" className="hover:text-white transition-colors">AI Gateway v2</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Supabase Postgres RLS</a></li>
              <li><a href="#" className="hover:text-white transition-colors">BullMQ Asynchronous Workers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Event Webhooks</a></li>
              <li><a href="#" className="hover:text-white transition-colors">SDK Reference</a></li>
            </ul>
          </div>

          <div>
            <div className="text-white font-bold mb-3 uppercase text-[10px]">COMPANY & LEGAL</div>
            <ul className="space-y-2 text-slate-400 text-[11px]">
              <li><a href="#" className="hover:text-white transition-colors">About Narrative OS</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Director Manifesto</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Security Whitepaper</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Architecture</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Acceptable Use Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-6xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-slate-500">
          <div>
            Encrypted via Supabase Postgres RLS • Zero-Data-Leak Guarantee • Stripe / Moneroo / Chariow Verified
          </div>
          <div>
            © 2026 WAZA-ZONE Technologies Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};
