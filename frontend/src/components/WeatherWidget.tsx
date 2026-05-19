"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Cloud, Sun, CloudRain, Wind, Droplets, type LucideIcon } from "lucide-react";

type Weather = {
  temp: number;
  condition: string;
  humidity: number;
  wind: number;
  icon: LucideIcon;
};

const WEATHER_DATA: Record<string, Weather> = {
  "Rio de Janeiro (RJ)": { temp: 32, condition: "Sunny", humidity: 65, wind: 12, icon: Sun },
  "Sao Paulo (SP)": { temp: 28, condition: "Partly Cloudy", humidity: 72, wind: 8, icon: Cloud },
  "Florianopolis (SC)": { temp: 26, condition: "Cloudy", humidity: 80, wind: 15, icon: CloudRain },
  "Salvador (BH)": { temp: 30, condition: "Sunny", humidity: 70, wind: 10, icon: Sun },
  "Recife (PE)": { temp: 31, condition: "Sunny", humidity: 68, wind: 9, icon: Sun },
  "Brasilia (DF)": { temp: 27, condition: "Clear", humidity: 45, wind: 6, icon: Sun },
};

export default function WeatherWidget() {
  const [city, setCity] = useState("Rio de Janeiro (RJ)");
  const weather = WEATHER_DATA[city] || WEATHER_DATA["Rio de Janeiro (RJ)"];
  const Icon = weather.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass rounded-2xl p-6 border border-cyan-500/20 w-full"
    >
      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <Cloud className="w-5 h-5 text-cyan-400" /> Destination Weather
      </h3>

      <select value={city} onChange={e => setCity(e.target.value)} className="w-full glass-input rounded-xl py-2.5 px-3 text-sm text-white appearance-none cursor-pointer mb-4">
        {Object.keys(WEATHER_DATA).map(c => (
          <option key={c} value={c} className="bg-gray-900">{c}</option>
        ))}
      </select>

      <div className="rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-white/5 p-5 text-center">
        <Icon className="w-16 h-16 mx-auto mb-2 text-yellow-400" />
        <p className="text-4xl font-black text-white">{weather.temp}°C</p>
        <p className="text-sm text-gray-400 mb-4">{weather.condition}</p>

        <div className="flex justify-center gap-6 text-sm">
          <div className="flex items-center gap-1.5 text-gray-400">
            <Droplets className="w-4 h-4 text-blue-400" />
            <span>{weather.humidity}%</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-400">
            <Wind className="w-4 h-4 text-cyan-400" />
            <span>{weather.wind} km/h</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
