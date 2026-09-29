import React, { useState } from 'react';
import {
  Globe2,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Plus,
  Search,
  Download,
  SlidersHorizontal,
  Edit3,
  Terminal,
  Zap,
  Check,
  Compass,
  Users,
  Atom,
  BookOpen,
  Calendar,
  AlertOctagon,
  Copy,
  Layers,
  Sparkles,
  ExternalLink,
  ChevronDown,
  RefreshCw,
  Eye
} from 'lucide-react';

interface LoreEntity {
  id: string;
  uuid: string;
  title: string;
  category: 'LOCATIONS' | 'FACTIONS' | 'LAWS' | 'GLOSSARY';
  categoryLabel: string;
  coords?: string;
  revDate?: string;
  badge?: string;
  badgeColor?: string;
  entityTypeTag: string;
  retconForbidden: boolean;
  angles?: { title: string; image: string }[];
  invariants?: {
    colorTemp: string;
    refraction: string;
    wallMaterials: string;
    maxCeilingAlt: string;
  };
  canonRecord: {
    leadParagraph: string;
    mandatoryRuleTitle?: string;
    mandatoryRuleDesc?: string;
    inhabitantsNote?: string;
    tags: string[];
  };
  jsonPayload: any;
}

export const WorldBible: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<string>('#location');
  const [searchQuery, setSearchQuery] = useState('');
  const [isIntegrityCheckRunning, setIsIntegrityCheckRunning] = useState(false);
  const [integrityPassed, setIntegrityPassed] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [copiedPayload, setCopiedPayload] = useState(false);

  // Retcon Matrix Checkbox state
  const [retconLocks, setRetconLocks] = useState({
    noBlueSkies: true,
    noLasersBefore2085: true,
    cyberLimbHeatSinks: true,
    renEyeBiological: true
  });

  const toggleRetcon = (key: keyof typeof retconLocks) => {
    setRetconLocks((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Full Database of Lore Entities
  const entities: LoreEntity[] = [
    {
      id: 'shibuya-helipad',
      uuid: 'loc_shibuya_helipad_09',
      title: 'Shibuya Under-Helipad & Lower Core',
      category: 'LOCATIONS',
      categoryLabel: '1. Locations & Biomes',
      coords: '35.6580° N, 139.7016° E (Sub-L3)',
      badge: 'Level 0: Absolute',
      badgeColor: 'text-emerald-400',
      entityTypeTag: 'LOCATION ENTITY',
      retconForbidden: true,
      angles: [
        {
          title: 'Angle 01: Low Apex Look-Up',
          image: '/src/assets/images/waza_helipad_angle1_1790679698692.jpg'
        },
        {
          title: 'Angle 02: Under-Deck Vent Void',
          image: '/src/assets/images/waza_helipad_angle2_1790679713058.jpg'
        }
      ],
      invariants: {
        colorTemp: '7200K Cyan / 2400K Amber',
        refraction: 'IOR 1.33 (Heavy Acid Sheen)',
        wallMaterials: 'Pitted Graphene Alloy',
        maxCeilingAlt: 'Level -40 to -48'
      },
      canonRecord: {
        leadParagraph:
          'Built following the catastrophic seismic rupture of 2075, the **Shibuya Under-Helipad** serves as the exclusive clandestine insertion corridor for the **@Kurogane_Syndicate**. Suspended directly above the geothermal ventilation vents, surface temperatures never drop below 38°C despite continuous chemical rain.',
        mandatoryRuleTitle: 'MANDATORY CAMERA RULE:',
        mandatoryRuleDesc:
          'All wide shots looking northward MUST reveal the silhouetted thermal cooling stacks of the Kurogane Tower in the upper third of the panel framing. Never render open horizons or unpolluted skyboxes.',
        inhabitantsNote:
          'Key Inhabitants / Active Patrols: @Ren_Kurogane maintained an auxiliary safehouse in Bay 04 between 2084 and 2086. @Aoi_Vance holds biometric clearance bypass key alpha-9.',
        tags: ['#district_shibuya', '#syndicate_blackzone', '#acid_rain_tier3']
      },
      jsonPayload: {
        entity_id: 'loc_shibuya_helipad_09',
        canon_lock: true,
        optical_invariants: {
          weather: 'torrential_acid_rain',
          fog_density: 0.72,
          lux_range: [12, 140],
          chroma_keys: ['#00F2FE', '#4FACFE', '#FFB199']
        },
        forbidden_tokens: ['clear_sky', 'sunlight', 'laser_rifle']
      }
    },
    {
      id: 'lower-docks',
      uuid: 'loc_lower_docks_sub02',
      title: 'Lower Docks Undergrid',
      category: 'LOCATIONS',
      categoryLabel: '1. Locations & Biomes',
      coords: '35.6210° N, 139.7540° E (Sub-L6)',
      revDate: 'Rev: 2 days ago',
      entityTypeTag: 'LOCATION ENTITY',
      retconForbidden: true,
      angles: [
        {
          title: 'Angle 01: Sump Reservoir Gate',
          image: '/src/assets/images/waza_helipad_angle2_1790679713058.jpg'
        },
        {
          title: 'Angle 02: Pylon Crane Catwalks',
          image: '/src/assets/images/waza_hero_panel_1790673692187.jpg'
        }
      ],
      invariants: {
        colorTemp: '5800K Mercury Vapor / 1800K Sodium',
        refraction: 'IOR 1.45 (Industrial Bilge Slick)',
        wallMaterials: 'Corroded Marine Steel & Concrete',
        maxCeilingAlt: 'Level -60 to -72'
      },
      canonRecord: {
        leadParagraph:
          'The submerged freight sluices connecting Tokyo Bay to the inner subterranean canal network. Used by clandestine smuggler flotillas and automated sediment filtration barges.',
        mandatoryRuleTitle: 'ATMOSPHERIC HAZE INVARIANT:',
        mandatoryRuleDesc:
          'High particulate fog with minimum 40% visibility occlusion at distances exceeding 15 meters. Water surfaces must always exhibit iridescent chemical sheen.',
        inhabitantsNote: 'Patrolled by automated AetherCore submersibles and rogue dock scavengers.',
        tags: ['#tokyo_bay_submerged', '#freight_sluices', '#black_market_waterway']
      },
      jsonPayload: {
        entity_id: 'loc_lower_docks_sub02',
        canon_lock: true,
        optical_invariants: {
          weather: 'subterranean_condensation',
          fog_density: 0.85,
          lux_range: [5, 60],
          chroma_keys: ['#1A365D', '#00B4D8', '#F77F00']
        },
        forbidden_tokens: ['daylight', 'dry_pavement', 'civilian_crowds']
      }
    },
    {
      id: 'kurogane-core',
      uuid: 'loc_kurogane_core_01',
      title: 'Kurogane Foundry Core',
      category: 'LOCATIONS',
      categoryLabel: '1. Locations & Biomes',
      coords: '35.6900° N, 139.6920° E (Spire Base)',
      revDate: 'Rev: 12 hrs ago',
      entityTypeTag: 'LOCATION ENTITY',
      retconForbidden: true,
      angles: [
        {
          title: 'Angle 01: Crucible Smelter Gantry',
          image: '/src/assets/images/waza_showcase_left_1790673802571.jpg'
        },
        {
          title: 'Angle 02: Ingot Casting Bay',
          image: '/src/assets/images/waza_helipad_angle1_1790679698692.jpg'
        }
      ],
      invariants: {
        colorTemp: '1600K Molten Glow / 8500K Arc Blast',
        refraction: 'Heat Distortion Shimmer 3.2Hz',
        wallMaterials: 'Reinforced Refractory Tungsten Tiles',
        maxCeilingAlt: 'Ground Level to Floor +12'
      },
      canonRecord: {
        leadParagraph:
          'The central industrial crucible responsible for refining high-tensile graphene chassis and tachyon-compatible monomolecular blade stock.',
        mandatoryRuleTitle: 'HEAT RADIATION INVARIANT:',
        mandatoryRuleDesc:
          'Air turbulence shimmer must distort linear perspective lines directly above active crucible channels.',
        inhabitantsNote: 'Overseen by Master Smith Katakura and reinforced hydraulic automaton crews.',
        tags: ['#foundry_spire', '#tachyon_metallurgy', '#syndicate_heavy_industry']
      },
      jsonPayload: {
        entity_id: 'loc_kurogane_core_01',
        canon_lock: true,
        optical_invariants: {
          weather: 'superheated_ambient',
          lux_range: [150, 4800],
          chroma_keys: ['#FF4500', '#FFD700', '#11131A']
        },
        forbidden_tokens: ['rain', 'ice', 'unshielded_glass']
      }
    }
  ];

  const [selectedEntity, setSelectedEntity] = useState<LoreEntity>(entities[0]);

  const handleRunIntegrity = () => {
    setIsIntegrityCheckRunning(true);
    setIntegrityPassed(false);
    setTimeout(() => {
      setIsIntegrityCheckRunning(false);
      setIntegrityPassed(true);
      setTimeout(() => setIntegrityPassed(false), 5000);
    }, 1200);
  };

  const handleCopyPayload = () => {
    navigator.clipboard.writeText(JSON.stringify(selectedEntity.jsonPayload, null, 2));
    setCopiedPayload(true);
    setTimeout(() => setCopiedPayload(false), 2000);
  };

  return (
    <div className="space-y-5 max-w-[1720px] mx-auto pb-16 font-sans">
      {/* ======================================================== */}
      {/* 1. TOP HEADER BAR: TITLE, CANON BADGES & PRIMARY ACTIONS */}
      {/* ======================================================== */}
      <div className="border-b border-[#1E2230] pb-5">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-xl md:text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
                <span className="text-lg">📖</span>
                <span>CHRONO BLADE: OMEGA</span>
              </h1>

              {/* Version & Validation Badges */}
              <span className="px-2 py-0.5 rounded bg-[#10202F] text-[#4FACFE] border border-[#1E3A5F] text-[11px] font-mono font-bold tracking-wider">
                v3.4.1 SIGNED
              </span>

              <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#0D211A] border border-[#144A32] text-xs font-mono font-medium text-[#38EF7D]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#38EF7D] animate-pulse" />
                <span>DRIFT GUARD: ACTIVE (0 Drifts)</span>
              </div>

              <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#141724] border border-[#232A44] text-xs font-mono text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-[#68E7FF]" />
                <span>Zod Schema: Validated</span>
              </div>

              <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#151D2A] border border-[#203650] text-xs font-mono text-[#68E7FF]">
                <Zap className="w-3.5 h-3.5 text-[#68E7FF]" />
                <span>AI Continuity: SYNCED</span>
              </div>
            </div>
          </div>

          {/* Action Buttons Row */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleRunIntegrity}
              disabled={isIntegrityCheckRunning}
              className="px-3.5 py-2 rounded-xl bg-[#11131A] hover:bg-[#181B26] border border-[#262C40] hover:border-[#68E7FF]/50 text-xs font-mono text-slate-200 flex items-center gap-2 transition-all shadow-sm cursor-pointer"
            >
              <SlidersHorizontal className={`w-3.5 h-3.5 text-[#68E7FF] ${isIntegrityCheckRunning ? 'animate-spin' : ''}`} />
              <span>{isIntegrityCheckRunning ? 'Auditing Canon...' : 'Run Integrity Check'}</span>
            </button>

            <button
              onClick={() => {
                const blob = new Blob([JSON.stringify(entities, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `chrono-blade-omega-world-bible-v3.4.1.json`;
                a.click();
              }}
              className="px-3.5 py-2 rounded-xl bg-[#11131A] hover:bg-[#181B26] border border-[#262C40] hover:border-slate-500 text-xs font-mono text-slate-200 flex items-center gap-2 transition-all shadow-sm cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-slate-400" />
              <span>Export Bible</span>
            </button>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-[#D8FF65] hover:bg-[#cbfa4e] text-[#090A0F] text-xs font-bold font-sans flex items-center gap-1.5 transition-all shadow-lg shadow-[#D8FF65]/15 cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Add Lore Entity</span>
            </button>
          </div>
        </div>

        {/* Real-time integrity notification banner */}
        {integrityPassed && (
          <div className="mt-3 p-3 rounded-xl bg-[#091F14] border border-[#38EF7D]/40 text-xs font-mono text-[#38EF7D] flex items-center gap-2.5 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>CANON INTEGRITY CHECK PASSED: 42 Entities Validated • 0 Broken Cross-References • 100% Vector Anchor Synchronized</span>
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* 2. THREE-COLUMN ARCHITECTURE GRID                        */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* ====================================================== */}
        {/* COLUMN 1: ENTITIES INDEX (3 cols)                      */}
        {/* ====================================================== */}
        <div className="lg:col-span-3 space-y-3.5">
          <div className="bg-[#11131A] border border-[#1E2230] rounded-2xl p-4 shadow-xl space-y-3.5">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-500" />
              <input
                type="text"
                placeholder="Filter entities, tags, canon IDs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#090A0F] border border-[#1E2230] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#4FACFE] font-mono"
              />
            </div>

            {/* Quick Tag Pills */}
            <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px]">
              {['#location', '#faction', '#physics', '#glossary'].map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTag(t)}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                    selectedTag === t
                      ? 'bg-[#1C2333] text-[#68E7FF] border border-[#2B3B59] font-bold'
                      : 'bg-[#090A0F] text-slate-400 hover:text-white border border-[#1E2230]'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Header: ENTITIES INDEX (42) SYNCHRONIZED */}
            <div className="flex items-center justify-between pt-2 border-t border-[#1E2230]">
              <span className="text-[11px] font-mono font-bold tracking-wider text-slate-300 uppercase">
                ENTITIES INDEX (42)
              </span>
              <span className="text-[10px] font-mono text-[#38EF7D] bg-[#0E261B] border border-[#1E5037] px-2 py-0.5 rounded font-semibold">
                SYNCHRONIZED
              </span>
            </div>

            {/* Structured Categories & Entity Rows */}
            <div className="space-y-4 pt-1">
              
              {/* Category 1: Locations & Biomes (14 items) */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 font-bold px-1">
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <Compass className="w-3.5 h-3.5 text-[#4FACFE]" />
                    <span>1. Locations & Biomes</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-normal">14 items</span>
                </div>

                <div className="space-y-1">
                  {/* Item 1: Shibuya Under-Helipad (Active/Selected) */}
                  <div
                    onClick={() => setSelectedEntity(entities[0])}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      selectedEntity.id === 'shibuya-helipad'
                        ? 'bg-[#181D29] border-[#4FACFE]/70 shadow-md shadow-[#4FACFE]/5'
                        : 'bg-[#090A0F] border-[#1E2230] hover:bg-[#141822]'
                    }`}
                  >
                    <div>
                      <h4 className="text-xs font-bold text-white leading-tight">Shibuya Under-Helipad</h4>
                      <p className="text-[10px] font-mono text-slate-400 mt-0.5">loc_shibuya_helipad_09</p>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] font-mono text-[#38EF7D] bg-[#0E261B] px-1.5 py-0.5 rounded border border-[#1E5037]">
                      <Lock className="w-2.5 h-2.5" />
                      <span>Level 0: Absolute</span>
                    </div>
                  </div>

                  {/* Item 2: Lower Docks Undergrid */}
                  <div
                    onClick={() => setSelectedEntity(entities[1])}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      selectedEntity.id === 'lower-docks'
                        ? 'bg-[#181D29] border-[#4FACFE]/70 shadow-md shadow-[#4FACFE]/5'
                        : 'bg-[#090A0F] border-[#1E2230] hover:bg-[#141822]'
                    }`}
                  >
                    <div>
                      <h4 className="text-xs font-medium text-slate-200 leading-tight">Lower Docks Undergrid</h4>
                      <p className="text-[10px] font-mono text-slate-500 mt-0.5">
                        loc_lower_docks_sub02 • <span className="text-slate-400">Rev: 2 days ago</span>
                      </p>
                    </div>
                    <Lock className="w-3 h-3 text-slate-500" />
                  </div>

                  {/* Item 3: Kurogane Foundry Core */}
                  <div
                    onClick={() => setSelectedEntity(entities[2])}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      selectedEntity.id === 'kurogane-core'
                        ? 'bg-[#181D29] border-[#4FACFE]/70 shadow-md shadow-[#4FACFE]/5'
                        : 'bg-[#090A0F] border-[#1E2230] hover:bg-[#141822]'
                    }`}
                  >
                    <div>
                      <h4 className="text-xs font-medium text-slate-200 leading-tight">Kurogane Foundry Core</h4>
                      <p className="text-[10px] font-mono text-slate-500 mt-0.5">
                        loc_kurogane_core_01 • <span className="text-slate-400">Rev: 12 hrs ago</span>
                      </p>
                    </div>
                    <Lock className="w-3 h-3 text-slate-500" />
                  </div>
                </div>
              </div>

              {/* Category 2: Factions & Alliances (6 items) */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 font-bold px-1">
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <Users className="w-3.5 h-3.5 text-[#9D78FF]" />
                    <span>2. Factions & Alliances</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-normal">6 items</span>
                </div>

                <div className="space-y-1">
                  <div className="p-2.5 rounded-xl bg-[#090A0F] border border-[#1E2230] hover:bg-[#141822] flex items-center justify-between cursor-pointer">
                    <span className="text-xs text-slate-200 font-medium">Kurogane Syndicate</span>
                    <span className="text-[10px] font-mono text-[#D8FF65] bg-[#D8FF65]/10 px-2 py-0.5 rounded border border-[#D8FF65]/30 font-bold">
                      Tier A
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#090A0F] border border-[#1E2230] hover:bg-[#141822] flex items-center justify-between cursor-pointer">
                    <span className="text-xs text-slate-200 font-medium">Enforcer Corps 09</span>
                    <span className="text-[10px] font-mono text-[#4FACFE] bg-[#4FACFE]/10 px-2 py-0.5 rounded border border-[#4FACFE]/30 font-bold">
                      Tier B
                    </span>
                  </div>
                </div>
              </div>

              {/* Category 3: Metaphysical & Tech Laws (8 rules) */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 font-bold px-1">
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <Atom className="w-3.5 h-3.5 text-[#38EF7D]" />
                    <span>3. Metaphysical & Tech Laws</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-normal">8 rules</span>
                </div>

                <div className="space-y-1">
                  <div className="p-2.5 rounded-xl bg-[#090A0F] border border-[#1E2230] hover:bg-[#141822] flex items-center justify-between cursor-pointer">
                    <span className="text-xs text-slate-200 font-medium truncate">Chrono-Displacement Limit...</span>
                    <Lock className="w-3 h-3 text-slate-500 shrink-0" />
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#090A0F] border border-[#1E2230] hover:bg-[#141822] flex items-center justify-between cursor-pointer">
                    <span className="text-xs text-slate-200 font-medium truncate">Neural Weave Rejection Rate</span>
                    <Lock className="w-3 h-3 text-slate-500 shrink-0" />
                  </div>
                </div>
              </div>

              {/* Category 4: Slang & Dialect Glossary (14 words) */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 font-bold px-1">
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <BookOpen className="w-3.5 h-3.5 text-[#68E7FF]" />
                    <span>4. Slang & Dialect Glossary</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-normal">14 words</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ====================================================== */}
        {/* COLUMN 2: CENTER STAGE - ACTIVE ENTITY DEEP DIVE (5 cols) */}
        {/* ====================================================== */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#11131A] border border-[#1E2230] rounded-2xl p-5 md:p-6 shadow-xl space-y-5">
            
            {/* Header: Tags & Title */}
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded bg-[#2D1F13] text-[#FFA94D] border border-[#593A1B] text-[10px] font-mono font-bold tracking-wider uppercase">
                    {selectedEntity.entityTypeTag}
                  </span>
                  <span className="px-2.5 py-0.5 rounded bg-[#2D1418] text-[#FF6B6B] border border-[#592026] text-[10px] font-mono font-bold tracking-wider uppercase">
                    RETCON FORBIDDEN
                  </span>
                </div>
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="p-1.5 rounded-lg bg-[#090A0F] border border-[#1E2230] text-slate-400 hover:text-white hover:border-slate-500 transition-all cursor-pointer"
                  title="Edit Entity Record"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>

              <h2 className="text-xl md:text-2xl font-black text-white mt-2 tracking-tight">
                {selectedEntity.title}
              </h2>

              <p className="text-[11px] font-mono text-slate-400 mt-1 flex flex-wrap items-center gap-2">
                <span>UUID: <strong className="text-[#4FACFE]">{selectedEntity.uuid}</strong></span>
                <span>•</span>
                <span>Coords: <strong className="text-slate-300">{selectedEntity.coords}</strong></span>
              </p>
            </div>

            {/* Visual Anchor Reference Matrix */}
            <div className="space-y-2.5 pt-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold tracking-wider text-slate-300 uppercase">
                  VISUAL ANCHOR REFERENCE MATRIX
                </span>
                <span className="text-[10px] font-mono text-[#9D78FF] bg-[#1E1633] border border-[#3D2A66] px-2 py-0.5 rounded font-semibold">
                  Gemini 2.0 Ingested
                </span>
              </div>

              {/* Side-by-Side Reference Image Panels */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedEntity.angles?.map((angle, idx) => (
                  <div key={idx} className="rounded-xl overflow-hidden border border-[#1E2230] bg-[#090A0F] group">
                    <div className="aspect-[16/10] overflow-hidden bg-black relative">
                      <img
                        src={angle.image}
                        alt={angle.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                    </div>
                    <div className="p-2.5 bg-[#090A0F] flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-200 font-bold truncate text-[11px]">{angle.title}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#38EF7D] shrink-0" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Lighting & Material Optical Invariants (4-Grid Metric Tiles) */}
            <div className="space-y-2 pt-1">
              <span className="text-[11px] font-mono font-bold tracking-wider text-slate-300 uppercase">
                LIGHTING & MATERIAL OPTICAL INVARIANTS
              </span>

              <div className="grid grid-cols-2 gap-2.5 text-xs font-mono">
                {/* 1. Color Temp */}
                <div className="p-3 rounded-xl bg-[#090A0F] border border-[#1E2230] space-y-1">
                  <span className="text-[9px] uppercase tracking-wider text-slate-500">COLOR TEMP</span>
                  <p className="font-bold text-[#4FACFE] text-[11px] leading-tight">
                    {selectedEntity.invariants?.colorTemp}
                  </p>
                </div>

                {/* 2. Refraction / Rain */}
                <div className="p-3 rounded-xl bg-[#090A0F] border border-[#1E2230] space-y-1">
                  <span className="text-[9px] uppercase tracking-wider text-slate-500">REFRACTION / RAIN</span>
                  <p className="font-bold text-[#D8FF65] text-[11px] leading-tight">
                    {selectedEntity.invariants?.refraction}
                  </p>
                </div>

                {/* 3. Wall Materials */}
                <div className="p-3 rounded-xl bg-[#090A0F] border border-[#1E2230] space-y-1">
                  <span className="text-[9px] uppercase tracking-wider text-slate-500">WALL MATERIALS</span>
                  <p className="font-bold text-slate-200 text-[11px] leading-tight">
                    {selectedEntity.invariants?.wallMaterials}
                  </p>
                </div>

                {/* 4. Max Ceiling Alt */}
                <div className="p-3 rounded-xl bg-[#090A0F] border border-[#1E2230] space-y-1">
                  <span className="text-[9px] uppercase tracking-wider text-slate-500">MAX CEILING ALT</span>
                  <p className="font-bold text-slate-200 text-[11px] leading-tight">
                    {selectedEntity.invariants?.maxCeilingAlt}
                  </p>
                </div>
              </div>
            </div>

            {/* Authoritative Canon Record */}
            <div className="space-y-2.5 pt-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold tracking-wider text-slate-300 uppercase">
                  AUTHORITATIVE CANON RECORD
                </span>
                <span className="text-[10px] font-mono text-[#38EF7D] flex items-center gap-1.5 font-medium">
                  <span>Markdown Live Sync</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#38EF7D] animate-ping" />
                </span>
              </div>

              {/* Narrative Box */}
              <div className="p-4 rounded-xl bg-[#090A0F] border border-[#1E2230] space-y-3.5 text-xs text-slate-300 leading-relaxed font-sans">
                <p>
                  Built following the catastrophic seismic rupture of 2075, the{' '}
                  <strong className="text-white font-bold">Shibuya Under-Helipad</strong> serves as the exclusive clandestine insertion corridor for the{' '}
                  <span className="text-[#9D78FF] font-semibold">@Kurogane_Syndicate</span>. Suspended directly above the geothermal ventilation vents, surface temperatures never drop below 38°C despite continuous chemical rain.
                </p>

                {/* Mandatory Camera Rule Callout Banner */}
                {selectedEntity.canonRecord.mandatoryRuleTitle && (
                  <div className="p-3 rounded-lg bg-[#1F180B] border border-[#594212] text-xs space-y-1">
                    <span className="font-mono font-bold text-[#FFA94D] text-[10px] uppercase tracking-wide block">
                      {selectedEntity.canonRecord.mandatoryRuleTitle}
                    </span>
                    <p className="text-[#FFE066] text-[11px] leading-relaxed">
                      {selectedEntity.canonRecord.mandatoryRuleDesc}
                    </p>
                  </div>
                )}

                {/* Inhabitants & Clearances */}
                {selectedEntity.canonRecord.inhabitantsNote && (
                  <p className="text-[11px] text-slate-400 font-mono leading-relaxed pt-1">
                    {selectedEntity.canonRecord.inhabitantsNote.split('@').map((part, i) => {
                      if (i === 0) return part;
                      const [mention, ...rest] = part.split(' ');
                      return (
                        <React.Fragment key={i}>
                          <span className="text-[#68E7FF] font-bold">@{mention} </span>
                          {rest.join(' ')}
                        </React.Fragment>
                      );
                    })}
                  </p>
                )}

                {/* Tag Pills */}
                <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-[#1E2230] text-[11px] font-mono">
                  {selectedEntity.canonRecord.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-[#131622] border border-[#212638] text-slate-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ====================================================== */}
        {/* COLUMN 3: RIGHT PANEL - CHRONOLOGY & RETCON (4 cols)   */}
        {/* ====================================================== */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Card 1: Chronology Timeline Engine */}
          <div className="bg-[#11131A] border border-[#1E2230] rounded-2xl p-4 md:p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">📈</span>
                <h3 className="text-xs font-mono font-bold tracking-wider text-slate-200 uppercase">
                  Chronology Timeline Engine
                </h3>
              </div>
              <span className="text-[10px] font-mono text-slate-300 bg-[#161B26] border border-[#252D3F] px-2 py-0.5 rounded font-bold">
                LINEAR CANON
              </span>
            </div>

            {/* Vertical Timeline Nodes */}
            <div className="relative pl-5 space-y-5 border-l-2 border-[#1E2230] ml-2">
              
              {/* Node 1: 2062.08.14 */}
              <div className="relative">
                <span className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-[#11131A] border-2 border-slate-400" />
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-slate-200">2062.08.14</span>
                  <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-[#161B26] text-slate-400 border border-[#252D3F]">
                    WORLD SHIFT
                  </span>
                </div>
                <h4 className="text-xs font-bold text-white mt-1">The Neural Crash</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5">
                  Global blackout of optical wetware implants. 14M disconnected.
                </p>
              </div>

              {/* Node 2: 2075.03.29 */}
              <div className="relative">
                <span className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-[#11131A] border-2 border-slate-400" />
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-slate-200">2075.03.29</span>
                  <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-[#161B26] text-slate-400 border border-[#252D3F]">
                    STRUCTURAL
                  </span>
                </div>
                <h4 className="text-xs font-bold text-white mt-1">The Shinjuku Fracture</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5">
                  Neo-Tokyo lower wards quarantined and submerged under steel lids.
                </p>
              </div>

              {/* Node 3: 2088.11.02 (CURRENT - ACTIVE SCRIPT NODE) */}
              <div className="relative">
                <span className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-[#D8FF65] shadow-lg shadow-[#D8FF65]/50 animate-pulse" />
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#D8FF65]">2088.11.02 (CURRENT)</span>
                  <span className="text-[9px] font-mono font-black uppercase px-2 py-0.5 rounded bg-[#D8FF65]/15 text-[#D8FF65] border border-[#D8FF65]/40">
                    ACTIVE SCRIPT
                  </span>
                </div>
                <h4 className="text-xs font-black text-white mt-1">Ep 01: Rooftop Infiltration</h4>
                <p className="text-[11px] text-slate-300 leading-relaxed mt-0.5">
                  Ren breaches Kurogane Helipad Sub-09 during midnight storm.
                </p>
              </div>

            </div>
          </div>

          {/* Card 2: Forbidden Retcon Matrix */}
          <div className="bg-[#11131A] border border-[#1E2230] rounded-2xl p-4 md:p-5 shadow-xl space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-red-500" />
                <h3 className="text-xs font-mono font-bold tracking-wider text-slate-200 uppercase">
                  Forbidden Retcon Matrix
                </h3>
              </div>
              <span className="text-[10px] font-mono font-bold text-[#FF6B6B] bg-[#2D1418] border border-[#592026] px-2 py-0.5 rounded">
                STRICT ZERO-DRIFT
              </span>
            </div>

            <p className="text-[11px] text-slate-400 font-mono leading-relaxed">
              Injected into generation prompts as hard negative constraints:
            </p>

            {/* Checkbox Constraints List */}
            <div className="space-y-2.5 pt-1">
              {[
                {
                  key: 'noBlueSkies',
                  label: 'Never depict clean blue skies or visible daylight in Neo-Kanto'
                },
                {
                  key: 'noLasersBefore2085',
                  label: 'Laser weaponry strictly non-existent before year 2085'
                },
                {
                  key: 'cyberLimbHeatSinks',
                  label: 'Cybernetic limbs require visible external heat-sinks / braided coils'
                },
                {
                  key: 'renEyeBiological',
                  label: "Ren Kurogane's left eye must remain biological until Act III"
                }
              ].map((item) => {
                const checked = retconLocks[item.key as keyof typeof retconLocks];
                return (
                  <label
                    key={item.key}
                    onClick={() => toggleRetcon(item.key as any)}
                    className="flex items-start gap-2.5 cursor-pointer group select-none"
                  >
                    <div
                      className={`w-4 h-4 mt-0.5 rounded flex items-center justify-center transition-all shrink-0 ${
                        checked
                          ? 'bg-[#1C2333] border border-[#4FACFE] text-[#4FACFE]'
                          : 'bg-[#090A0F] border border-slate-700'
                      }`}
                    >
                      {checked && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span className="text-xs font-mono text-slate-300 group-hover:text-white leading-tight">
                      {item.label}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Card 3: Gemini Continuity Ingestion */}
          <div className="bg-[#11131A] border border-[#1E2230] rounded-2xl p-4 md:p-5 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#4FACFE]" />
                <h3 className="text-xs font-mono font-bold tracking-wider text-slate-200 uppercase">
                  Gemini Continuity Ingestion
                </h3>
              </div>
              <span className="text-[10px] font-mono font-bold text-[#4FACFE] bg-[#10202F] border border-[#1E3A5F] px-2 py-0.5 rounded">
                LIVE PAYLOAD
              </span>
            </div>

            {/* Code Block Container */}
            <div className="relative">
              <button
                onClick={handleCopyPayload}
                className="absolute top-2.5 right-2.5 p-1 rounded-md bg-[#161B26] border border-[#252D3F] text-slate-400 hover:text-white text-[10px] font-mono flex items-center gap-1 transition-all cursor-pointer"
                title="Copy JSON Payload"
              >
                {copiedPayload ? <Check className="w-3 h-3 text-[#38EF7D]" /> : <Copy className="w-3 h-3" />}
              </button>

              <pre className="p-3.5 rounded-xl bg-[#090A0F] border border-[#1E2230] text-[11px] font-mono text-[#38EF7D] overflow-x-auto leading-relaxed max-h-56">
{`{
  "entity_id": "loc_shibuya_helipad_09",
  "canon_lock": true,
  "optical_invariants": {
    "weather": "torrential_acid_rain",
    "fog_density": 0.72,
    "lux_range": [12, 140],
    "chroma_keys": ["#00F2FE", "#4FACFE", "#FFB199"]
  },
  "forbidden_tokens": [
    "clear_sky", "sunlight", "laser_rifle"
  ]
}`}
              </pre>
            </div>

            {/* Footer Hash & Validation Timestamp */}
            <div className="flex items-center justify-between text-[11px] font-mono pt-1 text-slate-400">
              <span>Payload Hash: <strong className="text-slate-300">7f8c92a..3e</strong></span>
              <span className="text-[#38EF7D] font-bold">Validated 24ms ago</span>
            </div>
          </div>

        </div>

      </div>

      {/* ======================================================== */}
      {/* 3. MODAL: ADD LORE ENTITY                                */}
      {/* ======================================================== */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#11131A] border border-[#1E2230] rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-[#1E2230] pb-3">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#D8FF65]" />
                <span>Register Authoritative Lore Entity</span>
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-500 hover:text-white font-mono text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsAddModalOpen(false);
              }}
              className="space-y-3.5 text-xs font-mono"
            >
              <div>
                <label className="block text-slate-400 mb-1">ENTITY CANON NAME *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Neo-Saito Atmospheric Siphon"
                  className="w-full bg-[#090A0F] border border-[#1E2230] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#4FACFE]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">CANON CATEGORY</label>
                  <select className="w-full bg-[#090A0F] border border-[#1E2230] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#4FACFE]">
                    <option>1. Locations & Biomes</option>
                    <option>2. Factions & Alliances</option>
                    <option>3. Metaphysical & Tech Laws</option>
                    <option>4. Slang & Dialect Glossary</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">OPTICAL CLEARANCE</label>
                  <select className="w-full bg-[#090A0F] border border-[#1E2230] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#4FACFE]">
                    <option>Level 0: Absolute Lock</option>
                    <option>Level 1: Restricted Invariant</option>
                    <option>Level 2: Mutable Surface</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">MANDATORY CAMERA / OPTICAL RULE</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Wide shots must show atmospheric haze; never render open horizons."
                  className="w-full bg-[#090A0F] border border-[#1E2230] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#4FACFE]"
                />
              </div>

              <div>
                <label className="block text-[#FF6B6B] mb-1">RETCON FORBIDDEN CONSTRAINTS (NEGATIVE TOKENS)</label>
                <input
                  type="text"
                  placeholder="clear_sky, sunlight, modern_cars, soft_lighting"
                  className="w-full bg-[#090A0F] border border-[#1E2230] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-red-500 font-mono"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#D8FF65] text-[#090A0F] font-bold font-sans cursor-pointer hover:bg-[#cbfa4e]"
                >
                  Append to Immutable Canon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
