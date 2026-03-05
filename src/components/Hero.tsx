"use client";

import { useEffect, useState, useMemo } from "react";
import { siteConfig } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";

interface TimeElapsed {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const ROMANTIC_QUOTE = "爱是两颗心碰撞的火花，也是无数个平凡日子里的温柔相守";

const PARTICLES_COUNT = 24;

export default function Hero() {
  const [time, setTime] = useState<TimeElapsed>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLES_COUNT }, (_, i) => ({
        id: i,
        // Mix of hearts (♥) and small circles (•)
        char: i % 4 === 0 ? "♥" : i % 4 === 1 ? "✦" : "•",
        left: `${5 + (i * 4) % 90}%`,
        delay: `${(i * 0.3) % 8}s`,
        duration: 8 + (i % 4) * 2,
        size: i % 3 === 0 ? "text-xs" : i % 3 === 1 ? "text-sm" : "text-[10px]",
        opacity: 0.4 + (i % 4) * 0.15,
      })),
    []
  );

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

  useEffect(() => {
    if (siteConfig.heroImages.length > 1) {
      const imageInterval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % siteConfig.heroImages.length);
      }, 5000);
      return () => clearInterval(imageInterval);
    }
  }, []);

  if (!mounted) return null;

  return (
    <>
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(100vh) translateX(0) rotate(0deg); opacity: 0; }
          8% { opacity: 0.6; }
          92% { opacity: 0.2; }
          100% { transform: translateY(-20vh) translateX(20px) rotate(180deg); opacity: 0; }
        }
        @keyframes shimmer {
          0%, 100% { background-position: 200% center; }
          50% { background-position: -200% center; }
        }
        @keyframes glowPulse {
          0%, 100% { text-shadow: 0 0 20px rgba(255, 182, 193, 0.5), 0 0 40px rgba(255, 182, 193, 0.3); }
          50% { text-shadow: 0 0 30px rgba(255, 182, 193, 0.7), 0 0 60px rgba(255, 182, 193, 0.4); }
        }
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(6px); opacity: 0.7; }
        }
      `}</style>

      <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black">
        {/* Background carousel with crossfade */}
        <div className="absolute inset-0">
          <AnimatePresence>
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${siteConfig.heroImages[currentImageIndex]}')` }}
            />
          </AnimatePresence>
        </div>

        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-black/75" />
        <div className="absolute inset-0 bg-linear-to-r from-black/20 via-transparent to-black/20" />

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((p) => (
            <span
              key={p.id}
              className={`absolute bottom-0 ${p.size} text-pink-200/80`}
              style={{
                left: p.left,
                animation: `floatUp ${p.duration}s ease-in-out ${p.delay} infinite`,
                opacity: p.opacity,
                willChange: "transform",
              }}
            >
              {p.char}
            </span>
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 text-center text-white px-4 w-full max-w-4xl mx-auto flex flex-col items-center">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h1
              className="text-4xl sm:text-5xl md:text-7xl font-bold mb-3 md:mb-4 tracking-[0.2em] md:tracking-[0.3em]"
              style={{
                background: "linear-gradient(90deg, #fecdd3 0%, #fff 25%, #fecdd3 50%, #fff 75%, #fecdd3 100%)",
                backgroundSize: "200% auto",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                animation: "shimmer 6s ease-in-out infinite",
                textShadow: "0 0 20px rgba(255, 182, 193, 0.5)",
              }}
            >
              我们的故事
            </h1>
            <p className="text-lg md:text-2xl font-light text-pink-100/90 tracking-[0.15em] mb-4">
              Fish & Miss Giraffe
            </p>
          </motion.div>

          {/* Romantic quote */}
          <motion.p
            className="text-sm sm:text-base md:text-lg text-pink-200/90 font-light tracking-wider max-w-2xl mb-10 md:mb-14 px-2 italic"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
          >
            &ldquo;{ROMANTIC_QUOTE}&rdquo;
          </motion.p>

          {/* Timer blocks - glassmorphism + pulse on seconds */}
          <motion.div
            className="flex justify-center gap-2 sm:gap-4 md:gap-6 flex-wrap"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <TimeBlock value={time.days} label="天" pulse={false} />
            <TimeBlock value={time.hours} label="时" pulse={false} />
            <TimeBlock value={time.minutes} label="分" pulse={false} />
            <TimeBlock value={time.seconds} label="秒" pulse />
          </motion.div>

          {/* Elegant scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.2 }}
          >
            <span className="text-xs md:text-sm text-white/50 tracking-[0.2em] uppercase">
              向下滑动
            </span>
            <motion.div
              className="w-8 h-12 rounded-full border-2 border-white/30 flex justify-center pt-2 backdrop-blur-sm bg-white/5"
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.div
                className="w-1 h-2 rounded-full bg-white/70"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

function TimeBlock({
  value,
  label,
  pulse,
}: {
  value: number;
  label: string;
  pulse?: boolean;
}) {
  return (
    <motion.div
      className={`
        flex flex-col items-center justify-center
        backdrop-blur-xl bg-white/8 border border-white/12
        rounded-2xl sm:rounded-3xl
        px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5
        min-w-[72px] sm:min-w-[90px] md:min-w-[120px]
        shadow-[0_8px_32px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.1)]
        hover:bg-white/12 hover:border-white/18
        transition-all duration-300
      `}
      animate={pulse ? { scale: [1, 1.02, 1] } : {}}
      transition={pulse ? { duration: 1, repeat: Infinity } : {}}
    >
      <span
        className="text-3xl sm:text-4xl md:text-6xl font-bold tabular-nums tracking-tight"
        style={{
          background: "linear-gradient(180deg, #fff 0%, rgba(255,255,255,0.75) 100%)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-xs sm:text-sm md:text-base mt-2 font-medium text-white/80 tracking-[0.2em]">
        {label}
      </span>
    </motion.div>
  );
}
