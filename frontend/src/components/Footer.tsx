"use client";
import { Plane, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative z-10 w-full border-t border-white/5 bg-[#0B1026]/80 backdrop-blur-xl mt-20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#00D9FF] to-[#7C3AED] flex items-center justify-center">
                <Plane className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold">
                <span className="text-white">Voyage</span>
                <span className="text-gradient">Analytics</span>
              </span>
            </div>
            <p className="text-gray-500 text-sm max-w-md leading-relaxed">
              AI-powered travel intelligence platform. Predict flight prices, discover hotels, and plan smarter itineraries with machine learning.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Platform</h4>
            <ul className="space-y-2 text-sm">
              {["Flight Predictor", "Hotel Search", "AI Planner", "ML Dashboard"].map((item) => (
                <li key={item}><a href="#" className="text-gray-500 hover:text-[#00D9FF] transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Connect</h4>
            <div className="flex gap-3 mb-4">
              {[
                { label: "GitHub", path: "M12 0C5.373 0 0 5.372 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.628-5.373-12-12-12z" },
                { label: "LinkedIn", path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
                { label: "X", path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
              ].map((icon, i) => (
                <a key={i} href="#" aria-label={icon.label} className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#00D9FF]/20 hover:text-[#00D9FF] transition-all text-gray-400">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d={icon.path} /></svg>
                </a>
              ))}
            </div>
            <p className="text-xs text-gray-600">Built with <Heart className="w-3 h-3 inline text-red-400" /> by Voyage Team</p>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 text-center text-xs text-gray-600">
          <p>&copy; {new Date().getFullYear()} Voyage Analytics. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
