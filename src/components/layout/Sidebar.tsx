import React from 'react';
import { useProject } from '../../context/ProjectContext';
import { useShortcuts } from '../../context/ShortcutContext';
import {
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
  Activity,
  Settings,
  ShieldCheck,
  Cpu,
  Keyboard,
  Command
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { activeView } = useProject();
  const { showKeyHints, navigateToModule, setIsCheatSheetOpen, setIsPaletteOpen } = useShortcuts();

  const flowNavItems = [
    { id: 'projects', label: '1. Projects & Cockpit', icon: FolderKanban, keyHint: '1' },
    { id: 'cast', label: '2. Cast & Character DNA', icon: Users, keyHint: '2' },
    { id: 'world', label: '3. World Bible & Canon', icon: Globe2, keyHint: '3' },
    { id: 'story', label: '4. Story Architect', icon: FileText, keyHint: '4' },
    { id: 'storyboard', label: '5. Storyboard & Camera', icon: Camera, keyHint: '5' },
    { id: 'panel', label: '6. Panel Engine & Layout', icon: LayoutGrid, keyHint: '6' },
    { id: 'localization', label: '7. Localization', icon: Languages, keyHint: '7' },
    { id: 'export', label: '8. Export & Publications', icon: Download, keyHint: '8' },
    { id: 'reader', label: '9. Public Reader & Showcase', icon: BookOpen, keyHint: '9' },
  ];

  const infraNavItems = [
    { id: 'billing', label: 'Billing & Credits Ledger', icon: CreditCard, badge: '4,850', keyHint: '⌥B' },
    { id: 'admin', label: 'Admin & Platform SRE Console', icon: ShieldCheck, keyHint: '⌥A' },
    { id: 'telemetry', label: 'Telemetry & Logs', icon: Activity, live: true, keyHint: '⌥T' },
    { id: 'settings', label: 'Settings & AI Gateway', icon: Settings, keyHint: '⌥S' },
  ];

  return (
    <aside className="w-64 bg-[#090A0F] border-r border-[#1E2230] flex flex-col justify-between h-[calc(100vh-3.5rem)] sticky top-14 select-none shrink-0 text-xs">
      <div className="p-3 space-y-6 overflow-y-auto">
        {/* Creative Engine Flow */}
        <div>
          <div className="flex items-center justify-between px-2 mb-2">
            <span className="text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase">
              Creative Engine Flow
            </span>
            <span className="w-2 h-2 rounded-full bg-[#D8FF65]"></span>
          </div>

          <nav className="space-y-1">
            {flowNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              const isReaderActive = isActive && item.id === 'reader';
              return (
                <button
                  key={item.id}
                  onClick={() => navigateToModule(item.id, item.keyHint)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-md font-sans text-[13px] font-medium transition-all text-left cursor-pointer group ${
                    isReaderActive
                      ? 'bg-[#9D78FF] text-white font-bold rounded-lg shadow-lg shadow-[#9D78FF]/30'
                      : isActive
                      ? 'bg-[#11131A] text-[#D8FF65] border-l-2 border-[#D8FF65] shadow-lg shadow-[#D8FF65]/5 font-semibold'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-[#11131A]/60'
                  }`}
                >
                  <div className="flex items-center space-x-3 truncate">
                    <Icon className={`w-4 h-4 shrink-0 ${isReaderActive ? 'text-white' : isActive ? 'text-[#D8FF65]' : 'text-slate-500'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>

                  {showKeyHints && (
                    <kbd
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded border shrink-0 transition-opacity ${
                        isReaderActive
                          ? 'bg-white/20 text-white border-white/30'
                          : isActive
                          ? 'bg-[#D8FF65]/15 text-[#D8FF65] border-[#D8FF65]/30'
                          : 'bg-[#14161F] text-slate-500 border-[#222634] group-hover:text-slate-300'
                      }`}
                    >
                      {item.keyHint}
                    </kbd>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Studio Infrastructure */}
        <div>
          <div className="flex items-center justify-between px-2 mb-2">
            <span className="text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase">
              Studio Infrastructure
            </span>
            <Cpu className="w-3 h-3 text-slate-600" />
          </div>

          <nav className="space-y-1">
            {infraNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => navigateToModule(item.id, item.keyHint)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-md font-sans text-[12px] font-medium transition-all text-left cursor-pointer group ${
                    isActive
                      ? 'bg-[#11131A] text-[#68E7FF] border-l-2 border-[#68E7FF]'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-[#11131A]/60'
                  }`}
                >
                  <div className="flex items-center space-x-3 truncate">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#68E7FF]' : 'text-slate-500'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>

                  <div className="flex items-center space-x-1.5 shrink-0">
                    {item.badge && (
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                          item.badge === '4,850'
                            ? 'text-[#F59E0B] font-bold'
                            : 'bg-[#1E2230] text-slate-300'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}

                    {item.live && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>}

                    {showKeyHints && (
                      <kbd
                        className={`text-[10px] font-mono px-1.5 py-0.5 rounded border transition-opacity ${
                          isActive
                            ? 'bg-[#68E7FF]/15 text-[#68E7FF] border-[#68E7FF]/30'
                            : 'bg-[#14161F] text-slate-500 border-[#222634] group-hover:text-slate-300'
                        }`}
                      >
                        {item.keyHint}
                      </kbd>
                    )}
                  </div>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Footer System Status & Shortcuts helper */}
      <div className="p-3 border-t border-[#1E2230] bg-[#090A0F] font-mono text-[10px] text-slate-500 space-y-2">
        <div className="flex items-center justify-between text-slate-400">
          <span className="flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>ENGINE CORE</span>
          </span>
          <span className="text-[#D8FF65]">ONLINE</span>
        </div>

        {/* Global Shortcut Quick Triggers */}
        <div className="pt-2 border-t border-[#161822] flex items-center justify-between text-slate-400">
          <button
            onClick={() => setIsPaletteOpen(true)}
            className="flex items-center space-x-1 hover:text-[#D8FF65] transition-colors cursor-pointer"
            title="Open Command Palette (⌘K)"
          >
            <Command className="w-3 h-3" />
            <span>Search</span>
            <kbd className="px-1 py-0.2 rounded bg-[#161922] border border-[#2A2E3D] text-[9px] text-slate-400">⌘K</kbd>
          </button>

          <button
            onClick={() => setIsCheatSheetOpen(true)}
            className="flex items-center space-x-1 hover:text-[#D8FF65] transition-colors cursor-pointer"
            title="Keyboard Shortcuts Cheatsheet (?)"
          >
            <Keyboard className="w-3 h-3" />
            <span>Keys</span>
            <kbd className="px-1 py-0.2 rounded bg-[#161922] border border-[#2A2E3D] text-[9px] text-[#D8FF65]">?</kbd>
          </button>
        </div>

        <div className="text-slate-600 text-[9px]">Docker: waza-core:v1.2.0 • RLS: 22/22</div>
      </div>
    </aside>
  );
};
