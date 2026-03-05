import { dedupedPhotos } from "./photos-deduped";

export const siteConfig = {
  // 纪念日时间：在一起 2023.07.08，格式 YYYY-MM-DDTHH:mm:ss
  anniversaryDate: "2023-07-08T00:00:00",
  // BGM：当前为 public/music/music.mp3。想换歌：把新 mp3 放到 public/music/ 并改下面路径，或直接替换 music.mp3
  musicUrl: "/music/music.mp3",

  // Hero 背景轮播：从照片墙里选（跳过最前面几张），多张轮换
  heroImages: dedupedPhotos.slice(8).map((p) => p.src),

  // 打字机留言板内容（支持多段落，用数组表示）
  messages: [
    "亲爱的宝宝：",
    "我们的故事还有很长很长……",
    "最爱最爱的宝宝，",
    "爱你的鱼。"
  ],

  // 我们的故事 - 时间轴数据
  timeline: [
    {
      date: "2023年4月12日 08:30:57",
      title: "故事的开始",
      description: "我们的第一条微信聊天记录，从这一刻起，两颗心开始慢慢靠近。",
      icon: "Heart"
    },
    {
      date: "一起走过的足迹",
      title: "黄浦江畔的晚风",
      description: "夜幕下的外滩，灯火辉煌，江面上波光粼粼。我们在游船上并肩而立，感受着夜晚的微风。",
      icon: "MapPin"
    },
    {
      date: "每一个平凡的日子",
      title: "相伴的时光",
      description: "不论是漫步在城市的街头，还是依偎在一起看繁星点点，有你的每一天都是独一无二的纪念。",
      icon: "Star"
    },
    {
      date: "未来可期",
      title: "一直走下去",
      description: "距离和时间从来不是我们的阻碍，而是让这份爱变得更加珍贵的礼物。未来的每一页，我都想和你一起写下。",
      icon: "Infinity"
    }
  ],

  // 回忆画廊（去重 + 描述多样化，由 scripts/dedup-photos.js 生成 photos-deduped.ts）
  photos: dedupedPhotos,
};
