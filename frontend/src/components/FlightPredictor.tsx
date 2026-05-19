"use client";
import { motion } from "framer-motion";
import { Search, ArrowRight, CheckCircle } from "lucide-react";

interface FlightPredictorProps {
  source: string;
  setSource: (v: string) => void;
  destination: string;
  setDestination: (v: string) => void;
  flightClass: string;
  setFlightClass: (v: string) => void;
  agency: string;
  setAgency: (v: string) => void;
  loading: boolean;
  prediction: number | null;
  onPredict: () => void;
}

export default function FlightPredictor({
  source, setSource, destination, setDestination,
  flightClass, setFlightClass, agency, setAgency,
  loading, prediction, onPredict,
}: FlightPredictorProps) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="relative col-span-1">
          <label className="block text-xs font-medium text-gray-400 mb-1 text-left ml-1">Source City</label>
          <select value={source} onChange={e => setSource(e.target.value)} className="w-full glass-input rounded-xl py-3 px-4 text-sm text-white appearance-none cursor-pointer">
            <option value="Recife (PE)" className="bg-gray-900">Recife (PE)</option>
            <option value="Brasilia (DF)" className="bg-gray-900">Brasilia (DF)</option>
            <option value="Sao Paulo (SP)" className="bg-gray-900">Sao Paulo (SP)</option>
            <option value="Rio de Janeiro (RJ)" className="bg-gray-900">Rio de Janeiro (RJ)</option>
          </select>
        </div>
        <div className="relative col-span-1">
          <label className="block text-xs font-medium text-gray-400 mb-1 text-left ml-1">Destination City</label>
          <select value={destination} onChange={e => setDestination(e.target.value)} className="w-full glass-input rounded-xl py-3 px-4 text-sm text-white appearance-none cursor-pointer">
            <option value="Sao Paulo (SP)" className="bg-gray-900">Sao Paulo (SP)</option>
            <option value="Rio de Janeiro (RJ)" className="bg-gray-900">Rio de Janeiro (RJ)</option>
            <option value="Florianopolis (SC)" className="bg-gray-900">Florianopolis (SC)</option>
            <option value="Salvador (BH)" className="bg-gray-900">Salvador (BH)</option>
          </select>
        </div>
        <div className="relative col-span-1">
          <label className="block text-xs font-medium text-gray-400 mb-1 text-left ml-1">Flight Class</label>
          <select value={flightClass} onChange={e => setFlightClass(e.target.value)} className="w-full glass-input rounded-xl py-3 px-4 text-sm text-white appearance-none cursor-pointer">
            <option value="economic" className="bg-gray-900">Economic</option>
            <option value="premium" className="bg-gray-900">Premium</option>
            <option value="firstClass" className="bg-gray-900">First Class</option>
          </select>
        </div>
        <div className="relative col-span-1">
          <label className="block text-xs font-medium text-gray-400 mb-1 text-left ml-1">Agency</label>
          <select value={agency} onChange={e => setAgency(e.target.value)} className="w-full glass-input rounded-xl py-3 px-4 text-sm text-white appearance-none cursor-pointer">
            <option value="CloudFy" className="bg-gray-900">CloudFy</option>
            <option value="FlyingDrops" className="bg-gray-900">FlyingDrops</option>
            <option value="Rainbow" className="bg-gray-900">Rainbow</option>
          </select>
        </div>
        <div className="col-span-1 lg:col-span-1 flex items-end">
          <button onClick={onPredict} disabled={loading} className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl py-3 px-4 flex items-center justify-center gap-2 font-bold text-sm transition-all shadow-lg shadow-cyan-500/25">
            {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Search className="w-4 h-4" /> Predict Price</>}
          </button>
        </div>
      </div>

      {prediction !== null && (
        <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-cyan-900/40 to-blue-900/40 border border-cyan-500/30 text-left flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/20 blur-3xl rounded-full" />
          <div className="flex-1 z-10">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-sm font-medium text-cyan-200">AI Prediction Engine</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{source} <ArrowRight className="inline w-5 h-5 mx-1 text-gray-400" /> {destination}</h3>
            <p className="text-gray-400 text-sm">Class: <span className="text-white capitalize">{flightClass}</span> | Agency: <span className="text-white">{agency}</span></p>
          </div>
          <div className="glass px-8 py-4 rounded-xl border border-cyan-500/20 flex flex-col items-center z-10">
            <span className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Predicted Fare</span>
            <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">R$ {prediction.toFixed(2)}</span>
            <span className="text-xs text-green-400 mt-1 font-medium">~ 85% Confidence</span>
          </div>
        </motion.div>
      )}
    </>
  );
}
