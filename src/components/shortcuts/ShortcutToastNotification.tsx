import React from 'react';
import { useShortcuts } from '../../context/ShortcutContext';
import { Zap, Command, Layers } from 'lucide-react';

export const ShortcutToastNotification: React.FC = () => {
  const { lastFeedback } = useShortcuts();

  if (!lastFeedback) return null;

  return (
    <aside
      aria-label="Keyboard shortcut feedback"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 pointer-events-none animate-in fade-in slide-in-from-bottom-3 duration-200"
    >
      <div className="bg-[#090A0F]/95 border border-[#D8FF65]/60 shadow-[0_0_25px_rgba(216,255,101,0.25)] rounded-xl px-4 py-3 flex items-center space-x-3 backdrop-blur-md">
        <div className="w-8 h-8 rounded-lg bg-[#D8FF65]/15 border border-[#D8FF65]/40 flex items-center justify-center text-[#D8FF65]">
          <Zap className="w-4 h-4 fill-[#D8FF65]" />
        </div>

        <div className="flex flex-col">
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
              QUICK SWITCH
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#D8FF65] animate-ping" />
          </div>
          <span className="text-xs font-sans font-bold text-white tracking-wide">
            {lastFeedback.label}
          </span>
        </div>

        <div className="pl-3 border-l border-[#1E2230]">
          <kbd className="px-2.5 py-1 rounded-md bg-[#161922] border border-[#2A2E3D] text-[#D8FF65] font-mono text-xs font-bold shadow-inner">
            {lastFeedback.keyCombo}
          </kbd>
        </div>
      </div>
    </aside>
  );
};
