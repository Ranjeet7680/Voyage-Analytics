"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Building, Sparkles } from "lucide-react";

type Hotel = {
  name: string;
  price_per_night: number;
  rating: number;
  match: number;
};

const HOTEL_DB: Record<string, Hotel[]> = {
  "Rio de Janeiro (RJ)": [
    { name: "Copacabana Palace", price_per_night: 850, rating: 4.8, match: 96 },
    { name: "Hotel Nacional Rio", price_per_night: 520, rating: 4.5, match: 88 },
    { name: "Ipanema Beach House", price_per_night: 390, rating: 4.2, match: 82 },
  ],
  "Florianopolis (SC)": [
    { name: "Costão do Santinho", price_per_night: 720, rating: 4.7, match: 94 },
    { name: "Jurerê Beach Village", price_per_night: 580, rating: 4.4, match: 87 },
    { name: "Lagoa Eco Lodge", price_per_night: 310, rating: 4.1, match: 79 },
  ],
  "Salvador (BH)": [
    { name: "Pestana Convento do Carmo", price_per_night: 640, rating: 4.6, match: 91 },
    { name: "Hotel Deville Salvador", price_per_night: 380, rating: 4.3, match: 84 },
    { name: "Pelourinho Boutique", price_per_night: 260, rating: 4.0, match: 76 },
  ],
};

export default function HotelSearch() {
  const [hotelDestination, setHotelDestination] = useState("Rio de Janeiro (RJ)");
  const [hotelLoading, setHotelLoading] = useState(false);
  const [hotelResults, setHotelResults] = useState<Hotel[] | null>(null);
  const [checkedIn, setCheckedIn] = useState(false);

  const handleHotelSearch = async () => {
    setHotelLoading(true);
    setHotelResults(null);
    await new Promise(r => setTimeout(r, 800));
    const results = HOTEL_DB[hotelDestination] || [];
    setHotelResults(results);
    setCheckedIn(!!checkedIn);
    setHotelLoading(false);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative col-span-1">
          <label className="block text-xs font-medium text-gray-400 mb-1 text-left ml-1">Destination</label>
          <select value={hotelDestination} onChange={e => setHotelDestination(e.target.value)} className="w-full glass-input rounded-xl py-3 px-4 text-sm text-white appearance-none cursor-pointer">
            {Object.keys(HOTEL_DB).map(city => (
              <option key={city} value={city} className="bg-gray-900">{city}</option>
            ))}
          </select>
        </div>
        <div className="relative col-span-1">
          <label className="block text-xs font-medium text-gray-400 mb-1 text-left ml-1">Check-in</label>
          <input type="date" className="w-full glass-input rounded-xl py-3 px-4 text-sm text-gray-400 bg-transparent" />
        </div>
        <div className="relative col-span-1">
          <label className="block text-xs font-medium text-gray-400 mb-1 text-left ml-1">Guests</label>
          <select className="w-full glass-input rounded-xl py-3 px-4 text-sm text-white appearance-none cursor-pointer">
            <option value="1" className="bg-gray-900">1 Guest</option>
            <option value="2" className="bg-gray-900">2 Guests, 1 Room</option>
            <option value="3" className="bg-gray-900">3 Guests, 2 Rooms</option>
          </select>
        </div>
        <div className="col-span-1 flex items-end">
          <button onClick={handleHotelSearch} disabled={hotelLoading} className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 disabled:opacity-50 text-white rounded-xl py-3 px-4 flex items-center justify-center gap-2 font-bold text-sm transition-all shadow-lg shadow-blue-500/25">
            {hotelLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Building className="w-4 h-4" /> Find Stays</>}
          </button>
        </div>
      </div>

      {hotelResults && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="md:col-span-3 mb-2 flex items-center gap-2 border-b border-white/10 pb-4">
            <Sparkles className="w-5 h-5 text-blue-400" />
            <h3 className="text-xl font-bold text-white">Top AI Recommendations for {hotelDestination}</h3>
          </div>
          {hotelResults.map((hotel, idx) => (
            <div key={idx} className="glass p-5 rounded-2xl border border-blue-500/20 hover:border-blue-400/50 transition-colors">
              <h4 className="text-lg font-bold text-white mb-2">{hotel.name}</h4>
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-black text-blue-400">R$ {hotel.price_per_night}</span>
                <span className="text-xs text-gray-400 uppercase tracking-wide">/ night</span>
              </div>
              <div className="flex justify-between items-center text-sm border-t border-white/10 pt-4 mt-2">
                <span className="text-yellow-400 font-bold">⭐ {hotel.rating.toFixed(1)}/5.0</span>
                <span className="text-green-400 font-medium">{hotel.match}% AI Match</span>
              </div>
            </div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
