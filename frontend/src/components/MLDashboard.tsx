"use client";
import { motion } from "framer-motion";
import { TrendingUp, Calendar, AlertTriangle, MapPin } from "lucide-react";

const chartData = [
  { name: "Jan", demand: 65, cancellations: 12 },
  { name: "Feb", demand: 72, cancellations: 15 },
  { name: "Mar", demand: 85, cancellations: 10 },
  { name: "Apr", demand: 78, cancellations: 18 },
  { name: "May", demand: 90, cancellations: 22 },
  { name: "Jun", demand: 95, cancellations: 25 },
  { name: "Jul", demand: 88, cancellations: 20 },
  { name: "Aug", demand: 82, cancellations: 16 },
  { name: "Sep", demand: 76, cancellations: 13 },
  { name: "Oct", demand: 70, cancellations: 11 },
  { name: "Nov", demand: 68, cancellations: 9 },
  { name: "Dec", demand: 92, cancellations: 28 },
];

function BarChart({ data, color, label }: { data: number[]; color: string; label: string }) {
  const max = Math.max(...data);
  return (
    <div className="flex items-end gap-1 h-24">
      {data.map((v, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: `${(v / max) * 100}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
            className="w-full rounded-t relative cursor-pointer"
            style={{ background: `linear-gradient(to top, ${color}88, ${color})` }}
          >
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-black/60 px-1.5 py-0.5 rounded">
              {v}{label}
            </div>
          </motion.div>
        </div>
      ))}
    </div>
  );
}

function Heatmap() {
  const cities = ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador", "Fortaleza", "Recife", "Florianópolis", "Manaus"];
  const routes = cities.map((c, i) => ({
    city: c,
    value: [91, 84, 78, 73, 69, 82, 76, 65][i],
    routes: cities.filter((_, j) => j !== i).slice(0, 3),
  }));

  return (
    <div className="grid grid-cols-4 gap-2">
      {routes.map((r, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
          className="relative p-2 rounded-lg text-center overflow-hidden group cursor-pointer"
          style={{
            background: `linear-gradient(135deg, rgba(0,217,255,${r.value / 200}), rgba(124,58,237,${r.value / 200}))`,
          }}
        >
          <MapPin className="w-3 h-3 mx-auto mb-1 text-white/80" />
          <p className="text-[10px] font-bold text-white truncate">{r.city}</p>
          <p className="text-[9px] text-white/60">{r.value}% demand</p>
          <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors" />
        </motion.div>
      ))}
    </div>
  );
}

export default function MLDashboard() {
  return (
    <section className="relative z-10 w-full max-w-6xl mx-auto px-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-purple-500/30 mb-4">
          <TrendingUp className="w-4 h-4 text-purple-400" />
          <span className="text-xs font-bold text-purple-300 tracking-wider uppercase">ML Operations Dashboard</span>
        </div>
        <h2 className="text-4xl font-extrabold text-white mb-4">
          AI <span className="text-gradient">Insights</span>
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto">Real-time machine learning analytics powering your travel decisions.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Demand Prediction */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-6 border border-cyan-500/20"
        >
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg font-bold text-white">Seasonal Demand Prediction</h3>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mb-2">
            <span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span><span>Nov</span>
          </div>
          <BarChart data={chartData.map(d => d.demand)} color="#00D9FF" label="%" />
          <p className="text-xs text-gray-500 mt-3 text-center">Peak demand expected in June/July and December</p>
        </motion.div>

        {/* Cancellation Probability */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-6 border border-red-500/20"
        >
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <h3 className="text-lg font-bold text-white">Cancellation Probability</h3>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mb-2">
            <span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span><span>Nov</span>
          </div>
          <BarChart data={chartData.map(d => d.cancellations)} color="#EF4444" label="%" />
          <p className="text-xs text-gray-500 mt-3 text-center">Higher cancellation risk during holiday seasons</p>
        </motion.div>

        {/* Route Popularity Heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-6 border border-purple-500/20 lg:col-span-2"
        >
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-bold text-white">Route Popularity Heatmap</h3>
          </div>
          <Heatmap />
          <p className="text-xs text-gray-500 mt-3 text-center">Brighter = Higher demand. Top routes concentrated in coastal cities.</p>
        </motion.div>
      </div>
    </section>
  );
}
