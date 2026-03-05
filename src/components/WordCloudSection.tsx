"use client";

import { motion } from "framer-motion";
import { chatKnowledge } from "@/lib/chatData";
import { MessageSquareHeart } from "lucide-react";
import { useMemo } from "react";

const COLORS = [
  "text-rose-400",
  "text-pink-400",
  "text-rose-500",
  "text-pink-500",
  "text-rose-300",
  "text-pink-300",
  "text-amber-400",
  "text-amber-300",
];

export default function WordCloudSection() {
  const shuffledWords = useMemo(
    () => [...chatKnowledge.wordCloud].sort(() => Math.random() - 0.5),
    []
  );

  const maxValue = Math.max(...chatKnowledge.wordCloud.map((w) => w.value));

  return (
    <section className="py-24 overflow-hidden relative">
      {/* Decorative blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 right-1/4 w-80 h-80 bg-rose-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-100/25 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 rounded-full bg-rose-50 border border-rose-100/60 flex items-center justify-center">
              <MessageSquareHeart className="w-7 h-7 text-rose-400" />
            </div>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-stone-800 tracking-tight">
            我们的聊天关键词
          </h2>
          <div className="mt-4 w-16 h-1 bg-linear-to-r from-rose-300 to-pink-300 mx-auto rounded-full" />
          <p className="mt-6 text-stone-500 max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
            基于我们一共{" "}
            <span className="text-rose-500 font-bold text-xl">
              {chatKnowledge.totalMessages.toLocaleString()}
            </span>{" "}
            条真实聊天记录分析，<br className="hidden sm:block" />
            看看我们最常挂在嘴边的是什么？
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="w-full min-h-[400px] bg-white/60 backdrop-blur-md rounded-3xl shadow-xl border border-rose-100/60 p-8 sm:p-10 flex flex-wrap items-center justify-center gap-3 sm:gap-5 md:gap-7 overflow-hidden"
        >
          {shuffledWords.map((word, index) => {
            const ratio = word.value / maxValue;
            const fontSize = Math.max(14, Math.min(56, ratio * 80 + 14));
            const colorClass = COLORS[index % COLORS.length];
            const rotate = ((index * 13) % 21) - 10;

            return (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0, rotate: rotate * 2 }}
                whileInView={{ opacity: 1, scale: 1, rotate }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: (index % 20) * 0.04,
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                }}
                whileHover={{
                  scale: 1.25,
                  rotate: 0,
                  zIndex: 10,
                  transition: { duration: 0.2 },
                }}
                style={{ fontSize: `${fontSize}px` }}
                className={`${colorClass} font-bold cursor-pointer transition-all whitespace-nowrap drop-shadow-sm hover:drop-shadow-md`}
                title={`出现了 ${word.value} 次`}
              >
                {word.text}
              </motion.span>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
