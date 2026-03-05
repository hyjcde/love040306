"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "love0403_ok";
const PASSWORD = "040306";

export default function PasswordGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const ok = typeof window !== "undefined" && window.localStorage.getItem(STORAGE_KEY) === "1";
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
    }
  };

  // 服务端或未 mount 时先不渲染内容，避免闪屏
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-100">
        <div className="animate-pulse text-stone-400">加载中...</div>
      </div>
    );
  }

  if (!unlocked) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-stone-100 to-stone-200 p-4">
        <div className="w-full max-w-sm rounded-2xl bg-white/80 backdrop-blur shadow-xl border border-stone-200 p-8">
          <h1 className="text-xl font-medium text-stone-800 text-center mb-2">Love 0403</h1>
          <p className="text-sm text-stone-500 text-center mb-6">请输入访问密码</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="密码"
              className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-stone-50 text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400"
              autoFocus
              autoComplete="off"
            />
            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-stone-800 text-white font-medium hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-500 transition-colors"
            >
              进入
            </button>
          </form>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
