import React, { useState } from 'react';
import { useProject } from '../context/ProjectContext';
import {
  Camera,
  Layers,
  Plus,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Trash2,
  SlidersHorizontal,
  Sliders,
  Grid,
  Sparkles,
  Zap,
  Check,
  Eye,
  Film,
  Maximize2,
  RefreshCw,
  Copy,
  ChevronRight,
  ShieldCheck,
  Video,
  Sun,
  Volume2,
  Lock,
  Compass,
  Play,
  Share2
} from 'lucide-react';

interface StoryboardPanel {
  id: string;
  seq: number;
  beatOrigin: string;
  title: string;
  shotType: string;
  lens: string;
  angle: string;
  tilt: string;
  aperture: string;
  status: 'RENDERED_HD' | 'PREVIZ_DRAFT' | 'IN_QUEUE';
  imageUrl?: string;
  composition: string;
  dialogue?: string;
  sfx?: string;
  lighting: string;
  promptAnchor: string;
  isSplash?: boolean;
}

export const StoryboardView: React.FC = () => {
  const { setActiveView } = useProject();

  // Active Selected Panel for Camera Rig Inspector
  const [selectedPanelId, setSelectedPanelId] = useState<string>('p-04');

  // Lens Filter State
  const [lensFilter, setLensFilter] = useState<'ALL' | 'WIDE' | 'MID' | 'CLOSE'>('ALL');

  // Grid Composition Overlays
  const [showRuleOfThirds, setShowRuleOfThirds] = useState(true);
  const [showCrosshairs, setShowCrosshairs] = useState(true);
  const [showSpeedlines, setShowSpeedlines] = useState(false);

  // Simulation states
  const [isPreVizRunning, setIsPreVizRunning] = useState(false);
  const [preVizSuccess, setPreVizSuccess] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  // 12 Panels of Scene 03: Shibuya Rooftop Ambush
  const [panels, setPanels] = useState<StoryboardPanel[]>([
    {
      id: 'p-01',
      seq: 1,
      beatOrigin: 'BEAT 01: Establishing Infiltration',
      title: 'Helipad Rain Approach',
      shotType: 'EXT. WIDE ANGLE',
      lens: '24mm Anamorphic',
      angle: 'Low Dutch Angle',
      tilt: '-12° Left Roll',
      aperture: 'f/4.0 Deep Focus',
      status: 'RENDERED_HD',
      imageUrl: '/src/assets/images/waza_storyboard_shot01_1790681837021.jpg',
      composition:
        'Low-level 24mm wide shot across drenched steel deck. Water puddles reflect neon cyan glyphs. Ren crouches in foreground lower-left.',
      sfx: 'ザァァァ (Zaaa - Heavy Rain)',
      lighting: '7200K Cyan backlight with wet tarmac specular reflections.',
      promptAnchor:
        'Cinematic manga panel, 24mm low dutch angle wide shot, cyberpunk samurai crouching on rainy subterranean helipad deck, heavy acid rain, puddles reflecting cyan neon lights, dark Tokyo noir, high contrast screentone.'
    },
    {
      id: 'p-02',
      seq: 2,
      beatOrigin: 'BEAT 01: Tactical Infiltration',
      title: 'Patrol Drone Orbit',
      shotType: 'HIGH ANGLE OVERHEAD',
      lens: '35mm Prime',
      angle: "Bird's-Eye Gantry Tilt",
      tilt: '-45° Downward Pitch',
      aperture: 'f/5.6',
      status: 'RENDERED_HD',
      imageUrl: '/src/assets/images/waza_helipad_angle1_1790679698692.jpg',
      composition:
        'Overhead shot looking down through industrial steel catwalks. Thermal searchlight sweeps across the helipad surface.',
      lighting: 'Harsh sodium-yellow spotlight contrasting cold cyan shadow.',
      promptAnchor:
        'Manga panel, high angle overhead shot, industrial steel gantry catwalks, glowing spotlight beam sweeping across wet concrete deck, dark moody atmosphere.'
    },
    {
      id: 'p-03',
      seq: 3,
      beatOrigin: 'BEAT 02: Comms Warning',
      title: 'Cybernetic Comms Distortion',
      shotType: 'TIGHT MEDIUM - REN',
      lens: '50mm Portrait',
      angle: 'Eye-Level Profile',
      tilt: '0° Level',
      aperture: 'f/2.0 Shallow Focus',
      status: 'RENDERED_HD',
      imageUrl: '/src/assets/images/waza_feat_micro_1790673744814.jpg',
      composition:
        'Tight focus on Ren\'s left ear receiver emitting violent electrical static. Raindrops streaming down jawline.',
      dialogue: 'Aoi (vocal filter): "Ren, pull out now! They know your bio-frequency—"',
      sfx: 'バリバリ (Bari-Bari - Sparks)',
      lighting: 'Soft rim light on jawline, cyan sparks illuminating cheek.',
      promptAnchor:
        'Close-up manga panel, male cyberpunk samurai, glowing cybernetic ear implant sparking with static, intense determined gaze, rain running down cheekbone, fine line art.'
    },
    {
      id: 'p-04',
      seq: 4,
      beatOrigin: 'BEAT 04: Blade Ignition',
      title: 'Chrono Blade Ignition Climax',
      shotType: '16:9 FULL CINEMA SPLASH',
      lens: '35mm Cinematic Master',
      angle: 'Dynamic Hero Low-Angle',
      tilt: '+8° Upward Roll',
      aperture: 'f/1.4 Razor Shallow',
      status: 'RENDERED_HD',
      imageUrl: '/src/assets/images/waza_chrono_blade_beat04_1790681240146.jpg',
      isSplash: true,
      composition:
        'Full 16:9 cinema splash panel. Ren draws the Chrono Blade; crimson plasma blade ignites with searing heat. Kinetic amber eye flare illuminates the rain.',
      dialogue: 'Ren: "Three seconds is too long."',
      sfx: 'ドォン (THOOOM)',
      lighting: 'Blinding crimson plasma edge illumination against pure pitch-black rainstorm.',
      promptAnchor:
        'Cinematic manga splash page, cyberpunk ronin drawing glowing high-voltage crimson plasma katana sword in torrential rain, amber cybernetic eye flare, steam rising from puddles, cinematic lighting.'
    },
    {
      id: 'p-05',
      seq: 5,
      beatOrigin: 'BEAT 03: Sudden Sensor Blindness',
      title: 'EMP Detonation Wave',
      shotType: 'EXT. HIGH HORIZON',
      lens: '28mm Wide',
      angle: 'Level Vista',
      tilt: '0° Level',
      aperture: 'f/8.0 Deep',
      status: 'RENDERED_HD',
      imageUrl: '/src/assets/images/waza_feat_lighting_1790673776975.jpg',
      composition:
        'Silent detonation shockwave. All rooftop spotlights extinguish simultaneously. Cityscape silhouettes collapse into complete darkness.',
      sfx: 'シュウウ (Shuuu - Sudden Silence)',
      lighting: 'Sudden total blackout; only distant lightning silhouetting towers.',
      promptAnchor:
        'Manga panel, chiaroscuro silhouette, massive skyscraper city plunged into complete pitch-black EMP blackout, intense volumetric rain, lightning in distance.'
    },
    {
      id: 'p-06',
      seq: 6,
      beatOrigin: 'BEAT 05: The Enforcer Descent',
      title: 'Skylight Hydraulic Impact',
      shotType: 'LOW ANGLE WORMS-EYE',
      lens: '20mm Ultra-Wide',
      angle: "Worm's-Eye Upward",
      tilt: '-15° Dutch Pitch',
      aperture: 'f/4.0',
      status: 'RENDERED_HD',
      imageUrl: '/src/assets/images/waza_helipad_angle2_1790679713058.jpg',
      composition:
        'Reinforced glass skylight shattering downward in slow motion as Vesper-09 crashes through with heavy hydraulic thrusters.',
      sfx: 'ガシャアアン (Gashaaan - Crashing Glass)',
      lighting: 'Shattered glass shards catching ambient moonlight.',
      promptAnchor:
        'Dynamic manga action panel, glass ceiling shattering in slow motion, heavy cybernetic assassin falling through with thrusters firing, flying shards, dramatic low angle.'
    },
    {
      id: 'p-07',
      seq: 7,
      beatOrigin: 'BEAT 05: Weapon Lock',
      title: 'Dual Carbine Targeting',
      shotType: 'OVER-SHOULDER ENFORCER',
      lens: '50mm Combat',
      angle: 'Over-Shoulder Track',
      tilt: '+4° Roll',
      aperture: 'f/2.8',
      status: 'RENDERED_HD',
      imageUrl: '/src/assets/images/waza_hero_panel_1790673692187.jpg',
      composition:
        'Looking past Vesper-09\'s bulky armored shoulder. Twin laser carbines project crimson crosshairs directly onto Ren\'s chest.',
      lighting: 'Crimson laser dot glaring on black Kevlar duster.',
      promptAnchor:
        'Over-the-shoulder manga panel, looking past armored cyberpunk assassin, twin laser sights aiming at lone swordsman standing in rain, high tension.'
    },
    {
      id: 'p-08',
      seq: 8,
      beatOrigin: 'BEAT 06: Standoff Cliffhanger',
      title: 'Split Duel Diopter Face-Off',
      shotType: 'SPLIT SCREEN DIOPTER',
      lens: '85mm Dual-Focus Diopter',
      angle: 'Horizontal Split Duel',
      tilt: '0° Level Dual',
      aperture: 'Split Focus Diopter',
      status: 'RENDERED_HD',
      imageUrl: '/src/assets/images/waza_storyboard_shot11_1790681850443.jpg',
      composition:
        'Split duel cut down the center. Left: Ren\'s glowing kinetic amber eye. Right: Vesper\'s tactical optical visor displaying \'LOCK CONFIRMED\'.',
      dialogue: 'HUD Display: [TARGET CONFIRMED // PURGE 0.4s]',
      sfx: 'ビシッ (Bishi - Target Acquired)',
      lighting: 'Left half illuminated in kinetic amber; right half saturated in crimson targeting HUD.',
      promptAnchor:
        'Manga split screen diopter panel, left side close up anime warrior glowing amber eye in rain, right side close up cyberpunk assassin glowing crimson targeting visor with text LOCK CONFIRMED, high contrast inks.'
    }
  ]);

  // Selected Panel Object
  const selectedPanel = panels.find((p) => p.id === selectedPanelId) || panels[3];

  const movePanel = (index: number, direction: 'up' | 'down') => {
    const newPanels = [...panels];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newPanels.length) return;

    const temp = newPanels[index];
    newPanels[index] = newPanels[targetIndex];
    newPanels[targetIndex] = temp;

    // Re-sequence
    newPanels.forEach((p, i) => (p.seq = i + 1));
    setPanels(newPanels);
  };

  const handleRunPreViz = () => {
    setIsPreVizRunning(true);
    setPreVizSuccess(false);
    setTimeout(() => {
      setIsPreVizRunning(false);
      setPreVizSuccess(true);
      setTimeout(() => setPreVizSuccess(false), 4000);
    }, 1200);
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(selectedPanel.promptAnchor);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const filteredPanels = panels.filter((p) => {
    if (lensFilter === 'WIDE') return p.lens.includes('24mm') || p.lens.includes('20mm') || p.lens.includes('28mm');
    if (lensFilter === 'MID') return p.lens.includes('35mm') || p.lens.includes('50mm');
    if (lensFilter === 'CLOSE') return p.lens.includes('85mm') || p.shotType.includes('SPLIT');
    return true;
  });

  return (
    <div className="space-y-4 max-w-[1720px] mx-auto pb-16 font-sans">
      
      {/* ======================================================== */}
      {/* 1. TOP HEADER & CAMERA RIG METRICS                       */}
      {/* ======================================================== */}
      <div className="border-b border-[#1E2230] pb-4">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          
          {/* Breadcrumb + Camera Rig Specs */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono">
            <div className="flex items-center gap-2 text-slate-300">
              <span className="text-[#D8FF65] font-black flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-[#D8FF65]" />
                <span>STORYBOARD & CAMERA RIG</span>
              </span>
              <span className="text-slate-600">/</span>
              <span className="text-slate-400">CHRONO BLADE: OMEGA</span>
              <span className="text-slate-600">/</span>
              <span className="text-[#68E7FF] font-bold">Scene 03: Shibuya Rooftop Ambush</span>
              <span className="text-slate-600">/</span>
              <span className="text-slate-400">#SC_8820_TOK</span>
            </div>

            <span className="text-slate-700 hidden md:inline">|</span>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-[#10202F] text-[#4FACFE] border border-[#1E3A5F] font-bold">
                12 SHOT PANELS EXPANDED
              </span>

              <span className="px-2 py-0.5 rounded bg-[#1A1528] text-[#D8B4FE] border border-[#3A2955] flex items-center gap-1.5">
                <Film className="w-3 h-3 text-[#9D78FF]" />
                <span>CAM RIG: <strong>2.39:1 Anamorphic Virtual</strong></span>
              </span>

              <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#0D211A] border border-[#144A32] text-[#38EF7D] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#38EF7D] animate-pulse" />
                <span>SHOT CONTINUITY: 99.8% LOCKED</span>
              </div>

              <span className="px-2 py-0.5 rounded bg-[#1A1F10] text-[#D8FF65] border border-[#3E4A1E] font-bold flex items-center gap-1">
                <Zap className="w-3 h-3 text-[#D8FF65]" />
                <span>12 CR Reserved</span>
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
              <span>Add Shot Panel</span>
            </button>

            <button
              onClick={handleRunPreViz}
              disabled={isPreVizRunning}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#6B46C1]/30 to-[#9D78FF]/20 hover:from-[#6B46C1]/40 hover:to-[#9D78FF]/30 border border-[#9D78FF]/40 text-xs font-mono font-bold text-[#D8B4FE] flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#D8B4FE] ${isPreVizRunning ? 'animate-spin' : ''}`} />
              <span>{isPreVizRunning ? 'Rendering Camera Passes...' : 'Batch Pre-Viz Render'}</span>
            </button>

            <button
              onClick={() => setActiveView('panel')}
              className="px-4 py-2 rounded-xl bg-[#D8FF65] hover:bg-[#cbfa4e] text-[#090A0F] text-xs font-black font-sans flex items-center gap-1.5 transition-all shadow-lg shadow-[#D8FF65]/20 cursor-pointer"
            >
              <span>Proceed to Panel Engine & Layout</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        </div>

        {/* Pre-Viz Success Toast */}
        {preVizSuccess && (
          <div className="mt-3 p-3 rounded-xl bg-[#091F14] border border-[#38EF7D]/40 text-xs font-mono text-[#38EF7D] flex items-center gap-2.5 animate-in fade-in">
            <Check className="w-4 h-4 shrink-0 stroke-[3]" />
            <span>CAMERA RENDER BATCH COMPLETED: 12 Panels synchronized with Gemini 2.0 Flash camera matrix. Continuity variance: 0.012%.</span>
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* 2. CAMERA DIRECTOR RAIL: FILTERS, GRIDS & PRESETS        */}
      {/* ======================================================== */}
      <div className="bg-[#11131A] border border-[#1E2230] rounded-2xl p-3 md:p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        {/* Lens Focal Length Filters */}
        <div className="flex items-center gap-1.5">
          <span className="text-slate-500 uppercase tracking-wider text-[10px] mr-1 hidden sm:inline">
            LENS FILTER:
          </span>
          {[
            { id: 'ALL', label: 'All Shots (12)' },
            { id: 'WIDE', label: 'Wide 20-28mm (3)' },
            { id: 'MID', label: 'Mid 35-50mm (5)' },
            { id: 'CLOSE', label: 'Close 85mm+ (4)' }
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setLensFilter(f.id as any)}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                lensFilter === f.id
                  ? 'bg-[#1C2333] text-[#4FACFE] border border-[#2B3B59] font-bold'
                  : 'bg-[#090A0F] text-slate-400 hover:text-white border border-[#1E2230]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Composition Grid Overlays Toggles */}
        <div className="flex items-center gap-2 text-[11px]">
          <span className="text-slate-500 uppercase tracking-wider text-[10px] hidden md:inline">
            OVERLAYS:
          </span>
          <button
            onClick={() => setShowRuleOfThirds(!showRuleOfThirds)}
            className={`px-2.5 py-1 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
              showRuleOfThirds
                ? 'bg-[#14231E] border-[#1E5037] text-[#38EF7D] font-bold'
                : 'bg-[#090A0F] border-[#1E2230] text-slate-400 hover:text-white'
            }`}
          >
            <Grid className="w-3 h-3" />
            <span>Rule of Thirds</span>
          </button>

          <button
            onClick={() => setShowCrosshairs(!showCrosshairs)}
            className={`px-2.5 py-1 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
              showCrosshairs
                ? 'bg-[#10202F] border-[#1E3A5F] text-[#4FACFE] font-bold'
                : 'bg-[#090A0F] border-[#1E2230] text-slate-400 hover:text-white'
            }`}
          >
            <Compass className="w-3 h-3" />
            <span>Center Crosshair</span>
          </button>

          <button
            onClick={() => setShowSpeedlines(!showSpeedlines)}
            className={`px-2.5 py-1 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
              showSpeedlines
                ? 'bg-[#2D2A14] border-[#524E22] text-[#D8FF65] font-bold'
                : 'bg-[#090A0F] border-[#1E2230] text-slate-400 hover:text-white'
            }`}
          >
            <Zap className="w-3 h-3" />
            <span>Manga Speedlines</span>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. MAIN WORKSPACE: STORYBOARD GRID + CAMERA INSPECTOR    */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

        {/* ====================================================== */}
        {/* COLUMN 1 & 2: STORYBOARD SHOTS GRID (8 cols)           */}
        {/* ====================================================== */}
        <div className="lg:col-span-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPanels.map((panel, idx) => {
              const isSelected = selectedPanelId === panel.id;
              return (
                <div
                  key={panel.id}
                  onClick={() => setSelectedPanelId(panel.id)}
                  className={`rounded-2xl border p-4 space-y-3.5 transition-all cursor-pointer relative overflow-hidden group ${
                    isSelected
                      ? 'bg-[#151824] border-[#D8FF65] shadow-xl shadow-[#D8FF65]/5 ring-1 ring-[#D8FF65]/40'
                      : panel.isSplash
                      ? 'bg-[#12141F] border-[#9D78FF]/60 hover:border-[#9D78FF]'
                      : 'bg-[#11131A] border-[#1E2230] hover:border-slate-700 hover:bg-[#141724]'
                  } ${panel.isSplash ? 'md:col-span-2' : ''}`}
                >
                  {/* Selected Indicator Top Bar */}
                  {isSelected && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-[#D8FF65]" />
                  )}

                  {/* Header Row: Shot Seq, Title & Lens Metric */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-[#090A0F] border border-[#232A44] flex items-center justify-center font-mono font-black text-xs text-[#D8FF65]">
                        #{panel.seq.toString().padStart(2, '0')}
                      </span>
                      <div>
                        <h4 className="font-extrabold text-white text-xs tracking-tight group-hover:text-[#D8FF65] transition-colors">
                          {panel.title}
                        </h4>
                        <span className="text-[10px] font-mono text-slate-400 block">
                          {panel.beatOrigin}
                        </span>
                      </div>
                    </div>

                    {/* Lens & Reorder Controls */}
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#10202F] text-[#4FACFE] border border-[#1E3A5F]">
                        {panel.lens}
                      </span>
                      <div className="flex items-center gap-0.5 text-slate-500">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            movePanel(idx, 'up');
                          }}
                          disabled={idx === 0}
                          className="p-1 hover:text-white disabled:opacity-20 cursor-pointer"
                        >
                          <ArrowUp className="w-3 h-3" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            movePanel(idx, 'down');
                          }}
                          disabled={idx === panels.length - 1}
                          className="p-1 hover:text-white disabled:opacity-20 cursor-pointer"
                        >
                          <ArrowDown className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Visual Shot Image & Camera Frame */}
                  <div className="relative rounded-xl overflow-hidden border border-[#1E2230] bg-[#090A0F] aspect-[16/10] flex items-center justify-center">
                    {panel.imageUrl ? (
                      <img
                        src={panel.imageUrl}
                        alt={panel.title}
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                      />
                    ) : (
                      <div className="text-center p-6 space-y-2">
                        <Camera className="w-8 h-8 text-slate-600 mx-auto" />
                        <span className="text-xs font-mono text-slate-400 block font-bold">
                          Camera Pre-Viz Wireframe
                        </span>
                        <span className="text-[10px] font-mono text-slate-600 block">
                          {panel.lens} • {panel.angle}
                        </span>
                      </div>
                    )}

                    {/* Rule of Thirds Grid Overlay if enabled */}
                    {showRuleOfThirds && (
                      <div className="absolute inset-0 pointer-events-none opacity-40">
                        <div className="w-full h-full grid grid-cols-3 grid-rows-3 border border-white/10">
                          <div className="border-r border-b border-white/20" />
                          <div className="border-r border-b border-white/20" />
                          <div className="border-b border-white/20" />
                          <div className="border-r border-b border-white/20" />
                          <div className="border-r border-b border-white/20" />
                          <div className="border-b border-white/20" />
                          <div className="border-r border-white/20" />
                          <div className="border-r border-white/20" />
                          <div />
                        </div>
                      </div>
                    )}

                    {/* Center Crosshair Overlay */}
                    {showCrosshairs && (
                      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-50">
                        <div className="w-6 h-6 border border-[#68E7FF]/70 rounded-full flex items-center justify-center">
                          <div className="w-1 h-1 bg-[#68E7FF] rounded-full" />
                        </div>
                      </div>
                    )}

                    {/* Badges on Bottom */}
                    <div className="absolute bottom-2 left-2 flex items-center gap-1.5 text-[9px] font-mono">
                      <span className="px-2 py-0.5 rounded bg-black/80 text-[#68E7FF] border border-[#68E7FF]/30 font-bold backdrop-blur-md">
                        {panel.angle}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-black/80 text-slate-300 border border-[#1E2230] backdrop-blur-md">
                        {panel.tilt}
                      </span>
                    </div>

                    <div className="absolute bottom-2 right-2 text-[9px] font-mono text-[#38EF7D] bg-black/80 px-2 py-0.5 rounded border border-[#1E5037] font-bold backdrop-blur-md">
                      RENDERED_HD
                    </div>
                  </div>

                  {/* Composition Directive */}
                  <div className="p-2.5 rounded-xl bg-[#090A0F] border border-[#1E2230] text-[11px] text-slate-300 leading-relaxed font-sans">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block mb-0.5 font-bold">
                      CAMERA STAGING DIRECTIVE:
                    </span>
                    {panel.composition}
                  </div>

                  {/* Dialogue / SFX Footer if present */}
                  {(panel.dialogue || panel.sfx) && (
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-[#1E2230] text-[11px] font-mono">
                      {panel.dialogue && (
                        <div className="text-slate-300 italic font-serif truncate max-w-[260px]">
                          "{panel.dialogue}"
                        </div>
                      )}
                      {panel.sfx && (
                        <span className="text-[#D8FF65] bg-[#1A1F10] border border-[#3E4A1E] px-2 py-0.5 rounded text-[10px] font-bold">
                          SFX: {panel.sfx}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ====================================================== */}
        {/* COLUMN 3: RIGHT PANEL - CAMERA RIG INSPECTOR & CADENCE */}
        {/* ====================================================== */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Card 1: Virtual Camera Rig Inspector */}
          <div className="bg-[#11131A] border border-[#1E2230] rounded-2xl p-4 md:p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#D8FF65]" />
                <h3 className="text-xs font-mono font-bold tracking-wider text-white uppercase">
                  Camera Rig Inspector
                </h3>
              </div>
              <span className="text-[10px] font-mono font-bold text-[#D8FF65] bg-[#1A1F10] border border-[#3E4A1E] px-2 py-0.5 rounded">
                Shot #{selectedPanel.seq.toString().padStart(2, '0')} Selected
              </span>
            </div>

            {/* Focal Length & Lens Type */}
            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">FOCAL LENGTH</span>
                <span className="text-[#4FACFE] font-bold">{selectedPanel.lens}</span>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {['24mm Wide', '35mm Hero', '50mm Mid', '85mm Tele'].map((l) => (
                  <button
                    key={l}
                    onClick={() => {}}
                    className={`py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                      selectedPanel.lens.includes(l.split(' ')[0])
                        ? 'bg-[#1C2333] text-[#4FACFE] border border-[#2B3B59]'
                        : 'bg-[#090A0F] text-slate-400 hover:text-white border border-[#1E2230]'
                    }`}
                  >
                    {l.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Dutch Tilt Angle Slider Mock */}
            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">DUTCH ROLL / PITCH</span>
                <span className="text-[#D8B4FE] font-bold">{selectedPanel.tilt}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#090A0F] border border-[#1E2230] space-y-2">
                <input
                  type="range"
                  min="-30"
                  max="30"
                  defaultValue="-12"
                  className="w-full accent-[#9D78FF] cursor-pointer"
                />
                <div className="flex items-center justify-between text-[10px] text-slate-500">
                  <span>-30° (Extreme Left)</span>
                  <span>0° Level</span>
                  <span>+30° (Right Roll)</span>
                </div>
              </div>
            </div>

            {/* Aperture / Depth of Field */}
            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">APERTURE (DOF)</span>
                <span className="text-[#38EF7D] font-bold">{selectedPanel.aperture}</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5 text-[10px]">
                {['f/1.4 Razor', 'f/2.8 Story', 'f/8.0 Deep'].map((ap) => (
                  <button
                    key={ap}
                    className="p-1.5 rounded-lg bg-[#090A0F] border border-[#1E2230] hover:border-slate-600 text-slate-300 font-bold cursor-pointer"
                  >
                    {ap}
                  </button>
                ))}
              </div>
            </div>

            {/* Prompt Anchor Injection Payload */}
            <div className="space-y-2 pt-2 border-t border-[#1E2230]">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#D8FF65] font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Prompt Injection Payload</span>
                </span>
                <button
                  onClick={handleCopyPrompt}
                  className="text-[10px] font-mono text-slate-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                >
                  {copiedPrompt ? <Check className="w-3 h-3 text-[#38EF7D]" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedPrompt ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <pre className="p-3 rounded-xl bg-[#090A0F] border border-[#1E2230] text-[11px] font-mono text-slate-300 overflow-x-auto leading-relaxed max-h-36 whitespace-pre-wrap">
                {selectedPanel.promptAnchor}
              </pre>
            </div>
          </div>

          {/* Card 2: AI Cinematographer & Visual Cadence Report */}
          <div className="bg-[#11131A] border border-[#1E2230] rounded-2xl p-4 md:p-5 shadow-xl space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-[#4FACFE]" />
                <h3 className="text-xs font-mono font-bold tracking-wider text-white uppercase">
                  Cinematic Cadence Audit
                </h3>
              </div>
              <span className="text-[10px] font-mono font-bold text-[#38EF7D] bg-[#0E261B] border border-[#1E5037] px-2 py-0.5 rounded">
                SCORE: 99.4%
              </span>
            </div>

            <div className="space-y-2 text-xs font-mono">
              {[
                { label: 'Focal Distance Rhythm', status: 'Optimal (Wide → Med → Splash → Close)', pass: true },
                { label: 'Eye-Line Continuity', status: '100% Vector Lock across Ren & Vesper', pass: true },
                { label: 'Lighting Progression', status: 'EMP Blackout accurately propagated into Shots 5-12', pass: true },
                { label: 'Screen Direction Vectors', status: 'Left-to-right confrontation preserved', pass: true }
              ].map((item, i) => (
                <div key={i} className="p-2.5 rounded-xl bg-[#090A0F] border border-[#1E2230] flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#38EF7D] mt-1 shrink-0" />
                  <div>
                    <h5 className="font-bold text-white text-[11px]">{item.label}</h5>
                    <p className="text-[10px] text-slate-400 mt-0.5">{item.status}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Proceed to Panel Engine CTA */}
            <button
              onClick={() => setActiveView('panel')}
              className="w-full py-2.5 rounded-xl bg-[#D8FF65] hover:bg-[#cbfa4e] text-[#090A0F] text-xs font-black font-sans flex items-center justify-center gap-1.5 transition-all shadow-lg shadow-[#D8FF65]/15 cursor-pointer"
            >
              <span>Transfer to Panel Layout Studio</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
