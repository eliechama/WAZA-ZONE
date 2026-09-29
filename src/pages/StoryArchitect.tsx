import React, { useState } from 'react';
import { useProject } from '../context/ProjectContext';
import {
  FileText,
  Sparkles,
  Zap,
  Check,
  Copy,
  Clock,
  Anchor,
  LayoutGrid,
  Plus,
  ArrowRight,
  Sliders,
  Share2,
  SlidersHorizontal,
  Trash2,
  Camera,
  Mic2,
  Sun,
  ShieldCheck,
  Bot,
  Layers,
  ChevronDown,
  ChevronRight,
  Folder,
  FolderOpen,
  BookOpen,
  ArrowUpDown,
  Lock,
  RefreshCw,
  Send,
  AlertCircle
} from 'lucide-react';

interface Beat {
  id: string;
  number: string;
  title: string;
  isClimax?: boolean;
  tags: { label: string; variant?: 'action' | 'dialogue' | 'twist' | 'climax' | 'suspense' }[];
  panelsCount: string;
  description: string;
  dialogue?: string;
  cameraOrAudio?: {
    type: 'camera' | 'audio' | 'lighting';
    label: string;
  };
  hasImage?: boolean;
  imageUrl?: string;
  sfx?: string;
  aspect?: string;
}

