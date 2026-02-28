import Hero from "@/components/Hero";
import MusicPlayer from "@/components/MusicPlayer";
import { siteConfig } from "@/lib/data";

export default function Home() {
  return (
    <main className="min-h-screen w-full relative">
      {/* 音乐播放器，浮动在屏幕右上角 */}
      <MusicPlayer src={siteConfig.musicUrl} />

      {/* 首屏：时间轴与倒计时 */}
      <Hero />

      {/* 下面的组件会在这之后逐步开发：
          - 我们的故事 (Story Timeline)
          - 回忆画廊 (Photo Gallery)
          - 打字机与留言板 (Message Board)
      */}
      <div className="h-screen bg-stone-100 flex items-center justify-center">
        <h2 className="text-3xl font-bold text-stone-600">更多浪漫内容即将呈现...</h2>
      </div>
    </main>
  );
}
