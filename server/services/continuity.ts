import { ContinuityPacketPayload } from '../types.js';

export class ContinuityService {
  /**
   * Assembles a strict, high-dimensional continuity packet for Gemini generation.
   * This guarantees that character DNA, world bible constraints, and style
   * invariants are explicitly passed into every generation prompt.
   */
  public static buildPacket(params: {
    projectId: string;
    characterId?: string;
    characterName?: string;
    lockedTraits?: string[];
    outfits?: string[];
    worldRules?: string[];
    locationName?: string;
    locationCode?: string;
    opticalInvariants?: Record<string, any>;
    emotionalState?: string;
    cameraAngle?: string;
    forbiddenDrift?: string[];
    seedLock?: number;
  }): ContinuityPacketPayload {
    const defaultLockedTraits = [
      'Jet-black messy wolf-cut with electric cyan streak running across right temporal edge',
      'Diagonal cyber-blade scar intersecting left eyebrow at 35 degrees',
      'Left eye replaced with synthetic amber optic aperture featuring micro-concentric aperture rings',
    ];

    const defaultOutfits = [
      'High-standing rigid collar carbon-fiber duster jacket',
      'Full-grain tactical chest harness',
      'Left upper & forearm entirely replaced by exposed aeronautical titanium skeletal arm with active lime-colored micro-luminescent cooling coils',
    ];

    const defaultWorldRules = [
      'Neo-Tokyo 2088 acid-rain skyboxes with thermal cooling stacks in upper third',
      'Laser weaponry strictly non-existent before year 2085',
      'Cybernetic limbs require visible external heat-sinks / braided coils',
    ];

    const defaultForbiddenDrift = [
      'Never render left arm as biological or flesh',
      'Left eyebrow scar permanently visible across all angles',
      'Coat collar remains fully raised (no fold-down)',
      'No clean blue skies or visible daylight in Neo-Kanto',
    ];

    return {
      projectId: params.projectId || 'wz_proj_chrono_omega',
      characterId: params.characterId || 'ren_kurogane_01',
      characterName: params.characterName || 'Ren Kurogane',
      lockedCharacterTraits: params.lockedTraits || defaultLockedTraits,
      currentOutfits: params.outfits || defaultOutfits,
      worldRules: params.worldRules || defaultWorldRules,
      location: {
        code: params.locationCode || 'loc_shibuya_helipad_09',
        name: params.locationName || 'Shibuya Under-Helipad & Lower Core',
        coordinates: '35.6580° N, 139.7016° E (Sub-L3)',
        opticalInvariants: params.opticalInvariants || {
          colorTemp: '7200K Cyan / 2400K Amber',
          weather: 'torrential_acid_rain',
          refraction: 'IOR 1.33 (Heavy Acid Sheen)',
          wallMaterials: 'Pitted Graphene Alloy',
          chromaKeys: ['#00F2FE', '#4FACFE', '#D8FF65'],
        },
      },
      chronologyYear: '2088.11.02',
      previousApprovedPanelId: 'panel_03_approved',
      emotionalState: params.emotionalState || 'Cynical Smirk / Combat Readiness',
      artDirection: {
        style: 'High-contrast Shonen B&W Manga with heavy cross-hatching, kinetic speedlines, and deep blacks',
        renderingMode: 'Manga B4 350DPI Tankobon Screentone Inking',
        cameraAngle: params.cameraAngle || '35mm Anamorphic Low-Angle Dutch Tilt (-12°)',
        lighting: 'Chiaroscuro, volumetric rim lighting from neon signage reflection on wet pavement',
      },
      forbiddenDrift: params.forbiddenDrift || defaultForbiddenDrift,
      seedLock: params.seedLock || 88912401,
      continuityConfidence: 0.998,
    };
  }

  /**
   * Format the packet into an explicit system prompt prefix for Gemini.
   */
  public static formatPromptWithContinuity(prompt: string, packet: ContinuityPacketPayload): string {
    return `[WAZA-ZONE CANON CONTINUITY PACKET v3.4.1]
CHARACTER DNA LOCK:
- Name: ${packet.characterName} (ID: ${packet.characterId})
- Locked Physical Traits: ${packet.lockedCharacterTraits.join('; ')}
- Current Outfit / Armor: ${packet.currentOutfits.join('; ')}

ENVIRONMENT & OPTICAL INVARIANTS:
- Location: ${packet.location.name} (${packet.location.code})
- Atmospheric Lighting: ${JSON.stringify(packet.location.opticalInvariants)}
- World Rules Enforced: ${packet.worldRules.join('; ')}

ART DIRECTION & SHOT SPECIFICATION:
- Style: ${packet.artDirection.style}
- Camera Angle: ${packet.artDirection.cameraAngle}
- Emotional Expression: ${packet.emotionalState}

FORBIDDEN DRIFT (STRICT NEGATIVE CONSTRAINTS):
${packet.forbiddenDrift.map((rule) => `- ABSOLUTE NEGATIVE: ${rule}`).join('\n')}

SCENE DESCRIPTION TO RENDER:
${prompt}
[END CANON PACKET - RENDER WITH ZERO DRIFT]`;
  }
}
