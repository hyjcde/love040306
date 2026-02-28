"use client";

import { useEffect, useState, useRef } from "react";
import { Play, Pause, Music } from "lucide-react";

export default function MusicPlayer({ src }: { src: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 初始化 Audio 对象
  useEffect(() => {
    audioRef.current = new Audio(src);
    audioRef.current.loop = true;

    // 清理函数
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [src]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // 使用 play() 可能会因为浏览器自动播放策略（Autoplay Policy）而失败，
        // 所以我们用 try-catch 包裹
        audioRef.current.play().catch((err) => {
          console.error("无法播放音频：", err);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <button
      onClick={togglePlay}
      className={`fixed top-6 right-6 z-50 p-3 rounded-full bg-white/30 backdrop-blur-md shadow-lg border border-white/20 transition-all duration-300 hover:scale-110 ${
        isPlaying ? "animate-[spin_4s_linear_infinite]" : ""
      }`}
      aria-label="播放/暂停音乐"
    >
      <Music className={`w-6 h-6 ${isPlaying ? "text-pink-500" : "text-white"}`} />
    </button>
  );
}
