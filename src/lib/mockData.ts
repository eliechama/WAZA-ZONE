import { Project, Character, WorldBible, StoryPlan, Panel, CreditLedgerEntry } from '../types';

export const INITIAL_CHARACTERS: Character[] = [
  {
    id: 'char-1',
    projectId: 'proj-1',
    name: 'Ren Kurogane',
    roleTier: 'Protagonist (Lead Ronin)',
    avatarUrl: '/src/assets/images/waza_turnaround_1_1790673706903.jpg',
    dnaHash: 'DNA-RNK-88219-X',
    craniofacialSummary: 'Chiseled jawline, glowing cyan cybernetic left optic with vertical iris seam, messy raven hair with asymmetrical fringe, faint linear scar along right zygomatic arch.',
    tacticalWardrobe: 'Weather-beaten obsidian Kevlar duster with electric lime interior lining, articulated carbon armor plates on forearms, matte grey combat trousers, reinforced magnetic boots.',
    colorSwatches: [
      { name: 'Obsidian Void', hex: '#090A0F' },
      { name: 'Electric Lime', hex: '#D8FF65' },
      { name: 'Signal Cyan', hex: '#68E7FF' },
      { name: 'Carbon Ash', hex: '#11131A' }
    ],
    forbiddenDrift: [
      'Never render left eye as organic human eye',
      'Never omit high-collar duster in rain scenes',
      'Never add blonde, brown, or red hair highlights',
      'Never omit screentone grain in shadow gradients'
    ],
    masterPrompt: 'Master manga panel, ultra high contrast, Ren Kurogane, sharp chiseled jawline, glowing cyan cybernetic left eye with vertical aperture, raven messy hair, obsidian high-collar combat duster with electric lime inner accents, high-contrast black and white inks, dense screentone shading, cinematic Tokyo neo-noir.',
    referenceImages: [
      '/src/assets/images/waza_ren_turnaround_1790676961971.jpg',
      '/src/assets/images/waza_turnaround_2_1790673720643.jpg',
      '/src/assets/images/waza_turnaround_3_1790673733219.jpg',
      '/src/assets/images/waza_feat_micro_1790673744814.jpg',
      '/src/assets/images/waza_feat_outfit_1790673759471.jpg',
      '/src/assets/images/waza_feat_lighting_1790673776975.jpg',
      '/src/assets/images/waza_feat_aging_1790673789232.jpg'
    ],
    expressions: [
      'Cold Analytical Focus (Default)',
      'Combat Overdrive (Intense Screentone)',
      'Subtle Grimace (Post-Impact)',
      'Exhausted Overheat (Steam & Optical Glitch)'
    ],
    outfits: [
      'Standard Ops Duster (Primary)',
      'Stealth Infiltration Bodysuit',
      'Underground Arena Combat Gear'
    ],
    relationships: [
      'Syndicate Target: Commander Kageyama',
      'Tactical Netrunner Link: Aria Vance'
    ]
  },
  {
    id: 'char-2',
    projectId: 'proj-1',
    name: 'Aria Vance',
    roleTier: 'Deuteragonist (Master Netrunner)',
    avatarUrl: '/src/assets/images/waza_aria_portrait_1790676973041.jpg',
    dnaHash: 'DNA-ARV-99412-Z',
    craniofacialSummary: 'Asymmetrical cropped silver hair, luminous violet holographic neural visor hovering above brow, sharp feline eyes, delicate bio-luminescent fiber traces along neck.',
    tacticalWardrobe: 'Matte carbon cropped jacket with exposed violet fiber-optic conduits, cybernetic data gauntlets with projected holoscreens, high-mobility reinforced tights.',
    colorSwatches: [
      { name: 'Waza Violet', hex: '#9D78FF' },
      { name: 'Carbon Shell', hex: '#11131A' },
      { name: 'Signal Cyan', hex: '#68E7FF' },
      { name: 'Pure Specular', hex: '#FFFFFF' }
    ],
    forbiddenDrift: [
      'Never remove violet holographic visor during netrun operations',
      'Hair must strictly remain silver asymmetrical crop',
      'Never render facial tattoos or heavy scarring'
    ],
    masterPrompt: 'Seinen manga aesthetic, Aria Vance, silver asymmetrical bob hair, hovering glowing violet holographic neural visor, carbon netrunner jacket with violet luminescence, intense analytical gaze, cyberpunk data terminal ambient lighting, fine ink hatching.',
    referenceImages: [
      '/src/assets/images/waza_aria_portrait_1790676973041.jpg',
      '/src/assets/images/waza_showcase_left_1790673802571.jpg',
      '/src/assets/images/waza_showcase_right_1790673815665.jpg'
    ],
    expressions: [
      'Calculating Net-Gaze',
      'Sarcastic Smirk',
      'Code-Overload Shock'
    ],
    outfits: [
      'Netrunner Tactical Shell',
      'Casual Shinjuku Streetwear'
    ],
    relationships: [
      'Tactical Bond with Ren Kurogane',
      'Rival Netrunner to AetherCore'
    ]
  },
  {
    id: 'char-3',
    projectId: 'proj-1',
    name: 'Commander Kageyama',
    roleTier: 'Antagonist (Syndicate Enforcer)',
    avatarUrl: '/src/assets/images/waza_kageyama_port_1790676983961.jpg',
    dnaHash: 'DNA-KAG-33910-W',
    craniofacialSummary: 'Menacing half-oni carbon ballistic mask over lower face, single glowing crimson tactical optic, slicked jet-black hair with mechanical temple cranial ports.',
    tacticalWardrobe: 'Heavy reinforced carbon-weave armor, crimson sash, monomolecular forearm blades with hydraulic actuators.',
    colorSwatches: [
      { name: 'Carbon Black', hex: '#11131A' },
      { name: 'Crimson Hazard', hex: '#FF3366' },
      { name: 'Gunmetal Steel', hex: '#2A2E3D' }
    ],
    forbiddenDrift: [
      'Never reveal full lower face or remove oni mask',
      'Optic must strictly glow deep crimson',
      'Never show mercy or casual smile'
    ],
    masterPrompt: 'Dark manga antagonist, Commander Kageyama, half-oni cybernetic jaw mask, piercing crimson mechanical eye, heavy samurai combat armor, dramatic chiaroscuro lighting, heavy shadows, sharp katana silhouettes.',
    referenceImages: [
      '/src/assets/images/waza_kageyama_port_1790676983961.jpg',
      '/src/assets/images/waza_hero_panel_1790673692187.jpg'
    ],
    expressions: [
      'Ruthless Executioner Stance',
      'Cold Intimidation Glare'
    ],
    outfits: [
      'Syndicate Heavy Armor',
      'Ceremonial Ronin Robes'
    ],
    relationships: [
      'Arch-Nemesis to Ren Kurogane'
    ]
  }
];

