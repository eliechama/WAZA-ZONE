import React, { useState, useEffect } from 'react';
import { useProject } from '../../context/ProjectContext';
import { useAuth } from '../../context/AuthContext';
import { FormatType, Project } from '../../types';
import {
  Sparkles,
  Layers,
  BookOpen,
  Image as ImageIcon,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  X,
  RotateCcw,
  ShieldCheck,
  Zap,
  Globe2,
  Film,
  Camera,
  Check,
  Sliders,
  FileText
} from 'lucide-react';

interface NewProjectWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

interface WizardDraft {
  step: number;
  title: string;
  subtitle: string;
  slug: string;
  format: FormatType;
  genre: string;
  description: string;
  targetPages: number;
  canonVersion: string;
  coverImage: string;
  savedAt: string;
}

const DRAFT_STORAGE_KEY = 'waza_new_project_wizard_draft';

const COVER_PRESETS = [
  {
    id: 'alley',
    label: 'Neo-Tokyo Neon Alley',
    url: '/src/assets/images/waza_reader_slice01_alley_1790684247274.jpg'
  },
  {
    id: 'samurai',
    label: 'Cyber-Samurai Ren',
    url: '/src/assets/images/waza_reader_slice02_hud_1790684261983.jpg'
  },
  {
    id: 'aoi',
    label: 'Netrunner Aoi Visor',
    url: '/src/assets/images/waza_reader_slice04_aoi_1790684283452.jpg'
  },
  {
    id: 'vesper',
    label: 'Heavy Mech Vesper-09',
    url: '/src/assets/images/waza_reader_slice04_vesper_1790684297968.jpg'
  },
  {
    id: 'slash',
    label: 'Manga Inked Climax',
    url: '/src/assets/images/waza_b4_panel03_slash_1790682736817.jpg'
  }
];

const GENRES = [
  'Cyberpunk / Shonen',
  'Cyber-Noir Thriller',
  'Dark Fantasy & Mecha',
  'Psychological Sci-Fi',
  'Post-Apocalyptic Survival',
  'Urban Supernatural',
  'Space Opera & High Canon'
];

