"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface HeroProps {
  onOpenChat: () => void;
}

export default function Hero({ onOpenChat }: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const fullText = "Predict. Plan. Fly Smarter.";

  // Typewriter effect
  useEffect(() => {
    let idx = 0;
    const interval = setInterval(() => {
      idx++;
      setDisplayText(fullText.slice(0, idx));
      if (idx >= fullText.length) clearInterval(interval);
    }, 60);
    return () => clearInterval(interval);
  }, []);

  // Blinking cursor
  useEffect(() => {
    const blink = setInterval(() => setShowCursor((c) => !c), 530);
    return () => clearInterval(blink);
  }, []);

  // Flight paths animation on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = 500; };
    resize();
    window.addEventListener("resize", resize);

    interface FlightPath {
      startX: number; startY: number; endX: number; endY: number; progress: number; speed: number;
      opacity: number; phase: number;
    }

    const paths: FlightPath[] = [];
    for (let i = 0; i < 6; i++) {
      paths.push({
        startX: Math.random() * canvas.width,
        startY: Math.random() * canvas.height * 0.4 + 50,
        endX: Math.random() * canvas.width,
        endY: Math.random() * canvas.height * 0.4 + 50,
        progress: Math.random(),
        speed: 0.002 + Math.random() * 0.004,
        opacity: 0.1 + Math.random() * 0.2,
        phase: Math.random() * Math.PI * 2,
      });
    }

    let planeX = 0;
    let animId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw dotted flight paths
      for (const p of paths) {
        p.progress += p.speed;
        if (p.progress > 1) {
          p.progress = 0;
          p.startX = Math.random() * canvas.width;
          p.startY = Math.random() * canvas.height * 0.4 + 50;
          p.endX = Math.random() * canvas.width;
          p.endY = Math.random() * canvas.height * 0.4 + 50;
        }

        const x = p.startX + (p.endX - p.startX) * p.progress;
        const y = p.startY + (p.endY - p.startY) * p.progress + Math.sin(p.progress * Math.PI + p.phase) * 15;

        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 217, 255, ${p.opacity})`;
        ctx.fill();

        // Dash line behind
        ctx.beginPath();
        ctx.setLineDash([4, 6]);
        ctx.moveTo(p.startX, p.startY);
        ctx.lineTo(p.endX, p.endY + Math.sin(p.progress * Math.PI + p.phase) * 15);
        ctx.strokeStyle = `rgba(0, 217, 255, ${p.opacity * 0.3})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Moving plane across screen
      planeX += 0.8;
      if (planeX > canvas.width + 50) planeX = -50;
      const planeY = canvas.height / 2 + Math.sin(planeX * 0.005) * 20;

      ctx.save();
      ctx.translate(planeX, planeY);
      ctx.rotate(0.05);
      ctx.fillStyle = "#00D9FF";
      ctx.shadowColor = "#00D9FF";
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.moveTo(12, 0);
      ctx.lineTo(-8, -4);
      ctx.lineTo(-5, 0);
      ctx.lineTo(-8, 4);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <section className="relative z-10 text-center w-full overflow-hidden">
      {/* Animated background canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-60" style={{ height: "500px" }} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 px-4 pt-32 pb-8"
      >
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          onClick={onOpenChat}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass mb-8 cursor-pointer hover:bg-white/10 transition-all border-[#00D9FF]/30 border group"
        >
          <Sparkles className="w-4 h-4 text-[#00D9FF] group-hover:rotate-12 transition-transform" />
          <span className="text-sm font-medium text-blue-50 font-sora">AI-Powered Travel Intelligence Platform</span>
        </motion.button>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight leading-tight min-h-[1.2em]"
        >
          {displayText}
          <span className={`inline-block w-[3px] h-[0.8em] bg-[#00D9FF] ml-1 align-middle transition-opacity ${showCursor ? "opacity-100" : "opacity-0"}`} />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto font-sora"
        >
          Experience the future of travel booking. Real-time flight predictions, personalized AI recommendations, and seamless global exploration.
        </motion.p>

        {/* Gradient separator */}
        <div className="w-24 h-1 bg-gradient-to-r from-[#00D9FF] to-[#7C3AED] rounded-full mx-auto opacity-50" />
      </motion.div>
    </section>
  );
}
