"use client";
import { motion } from "framer-motion";
import { User, Mail } from "lucide-react";

const TEAM = [
  { name: "Ranjeet Kumar", email: "rajranjeet7680@gmail.com", phone: "7992313898", role: "15 DEC DS / AIML", skills: ["Machine Learning", "Python", "Flask"] },
  { name: "Dhanush S", email: "dhanushs99777@gmail.com", phone: "9626755535", role: "15 DEC DS / AIML", skills: ["Data Science", "Analytics", "Pandas"] },
  { name: "Ansh Kheni", email: "anshkheni111@gmail.com", phone: "7016378452", role: "15 DEC AI / ML", skills: ["Deep Learning", "TensorFlow", "NLP"] },
  { name: "Sahil Thakur", email: "sahilthakur2953@gmail.com", phone: "8091717820", role: "1st DEC DS / AIML", skills: ["MLOps", "Deployment", "Docker"] },
];

function TiltCard({ member, index }: { member: typeof TEAM[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.6 }}
      className="group perspective-[1000px]"
    >
      <motion.div
        whileHover={{ rotateX: 5, rotateY: -5, z: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative preserve-3d"
      >
        {/* Glow border */}
        <div className="absolute -inset-[1px] bg-gradient-to-br from-[#00D9FF] via-[#7C3AED] to-[#00D9FF] rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500" />

        <div className="relative glass p-6 rounded-2xl border border-white/10 h-full flex flex-col group-hover:border-transparent transition-all duration-500 bg-[#0B1026]/80">
          {/* BG glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#00D9FF]/0 to-[#7C3AED]/0 group-hover:from-[#00D9FF]/10 group-hover:to-[#7C3AED]/10 transition-all rounded-2xl" />

          <div className="relative z-10 flex flex-col h-full items-center text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#00D9FF] to-[#7C3AED] p-[2px] mb-5 group-hover:scale-110 transition-transform mx-auto">
              <div className="w-full h-full rounded-full bg-[#0B1026] flex items-center justify-center">
                <User className="w-10 h-10 text-[#00D9FF]" />
              </div>
            </div>

            <h3 className="text-xl font-bold text-white mb-1 font-sora">{member.name}</h3>
            <p className="text-xs font-semibold text-[#00D9FF] mb-4 tracking-wider">{member.role}</p>

            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {member.skills.map((skill, idx) => (
                <span key={idx} className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-[#7C3AED]/20 text-[#7C3AED] border border-[#7C3AED]/30">
                  {skill}
                </span>
              ))}
            </div>

            <div className="mt-auto space-y-2 text-sm text-gray-400 w-full">
              <p className="flex items-center justify-center gap-2 truncate hover:text-white transition-colors cursor-pointer" title={member.email}>
                <Mail className="w-4 h-4 text-[#00D9FF] shrink-0" /> <span className="truncate">{member.email}</span>
              </p>
              <p className="flex items-center justify-center gap-2 hover:text-white transition-colors cursor-pointer">
                <span className="text-[#00D9FF] shrink-0">📞</span> {member.phone}
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 flex justify-center gap-4 w-full">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-[#00D9FF]/20 hover:text-[#00D9FF] transition-all text-gray-400 hover:scale-110">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-[#7C3AED]/20 hover:text-[#7C3AED] transition-all text-gray-400 hover:scale-110">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.628-5.373-12-12-12z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function TeamSection() {
  return (
    <section id="team" className="relative z-10 w-full max-w-6xl mx-auto px-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl font-extrabold text-white mb-4">
          Meet the <span className="text-gradient">Innovators</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto font-sora">
          The brains behind Voyage Analytics, blending Data Science, AI/ML, and Software Engineering.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {TEAM.map((member, i) => (
          <TiltCard key={i} member={member} index={i} />
        ))}
      </div>
    </section>
  );
}
