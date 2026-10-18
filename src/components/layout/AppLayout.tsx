import React from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { GlobalShortcutManager } from '../shortcuts/GlobalShortcutManager';
import { QuickCommandPalette } from '../shortcuts/QuickCommandPalette';
import { KeyboardShortcutsModal } from '../shortcuts/KeyboardShortcutsModal';
import { ShortcutToastNotification } from '../shortcuts/ShortcutToastNotification';
import { NewProjectWizard } from '../wizard/NewProjectWizard';
import { useShortcuts } from '../../context/ShortcutContext';

interface AppLayoutProps {
  children: React.ReactNode;
  onNavigateToLanding?: () => void;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children, onNavigateToLanding }) => {
  const { isWizardOpen, closeWizard } = useShortcuts();

  return (
    <div className="min-h-screen bg-[#090A0F] text-slate-100 flex flex-col font-sans selection:bg-[#D8FF65] selection:text-black">
      {/* Global Keyboard Shortcut Manager & Overlays */}
      <GlobalShortcutManager />
      <QuickCommandPalette />
      <KeyboardShortcutsModal />
      <ShortcutToastNotification />

      {/* Global New Project Wizard (accessible via ⌥N, Command Palette, or Project Cockpit) */}
      <NewProjectWizard
        isOpen={isWizardOpen}
        onClose={closeWizard}
      />

      <Navbar onNavigateToLanding={onNavigateToLanding} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-[#0B0C12] p-4 lg:p-6 text-slate-100">
          {children}
        </main>
      </div>
    </div>
  );
};
