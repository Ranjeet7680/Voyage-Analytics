"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Plane, Star, ExternalLink } from "lucide-react";

const DESTINATIONS = [
  { name: "Rio de Janeiro", country: "Brazil", desc: "Beaches & culture", rating: 4.8, flights: 1240, color: "#00D9FF" },
  { name: "São Paulo", country: "Brazil", desc: "Business hub", rating: 4.6, flights: 980, color: "#7C3AED" },
  { name: "Salvador", country: "Brazil", desc: "Colonial charm", rating: 4.5, flights: 670, color: "#00D9FF" },
  { name: "Florianópolis", country: "Brazil", desc: "Island paradise", rating: 4.7, flights: 520, color: "#7C3AED" },
  { name: "Brasília", country: "Brazil", desc: "Modern capital", rating: 4.3, flights: 430, color: "#00D9FF" },
  { name: "Fortaleza", country: "Brazil", desc: "Coastal gem", rating: 4.4, flights: 380, color: "#7C3AED" },
];

export default function InteractiveMap() {
  const [selected, setSelected] = useState<typeof DESTINATIONS[0] | null>(null);

  return (
    <section className="relative z-10 w-full py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-extrabold text-white mb-4">
            Explore <span className="text-gradient">Destinations</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">Click on a destination to see flight insights and travel data.</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {DESTINATIONS.map((d, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ scale: 1.05, y: -4 }}
              onClick={() => setSelected(selected?.name === d.name ? null : d)}
              className={`glass rounded-xl p-4 text-center border transition-all cursor-pointer ${
                selected?.name === d.name ? "border-[#00D9FF] shadow-[0_0_20px_rgba(0,217,255,0.3)]" : "border-white/5 hover:border-[#00D9FF]/30"
              }`}
            >
              <MapPin className="w-6 h-6 mx-auto mb-2" style={{ color: d.color }} />
              <h4 className="text-sm font-bold text-white truncate">{d.name}</h4>
              <p className="text-[10px] text-gray-500">{d.country}</p>
            </motion.button>
          ))}
        </div>

        <AnimatedDetailPanel selected={selected} />
      </div>
    </section>
  );
}

function AnimatedDetailPanel({ selected }: { selected: typeof DESTINATIONS[0] | null }) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: selected ? 1 : 0, height: selected ? "auto" : 0 }}
      transition={{ duration: 0.4 }}
      className="overflow-hidden"
    >
      {selected && (
        <div className="glass rounded-2xl p-6 border border-[#00D9FF]/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
                <MapPin className="w-8 h-8 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">{selected.name}</h3>
                <p className="text-gray-400">{selected.desc} · {selected.country}</p>
                <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                  <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-yellow-400" /> {selected.rating}</span>
                  <span className="flex items-center gap-1"><Plane className="w-3.5 h-3.5 text-cyan-400" /> {selected.flights.toLocaleString()} flights/mo</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full text-sm font-bold shadow-lg shadow-cyan-500/25 hover:scale-105 transition-transform">
                Predict Flights
              </button>
              <button className="p-2.5 glass rounded-full border border-white/10 hover:text-[#00D9FF] transition-colors text-gray-400">
                <ExternalLink className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
