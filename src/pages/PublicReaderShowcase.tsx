import React, { useState } from 'react';
import { useProject } from '../context/ProjectContext';
import {
  BookOpen,
  Volume2,
  VolumeX,
  Share2,
  Zap,
  Info,
  ChevronDown,
  Sparkles,
  Heart,
  MessageSquare,
  Check,
  Send,
  Eye,
  Film,
  Compass,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Flame,
  Radio,
  SlidersHorizontal,
  Bookmark
} from 'lucide-react';

export const PublicReaderShowcase: React.FC = () => {
  const { setActiveView } = useProject();

  // Reading Modes
  const [readingMode, setReadingMode] = useState<'SCROLL' | 'SPREAD'>('SCROLL');
  const [isCinemaDim, setIsCinemaDim] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(true);
  const [showIntel, setShowIntel] = useState(true);

  // Patronage tip state
  const [creditsBalance, setCreditsBalance] = useState(4850);
  const [tipSuccessMessage, setTipSuccessMessage] = useState<string | null>(null);

  // Comments state
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'KusanagiFan99',
      verified: true,
      time: '12m ago',
      text: 'The paneling speedlines in that Shibuya rain cut were breathtaking. The lighting continuity between panels 2 and 3 is unreal!'
    },
    {
      id: 2,
      author: 'NeoTokyoArtDirector',
      isPro: true,
      time: '44m ago',
      text: 'Sound effects paired with the sub-bass drone made this feel like an IMAX trailer. Can\'t wait for Vesper-09 battle.'
    }
  ]);
  const [newComment, setNewComment] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  const handleTip = (amount: number) => {
    if (creditsBalance >= amount) {
      setCreditsBalance((prev) => prev - amount);
      setTipSuccessMessage(`Successfully tipped ${amount} CR to Kurogane Creative Lab!`);
      setTimeout(() => setTipSuccessMessage(null), 3500);
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setComments([
      ...comments,
      {
        id: Date.now(),
        author: 'You (Creator)',
        isPro: true,
        time: 'Just now',
        text: newComment.trim()
      }
    ]);
    setNewComment('');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className={`space-y-4 max-w-[1780px] mx-auto pb-20 font-sans select-none transition-colors duration-500 ${isCinemaDim ? 'bg-[#050608]' : ''}`}>
      
      {/* ======================================================== */}
      {/* 1. SUB-HEADER TOOLBAR & READER SETTINGS                  */}
      {/* ======================================================== */}
      <div className="bg-[#11131A] border border-[#1E2230] rounded-2xl p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono shadow-xl sticky top-14 z-30 backdrop-blur-md">
        
        {/* Serial No & Series Title */}
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-[#1A1F10] text-[#D8FF65] border border-[#3E4A1E] text-[10px] font-bold">
              SERIAL NO. 004
            </span>
            <span className="text-[#38EF7D] text-[10px] flex items-center gap-1 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38EF7D] animate-pulse" />
              <span>Simulpub Global Master</span>
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-sm font-extrabold text-white tracking-tight">
              CHRONO BLADE: OMEGA
            </h1>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400 font-sans text-xs">
              Act 01: Genesis Protocol • Ep 01: Ghosts of Old Shibuya
            </span>
          </div>
        </div>

        {/* Reader Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Format pills */}
          <div className="flex items-center bg-[#090A0F] p-1 rounded-xl border border-[#1E2230]">
            <button
              onClick={() => setReadingMode('SCROLL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                readingMode === 'SCROLL'
                  ? 'bg-[#D8FF65] text-[#090A0F] shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Webtoon Scroll</span>
            </button>

            <button
              onClick={() => setReadingMode('SPREAD')}
              className={`px-3 py-1.5 rounded-lg text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                readingMode === 'SPREAD'
                  ? 'bg-[#D8FF65] text-[#090A0F] font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Manga Spread (RTL)</span>
            </button>
          </div>

          {/* Cinema Dim Toggle */}
          <button
            onClick={() => setIsCinemaDim(!isCinemaDim)}
            className={`px-3 py-1.5 rounded-xl border text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
              isCinemaDim
                ? 'bg-[#2D1B4E] border-[#553690] text-[#D8B4FE] font-bold'
                : 'bg-[#090A0F] border-[#1E2230] text-slate-400 hover:text-white'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>Cinema Dim</span>
          </button>

          {/* Episode Select Dropdown */}
          <div className="flex items-center gap-1.5 bg-[#090A0F] px-3 py-1.5 rounded-xl border border-[#1E2230] text-slate-200 cursor-pointer">
            <span className="font-bold">Ep 01: Ghosts of Old Shibuya</span>
            <ChevronDown className="w-3 h-3 text-slate-500" />
          </div>

          <span className="text-slate-500 hidden sm:inline">|</span>
          <span className="text-slate-400 hidden sm:inline">Page 24 / 24</span>

          {/* Audio BGM Stream toggle */}
          <button
            onClick={() => setIsAudioPlaying(!isAudioPlaying)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              isAudioPlaying
                ? 'bg-[#10202F] border-[#1E3A5F] text-[#4FACFE]'
                : 'bg-[#090A0F] border-[#1E2230] text-slate-500'
            }`}
          >
            {isAudioPlaying ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span>SFX 48kHz</span>
          </button>

          {/* Series Intel Drawer Toggle */}
          <button
            onClick={() => setShowIntel(!showIntel)}
            className="px-3 py-1.5 rounded-xl bg-[#2D1B4E] hover:bg-[#3B2466] border border-[#553690] text-xs font-bold text-[#D8B4FE] flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Info className="w-3.5 h-3.5 text-[#9D78FF]" />
            <span>Series Intel</span>
          </button>
        </div>

      </div>

      {/* Tip Toast Notification */}
      {tipSuccessMessage && (
        <div className="p-3 rounded-xl bg-[#0E261B] border border-[#1E5037] text-xs font-mono text-[#38EF7D] flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4 stroke-[3]" />
          <span>{tipSuccessMessage}</span>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. TWO-COLUMN MAIN WORKSPACE: READING STAGE & DOSSIER    */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* ====================================================== */}
        {/* CENTER READING STAGE (8 COLS)                          */}
        {/* ====================================================== */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Ambient BGM Audio Bar */}
          <div className="bg-[#11131A] border border-[#1E2230] rounded-xl px-4 py-2.5 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <span className="w-1 h-3 bg-[#D8FF65] rounded-full animate-pulse" />
                <span className="w-1 h-4 bg-[#68E7FF] rounded-full animate-pulse delay-75" />
                <span className="w-1 h-2 bg-[#9D78FF] rounded-full animate-pulse delay-150" />
              </div>
              <span className="text-slate-400">BGM AMBIENT STREAM:</span>
              <span className="text-[#68E7FF] font-bold">
                Old Shibuya Acid Rainscape [Sub-bass 32Hz Synth]
              </span>
            </div>

            <span className="px-2 py-0.5 rounded bg-[#1A1F10] text-[#D8FF65] border border-[#3E4A1E] text-[10px] font-black">
              STEREO HQ
            </span>
          </div>

          {/* Webtoon Continuous Slices Container */}
          <div className="bg-black border border-[#1E2230] rounded-2xl overflow-hidden shadow-2xl space-y-0 max-w-[860px] mx-auto">
            
            {/* ---------------------------------------------------- */}
            {/* SLICE 01: Upper Meiji Sky-Spire Alleyway             */}
            {/* ---------------------------------------------------- */}
            <div className="relative aspect-[16/9] w-full overflow-hidden group">
              <img
                src="/src/assets/images/waza_reader_slice01_alley_1790684247274.jpg"
                alt="Slice 01 - Neo Tokyo Alley"
                className="w-full h-full object-cover"
              />

              {/* Sector Overlay Badge */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/80 border border-[#1E2230] text-[11px] font-mono font-bold text-white backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#D8FF65]" />
                <span>SECTOR 09 // UPPER MEIJI SKY-SPIRE</span>
              </div>

              {/* SFX Audio Cue Badge */}
              <div className="absolute bottom-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/80 border border-[#1E3A5F] text-[11px] font-mono text-[#68E7FF] font-bold backdrop-blur-md">
                <Volume2 className="w-3.5 h-3.5" />
                <span>SFX: GORO-GORO (THUNDER ROAR)</span>
              </div>
            </div>

            {/* Seamless Seam Connector */}
            <div className="h-6 bg-black flex items-center justify-center relative">
              <div className="w-24 h-[1px] bg-slate-800" />
              <span className="px-2 bg-black text-[9px] font-mono text-slate-600 uppercase tracking-widest">
                ● BEAT 01 - B ●
              </span>
              <div className="w-24 h-[1px] bg-slate-800" />
            </div>

            {/* ---------------------------------------------------- */}
            {/* SLICE 02: Ren Kurogane's Cybernetic Eye with HUD     */}
            {/* ---------------------------------------------------- */}
            <div className="relative aspect-[16/9] w-full overflow-hidden group">
              <img
                src="/src/assets/images/waza_reader_slice02_hud_1790684261983.jpg"
                alt="Slice 02 - Ren Cybernetic Eye HUD"
                className="w-full h-full object-cover"
              />

              {/* Dialogue Balloon Overlay (Top Right) */}
              <div className="absolute top-6 right-6 max-w-xs z-20">
                <div className="bg-[#090A0F]/90 border border-[#D8FF65]/50 rounded-2xl p-3.5 text-xs shadow-2xl backdrop-blur-md space-y-1">
                  <span className="text-[10px] font-mono font-black text-[#D8FF65] uppercase tracking-wider block">
                    REN KUROGANE
                  </span>
                  <p className="text-slate-100 font-sans leading-relaxed">
                    "Bio-signature confirmed. Five drones incoming... and one shadow runner."
                  </p>
                </div>
              </div>
            </div>

            {/* Seamless Seam Connector */}
            <div className="h-6 bg-black flex items-center justify-center relative">
              <div className="w-24 h-[1px] bg-slate-800" />
              <span className="px-2 bg-black text-[9px] font-mono text-slate-600 uppercase tracking-widest">
                ● BEAT 03 - CLIMAX ●
              </span>
              <div className="w-24 h-[1px] bg-slate-800" />
            </div>

            {/* ---------------------------------------------------- */}
            {/* SLICE 03: Black & White Manga Climax Impact Splash   */}
            {/* ---------------------------------------------------- */}
            <div className="relative aspect-[16/10] w-full overflow-hidden group bg-black">
              <img
                src="/src/assets/images/waza_b4_panel03_slash_1790682736817.jpg"
                alt="Slice 03 - Climax Sword Slash"
                className="w-full h-full object-cover grayscale contrast-150"
              />

              {/* Center Giant Katakana Onomatopoeia */}
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
                <span className="text-5xl md:text-6xl font-black text-[#D8FF65] tracking-widest drop-shadow-[0_4px_16px_rgba(0,0,0,1)] rotate-[-6deg] font-serif">
                  ズバッ!
                </span>
                <span className="text-sm font-mono font-black text-[#D8FF65] tracking-widest uppercase px-3 py-1 rounded bg-black/90 border border-[#D8FF65]/50 mt-1">
                  ZUBAT!!
                </span>
              </div>

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-6 left-6 z-20 max-w-sm">
                <div className="bg-black/90 border border-slate-700 rounded-xl p-3 text-xs backdrop-blur-md space-y-0.5">
                  <p className="text-white font-serif font-black text-sm">
                    "Too easy. Where is the commander?"
                  </p>
                  <span className="text-[10px] font-mono text-slate-400 block font-bold">
                    OPTICAL KATANA DISCHARGE: 1.4 GW
                  </span>
                </div>
              </div>
            </div>

            {/* Seamless Seam Connector */}
            <div className="h-6 bg-black flex items-center justify-center relative">
              <div className="w-24 h-[1px] bg-slate-800" />
              <span className="px-2 bg-black text-[9px] font-mono text-slate-600 uppercase tracking-widest">
                ● BEAT 04 - DIALOGUE ●
              </span>
              <div className="w-24 h-[1px] bg-slate-800" />
            </div>

            {/* ---------------------------------------------------- */}
            {/* SLICE 04: Two-Up Dynamic Split (Aoi vs Vesper-09)    */}
            {/* ---------------------------------------------------- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-2 bg-black">
              
              {/* Left: Aoi Vance */}
              <div className="relative aspect-[1/1] rounded-xl overflow-hidden border border-[#1E3A5F]">
                <img
                  src="/src/assets/images/waza_reader_slice04_aoi_1790684283452.jpg"
                  alt="Aoi Vance"
                  className="w-full h-full object-cover"
                />

                <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black via-black/80 to-transparent space-y-1">
                  <span className="text-[10px] font-mono font-black text-[#68E7FF] uppercase tracking-wider block">
                    COMMS LINK // AOI VANCE
                  </span>
                  <p className="text-xs text-white leading-snug">
                    "Ren, check your six! The backup server wasn't decoyed—it's Vesper-09!"
                  </p>
                </div>
              </div>

              {/* Right: Vesper-09 */}
              <div className="relative aspect-[1/1] rounded-xl overflow-hidden border border-red-900/60">
                <img
                  src="/src/assets/images/waza_reader_slice04_vesper_1790684297968.jpg"
                  alt="Vesper-09"
                  className="w-full h-full object-cover"
                />

                <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black via-black/80 to-transparent space-y-1">
                  <span className="text-[10px] font-mono font-black text-[#FFA94D] uppercase tracking-wider block">
                    TARGET DETECTED // VESPER-09
                  </span>
                  <p className="text-xs text-white leading-snug">
                    "Commencing synaptic execution protocol."
                  </p>
                </div>
              </div>

            </div>

            {/* ---------------------------------------------------- */}
            {/* SLICE 05: Cliffhanger Callout Card                   */}
            {/* ---------------------------------------------------- */}
            <div className="p-8 bg-[#090A0F] border-t border-[#1E2230] text-center space-y-4">
              <div className="w-12 h-1 bg-[#D8FF65] mx-auto rounded-full" />
              
              <div className="space-y-1">
                <span className="text-xs font-mono font-black text-[#D8FF65] uppercase tracking-widest block">
                  END OF ACT 01: EPISODE 01
                </span>
                <h3 className="text-2xl font-black text-white tracking-tight">
                  To Be Continued in Episode 02: Neon Synapse Breach
                </h3>
                <p className="text-xs text-slate-400 font-sans max-w-md mx-auto leading-relaxed">
                  Releasing simultaneously in English, Japanese, and Korean via WAZA-ZONE Neural Engine.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => alert('Episode 02 early-access build provisioned in your workspace!')}
                  className="px-5 py-2.5 rounded-xl bg-[#D8FF65] hover:bg-[#cbfa4e] text-[#090A0F] font-black text-xs font-sans flex items-center gap-2 shadow-lg shadow-[#D8FF65]/20 cursor-pointer"
                >
                  <Zap className="w-4 h-4 fill-[#090A0F]" />
                  <span>Next Episode Early Access</span>
                </button>

                <button
                  onClick={handleShare}
                  className="px-4 py-2.5 rounded-xl bg-[#11131A] hover:bg-[#181B26] border border-[#262C40] text-xs font-mono text-slate-200 flex items-center gap-2 cursor-pointer transition-all"
                >
                  <Share2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>{copiedLink ? 'Link Copied!' : 'Share Chapter'}</span>
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* ====================================================== */}
        {/* RIGHT SIDEBAR: SERIES DOSSIER & REAL-TIME CHAT (4 COLS)*/}
        {/* ====================================================== */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Section: Series Dossier */}
          <div className="bg-[#11131A] border border-[#1E2230] rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#D8FF65]" />
                <h3 className="text-xs font-mono font-bold tracking-wider text-white uppercase">
                  Series Dossier
                </h3>
              </div>
              <span className="text-[10px] font-mono text-slate-400 bg-[#090A0F] border border-[#1E2230] px-2 py-0.5 rounded font-bold">
                CANON V4.1
              </span>
            </div>

            {/* Series Cover & Bio Card */}
            <div className="p-3.5 rounded-xl bg-[#090A0F] border border-[#1E2230] flex gap-3.5">
              <div className="w-16 h-20 rounded-lg overflow-hidden bg-black shrink-0 border border-[#232A44]">
                <img
                  src="/src/assets/images/waza_chrono_blade_beat04_1790681240146.jpg"
                  alt="Series Cover"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-1">
                <h4 className="font-extrabold text-white text-xs leading-snug">
                  CHRONO BLADE: OMEGA
                </h4>
                <p className="text-[10px] font-mono text-slate-400">
                  Author: Kurogane Creative Lab
                </p>
                <div className="flex items-center gap-1.5 pt-0.5">
                  <span className="px-1.5 py-0.2 rounded bg-[#1A1F10] text-[#D8FF65] border border-[#3E4A1E] text-[9px] font-black">
                    CYBER-NOIR
                  </span>
                  <span className="px-1.5 py-0.2 rounded bg-[#2D1B4E] text-[#D8B4FE] border border-[#553690] text-[9px] font-black">
                    WEEKLY
                  </span>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              In 2088 Shibuya, a fragmented consciousness emerges inside discarded military bioroids. A disgraced memory runner must reclaim his stolen lineage before the megacorp wipe-cycle executes.
            </p>

            {/* Cast & Character DNA */}
            <div className="space-y-2 pt-2 border-t border-[#1E2230]">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                  CAST & CHARACTER DNA
                </span>
                <span className="text-[10px] font-mono text-[#D8FF65]">
                  3 Active
                </span>
              </div>

              <div className="space-y-2">
                {/* Character 1: Ren */}
                <div className="p-2.5 rounded-xl bg-[#090A0F] border border-[#1E2230] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-black border border-slate-700">
                      <img
                        src="/src/assets/images/waza_reader_slice02_hud_1790684261983.jpg"
                        alt="Ren"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h5 className="font-bold text-white text-xs">Ren Kurogane</h5>
                      <p className="text-[10px] text-slate-400 font-mono">Omega Blade Conduit • Ex-SpecOps</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-[#14231E] text-[#38EF7D] border border-[#1E5037] text-[9px] font-bold">
                    Protagonist
                  </span>
                </div>

                {/* Character 2: Aoi */}
                <div className="p-2.5 rounded-xl bg-[#090A0F] border border-[#1E2230] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-black border border-slate-700">
                      <img
                        src="/src/assets/images/waza_reader_slice04_aoi_1790684283452.jpg"
                        alt="Aoi"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h5 className="font-bold text-white text-xs">Aoi Vance</h5>
                      <p className="text-[10px] text-slate-400 font-mono">Black-Hat Synthesizer • Shibuya Underground</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-[#10202F] text-[#4FACFE] border border-[#1E3A5F] text-[9px] font-bold">
                    Netrunner
                  </span>
                </div>

                {/* Character 3: Vesper-09 */}
                <div className="p-2.5 rounded-xl bg-[#090A0F] border border-[#1E2230] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-black border border-slate-700">
                      <img
                        src="/src/assets/images/waza_reader_slice04_vesper_1790684297968.jpg"
                        alt="Vesper"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h5 className="font-bold text-white text-xs">Vesper-09</h5>
                      <p className="text-[10px] text-slate-400 font-mono">Megacorp Hunter-Killer Model VII</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-[#2D1616] text-[#FF6B6B] border border-[#592626] text-[9px] font-bold">
                    Antagonist
                  </span>
                </div>
              </div>
            </div>

            {/* Support Creator Lab */}
            <div className="p-4 rounded-xl bg-[#090A0F] border border-[#1E2230] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-[#38EF7D] fill-[#38EF7D]" />
                  <span>Support Creator Lab</span>
                </span>
                <span className="text-[11px] font-mono text-[#D8FF65] font-bold">
                  Balance: {creditsBalance.toLocaleString()} cr
                </span>
              </div>

              <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                Send a fast micro-patronage tip directly to Kurogane Studios to speed up next week's chapter release.
              </p>

              {/* 3 Tip Buttons */}
              <div className="grid grid-cols-3 gap-2 font-mono text-xs">
                <button
                  onClick={() => handleTip(50)}
                  className="py-2 rounded-xl bg-[#141724] hover:bg-[#1E2438] border border-[#23293D] text-slate-200 font-bold transition-all cursor-pointer"
                >
                  50 cr
                </button>

                <button
                  onClick={() => handleTip(150)}
                  className="py-2 rounded-xl bg-[#141724] hover:bg-[#1E2438] border border-[#23293D] text-slate-200 font-bold transition-all cursor-pointer"
                >
                  150 cr
                </button>

                <button
                  onClick={() => handleTip(500)}
                  className="py-2 rounded-xl bg-[#D8FF65] hover:bg-[#cbfa4e] text-[#090A0F] font-black transition-all cursor-pointer flex items-center justify-center gap-1 shadow-md shadow-[#D8FF65]/15"
                >
                  <span>500 cr</span>
                  <span>🔥</span>
                </button>
              </div>
            </div>

            {/* Reader Comments (128) */}
            <div className="space-y-3 pt-2 border-t border-[#1E2230]">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-300 font-bold">
                  READER COMMENTS (128)
                </span>
                <span className="text-[#38EF7D] font-bold">
                  Real-time
                </span>
              </div>

              {/* Comments Feed */}
              <div className="space-y-2.5">
                {comments.map((c) => (
                  <div key={c.id} className="p-3 rounded-xl bg-[#090A0F] border border-[#1E2230] space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 font-bold text-white">
                        <span>{c.author}</span>
                        {c.verified && <Check className="w-3 h-3 text-[#38EF7D]" />}
                        {c.isPro && <Zap className="w-3 h-3 text-[#D8FF65]" />}
                      </div>
                      <span className="text-[10px] font-mono text-slate-500">{c.time}</span>
                    </div>
                    <p className="text-slate-300 text-[11px] leading-relaxed font-sans">
                      {c.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* Add Comment Input */}
              <form onSubmit={handleAddComment} className="flex items-center gap-2 pt-1">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add reaction or feedback..."
                  className="flex-1 bg-[#090A0F] border border-[#1E2230] rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#9D78FF]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#9D78FF] hover:bg-[#8B62FF] text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  Post
                </button>
              </form>
            </div>

            {/* Neural Consistency Guarantee Footer */}
            <div className="p-2.5 rounded-xl bg-[#090A0F] border border-[#1E2230] flex items-center justify-between text-[11px] font-mono">
              <span className="text-slate-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#38EF7D]" />
                <span>Neural Generation Consistency:</span>
              </span>
              <span className="text-[#38EF7D] font-bold">99.8% Match</span>
            </div>

          </div>

        </div>

      </div>

      {/* ======================================================== */}
      {/* 3. BOTTOM STICKY BAR: BRAND PROMISE & READ NAVIGATION    */}
      {/* ======================================================== */}
      <div className="bg-[#090A0F] border border-[#1E2230] rounded-2xl px-5 py-3 flex flex-wrap items-center justify-between gap-4 text-xs font-mono shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#9D78FF] to-[#D8FF65] p-0.5 shrink-0">
            <div className="w-full h-full bg-[#090A0F] rounded-[6px] flex items-center justify-center font-black text-white text-xs">
              W
            </div>
          </div>
          <div>
            <h4 className="font-bold text-white text-xs font-sans">
              Created on WAZA-ZONE OS — AI Visual Storytelling System
            </h4>
            <p className="text-[10px] text-slate-400">
              Guaranteed 100% Character & World Bible continuity across all chapters and localized editions.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setActiveView('export')}
            className="px-4 py-2 rounded-xl bg-[#11131A] hover:bg-[#181B26] border border-[#262C40] text-xs font-mono text-slate-200 cursor-pointer transition-all"
          >
            Read Previous Ep
          </button>

          <button
            onClick={() => setActiveView('world')}
            className="px-4 py-2 rounded-xl bg-[#D8FF65] hover:bg-[#cbfa4e] text-[#090A0F] font-black text-xs font-sans transition-all shadow-lg shadow-[#D8FF65]/20 cursor-pointer"
          >
            Explore World Bible
          </button>
        </div>
      </div>

    </div>
  );
};
