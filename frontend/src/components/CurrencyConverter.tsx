"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeftRight, RefreshCw } from "lucide-react";

const RATES: Record<string, number> = {
  USD: 1, EUR: 0.92, GBP: 0.79, INR: 83.12, BRL: 5.05, JPY: 149.50, AUD: 1.53, CAD: 1.36, CHF: 0.88, SGD: 1.34,
};

const CURRENCIES = Object.keys(RATES);

export default function CurrencyConverter() {
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [amount, setAmount] = useState("100");
  const [swapped, setSwapped] = useState(false);

  const converted = (parseFloat(amount) || 0) * (RATES[to] / RATES[from]);

  const handleSwap = () => {
    setFrom(to); setTo(from); setSwapped(!swapped);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass rounded-2xl p-6 border border-cyan-500/20 w-full"
    >
      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <ArrowLeftRight className="w-5 h-5 text-cyan-400" /> Currency Converter
      </h3>

      <div className="space-y-4">
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="text-xs text-gray-500 mb-1 block">Amount</label>
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="w-full glass-input rounded-xl py-2.5 px-3 text-sm text-white" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <select value={from} onChange={e => setFrom(e.target.value)} className="flex-1 glass-input rounded-xl py-2.5 px-3 text-sm text-white appearance-none cursor-pointer">
            {CURRENCIES.map(c => <option key={c} value={c} className="bg-gray-900">{c}</option>)}
          </select>
          <button onClick={handleSwap} className="p-2 rounded-full hover:bg-white/5 transition-colors">
            <RefreshCw className={`w-4 h-4 text-cyan-400 transition-transform ${swapped ? 'rotate-180' : ''}`} />
          </button>
          <select value={to} onChange={e => setTo(e.target.value)} className="flex-1 glass-input rounded-xl py-2.5 px-3 text-sm text-white appearance-none cursor-pointer">
            {CURRENCIES.map(c => <option key={c} value={c} className="bg-gray-900">{c}</option>)}
          </select>
        </div>

        <motion.div
          key={`${from}-${to}-${amount}`}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center py-4 rounded-xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-white/5"
        >
          <p className="text-2xl font-black text-white">
            {parseFloat(amount) ? `${parseFloat(amount).toFixed(2)} ${from}` : "0"}{" "}
            <span className="text-gray-500 text-lg">=</span>{" "}
            {converted.toFixed(2)} {to}
          </p>
          <p className="text-[10px] text-gray-500 mt-1">Rate: 1 {from} = {(RATES[to] / RATES[from]).toFixed(4)} {to}</p>
        </motion.div>
      </div>
    </motion.div>
  );
}
