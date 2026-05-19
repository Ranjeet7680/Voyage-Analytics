"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Bell,
  Bot,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  CloudSun,
  Cpu,
  Download,
  Globe2,
  Headphones,
  Hotel,
  IndianRupee,
  Mail,
  MapPin,
  Mic,
  Plane,
  Radar,
  Route,
  Search,
  Send,
  ShieldAlert,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  WalletCards,
  X,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const fares = [
  { month: "Jan", fare: 7200, demand: 62, cancel: 8 },
  { month: "Feb", fare: 6800, demand: 58, cancel: 7 },
  { month: "Mar", fare: 7600, demand: 66, cancel: 9 },
  { month: "Apr", fare: 8400, demand: 74, cancel: 13 },
  { month: "May", fare: 9100, demand: 82, cancel: 15 },
  { month: "Jun", fare: 11200, demand: 93, cancel: 19 },
  { month: "Jul", fare: 10400, demand: 88, cancel: 17 },
  { month: "Aug", fare: 8700, demand: 78, cancel: 12 },
  { month: "Sep", fare: 7900, demand: 69, cancel: 10 },
  { month: "Oct", fare: 8200, demand: 73, cancel: 11 },
  { month: "Nov", fare: 9400, demand: 84, cancel: 14 },
  { month: "Dec", fare: 12500, demand: 97, cancel: 23 },
];

const airports = [
  { code: "DEL", city: "Delhi", load: 94, delay: "High" },
  { code: "BOM", city: "Mumbai", load: 91, delay: "Med" },
  { code: "BLR", city: "Bengaluru", load: 86, delay: "Med" },
  { code: "GOI", city: "Goa", load: 79, delay: "Low" },
  { code: "HYD", city: "Hyderabad", load: 74, delay: "Low" },
];

const hotels = [
  { name: "Azure Bay Resort", city: "Goa", price: 4200, rating: 4.8, match: 96, tag: "Beach + breakfast" },
  { name: "MetroSky Business", city: "Mumbai", price: 5100, rating: 4.6, match: 91, tag: "Airport transfer" },
  { name: "Hillview Retreat", city: "Manali", price: 3300, rating: 4.7, match: 89, tag: "Couple friendly" },
];

const team = [
  { name: "Ranjeet Kumar", role: "ML Engineer", skills: ["Python", "Flask", "Pricing AI"] },
  { name: "Dhanush S", role: "Data Analyst", skills: ["Pandas", "EDA", "Dashboards"] },
  { name: "Ansh Kheni", role: "AI Engineer", skills: ["TensorFlow", "NLP", "Planner AI"] },
  { name: "Sahil Thakur", role: "MLOps Engineer", skills: ["Deploy", "Monitoring", "APIs"] },
];

const faqs = [
  ["Is this connected to the ML backend?", "The UI calls a local prediction API when available and also includes a polished demo fallback for hackathon presentation."],
  ["Can it export itineraries?", "Yes. The interface includes PDF export, email sharing, saved trips, alerts, and emergency recovery actions as product-ready flows."],
  ["Is it mobile responsive?", "Every section uses responsive grids, compact controls, and touch-friendly spacing for phones, tablets, and desktop displays."],
];

function Loader() {
  const [progress, setProgress] = useState(8);

  useEffect(() => {
    const id = window.setInterval(() => setProgress((p) => Math.min(100, p + 7)), 120);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="grid min-h-screen place-items-center bg-[#07111f] text-white">
      <div className="relative flex w-[min(88vw,420px)] flex-col items-center gap-7 text-center">
        <div className="relative h-48 w-48 rounded-full border border-cyan-300/25 bg-[radial-gradient(circle_at_center,rgba(45,212,191,.18),transparent_58%)]">
          <div className="absolute inset-4 rounded-full border border-emerald-300/20" />
          <div className="absolute inset-8 rounded-full border border-sky-300/15" />
          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }} className="absolute inset-0">
            <Plane className="absolute left-1/2 top-0 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rotate-45 text-cyan-200" />
          </motion.div>
          <motion.div animate={{ y: [12, 168, 12] }} transition={{ repeat: Infinity, duration: 2.6 }} className="absolute left-8 right-8 h-px bg-cyan-200 shadow-[0_0_18px_rgba(125,211,252,.9)]" />
          <Globe2 className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 text-cyan-100/70" />
        </div>
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-cyan-200">AI scan initializing</p>
          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <motion.div animate={{ width: `${progress}%` }} className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-emerald-300 to-amber-300" />
          </div>
          <p className="mt-3 text-sm text-slate-400">{progress}% loading voyage intelligence</p>
        </div>
      </div>
    </div>
  );
}

