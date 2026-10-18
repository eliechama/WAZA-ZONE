import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useProject } from '../../context/ProjectContext';
import { useShortcuts } from '../../context/ShortcutContext';
import { Zap, Bell, Shield, Sparkles, BookOpen, Layers, User, Search, Keyboard, Command } from 'lucide-react';
import { UserProfileSettingsModal } from '../profile/UserProfileSettingsModal';

export const Navbar: React.FC<{ onNavigateToLanding?: () => void }> = ({ onNavigateToLanding }) => {
  const { user, workspace } = useAuth();
  const { activeProject, setActiveView } = useProject();
  const {
    setIsPaletteOpen,
    setIsCheatSheetOpen,
    isProfileOpen,
    openProfile,
    closeProfile
  } = useShortcuts();

  return (
    <header className="h-14 bg-[#090A0F]/90 backdrop-blur-md border-b border-[#1E2230] px-4 flex items-center justify-between sticky top-0 z-40 text-xs font-mono">
      {/* Left section: Logo & Project Breadcrumb */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onNavigateToLanding}
          className="flex items-center space-x-2 text-left group cursor-pointer"
        >
          <div className="w-7 h-7 rounded bg-gradient-to-br from-[#9D78FF] via-[#68E7FF] to-[#D8FF65] p-[1px] flex items-center justify-center">
            <div className="w-full h-full bg-[#090A0F] rounded flex items-center justify-center">
              <span className="font-extrabold text-white text-sm tracking-tighter">W</span>
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold text-white tracking-wider text-sm font-sans">WAZA-ZONE</span>
              <span className="bg-[#D8FF65]/10 text-[#D8FF65] px-1.5 py-0.2 rounded text-[10px] border border-[#D8FF65]/30">
                OS v2.4
              </span>
            </div>
          </div>
        </button>

        <span className="text-[#2A2E3D]">/</span>

        {/* Workspace & Project Selector */}
        <div className="flex items-center space-x-2 text-slate-300">
          <span className="text-slate-400 font-sans hidden sm:inline">Story:</span>
          <span className="text-slate-100 font-semibold font-sans">
            {activeProject ? activeProject.title : 'Kurogane Studios / Neo-Tokyo 2088'}
          </span>
          <span className="bg-[#9D78FF]/20 text-[#9D78FF] px-1.5 py-0.5 rounded text-[10px] font-bold border border-[#9D78FF]/40 uppercase">
            {workspace?.planTier || 'PRO'}
          </span>
        </div>
      </div>

      {/* Middle section: Quick Action Pills & Shortcuts Command */}
      <div className="hidden lg:flex items-center space-x-3">
        <button
          onClick={() => setIsPaletteOpen(true)}
          className="flex items-center space-x-2 text-slate-300 hover:text-white px-2.5 py-1 rounded bg-[#11131A] border border-[#1E2230] hover:border-[#D8FF65]/50 transition-all cursor-pointer group"
          title="Open Command Palette (⌘K)"
        >
          <Search className="w-3.5 h-3.5 text-[#D8FF65]" />
          <span className="text-slate-300">Navigator</span>
          <kbd className="px-1.5 py-0.2 rounded bg-[#161922] border border-[#2A2E3D] text-[10px] text-slate-400 font-mono group-hover:text-[#D8FF65]">
            ⌘K
          </kbd>
        </button>

        <button
          onClick={() => setActiveView('reader')}
          className="flex items-center space-x-1.5 text-slate-300 hover:text-white px-2.5 py-1 rounded bg-[#11131A] border border-[#1E2230] hover:border-[#9D78FF]/50 transition-all cursor-pointer"
        >
          <BookOpen className="w-3.5 h-3.5 text-[#68E7FF]" />
          <span>Reader Mode</span>
        </button>

        <button
          onClick={() => setActiveView('billing')}
          className="flex items-center space-x-1.5 text-slate-300 hover:text-white px-2.5 py-1 rounded bg-[#11131A] border border-[#1E2230] hover:border-[#D8FF65]/50 transition-all cursor-pointer"
        >
          <Zap className="w-3.5 h-3.5 text-[#D8FF65]" />
          <span>Billing</span>
        </button>
      </div>

      {/* Right section: Model Readiness, Ledger Balance & User Menu */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* Model Status */}
        <div className="hidden md:flex items-center space-x-1.5 bg-[#11131A] border border-[#1E2230] px-2.5 py-1 rounded">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-slate-300">Gemini 2.0 / 3.1 Ready</span>
        </div>

        {/* Cheatsheet Button */}
        <button
          onClick={() => setIsCheatSheetOpen(true)}
          className="p-1.5 rounded bg-[#11131A] border border-[#1E2230] text-slate-400 hover:text-white hover:border-[#D8FF65]/40 transition-colors cursor-pointer group"
          title="Keyboard Shortcuts Cheatsheet (?)"
        >
          <Keyboard className="w-4 h-4 group-hover:text-[#D8FF65]" />
        </button>

        {/* Credit Balance Badge */}
        <button
          onClick={() => setActiveView('billing')}
          className="flex items-center space-x-1.5 bg-[#D8FF65]/10 border border-[#D8FF65]/40 text-[#D8FF65] px-2.5 py-1 rounded font-bold cursor-pointer hover:bg-[#D8FF65]/20 transition-all"
        >
          <Zap className="w-3.5 h-3.5 fill-[#D8FF65]" />
          <span>{workspace ? workspace.creditBalance.toLocaleString() : '4,850'}</span>
          <span className="text-[10px] opacity-70">/ 5,000 CR</span>
        </button>

        {/* Notifications */}
        <button className="p-1.5 rounded bg-[#11131A] border border-[#1E2230] text-slate-400 hover:text-white cursor-pointer relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#68E7FF] rounded-full"></span>
        </button>

        {/* User Profile */}
        <button
          onClick={openProfile}
          className="flex items-center space-x-2 pl-2 border-l border-[#1E2230] hover:opacity-85 transition-opacity cursor-pointer group"
          title="Open User Profile & Account Settings (⌥P)"
        >
          <img
            src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'}
            alt="User"
            className="w-7 h-7 rounded-full border border-[#9D78FF]/50 object-cover group-hover:border-[#D8FF65] transition-colors"
          />
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-[11px] font-sans font-bold text-white leading-tight truncate max-w-[100px]">
              {user?.fullName || 'Kai Vance'}
            </span>
            <span className="text-[9px] font-mono text-slate-400">
              {user?.role || 'OWNER'}
            </span>
          </div>
          <span className="sm:hidden bg-[#1E2230] text-slate-300 px-1.5 py-0.5 rounded text-[10px] font-bold tracking-wider">
            {user?.role || 'OWNER'}
          </span>
        </button>
      </div>

      {/* User Profile & Account Settings Modal */}
      <UserProfileSettingsModal
        isOpen={isProfileOpen}
        onClose={closeProfile}
      />
    </header>
  );
};
