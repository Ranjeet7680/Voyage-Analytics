"use client";
import { motion } from "framer-motion";
import { Cpu, Database, Code2, Brain, Cloud, Shield } from "lucide-react";

const TECH = [
  { name: "Next.js 16", desc: "React framework", icon: Code2, color: "#00D9FF" },
  { name: "Python / Flask", desc: "ML API backend", icon: Cpu, color: "#7C3AED" },
  { name: "Scikit-Learn", desc: "Random Forest models", icon: Brain, color: "#00D9FF" },
  { name: "Pandas", desc: "Data preprocessing", icon: Database, color: "#7C3AED" },
  { name: "Docker", desc: "Container deployment", icon: Cloud, color: "#00D9FF" },
  { name: "TensorFlow", desc: "Deep learning", icon: Shield, color: "#7C3AED" },
];

export default function TechStack() {
  return (
    <section className="relative z-10 w-full py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-extrabold text-white mb-4">
            <span className="text-gradient">Tech Stack</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">Built with cutting-edge technologies for peak performance.</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {TECH.map((tech, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -5 }}
              className="glass rounded-xl p-5 text-center border border-white/5 hover:border-[#00D9FF]/30 transition-all group cursor-default"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-white/5 to-white/[0.02] flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <tech.icon className="w-6 h-6" style={{ color: tech.color }} />
              </div>
              <h4 className="text-sm font-bold text-white mb-0.5">{tech.name}</h4>
              <p className="text-[10px] text-gray-500">{tech.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
