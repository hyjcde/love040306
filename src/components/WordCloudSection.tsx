"use client";

import { motion } from "framer-motion";
import { chatKnowledge } from "@/lib/chatData";
import { MessageSquareHeart } from "lucide-react";
import { useMemo } from "react";

export default function WordCloudSection() {
  const colors = [
    "text-pink-400", "text-rose-400", "text-pink-500", "text-rose-500", 
    "text-pink-600", "text-rose-600", "text-pink-300", "text-rose-300"
  ];

  // 打乱数组避免频率高的全部挤在前面
  const shuffledWords = useMemo(() => {
    return [...chatKnowledge.wordCloud].sort(() => Math.random() - 0.5);
  }, []);

  // 找最大值用来算比例
  const maxValue = Math.max(...chatKnowledge.wordCloud.map(w => w.value));

  return (
    <section className="py-24 bg-pink-50/50 overflow-hidden relative">
      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-4">
            <MessageSquareHeart className="w-12 h-12 text-pink-500" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-stone-800 mb-4 tracking-wider">
            我们的聊天关键词
          </h2>
          <div className="w-24 h-1 bg-pink-300 mx-auto rounded-full mb-6" />
          <p className="text-stone-600 max-w-xl mx-auto text-lg">
            基于我们一共 <span className="text-pink-500 font-bold text-xl">{chatKnowledge.totalMessages.toLocaleString()}</span> 条真实的微信聊天记录分析。<br/>
            看看平时我们在对方生命里，最常挂在嘴边的是什么？
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1, delay: 0.2 }}
          className="w-full min-h-[400px] bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-pink-100 p-8 flex flex-wrap items-center justify-center gap-4 md:gap-8 overflow-hidden"
        >
          {shuffledWords.map((word, index) => {
            // 计算相对大小，范围在 16px 到 64px 之间，并且加一点随机性
            const ratio = word.value / maxValue;
            const fontSize = Math.max(16, Math.min(64, ratio * 100 + 16));
            const colorClass = colors[Math.floor(Math.random() * colors.length)];
            // 增加一点随机旋转角度，像真实的词云一样
            const rotate = (Math.random() - 0.5) * 20;

            return (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5, 
                  delay: (index % 20) * 0.05,
                  type: "spring"
                }}
                whileHover={{ scale: 1.2, zIndex: 10, rotate: 0 }}
                style={{ fontSize: `${fontSize}px`, rotate: `${rotate}deg` }}
                className={`${colorClass} font-bold font-serif cursor-pointer hover:drop-shadow-md transition-all whitespace-nowrap`}
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
