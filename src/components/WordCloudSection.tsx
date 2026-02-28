"use client";

import { motion } from "framer-motion";
import { chatKnowledge } from "@/lib/chatData";
import { MessageSquareHeart } from "lucide-react";

// @ts-ignore - 忽略没有类型声明的报错
import ReactWordcloud from "react-wordcloud";

export default function WordCloudSection() {
  const options = {
    colors: ["#ec4899", "#f43f5e", "#fb7185", "#fda4af", "#be185d", "#9f1239", "#881337", "#f9a8d4"],
    enableTooltip: true,
    deterministic: false,
    fontFamily: "'Kaiti', 'STKaiti', serif",
    fontSizes: [20, 80],
    fontStyle: "normal",
    fontWeight: "bold",
    padding: 1,
    rotations: 2,
    rotationAngles: [0, 90],
    scale: "sqrt",
    spiral: "archimedean",
    transitionDuration: 1000,
  };

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
          className="w-full h-[400px] md:h-[600px] bg-white rounded-3xl shadow-xl border border-pink-100 p-4 md:p-8 flex items-center justify-center overflow-hidden"
        >
          <ReactWordcloud 
            words={chatKnowledge.wordCloud} 
            options={options as any} 
          />
        </motion.div>
      </div>
    </section>
  );
}