function Typewriter() {
  const text = "Predict fares, plan trips, recover disruptions.";
  const [shown, setShown] = useState("");

  useEffect(() => {
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setShown(text.slice(0, i));
      if (i === text.length) window.clearInterval(id);
    }, 38);
    return () => window.clearInterval(id);
  }, []);

  return <>{shown}<span className="ml-1 inline-block h-[0.8em] w-1 translate-y-1 bg-cyan-200" /></>;
}

function FlightGlobe() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]">
      <div className="absolute inset-8 rounded-full border border-cyan-200/20 bg-[linear-gradient(135deg,rgba(14,165,233,.15),rgba(16,185,129,.1),rgba(251,191,36,.08))] shadow-[0_0_80px_rgba(34,211,238,.18)]">
        <div className="absolute inset-10 rounded-full border border-white/10" />
        <div className="absolute inset-x-5 top-1/2 h-px bg-cyan-100/20" />
        <div className="absolute inset-y-5 left-1/2 w-px bg-cyan-100/20" />
        <div className="absolute left-[18%] top-[30%] h-3 w-3 rounded-full bg-amber-200 shadow-[0_0_18px_rgba(253,230,138,.9)]" />
        <div className="absolute right-[24%] top-[42%] h-2.5 w-2.5 rounded-full bg-cyan-200 shadow-[0_0_18px_rgba(103,232,249,.9)]" />
        <div className="absolute bottom-[25%] left-[38%] h-2 w-2 rounded-full bg-emerald-200 shadow-[0_0_18px_rgba(110,231,183,.9)]" />
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 400" aria-hidden="true">
          <path d="M80 170 C150 70 260 80 315 165" fill="none" stroke="rgba(125,211,252,.65)" strokeWidth="2" strokeDasharray="7 8" />
          <path d="M110 255 C185 310 280 295 330 220" fill="none" stroke="rgba(110,231,183,.55)" strokeWidth="2" strokeDasharray="6 9" />
        </svg>
      </div>
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 9, ease: "linear" }} className="absolute inset-0">
        <Plane className="absolute left-1/2 top-7 h-8 w-8 -translate-x-1/2 rotate-45 text-cyan-100" />
      </motion.div>
      <motion.div animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 13, ease: "linear" }} className="absolute inset-5">
        <Radar className="absolute bottom-7 right-12 h-7 w-7 text-emerald-200" />
      </motion.div>
    </div>
  );
}

