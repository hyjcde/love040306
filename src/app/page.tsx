import Hero from "@/components/Hero";
import MusicPlayer from "@/components/MusicPlayer";
import Timeline from "@/components/Timeline";
import Gallery from "@/components/Gallery";
import MessageBoard from "@/components/MessageBoard";
import { siteConfig } from "@/lib/data";

export default function Home() {
  return (
    <main className="min-h-screen w-full relative">
      {/* 音乐播放器，浮动在屏幕右上角 */}
      <MusicPlayer src={siteConfig.musicUrl} />

      {/* 首屏：时间轴与倒计时 */}
      <Hero />

      {/* 我们的故事 */}
      <Timeline />

      {/* 回忆画廊 */}
      <Gallery />

      {/* 留言板与打字机 */}
      <MessageBoard />

      {/* 简单的页脚 */}
      <footer className="bg-stone-900 py-8 text-center text-stone-400 text-sm">
        <p>© {new Date().getFullYear()} Love 0403. Built with ❤️ by 小鱼.</p>
      </footer>
    </main>
  );
}
