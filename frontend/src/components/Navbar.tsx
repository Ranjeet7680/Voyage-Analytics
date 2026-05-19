"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plane, Sparkles, Menu, X } from "lucide-react";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onSignIn: () => void;
  onSignUp: () => void;
  onOpenChat: () => void;
}

export default function Navbar({ activeTab, setActiveTab, onSignIn, onSignUp, onOpenChat }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { id: "flights", label: "Flights", icon: Plane },
    { id: "hotels", label: "Hotels", icon: null },
    { id: "ai", label: "AI Planner", icon: Sparkles },
    { id: "mlops", label: "MLOps", icon: null },
    { id: "team", label: "Team", icon: null },
  ];

  const handleNavClick = (id: string) => {
    setMobileOpen(false);
    if (id === "ai") { onOpenChat(); setActiveTab("ai"); return; }
    if (id === "team") { document.getElementById("team")?.scrollIntoView({ behavior: "smooth" }); setActiveTab(id); return; }
    setActiveTab(id);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled
          ? "bg-[#0B1026]/80 backdrop-blur-2xl border-b border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#00D9FF] to-[#7C3AED] flex items-center justify-center shadow-[0_0_20px_rgba(0,217,255,0.3)] group-hover:shadow-[0_0_30px_rgba(0,217,255,0.5)] transition-shadow">
              <Plane className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              <span className="text-white">Voyage</span>
              <span className="text-gradient">Analytics</span>
            </span>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === item.id
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {activeTab === item.id && (
                  <motion.div
                    layoutId="navPill"
                    className="absolute inset-0 bg-white/10 rounded-full border border-white/10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  {item.icon && <item.icon className="w-3.5 h-3.5" />}
                  {item.label}
                </span>
              </button>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button onClick={onSignIn} className="text-sm font-medium text-gray-300 hover:text-white transition-colors px-4 py-2">
              Sign In
            </button>
            <button onClick={onSignUp} className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00D9FF] to-[#7C3AED] rounded-full blur opacity-60 group-hover:opacity-100 transition-opacity" />
              <div className="relative px-5 py-2 bg-[#0B1026] rounded-full text-sm font-bold text-white">
                Sign Up
              </div>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-white p-2">
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/5 bg-[#0B1026]/95 backdrop-blur-2xl overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    activeTab === item.id ? "bg-white/10 text-[#00D9FF]" : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {item.icon && <item.icon className="w-4 h-4" />}
                    {item.label}
                  </span>
                </button>
              ))}
              <hr className="border-white/5 my-2" />
              <button onClick={onSignIn} className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-gray-300 hover:bg-white/5">Sign In</button>
              <button onClick={onSignUp} className="w-full text-left px-4 py-3 rounded-xl text-sm font-bold text-[#00D9FF] hover:bg-white/5">Sign Up</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
