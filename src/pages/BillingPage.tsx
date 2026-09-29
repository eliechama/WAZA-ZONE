import React, { useState } from 'react';
import { INITIAL_LEDGER_ENTRIES } from '../lib/mockData';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { CreditCard, Zap, Plus, ShieldCheck, History, CheckCircle2, DollarSign, ArrowUpRight } from 'lucide-react';

export const BillingPage: React.FC = () => {
  const [balance, setBalance] = useState(492);
  const [entries, setEntries] = useState(INITIAL_LEDGER_ENTRIES);
  const [selectedPack, setSelectedPack] = useState<{ credits: number; price: number } | null>(null);
  const [paymentProvider, setPaymentProvider] = useState<'STRIPE' | 'MONEROO' | 'CHARIOW'>('STRIPE');
  const [purchasing, setPurchasing] = useState(false);

  const handleBuyCredits = () => {
    if (!selectedPack) return;
    setPurchasing(true);

    setTimeout(() => {
      const newEntry = {
        id: `ledg-${Date.now()}`,
        workspaceId: 'ws-default',
        amount: selectedPack.credits,
        type: 'GRANT' as const,
        description: `Credit top-up via ${paymentProvider} (${selectedPack.credits} credits)`,
        createdAt: new Date().toISOString(),
        balanceAfter: balance + selectedPack.credits
      };

      setBalance(prev => prev + selectedPack.credits);
      setEntries([newEntry, ...entries]);
      setPurchasing(false);
      setSelectedPack(null);
    }, 1200);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="lime">IMMUTABLE CREDIT LEDGER</Badge>
            <span className="text-xs font-mono text-slate-400">• Financial FinOps Engine</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-1">Workspace Billing & Credits</h1>
          <p className="text-sm text-slate-400 mt-1">Transparent credit usage tracking, immutable transaction ledger, and top-up packages.</p>
        </div>

        <div className="p-4 rounded-2xl bg-[#11131A] border border-[#D8FF65]/40 flex items-center gap-4">
          <Zap className="w-8 h-8 text-[#D8FF65]" />
          <div>
            <div className="text-[10px] font-mono text-slate-400 uppercase">AVAILABLE BALANCE</div>
            <div className="text-2xl font-black text-white">{balance.toLocaleString()} <span className="text-xs font-normal text-[#D8FF65]">Credits</span></div>
          </div>
        </div>
      </div>

      {/* Credit Top-up Packages */}
      <div className="space-y-4">
        <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">TOP-UP CREDIT PACKAGES</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { credits: 250, price: 10, label: 'Starter Pack', rate: '$0.04 / credit' },
            { credits: 1000, price: 35, label: 'Creator Pack', rate: '$0.035 / credit', popular: true },
            { credits: 3500, price: 100, label: 'Studio Power Pack', rate: '$0.028 / credit' }
          ].map((pack, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl bg-[#11131A] border transition-all flex flex-col justify-between ${
                pack.popular
                  ? 'border-[#D8FF65] shadow-xl shadow-[#D8FF65]/5 bg-gradient-to-b from-[#11131A] to-[#161822]'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-extrabold text-white">{pack.label}</span>
                  {pack.popular && <Badge variant="lime">BEST VALUE</Badge>}
                </div>
                <div className="text-3xl font-black text-white my-3">
                  +{pack.credits.toLocaleString()} <span className="text-xs font-normal text-slate-400">Credits</span>
                </div>
                <p className="text-xs font-mono text-[#68E7FF]">{pack.rate}</p>
              </div>

              <button
                onClick={() => setSelectedPack(pack)}
                className="mt-6 w-full py-3 rounded-xl bg-[#D8FF65] text-[#090A0F] font-extrabold text-xs font-mono hover:bg-[#cbf54f] transition-all flex items-center justify-center gap-2"
              >
                <span>Buy for ${pack.price}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Ledger History Table */}
      <div className="bg-[#11131A] p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-xs font-mono text-[#D8FF65] font-bold">
            <History className="w-4 h-4" />
            <span>IMMUTABLE TRANSACTION LEDGER LOG</span>
          </div>
          <Badge variant="carbon">{entries.length} Ledger Records</Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-mono text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-500 uppercase text-[10px]">
                <th className="py-3 px-2">TRANSACTION ID</th>
                <th className="py-3 px-2">TYPE</th>
                <th className="py-3 px-2">DESCRIPTION</th>
                <th className="py-3 px-2">AMOUNT</th>
                <th className="py-3 px-2">BALANCE AFTER</th>
                <th className="py-3 px-2">TIMESTAMP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {entries.map((item) => (
                <tr key={item.id} className="hover:bg-[#090A0F]/50 transition-colors">
                  <td className="py-3 px-2 text-slate-400">{item.id}</td>
                  <td className="py-3 px-2">
                    <Badge variant={item.type === 'GRANT' ? 'lime' : item.type === 'REFUND' ? 'cyan' : 'carbon'}>
                      {item.type}
                    </Badge>
                  </td>
                  <td className="py-3 px-2">{item.description}</td>
                  <td className={`py-3 px-2 font-bold ${item.amount > 0 ? 'text-emerald-400' : 'text-slate-300'}`}>
                    {item.amount > 0 ? `+${item.amount}` : item.amount}
                  </td>
                  <td className="py-3 px-2 text-white font-bold">{item.balanceAfter}</td>
                  <td className="py-3 px-2 text-slate-500 text-[10px]">
                    {new Date(item.createdAt).toLocaleTimeString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Gateway Modal */}
      <Modal
        isOpen={!!selectedPack}
        onClose={() => setSelectedPack(null)}
        title="Checkout Credit Top-Up"
        subtitle={`Adding ${selectedPack?.credits} credits for $${selectedPack?.price}.`}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-2">SELECT PAYMENT PROVIDER</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'STRIPE', name: 'Stripe Global' },
                { id: 'MONEROO', name: 'Moneroo Africa' },
                { id: 'CHARIOW', name: 'Chariow Pay' }
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPaymentProvider(p.id as any)}
                  className={`p-3 rounded-xl border text-xs font-mono font-bold transition-all ${
                    paymentProvider === p.id
                      ? 'border-[#D8FF65] bg-[#D8FF65]/10 text-white'
                      : 'border-slate-800 bg-[#090A0F] text-slate-400'
                  }`}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 bg-[#090A0F] rounded-xl border border-slate-800 text-xs font-mono text-slate-400 space-y-1">
            <div className="flex justify-between">
              <span>Credits:</span>
              <span className="text-white font-bold">+{selectedPack?.credits}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Price:</span>
              <span className="text-[#D8FF65] font-bold">${selectedPack?.price}.00</span>
            </div>
            <div className="flex justify-between text-[10px] text-slate-500 pt-2 border-t border-slate-800">
              <span>Webhook Signature:</span>
              <span>HMAC-SHA256 Idempotency Key Active</span>
            </div>
          </div>

          <button
            onClick={handleBuyCredits}
            disabled={purchasing}
            className="w-full py-3.5 bg-[#D8FF65] text-[#090A0F] font-extrabold text-xs font-mono rounded-xl hover:bg-[#cbf54f] transition-all"
          >
            {purchasing ? 'Simulating Signed Webhook...' : `Pay $${selectedPack?.price} Now`}
          </button>
        </div>
      </Modal>
    </div>
  );
};
