import test from 'node:test';
import assert from 'node:assert/strict';
import { ContinuityService } from '../server/services/continuity.js';

test('Canon Continuity Service - Packet Assembly & Prompt Guardrails', async (t) => {
  await t.test('builds comprehensive continuity packet with defaults', () => {
    const packet = ContinuityService.buildPacket({
      projectId: 'wz_proj_test',
      characterId: 'ren_01',
      characterName: 'Ren Kurogane',
      cameraAngle: 'Dutch Angle 35mm',
    });

    assert.equal(packet.projectId, 'wz_proj_test');
    assert.equal(packet.characterId, 'ren_01');
    assert.equal(packet.characterName, 'Ren Kurogane');
    assert.ok(packet.lockedCharacterTraits.length > 0);
    assert.ok(packet.currentOutfits.length > 0);
    assert.ok(packet.forbiddenDrift.length > 0);
    assert.ok(packet.seedLock > 0);
    assert.equal(packet.artDirection.cameraAngle, 'Dutch Angle 35mm');
  });

  await t.test('formats system prompt with strict negative constraints', () => {
    const packet = ContinuityService.buildPacket({
      projectId: 'wz_proj_test',
      characterName: 'Ren Kurogane',
    });

    const userPrompt = 'Ren leaps across Shibuya neon roofs';
    const formatted = ContinuityService.formatPromptWithContinuity(userPrompt, packet);

    assert.ok(formatted.includes('[WAZA-ZONE CANON CONTINUITY PACKET v3.4.1]'));
    assert.ok(formatted.includes('CHARACTER DNA LOCK:'));
    assert.ok(formatted.includes('FORBIDDEN DRIFT (STRICT NEGATIVE CONSTRAINTS):'));
    assert.ok(formatted.includes('ABSOLUTE NEGATIVE:'));
    assert.ok(formatted.includes(userPrompt));
    assert.ok(formatted.includes('[END CANON PACKET - RENDER WITH ZERO DRIFT]'));
  });
});
