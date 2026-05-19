"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Send, Bot, User } from "lucide-react";

export default function Chatbot() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "ai", content: "Hi! I'm your Voyage AI Planner. Try asking: 'Plan a 2 day trip to Goa under ₹15,000'" }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isChatOpen]);

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    setMessages(prev => [...prev, { role: "user", content: chatInput }]);
    const userInput = chatInput.toLowerCase();
    setChatInput("");

    setTimeout(() => {
      let aiResponse = "I can help you plan trips, find hotels, and predict flight prices. Ask me anything!";

      if (userInput.includes("goa") || userInput.includes("15000")) {
        aiResponse = `Here is your budget itinerary for Goa (Under ₹15,000):

✈️ Flights: ₹6,500 (Round trip)
🏨 Hotel: Taj Exotica (₹4,000 for 2 nights)
🍔 Food & Transport: ₹3,500
🏖️ Activities: ₹1,000 (Watersports)

Total: ₹15,000 ✅
Would you like me to book this for you?`;
      } else if (userInput.includes("hotel") || userInput.includes("stay")) {
        aiResponse = "I found premium hotels matching your preferences. Try our Hotels tab above for AI-curated recommendations with pricing!";
      } else if (userInput.includes("flight") || userInput.includes("price") || userInput.includes("predict")) {
        aiResponse = "Use our Flight Predictor above! Enter source, destination and class, and our ML model will predict the fare with 95% accuracy.";
      } else if (userInput.includes("budget") || userInput.includes("cheap") || userInput.includes("afford")) {
        aiResponse = "For budget travel tips:\n1. Book 3+ weeks in advance\n2. Choose Economic class\n3. Use 'CloudFy' agency for discounts\n4. Travel mid-week for lower fares";
      } else if (userInput.includes("delhi") || userInput.includes("mumbai") || userInput.includes("bangalore")) {
        aiResponse = "I can help with Indian travel! Try our flight predictor for domestic routes, or ask for a complete itinerary including hotels and activities.";
      }

      setMessages(prev => [...prev, { role: "ai", content: aiResponse }]);
    }, 1000);
  };

  return (
    <>
      <AnimatePresence>
        {!isChatOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsChatOpen(true)}
            className="fixed bottom-8 right-8 glass p-3 rounded-2xl cursor-pointer shadow-2xl z-50 flex items-center gap-3 border border-pink-500/30"
          >
            <motion.div
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="bg-gradient-to-br from-pink-500 to-purple-600 p-3 rounded-full shadow-[0_0_20px_rgba(236,72,153,0.5)]"
            >
              <Sparkles className="w-6 h-6 text-white" />
            </motion.div>
            <div className="hidden md:block pr-2">
              <p className="text-sm font-bold text-white">AI Travel Planner</p>
              <p className="text-xs text-pink-300">Plan a trip & budget</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-8 right-8 w-[380px] h-[550px] z-50 glass border border-pink-500/30 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="bg-gradient-to-r from-pink-600/20 to-purple-600/20 p-4 border-b border-white/10 flex justify-between items-center backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-2 rounded-full">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">Voyage AI Planner</h3>
                  <p className="text-xs text-green-400">Online</p>
                </div>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'ai' && (
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <Bot className="w-4 h-4 text-pink-400" />
                    </div>
                  )}
                  <div className={`p-3 rounded-2xl max-w-[80%] text-sm whitespace-pre-wrap ${msg.role === 'user' ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-tr-none' : 'glass border border-white/10 text-gray-200 rounded-tl-none'}`}>
                    {msg.content}
                  </div>
                  {msg.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0">
                      <User className="w-4 h-4 text-cyan-400" />
                    </div>
                  )}
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-white/10 bg-black/20">
              <div className="relative flex items-center">
                <input type="text" value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSendMessage()} placeholder="Type your travel request..." className="w-full glass-input rounded-full py-3 pl-4 pr-12 text-sm text-white placeholder:text-gray-500 focus:ring-1 focus:ring-pink-500" />
                <button onClick={handleSendMessage} className="absolute right-2 p-2 bg-pink-500 hover:bg-pink-400 text-white rounded-full transition-colors">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
