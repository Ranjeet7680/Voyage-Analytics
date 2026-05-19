"use client";
import { motion } from "framer-motion";
import { Database, Cpu, LineChart, Globe, ArrowDown } from "lucide-react";

const STEPS = [
  { icon: Database, label: "Data Collection", desc: "270k+ flight records, hotel data, user profiles", color: "#00D9FF" },
  { icon: Cpu, label: "ML Training", desc: "Random Forest Regressor with OneHot encoding", color: "#7C3AED" },
  { icon: Globe, label: "Flask API", desc: "REST endpoints for predictions & search", color: "#00D9FF" },
  { icon: LineChart, label: "Frontend UI", desc: "Next.js 16 with Framer Motion & Tailwind v4", color: "#7C3AED" },
];

export default function Architecture() {
  return (
    <section className="relative z-10 w-full py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-extrabold text-white mb-4">
            Project <span className="text-gradient">Architecture</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">End-to-end ML pipeline powering intelligent travel insights.</p>
        </motion.div>

        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Connector line */}
          <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-[#00D9FF] via-[#7C3AED] to-[#00D9FF] opacity-30" />

          {STEPS.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 flex items-center justify-center mb-4 relative z-10 shadow-lg">
                <step.icon className="w-7 h-7" style={{ color: step.color }} />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">{step.label}</h4>
              <p className="text-xs text-gray-400 max-w-[200px]">{step.desc}</p>
              {i < STEPS.length - 1 && (
                <ArrowDown className="w-5 h-5 text-gray-600 mt-4 md:hidden animate-bounce" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