export const INITIAL_WORLD_BIBLE: WorldBible = {
  id: 'wb-1',
  projectId: 'proj-1',
  title: 'Neo-Saito Canon Codex',
  genre: 'Cyberpunk Action / Noir Manga',
  artStyle: 'High-contrast Shonen / Seinen hybrid with heavy screentone, sharp lineart, and neon accents',
  canonSummary: 'In 2099, Neo-Saito is divided between the upper Atmospheric Spire and the submerged Lower Slums. The AI conglomerate "AetherCore" enforces absolute order via neural bio-chips.',
  locations: [
    {
      id: 'loc-1',
      name: 'District 9 - Rain Alley',
      description: 'Submerged neon bazaar with towering holographic billboards, perpetual acid rain, and wet asphalt reflections.',
      opticalInvariants: 'Always humid with puddles reflecting lime/cyan neon lights, steam rising from underground vents.'
    },
    {
      id: 'loc-2',
      name: 'AetherCore Monolith Spire',
      description: 'Towering chrome and obsidian skyscraper piercing the heavy cloud layer.',
      opticalInvariants: 'Ultra-clean glass facades, security drones circulating, stark white ambient lighting.'
    }
  ],
  rules: [
    'Bio-chips emit faint cyan light when active',
    'Acid rain tarnishes unshielded metals within 2 hours',
    'High-frequency katana strikes create purple electrical arcs'
  ],
  chronology: [
    { era: '2085', event: 'The Great Glitch and collapse of the Old Grid' },
    { era: '2092', event: 'AetherCore assumes military governance of Neo-Saito' },
    { era: '2099', event: 'Kaito Vance escapes Bio-Lab Delta with illegal prototype eye' }
  ],
  glossary: [
    { term: 'Aether-Sync', definition: 'Direct neural link between a netrunner and the city mainframe' },
    { term: 'Drift-Lock', definition: 'State where bio-chip overrides human muscle control' }
  ]
};

