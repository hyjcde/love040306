"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/data";

interface TimeElapsed {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Hero() {
  const [time, setTime] = useState<TimeElapsed>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

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

    updateTimer(); // 初始调用
    const interval = setInterval(updateTimer, 1000); // 每秒更新

    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* 背景层 */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
        style={{ backgroundImage: `url('/pic/pic1.jpg')` }}
      />
      {/* 遮罩层，让文字更清晰 */}
      <div className="absolute inset-0 bg-black/40" />

      {/* 内容层 */}
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-8 tracking-wider">
          我们在一起已经
        </h1>
        
        {/* 计时器 */}
        <div className="flex justify-center gap-4 md:gap-8">
          <TimeBlock value={time.days} label="天" />
          <TimeBlock value={time.hours} label="时" />
          <TimeBlock value={time.minutes} label="分" />
          <TimeBlock value={time.seconds} label="秒" />
        </div>
      </div>
    </section>
  );
}

function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center backdrop-blur-sm bg-white/10 rounded-xl p-4 md:p-6 border border-white/20 min-w[80px] md:min-w-[120px]">
      <span className="text-4xl md:text-6xl font-bold tabular-nums">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-sm md:text-xl mt-2 opacity-80">{label}</span>
    </div>
  );
}
