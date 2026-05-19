"use client";
import { motion } from "framer-motion";
import { Plane, Globe, Cpu } from "lucide-react";
import { useState, useEffect } from "react";

const LOADING_STEPS = [
  { text: "Initializing AI Travel Intelligence...", pct: 15 },
  { text: "Loading neural networks...", pct: 30 },
  { text: "Syncing global flight metrics...", pct: 48 },
  { text: "Calibrating prediction models...", pct: 62 },
  { text: "Connecting to data clusters...", pct: 78 },
  { text: "Running diagnostics...", pct: 90 },
  { text: "Ready for takeoff!", pct: 100 },
];

export default function Loader() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => {
        if (prev >= LOADING_STEPS.length - 1) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 400);
    return () => clearInterval(interval);
  }, []);

  const current = LOADING_STEPS[step];
  const showSecondPlane = step >= 2;

  return (
    <div className="min-h-screen bg-[#0B1026] flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00D9FF] rounded-full mix-blend-screen filter blur-[150px] opacity-10 animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#7C3AED] rounded-full mix-blend-screen filter blur-[100px] opacity-20" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative flex flex-col items-center gap-8 z-10"
      >
        {/* Animated Globe with Orbiting Planes */}
        <div className="relative w-52 h-52">
          {/* Globe rings */}
          <div className="absolute inset-0 rounded-full border border-[#00D9FF]/20 animate-[spin_8s_linear_infinite]" />
          <div className="absolute inset-2 rounded-full border border-[#7C3AED]/20 animate-[spin_12s_linear_infinite_reverse]" />
          <div className="absolute inset-4 rounded-full border border-cyan-500/10" />
          
          {/* Globe icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Globe className="w-28 h-28 text-[#00D9FF]/30" />
          </div>

          {/* Orbiting Plane 1 */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute w-full h-full"
            style={{ originX: "50%", originY: "50%" }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <Plane className="w-7 h-7 text-[#00D9FF] rotate-[-30deg]" />
            </div>
          </motion.div>

          {/* Orbiting Plane 2 */}
          {showSecondPlane && (
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="absolute w-full h-full"
              style={{ originX: "50%", originY: "50%" }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Plane className="w-6 h-6 text-[#7C3AED] rotate-[30deg]" />
              </div>
            </motion.div>
          )}

          {/* Scanning line */}
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <motion.div
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-full h-0.5 bg-gradient-to-r from-transparent via-[#7C3AED] to-transparent shadow-[0_0_15px_#7C3AED]"
            />
          </div>
        </div>

        {/* Status Text */}
        <div className="flex flex-col items-center gap-3 text-center">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-[#00D9FF] font-sora font-bold tracking-widest text-sm uppercase"
          >
            <Cpu className="w-4 h-4 animate-pulse" />
            {current.text}
            <span className="text-white">{current.pct}%</span>
          </motion.div>

          {/* Progress Bar */}
          <div className="w-64 h-1.5 rounded-full bg-white/5 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#00D9FF] to-[#7C3AED]"
              initial={{ width: 0 }}
              animate={{ width: `${current.pct}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>

          <p className="text-gray-500 text-xs tracking-wider">Voyage Analytics v2.0</p>
        </div>
      </motion.div>
    </div>
  );
}