export const INITIAL_STORY_PLAN: StoryPlan = {
  id: 'sp-1',
  projectId: 'proj-1',
  title: 'Episode 1: The Cyan Override',
  premise: 'Kaito Vance intercepts an AetherCore transport in Rain Alley to retrieve a sealed data drive containing Maya Lin’s lost memories.',
  acts: [
    {
      id: 'act-1',
      title: 'Act 1: Rain & Steel',
      episodes: [
        {
          id: 'ep-1',
          title: 'Episode 1: Ambush at Alley 9',
          summary: 'Kaito waits on the high gantry above Rain Alley as the armored transport enters the target kill zone.',
          scenes: [
            {
              id: 'sc-1',
              title: 'Scene 1: High Vantage Point',
              location: 'District 9 - Rain Alley',
              mood: 'Tense, rainy, dark atmospheric noir',
              beats: [
                {
                  id: 'beat-1',
                  shotType: 'EXT. HIGH ANGLE - NIGHT',
                  description: 'Kaito stands at the edge of a rainy rooftop, dark coat blowing in the wind, looking down at neon rain alley.',
                  dialogue: 'Maya (via comms): "Transport is two blocks out. Don\'t miss your window, Vance."',
                  suggestedComposition: 'High angle wide shot showing Kaito in silhouette against glowing neon billboards.'
                },
                {
                  id: 'beat-2',
                  shotType: 'EXT. CLOSE UP - KAITO',
                  description: 'Close up of Kaito’s cyan cybernetic eye zooming into target lock mode.',
                  dialogue: 'Kaito: "Target acquired. Disabling perimeter shields now."',
                  suggestedComposition: 'Tight dramatic close-up focusing on the cyan glowing eye with HUD overlays.'
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

export const INITIAL_PANELS: Panel[] = [
  {
    id: 'panel-1',
    sceneId: 'sc-1',
    sequence: 1,
    shotType: 'Extreme High Angle Wide',
    cameraAngle: 'Rooftop POV looking down',
    composition: 'Kaito in lower right foreground looking over sprawling neon cyberpunk city alley beneath torrential acid rain.',
    promptUsed: 'Cinematic manga panel, Kaito Vance standing on high rain-slick rooftop edge, obsidian longcoat fluttering, neon cyan and lime reflections, extreme wide shot, sharp manga inks.',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
    layers: {
      speechBubbles: [
        {
          id: 'bubble-1',
          type: 'RADIO',
          speaker: 'Maya (Comms)',
          text: 'Transport entering Sector 9. You have 30 seconds before lockdown!',
          x: 15,
          y: 12,
          width: 35,
          height: 18,
          tailDirection: 'bottom'
        }
      ],
      captions: [
        {
          id: 'cap-1',
          text: 'NEO-SAITO — LOWER SLUMS — 02:14 AM',
          x: 5,
          y: 85,
          width: 45,
          height: 8
        }
      ],
      sfx: [
        {
          id: 'sfx-1',
          text: 'SHWWWW...',
          x: 65,
          y: 40,
          rotation: -12,
          color: '#68E7FF'
        }
      ]
    },
    status: 'COMPLETED',
    creditCost: 4
  },
  {
    id: 'panel-2',
    sceneId: 'sc-1',
    sequence: 2,
    shotType: 'Dramatic Close Up',
    cameraAngle: 'Low angle tight view',
    composition: 'Focus on Kaito Vance’s face, cybernetic eye flared cyan with glowing targeted HUD rings.',
    promptUsed: 'Manga panel close up, Kaito Vance, left cyan cybernetic eye glowing bright with target reticle reflection, raindrops dripping off chin, intense determined glare, dark shading.',
    imageUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80',
    layers: {
      speechBubbles: [
        {
          id: 'bubble-2',
          type: 'SPEECH',
          speaker: 'Kaito',
          text: 'Shields down in three... two...',
          x: 55,
          y: 65,
          width: 38,
          height: 18,
          tailDirection: 'left'
        }
      ],
      captions: [],
      sfx: [
        {
          id: 'sfx-2',
          text: 'BZZZT!',
          x: 20,
          y: 25,
          rotation: 8,
          color: '#D8FF65'
        }
      ]
    },
    status: 'COMPLETED',
    creditCost: 4
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    workspaceId: 'ws-default',
    title: 'CYBER-RONIN 2099',
    format: 'MANGA',
    coverImage: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80',
    status: 'IN_PROGRESS',
    episodesCount: 12,
    charactersCount: 4,
    lastModified: '2026-09-28T22:30:00Z',
    description: 'A dark cyberpunk manga following a rogue ex-enforcer with a cybernetic optical unit taking down an AI oligarchy in Neo-Saito.'
  },
  {
    id: 'proj-2',
    workspaceId: 'ws-default',
    title: 'VALKYRIE CHRONICLES: ZERO',
    format: 'WEBTOON',
    coverImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80',
    status: 'DRAFT',
    episodesCount: 6,
    charactersCount: 3,
    lastModified: '2026-09-27T14:15:00Z',
    description: 'High-fantasy vertical webtoon featuring airborne holy knights defending floating sky islands.'
  },
  {
    id: 'proj-3',
    workspaceId: 'ws-default',
    title: 'SOLARIS PRIME: GRAPHIC NOVEL',
    format: 'COMIC',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
    status: 'COMPLETED',
    episodesCount: 24,
    charactersCount: 8,
    lastModified: '2026-09-25T09:00:00Z',
    description: 'Franco-Belge style deep space exploration opera with intricate mech blueprints and rich alien ecosystems.'
  }
];

export const INITIAL_LEDGER_ENTRIES: CreditLedgerEntry[] = [
  {
    id: 'ledg-1',
    workspaceId: 'ws-default',
    amount: 500,
    type: 'GRANT',
    description: 'Welcome Creator Plan monthly credit allocation',
    createdAt: '2026-09-01T00:00:00Z',
    balanceAfter: 500
  },
  {
    id: 'ledg-2',
    workspaceId: 'ws-default',
    amount: -4,
    type: 'SPEND',
    description: 'Panel generation - CYBER-RONIN Episode 1 Panel 1',
    createdAt: '2026-09-28T21:10:00Z',
    balanceAfter: 496,
    jobId: 'job-101'
  },
  {
    id: 'ledg-3',
    workspaceId: 'ws-default',
    amount: -4,
    type: 'SPEND',
    description: 'Panel generation - CYBER-RONIN Episode 1 Panel 2',
    createdAt: '2026-09-28T21:14:00Z',
    balanceAfter: 492,
    jobId: 'job-102'
  }
];
