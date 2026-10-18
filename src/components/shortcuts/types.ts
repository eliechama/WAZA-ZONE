import React from 'react';

export type ShortcutCategory = 'CREATIVE_FLOW' | 'INFRASTRUCTURE' | 'NAVIGATION' | 'ACTIONS';

export interface ShortcutDefinition {
  id: string;
  keyCombo: string;
  displayKey: string;
  secondaryKey?: string;
  name: string;
  description: string;
  category: ShortcutCategory;
  viewId?: string;
  action?: () => void;
  iconName?: string;
  badge?: string;
}

export interface HotkeyFeedback {
  id: string;
  label: string;
  keyCombo: string;
  moduleName?: string;
  timestamp: number;
}
