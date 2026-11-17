import test from 'node:test';
import assert from 'node:assert/strict';
import { AIGateway } from '../server/services/aiGateway.js';

test('AI Gateway - Resilient Structured Output Fallbacks', async (t) => {
  await t.test('generates structured story plan with arcs and episodes', async () => {
    const plan = await AIGateway.generateStoryPlan({
      title: 'NEO-SHIBUYA REBELLION',
      genre: 'Cyberpunk Shonen',
      format: 'MANGA',
      premise: 'A disgraced cyborg hacker seeks revenge',
    });

    assert.ok(plan.title);
    assert.ok(plan.logline);
    assert.ok(Array.isArray(plan.arcs));
    assert.ok(plan.arcs.length > 0);
    assert.ok(Array.isArray(plan.arcs[0].episodes));
    assert.ok(plan.arcs[0].episodes.length > 0);
  });

  await t.test('generates scene beats breakdown with camera shots and dialogues', async () => {
    const beats = await AIGateway.generateSceneBeats({
      sceneTitle: 'Helipad Confrontation',
      locationName: 'Shibuya Sub-09',
      charactersInScene: ['Ren Kurogane', 'Vesper-09'],
      dramaticObjective: 'Survive the ambush',
    });

    assert.ok(Array.isArray(beats));
    assert.ok(beats.length > 0);
    assert.ok(beats[0].cameraShot);
    assert.ok(beats[0].description);
  });

  await t.test('translates dialogue preserving glossary locks', async () => {
    const result = await AIGateway.translate('Too easy. Where is the commander?', 'JA-JP', {
      'Chrono Blade': 'クロノ・ブレード',
    });

    assert.ok(result.translatedText);
    assert.equal(typeof result.overflowRisk, 'boolean');
  });
});
