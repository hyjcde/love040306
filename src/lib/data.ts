export const siteConfig = {
  // 纪念日时间：注意格式 YYYY-MM-DDTHH:mm:ss
  anniversaryDate: "2023-04-03T00:00:00", 
  musicUrl: "/music/music.mp3",
  
  // Hero 区域轮播图
  heroImages: [
    "/pic/pic1.jpg",
    "/pic/pic2.jpg",
    "/pic/pic3.jpg",
    "/pic/1.JPG"
  ],

  // 打字机留言板内容（支持多段落，用数组表示）
  messages: [
    "亲爱的长颈鹿小姐：",
    "时光荏苒，不知不觉我们已经走过了这么多的日日夜夜。",
    "曾经的那个小鱼，依然在你的回忆里遨游，",
    "而在天空下漫步的长颈鹿，也始终牵动着我的心。",
    "从最初的相识，到如今的相伴，每一帧画面都如繁星般璀璨。",
    "不论未来的路有多远，距离有多长，",
    "我们的心跳始终同频共振。",
    "期待我们再次相拥的那一天，",
    "永远爱你的，小鱼。"
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

  // 回忆画廊照片列表（原有一组 + 从「爱宝宝」相簿导出的 fav_001～fav_305）
  photos: [
    { src: "/pic/pic1.jpg", caption: "外滩的夜晚，最美的风景是你" },
    { src: "/pic/pic2.jpg", caption: "黄浦江上的游船" },
    { src: "/pic/pic3.jpg", caption: "宝宝和宝宝，永远在一起" },
    { src: "/pic/1.JPG", caption: "那些开心的瞬间" },
    { src: "/pic/2.JPG", caption: "美好的回忆" },
    { src: "/pic/3.jpg", caption: "点点滴滴" },
    { src: "/pic/16.JPG", caption: "阳光下的你" },
    { src: "/pic/17.JPG", caption: "牵着手走过的路" },
    ...Array.from({ length: 305 }, (_, i) => ({
      src: `/pic/fav_${String(i + 1).padStart(3, "0")}.jpg`,
      caption: "爱宝宝",
    })),
  ],
};
