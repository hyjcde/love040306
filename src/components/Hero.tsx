"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";

interface TimeElapsed {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Hero() {
  const [time, setTime] = useState<TimeElapsed>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
    const startDate = new Date(siteConfig.anniversaryDate).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = now - startDate;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTime({ days, hours, minutes, seconds });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  // 轮播图逻辑
  useEffect(() => {
    if (siteConfig.heroImages.length > 1) {
      const imageInterval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % siteConfig.heroImages.length);
      }, 5000); // 每5秒切换一次背景
      return () => clearInterval(imageInterval);
    }
  }, []);

  if (!mounted) return null;

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      {/* 轮播背景层 */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${siteConfig.heroImages[currentImageIndex]}')` }}
        />
      </AnimatePresence>
      
      {/* 遮罩层，让文字更清晰，采用优雅的渐变黑 */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70" />

      {/* 内容层 */}
      <div className="relative z-10 text-center text-white px-4 w-full max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-white to-pink-200">
            我们的故事
          </h1>
          <p className="text-lg md:text-2xl font-light text-pink-100/80 mb-12 tracking-wider">
            Fish & Miss Giraffe
          </p>
        </motion.div>
        
        {/* 计时器 */}
        <motion.div 
          className="flex justify-center gap-3 md:gap-8 flex-wrap"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <TimeBlock value={time.days} label="天" />
          <TimeBlock value={time.hours} label="时" />
          <TimeBlock value={time.minutes} label="分" />
          <TimeBlock value={time.seconds} label="秒" />
        </motion.div>

        <motion.div 
          className="mt-16 animate-bounce"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <p className="text-sm md:text-base text-white/60 mb-2">向下滑动查看更多</p>
          <div className="w-6 h-10 border-2 border-white/50 rounded-full mx-auto flex justify-center p-1">
            <div className="w-1 h-2 bg-white/80 rounded-full animate-[scroll_2s_ease-in-out_infinite]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center backdrop-blur-md bg-white/5 hover:bg-white/10 transition-colors rounded-2xl p-4 md:p-6 border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] min-w-[80px] md:min-w-[120px]">
      <span className="text-4xl md:text-6xl font-bold tabular-nums bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-sm md:text-xl mt-3 text-white/80 font-medium tracking-widest">{label}</span>
    </div>
  );
}
