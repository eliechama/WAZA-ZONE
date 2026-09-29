import React, { useState } from 'react';
import { useProject } from '../context/ProjectContext';
import { FormatType, Project } from '../types';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import {
  Plus,
  FolderKanban,
  BookOpen,
  Users,
  Layers,
  Calendar,
  ArrowRight,
  Search,
  Sparkles,
  ShieldCheck,
  Server,
  Zap,
  Activity,
  Cpu,
  Lock,
  FileCode,
  CheckCircle2,
  SlidersHorizontal,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  Database,
  Terminal,
  Shield,
  Eye,
  Camera,
  Globe2,
  FileText
} from 'lucide-react';

import cover1Img from '../assets/images/waza_cockpit_cover_1_1790674787758.jpg';
import cover2Img from '../assets/images/waza_cockpit_cover_2_1790674802349.jpg';
import cover3Img from '../assets/images/waza_cockpit_cover_3_1790674818706.jpg';
import cover4Img from '../assets/images/waza_cockpit_cover_4_1790674833799.jpg';

export const ProjectCockpit: React.FC = () => {
  const { setActiveProject, createProject, setActiveView } = useProject();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Project Form
  const [newTitle, setNewTitle] = useState('');
  const [newFormat, setNewFormat] = useState<FormatType>('MANGA');
  const [newDescription, setNewDescription] = useState('');
  const [newCover, setNewCover] = useState('https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80');

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    createProject({
      title: newTitle,
      format: newFormat,
      description: newDescription,
      coverImage: newCover
    });

    setNewTitle('');
    setNewDescription('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 font-sans selection:bg-[#D8FF65] selection:text-[#06070B]">
      {/* 1. HERO ACTIVE NODE HEADER */}
      <div className="bg-[#0E1017] border border-slate-800 rounded-2xl p-6 lg:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        {/* Top Metadata Line */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono border-b border-slate-800/80 pb-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-[#D8FF65]/10 text-[#D8FF65] border border-[#D8FF65]/30 font-bold uppercase">
              PHASE 01 ACTIVE NODE
            </span>
            <span className="text-slate-400">ID: <span className="text-white">ws_kurogane_01</span></span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400">NODE <span className="text-white">v20.18.1</span></span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400 font-bold">DOKPLOY CLUSTER</span>
          </div>
        </div>

        {/* Title & Action Buttons */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                Kurogane Creative Lab
              </h1>
              <span className="px-3 py-1 rounded-full bg-[#9D78FF]/10 text-[#9D78FF] border border-[#9D78FF]/30 font-mono font-bold text-xs">
                Storytelling Engine OS
              </span>
            </div>

            {/* Live Health Bullet Line */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-300 mt-3">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Supabase Auth: <strong className="text-white">RLS Enforced (22 Tables)</strong></span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#68E7FF]" />
                <span>AI Gateway: <strong className="text-white">Gemini 2.0 (Zero-Client-Leak)</strong></span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#D8FF65]" />
                <span>BullMQ Queue: <strong className="text-white">Online (0 Pending)</strong></span>
              </span>
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>/api/health 200 OK</span>
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button className="px-4 py-2.5 rounded-xl bg-[#06070B] border border-slate-800 hover:border-slate-700 text-xs font-mono font-bold text-slate-300 flex items-center gap-2 transition-all">
              <Server className="w-4 h-4 text-[#68E7FF]" />
              <span>Provision Workspace</span>
            </button>
            <button className="px-4 py-2.5 rounded-xl bg-[#06070B] border border-slate-800 hover:border-slate-700 text-xs font-mono font-bold text-slate-300 flex items-center gap-2 transition-all">
              <FileCode className="w-4 h-4 text-[#9D78FF]" />
              <span>Import Comic Script</span>
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-[#D8FF65] text-[#06070B] font-extrabold text-xs font-mono hover:bg-[#cbf54f] shadow-lg shadow-[#D8FF65]/20 transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>+ Create New Project</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. 4 KPI STAT CARDS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Stat 1: Ledger */}
        <div className="bg-[#0E1017] border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="font-bold uppercase tracking-wider">IMMUTABLE CREDIT LEDGER</span>
            <ShieldCheck className="w-4 h-4 text-[#D8FF65]" />
          </div>
          <div>
            <div className="text-3xl font-black text-white">4,850 <span className="text-xs font-normal text-[#D8FF65]">CR</span></div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden my-3">
              <div className="h-full bg-[#D8FF65] w-[97%]" />
            </div>
            <div className="flex justify-between text-[10px] font-mono text-slate-400">
              <span>Live Idempotent Hold : 0 CR</span>
              <span>cap: 5,000</span>
            </div>
          </div>
        </div>

        {/* Stat 2: Active Productions */}
        <div className="bg-[#0E1017] border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="font-bold uppercase tracking-wider">ACTIVE PRODUCTIONS</span>
            <BookOpen className="w-4 h-4 text-[#68E7FF]" />
          </div>
          <div>
            <div className="text-3xl font-black text-white">04 <span className="text-xs font-normal text-slate-400">Canons Active</span></div>
            <p className="text-[11px] font-mono text-slate-400 my-2">3 Episodic Serialized • 1 Graphic Novel</p>
            <div className="flex justify-between text-[10px] font-mono text-emerald-400 font-bold border-t border-slate-800 pt-2">
              <span>100% Pipeline Health</span>
              <span className="text-slate-400">4/10 Tier Slots</span>
            </div>
          </div>
        </div>

        {/* Stat 3: Locked Character DNA */}
        <div className="bg-[#0E1017] border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="font-bold uppercase tracking-wider">LOCKED CHARACTER DNA</span>
            <Users className="w-4 h-4 text-[#9D78FF]" />
          </div>
          <div>
            <div className="text-3xl font-black text-white">18 <span className="text-xs font-normal text-slate-400">Entities</span></div>
            <p className="text-[11px] font-mono text-slate-400 my-2">Multiview Turnarounds + Vector Embeddings</p>
            <div className="flex justify-between text-[10px] font-mono text-[#68E7FF] font-bold border-t border-slate-800 pt-2">
              <span>Continuity Guard Ready</span>
              <span className="text-slate-400">0 Drifts Detected</span>
            </div>
          </div>
        </div>

        {/* Stat 4: Panels Synthesized */}
        <div className="bg-[#0E1017] border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="font-bold uppercase tracking-wider">PANELS SYNTHESIZED</span>
            <Activity className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <div className="text-3xl font-black text-white">1,240 <span className="text-xs font-normal text-slate-400">this cycle</span></div>
            <div className="w-full h-2 my-3">
              <svg className="w-full h-full text-[#D8FF65]" viewBox="0 0 100 10" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M0 8 Q 25 2, 50 6 T 100 1" />
              </svg>
            </div>
            <div className="flex justify-between text-[10px] font-mono text-slate-400 border-t border-slate-800 pt-2">
              <span className="text-[#D8FF65] font-bold">+18.4% velocity</span>
              <span>avg 2.1s / panel</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. CREATIVE SERIES WORKSPACE SECTION */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-extrabold text-white tracking-tight">Creative Series Workspace</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-[#9D78FF]/20 text-[#9D78FF] border border-[#9D78FF]/40 text-xs font-mono font-bold">
              4 Active
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span>SORT:</span>
            <button className="px-3 py-1 rounded bg-[#0E1017] border border-slate-800 text-white font-bold">
              Recent Activity
            </button>
            <button className="px-3 py-1 rounded bg-[#0E1017] border border-slate-800 hover:text-white">
              Format
            </button>
          </div>
        </div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: CHRONO BLADE: OMEGA */}
          <div className="bg-[#0E1017] border border-slate-800 rounded-2xl overflow-hidden hover:border-[#D8FF65]/50 transition-all flex flex-col justify-between">
            <div className="relative h-48 overflow-hidden bg-black">
              <img src={cover1Img} alt="Chrono Blade" className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3 flex gap-2">
                <span className="px-2 py-0.5 rounded bg-[#9D78FF] text-[#06070B] text-[10px] font-mono font-black uppercase">
                  FLAGSHIP CANON
                </span>
                <span className="px-2 py-0.5 rounded bg-black/80 text-white text-[10px] font-mono font-bold">
                  MANGA B&W+ACCENT
                </span>
              </div>
              <div className="absolute bottom-3 left-3 flex items-center gap-2 text-[10px] font-mono text-white bg-black/80 px-2.5 py-1 rounded border border-slate-800">
                <span className="w-2 h-2 rounded-full bg-[#D8FF65] animate-pulse" />
                <span>In Production: Act 2 - Scene 4</span>
              </div>
              <span className="absolute bottom-3 right-3 text-[10px] font-mono text-slate-400 bg-black/80 px-2 py-0.5 rounded">
                12m ago
              </span>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-xl font-extrabold text-white tracking-wide">CHRONO BLADE: OMEGA</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Neo-Kanto 2088 • Temporal assassination squad investigating neural echoes.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 p-3 bg-[#06070B] rounded-xl border border-slate-800 text-center font-mono text-xs">
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">EPISODES</div>
                  <div className="font-bold text-white mt-0.5">12 Plan</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">CAST DNA</div>
                  <div className="font-bold text-[#D8FF65] mt-0.5">5 Locked</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">RENDERED</div>
                  <div className="font-bold text-[#68E7FF] mt-0.5">384 Pnl</div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => setActiveView('cockpit')}
                  className="flex-1 py-2.5 rounded-xl bg-[#9D78FF] text-[#06070B] font-mono font-extrabold text-xs hover:bg-[#8b63f5] transition-all flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Open Cockpit</span>
                </button>
                <button className="p-2.5 rounded-xl bg-[#06070B] border border-slate-800 text-slate-400 hover:text-white">
                  <Lock className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: SOLAR ECHOES */}
          <div className="bg-[#0E1017] border border-slate-800 rounded-2xl overflow-hidden hover:border-[#68E7FF]/50 transition-all flex flex-col justify-between">
            <div className="relative h-48 overflow-hidden bg-black">
              <img src={cover2Img} alt="Solar Echoes" className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3 flex gap-2">
                <span className="px-2 py-0.5 rounded bg-[#68E7FF] text-[#06070B] text-[10px] font-mono font-black uppercase">
                  WEBTOON SCROLL
                </span>
                <span className="px-2 py-0.5 rounded bg-black/80 text-white text-[10px] font-mono font-bold">
                  VERTICAL CUT
                </span>
              </div>
              <div className="absolute bottom-3 left-3 flex items-center gap-2 text-[10px] font-mono text-white bg-black/80 px-2.5 py-1 rounded border border-slate-800">
                <span className="w-2 h-2 rounded-full bg-[#68E7FF] animate-pulse" />
                <span>Storyboarding: Ch. 07</span>
              </div>
              <span className="absolute bottom-3 right-3 text-[10px] font-mono text-slate-400 bg-black/80 px-2 py-0.5 rounded">
                2h ago
              </span>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-xl font-extrabold text-white tracking-wide">SOLAR ECHOES</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Orbital Dyson-swarm engineers discovering deep-space radio harmonics.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 p-3 bg-[#06070B] rounded-xl border border-slate-800 text-center font-mono text-xs">
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">CHAPTERS</div>
                  <div className="font-bold text-white mt-0.5">24 Total</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">CAST DNA</div>
                  <div className="font-bold text-[#68E7FF] mt-0.5">8 Locked</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">CANON VER</div>
                  <div className="font-bold text-slate-300 mt-0.5">v1.4.2</div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => setActiveView('storyboard')}
                  className="flex-1 py-2.5 rounded-xl bg-[#06070B] border border-[#68E7FF]/50 text-[#68E7FF] font-mono font-bold text-xs hover:bg-[#68E7FF]/10 transition-all flex items-center justify-center gap-2"
                >
                  <Camera className="w-4 h-4" />
                  <span>Camera Suite</span>
                </button>
                <button className="p-2.5 rounded-xl bg-[#06070B] border border-slate-800 text-slate-400 hover:text-white">
                  <SlidersHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Card 3: LE CHANT DU BRUMAIRE */}
          <div className="bg-[#0E1017] border border-slate-800 rounded-2xl overflow-hidden hover:border-[#9D78FF]/50 transition-all flex flex-col justify-between">
            <div className="relative h-48 overflow-hidden bg-black">
              <img src={cover3Img} alt="Le Chant du Brumaire" className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3 flex gap-2">
                <span className="px-2 py-0.5 rounded bg-[#9D78FF] text-[#06070B] text-[10px] font-mono font-black uppercase">
                  FRANCO-BELGE
                </span>
                <span className="px-2 py-0.5 rounded bg-black/80 text-white text-[10px] font-mono font-bold">
                  48-PAGE ALBUM
                </span>
              </div>
              <div className="absolute bottom-3 left-3 flex items-center gap-2 text-[10px] font-mono text-white bg-black/80 px-2.5 py-1 rounded border border-slate-800">
                <span className="w-2 h-2 rounded-full bg-slate-400" />
                <span>World Bible Locked</span>
              </div>
              <span className="absolute bottom-3 right-3 text-[10px] font-mono text-slate-400 bg-black/80 px-2 py-0.5 rounded">
                Yesterday
              </span>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-xl font-extrabold text-white tracking-wide">LE CHANT DU BRUMAIRE</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Occult revolutionary France under alchemy-fueled clockwork embargo.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 p-3 bg-[#06070B] rounded-xl border border-slate-800 text-center font-mono text-xs">
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">TARGET</div>
                  <div className="font-bold text-white mt-0.5">64 Pages</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">CAST DNA</div>
                  <div className="font-bold text-[#D8FF65] mt-0.5">3 Locked</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">LOCALE</div>
                  <div className="font-bold text-slate-300 mt-0.5">FR / EN</div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => setActiveView('world')}
                  className="flex-1 py-2.5 rounded-xl bg-[#06070B] border border-slate-700 text-white font-mono font-bold text-xs hover:border-slate-500 transition-all flex items-center justify-center gap-2"
                >
                  <Globe2 className="w-4 h-4 text-[#9D78FF]" />
                  <span>Open World Bible</span>
                </button>
                <button className="p-2.5 rounded-xl bg-[#06070B] border border-slate-800 text-slate-400 hover:text-white">
                  <Lock className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Card 4: GHOST RUNNER: NEO SEOUL */}
          <div className="bg-[#0E1017] border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all flex flex-col justify-between">
            <div className="relative h-48 overflow-hidden bg-black">
              <img src={cover4Img} alt="Ghost Runner" className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3 flex gap-2">
                <span className="px-2 py-0.5 rounded bg-emerald-400 text-[#06070B] text-[10px] font-mono font-black uppercase">
                  COMIC BOOK US
                </span>
                <span className="px-2 py-0.5 rounded bg-black/80 text-white text-[10px] font-mono font-bold">
                  DRAFT STAGE
                </span>
              </div>
              <div className="absolute bottom-3 left-3 flex items-center gap-2 text-[10px] font-mono text-white bg-black/80 px-2.5 py-1 rounded border border-slate-800">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>Outline Genesis Phase</span>
              </div>
              <span className="absolute bottom-3 right-3 text-[10px] font-mono text-slate-400 bg-black/80 px-2 py-0.5 rounded">
                3d ago
              </span>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-xl font-extrabold text-white tracking-wide">GHOST RUNNER: NEO SEOUL</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  High-velocity courier noir in autonomous underworld transit zones.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 p-3 bg-[#06070B] rounded-xl border border-slate-800 text-center font-mono text-xs">
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">ARC</div>
                  <div className="font-bold text-white mt-0.5">5 Issues</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">CAST DNA</div>
                  <div className="font-bold text-amber-400 mt-0.5">2 Unlocked</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">COMPLETION</div>
                  <div className="font-bold text-emerald-400 mt-0.5">15%</div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => setActiveView('story')}
                  className="flex-1 py-2.5 rounded-xl bg-[#06070B] border border-slate-700 text-white font-mono font-bold text-xs hover:border-slate-500 transition-all flex items-center justify-center gap-2"
                >
                  <FileText className="w-4 h-4 text-[#D8FF65]" />
                  <span>Story Architect</span>
                </button>
              </div>
            </div>
          </div>

          {/* Card 5: Initialize New Story Canon */}
          <div className="bg-[#0E1017] border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-slate-800 pb-3">
                <span className="flex items-center gap-2 text-[#D8FF65] font-bold">
                  <Sparkles className="w-4 h-4" />
                  <span>PIPELINE V2.4</span>
                </span>
              </div>

              <h3 className="text-xl font-extrabold text-white mt-4">Initialize New Story Canon</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Bootstraps schema-driven multi-panel continuity with locked character seeds.
              </p>

              <div className="space-y-2 mt-4 font-mono text-xs">
                {[
                  '1. PREMISE & FORMAT BLUEPRINT',
                  '2. CAST DNA 8-POINT MATRIX',
                  '3. CANON & LORE VECTOR BIBLE',
                  '4. STORYBOARD & COMPOSITION'
                ].map((step, idx) => (
                  <div key={idx} className="p-2.5 rounded bg-[#06070B] border border-slate-800 text-slate-300 font-bold flex items-center gap-2">
                    <span className="w-4 h-4 rounded bg-[#D8FF65]/10 text-[#D8FF65] flex items-center justify-center text-[10px] font-black">
                      {idx + 1}
                    </span>
                    <span>{step.substring(3)}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full py-3 rounded-xl bg-[#06070B] border border-slate-700 hover:border-[#D8FF65] text-white font-mono font-bold text-xs transition-all flex items-center justify-center gap-2"
            >
              <span>Launch Project Genesis Wizard</span>
            </button>
          </div>

          {/* Card 6: Engine Architecture */}
          <div className="bg-[#0E1017] border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-slate-800 pb-3">
                <span className="text-slate-400 font-bold">ENGINE ARCHITECTURE</span>
                <Cpu className="w-4 h-4 text-[#9D78FF]" />
              </div>

              <h3 className="text-xl font-extrabold text-white mt-4">Phase 01 Real SaaS Core</h3>

              <div className="space-y-2 mt-4 font-mono text-xs">
                <div className="flex justify-between p-2.5 rounded bg-[#06070B] border border-slate-800">
                  <span className="text-slate-400">Model Checkpoint:</span>
                  <span className="text-[#9D78FF] font-bold">gemini-2.0-flash</span>
                </div>
                <div className="flex justify-between p-2.5 rounded bg-[#06070B] border border-slate-800">
                  <span className="text-slate-400">Gateway Validation:</span>
                  <span className="text-[#D8FF65] font-bold">Zod v3 Strict</span>
                </div>
                <div className="flex justify-between p-2.5 rounded bg-[#06070B] border border-slate-800">
                  <span className="text-slate-400">Multi-Tenant Isolation:</span>
                  <span className="text-[#68E7FF] font-bold">workspace_id FK</span>
                </div>
                <div className="flex justify-between p-2.5 rounded bg-[#06070B] border border-slate-800">
                  <span className="text-slate-400">DB Migrations:</span>
                  <span className="text-slate-300 font-bold">001_phase01_schema.sql</span>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#06070B] border border-slate-800 text-[10px] font-mono text-slate-400 flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#D8FF65] shrink-0" />
              <span>Append-only transactions verified via cryptographic hash chain.</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. PHASE 01 COMPLIANCE RADAR (SECURITY BENCHMARKS) */}
      <div className="bg-[#0E1017] border border-slate-800 rounded-2xl p-6 lg:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <span className="w-6 h-6 rounded bg-[#9D78FF] text-[#06070B] flex items-center justify-center font-mono font-black text-xs">
              01
            </span>
            <div>
              <h3 className="text-lg font-extrabold text-white tracking-wider">PHASE 01 COMPLIANCE RADAR</h3>
              <p className="text-xs text-slate-400 mt-0.5">Production readiness benchmarks & zero-compromise security posture.</p>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold">
            ● 5/5 BENCHMARKS CERTIFIED
          </span>
        </div>

        {/* 5 Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="p-4 bg-[#06070B] rounded-xl border border-slate-800 space-y-2">
            <div className="flex justify-between text-[10px] font-mono">
              <span className="text-[#D8FF65] font-bold">SEC-01</span>
            </div>
            <h4 className="text-xs font-bold text-white">Zero Client API Key</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
              Server-side @google/genai routing. Zero Gemini secrets leaked to Vite client.
            </p>
          </div>

          <div className="p-4 bg-[#06070B] rounded-xl border border-slate-800 space-y-2">
            <div className="flex justify-between text-[10px] font-mono">
              <span className="text-[#D8FF65] font-bold">SEC-02</span>
            </div>
            <h4 className="text-xs font-bold text-white">Supabase Postgres RLS</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
              Strict tenant isolation across all 22 database tables via auth.uid() claims.
            </p>
          </div>

          <div className="p-4 bg-[#06070B] rounded-xl border border-slate-800 space-y-2">
            <div className="flex justify-between text-[10px] font-mono">
              <span className="text-[#D8FF65] font-bold">FIN-01</span>
            </div>
            <h4 className="text-xs font-bold text-white">Append-Only Ledger</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
              Idempotent credit reserve on dispatch; permanent rollback if AI payload fails validation.
            </p>
          </div>

          <div className="p-4 bg-[#06070B] rounded-xl border border-slate-800 space-y-2">
            <div className="flex justify-between text-[10px] font-mono">
              <span className="text-[#68E7FF] font-bold">AI-01</span>
            </div>
            <h4 className="text-xs font-bold text-white">Continuity Guard Packets</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
              Character DNA prompts inject normalized facial markers & apparel palettes automatically.
            </p>
          </div>

          <div className="p-4 bg-[#06070B] rounded-xl border border-slate-800 space-y-2">
            <div className="flex justify-between text-[10px] font-mono">
              <span className="text-emerald-400 font-bold">OPS-01</span>
            </div>
            <h4 className="text-xs font-bold text-white">Dokploy / Docker Ready</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
              Liveness probe at /api/health responding in 24ms under continuous load.
            </p>
          </div>
        </div>
      </div>

      {/* 5. RECENT ASYNC SYNTHESIS JOBS TABLE */}
      <div className="bg-[#0E1017] border border-slate-800 rounded-2xl p-6 lg:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-lg font-extrabold text-white tracking-tight">Recent Async Synthesis Jobs</h3>
            <p className="text-xs text-slate-400 mt-0.5">BullMQ Redis job worker execution traces & credit ledger debits.</p>
          </div>

          <div className="flex items-center gap-3">
            <button className="px-3 py-1.5 rounded-lg bg-[#06070B] border border-slate-800 text-xs font-mono text-slate-300 flex items-center gap-2">
              <RefreshCw className="w-3.5 h-3.5 text-[#D8FF65] animate-spin" />
              <span>Live Stream</span>
            </button>
            <button
              onClick={() => setActiveView('admin')}
              className="px-3 py-1.5 rounded-lg bg-[#06070B] border border-slate-800 hover:border-slate-700 text-xs font-mono text-slate-300 flex items-center gap-1.5"
            >
              <span>Inspect Telemetry</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-500 uppercase text-[10px] tracking-wider">
                <th className="py-3 px-3">JOB ID</th>
                <th className="py-3 px-3">TARGET CANON</th>
                <th className="py-3 px-3">TASK DISPATCH</th>
                <th className="py-3 px-3">STATUS</th>
                <th className="py-3 px-3">LEDGER IMPACT</th>
                <th className="py-3 px-3">EXECUTION TIME</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr className="hover:bg-[#06070B]/50 transition-colors">
                <td className="py-3.5 px-3 font-bold text-white">job_8a92f01</td>
                <td className="py-3.5 px-3 font-bold text-slate-200">CHRONO BLADE: OMEGA</td>
                <td className="py-3.5 px-3 text-slate-300">👤 Character DNA Consistency Check (Ren Tanaka)</td>
                <td className="py-3.5 px-3">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                    ● SUCCESS
                  </span>
                </td>
                <td className="py-3.5 px-3 font-bold text-slate-300">-2.0 CR</td>
                <td className="py-3.5 px-3 text-slate-400 text-[11px]">1.82s • 4m ago</td>
              </tr>

              <tr className="hover:bg-[#06070B]/50 transition-colors">
                <td className="py-3.5 px-3 font-bold text-white">job_8a92e88</td>
                <td className="py-3.5 px-3 font-bold text-slate-200">SOLAR ECHOES</td>
                <td className="py-3.5 px-3 text-slate-300">📹 Scene 3 Storyboard Render (Panels 1-6)</td>
                <td className="py-3.5 px-3">
                  <span className="px-2 py-0.5 rounded bg-[#9D78FF]/20 text-[#9D78FF] border border-[#9D78FF]/40 text-[10px] font-bold">
                    ● RUNNING
                  </span>
                </td>
                <td className="py-3.5 px-3 font-bold text-[#68E7FF]">HOLD 12.0 CR</td>
                <td className="py-3.5 px-3 text-slate-400 text-[11px]">Active (64%)</td>
              </tr>

              <tr className="hover:bg-[#06070B]/50 transition-colors">
                <td className="py-3.5 px-3 font-bold text-white">job_8a92d42</td>
                <td className="py-3.5 px-3 font-bold text-slate-200">LE CHANT DU BRUMAIRE</td>
                <td className="py-3.5 px-3 text-slate-300">🗣 Localization FR -&gt; EN (Ch. 1 Dialog Matrix)</td>
                <td className="py-3.5 px-3">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                    ● SUCCESS
                  </span>
                </td>
                <td className="py-3.5 px-3 font-bold text-slate-300">-4.5 CR</td>
                <td className="py-3.5 px-3 text-slate-400 text-[11px]">3.12s • 1h ago</td>
              </tr>

              <tr className="hover:bg-[#06070B]/50 transition-colors">
                <td className="py-3.5 px-3 font-bold text-white">job_8a92c99</td>
                <td className="py-3.5 px-3 font-bold text-slate-200">CHRONO BLADE: OMEGA</td>
                <td className="py-3.5 px-3 text-slate-300">🌌 Canon Embeddings Sync (Vector Store)</td>
                <td className="py-3.5 px-3">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                    ● SUCCESS
                  </span>
                </td>
                <td className="py-3.5 px-3 font-bold text-slate-300">-1.0 CR</td>
                <td className="py-3.5 px-3 text-slate-400 text-[11px]">0.94s • 2h ago</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* New Project Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Launch New Story Canon Project"
        subtitle="Configure format parameters, canvas geometry, and initial narrative blueprint."
      >
        <form onSubmit={handleCreateProject} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">CANON TITLE *</label>
            <input
              type="text"
              required
              placeholder="e.g. CYBER-RONIN 2099"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full bg-[#06070B] border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-[#D8FF65]"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">FORMAT & PUBLICATION LAYOUT *</label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'MANGA', label: 'Manga B&W + Screentone', desc: 'Shonen/Seinen right-to-left' },
                { id: 'WEBTOON', label: 'Korean Webtoon Vertical', desc: 'Continuous mobile scroll' },
                { id: 'COMIC', label: 'US Comic Book', desc: '22-page standard color' },
                { id: 'FRANCO_BELGE', label: 'Franco-Belge Album', desc: 'High detail 48-page' }
              ].map((fmt) => (
                <div
                  key={fmt.id}
                  onClick={() => setNewFormat(fmt.id as FormatType)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    newFormat === fmt.id
                      ? 'border-[#D8FF65] bg-[#D8FF65]/10 text-white'
                      : 'border-slate-800 bg-[#06070B] text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="text-xs font-bold text-white">{fmt.label}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{fmt.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">CANON LOGLINE / PITCH</label>
            <textarea
              rows={2}
              placeholder="High-level narrative logline..."
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="w-full bg-[#06070B] border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-[#D8FF65]"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">COVER ARTWORK URL</label>
            <input
              type="text"
              value={newCover}
              onChange={(e) => setNewCover(e.target.value)}
              className="w-full bg-[#06070B] border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-[#D8FF65]"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-mono text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#D8FF65] text-[#06070B] font-extrabold text-xs font-mono hover:bg-[#cbf54f] transition-all"
            >
              Bootstrap Canon Project
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
