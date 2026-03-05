"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { chatKnowledge } from "@/lib/chatData";
import { MessageCircleHeart, X } from "lucide-react";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(chatKnowledge.randomQuotes[0]);

  const showRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * chatKnowledge.randomQuotes.length);
    setCurrentQuote(chatKnowledge.randomQuotes[randomIndex]);
    setIsOpen(true);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Quote popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mb-3 bg-white/95 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-rose-100/60 max-w-xs relative"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
              className="absolute -top-2 -right-2 bg-stone-100 hover:bg-stone-200 text-stone-500 rounded-full p-1 transition-colors"
            >
              <X size={14} />
            </button>
            <div className="text-[11px] text-stone-400 mb-2 font-mono">
              {currentQuote.time}
            </div>
            <div
              className={`p-3 rounded-xl inline-block ${
                currentQuote.isSender
                  ? "bg-green-50 text-green-900 rounded-tr-sm ml-auto"
                  : "bg-stone-50 border border-stone-100 text-stone-800 rounded-tl-sm"
              }`}
            >
              <p className="text-sm leading-relaxed">{currentQuote.text}</p>
            </div>
            <div className="mt-2 text-[11px] text-rose-400/80 text-center font-medium">
              来自我们的 {chatKnowledge.totalMessages} 条回忆
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={showRandomQuote}
        className="w-12 h-12 bg-linear-to-br from-rose-500 to-pink-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-rose-500/25 transition-shadow hover:shadow-rose-500/40 group relative"
      >
        <MessageCircleHeart className="w-6 h-6" />
        {!isOpen && (
          <span className="absolute right-full mr-3 bg-stone-800/90 text-white text-xs px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none backdrop-blur-sm">
            抽取专属金句
          </span>
        )}
      </motion.button>
    </div>
  );
}
