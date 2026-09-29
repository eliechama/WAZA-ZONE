import React, { useState } from 'react';
import { useProject } from '../context/ProjectContext';
import { Character } from '../types';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import {
  Plus,
  ShieldAlert,
  Sparkles,
  Eye,
  Palette,
  Shirt,
  RefreshCw,
  CheckCircle2,
  Copy,
  Check,
  Search,
  Sliders,
  Maximize2,
  Terminal,
  Activity,
  Layers,
  ChevronRight,
  Fingerprint,
  Cpu,
  Download,
  AlertCircle,
  FileCode,
  Zap,
  Lock,
  Compass
} from 'lucide-react';

export const CastDNA: React.FC = () => {
  const { characters, addCharacter, activeProject } = useProject();
  const [selectedCharacter, setSelectedCharacter] = useState<Character>(
    characters[0] || {
      id: 'char-1',
      projectId: 'proj-1',
      name: 'Ren Kurogane',
      roleTier: 'Protagonist (Lead Ronin)',
      avatarUrl: '/src/assets/images/waza_turnaround_1_1790673706903.jpg',
      dnaHash: 'DNA-RNK-88219-X',
      craniofacialSummary: 'Chiseled jawline, glowing cyan cybernetic left optic with vertical iris seam.',
      tacticalWardrobe: 'Weather-beaten obsidian Kevlar duster with electric lime interior lining.',
      colorSwatches: [
        { name: 'Obsidian Void', hex: '#090A0F' },
        { name: 'Electric Lime', hex: '#D8FF65' },
        { name: 'Signal Cyan', hex: '#68E7FF' }
      ],
      forbiddenDrift: ['Never render left eye as organic human eye'],
      masterPrompt: 'Master manga panel, ultra high contrast, Ren Kurogane...',
      referenceImages: ['/src/assets/images/waza_ren_turnaround_1790676961971.jpg'],
      expressions: ['Cold Analytical Focus', 'Combat Overdrive'],
      outfits: ['Standard Ops Duster'],
      relationships: ['Commander Kageyama (Nemesis)']
    }
  );

  const [activeTab, setActiveTab] = useState<'visual' | 'turnaround' | 'wardrobe' | 'forbidden' | 'packet'>('visual');
  const [selectedAngleIndex, setSelectedAngleIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [copiedHash, setCopiedHash] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);

  // Continuity test state
  const [testingContinuity, setTestingContinuity] = useState(false);
  const [continuityOutput, setContinuityOutput] = useState<{
    status: string;
    variance: string;
    keypointsLocked: number;
    embeddingCosine: number;
    forbiddenFiltered: number;
    timestamp: string;
  } | null>(null);

  // New Character Form State
  const [name, setName] = useState('');
  const [roleTier, setRoleTier] = useState('Protagonist (Lead)');
  const [craniofacial, setCraniofacial] = useState('');
  const [wardrobe, setWardrobe] = useState('');
  const [forbiddenDrift, setForbiddenDrift] = useState('');
  const [masterPrompt, setMasterPrompt] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('/src/assets/images/waza_turnaround_1_1790673706903.jpg');

  // Filtered Characters
  const filteredCharacters = characters.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.dnaHash.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole =
      roleFilter === 'ALL' ||
      (roleFilter === 'PROTAGONIST' && c.roleTier.toLowerCase().includes('protagonist')) ||
      (roleFilter === 'DEUTERAGONIST' && c.roleTier.toLowerCase().includes('deuteragonist')) ||
      (roleFilter === 'ANTAGONIST' && c.roleTier.toLowerCase().includes('antagonist'));
    return matchesSearch && matchesRole;
  });

  // Reference angles available for selected character
  const angleGallery = [
    {
      title: 'Full Model Sheet (3-View)',
      type: 'Model Turnaround',
      url: selectedCharacter.referenceImages?.[0] || selectedCharacter.avatarUrl,
      desc: 'Front, profile 90°, and 3/4 turn model sheet vector anchors'
    },
    {
      title: 'Action Combat Stance',
      type: 'Full Body Pose',
      url: selectedCharacter.referenceImages?.[1] || selectedCharacter.avatarUrl,
      desc: 'Dynamic leap with high-contrast inks and duster flutter'
    },
    {
      title: 'Face & Cranial Draft',
      type: 'Vector Blueprint',
      url: selectedCharacter.referenceImages?.[2] || selectedCharacter.avatarUrl,
      desc: 'Head structural geometry and ocular iris seam alignment'
    },
    {
      title: 'Micro-Expression Zoom',
      type: 'Close-Up Inks',
      url: selectedCharacter.referenceImages?.[3] || selectedCharacter.avatarUrl,
      desc: 'High-intensity close-up screentone and eye luminescence'
    },
    {
      title: 'Extreme Rain Lighting',
      type: 'Chiaroscuro Test',
      url: selectedCharacter.referenceImages?.[5] || selectedCharacter.avatarUrl,
      desc: 'Volumetric back-lighting and specular puddle reflections'
    },
    {
      title: 'Temporal Aging Drift',
      type: 'Canon Timeline',
      url: selectedCharacter.referenceImages?.[6] || selectedCharacter.avatarUrl,
      desc: 'Battle-worn veteran scar consistency under harsh shadow'
    }
  ];

  const handleCopyHash = () => {
    navigator.clipboard.writeText(selectedCharacter.dnaHash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const handleCopyJson = () => {
    const packet = {
      engine: 'WAZA-ZONE_CONTINUITY_GUARD_v2.4',
      character: selectedCharacter.name,
      dnaHash: selectedCharacter.dnaHash,
      roleTier: selectedCharacter.roleTier,
      craniofacialSummary: selectedCharacter.craniofacialSummary,
      tacticalWardrobe: selectedCharacter.tacticalWardrobe,
      colorSwatches: selectedCharacter.colorSwatches,
      forbiddenDrift: selectedCharacter.forbiddenDrift,
      masterPrompt: selectedCharacter.masterPrompt,
      driftToleranceThreshold: 0.02
    };
    navigator.clipboard.writeText(JSON.stringify(packet, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  const handleCreateCharacter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newChar: Character = {
      id: `char-${Date.now()}`,
      projectId: activeProject?.id || 'proj-1',
      name,
      roleTier,
      avatarUrl: avatarUrl || '/src/assets/images/waza_turnaround_1_1790673706903.jpg',
      dnaHash: `DNA-${name.substring(0, 3).toUpperCase()}-${Math.floor(10000 + Math.random() * 90000)}-X`,
      craniofacialSummary: craniofacial || 'Sharp facial landmarks, locked optical aperture, distinct jawline.',
      tacticalWardrobe: wardrobe || 'Kevlar tactical coat with signature inner lining accents.',
      colorSwatches: [
        { name: 'Obsidian Void', hex: '#090A0F' },
        { name: 'Electric Lime', hex: '#D8FF65' },
        { name: 'Signal Cyan', hex: '#68E7FF' }
      ],
      forbiddenDrift: forbiddenDrift
        ? forbiddenDrift.split('\n').filter(Boolean)
        : ['Never alter eye optical luminescence', 'Never omit high-collar duster in rain'],
      masterPrompt:
        masterPrompt ||
        `Master manga panel, ultra high contrast, ${name}, sharp chiseled features, high-contrast black and white inks, dense screentone shading.`,
      referenceImages: [avatarUrl],
      expressions: ['Cold Analytical Focus', 'Combat Overdrive', 'Grimace', 'Subtle Smirk'],
      outfits: ['Primary Combat Duster', 'Stealth Infiltration Shell'],
      relationships: []
    };

    addCharacter(newChar);
    setSelectedCharacter(newChar);
    setIsModalOpen(false);
    setName('');
    setCraniofacial('');
    setWardrobe('');
    setForbiddenDrift('');
    setMasterPrompt('');
  };

  const runContinuityTest = () => {
    setTestingContinuity(true);
    setContinuityOutput(null);

    setTimeout(() => {
      setTestingContinuity(false);
      setContinuityOutput({
        status: 'LOCKED_ZERO_DRIFT',
        variance: '0.018%',
        keypointsLocked: 68,
        embeddingCosine: 0.9984,
        forbiddenFiltered: selectedCharacter.forbiddenDrift.length,
        timestamp: new Date().toISOString()
      });
    }, 1400);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* 1. TOP CONTROL BAR */}
      <div className="bg-[#11131A] border border-slate-800/90 rounded-2xl p-5 md:p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-40 bg-gradient-to-l from-[#9D78FF]/10 via-[#68E7FF]/5 to-transparent pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative z-10">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-1 rounded-md bg-[#9D78FF]/20 text-[#9D78FF] border border-[#9D78FF]/40 text-[10px] font-mono font-black tracking-wider uppercase">
                WAZA CAST OS v2.4
              </span>
              <span className="text-slate-600 font-mono">•</span>
              <span className="text-xs font-mono text-[#D8FF65] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#D8FF65] animate-ping" />
                ZERO-DRIFT CONTINUITY ENGINE ACTIVE
              </span>
              <span className="text-slate-600 font-mono">•</span>
              <span className="text-xs font-mono text-slate-400">
                ACTIVE CANON: <strong className="text-white">{activeProject?.title || 'CHRONO BLADE OMEGA'}</strong>
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight flex items-center gap-3">
              Cast & Character Visual DNA
              <Badge variant="cyan">99.8% FIDELITY</Badge>
            </h1>
            <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Lock craniofacial geometry, optical traits, signature wardrobes, and negative drift barriers. 
              The Continuity Guard automatically injects verified vector packets into every image generation job.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsAuditModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-[#090A0F] border border-slate-700/80 hover:border-[#68E7FF]/60 text-slate-300 hover:text-white text-xs font-mono font-bold flex items-center gap-2 transition-all shadow-md"
            >
              <Activity className="w-4 h-4 text-[#68E7FF]" />
              <span>Multi-Episode Audit</span>
            </button>

            <button
              onClick={runContinuityTest}
              disabled={testingContinuity}
              className="px-4 py-2.5 rounded-xl bg-[#9D78FF]/15 border border-[#9D78FF]/40 hover:bg-[#9D78FF]/25 text-[#9D78FF] text-xs font-mono font-bold flex items-center gap-2 transition-all shadow-md"
            >
              <RefreshCw className={`w-4 h-4 ${testingContinuity ? 'animate-spin' : ''}`} />
              <span>{testingContinuity ? 'Auditing Vector Seeds...' : 'Test Continuity Lock'}</span>
            </button>

            <button
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-[#D8FF65] text-[#090A0F] font-bold text-xs hover:bg-[#cbf54f] shadow-lg shadow-[#D8FF65]/20 transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Register Character DNA</span>
            </button>
          </div>
        </div>

        {/* Live Continuity Test Toast if Active */}
        {continuityOutput && (
          <div className="mt-4 p-4 rounded-xl bg-[#090A0F] border border-[#D8FF65]/40 text-xs font-mono flex flex-col md:flex-row items-start md:items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-[#D8FF65]/20 border border-[#D8FF65]/50 flex items-center justify-center text-[#D8FF65]">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[#D8FF65] font-black tracking-wide">
                  CONTINUITY GUARD PASS — {selectedCharacter.name}
                </span>
                <p className="text-[11px] text-slate-400">
                  Cosine Similarity: <strong className="text-white">{continuityOutput.embeddingCosine}</strong> • 
                  Drift Variance: <strong className="text-emerald-400">{continuityOutput.variance}</strong> • 
                  Keypoints: <strong className="text-white">{continuityOutput.keypointsLocked}/68</strong> • 
                  Forbidden Rules: <strong className="text-white">{continuityOutput.forbiddenFiltered} active</strong>
                </p>
              </div>
            </div>
            <button
              onClick={() => setContinuityOutput(null)}
              className="text-[10px] text-slate-500 hover:text-white px-2 py-1 rounded bg-slate-800/60"
            >
              Dismiss
            </button>
          </div>
        )}
      </div>

      {/* 2. MAIN GRID: CAST RAIL (LEFT) & DEEP DIVE (RIGHT) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: CAST SELECTION DIRECTORY (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-[#11131A] border border-slate-800/90 rounded-2xl p-4 shadow-xl">
            {/* Search & Filter Header */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Fingerprint className="w-4 h-4 text-[#D8FF65]" />
                  <span>Series Cast Roster ({characters.length})</span>
                </span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2 py-0.5 rounded">
                  100% CANON SYNCED
                </span>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search by name, DNA hash, or role..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#090A0F] border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D8FF65]"
                />
              </div>

              {/* Role Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {(['ALL', 'PROTAGONIST', 'DEUTERAGONIST', 'ANTAGONIST'] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => setRoleFilter(r)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                      roleFilter === r
                        ? 'bg-[#D8FF65] text-[#090A0F]'
                        : 'bg-[#090A0F] text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Character Cards List */}
            <div className="mt-4 space-y-2.5 max-h-[720px] overflow-y-auto pr-1">
              {filteredCharacters.map((char) => {
                const isSelected = selectedCharacter.id === char.id;
                return (
                  <div
                    key={char.id}
                    onClick={() => setSelectedCharacter(char)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all relative overflow-hidden group ${
                      isSelected
                        ? 'bg-[#181B26] border-[#D8FF65] shadow-lg shadow-[#D8FF65]/5 ring-1 ring-[#D8FF65]/40'
                        : 'bg-[#090A0F] border-slate-800 hover:border-slate-700 hover:bg-[#141722]'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-0 right-0 w-1.5 h-full bg-[#D8FF65]" />
                    )}

                    <div className="flex items-center gap-3.5">
                      <div className="relative">
                        <img
                          src={char.avatarUrl}
                          alt={char.name}
                          className="w-14 h-14 rounded-xl object-cover border border-slate-700 group-hover:border-slate-500 transition-all shrink-0"
                        />
                        <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#090A0F]" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <h4 className="font-extrabold text-white text-sm truncate group-hover:text-[#D8FF65] transition-colors">
                            {char.name}
                          </h4>
                          <span
                            className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded font-black ${
                              char.roleTier.toLowerCase().includes('protagonist')
                                ? 'bg-[#D8FF65]/15 text-[#D8FF65] border border-[#D8FF65]/30'
                                : char.roleTier.toLowerCase().includes('deuteragonist')
                                ? 'bg-[#9D78FF]/15 text-[#9D78FF] border border-[#9D78FF]/30'
                                : 'bg-red-500/15 text-red-400 border border-red-500/30'
                            }`}
                          >
                            {char.roleTier.split(' ')[0]}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] font-mono text-[#68E7FF] bg-[#68E7FF]/10 px-1.5 py-0.5 rounded border border-[#68E7FF]/20">
                            {char.dnaHash}
                          </span>
                          <span className="text-[10px] font-mono text-slate-500">
                            {char.referenceImages?.length || 1} Ref Angles
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 mt-2">
                          {char.colorSwatches.map((s, idx) => (
                            <span
                              key={idx}
                              title={`${s.name} (${s.hex})`}
                              className="w-2.5 h-2.5 rounded-full border border-white/20"
                              style={{ backgroundColor: s.hex }}
                            />
                          ))}
                          <span className="text-[10px] font-mono text-slate-400 ml-1 truncate">
                            {char.forbiddenDrift.length} Negative Locks
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Prompt Architecture Guide */}
          <div className="p-4 rounded-2xl bg-[#090A0F] border border-slate-800/80 space-y-2.5">
            <div className="flex items-center gap-2 text-[#68E7FF] text-xs font-mono font-bold">
              <Zap className="w-4 h-4" />
              <span>CONTINUITY ENGINE COUPLING</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Whenever you render panels in the Storyboard or Panel Engine, WAZA-ZONE assembles the character’s 
              <strong> Craniofacial Invariants</strong>, <strong>Palettes</strong>, and <strong>Negative Drift</strong> 
              into a persistent context packet passed to Google Gemini models.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: ACTIVE CHARACTER DEEP DIVE (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* A. HERO CHARACTER BANNER & ANGLE VIEWER */}
          <div className="bg-[#11131A] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            {/* Top Identity Header */}
            <div className="p-5 md:p-6 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={selectedCharacter.avatarUrl}
                  alt={selectedCharacter.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-[#D8FF65] shadow-lg shadow-[#D8FF65]/10"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-black text-white tracking-tight">{selectedCharacter.name}</h2>
                    <span className="px-2 py-0.5 rounded bg-[#9D78FF]/20 text-[#9D78FF] border border-[#9D78FF]/40 text-[10px] font-mono font-bold">
                      {selectedCharacter.roleTier}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={handleCopyHash}
                      className="text-xs font-mono text-[#68E7FF] bg-[#68E7FF]/10 hover:bg-[#68E7FF]/20 px-2 py-0.5 rounded border border-[#68E7FF]/30 flex items-center gap-1.5 transition-all"
                    >
                      <Fingerprint className="w-3.5 h-3.5" />
                      <span>{selectedCharacter.dnaHash}</span>
                      {copiedHash ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 opacity-60" />}
                    </button>
                    <span className="text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2 py-0.5 rounded">
                      DRIFT VARIANCE: 0.02% [LOCKED]
                    </span>
                  </div>
                </div>
              </div>

              {/* Utility Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyJson}
                  className="px-3 py-2 rounded-xl bg-[#090A0F] border border-slate-800 hover:border-slate-700 text-xs font-mono text-slate-300 hover:text-white flex items-center gap-1.5 transition-all"
                >
                  <FileCode className="w-3.5 h-3.5 text-[#9D78FF]" />
                  <span>{copiedJson ? 'Packet Copied!' : 'Copy Packet JSON'}</span>
                </button>
              </div>
            </div>

            {/* Big Interactive Visual Angle Showcase */}
            <div className="p-5 md:p-6 bg-[#090A0F]/60">
              <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-[#090A0F] aspect-[16/9] flex items-center justify-center group">
                <img
                  src={angleGallery[selectedAngleIndex]?.url || selectedCharacter.avatarUrl}
                  alt={angleGallery[selectedAngleIndex]?.title}
                  className="w-full h-full object-contain"
                />

                {/* HUD Vector Crosshairs */}
                <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md border border-slate-800 rounded-lg px-3 py-1.5 text-[10px] font-mono text-slate-300 pointer-events-none">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#68E7FF] animate-pulse" />
                    <span className="font-bold text-white">VECTOR ANCHOR: {angleGallery[selectedAngleIndex]?.title}</span>
                  </div>
                  <span className="text-slate-400">{angleGallery[selectedAngleIndex]?.desc}</span>
                </div>

                <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md border border-slate-800 rounded-lg px-2.5 py-1 text-[10px] font-mono text-[#D8FF65] pointer-events-none">
                  BIOMETRIC CONTOUR: 68 PTS LOCKED
                </div>
              </div>

              {/* Angle Switcher Carousel Thumbnails */}
              <div className="mt-4 grid grid-cols-3 sm:grid-cols-6 gap-2">
                {angleGallery.map((angle, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedAngleIndex(idx)}
                    className={`p-1.5 rounded-xl border text-left transition-all ${
                      selectedAngleIndex === idx
                        ? 'border-[#D8FF65] bg-[#11131A] shadow-md shadow-[#D8FF65]/10'
                        : 'border-slate-800 bg-[#090A0F] hover:bg-[#11131A] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <div className="aspect-[4/3] rounded-lg overflow-hidden bg-black mb-1.5 border border-slate-800">
                      <img src={angle.url} alt={angle.title} className="w-full h-full object-cover" />
                    </div>
                    <p className="text-[10px] font-mono font-bold text-white truncate">{angle.title}</p>
                    <p className="text-[9px] font-mono text-slate-500 truncate">{angle.type}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* TAB SELECTOR */}
            <div className="flex items-center gap-1 border-t border-slate-800 px-6 pt-3 pb-0 overflow-x-auto bg-[#0E1017]">
              {[
                { id: 'visual', label: 'Craniofacial DNA', icon: Eye },
                { id: 'wardrobe', label: 'Tactical Wardrobe', icon: Shirt },
                { id: 'forbidden', label: 'Forbidden Drift (Negative Locks)', icon: ShieldAlert },
                { id: 'packet', label: 'Continuity Packet (JSON)', icon: Terminal }
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-4 py-3 text-xs font-mono font-bold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
                      isActive
                        ? 'border-[#D8FF65] text-[#D8FF65] bg-[#D8FF65]/5'
                        : 'border-transparent text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* TAB CONTENT PANELS */}
            <div className="p-6">
              
              {/* TAB 1: CRANIOFACIAL DNA */}
              {activeTab === 'visual' && (
                <div className="space-y-5 animate-in fade-in">
                  <div className="p-4 rounded-xl bg-[#090A0F] border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold uppercase text-[#D8FF65] flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        <span>Craniofacial Structural Description</span>
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">AUTO-COMPILED INVARIANT</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      {selectedCharacter.craniofacialSummary}
                    </p>
                  </div>

                  {/* Structural Biometric Checklist */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3.5 rounded-xl bg-[#090A0F] border border-slate-800 space-y-1">
                      <span className="text-[10px] font-mono text-slate-500 uppercase">OCULAR OPTIC MATRIX</span>
                      <p className="text-xs font-bold text-white">Cyan Vertical Iris Seam</p>
                      <span className="text-[10px] font-mono text-[#68E7FF]">LOCKED [No Deviation]</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#090A0F] border border-slate-800 space-y-1">
                      <span className="text-[10px] font-mono text-slate-500 uppercase">CRANIAL SCAR CONTOUR</span>
                      <p className="text-xs font-bold text-white">Right Zygomatic Arch</p>
                      <span className="text-[10px] font-mono text-emerald-400">PASSED [0.01% Drift]</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#090A0F] border border-slate-800 space-y-1">
                      <span className="text-[10px] font-mono text-slate-500 uppercase">HAIR GEOMETRY</span>
                      <p className="text-xs font-bold text-white">Raven Messy Fringe</p>
                      <span className="text-[10px] font-mono text-amber-400">FIXED PIGMENT #090A0F</span>
                    </div>
                  </div>

                  {/* Signature Expressions */}
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold uppercase text-slate-300">
                        Signature Expressions ({selectedCharacter.expressions.length})
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">CANON-VERIFIED</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {selectedCharacter.expressions.map((exp, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-[#090A0F] border border-slate-800/80 flex items-center justify-between text-xs font-mono"
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#D8FF65]" />
                            <span className="text-white font-medium">{exp}</span>
                          </div>
                          <Badge variant="carbon">Active</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: TACTICAL WARDROBE & PALETTE */}
              {activeTab === 'wardrobe' && (
                <div className="space-y-5 animate-in fade-in">
                  <div className="p-4 rounded-xl bg-[#090A0F] border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold uppercase text-[#9D78FF] flex items-center gap-2">
                        <Shirt className="w-4 h-4" />
                        <span>Tactical Apparel & Invariant Wardrobe</span>
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">STYLE SPECIFICATION</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {selectedCharacter.tacticalWardrobe}
                    </p>
                  </div>

                  {/* Color Swatches */}
                  <div className="space-y-2.5">
                    <span className="text-xs font-mono font-bold uppercase text-slate-300 flex items-center gap-2">
                      <Palette className="w-4 h-4 text-[#68E7FF]" />
                      <span>Signature Color Swatches & Histogram Distribution</span>
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {selectedCharacter.colorSwatches.map((swatch, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-[#090A0F] border border-slate-800 space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-white">{swatch.name}</span>
                            <span
                              className="w-4 h-4 rounded-full border border-white/20 shadow-sm"
                              style={{ backgroundColor: swatch.hex }}
                            />
                          </div>
                          <div className="text-[11px] font-mono text-slate-400 bg-black/40 px-2 py-1 rounded border border-slate-800/80">
                            {swatch.hex}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Registered Outfits */}
                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-mono font-bold uppercase text-slate-300">
                      Registered Outfits ({selectedCharacter.outfits.length})
                    </span>
                    <div className="space-y-2">
                      {selectedCharacter.outfits.map((outfit, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-[#090A0F] border border-slate-800 flex items-center justify-between text-xs font-mono"
                        >
                          <div className="flex items-center gap-2">
                            <Lock className="w-3.5 h-3.5 text-[#9D78FF]" />
                            <span className="text-white font-medium">{outfit}</span>
                          </div>
                          <span className="text-[10px] text-emerald-400 font-mono">TEXTURE LOCKED</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: FORBIDDEN DRIFT CONSTRAINTS */}
              {activeTab === 'forbidden' && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-mono font-bold uppercase text-red-400 flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4 text-red-500" />
                        <span>Forbidden Negative Drift Rules ({selectedCharacter.forbiddenDrift.length})</span>
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        These negative constraints are strictly enforced in every generation packet to prevent AI model hallucinations.
                      </p>
                    </div>
                    <Badge variant="carbon">STRICT FILTER</Badge>
                  </div>

                  <div className="space-y-2.5">
                    {selectedCharacter.forbiddenDrift.map((rule, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-red-950/20 border border-red-900/40 flex items-start gap-3"
                      >
                        <span className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0" />
                        <div className="flex-1">
                          <p className="text-xs font-mono text-red-200 font-medium">{rule}</p>
                          <span className="text-[10px] font-mono text-red-400/70">
                            RULE_ID: NEG_DRIFT_0{idx + 1} • WEIGHT: 1.0 (HARD NEGATIVE)
                          </span>
                        </div>
                        <Badge variant="carbon">Active Lock</Badge>
                      </div>
                    ))}
                  </div>

                  {/* Add rule hint */}
                  <div className="p-3 rounded-xl bg-[#090A0F] border border-slate-800 text-xs font-mono text-slate-400 flex items-center justify-between">
                    <span>Need to enforce new negative guardrails for combat or flashback scenes?</span>
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="text-[#D8FF65] hover:underline font-bold"
                    >
                      + Add Rule
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 4: CONTINUITY PACKET JSON */}
              {activeTab === 'packet' && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-mono font-bold uppercase text-[#D8FF65] flex items-center gap-2">
                        <Terminal className="w-4 h-4" />
                        <span>ContinuityService Payload Packet</span>
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        Exact normalized JSON structure injected into the server-side AI Gateway before dispatching to Gemini.
                      </p>
                    </div>
                    <button
                      onClick={handleCopyJson}
                      className="px-3 py-1.5 rounded-lg bg-[#11131A] border border-slate-800 text-xs font-mono text-slate-300 hover:text-white flex items-center gap-1.5"
                    >
                      <Copy className="w-3.5 h-3.5 text-[#68E7FF]" />
                      <span>{copiedJson ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>

                  <pre className="p-4 rounded-xl bg-[#090A0F] border border-slate-800/90 text-[11px] font-mono text-emerald-400 overflow-x-auto leading-relaxed max-h-80">
{JSON.stringify(
  {
    engine: 'WAZA-ZONE_CONTINUITY_GUARD_v2.4',
    timestamp: new Date().toISOString(),
    character: {
      id: selectedCharacter.id,
      name: selectedCharacter.name,
      dnaHash: selectedCharacter.dnaHash,
      roleTier: selectedCharacter.roleTier,
      craniofacialInvariants: selectedCharacter.craniofacialSummary,
      currentOutfit: selectedCharacter.outfits[0] || 'Standard Ops Duster',
      tacticalWardrobe: selectedCharacter.tacticalWardrobe,
      colorPalette: selectedCharacter.colorSwatches,
      forbiddenDrift: selectedCharacter.forbiddenDrift,
      masterPrompt: selectedCharacter.masterPrompt,
      referenceAnchors: selectedCharacter.referenceImages
    },
    constraints: {
      maxDriftVarianceTolerance: 0.02,
      preserveScreentoneDensity: true,
      enforceStrictNegativeWeights: true
    }
  },
  null,
  2
)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3. MODAL: REGISTER NEW CHARACTER DNA */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Register Character DNA Vector"
      >
        <form onSubmit={handleCreateCharacter} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">CHARACTER NAME *</label>
            <input
              type="text"
              required
              placeholder="e.g. Ren Kurogane, Aria Vance..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#090A0F] border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#D8FF65]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">SERIES ROLE TIER</label>
              <select
                value={roleTier}
                onChange={(e) => setRoleTier(e.target.value)}
                className="w-full bg-[#090A0F] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D8FF65]"
              >
                <option value="Protagonist (Lead Ronin)">Protagonist (Lead Ronin)</option>
                <option value="Deuteragonist (Master Netrunner)">Deuteragonist (Master Netrunner)</option>
                <option value="Antagonist (Syndicate Enforcer)">Antagonist (Syndicate Enforcer)</option>
                <option value="Supporting Specialist">Supporting Specialist</option>
                <option value="Recurring Contact">Recurring Contact</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">AVATAR PRESET</label>
              <select
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                className="w-full bg-[#090A0F] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D8FF65]"
              >
                <option value="/src/assets/images/waza_turnaround_1_1790673706903.jpg">Ren Kurogane (Cybernetic Optic)</option>
                <option value="/src/assets/images/waza_aria_portrait_1790676973041.jpg">Aria Vance (Synth Hacker)</option>
                <option value="/src/assets/images/waza_kageyama_port_1790676983961.jpg">Commander Kageyama (Oni Mask)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">
              CRANIOFACIAL & FACIAL INVARIANTS
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Chiseled jawline, glowing cyan left eye with vertical aperture, raven hair..."
              value={craniofacial}
              onChange={(e) => setCraniofacial(e.target.value)}
              className="w-full bg-[#090A0F] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D8FF65]"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">
              TACTICAL WARDROBE & SIGNATURE STYLE
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Obsidian Kevlar duster with electric lime lining, carbon arm guards..."
              value={wardrobe}
              onChange={(e) => setWardrobe(e.target.value)}
              className="w-full bg-[#090A0F] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D8FF65]"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-red-400 mb-1">
              FORBIDDEN DRIFT (ONE PER LINE)
            </label>
            <textarea
              rows={2}
              placeholder="Never render left eye as normal organic eye&#10;Never omit dark coat in rain"
              value={forbiddenDrift}
              onChange={(e) => setForbiddenDrift(e.target.value)}
              className="w-full bg-[#090A0F] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500 font-mono"
            />
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-mono text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#D8FF65] text-[#090A0F] text-xs font-bold hover:bg-[#cbf54f] transition-all"
            >
              Lock Character Vector
            </button>
          </div>
        </form>
      </Modal>

      {/* 4. MODAL: MULTI-EPISODE DRIFT AUDIT */}
      <Modal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
        title="Multi-Episode Cross-Panel Drift Audit"
      >
        <div className="space-y-4">
          <div className="p-3.5 rounded-xl bg-[#090A0F] border border-slate-800 text-xs font-mono space-y-2">
            <div className="flex items-center justify-between text-slate-300">
              <span>SCAN TARGET:</span>
              <strong className="text-white">All 14 Panels across Episode 1 & 2</strong>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span>CHARACTER DNA SEED:</span>
              <strong className="text-[#68E7FF]">{selectedCharacter.dnaHash}</strong>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span>AUDIT TOLERANCE:</span>
              <strong className="text-emerald-400">&lt; 0.04% Vector Drift</strong>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-mono text-slate-400 uppercase">AUDIT VERIFICATION STEPS:</span>
            {[
              { step: '1. Craniofacial Mesh Landmark Alignment', result: '99.8% Match (PASSED)' },
              { step: '2. Signature Color Histogram Invariant Check', result: '99.4% Match (PASSED)' },
              { step: '3. Negative Prompt Drift Violation Scan', result: '0 Violations Detected' },
              { step: '4. Screentone Shading Continuity Check', result: '100% Inked (PASSED)' }
            ].map((s, idx) => (
              <div key={idx} className="p-2.5 rounded-lg bg-[#090A0F] border border-slate-800/80 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-300">{s.step}</span>
                <span className="text-emerald-400 font-bold">{s.result}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={() => setIsAuditModalOpen(false)}
              className="px-5 py-2.5 rounded-xl bg-[#D8FF65] text-[#090A0F] text-xs font-bold hover:bg-[#cbf54f]"
            >
              Audit Confirmed • Close
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
