"use client";

import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import { siteConfig } from "@/lib/data";
import { Heart } from "lucide-react";

export default function MessageBoard() {
  return (
    <section className="py-24 bg-stone-100 overflow-hidden relative" id="message">
      {/* 装饰性背景 */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-pink-200/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-rose-200/40 rounded-full blur-3xl" />
      </div>

      <div className="max-w-3xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-2xl shadow-xl border border-white"
        >
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-pink-50 rounded-full flex items-center justify-center">
              <Heart className="w-8 h-8 text-pink-400" />
            </div>
          </div>
          
          <h2 className="text-2xl md:text-4xl font-bold text-center text-stone-800 mb-10 tracking-widest font-serif" style={{ fontFamily: "'Kaiti', 'STKaiti', serif" }}>
            写给你的信
          </h2>

          <div 
            className="text-lg md:text-2xl leading-relaxed md:leading-loose text-stone-700 min-h-[300px]"
            style={{ fontFamily: "'Kaiti', 'STKaiti', serif" }}
          >
            <Typewriter
              options={{
                delay: 80,       // 打字速度
                deleteSpeed: 30, // 删除速度，一般不用到
                autoStart: true,
                loop: false,     // 不循环，显得更真实
              }}
              onInit={(typewriter) => {
                let tw = typewriter;
                // 逐行打字并加上换行
                siteConfig.messages.forEach((msg, index) => {
                  tw = tw.typeString(msg).pauseFor(800);
                  if (index < siteConfig.messages.length - 1) {
                    tw = tw.typeString("<br/><br/>");
                  }
                });
                tw.start();
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