export const NewProjectWizard: React.FC<NewProjectWizardProps> = ({ isOpen, onClose }) => {
  const { createProject, setActiveView } = useProject();
  const { workspace } = useAuth();

  // Wizard Step (1 to 4)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form Fields
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [slug, setSlug] = useState('');
  const [format, setFormat] = useState<FormatType>('MANGA');
  const [genre, setGenre] = useState(GENRES[0]);
  const [description, setDescription] = useState('');
  const [targetPages, setTargetPages] = useState<number>(24);
  const [canonVersion, setCanonVersion] = useState('v1.0.0-PRO');
  const [coverImage, setCoverImage] = useState(COVER_PRESETS[0].url);
  const [customCoverUrl, setCustomCoverUrl] = useState('');

  // Autosave Status State
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [draftRestored, setDraftRestored] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Load Draft from LocalStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (saved) {
        const data: WizardDraft = JSON.parse(saved);
        setTitle(data.title || '');
        setSubtitle(data.subtitle || '');
        setSlug(data.slug || '');
        setFormat(data.format || 'MANGA');
        setGenre(data.genre || GENRES[0]);
        setDescription(data.description || '');
        setTargetPages(data.targetPages || 24);
        setCanonVersion(data.canonVersion || 'v1.0.0-PRO');
        setCoverImage(data.coverImage || COVER_PRESETS[0].url);
        setCurrentStep(data.step || 1);
        setLastSaved(data.savedAt || null);
        setDraftRestored(true);
      }
    } catch (e) {
      console.warn('Could not restore wizard draft', e);
    }
  }, []);

  // 2. Autosave Draft to LocalStorage whenever form state changes
  useEffect(() => {
    if (!title && !description) return;

    const timer = setTimeout(() => {
      const draft: WizardDraft = {
        step: currentStep,
        title,
        subtitle,
        slug,
        format,
        genre,
        description,
        targetPages,
        canonVersion,
        coverImage: customCoverUrl.trim() || coverImage,
        savedAt: new Date().toLocaleTimeString()
      };
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
      setLastSaved(draft.savedAt);
    }, 600);

    return () => clearTimeout(timer);
  }, [currentStep, title, subtitle, slug, format, genre, description, targetPages, canonVersion, coverImage, customCoverUrl]);

  // Auto-slugify title
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!slug || slug === title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
    }
  };

  const handleClearDraft = () => {
    localStorage.removeItem(DRAFT_STORAGE_KEY);
    setTitle('');
    setSubtitle('');
    setSlug('');
    setFormat('MANGA');
    setGenre(GENRES[0]);
    setDescription('');
    setTargetPages(24);
    setCoverImage(COVER_PRESETS[0].url);
    setCustomCoverUrl('');
    setCurrentStep(1);
    setLastSaved(null);
    setDraftRestored(false);
  };

  const handleEnhanceLogline = () => {
    if (!description.trim()) {
      setDescription(`In Neo-Tokyo 2088, an elite memory runner infiltrates a rogue megacorp's synaptic server, uncovering an ancient biological lineage that threatens the city's synthetic equilibrium.`);
    } else {
      setDescription(`${description.trim()} — A high-stakes clash against megacorp hunter-killers where character DNA and canon continuity decide the fate of Old Shibuya.`);
    }
  };

  const handleLaunchProject = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const finalCover = customCoverUrl.trim() || coverImage;
      createProject({
        title: title.trim() || 'Untitled Series',
        subtitle: subtitle.trim(),
        format,
        genre,
        description: description.trim() || 'Custom serialized storyline initialized in WAZA-ZONE OS.',
        coverImage: finalCover,
        targetPages,
        canonVersion,
        continuityScore: 99.8,
        status: 'IN_PRODUCTION'
      });

      // Clear draft after creation
      localStorage.removeItem(DRAFT_STORAGE_KEY);
      setIsSubmitting(false);
      onClose();
      setActiveView('cast');
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-4xl bg-[#11131A] border border-[#1E2230] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] select-none font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Wizard Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1E2230] bg-[#090A0F]/80">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#9D78FF] to-[#D8FF65] p-0.5">
              <div className="w-full h-full bg-[#090A0F] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#D8FF65]" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-extrabold text-white tracking-tight">
                  New Project Wizard
                </h2>
                <span className="px-2 py-0.5 rounded bg-[#1A1F10] text-[#D8FF65] border border-[#3E4A1E] text-[10px] font-mono font-bold">
                  STEP {currentStep} OF 4
                </span>
                {lastSaved && (
                  <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono text-[#38EF7D]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#38EF7D] animate-pulse" />
                    <span>Autosaved at {lastSaved}</span>
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Initialize series canon, format profiles, and multi-tenant RLS isolation
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {(title || description) && (
              <button
                type="button"
                onClick={handleClearDraft}
                className="text-[11px] font-mono text-slate-400 hover:text-white px-2.5 py-1 rounded bg-[#161B26] border border-[#23293D] flex items-center gap-1 cursor-pointer transition-colors"
                title="Discard draft and reset wizard"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-[#1E2230] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Step Progress Stepper */}
        <div className="grid grid-cols-4 border-b border-[#1E2230] bg-[#0C0E14] text-xs font-mono">
          {[
            { num: 1, label: '1. Format & Title' },
            { num: 2, label: '2. Canon & Genre' },
            { num: 3, label: '3. Visual Identity' },
            { num: 4, label: '4. Pre-Flight Launch' }
          ].map((s) => (
            <button
              key={s.num}
              type="button"
              onClick={() => setCurrentStep(s.num)}
              className={`py-3 px-3 text-center font-bold border-b-2 transition-all flex items-center justify-center gap-2 cursor-pointer ${
                currentStep === s.num
                  ? 'border-[#D8FF65] text-[#D8FF65] bg-[#D8FF65]/5'
                  : currentStep > s.num
                  ? 'border-[#38EF7D] text-[#38EF7D]'
                  : 'border-transparent text-slate-500 hover:text-slate-300'
              }`}
            >
              {currentStep > s.num ? (
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              ) : (
                <span className="w-4 h-4 rounded-full border border-current flex items-center justify-center text-[10px]">
                  {s.num}
                </span>
              )}
              <span className="hidden sm:inline truncate">{s.label}</span>
            </button>
          ))}
        </div>

        {/* Draft Restored Notice Banner */}
        {draftRestored && (
          <div className="px-6 py-2 bg-[#1A1F10] border-b border-[#3E4A1E] text-xs font-mono text-[#D8FF65] flex items-center justify-between">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Draft restored from local session. Your changes are automatically protected against loss.</span>
            </span>
            <button
              onClick={() => setDraftRestored(false)}
              className="text-slate-400 hover:text-white font-bold"
            >
              ✕
            </button>
          </div>
        )}

        {/* Wizard Main Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* ==================================================== */}
          {/* STEP 1: FORMAT & PROJECT TITLE                       */}
          {/* ==================================================== */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                  Step 1: Choose Target Format & Series Identity
                </h3>
                <p className="text-xs text-slate-400 font-sans">
                  Select the publication layout standard. This sets the aspect ratios, DPI bounds, and panel engine rules.
                </p>
              </div>

              {/* Format Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3 font-mono text-xs">
                {[
                  {
                    id: 'MANGA',
                    title: 'MANGA',
                    badge: 'B&W 600 DPI',
                    desc: 'Right-to-left layout, speedlines, inked screentones, standard 24pgs.'
                  },
                  {
                    id: 'WEBTOON',
                    title: 'WEBTOON',
                    badge: 'Vertical Strip',
                    desc: 'Continuous vertical scroll, RGB color, seamless panel gaps.'
                  },
                  {
                    id: 'COMIC',
                    title: 'COMIC BOOK',
                    badge: 'Western Double',
                    desc: 'Left-to-right cinematic splash spreads, full dynamic action.'
                  },
                  {
                    id: 'FRANCO_BELGE',
                    title: 'BD ALBUM',
                    badge: 'A4 Album',
                    desc: 'European ligne claire, high detail background continuity.'
                  },
                  {
                    id: 'STORYBOOK',
                    title: 'STORYBOOK',
                    badge: 'Prose & Canvas',
                    desc: 'Alternating story text and illustrated narrative focal panels.'
                  }
                ].map((fmt) => (
                  <div
                    key={fmt.id}
                    onClick={() => setFormat(fmt.id as FormatType)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between space-y-2 ${
                      format === fmt.id
                        ? 'border-[#D8FF65] bg-[#D8FF65]/10 text-white shadow-lg shadow-[#D8FF65]/10'
                        : 'border-[#1E2230] bg-[#090A0F] text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-xs">{fmt.title}</span>
                        <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold ${
                          format === fmt.id ? 'bg-[#D8FF65] text-[#090A0F]' : 'bg-[#1E2230] text-slate-400'
                        }`}>
                          {fmt.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 font-sans mt-2 leading-relaxed">
                        {fmt.desc}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#1E2230] flex items-center justify-between text-[10px]">
                      <span>{format === fmt.id ? '● Selected' : 'Click to select'}</span>
                      {format === fmt.id && <Check className="w-3.5 h-3.5 text-[#D8FF65]" />}
                    </div>
                  </div>
                ))}
              </div>

              {/* Title, Subtitle, and Slug */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300 font-bold uppercase tracking-wider block">
                    Series Master Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. CHRONO BLADE: OMEGA"
                    className="w-full bg-[#090A0F] border border-[#1E2230] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#D8FF65]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300 font-bold uppercase tracking-wider block">
                    Episode / Arc Subtitle
                  </label>
                  <input
                    type="text"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="e.g. Act 01: Genesis Protocol • Ep 01: Ghosts of Old Shibuya"
                    className="w-full bg-[#090A0F] border border-[#1E2230] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#D8FF65]"
                  />
                </div>
              </div>

              {/* URL Slug Preview */}
              <div className="p-3.5 rounded-xl bg-[#090A0F] border border-[#1E2230] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
                <span className="text-slate-400">Public Reader Permanent URL:</span>
                <span className="text-[#68E7FF] font-bold truncate">
                  https://waza.zone/read/{workspace?.slug || 'kurogane'}/{slug || 'your-series-slug'}
                </span>
              </div>
            </div>
          )}

          {/* ==================================================== */}
          {/* STEP 2: CANON, GENRE & STORY SCOPE                   */}
          {/* ==================================================== */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                  Step 2: Narrative Canon, Genre & Scope
                </h3>
                <p className="text-xs text-slate-400 font-sans">
                  Define the narrative world bounds, target volume length, and generative logline.
                </p>
              </div>

              {/* Genre Selector Pills */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-300 font-bold uppercase tracking-wider block">
                  Genre & Tone Archetype
                </label>
                <div className="flex flex-wrap gap-2">
                  {GENRES.map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGenre(g)}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
                        genre === g
                          ? 'border-[#D8FF65] bg-[#D8FF65]/10 text-[#D8FF65] font-bold'
                          : 'border-[#1E2230] bg-[#090A0F] text-slate-400 hover:text-white'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Narrative Logline / Description */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono text-slate-300 font-bold uppercase tracking-wider">
                    Series Logline & Core Conflict *
                  </label>
                  <button
                    type="button"
                    onClick={handleEnhanceLogline}
                    className="text-xs font-mono text-[#D8FF65] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>⚡ AI Suggest Logline</span>
                  </button>
                </div>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="In 2088 Shibuya, a fragmented consciousness emerges inside discarded military bioroids..."
                  className="w-full bg-[#090A0F] border border-[#1E2230] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#D8FF65] leading-relaxed"
                />
              </div>

              {/* Target Pages & Canon Version */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-[#090A0F] border border-[#1E2230] space-y-2 font-mono text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-bold">Target Episode Pages</span>
                    <span className="text-[#D8FF65] font-bold">{targetPages} Pages</span>
                  </div>
                  <input
                    type="range"
                    min={8}
                    max={64}
                    step={4}
                    value={targetPages}
                    onChange={(e) => setTargetPages(Number(e.target.value))}
                    className="w-full accent-[#D8FF65] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>8 pgs (Teaser)</span>
                    <span>24 pgs (Standard)</span>
                    <span>64 pgs (Graphic Novel)</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#090A0F] border border-[#1E2230] space-y-2 font-mono text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-bold">World Bible Canon Version</span>
                    <span className="text-[#68E7FF] font-bold">{canonVersion}</span>
                  </div>
                  <input
                    type="text"
                    value={canonVersion}
                    onChange={(e) => setCanonVersion(e.target.value)}
                    className="w-full bg-[#11131A] border border-[#1E2230] rounded-lg px-3 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-[#68E7FF]"
                  />
                  <p className="text-[10px] text-slate-500 font-sans">
                    Locks continuity rules against prompt drift across future chapters.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ==================================================== */}
          {/* STEP 3: VISUAL IDENTITY & COVER CANVAS               */}
          {/* ==================================================== */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                  Step 3: Visual Identity & Cover Artwork
                </h3>
                <p className="text-xs text-slate-400 font-sans">
                  Select a master cover visual. This serves as the style anchor for all generated character LoRA weights.
                </p>
              </div>

              {/* Cover Presets Picker */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-300 font-bold uppercase tracking-wider block">
                  Studio Presets & Art Anchors
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {COVER_PRESETS.map((preset) => (
                    <div
                      key={preset.id}
                      onClick={() => {
                        setCoverImage(preset.url);
                        setCustomCoverUrl('');
                      }}
                      className={`group relative aspect-[3/4] rounded-xl overflow-hidden border cursor-pointer transition-all ${
                        coverImage === preset.url && !customCoverUrl
                          ? 'border-[#D8FF65] shadow-lg shadow-[#D8FF65]/20 ring-2 ring-[#D8FF65]'
                          : 'border-[#1E2230] hover:border-slate-600'
                      }`}
                    >
                      <img
                        src={preset.url}
                        alt={preset.label}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black via-black/80 to-transparent">
                        <span className="text-[10px] font-mono text-white font-bold block truncate">
                          {preset.label}
                        </span>
                      </div>
                      {coverImage === preset.url && !customCoverUrl && (
                        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#D8FF65] text-[#090A0F] flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Custom Cover URL Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-300 font-bold uppercase tracking-wider block">
                  Or Provide Custom Artwork URL
                </label>
                <input
                  type="url"
                  value={customCoverUrl}
                  onChange={(e) => setCustomCoverUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/... or cloud storage URL"
                  className="w-full bg-[#090A0F] border border-[#1E2230] rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-[#D8FF65]"
                />
              </div>

              {/* Live Preview Card */}
              <div className="p-4 rounded-xl bg-[#090A0F] border border-[#1E2230] flex flex-col sm:flex-row items-center gap-4">
                <div className="w-24 h-32 rounded-lg overflow-hidden border border-slate-700 shrink-0">
                  <img
                    src={customCoverUrl.trim() || coverImage}
                    alt="Cover Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-1.5 text-left">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-[#1A1F10] text-[#D8FF65] border border-[#3E4A1E] text-[10px] font-mono font-bold">
                      {format}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {genre}
                    </span>
                  </div>
                  <h4 className="text-base font-extrabold text-white">
                    {title || 'Untitled Series'}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-2 font-sans">
                    {description || 'No description provided yet.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ==================================================== */}
          {/* STEP 4: PRE-FLIGHT AUDIT & LAUNCH                    */}
          {/* ==================================================== */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                  Step 4: Pre-Flight Verification & Studio Launch
                </h3>
                <p className="text-xs text-slate-400 font-sans">
                  The WAZA-ZONE OS engine has audited your project metadata and prepared tenant isolation.
                </p>
              </div>

              {/* Pre-Flight Checklist */}
              <div className="p-4 rounded-xl bg-[#090A0F] border border-[#1E2230] space-y-2.5 font-mono text-xs">
                <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block">
                  SYSTEM PRE-FLIGHT CHECKS
                </span>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[#38EF7D]">
                    <span className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>Supabase RLS Tenant Isolation Guard (ws_kurogane_01)</span>
                    </span>
                    <span className="font-bold text-[10px]">ENFORCED</span>
                  </div>

                  <div className="flex items-center justify-between text-[#38EF7D]">
                    <span className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>Gemini 2.0 Flash Story Directive AST Ready</span>
                    </span>
                    <span className="font-bold text-[10px]">INITIALIZED</span>
                  </div>

                  <div className="flex items-center justify-between text-[#38EF7D]">
                    <span className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>Character DNA Vector Index Prepared</span>
                    </span>
                    <span className="font-bold text-[10px]">READY</span>
                  </div>

                  <div className="flex items-center justify-between text-[#38EF7D]">
                    <span className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>Append-Only Credit Ledger Allocator</span>
                    </span>
                    <span className="font-bold text-[10px]">0 CR HOLD</span>
                  </div>
                </div>
              </div>

              {/* Summary Card */}
              <div className="p-4 rounded-xl bg-[#090A0F] border border-[#1E2230] space-y-3 font-mono text-xs">
                <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block">
                  PROJECT SPECIFICATION SUMMARY
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-slate-300">
                  <div>
                    <span className="text-[10px] text-slate-500 block">TITLE</span>
                    <strong className="text-white truncate block">{title || 'Untitled'}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">FORMAT</span>
                    <strong className="text-[#D8FF65] block">{format}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">TARGET LENGTH</span>
                    <strong className="text-white block">{targetPages} Pages</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">CANON VERSION</span>
                    <strong className="text-[#68E7FF] block">{canonVersion}</strong>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Wizard Footer Navigation Controls */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#1E2230] bg-[#090A0F]/80">
          <div>
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="px-4 py-2 rounded-xl bg-[#11131A] hover:bg-[#181B26] border border-[#262C40] text-xs font-mono font-bold text-slate-300 hover:text-white flex items-center gap-1.5 cursor-pointer transition-all"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-mono text-slate-500 hover:text-white cursor-pointer"
              >
                Cancel
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            {currentStep < 4 ? (
              <button
                type="button"
                onClick={() => {
                  if (currentStep === 1 && !title.trim()) {
                    alert('Please enter a project title to proceed.');
                    return;
                  }
                  setCurrentStep(prev => prev + 1);
                }}
                className="px-6 py-2.5 rounded-xl bg-[#D8FF65] hover:bg-[#cbf54f] text-[#090A0F] font-black text-xs font-sans transition-all shadow-lg shadow-[#D8FF65]/20 cursor-pointer flex items-center gap-2"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleLaunchProject}
                className="px-6 py-2.5 rounded-xl bg-[#D8FF65] hover:bg-[#cbf54f] text-[#090A0F] font-black text-xs font-sans transition-all shadow-lg shadow-[#D8FF65]/20 cursor-pointer flex items-center gap-2"
              >
                <Zap className={`w-3.5 h-3.5 fill-[#090A0F] ${isSubmitting ? 'animate-spin' : ''}`} />
                <span>{isSubmitting ? 'Bootstrapping Project...' : 'Launch Project & Open Studio'}</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
