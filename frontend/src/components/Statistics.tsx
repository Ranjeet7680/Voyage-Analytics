"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Plane, Activity, Globe, TrendingUp } from "lucide-react";

const STATS = [
  { label: "Flights Analyzed", value: 271888, suffix: "+", icon: Plane, color: "#00D9FF" },
  { label: "Prediction Accuracy", value: 95, suffix: "%", icon: Activity, color: "#7C3AED" },
  { label: "Countries Covered", value: 50, suffix: "+", icon: Globe, color: "#00D9FF" },
  { label: "Happy Travelers", value: 10000, suffix: "+", icon: TrendingUp, color: "#7C3AED" },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const interval = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(interval);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export default function Statistics() {
  return (
    <section className="relative z-10 w-full py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6 text-center border border-white/5 hover:border-[#00D9FF]/30 transition-all group"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#00D9FF]/10 to-[#7C3AED]/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <stat.icon className="w-7 h-7" style={{ color: stat.color }} />
              </div>
              <div className="text-3xl md:text-4xl font-black text-white mb-1 font-sora">
                <Counter target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-sm text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