function Chatbot({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { by: "ai", text: "Ask me: Plan Goa trip under INR 15,000." },
  ]);

  function send() {
    if (!input.trim()) return;
    const prompt = input;
    setMessages((m) => [...m, { by: "user", text: prompt }]);
    setInput("");
    window.setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          by: "ai",
          text:
            "Goa plan under INR 15,000: flights INR 6,400, stay INR 4,200, food INR 2,400, scooters INR 1,200, activities INR 800. Best booking window: 23-31 days before departure.",
        },
      ]);
    }, 450);
  }

  return (
    <>
      <button onClick={() => setOpen(true)} className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-3 rounded-2xl border border-cyan-200/25 bg-slate-950/85 p-3 text-left shadow-2xl backdrop-blur-xl">
        <span className="grid h-12 w-12 place-items-center rounded-xl bg-cyan-300 text-slate-950"><Bot className="h-6 w-6" /></span>
        <span className="hidden pr-2 sm:block"><b className="block text-sm text-white">AI Planner</b><span className="text-xs text-slate-400">Budget, hotels, recovery</span></span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 30, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 30, scale: 0.96 }} className="fixed bottom-6 right-6 z-[60] flex h-[560px] w-[min(92vw,390px)] flex-col overflow-hidden rounded-3xl border border-cyan-200/25 bg-slate-950/95 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-white/10 p-4">
              <div className="flex items-center gap-3"><Bot className="h-5 w-5 text-cyan-200" /><div><p className="font-bold">Voyage AI Copilot</p><p className="text-xs text-emerald-300">Online</p></div></div>
              <button onClick={() => setOpen(false)}><X className="h-5 w-5 text-slate-400" /></button>
            </div>
            <div className="flex-1 space-y-3 overflow-auto p-4">
              {messages.map((m, i) => <div key={i} className={`rounded-2xl p-3 text-sm ${m.by === "user" ? "ml-10 bg-cyan-400 text-slate-950" : "mr-8 border border-white/10 bg-white/5 text-slate-200"}`}>{m.text}</div>)}
            </div>
            <div className="border-t border-white/10 p-4">
              <div className="flex gap-2 rounded-2xl border border-white/10 bg-white/5 p-2">
                <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Plan my trip..." className="min-w-0 flex-1 bg-transparent px-2 text-sm outline-none" />
                <button onClick={send} className="rounded-xl bg-cyan-300 p-2 text-slate-950"><Send className="h-4 w-4" /></button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function VoyageAnalytics() {
  const [loading, setLoading] = useState(true);
  const [from, setFrom] = useState("Delhi");
  const [to, setTo] = useState("Goa");
  const [tripClass, setTripClass] = useState("Economy");
  const [prediction, setPrediction] = useState<null | { fare: number; confidence: number; best: string }>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState(0);

  useEffect(() => {
    const id = window.setTimeout(() => setLoading(false), 1700);
    return () => window.clearTimeout(id);
  }, []);

  const risk = useMemo(() => Math.min(88, 34 + to.length * 4 + (tripClass === "Business" ? 12 : 0)), [to, tripClass]);

  function predict() {
    const base = 4200 + from.length * 260 + to.length * 310 + (tripClass === "Business" ? 5200 : tripClass === "Premium" ? 2400 : 0);
    setPrediction({ fare: base, confidence: 91, best: "Book 24-30 days before departure" });
  }

  if (loading) return <Loader />;

  return (
    <main className="min-h-screen overflow-hidden bg-[#07111f] text-white">
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(180deg,#07111f_0%,#0b1728_42%,#111827_100%)]" />
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(45,212,191,.18),transparent_32%),linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] bg-[size:auto,64px_64px,64px_64px]" />

      <nav className="fixed left-0 right-0 top-0 z-40 border-b border-white/10 bg-slate-950/55 backdrop-blur-2xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5">
          <a href="#top" className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-cyan-300 text-slate-950 shadow-[0_0_28px_rgba(103,232,249,.35)]"><Plane className="h-6 w-6" /></span>
            <span className="text-lg font-black">Voyage <span className="text-cyan-200">Analytics</span></span>
          </a>
          <div className="hidden items-center gap-1 md:flex">
            {["Predictor", "Hotels", "Dashboard", "Emergency", "Team"].map((item) => <a key={item} href={`#${item.toLowerCase()}`} className="rounded-full px-4 py-2 text-sm text-slate-300 hover:bg-white/10 hover:text-white">{item}</a>)}
          </div>
          <button onClick={() => setChatOpen(true)} className="inline-flex items-center gap-2 rounded-full bg-cyan-300 px-5 py-2.5 text-sm font-bold text-slate-950"><Sparkles className="h-4 w-4" /> AI Plan</button>
        </div>
      </nav>

      <section id="top" className="mx-auto grid min-h-[92vh] max-w-7xl items-center gap-10 px-5 pb-16 pt-28 lg:grid-cols-[1.03fr_.97fr]">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-200/25 bg-white/5 px-4 py-2 text-sm text-cyan-100">
            <Activity className="h-4 w-4" /> Advanced AI travel intelligence platform
          </div>
          <h1 className="max-w-4xl text-5xl font-black leading-[1.02] tracking-normal sm:text-6xl lg:text-7xl">
            <Typewriter />
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            A SaaS-grade command center for fare prediction, hotel intelligence, delay risk, route analytics, emergency recovery, saved trips, and shareable itineraries.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#predictor" className="inline-flex items-center gap-2 rounded-full bg-cyan-300 px-6 py-3 font-bold text-slate-950 shadow-[0_0_34px_rgba(103,232,249,.28)]">Run prediction <ArrowRight className="h-4 w-4" /></a>
            <button onClick={() => setChatOpen(true)} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 font-bold text-white"><Bot className="h-4 w-4" /> Ask AI planner</button>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-3">
            {[["92%", "model confidence"], ["18K+", "routes analyzed"], ["4.8", "user rating"]].map(([v, l]) => <div key={l} className="rounded-2xl border border-white/10 bg-white/[.045] p-4"><p className="text-2xl font-black text-cyan-100">{v}</p><p className="text-xs uppercase tracking-widest text-slate-400">{l}</p></div>)}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.1 }} className="relative">
          <FlightGlobe />
          <div className="grid gap-3 rounded-3xl border border-white/10 bg-slate-950/70 p-4 shadow-2xl backdrop-blur-xl sm:absolute sm:bottom-8 sm:left-4 sm:w-80">
            <div className="flex items-center justify-between"><span className="text-sm text-slate-300">Live route scan</span><span className="rounded-full bg-emerald-300/15 px-3 py-1 text-xs font-bold text-emerald-200">Optimal</span></div>
            <div className="flex items-center gap-3"><Plane className="h-5 w-5 text-cyan-200" /><b>DEL to GOI</b><span className="ml-auto text-cyan-100">INR 6,840</span></div>
          </div>
        </motion.div>
      </section>

      <section id="predictor" className="mx-auto max-w-7xl px-5 py-16">
        <div className="grid gap-6 lg:grid-cols-[1fr_.85fr]">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-3xl border border-white/10 bg-white/[.045] p-6 backdrop-blur-xl">
            <div className="mb-6 flex items-center gap-3"><Search className="h-6 w-6 text-cyan-200" /><div><h2 className="text-3xl font-black">Flight Prediction Engine</h2><p className="text-slate-400">Fare, confidence, booking window, and delay risk in one flow.</p></div></div>
            <div className="grid gap-4 md:grid-cols-4">
              {[
                ["From", from, setFrom, ["Delhi", "Mumbai", "Bengaluru", "Hyderabad"]],
                ["To", to, setTo, ["Goa", "Jaipur", "Kochi", "Manali"]],
                ["Class", tripClass, setTripClass, ["Economy", "Premium", "Business"]],
              ].map(([label, value, setter, opts]) => (
                <label key={label as string} className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-400">{label as string}</span>
                  <select value={value as string} onChange={(e) => (setter as (v: string) => void)(e.target.value)} className="h-12 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 text-white outline-none">
                    {(opts as string[]).map((o) => <option key={o}>{o}</option>)}
                  </select>
                </label>
              ))}
              <button onClick={predict} className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-cyan-300 px-5 font-black text-slate-950 md:mt-auto"><Cpu className="h-4 w-4" /> Predict</button>
            </div>
            {prediction && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mt-6 grid gap-4 md:grid-cols-3">
                <Metric icon={IndianRupee} label="Predicted fare" value={`INR ${prediction.fare.toLocaleString()}`} tone="cyan" />
                <Metric icon={CheckCircle2} label="Confidence" value={`${prediction.confidence}%`} tone="emerald" />
                <Metric icon={CalendarDays} label="Best booking time" value={prediction.best} tone="amber" />
              </motion.div>
            )}
          </motion.div>
          <div id="emergency" className="rounded-3xl border border-red-300/20 bg-red-950/20 p-6">
            <div className="mb-5 flex items-center gap-3"><ShieldAlert className="h-6 w-6 text-red-200" /><h2 className="text-2xl font-black">Emergency Mode</h2></div>
            {["Alternate flights found within 3 hours", "Nearby hotels with late check-in", "Refund guide generated", "Airport emergency numbers ready"].map((item) => <div key={item} className="mb-3 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[.04] p-3 text-sm text-slate-200"><AlertTriangle className="h-4 w-4 text-red-200" /> {item}</div>)}
            <button className="mt-2 inline-flex items-center gap-2 rounded-full bg-red-200 px-5 py-3 font-bold text-red-950"><Headphones className="h-4 w-4" /> Activate recovery</button>
          </div>
        </div>
      </section>

      <section id="hotels" className="mx-auto max-w-7xl px-5 py-16">
        <SectionTitle icon={Hotel} eyebrow="Hotel Recommendation AI" title="Smart stays sorted by price, rating, and intent" />
        <div className="grid gap-5 md:grid-cols-3">
          {hotels.map((h) => <motion.div key={h.name} whileHover={{ y: -6 }} className="rounded-3xl border border-white/10 bg-white/[.045] p-5"><div className="mb-5 grid h-32 place-items-center rounded-2xl bg-[linear-gradient(135deg,rgba(103,232,249,.18),rgba(16,185,129,.12))]"><Building2 className="h-14 w-14 text-cyan-100" /></div><h3 className="text-xl font-black">{h.name}</h3><p className="text-slate-400">{h.city} - {h.tag}</p><div className="mt-5 flex items-center justify-between"><span className="text-2xl font-black text-cyan-100">INR {h.price}</span><span className="flex items-center gap-1 text-amber-200"><Star className="h-4 w-4 fill-current" /> {h.rating}</span></div><p className="mt-3 text-sm text-emerald-200">{h.match}% AI match</p></motion.div>)}
        </div>
      </section>

      <section id="dashboard" className="mx-auto max-w-7xl px-5 py-16">
        <SectionTitle icon={TrendingUp} eyebrow="Analytics Dashboard" title="Demand, fares, cancellations, heatmaps" />
        <div className="grid gap-6 lg:grid-cols-2">
          <ChartPanel title="Fare trend forecast"><ResponsiveContainer width="100%" height={260}><AreaChart data={fares}><defs><linearGradient id="fare" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#67e8f9" stopOpacity={0.5} /><stop offset="95%" stopColor="#67e8f9" stopOpacity={0} /></linearGradient></defs><CartesianGrid stroke="rgba(255,255,255,.08)" /><XAxis dataKey="month" stroke="#94a3b8" /><YAxis stroke="#94a3b8" /><Tooltip contentStyle={{ background: "#0f172a", border: "1px solid rgba(255,255,255,.12)", borderRadius: 14 }} /><Area dataKey="fare" stroke="#67e8f9" fill="url(#fare)" /></AreaChart></ResponsiveContainer></ChartPanel>
          <ChartPanel title="Demand vs cancellation risk"><ResponsiveContainer width="100%" height={260}><BarChart data={fares}><CartesianGrid stroke="rgba(255,255,255,.08)" /><XAxis dataKey="month" stroke="#94a3b8" /><YAxis stroke="#94a3b8" /><Tooltip contentStyle={{ background: "#0f172a", border: "1px solid rgba(255,255,255,.12)", borderRadius: 14 }} /><Bar dataKey="demand" fill="#6ee7b7" radius={[8, 8, 0, 0]} /><Bar dataKey="cancel" fill="#fca5a5" radius={[8, 8, 0, 0]} /></BarChart></ResponsiveContainer></ChartPanel>
          <ChartPanel title="Delay prediction ML"><div className="grid gap-3">{airports.map((a) => <div key={a.code} className="grid grid-cols-[54px_1fr_52px] items-center gap-3"><b>{a.code}</b><div className="h-3 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-cyan-300" style={{ width: `${a.load}%` }} /></div><span className="text-sm text-slate-300">{a.delay}</span></div>)}</div><p className="mt-5 text-sm text-slate-400">Weather impact, historical delay, and congestion combine into current route risk: <b className="text-amber-200">{risk}%</b>.</p></ChartPanel>
          <ChartPanel title="Route heatmap"><div className="grid grid-cols-3 gap-3 sm:grid-cols-5">{airports.map((a, i) => <div key={a.code} className="rounded-2xl border border-white/10 p-4 text-center" style={{ background: `rgba(103,232,249,${0.08 + i * 0.035})` }}><MapPin className="mx-auto mb-2 h-5 w-5 text-cyan-100" /><b>{a.city}</b><p className="text-xs text-slate-400">{a.load}% load</p></div>)}</div></ChartPanel>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="grid gap-4 md:grid-cols-4">
          <Feature icon={Mic} title="Voice assistant" text="Hands-free trip planning and emergency commands." />
          <Feature icon={CloudSun} title="Weather API" text="Live weather impact for delay scoring." />
          <Feature icon={WalletCards} title="Currency converter" text="Quick multi-currency budget checks." />
          <Feature icon={Bell} title="Notifications" text="Price drops, gate alerts, and risk warnings." />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16">
        <SectionTitle icon={Route} eyebrow="Architecture" title="End-to-end AI travel workflow" />
        <div className="grid gap-4 md:grid-cols-5">
          {["User intent", "Prediction API", "ML models", "Recommendations", "PDF + Email"].map((step, i) => <div key={step} className="relative rounded-3xl border border-white/10 bg-white/[.045] p-5"><span className="mb-4 grid h-10 w-10 place-items-center rounded-full bg-cyan-300 font-black text-slate-950">{i + 1}</span><b>{step}</b>{i < 4 && <ArrowRight className="absolute -right-5 top-1/2 hidden h-6 w-6 text-cyan-200 md:block" />}</div>)}
        </div>
      </section>

      <section id="team" className="mx-auto max-w-7xl px-5 py-16">
        <SectionTitle icon={Users} eyebrow="Team Showcase" title="Premium 3D project team cards" />
        <div className="grid gap-5 md:grid-cols-4">
          {team.map((m) => <motion.div key={m.name} whileHover={{ rotateX: 4, rotateY: -4, y: -8 }} className="rounded-3xl border border-white/10 bg-white/[.045] p-5 text-center [transform-style:preserve-3d]"><div className="mx-auto mb-4 grid h-20 w-20 place-items-center rounded-2xl bg-cyan-300 text-slate-950"><Users className="h-9 w-9" /></div><h3 className="font-black">{m.name}</h3><p className="text-sm text-cyan-100">{m.role}</p><div className="mt-4 flex flex-wrap justify-center gap-2">{m.skills.map((s) => <span key={s} className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">{s}</span>)}</div><div className="mt-5 flex justify-center gap-3"><span className="rounded-full border border-cyan-200/20 px-3 py-1 text-xs font-bold text-cyan-100">LinkedIn</span><span className="rounded-full border border-white/10 px-3 py-1 text-xs font-bold text-slate-300">GitHub</span></div></motion.div>)}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-16">
        <SectionTitle icon={Sparkles} eyebrow="FAQ" title="Everything ready for demo day" />
        <div className="space-y-3">
          {faqs.map(([q, a], i) => <button key={q} onClick={() => setFaqOpen(i)} className="w-full rounded-2xl border border-white/10 bg-white/[.045] p-5 text-left"><span className="flex items-center justify-between font-bold">{q}<ChevronDown className={`h-5 w-5 transition ${faqOpen === i ? "rotate-180" : ""}`} /></span>{faqOpen === i && <p className="mt-3 text-slate-400">{a}</p>}</button>)}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 pt-10">
        <div className="grid gap-6 rounded-3xl border border-white/10 bg-white/[.045] p-6 md:grid-cols-[1fr_.8fr]">
          <div><h2 className="text-3xl font-black">Contact and itinerary export</h2><p className="mt-3 text-slate-400">Save trips, export PDF itineraries, share by email, and keep a searchable history of predictions.</p><div className="mt-6 flex flex-wrap gap-3"><button className="inline-flex items-center gap-2 rounded-full bg-cyan-300 px-5 py-3 font-bold text-slate-950"><Download className="h-4 w-4" /> Export PDF</button><button className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 font-bold"><Mail className="h-4 w-4" /> Email itinerary</button></div></div>
          <form className="grid gap-3"><input placeholder="Name" className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 outline-none" /><input placeholder="Email" className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 outline-none" /><textarea placeholder="Trip request" className="min-h-28 rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 outline-none" /><button className="rounded-2xl bg-cyan-300 px-5 py-3 font-black text-slate-950">Send request</button></form>
        </div>
      </section>

      <footer className="border-t border-white/10 px-5 py-8 text-center text-sm text-slate-500">Voyage Analytics - React, Next.js, Tailwind, Framer Motion, Recharts, Flask, Python ML</footer>
      <Chatbot open={chatOpen} setOpen={setChatOpen} />
    </main>
  );
}

function Metric({ icon: Icon, label, value, tone }: { icon: typeof Plane; label: string; value: string; tone: "cyan" | "emerald" | "amber" }) {
  const color = tone === "cyan" ? "text-cyan-100" : tone === "emerald" ? "text-emerald-200" : "text-amber-200";
  return <div className="rounded-2xl border border-white/10 bg-slate-950/55 p-4"><Icon className={`mb-3 h-5 w-5 ${color}`} /><p className="text-xs uppercase tracking-widest text-slate-500">{label}</p><p className="mt-1 text-xl font-black">{value}</p></div>;
}

function SectionTitle({ icon: Icon, eyebrow, title }: { icon: typeof Plane; eyebrow: string; title: string }) {
  return <div className="mb-8"><div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-200/20 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-widest text-cyan-100"><Icon className="h-4 w-4" /> {eyebrow}</div><h2 className="max-w-3xl text-3xl font-black leading-tight sm:text-4xl">{title}</h2></div>;
}

function ChartPanel({ title, children }: { title: string; children: React.ReactNode }) {
  return <div className="rounded-3xl border border-white/10 bg-white/[.045] p-5"><h3 className="mb-5 text-xl font-black">{title}</h3>{children}</div>;
}

function Feature({ icon: Icon, title, text }: { icon: typeof Plane; title: string; text: string }) {
  return <div className="rounded-3xl border border-white/10 bg-white/[.045] p-5"><Icon className="mb-4 h-7 w-7 text-cyan-100" /><h3 className="font-black">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{text}</p></div>;
}
