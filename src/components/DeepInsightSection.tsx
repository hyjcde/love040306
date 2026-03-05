"use client";

import { motion } from "framer-motion";
import { Quote, Sparkles } from "lucide-react";

export default function DeepInsightSection() {
  const insights = [
    {
      title: "关于倾听与共情",
      text: "从几十万字的聊天记录中，能清晰看到她对『分享日常』的极度渴望。无论是吐槽导师、讲同学的八卦、还是说到路上的一只狗，她真正需要的不是解决方案，而是你的一句『宝宝我在听』和坚定的情绪价值提供。就像那次她生病发烧到 35.6 度时，她最本能的反应是『好难受，好想跟你说说话』。",
      accent: "from-rose-400 to-pink-400",
    },
    {
      title: "关于安全感与细节",
      text: "数据不会骗人，在争吵或有情绪波动的时刻（如深夜论文焦虑时），她经常使用『委屈』、『不想理』。这背后的核心需求往往是因为『语速过快』、『没有及时打字回应』等微小细节让她产生了不安。她需要的爱，是能够被看见、被接住的温柔，是可以陪她『在洗澡和睡前一起梳理明天计划』的安稳。",
      accent: "from-purple-400 to-indigo-400",
    },
    {
      title: "关于未来的规划",
      text: "在那些深刻的长段对话里（无论是探讨长辈的往事还是对未来的担忧），她展现出了对两人共同未来的向往。即使偶尔有抱怨，也是因为『想要每天都看到进展』。你的『向下兼容』、你的陪伴和理解，是她在这段关系中最珍视的依靠。",
      accent: "from-amber-400 to-rose-400",
    },
  ];

  return (
    <section className="py-24 overflow-hidden relative">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-100/30 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-100/30 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 rounded-full bg-purple-50 border border-purple-100/60 flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-purple-400" />
            </div>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-stone-800 tracking-tight">
            AI 情感洞察报告
          </h2>
          <div className="mt-4 w-16 h-1 bg-linear-to-r from-purple-300 to-rose-300 mx-auto rounded-full" />
          <p className="mt-6 text-stone-500 max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
            基于我们{" "}
            <span className="font-bold text-purple-500">2,585</span> 次深度长谈，
            <br />
            跨越{" "}
            <span className="font-bold text-purple-500">190,000+</span>{" "}
            条消息的上下文语境分析。
          </p>
        </motion.div>

        <div className="space-y-6 sm:space-y-8">
          {insights.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative bg-white/70 backdrop-blur-md rounded-3xl shadow-lg border border-stone-100/80 overflow-hidden hover:shadow-xl transition-shadow duration-500"
            >
              {/* Top gradient accent bar */}
              <div
                className={`h-1 bg-linear-to-r ${item.accent} scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500`}
              />

              <div className="p-6 sm:p-8 md:p-10">
                <div className="flex items-start gap-4">
                  <Quote className="w-8 h-8 text-purple-200 shrink-0 rotate-180 mt-1" />
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-stone-800 mb-4">
                      {item.title}
                    </h3>
                    <p
                      className="text-stone-600 leading-loose text-base sm:text-lg"
                      style={{
                        fontFamily: "'Kaiti', 'STKaiti', 'KaiTi', serif",
                      }}
                    >
                      {item.text}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