export const StoryArchitect: React.FC = () => {
  const { setActiveView } = useProject();

  // Active Scene Selection
  const [selectedScene, setSelectedScene] = useState<'sc_01' | 'sc_02' | 'sc_03' | 'sc_04'>('sc_03');

  // Hierarchy expand states
  const [isArc1Open, setIsArc1Open] = useState(true);
  const [isArc2Open, setIsArc2Open] = useState(false);
  const [isArc3Open, setIsArc3Open] = useState(false);

  // AI Narrative Co-Pilot Form
  const [pacingDirective, setPacingDirective] = useState(
    "Refine Beat 04 action pacing with Japanese shonen sound effects (SFX) cue and ensure Ren's amber optic flare is highlighted."
  );
  const [guardrails, setGuardrails] = useState({
    shonenRhythm: true,
    worldBibleSlang: true,
    lockCharacterVoice: true
  });
  const [isRegenerating, setIsRegenerating] = useState(false);

  // Gemini 2.0 Dialogue Refinement
  const [dialogueQuip, setDialogueQuip] = useState(
    "Enhance Ren's combat quip: Cold, calculated, under"
  );
  const [isRefiningBeat, setIsRefiningBeat] = useState(false);
  const [refinedDialogueSuccess, setRefinedDialogueSuccess] = useState(false);

  // Continuity Packet copy feedback
  const [copiedPayload, setCopiedPayload] = useState(false);

  // Storyboard Dispatch Toast / State
  const [isDispatching, setIsDispatching] = useState(false);
  const [dispatchSuccess, setDispatchSuccess] = useState(false);

  // Beats list for Scene 03
  const [beats, setBeats] = useState<Beat[]>([
    {
      id: 'beat-1',
      number: 'BEAT 01',
      title: 'Establishing Tactical Infiltration',
      tags: [
        { label: 'Action', variant: 'action' },
        { label: 'Establishing Wide', variant: 'action' }
      ],
      panelsCount: '2 Panels',
      description:
        'Ren lands on the rain-slicked helipad surface, his trench coat drenched. He crouches low, silently scanning thermal patrol drones circling the Shibuya skytower above.',
      cameraOrAudio: {
        type: 'camera',
        label: 'Camera: Low Dutch-angle, reflective water puddles, lens flare.'
      }
    },
    {
      id: 'beat-2',
      number: 'BEAT 02',
      title: 'Distorted Static Comms Warning',
      tags: [
        { label: 'Dialogue', variant: 'dialogue' },
        { label: 'Close-up', variant: 'dialogue' }
      ],
      panelsCount: '1 Panel',
      description:
        'Aoi\'s comms link crackles violently with high-frequency interference: "Ren, pull out now! They know your bio-frequency—Vesper\'s already on the roof—" The transmission cuts into violent hiss.',
      cameraOrAudio: {
        type: 'audio',
        label: 'Audio SFX: Zzzz-krrk! (ガガガ)'
      }
    },
    {
      id: 'beat-3',
      number: 'BEAT 03',
      title: 'Sudden Sensor Blindness',
      tags: [
        { label: 'Sensory Twist', variant: 'twist' },
        { label: 'Dynamic Angle', variant: 'twist' }
      ],
      panelsCount: '2 Panels',
      description:
        'A cluster of EMP grenades detonates with zero audible blast. Rooftop floodlights implode into sparks. The cityscape blacks out for 3 city blocks, dropping the environment into starlit abyss.',
      cameraOrAudio: {
        type: 'lighting',
        label: 'Lighting: Abrupt shift from harsh sodium-yellow glare to pure silhouette blacks.'
      }
    },
    {
      id: 'beat-4',
      number: 'BEAT 04 • CLIMAX',
      title: 'Blade Ignition in Rain',
      isClimax: true,
      tags: [
        { label: 'Full Splash Page', variant: 'climax' },
        { label: 'Hero Angle', variant: 'climax' }
      ],
      panelsCount: 'Full Splash',
      description:
        'Ren draws the Chrono Blade. A high-voltage crimson plasma edge ignites with a violent hiss against ambient raindrops. His right cybernetic iris shifts from dull grey to blazing kinetic amber.',
      hasImage: true,
      imageUrl: '/src/assets/images/waza_chrono_blade_beat04_1790681240146.jpg',
      sfx: 'ドォン (THOOOM)',
      aspect: '16:9 Cinema Splash'
    },
    {
      id: 'beat-5',
      number: 'BEAT 05',
      title: 'The Enforcer Descent',
      tags: [
        { label: 'Action', variant: 'action' },
        { label: 'Over-shoulder', variant: 'action' }
      ],
      panelsCount: '2 Panels',
      description:
        'Vesper-09 crashes through the helipad skylight, hydraulic landing gears cracking the concrete slab. Dual pulse carbines locked onto Ren\'s torso.'
    },
    {
      id: 'beat-6',
      number: 'BEAT 06',
      title: 'Standoff Cliffhanger Freeze-Frame',
      tags: [
        { label: 'Suspense', variant: 'suspense' },
        { label: 'Split Duel Cut', variant: 'suspense' }
      ],
      panelsCount: '1 Panel',
      description:
        'Dual extreme close-up: Ren\'s luminous amber gaze vs. Vesper\'s optical targeting visor blinking crimson: \'LOCK CONFIRMED\'.'
    }
  ]);

  const toggleGuardrail = (key: keyof typeof guardrails) => {
    setGuardrails((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleRegenerateBeats = () => {
    setIsRegenerating(true);
    setTimeout(() => {
      setIsRegenerating(false);
    }, 1200);
  };

  const handleRefineDialogue = () => {
    setIsRefiningBeat(true);
    setTimeout(() => {
      setIsRefiningBeat(false);
      setRefinedDialogueSuccess(true);
      setTimeout(() => setRefinedDialogueSuccess(false), 3000);
    }, 900);
  };

  const handleCopyPayload = () => {
    const payload = {
      sceneId: 'sc_03',
      characters: ['ren_kurogane', 'aoi_vance', 'vesper_09'],
      location: 'loc_shibuya_helipad_09',
      mood: 'rain_slick_noir',
      beatsCount: 6,
      panelAllocation: 12,
      pipelineState: 'READY_DISPATCH'
    };
    navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
    setCopiedPayload(true);
    setTimeout(() => setCopiedPayload(false), 2000);
  };

  const handleDispatchToStoryboard = () => {
    setIsDispatching(true);
    setTimeout(() => {
      setIsDispatching(false);
      setDispatchSuccess(true);
      setTimeout(() => {
        setDispatchSuccess(false);
        setActiveView('storyboard');
      }, 1000);
    }, 1100);
  };

  return (
    <div className="space-y-4 max-w-[1720px] mx-auto pb-16 font-sans">
      
      {/* ======================================================== */}
      {/* 1. TOP BREADCRUMB & CONTROL BAR                          */}
      {/* ======================================================== */}
      <div className="border-b border-[#1E2230] pb-4">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          
          {/* Breadcrumb + Metadata Pills */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono">
            <div className="flex items-center gap-2 text-slate-300">
              <span className="text-[#D8FF65] font-black flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#D8FF65]" />
                <span>STORY ARCHITECT</span>
              </span>
              <span className="text-slate-600">/</span>
              <span className="text-slate-400">CHRONO BLADE: OMEGA</span>
              <span className="text-slate-600">/</span>
              <span className="text-slate-400">Arc 01: Genesis Protocol</span>
              <span className="text-slate-600">/</span>
              <span className="text-[#68E7FF] font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#68E7FF]" />
                <span>Ep 01: Ghosts of Old Shibuya</span>
              </span>
            </div>

            <span className="text-slate-700 hidden md:inline">|</span>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-[#11131A] text-slate-300 border border-[#23293D] flex items-center gap-1.5">
                <Clock className="w-3 h-3 text-[#4FACFE]" />
                <span>PACING: <strong>Shonen 3-Act Classical</strong></span>
              </span>

              <span className="px-2 py-0.5 rounded bg-[#11131A] text-slate-300 border border-[#23293D] flex items-center gap-1.5">
                <Anchor className="w-3 h-3 text-[#9D78FF]" />
                <span>ANCHOR: <strong>World Bible v3.4.1</strong></span>
              </span>

              <span className="px-2 py-0.5 rounded bg-[#11131A] text-slate-300 border border-[#23293D] flex items-center gap-1.5">
                <LayoutGrid className="w-3 h-3 text-slate-400" />
                <span>EST. PANELS: <strong>48 Pnl</strong></span>
              </span>

              <span className="px-2.5 py-0.5 rounded bg-[#1A1F10] text-[#D8FF65] border border-[#3E4A1E] font-bold flex items-center gap-1">
                <Zap className="w-3 h-3 text-[#D8FF65]" />
                <span>24 CR Reserved</span>
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => {}}
              className="px-3 py-1.5 rounded-xl bg-[#11131A] hover:bg-[#181B26] border border-[#262C40] text-xs font-mono text-slate-200 flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-slate-400" />
              <span>New Scene</span>
            </button>

            <button
              onClick={() => {}}
              className="px-3 py-1.5 rounded-xl bg-[#11131A] hover:bg-[#181B26] border border-[#262C40] text-xs font-mono text-slate-200 flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
            >
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <span>Re-order Sequence</span>
            </button>

            <button
              onClick={handleRegenerateBeats}
              disabled={isRegenerating}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#6B46C1]/30 to-[#9D78FF]/20 hover:from-[#6B46C1]/40 hover:to-[#9D78FF]/30 border border-[#9D78FF]/40 text-xs font-mono font-bold text-[#D8B4FE] flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
            >
              <Sparkles className={`w-3.5 h-3.5 text-[#D8B4FE] ${isRegenerating ? 'animate-spin' : ''}`} />
              <span>{isRegenerating ? 'Generating Beats...' : 'Generate AI Scene Beats (Gemini 2.0)'}</span>
            </button>

            <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-[#38EF7D] px-2 py-1">
              <span className="w-2 h-2 rounded-full bg-[#38EF7D] animate-pulse" />
              <span>ENGINE: READY</span>
            </div>

            <button
              onClick={handleDispatchToStoryboard}
              disabled={isDispatching}
              className="px-4 py-2 rounded-xl bg-[#D8FF65] hover:bg-[#cbfa4e] text-[#090A0F] text-xs font-black font-sans flex items-center gap-1.5 transition-all shadow-lg shadow-[#D8FF65]/20 cursor-pointer"
            >
              <span>{isDispatching ? 'Committing...' : 'Commit to Storyboard Pipeline'}</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        </div>

        {/* Dispatch Notification Banner */}
        {dispatchSuccess && (
          <div className="mt-3 p-3 rounded-xl bg-[#091F14] border border-[#38EF7D]/40 text-xs font-mono text-[#38EF7D] flex items-center gap-2.5 animate-in fade-in">
            <Check className="w-4 h-4 shrink-0 stroke-[3]" />
            <span>COMMITTED TO STORYBOARD PIPELINE: Scene 03 serialized into 12 panel generation jobs. Redirecting...</span>
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* 2. THREE-COLUMN ARCHITECTURE GRID                        */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

        {/* ====================================================== */}
        {/* COLUMN 1: STORY HIERARCHY & SCENES LIST (3 cols)       */}
        {/* ====================================================== */}
        <div className="lg:col-span-3 space-y-4">
          
          {/* Card 1: Story Hierarchy Tree */}
          <div className="bg-[#11131A] border border-[#1E2230] rounded-2xl p-4 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold tracking-wider text-slate-300 uppercase">
                STORY HIERARCHY
              </span>
              <span className="text-[10px] font-mono text-slate-400 bg-[#090A0F] border border-[#1E2230] px-2 py-0.5 rounded">
                3 Arcs Loaded
              </span>
            </div>

            <div className="space-y-1.5 text-xs font-mono">
              {/* Arc 01: Genesis Protocol (Expanded) */}
              <div className="space-y-1">
                <div
                  onClick={() => setIsArc1Open(!isArc1Open)}
                  className="p-2 rounded-xl bg-[#141724] border border-[#232A44] flex items-center justify-between cursor-pointer text-slate-200 font-bold"
                >
                  <div className="flex items-center gap-2">
                    <FolderOpen className="w-3.5 h-3.5 text-[#4FACFE]" />
                    <span className="text-white">Arc 01: Genesis Protocol</span>
                  </div>
                  <span className="text-[10px] text-slate-400">Ep 1-4</span>
                </div>

                {isArc1Open && (
                  <div className="pl-3 space-y-1 border-l-2 border-[#1E2230] ml-3 mt-1">
                    {/* Ep 01: Active */}
                    <div className="p-2 rounded-lg bg-[#181D29] border border-[#4FACFE]/50 text-[#68E7FF] font-bold flex items-center justify-between cursor-pointer">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-3 h-3 text-[#D8FF65]" />
                        <span className="text-xs">Ep 01: Ghosts of Old Shibuya</span>
                      </div>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#D8FF65]/15 text-[#D8FF65] border border-[#D8FF65]/30">
                        4 Sc
                      </span>
                    </div>

                    <div className="p-2 rounded-lg hover:bg-[#141822] text-slate-400 hover:text-slate-200 flex items-center justify-between cursor-pointer transition-colors">
                      <span className="text-xs">Ep 02: Neon Glitch</span>
                      <span className="text-[10px] text-slate-500">3 Sc</span>
                    </div>

                    <div className="p-2 rounded-lg hover:bg-[#141822] text-slate-400 hover:text-slate-200 flex items-center justify-between cursor-pointer transition-colors">
                      <span className="text-xs">Ep 03: Kurogane Bloodline</span>
                      <span className="text-[10px] text-slate-500">5 Sc</span>
                    </div>

                    <div className="p-2 rounded-lg hover:bg-[#141822] text-slate-400 hover:text-slate-200 flex items-center justify-between cursor-pointer transition-colors">
                      <span className="text-xs">Ep 04: The Severed Tether</span>
                      <span className="text-[10px] text-slate-500">4 Sc</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Arc 02 (Collapsed) */}
              <div
                onClick={() => setIsArc2Open(!isArc2Open)}
                className="p-2 rounded-xl bg-[#090A0F] border border-[#1E2230] hover:bg-[#141822] flex items-center justify-between cursor-pointer text-slate-400 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Folder className="w-3.5 h-3.5 text-slate-500" />
                  <span>Arc 02: Neon Shadows</span>
                </div>
                <span className="text-[10px] text-slate-500">Ep 5-8</span>
              </div>

              {/* Arc 03 (Collapsed) */}
              <div
                onClick={() => setIsArc3Open(!isArc3Open)}
                className="p-2 rounded-xl bg-[#090A0F] border border-[#1E2230] hover:bg-[#141822] flex items-center justify-between cursor-pointer text-slate-400 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Folder className="w-3.5 h-3.5 text-slate-500" />
                  <span>Arc 03: The Singularity Core</span>
                </div>
                <span className="text-[10px] text-slate-500">Ep 9-12</span>
              </div>
            </div>
          </div>

          {/* Card 2: Episode 01 Scenes List */}
          <div className="bg-[#11131A] border border-[#1E2230] rounded-2xl p-4 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold tracking-wider text-slate-300 uppercase">
                EPISODE 01 SCENES
              </span>
              <span className="text-[10px] font-mono text-[#D8FF65] bg-[#1A1F10] border border-[#3E4A1E] px-2 py-0.5 rounded font-bold">
                Act I Climax
              </span>
            </div>

            <div className="space-y-2">
              {/* Scene 01: Done */}
              <div
                onClick={() => setSelectedScene('sc_01')}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  selectedScene === 'sc_01'
                    ? 'bg-[#181D29] border-[#4FACFE]/70'
                    : 'bg-[#090A0F] border-[#1E2230] hover:bg-[#141822]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase text-slate-500">SCENE 01</span>
                  <span className="text-[10px] font-mono text-[#38EF7D] bg-[#0E261B] border border-[#1E5037] px-2 py-0.2 rounded font-bold">
                    Done
                  </span>
                </div>
                <h4 className="text-xs font-bold text-white mt-1">Alleyway Extraction</h4>
                <p className="text-[10px] font-mono text-slate-400 mt-0.5">5 Beats • Establish</p>
              </div>

              {/* Scene 02: Done */}
              <div
                onClick={() => setSelectedScene('sc_02')}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  selectedScene === 'sc_02'
                    ? 'bg-[#181D29] border-[#4FACFE]/70'
                    : 'bg-[#090A0F] border-[#1E2230] hover:bg-[#141822]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase text-slate-500">SCENE 02</span>
                  <span className="text-[10px] font-mono text-[#38EF7D] bg-[#0E261B] border border-[#1E5037] px-2 py-0.2 rounded font-bold">
                    Done
                  </span>
                </div>
                <h4 className="text-xs font-bold text-white mt-1">Neon Monorail Pursuit</h4>
                <p className="text-[10px] font-mono text-slate-400 mt-0.5">8 Beats • Rising Action</p>
              </div>

              {/* Scene 03: ACTIVE (Highlighted) */}
              <div
                onClick={() => setSelectedScene('sc_03')}
                className="p-3 rounded-xl bg-[#181E2C] border-2 border-[#4FACFE] shadow-lg shadow-[#4FACFE]/10 transition-all cursor-pointer relative"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase text-[#4FACFE] font-black flex items-center gap-1.5">
                    <span>SCENE 03</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4FACFE] animate-pulse" />
                  </span>
                  <span className="text-[10px] font-mono font-black text-[#D8FF65] bg-[#D8FF65]/15 border border-[#D8FF65]/40 px-2 py-0.2 rounded uppercase">
                    ACTIVE
                  </span>
                </div>
                <h4 className="text-xs font-black text-white mt-1">Shibuya Roof...</h4>
                <p className="text-[10px] font-mono text-[#68E7FF] mt-0.5">6 Beats • In Editing</p>
              </div>

              {/* Scene 04: Queue */}
              <div
                onClick={() => setSelectedScene('sc_04')}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  selectedScene === 'sc_04'
                    ? 'bg-[#181D29] border-[#4FACFE]/70'
                    : 'bg-[#090A0F] border-[#1E2230] hover:bg-[#141822]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase text-slate-500">SCENE 04</span>
                  <span className="text-[10px] font-mono text-slate-400 bg-[#161B26] border border-[#252D3F] px-2 py-0.2 rounded font-bold">
                    Queue
                  </span>
                </div>
                <h4 className="text-xs font-medium text-slate-300 mt-1">The Enforcer Confront...</h4>
                <p className="text-[10px] font-mono text-slate-500 mt-0.5">Pending Architect</p>
              </div>
            </div>
          </div>

          {/* Card 3: Dramatic Arc Telemetry (SVG Curve) */}
          <div className="bg-[#11131A] border border-[#1E2230] rounded-2xl p-4 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold tracking-wider text-slate-300 uppercase">
                DRAMATIC ARC TELEMETRY
              </span>
              <span className="text-[10px] font-mono text-[#D8FF65] bg-[#1A1F10] border border-[#3E4A1E] px-2 py-0.5 rounded font-black">
                Peak: 95%
              </span>
            </div>

            {/* SVG Tension Curve Chart */}
            <div className="pt-2">
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 px-1 mb-1">
                <span>Act I (20%)</span>
                <span className="text-[#D8FF65] font-bold">Scene 03 (78%)</span>
                <span>Climax (95%)</span>
              </div>

              <div className="relative h-20 w-full bg-[#090A0F] rounded-xl border border-[#1E2230] overflow-hidden p-1">
                <svg className="w-full h-full" viewBox="0 0 300 80" preserveAspectRatio="none">
                  {/* Subtle Grid Lines */}
                  <line x1="0" y1="20" x2="300" y2="20" stroke="#1E2230" strokeDasharray="3 3" />
                  <line x1="0" y1="50" x2="300" y2="50" stroke="#1E2230" strokeDasharray="3 3" />

                  {/* Gradient under curve */}
                  <defs>
                    <linearGradient id="tensionGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#D8FF65" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#D8FF65" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  <path
                    d="M 10,65 Q 100,55 180,25 T 290,8 L 290,75 L 10,75 Z"
                    fill="url(#tensionGrad)"
                  />

                  {/* Tension Curve Line */}
                  <path
                    d="M 10,65 Q 100,55 180,25 T 290,8"
                    fill="none"
                    stroke="#D8FF65"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />

                  {/* Dotted indicator for Scene 03 at x=180 */}
                  <line x1="180" y1="10" x2="180" y2="70" stroke="#D8FF65" strokeWidth="1.5" strokeDasharray="3 3" />
                  <circle cx="180" cy="25" r="4" fill="#D8FF65" stroke="#090A0F" strokeWidth="2" />
                </svg>
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mt-2">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-[#D8FF65]" />
                  <span>Current Tension: <strong className="text-white">High Spike</strong></span>
                </span>
                <span className="text-slate-500">Target: 4-Beat Cadence</span>
              </div>
            </div>
          </div>

        </div>

        {/* ====================================================== */}
        {/* COLUMN 2: CENTER STAGE - SCENE SPEC & BEATS (5 cols)   */}
        {/* ====================================================== */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Header Block: Scene 03 Spec */}
          <div className="bg-[#11131A] border border-[#1E2230] rounded-2xl p-5 shadow-xl space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded bg-[#2D2A14] text-[#D8FF65] border border-[#524E22] text-[10px] font-mono font-black tracking-wider uppercase">
                    SCENE 03 SPEC
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    Seq ID: <strong className="text-slate-200">#SC_8820_TOK</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-1 rounded-lg bg-[#090A0F] border border-[#1E2230] text-slate-400 hover:text-white cursor-pointer">
                    <Sliders className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-1 rounded-lg bg-[#090A0F] border border-[#1E2230] text-slate-400 hover:text-white cursor-pointer">
                    <Share2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <h2 className="text-xl md:text-2xl font-black text-white mt-2 tracking-tight">
                Shibuya Rooftop Ambush
              </h2>
            </div>

            {/* Location & Cast Metadata Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block">LOCATION ANCHOR</span>
                <p className="text-slate-300 flex items-center gap-1.5 flex-wrap">
                  <span className="text-[#4FACFE] font-bold underline cursor-pointer">
                    @loc_shibuya_helipad_09
                  </span>
                  <span className="text-slate-500 text-[11px]">(Rain / Storm)</span>
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block">CAST IN SCENE</span>
                <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                  <span className="px-2 py-0.5 rounded bg-[#090A0F] text-[#68E7FF] border border-[#1E2230] font-bold">
                    @ren_kurogane
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#090A0F] text-[#9D78FF] border border-[#1E2230] font-bold">
                    @aoi_vance
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#090A0F] text-[#FF6B6B] border border-[#1E2230] font-bold">
                    @vesper_09
                  </span>
                </div>
              </div>
            </div>

            {/* Dramatic Objective & Dynamic */}
            <div className="space-y-1 pt-1 border-t border-[#1E2230]">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                DRAMATIC OBJECTIVE & DYNAMIC
              </span>
              <p className="text-xs text-slate-300 italic font-serif leading-relaxed">
                "High-stakes tactical tension escalating into instant lethality as Ren discovers his comms are jammed right before EMP blackout."
              </p>
            </div>
          </div>

          {/* Beat Sheet Breakdown Header */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white tracking-wide">
                Beat Sheet Breakdown
              </h3>
              <span className="text-[10px] font-mono text-[#D8FF65] bg-[#1A1F10] border border-[#3E4A1E] px-2 py-0.5 rounded font-black">
                6 Total Beats
              </span>
            </div>

            <button
              onClick={() => {}}
              className="text-xs font-mono text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-[#D8FF65]" />
              <span>Insert Micro-Beat</span>
            </button>
          </div>

          {/* Beats Cards List */}
          <div className="space-y-3">
            {beats.map((beat) => (
              <div
                key={beat.id}
                className={`rounded-2xl border p-4 space-y-3 transition-all ${
                  beat.isClimax
                    ? 'bg-[#141620] border-[#9D78FF]/70 shadow-xl shadow-[#9D78FF]/5'
                    : 'bg-[#11131A] border-[#1E2230] hover:border-slate-700'
                }`}
              >
                {/* Beat Header Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-mono font-black px-2 py-0.5 rounded ${
                        beat.isClimax
                          ? 'bg-[#9D78FF]/20 text-[#D8B4FE] border border-[#9D78FF]/40'
                          : 'bg-[#1E2333] text-[#68E7FF] border border-[#2B3B59]'
                      }`}
                    >
                      {beat.number}
                    </span>
                    <h4 className="text-xs font-bold text-white">{beat.title}</h4>
                  </div>

                  <div className="flex items-center gap-1.5 text-[10px] font-mono">
                    {beat.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className={`px-2 py-0.5 rounded font-bold ${
                          t.variant === 'climax'
                            ? 'bg-[#D8FF65]/15 text-[#D8FF65] border border-[#D8FF65]/30'
                            : t.variant === 'dialogue'
                            ? 'bg-[#4FACFE]/15 text-[#4FACFE] border border-[#4FACFE]/30'
                            : t.variant === 'twist'
                            ? 'bg-[#FFA94D]/15 text-[#FFA94D] border border-[#FFA94D]/30'
                            : 'bg-[#090A0F] text-slate-300 border border-[#1E2230]'
                        }`}
                      >
                        {t.label}
                      </span>
                    ))}
                    <span className="text-[#38EF7D] bg-[#0E261B] border border-[#1E5037] px-2 py-0.5 rounded font-bold">
                      {beat.panelsCount}
                    </span>
                  </div>
                </div>

                {/* Beat Narrative Description */}
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {beat.description}
                </p>

                {/* Beat 04 Special: Image Asset Showcase & Dialogue Polisher */}
                {beat.hasImage && (
                  <div className="space-y-3 pt-1">
                    <div className="rounded-xl overflow-hidden border border-[#1E2230] bg-black relative aspect-[16/9] group">
                      <img
                        src={beat.imageUrl}
                        alt="Chrono Blade Ignition in Rain"
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                      />
                      {/* Visual overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                      <div className="absolute bottom-3 left-3 flex flex-wrap items-center gap-2 text-[10px] font-mono">
                        <span className="px-2 py-0.5 rounded bg-black/80 text-[#D8FF65] border border-[#D8FF65]/40 font-bold backdrop-blur-md">
                          SFX: {beat.sfx}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-black/80 text-slate-200 border border-[#1E2230] backdrop-blur-md">
                          Aspect: {beat.aspect}
                        </span>
                      </div>

                      <div className="absolute bottom-3 right-3 text-[10px] font-mono text-[#D8B4FE] bg-black/80 px-2 py-0.5 rounded border border-[#9D78FF]/30 backdrop-blur-md">
                        Gemini Generated Concept
                      </div>
                    </div>

                    {/* Gemini 2.0 Dialogue & SFX Polisher Box */}
                    <div className="p-3.5 rounded-xl bg-[#090A0F] border border-[#2B3550] space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-[#D8B4FE] flex items-center gap-1.5 uppercase">
                          <Sparkles className="w-3.5 h-3.5 text-[#D8B4FE]" />
                          <span>Gemini 2.0 Dialogue & SFX Polisher</span>
                        </span>
                        <span className="text-[10px] font-mono text-[#38EF7D] bg-[#0E261B] border border-[#1E5037] px-1.5 py-0.2 rounded font-bold">
                          🛡 Zod Validated
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={dialogueQuip}
                          onChange={(e) => setDialogueQuip(e.target.value)}
                          className="flex-1 bg-[#141724] border border-[#1E2230] rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500 font-mono focus:outline-none focus:border-[#9D78FF]"
                        />
                        <button
                          onClick={handleRefineDialogue}
                          disabled={isRefiningBeat}
                          className="px-3 py-1.5 rounded-xl bg-[#9D78FF] hover:bg-[#8B5CF6] text-white text-xs font-mono font-bold flex items-center gap-1 shrink-0 transition-all cursor-pointer"
                        >
                          <Zap className={`w-3.5 h-3.5 ${isRefiningBeat ? 'animate-spin' : ''}`} />
                          <span>{isRefiningBeat ? 'Refining...' : 'Refine Beat'}</span>
                        </button>
                      </div>

                      {/* Suggestions Chips */}
                      <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-slate-400">
                        <span className="text-slate-500 text-[10px]">Suggestions:</span>
                        <button
                          onClick={() => setDialogueQuip('"Three seconds is too long."')}
                          className="px-2 py-0.5 rounded bg-[#161B26] hover:bg-[#202738] text-slate-300 border border-[#252D3F] transition-colors cursor-pointer"
                        >
                          "Three seconds is too long."
                        </button>
                        <button
                          onClick={() => setDialogueQuip('"Target acquired. Commencing purge."')}
                          className="px-2 py-0.5 rounded bg-[#161B26] hover:bg-[#202738] text-slate-300 border border-[#252D3F] transition-colors cursor-pointer"
                        >
                          "Target acquired. Commencing purge."
                        </button>
                      </div>

                      {refinedDialogueSuccess && (
                        <div className="text-[10px] font-mono text-[#38EF7D] flex items-center gap-1">
                          <Check className="w-3 h-3 stroke-[3]" />
                          <span>Dialogue variation synced with Ren's canon vocal matrix!</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Metadata Footer: Camera / Audio / Lighting */}
                {beat.cameraOrAudio && (
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2 border-t border-[#1E2230]">
                    <div className="flex items-center gap-1.5">
                      {beat.cameraOrAudio.type === 'camera' && <Camera className="w-3.5 h-3.5 text-[#4FACFE]" />}
                      {beat.cameraOrAudio.type === 'audio' && <Mic2 className="w-3.5 h-3.5 text-[#FFA94D]" />}
                      {beat.cameraOrAudio.type === 'lighting' && <Sun className="w-3.5 h-3.5 text-[#D8FF65]" />}
                      <span>{beat.cameraOrAudio.label}</span>
                    </div>

                    <div className="flex items-center gap-2 text-slate-500">
                      <button className="hover:text-slate-300 cursor-pointer">
                        <SlidersHorizontal className="w-3 h-3" />
                      </button>
                      <button className="hover:text-red-400 cursor-pointer">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                )}

                {!beat.cameraOrAudio && !beat.hasImage && (
                  <div className="flex items-center justify-end text-slate-500 pt-1">
                    <div className="flex items-center gap-2">
                      <button className="hover:text-slate-300 cursor-pointer">
                        <SlidersHorizontal className="w-3 h-3" />
                      </button>
                      <button className="hover:text-red-400 cursor-pointer">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>

        {/* ====================================================== */}
        {/* COLUMN 3: RIGHT PANEL - AI CO-PILOT & DISPATCH (4 cols) */}
        {/* ====================================================== */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Card 1: AI Narrative Co-Pilot (Gemini 2.0 Flash) */}
          <div className="bg-[#11131A] border border-[#1E2230] rounded-2xl p-4 md:p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-[#D8B4FE]" />
                <h3 className="text-xs font-mono font-bold tracking-wider text-slate-200 uppercase">
                  AI Narrative Co-Pilot
                </h3>
              </div>
              <span className="text-[10px] font-mono font-bold text-[#4FACFE] bg-[#10202F] border border-[#1E3A5F] px-2 py-0.5 rounded">
                Gemini 2.0 Flash
              </span>
            </div>

            {/* Direct Pacing Directive */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-bold">
                DIRECT PACING DIRECTIVE
              </span>
              <textarea
                rows={3}
                value={pacingDirective}
                onChange={(e) => setPacingDirective(e.target.value)}
                className="w-full bg-[#090A0F] border border-[#1E2230] rounded-xl p-3 text-xs text-slate-200 font-mono focus:outline-none focus:border-[#9D78FF] leading-relaxed resize-none"
              />
            </div>

            {/* Narrative Guardrails Checkboxes */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-bold">
                NARRATIVE GUARDRAILS
              </span>

              <div className="space-y-2 pt-0.5">
                {[
                  { key: 'shonenRhythm', label: 'Follow Shonen Jump Rhythm' },
                  { key: 'worldBibleSlang', label: 'Enforce World Bible Slang' },
                  { key: 'lockCharacterVoice', label: 'Lock Character Voice Profile' }
                ].map((item) => {
                  const checked = guardrails[item.key as keyof typeof guardrails];
                  return (
                    <label
                      key={item.key}
                      onClick={() => toggleGuardrail(item.key as any)}
                      className="flex items-center gap-2.5 cursor-pointer group select-none"
                    >
                      <div
                        className={`w-4 h-4 rounded flex items-center justify-center transition-all shrink-0 ${
                          checked
                            ? 'bg-[#1C2333] border border-[#4FACFE] text-[#4FACFE]'
                            : 'bg-[#090A0F] border border-slate-700'
                        }`}
                      >
                        {checked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className="text-xs font-mono text-slate-300 group-hover:text-white">
                        {item.label}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Regenerate Scene Beats Button */}
            <button
              onClick={handleRegenerateBeats}
              disabled={isRegenerating}
              className="w-full py-2.5 rounded-xl bg-[#161B26] hover:bg-[#202738] border border-[#2B3550] hover:border-[#9D78FF]/50 text-xs font-mono font-bold text-slate-200 flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#9D78FF] ${isRegenerating ? 'animate-spin' : ''}`} />
              <span>{isRegenerating ? 'Regenerating Beats...' : 'Regenerate Scene Beats'}</span>
            </button>
          </div>

          {/* Card 2: Continuity Packet Payload (Schema v2.4) */}
          <div className="bg-[#11131A] border border-[#1E2230] rounded-2xl p-4 md:p-5 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold tracking-wider text-slate-300 uppercase">
                CONTINUITY PACKET PAYLOAD
              </span>
              <span className="text-[10px] font-mono font-bold text-[#4FACFE] bg-[#10202F] border border-[#1E3A5F] px-2 py-0.5 rounded">
                Schema: v2.4
              </span>
            </div>

            <p className="text-[11px] text-slate-400 font-mono leading-relaxed">
              Auto-serialized JSON metadata dispatched downstream to the Panel Layout Engine.
            </p>

            {/* Code Block */}
            <div className="relative">
              <pre className="p-3.5 rounded-xl bg-[#090A0F] border border-[#1E2230] text-[11px] font-mono text-[#38EF7D] overflow-x-auto leading-relaxed max-h-52">
{`{
  "sceneId": "sc_03",
  "characters": [
    "ren_kurogane",
    "aoi_vance",
    "vesper_09"
  ],
  "location": "loc_shibuya_hel...",
  "mood": "rain_slick_noir",
  "beatsCount": 6,
  "panelAllocation": 12,
  "pipelineState": "READY_DISPATCH"
}`}
              </pre>
            </div>

            {/* Sync Integrity & Copy */}
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1">
              <span className="text-[#38EF7D] flex items-center gap-1.5 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#38EF7D]" />
                <span>Sync Integrity: 100%</span>
              </span>

              <button
                onClick={handleCopyPayload}
                className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                {copiedPayload ? <Check className="w-3 h-3 text-[#38EF7D]" /> : <Copy className="w-3 h-3" />}
                <span>{copiedPayload ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Card 3: Storyboard Pipeline Dispatch */}
          <div className="bg-[#11131A] border border-[#1E2230] rounded-2xl p-4 md:p-5 shadow-xl space-y-4">
            <div className="flex items-center gap-2">
              <LayoutGrid className="w-4 h-4 text-[#D8FF65]" />
              <h3 className="text-xs font-mono font-bold tracking-wider text-white uppercase">
                Storyboard Pipeline Dispatch
              </h3>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-[#090A0F] border border-[#1E2230] space-y-1">
                <span className="text-[9px] uppercase tracking-wider text-slate-500">PANELS TO BUILD</span>
                <p className="font-black text-white text-sm">12 Panels</p>
              </div>

              <div className="p-3 rounded-xl bg-[#090A0F] border border-[#1E2230] space-y-1">
                <span className="text-[9px] uppercase tracking-wider text-slate-500">EST. GEN TIME</span>
                <p className="font-black text-[#4FACFE] text-sm">~8.2 sec</p>
              </div>
            </div>

            {/* Ledger Reservation Line */}
            <div className="p-3 rounded-xl bg-[#090A0F] border border-[#1E2230] flex items-center justify-between text-xs font-mono">
              <div className="space-y-0.5">
                <span className="text-[9px] text-slate-500 uppercase tracking-wider block">LEDGER RESERVATION</span>
                <span className="text-[#D8FF65] font-black text-sm">12 WAZA Credits</span>
              </div>
              <span className="text-[10px] text-slate-400 bg-[#161B26] px-2 py-1 rounded border border-[#252D3F]">
                Bal: 4,850 CR
              </span>
            </div>

            <p className="text-[11px] text-slate-400 font-mono leading-relaxed">
              Ready to convert Scene 03 into 12 Storyboard Panels with dynamic camera angles and continuity lock.
            </p>

            {/* Big Dispatch CTA */}
            <button
              onClick={handleDispatchToStoryboard}
              disabled={isDispatching}
              className="w-full py-3 rounded-xl bg-[#D8FF65] hover:bg-[#cbfa4e] text-[#090A0F] text-xs font-black font-sans flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#D8FF65]/20 cursor-pointer"
            >
              <span>{isDispatching ? 'Dispatching...' : 'Dispatch to Storyboard Engine'}</span>
              <Send className="w-3.5 h-3.5" />
            </button>

            {/* Immutable Checkpoint Lock */}
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-500 pt-1">
              <Lock className="w-3 h-3 text-slate-600" />
              <span>Immutable Git-backed Scene Checkpoint</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
