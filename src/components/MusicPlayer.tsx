"use client";

import { useEffect, useState, useRef } from "react";
import { Music } from "lucide-react";

export default function MusicPlayer({ src }: { src: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(src);
    audioRef.current.loop = true;

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
      className={`
        fixed top-6 right-6 z-50
        w-11 h-11 rounded-full
        flex items-center justify-center
        bg-black/20 backdrop-blur-xl
        border border-white/15
        shadow-lg shadow-black/10
        transition-all duration-300
        hover:scale-110 hover:bg-black/30
        active:scale-95
        ${isPlaying ? "animate-[spin_4s_linear_infinite]" : ""}
      `}
      aria-label="播放/暂停音乐"
    >
      <Music className={`w-5 h-5 ${isPlaying ? "text-rose-400" : "text-white/80"}`} />
    </button>
  );
}
