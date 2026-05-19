"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Mail, Lock } from "lucide-react";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AuthModal({ open, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="glass border border-white/10 rounded-3xl w-full max-w-md p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/20 blur-3xl rounded-full" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/20 blur-3xl rounded-full" />

            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white z-10 transition-colors">
              <X className="w-5 h-5" />
            </button>

            <div className="relative z-10">
              <h2 className="text-3xl font-extrabold text-white mb-2">{mode === 'signin' ? 'Welcome Back' : 'Create Account'}</h2>
              <p className="text-gray-400 text-sm mb-6">{mode === 'signin' ? 'Sign in to access your flight predictions.' : 'Join Voyage Analytics today.'}</p>

              <form className="space-y-4" onSubmit={e => { e.preventDefault(); alert(mode === 'signin' ? 'Signed in!' : 'Account created!'); onClose(); }}>
                {mode === 'signup' && (
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1 ml-1">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input type="text" required placeholder="John Doe" className="w-full glass-input rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder:text-gray-600 focus:ring-1 focus:ring-cyan-500" />
                    </div>
                  </div>
                )}
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1 ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input type="email" required placeholder="john@example.com" className="w-full glass-input rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder:text-gray-600 focus:ring-1 focus:ring-cyan-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1 ml-1">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input type="password" required placeholder="••••••••" className="w-full glass-input rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder:text-gray-600 focus:ring-1 focus:ring-cyan-500" />
                  </div>
                </div>
                <button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-xl py-3 mt-4 font-bold text-sm transition-all shadow-lg shadow-cyan-500/25">
                  {mode === 'signin' ? 'Sign In' : 'Sign Up'}
                </button>
              </form>

              <div className="mt-6 text-center text-sm text-gray-400">
                {mode === 'signin' ? "Don't have an account? " : "Already have an account? "}
                <button onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')} className="text-cyan-400 hover:text-white font-bold transition-colors">
                  {mode === 'signin' ? 'Sign Up' : 'Sign In'}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
