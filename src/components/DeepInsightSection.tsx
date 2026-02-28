"use client";

import { motion } from "framer-motion";
import { Quote, Sparkles } from "lucide-react";

export default function DeepInsightSection() {
  // 结合了 19万条消息以及多段深度上下文提取出的最终情感洞察报告
  const insights = [
    {
      title: "关于倾听与共情",
      text: "从几十万字的聊天记录中，能清晰看到她对『分享日常』的极度渴望。无论是吐槽导师、讲同学的八卦、还是说到路上的一只狗，她真正需要的不是解决方案，而是你的一句『宝宝我在听』和坚定的情绪价值提供。就像那次她生病发烧到 35.6 度时，她最本能的反应是『好难受，好想跟你说说话』。",
      icon: "Ear"
    },
    {
      title: "关于安全感与细节",
      text: "数据不会骗人，在争吵或有情绪波动的时刻（如深夜论文焦虑时），她经常使用『委屈』、『不想理』。这背后的核心需求往往是因为『语速过快』、『没有及时打字回应』等微小细节让她产生了不安。她需要的爱，是能够被看见、被接住的温柔，是可以陪她『在洗澡和睡前一起梳理明天计划』的安稳。",
      icon: "ShieldCheck"
    },
    {
      title: "关于未来的规划",
      text: "在那些深刻的长段对话里（无论是探讨长辈的往事还是对未来的担忧），她展现出了对两人共同未来的向往。即使偶尔有抱怨，也是因为『想要每天都看到进展』。你的『向下兼容』、你的陪伴和理解，是她在这段关系中最珍视的依靠。",
      icon: "Compass"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-stone-50 to-white overflow-hidden relative">
      {/* 装饰背景 */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-100/50 rounded-full blur-3xl pointer-events-none transform translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-100/50 rounded-full blur-3xl pointer-events-none transform -translate-x-1/2 translate-y-1/2" />

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-4">
            <Sparkles className="w-12 h-12 text-purple-500" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-stone-800 mb-4 tracking-wider">
            AI 情感洞察报告
          </h2>
          <div className="w-24 h-1 bg-purple-300 mx-auto rounded-full mb-6" />
          <p className="text-stone-600 max-w-xl mx-auto text-lg leading-relaxed">
            基于我们 <span className="font-bold text-purple-500">2,585</span> 次深度长谈，<br/>
            跨越 <span className="font-bold text-purple-500">190,000+</span> 条消息的上下文语境分析。
          </p>
        </motion.div>

        <div className="space-y-8">
          {insights.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-purple-50 hover:shadow-2xl transition-shadow relative overflow-hidden group"
            >
              {/* 左侧装饰条 */}
              <div className="absolute left-0 top-0 bottom-0 w-2 bg-purple-400 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <Quote className="w-8 h-8 text-purple-300 transform rotate-180" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-stone-800 mb-4">{item.title}</h3>
                  <p className="text-stone-600 leading-loose text-lg font-serif" style={{ fontFamily: "'Kaiti', 'STKaiti', serif" }}>
                    {item.text}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
