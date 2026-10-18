import { ShortcutDefinition } from './types';

export const MODULE_FLOW_ORDER = [
  'projects',
  'cast',
  'world',
  'story',
  'storyboard',
  'panel',
  'localization',
  'export',
  'reader',
  'billing',
  'admin',
  'telemetry',
  'settings'
];

export const SHORTCUT_DEFINITIONS: ShortcutDefinition[] = [
  // Creative Engine Flow (1-9)
  {
    id: 'flow-projects',
    keyCombo: '1',
    displayKey: '1',
    secondaryKey: 'g p',
    name: 'Projects & Cockpit',
    description: 'Jump to series dashboard, kanban milestones and studio overview',
    category: 'CREATIVE_FLOW',
    viewId: 'projects',
    iconName: 'FolderKanban',
    badge: 'CORE'
  },
  {
    id: 'flow-cast',
    keyCombo: '2',
    displayKey: '2',
    secondaryKey: 'g c',
    name: 'Cast & Character DNA',
    description: 'Open character registry, facial turnarounds and model seeds',
    category: 'CREATIVE_FLOW',
    viewId: 'cast',
    iconName: 'Users',
    badge: 'CANON'
  },
  {
    id: 'flow-world',
    keyCombo: '3',
    displayKey: '3',
    secondaryKey: 'g w',
    name: 'World Bible & Canon',
    description: 'Consult environment blueprints, lore factions and continuity rules',
    category: 'CREATIVE_FLOW',
    viewId: 'world',
    iconName: 'Globe2',
    badge: 'LORE'
  },
  {
    id: 'flow-story',
    keyCombo: '4',
    displayKey: '4',
    secondaryKey: 'g s',
    name: 'Story Architect',
    description: 'Edit beat sheets, narrative pacing and 3-act tension curves',
    category: 'CREATIVE_FLOW',
    viewId: 'story',
    iconName: 'FileText',
    badge: 'PLOT'
  },
  {
    id: 'flow-storyboard',
    keyCombo: '5',
    displayKey: '5',
    secondaryKey: 'g b',
    name: 'Storyboard & Camera',
    description: 'Configure shot sequences, lens focal length and cinematography angles',
    category: 'CREATIVE_FLOW',
    viewId: 'storyboard',
    iconName: 'Camera',
    badge: 'FRAME'
  },
  {
    id: 'flow-panel',
    keyCombo: '6',
    displayKey: '6',
    secondaryKey: 'g l',
    name: 'Panel Engine & Layout',
    description: 'Arrange gutter geometry, sound effects (SFX) and speech balloons',
    category: 'CREATIVE_FLOW',
    viewId: 'panel',
    iconName: 'LayoutGrid',
    badge: 'MANGA'
  },
  {
    id: 'flow-localization',
    keyCombo: '7',
    displayKey: '7',
    secondaryKey: 'g t',
    name: 'Localization & Translation',
    description: 'Translate scripts, adapt idioms and manage multi-language glossaries',
    category: 'CREATIVE_FLOW',
    viewId: 'localization',
    iconName: 'Languages',
    badge: 'LANG'
  },
  {
    id: 'flow-export',
    keyCombo: '8',
    displayKey: '8',
    secondaryKey: 'g e',
    name: 'Export & Publications',
    description: 'Generate Webtoon vertical scrolls, print-ready PDFs and CBZ archives',
    category: 'CREATIVE_FLOW',
    viewId: 'export',
    iconName: 'Download',
    badge: 'BUILD'
  },
  {
    id: 'flow-reader',
    keyCombo: '9',
    displayKey: '9',
    secondaryKey: 'g r',
    name: 'Public Reader & Showcase',
    description: 'Preview the interactive high-fidelity web reader experience',
    category: 'CREATIVE_FLOW',
    viewId: 'reader',
    iconName: 'BookOpen',
    badge: 'LIVE'
  },

  // Studio Infrastructure & Operations
  {
    id: 'infra-billing',
    keyCombo: 'alt+b',
    displayKey: '⌥ B',
    secondaryKey: 'alt+1',
    name: 'Billing & Credits Ledger',
    description: 'Inspect compute usage, credit transactions and subscription tier',
    category: 'INFRASTRUCTURE',
    viewId: 'billing',
    iconName: 'CreditCard',
    badge: 'FINANCE'
  },
  {
    id: 'infra-admin',
    keyCombo: 'alt+a',
    displayKey: '⌥ A',
    secondaryKey: 'alt+2',
    name: 'Admin & SRE Console',
    description: 'Platform health diagnostics, node status and rate-limit guardrails',
    category: 'INFRASTRUCTURE',
    viewId: 'admin',
    iconName: 'ShieldCheck',
    badge: 'SRE'
  },
  {
    id: 'infra-telemetry',
    keyCombo: 'alt+t',
    displayKey: '⌥ T',
    secondaryKey: 'alt+3',
    name: 'Telemetry & Logs',
    description: 'Real-time WebSocket event bus, audit trails and latency monitors',
    category: 'INFRASTRUCTURE',
    viewId: 'telemetry',
    iconName: 'Activity',
    badge: 'STREAM'
  },
  {
    id: 'infra-settings',
    keyCombo: 'alt+s',
    displayKey: '⌥ S',
    secondaryKey: 'alt+4',
    name: 'Settings & AI Gateway',
    description: 'Model routing weights, Gemini API keys and safety thresholds',
    category: 'INFRASTRUCTURE',
    viewId: 'settings',
    iconName: 'Settings',
    badge: 'CONFIG'
  },

  // Quick Navigation & Global Shortcuts
  {
    id: 'nav-command-palette',
    keyCombo: 'mod+k',
    displayKey: '⌘ K',
    secondaryKey: 'ctrl+k',
    name: 'Omni Command Palette',
    description: 'Global fuzzy search to switch modules, trigger wizards and actions',
    category: 'ACTIONS',
    iconName: 'Search',
    badge: 'SEARCH'
  },
  {
    id: 'nav-cheatsheet',
    keyCombo: 'shift+/',
    displayKey: '?',
    secondaryKey: 'mod+/',
    name: 'Keyboard Shortcuts HUD',
    description: 'Open the comprehensive hotkey cheatsheet overlay',
    category: 'ACTIONS',
    iconName: 'Keyboard',
    badge: 'HUD'
  },
  {
    id: 'nav-prev-module',
    keyCombo: '[',
    displayKey: '[',
    secondaryKey: 'alt+[',
    name: 'Previous Flow Module',
    description: 'Step backward to the previous step in the creative pipeline',
    category: 'NAVIGATION',
    iconName: 'ChevronLeft'
  },
  {
    id: 'nav-next-module',
    keyCombo: ']',
    displayKey: ']',
    secondaryKey: 'alt+]',
    name: 'Next Flow Module',
    description: 'Step forward to the next step in the creative pipeline',
    category: 'NAVIGATION',
    iconName: 'ChevronRight'
  },
  {
    id: 'nav-toggle-hints',
    keyCombo: 'mod+h',
    displayKey: '⌘ H',
    secondaryKey: 'alt+h',
    name: 'Toggle Visual Hotkey Badges',
    description: 'Show or hide keycap hint overlays directly in the sidebar navigation',
    category: 'ACTIONS',
    iconName: 'Eye',
    badge: 'TOGGLE'
  }
];
