import React, { useState } from 'react';
import { useShortcuts } from '../../context/ShortcutContext';
import { SHORTCUT_DEFINITIONS } from './shortcutDefinitions';
import { ShortcutCategory } from './types';
import {
  Keyboard,
  X,
  Search,
  Sparkles,
  Zap,
  FolderKanban,
  Users,
  Globe2,
  FileText,
  Camera,
  LayoutGrid,
  Languages,
  Download,
  BookOpen,
  CreditCard,
  ShieldCheck,
  Activity,
  Settings,
  Eye,
  EyeOff
} from 'lucide-react';

export const KeyboardShortcutsModal: React.FC<{
  onOpenNewProjectWizard?: () => void;
  onOpenProfileSettings?: () => void;
}> = ({ onOpenNewProjectWizard, onOpenProfileSettings }) => {
  const {
    isCheatSheetOpen,
    setIsCheatSheetOpen,
    navigateToModule,
    showKeyHints,
    toggleKeyHints
  } = useShortcuts();

  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'ALL' | ShortcutCategory>('ALL');

  if (!isCheatSheetOpen) return null;

  // Icon mapping
  const getIcon = (name?: string) => {
    switch (name) {
      case 'FolderKanban': return <FolderKanban className="w-4 h-4 text-[#D8FF65]" />;
      case 'Users': return <Users className="w-4 h-4 text-[#68E7FF]" />;
      case 'Globe2': return <Globe2 className="w-4 h-4 text-[#9D78FF]" />;
      case 'FileText': return <FileText className="w-4 h-4 text-[#F59E0B]" />;
      case 'Camera': return <Camera className="w-4 h-4 text-[#EC4899]" />;
      case 'LayoutGrid': return <LayoutGrid className="w-4 h-4 text-[#10B981]" />;
      case 'Languages': return <Languages className="w-4 h-4 text-[#06B6D4]" />;
      case 'Download': return <Download className="w-4 h-4 text-[#3B82F6]" />;
      case 'BookOpen': return <BookOpen className="w-4 h-4 text-[#A855F7]" />;
      case 'CreditCard': return <CreditCard className="w-4 h-4 text-[#F59E0B]" />;
      case 'ShieldCheck': return <ShieldCheck className="w-4 h-4 text-[#EF4444]" />;
      case 'Activity': return <Activity className="w-4 h-4 text-[#10B981]" />;
      case 'Settings': return <Settings className="w-4 h-4 text-[#64748B]" />;
      default: return <Keyboard className="w-4 h-4 text-[#D8FF65]" />;
    }
  };

  const categories = [
    { id: 'ALL', label: 'All Shortcuts' },
    { id: 'CREATIVE_FLOW', label: 'Creative Flow (1-9)' },
    { id: 'INFRASTRUCTURE', label: 'Studio Infrastructure (⌥)' },
    { id: 'ACTIONS', label: 'Quick Actions' },
    { id: 'NAVIGATION', label: 'Navigation' }
  ];

  const filteredShortcuts = SHORTCUT_DEFINITIONS.filter(s => {
    const matchesCategory = activeTab === 'ALL' || s.category === activeTab;
    const matchesSearch =
      !search ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase()) ||
      s.displayKey.toLowerCase().includes(search.toLowerCase()) ||
      (s.secondaryKey && s.secondaryKey.toLowerCase().includes(search.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleShortcutClick = (shortcut: typeof SHORTCUT_DEFINITIONS[0]) => {
    if (shortcut.viewId) {
      setIsCheatSheetOpen(false);
      navigateToModule(shortcut.viewId, shortcut.displayKey);
    } else if (shortcut.id === 'nav-command-palette') {
      setIsCheatSheetOpen(false);
      // Trigger via hotkey or state
    } else if (shortcut.id === 'nav-toggle-hints') {
      toggleKeyHints();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Keyboard Shortcuts HUD Cheatsheet"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150"
      onClick={() => setIsCheatSheetOpen(false)}
    >
      <div
        className="w-full max-w-4xl bg-[#090A0F] border border-[#2A2E3D] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[88vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#1E2230] bg-[#0E1017] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-[#D8FF65]/10 border border-[#D8FF65]/30 flex items-center justify-center text-[#D8FF65]">
              <Keyboard className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base font-bold text-white font-sans">
                  WAZA-ZONE Global Keyboard Shortcuts
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#D8FF65]/10 text-[#D8FF65] border border-[#D8FF65]/30 font-bold">
                  CREATOR SPEEDRUN
                </span>
              </div>
              <p className="text-xs text-slate-400 font-sans mt-0.5">
                Fly across creative flow pipelines and infrastructure modules with zero mouse latency
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Toggle visual hints */}
            <button
              onClick={toggleKeyHints}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition-colors cursor-pointer ${
                showKeyHints
                  ? 'bg-[#181B24] border-[#D8FF65]/50 text-[#D8FF65]'
                  : 'bg-[#11131A] border-[#2A2E3D] text-slate-400 hover:text-white'
              }`}
              title="Toggle shortcut badges in navigation"
            >
              {showKeyHints ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              <span>{showKeyHints ? 'Key Badges ON' : 'Key Badges OFF'}</span>
            </button>

            <button
              onClick={() => setIsCheatSheetOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#1E2230] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search & Tabs */}
        <div className="p-4 border-b border-[#1E2230] bg-[#0B0C12] space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Filter shortcuts by key, name, or module (e.g. 1, cast, alt+b, layout)..."
              className="w-full pl-9 pr-4 py-2 bg-[#14161F] border border-[#222634] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D8FF65]"
            />
          </div>

          <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs font-mono">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id as any)}
                className={`px-3 py-1.5 rounded-lg border whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === cat.id
                    ? 'bg-[#D8FF65]/15 border-[#D8FF65] text-[#D8FF65] font-bold shadow-sm'
                    : 'bg-[#11131A] border-[#1E2230] text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Shortcuts Grid */}
        <div className="p-5 overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-2 gap-3 bg-[#090A0F]">
          {filteredShortcuts.length === 0 ? (
            <div className="col-span-2 py-12 text-center text-slate-500 font-mono text-xs">
              No shortcuts found matching your criteria.
            </div>
          ) : (
            filteredShortcuts.map(s => {
              const isNavigable = !!s.viewId;
              return (
                <div
                  key={s.id}
                  onClick={() => handleShortcutClick(s)}
                  className={`p-3.5 rounded-xl border border-[#1E2230] bg-[#0E1017] hover:border-[#D8FF65]/50 transition-all flex items-center justify-between group ${
                    isNavigable ? 'cursor-pointer hover:bg-[#14161F]' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3 truncate">
                    <div className="w-8 h-8 rounded-lg bg-[#161922] border border-[#2A2E3D] flex items-center justify-center shrink-0 group-hover:border-[#D8FF65]/30">
                      {getIcon(s.iconName)}
                    </div>
                    <div className="truncate text-left">
                      <div className="flex items-center space-x-2">
                        <span className="font-sans font-bold text-xs text-white group-hover:text-[#D8FF65] transition-colors truncate">
                          {s.name}
                        </span>
                        {s.badge && (
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#1E2230] text-slate-400 border border-slate-700">
                            {s.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">
                        {s.description}
                      </p>
                    </div>
                  </div>

                  {/* Keycaps */}
                  <div className="flex items-center space-x-1.5 shrink-0 ml-3">
                    {s.secondaryKey && (
                      <kbd className="hidden sm:inline-block px-2 py-1 rounded bg-[#14161F] border border-[#222634] text-[10px] font-mono text-slate-400">
                        {s.secondaryKey}
                      </kbd>
                    )}
                    <kbd className="px-2.5 py-1 rounded-md bg-[#181B24] border border-[#2A2E3D] text-[#D8FF65] font-mono text-xs font-bold shadow-inner group-hover:border-[#D8FF65] group-hover:bg-[#D8FF65]/10 transition-all">
                      {s.displayKey}
                    </kbd>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#1E2230] bg-[#0E1017] flex items-center justify-between text-xs font-mono text-slate-400">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Global Hotkeys Active</span>
            </span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className="text-slate-400 hidden sm:inline">
              Form inputs ignore single-key hotkeys to prevent typing collisions
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <span>Press</span>
            <kbd className="px-1.5 py-0.5 rounded bg-[#161922] border border-[#2A2E3D] text-[#D8FF65] text-[10px]">
              ESC
            </kbd>
            <span>to close</span>
          </div>
        </div>
      </div>
    </div>
  );
};
