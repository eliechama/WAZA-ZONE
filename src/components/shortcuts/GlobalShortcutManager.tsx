import React, { useEffect, useRef } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useShortcuts } from '../../context/ShortcutContext';
import { useProject } from '../../context/ProjectContext';

export const GlobalShortcutManager: React.FC = () => {
  const {
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
    toggleKeyHints,
    navigateToModule,
    triggerFeedback
  } = useShortcuts();

  const { activeView } = useProject();

  // Helper for sequential flow cycling ([ and ])
  const cycleModule = (direction: 'prev' | 'next') => {
    const flowItems = [
      'projects',
      'cast',
      'world',
      'story',
      'storyboard',
      'panel',
      'localization',
      'export',
      'reader'
    ];
    let currentIndex = flowItems.indexOf(activeView);
    if (currentIndex === -1) currentIndex = 0;

    let targetIndex: number;
    if (direction === 'next') {
      targetIndex = (currentIndex + 1) % flowItems.length;
    } else {
      targetIndex = (currentIndex - 1 + flowItems.length) % flowItems.length;
    }

    const nextView = flowItems[targetIndex];
    navigateToModule(nextView, direction === 'next' ? ']' : '[');
  };

  // 1. Creative Engine Flow Hotkeys (1-9)
  useHotkeys('1', () => navigateToModule('projects', '1'), { enableOnFormTags: false, preventDefault: true });
  useHotkeys('2', () => navigateToModule('cast', '2'), { enableOnFormTags: false, preventDefault: true });
  useHotkeys('3', () => navigateToModule('world', '3'), { enableOnFormTags: false, preventDefault: true });
  useHotkeys('4', () => navigateToModule('story', '4'), { enableOnFormTags: false, preventDefault: true });
  useHotkeys('5', () => navigateToModule('storyboard', '5'), { enableOnFormTags: false, preventDefault: true });
  useHotkeys('6', () => navigateToModule('panel', '6'), { enableOnFormTags: false, preventDefault: true });
  useHotkeys('7', () => navigateToModule('localization', '7'), { enableOnFormTags: false, preventDefault: true });
  useHotkeys('8', () => navigateToModule('export', '8'), { enableOnFormTags: false, preventDefault: true });
  useHotkeys('9', () => navigateToModule('reader', '9'), { enableOnFormTags: false, preventDefault: true });

  // 2. Studio Infrastructure Hotkeys (Alt + B, A, T, S or Alt + 1..4)
  useHotkeys(['alt+b', 'alt+1'], () => navigateToModule('billing', '⌥ B'), { enableOnFormTags: false, preventDefault: true });
  useHotkeys(['alt+a', 'alt+2'], () => navigateToModule('admin', '⌥ A'), { enableOnFormTags: false, preventDefault: true });
  useHotkeys(['alt+t', 'alt+3'], () => navigateToModule('telemetry', '⌥ T'), { enableOnFormTags: false, preventDefault: true });
  useHotkeys(['alt+s', 'alt+4'], () => navigateToModule('settings', '⌥ S'), { enableOnFormTags: false, preventDefault: true });

  // 3. Navigation cycling ([ and ])
  useHotkeys('[', () => cycleModule('prev'), { enableOnFormTags: false, preventDefault: true });
  useHotkeys(']', () => cycleModule('next'), { enableOnFormTags: false, preventDefault: true });

  // 4. Command Palette (Mod+K or Ctrl+K)
  useHotkeys(
    ['mod+k', 'ctrl+k'],
    (e) => {
      e.preventDefault();
      setIsPaletteOpen(!isPaletteOpen);
    },
    { enableOnFormTags: true, preventDefault: true },
    [isPaletteOpen]
  );

  // 5. Cheatsheet HUD (? or Shift+/)
  useHotkeys(
    ['shift+/', '?'],
    (e) => {
      e.preventDefault();
      setIsCheatSheetOpen(!isCheatSheetOpen);
    },
    { enableOnFormTags: false, preventDefault: true },
    [isCheatSheetOpen]
  );

  // 6. Escape closes active modal or palette
  useHotkeys(
    'escape',
    () => {
      if (isPaletteOpen) setIsPaletteOpen(false);
      if (isCheatSheetOpen) setIsCheatSheetOpen(false);
      if (isWizardOpen) closeWizard();
      if (isProfileOpen) closeProfile();
    },
    { enableOnFormTags: true, preventDefault: true },
    [isPaletteOpen, isCheatSheetOpen, isWizardOpen, isProfileOpen]
  );

  // 7. Toggle Key Hints on UI (Mod+H or Alt+H)
  useHotkeys(
    ['mod+h', 'alt+h'],
    (e) => {
      e.preventDefault();
      toggleKeyHints();
      triggerFeedback('⌘ H', 'Toggled Hotkey Badges', 'HUD');
    },
    { enableOnFormTags: false, preventDefault: true }
  );

  // 8. New Project Wizard Genesis Hotkey (Alt+N or Mod+Shift+N)
  useHotkeys(
    ['alt+n', 'mod+shift+n'],
    (e) => {
      e.preventDefault();
      openWizard();
      triggerFeedback('⌥ N', 'Launch Genesis Wizard', 'PROJECT');
    },
    { enableOnFormTags: false, preventDefault: true },
    [openWizard]
  );

  // 9. Profile Settings Modal Hotkey (Alt+P or Mod+Shift+P)
  useHotkeys(
    ['alt+p', 'mod+shift+p'],
    (e) => {
      e.preventDefault();
      openProfile();
      triggerFeedback('⌥ P', 'User Profile Settings', 'ACCOUNT');
    },
    { enableOnFormTags: false, preventDefault: true },
    [openProfile]
  );

  // 10. Vim-Style Leader Key Sequence: 'g' followed by target letter within 1200ms
  const leaderState = useRef<{ active: boolean; timer: NodeJS.Timeout | null }>({
    active: false,
    timer: null
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable ||
          target.tagName === 'SELECT')
      ) {
        return;
      }

      if (e.key === 'g' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        if (!leaderState.current.active) {
          leaderState.current.active = true;
          if (leaderState.current.timer) clearTimeout(leaderState.current.timer);
          leaderState.current.timer = setTimeout(() => {
            leaderState.current.active = false;
          }, 1200);
          return;
        }
      }

      if (leaderState.current.active) {
        const key = e.key.toLowerCase();
        leaderState.current.active = false;
        if (leaderState.current.timer) clearTimeout(leaderState.current.timer);

        const leaderMap: Record<string, { view: string; label: string }> = {
          p: { view: 'projects', label: 'g p' },
          c: { view: 'cast', label: 'g c' },
          w: { view: 'world', label: 'g w' },
          s: { view: 'story', label: 'g s' },
          b: { view: 'storyboard', label: 'g b' },
          l: { view: 'panel', label: 'g l' },
          t: { view: 'telemetry', label: 'g t' },
          e: { view: 'export', label: 'g e' },
          r: { view: 'reader', label: 'g r' },
          a: { view: 'admin', label: 'g a' },
          i: { view: 'billing', label: 'g i' }
        };

        if (leaderMap[key]) {
          e.preventDefault();
          navigateToModule(leaderMap[key].view, leaderMap[key].label);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (leaderState.current.timer) clearTimeout(leaderState.current.timer);
    };
  }, [navigateToModule]);

  return null;
};
