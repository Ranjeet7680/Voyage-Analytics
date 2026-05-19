"use client";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const TESTIMONIALS = [
  { name: "Priya Sharma", role: "Business Traveler", quote: "Voyage Analytics saved me 40% on my last flight. The prediction accuracy is incredible!", rating: 5 },
  { name: "Rahul Verma", role: "Frequent Flyer", quote: "The AI planner suggested a Goa itinerary that was spot on. Best travel tool I've used.", rating: 5 },
  { name: "Ananya Patel", role: "Travel Blogger", quote: "The ML dashboard gives insights I've never seen before. A game changer for travel planning.", rating: 5 },
  { name: "Vikram Singh", role: "Digital Nomad", quote: "Real-time price predictions help me book at the right time. Highly recommended!", rating: 5 },
];

export default function Testimonials() {
  return (
    <section className="relative z-10 w-full py-20 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-extrabold text-white mb-4">
            What <span className="text-gradient">Travelers</span> Say
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">Join thousands of happy travelers using Voyage Analytics.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6 border border-white/5 hover:border-[#7C3AED]/30 transition-all group"
            >
              <Quote className="w-8 h-8 text-[#00D9FF]/30 mb-4 group-hover:text-[#00D9FF]/60 transition-colors" />
              <p className="text-gray-300 text-sm mb-6 leading-relaxed">{t.quote}</p>
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <span key={j} className="text-yellow-400 text-sm">★</span>
                ))}
              </div>
              <div className="border-t border-white/5 pt-4">
                <p className="text-white font-bold text-sm">{t.name}</p>
                <p className="text-gray-500 text-xs">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
