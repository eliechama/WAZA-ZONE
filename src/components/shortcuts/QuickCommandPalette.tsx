import React, { useState, useEffect, useRef } from 'react';
import { useShortcuts } from '../../context/ShortcutContext';
import { useProject } from '../../context/ProjectContext';
import { SHORTCUT_DEFINITIONS } from './shortcutDefinitions';
import {
  Search,
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
  Sparkles,
  Command,
  ArrowRight,
  PlusCircle,
  User,
  X
} from 'lucide-react';

interface QuickCommandPaletteProps {
  onOpenNewProjectWizard?: () => void;
  onOpenProfileSettings?: () => void;
}

export const QuickCommandPalette: React.FC<QuickCommandPaletteProps> = ({
  onOpenNewProjectWizard,
  onOpenProfileSettings
}) => {
  const {
    isPaletteOpen,
    setIsPaletteOpen,
    navigateToModule,
    openWizard,
    openProfile
  } = useShortcuts();
  const { activeView } = useProject();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

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
      default: return <Sparkles className="w-4 h-4 text-[#D8FF65]" />;
    }
  };

  // Additional executable quick actions
  const actionItems = [
    {
      id: 'action-new-project',
      name: 'Launch Project Genesis Wizard',
      description: 'Start a new story canon, narrative parameters & layout geometry',
      displayKey: '⌥ N',
      category: 'ACTIONS',
      badge: 'CREATE',
      execute: () => {
        setIsPaletteOpen(false);
        if (onOpenNewProjectWizard) onOpenNewProjectWizard();
        else openWizard();
      },
      icon: <PlusCircle className="w-4 h-4 text-[#D8FF65]" />
    },
    {
      id: 'action-profile-settings',
      name: 'User Profile & Account Settings',
      description: 'Manage creator avatar, pseudonym bio, password and RLS permissions',
      displayKey: '⌥ P',
      category: 'ACTIONS',
      badge: 'ACCOUNT',
      execute: () => {
        setIsPaletteOpen(false);
        if (onOpenProfileSettings) onOpenProfileSettings();
        else openProfile();
      },
      icon: <User className="w-4 h-4 text-[#9D78FF]" />
    }
  ];

  // Module items
  const moduleItems = SHORTCUT_DEFINITIONS.filter(s => s.viewId).map(item => ({
    id: item.id,
    name: item.name,
    description: item.description,
    displayKey: item.displayKey,
    secondaryKey: item.secondaryKey,
    category: item.category,
    badge: item.badge,
    execute: () => {
      setIsPaletteOpen(false);
      navigateToModule(item.viewId!, item.displayKey);
    },
    icon: getIcon(item.iconName),
    isActiveView: activeView === item.viewId
  }));

  const allItems = [...actionItems, ...moduleItems];

  const filteredItems = allItems.filter(item => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      item.name.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.displayKey.toLowerCase().includes(q) ||
      (item.badge && item.badge.toLowerCase().includes(q))
    );
  });

  // Focus input on open
  useEffect(() => {
    if (isPaletteOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isPaletteOpen]);

  // Keyboard navigation inside list
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % filteredItems.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].execute();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsPaletteOpen(false);
    }
  };

  // Scroll active item into view
  useEffect(() => {
    if (listRef.current) {
      const activeElement = listRef.current.children[selectedIndex] as HTMLElement;
      if (activeElement) {
        activeElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  if (!isPaletteOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Omni Command Palette"
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={() => setIsPaletteOpen(false)}
    >
      <div
        className="w-full max-w-2xl bg-[#090A0F] border border-[#2A2E3D] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[75vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#1E2230] bg-[#0E1017]">
          <Search className="w-5 h-5 text-[#D8FF65] mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search modules, commands, or press 1-9 to jump directly..."
            className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none font-sans"
          />
          <div className="flex items-center space-x-2 shrink-0">
            <kbd className="px-1.5 py-0.5 rounded bg-[#161922] border border-[#2A2E3D] text-[10px] font-mono text-slate-400">
              ESC
            </kbd>
            <button
              onClick={() => setIsPaletteOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded hover:bg-[#1E2230]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Results List */}
        <div
          ref={listRef}
          className="overflow-y-auto p-2 space-y-1 flex-1 divide-y divide-slate-800/30"
        >
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center text-slate-500 font-mono text-xs">
              No matching modules or actions found for "{query}".
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => item.execute()}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#181B24] border border-[#D8FF65]/50 shadow-md shadow-[#D8FF65]/5 text-white'
                      : 'text-slate-300 hover:bg-[#11131A] border border-transparent'
                  }`}
                >
                  <div className="flex items-center space-x-3 truncate">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'bg-[#D8FF65]/15 border border-[#D8FF65]/40'
                          : 'bg-[#161922] border border-[#1E2230]'
                      }`}
                    >
                      {item.icon}
                    </div>

                    <div className="truncate text-left">
                      <div className="flex items-center space-x-2">
                        <span className="font-sans font-semibold text-xs tracking-wide">
                          {item.name}
                        </span>
                        {item.badge && (
                          <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-[#1E2230] text-slate-400 border border-slate-700">
                            {item.badge}
                          </span>
                        )}
                        {'isActiveView' in item && item.isActiveView && (
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            CURRENT VIEW
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0 ml-3">
                    {'secondaryKey' in item && item.secondaryKey && (
                      <span className="hidden sm:inline-block text-[10px] font-mono text-slate-500">
                        or {item.secondaryKey}
                      </span>
                    )}
                    <kbd
                      className={`px-2 py-1 rounded-md text-[11px] font-mono font-bold border transition-colors ${
                        isSelected
                          ? 'bg-[#D8FF65] text-[#090A0F] border-[#D8FF65]'
                          : 'bg-[#161922] text-[#D8FF65] border-[#2A2E3D]'
                      }`}
                    >
                      {item.displayKey}
                    </kbd>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Navigation Hints */}
        <div className="p-3 border-t border-[#1E2230] bg-[#0E1017] flex items-center justify-between text-[11px] font-mono text-slate-400">
          <div className="flex items-center space-x-3">
            <span className="flex items-center space-x-1">
              <kbd className="px-1.5 py-0.5 rounded bg-[#161922] border border-[#2A2E3D] text-[10px]">↑</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-[#161922] border border-[#2A2E3D] text-[10px]">↓</kbd>
              <span>Navigate</span>
            </span>
            <span className="flex items-center space-x-1">
              <kbd className="px-1.5 py-0.5 rounded bg-[#161922] border border-[#2A2E3D] text-[10px]">↵</kbd>
              <span>Select</span>
            </span>
          </div>

          <div className="flex items-center space-x-2 text-slate-500">
            <span>ProTip: Press</span>
            <kbd className="px-1.5 py-0.5 rounded bg-[#161922] border border-[#2A2E3D] text-[#D8FF65] text-[10px]">?</kbd>
            <span>for full cheatsheet</span>
          </div>
        </div>
      </div>
    </div>
  );
};
