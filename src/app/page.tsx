import Hero from "@/components/Hero";
import MusicPlayer from "@/components/MusicPlayer";
import Timeline from "@/components/Timeline";
import WordCloudSection from "@/components/WordCloudSection";
import AnalysisSection from "@/components/AnalysisSection";
import DeepInsightSection from "@/components/DeepInsightSection";
import Gallery from "@/components/Gallery";
import MessageBoard from "@/components/MessageBoard";
import ChatWidget from "@/components/ChatWidget";
import BackToTop from "@/components/BackToTop";
import SectionDivider from "@/components/SectionDivider";
import RomanticFooter from "@/components/RomanticFooter";
import { siteConfig } from "@/lib/data";

export default function Home() {
  return (
    <main className="min-h-screen w-full relative">
      {/* 音乐播放器，浮动在屏幕右上角 */}
      <MusicPlayer src={siteConfig.musicUrl} />

      {/* 随机聊天金句盲盒，浮动在屏幕右下角 */}
      <ChatWidget />

      {/* 回到顶部 */}
      <BackToTop />

      {/* 首屏：时间轴与倒计时 */}
      <div className="relative bg-linear-to-b from-black via-stone-950 to-stone-900">
        <Hero />
      </div>

      {/* Section divider: dark → light warm */}
      <div className="bg-stone-50 text-stone-50">
        <SectionDivider variant="wave" />
      </div>

      {/* 我们的故事 - gradient wrapper */}
      <div className="bg-linear-to-b from-stone-100 via-stone-50 to-stone-50">
        <Timeline />
      </div>

      {/* Section divider: stone → pink */}
      <div className="bg-pink-50/50 text-pink-50/50">
        <SectionDivider variant="curve" flip />
      </div>

      {/* 聊天年度词云 */}
      <div className="bg-linear-to-b from-stone-50 via-pink-50/60 to-pink-50/50">
        <WordCloudSection />
      </div>

      {/* Section divider: pink → stone */}
      <div className="bg-stone-50 text-stone-50">
        <SectionDivider variant="blob" />
      </div>

      {/* 深度聊天分析图表 */}
      <div className="bg-linear-to-b from-pink-50/50 via-stone-50 to-stone-50">
        <AnalysisSection />
      </div>

      {/* Section divider: stone → white */}
      <div className="bg-white text-white">
        <SectionDivider variant="wave" flip />
      </div>

      {/* AI 情感洞察报告 */}
      <div className="bg-linear-to-b from-stone-50 via-stone-50/95 to-white">
        <DeepInsightSection />
      </div>

      {/* Section divider: white → rose/amber */}
      <div className="bg-rose-50/80 text-rose-50/80">
        <SectionDivider variant="curve" />
      </div>

      {/* 回忆画廊 */}
      <div className="bg-linear-to-b from-white via-rose-50/70 to-amber-50/60">
        <Gallery />
      </div>

      {/* Section divider: warm → message area */}
      <div className="bg-stone-100 text-stone-100">
        <SectionDivider variant="blob" flip />
      </div>

      {/* 留言板与打字机 */}
      <div className="bg-linear-to-b from-amber-50/40 via-stone-100 to-stone-200">
        <MessageBoard />
      </div>

      {/* Section divider: stone → dark footer */}
      <div className="bg-stone-900 text-stone-900">
        <SectionDivider variant="wave" />
      </div>

      {/* Romantic footer with floating hearts */}
      <RomanticFooter />
    </main>
  );
}
