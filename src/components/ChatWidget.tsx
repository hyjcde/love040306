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
      {/* 聊天气泡弹窗 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="mb-4 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-pink-100 max-w-xs relative"
          >
            <button 
              onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
              className="absolute -top-2 -right-2 bg-stone-100 hover:bg-stone-200 text-stone-500 rounded-full p-1 transition-colors"
            >
              <X size={14} />
            </button>
            <div className="text-xs text-stone-400 mb-2 font-mono">
              {currentQuote.time}
            </div>
            <div className={`p-3 rounded-xl inline-block ${
              currentQuote.isSender 
                ? "bg-green-100 text-green-900 rounded-tr-sm ml-auto" 
                : "bg-white border border-stone-100 text-stone-800 rounded-tl-sm"
            }`}>
              <p className="text-sm">{currentQuote.text}</p>
            </div>
            <div className="mt-2 text-xs text-pink-400 text-center font-medium">
              来自我们的 {chatKnowledge.totalMessages} 条回忆
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 悬浮按钮 */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={showRandomQuote}
        className="w-14 h-14 bg-pink-500 hover:bg-pink-600 text-white rounded-full flex items-center justify-center shadow-lg transition-colors group relative"
      >
        <MessageCircleHeart className="w-7 h-7" />
        {/* 提示气泡 */}
        {!isOpen && (
          <span className="absolute right-full mr-4 bg-black/70 text-white text-xs px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            抽取专属金句
          </span>
        )}
      </motion.button>
    </div>
  );
}
