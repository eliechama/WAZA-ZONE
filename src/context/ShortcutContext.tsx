import React, { createContext, useContext, useState, useCallback } from 'react';
import { useProject } from './ProjectContext';
import { HotkeyFeedback } from '../components/shortcuts/types';
import { SHORTCUT_DEFINITIONS } from '../components/shortcuts/shortcutDefinitions';

interface ShortcutContextType {
  isPaletteOpen: boolean;
  setIsPaletteOpen: (open: boolean) => void;
  isCheatSheetOpen: boolean;
  setIsCheatSheetOpen: (open: boolean) => void;
  isWizardOpen: boolean;
  openWizard: () => void;
  closeWizard: () => void;
  isProfileOpen: boolean;
  openProfile: () => void;
  closeProfile: () => void;
  showKeyHints: boolean;
  setShowKeyHints: React.Dispatch<React.SetStateAction<boolean>>;
  toggleKeyHints: () => void;
  lastFeedback: HotkeyFeedback | null;
  triggerFeedback: (keyCombo: string, label: string, moduleName?: string) => void;
  navigateToModule: (viewId: string, triggerKey?: string) => void;
}

const ShortcutContext = createContext<ShortcutContextType | null>(null);

export const ShortcutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { setActiveView } = useProject();
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [isCheatSheetOpen, setIsCheatSheetOpen] = useState(false);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showKeyHints, setShowKeyHints] = useState(true);
  const [lastFeedback, setLastFeedback] = useState<HotkeyFeedback | null>(null);

  const openWizard = useCallback(() => setIsWizardOpen(true), []);
  const closeWizard = useCallback(() => setIsWizardOpen(false), []);

  const openProfile = useCallback(() => setIsProfileOpen(true), []);
  const closeProfile = useCallback(() => setIsProfileOpen(false), []);

  const toggleKeyHints = useCallback(() => {
    setShowKeyHints(prev => !prev);
  }, []);

  const triggerFeedback = useCallback((keyCombo: string, label: string, moduleName?: string) => {
    const feedback: HotkeyFeedback = {
      id: `${Date.now()}-${Math.random()}`,
      keyCombo,
      label,
      moduleName,
      timestamp: Date.now()
    };
    setLastFeedback(feedback);

    setTimeout(() => {
      setLastFeedback(current => (current?.id === feedback.id ? null : current));
    }, 1800);
  }, []);

  const navigateToModule = useCallback(
    (viewId: string, triggerKey?: string) => {
      setActiveView(viewId);
      const def = SHORTCUT_DEFINITIONS.find(d => d.viewId === viewId);
      const keyDisplay = triggerKey || def?.displayKey || viewId.toUpperCase();
      const name = def?.name || viewId;
      triggerFeedback(keyDisplay, name, viewId);
    },
    [setActiveView, triggerFeedback]
  );

  return (
    <ShortcutContext.Provider
      value={{
        isPaletteOpen,
        setIsPaletteOpen,
        isCheatSheetOpen,
        setIsCheatSheetOpen,
        isWizardOpen,
        openWizard,
        closeWizard,
        isProfileOpen,
        openProfile,
        closeProfile,
        showKeyHints,
        setShowKeyHints,
        toggleKeyHints,
        lastFeedback,
        triggerFeedback,
        navigateToModule
      }}
    >
      {children}
    </ShortcutContext.Provider>
  );
};

export const useShortcuts = () => {
  const context = useContext(ShortcutContext);
  if (!context) {
    throw new Error('useShortcuts must be used within a ShortcutProvider');
  }
  return context;
};
