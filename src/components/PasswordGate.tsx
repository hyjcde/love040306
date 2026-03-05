"use client";

import { useState, useEffect, useMemo } from "react";

const STORAGE_KEY = "love0403_ok";
const PASSWORD = "040306";

const PARTICLE_COUNT = 20;

export default function PasswordGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [shaking, setShaking] = useState(false);

  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
        id: i,
        char: i % 3 === 0 ? "♥" : "✦",
        left: `${(i * 5 + 3) % 95}%`,
        delay: `${(i * 0.5) % 6}s`,
        duration: 6 + (i % 4) * 2,
        size: i % 3 === 0 ? 14 : 10,
        opacity: 0.15 + (i % 4) * 0.05,
      })),
    []
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const ok =
      typeof window !== "undefined" &&
      window.localStorage.getItem(STORAGE_KEY) === "1";
    setUnlocked(ok);
  }, [mounted]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password.trim() === PASSWORD) {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, "1");
      }
      setUnlocked(true);
    } else {
      setError("密码错误，请重试");
      setPassword("");
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-950">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-rose-400/60 border-t-transparent rounded-full animate-spin" />
          <p className="text-stone-500 text-sm tracking-wider">加载中...</p>
        </div>
      </div>
    );
  }

  if (!unlocked) {
    return (
      <>
        <style>{`
          @keyframes gateFloat {
            0% { transform: translateY(110vh) rotate(0deg); opacity: 0; }
            10% { opacity: 0.3; }
            90% { opacity: 0.1; }
            100% { transform: translateY(-10vh) rotate(180deg); opacity: 0; }
          }
          @keyframes shakeX {
            0%, 100% { transform: translateX(0); }
            20% { transform: translateX(-8px); }
            40% { transform: translateX(8px); }
            60% { transform: translateX(-4px); }
            80% { transform: translateX(4px); }
          }
        `}</style>
        <div className="min-h-screen flex flex-col items-center justify-center bg-stone-950 relative overflow-hidden p-4">
          {/* Floating particles */}
          <div className="absolute inset-0 pointer-events-none">
            {particles.map((p) => (
              <span
                key={p.id}
                className="absolute bottom-0 text-rose-400"
                style={{
                  left: p.left,
                  fontSize: `${p.size}px`,
                  opacity: p.opacity,
                  animation: `gateFloat ${p.duration}s ease-in-out ${p.delay} infinite`,
                }}
              >
                {p.char}
              </span>
            ))}
          </div>

          {/* Soft glow blobs */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-rose-900/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-900/15 rounded-full blur-3xl" />

          <div
            className="relative z-10 w-full max-w-sm"
            style={shaking ? { animation: "shakeX 0.5s ease-in-out" } : {}}
          >
            <div className="rounded-3xl bg-stone-900/80 backdrop-blur-xl shadow-2xl border border-stone-800/60 p-8 sm:p-10">
              {/* Logo area */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
                  <span className="text-2xl">♥</span>
                </div>
              </div>

              <h1 className="text-2xl font-bold text-stone-100 text-center mb-1 tracking-wider">
                Love 0403
              </h1>
              <p className="text-sm text-stone-500 text-center mb-8">
                请输入专属密码，开启我们的回忆
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="密码"
                    className="w-full px-5 py-3.5 rounded-xl bg-stone-800/60 border border-stone-700/50 text-stone-100 placeholder:text-stone-600 focus:outline-none focus:ring-2 focus:ring-rose-500/40 focus:border-rose-500/40 transition-all text-center tracking-[0.3em] text-lg"
                    autoFocus
                    autoComplete="off"
                  />
                </div>

                {error && (
                  <p className="text-sm text-rose-400 text-center">{error}</p>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-linear-to-r from-rose-500 to-pink-500 text-white font-medium hover:from-rose-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-rose-400/50 transition-all shadow-lg shadow-rose-900/30 active:scale-[0.98]"
                >
                  进入我们的世界
                </button>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }

  return <>{children}</>;
}
