import test from 'node:test';
import assert from 'node:assert/strict';
import { AdminService } from '../server/services/adminService.js';

test('Admin Back-Office Service - Verification of KPIs, RBAC & Transactional Attachment', async (t) => {
  await t.test('computes dashboard metrics matching the exact specification', () => {
    const dash = AdminService.getDashboard('30_DAYS');
    
    // Exact spec values
    assert.equal(dash.kpis.inscriptions.value, 6500);
    assert.equal(dash.kpis.abonnementsVendus.value, 136);
    assert.equal(dash.kpis.revenuEncaisse.value, 915966);
    assert.equal(dash.kpis.conversionInscrits.value, 1.9);

    // Cohort conversion formula: 124 distinct buyers / 6500 signups = 1.907% -> 1.9%
    assert.equal(dash.kpis.conversionInscrits.cohortBuyers, 124);
    assert.equal(dash.kpis.conversionInscrits.cohortSignups, 6500);

    // Secondary counters
    assert.equal(dash.secondaryCounters.invitationsCreees.value, 4326);
    assert.equal(dash.secondaryCounters.abonnesActifsAujourdhui.value, 103);
    assert.equal(dash.secondaryCounters.comptesTotaux.value, 6500);
    assert.equal(dash.secondaryCounters.comptesActifs.value, 6464);
    assert.equal(dash.secondaryCounters.tauxReponse.value, 88);

    // Ventes par forfait consistency
    const totalVendus = dash.ventesParForfait.reduce((acc: number, p: any) => acc + p.vendus, 0);
    const totalEncaisse = dash.ventesParForfait.reduce((acc: number, p: any) => acc + p.montantEncaisseXaf, 0);
    const totalActifs = dash.ventesParForfait.reduce((acc: number, p: any) => acc + p.actifs, 0);

    assert.equal(totalVendus, 136, 'Sum of plan sales must equal 136');
    assert.equal(totalEncaisse, 915966, 'Sum of plan revenue must equal 915 966 F CFA');
    assert.equal(totalActifs, 103, 'Sum of active subscribers must equal 103');
  });

  await t.test('suspends and reactivates user with mandatory audit trail', () => {
    const user = AdminService.getUsers('fan88@gmail.com')[0];
    assert.ok(user);
    assert.equal(user.status, 'ACTIVE');

    // Suspend
    const suspended = AdminService.toggleUserStatus(user.id, 'Violation de test automatisée', 'admin@waza.zone');
    assert.equal(suspended.status, 'SUSPENDED');
    assert.equal(suspended.suspensionReason, 'Violation de test automatisée');

    // Reactivate
    const reactivated = AdminService.toggleUserStatus(user.id, 'Rétablissement de test', 'admin@waza.zone');
    assert.equal(reactivated.status, 'ACTIVE');
    assert.equal(reactivated.suspensionReason, undefined);

    // Verify audit log entry
    const audits = AdminService.getAuditLogs();
    assert.ok(audits.some((a) => a.targetId === user.id && a.action === 'REACTIVATE_USER'));
  });

  await t.test('transactionally attaches unmatched SasPay payment to user', () => {
    const unmatched = AdminService.getUnmatchedPayments().find((p) => p.id === 'unm_sas_001');
    assert.ok(unmatched);

    const user = AdminService.getUsers('ren.ronin')[0];
    assert.ok(user);
    const initialSpent = user.totalSpentXaf;

    const attached = AdminService.attachPayment('unm_sas_001', user.id, 'admin@waza.zone');
    assert.equal(attached.matchedUserId, user.id);
    assert.ok(attached.matchedAt);

    // Cannot attach twice
    assert.throws(() => {
      AdminService.attachPayment('unm_sas_001', user.id, 'admin@waza.zone');
    }, /déjà rattaché/);

    assert.equal(user.totalSpentXaf, initialSpent + attached.amountXaf);
  });

  await t.test('resolves moderation case and updates pending count', () => {
    const initialPending = AdminService.getPendingModerationCount();
    assert.ok(initialPending > 0);

    const targetCase = AdminService.getModerationCases().find((c) => c.status === 'PENDING');
    assert.ok(targetCase);

    const resolved = AdminService.resolveModerationCase(targetCase.id, 'RESOLVE', 'Contenu certifié conforme', 'mod@waza.zone');
    assert.equal(resolved.status, 'RESOLVED');
    assert.equal(resolved.decisionNote, 'Contenu certifié conforme');

    const newPending = AdminService.getPendingModerationCount();
    assert.equal(newPending, initialPending - 1);
  });
});
