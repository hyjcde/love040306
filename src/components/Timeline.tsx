"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/lib/data";
import { Heart, MapPin, Star, Infinity as InfinityIcon } from "lucide-react";

// 简单的图标映射字典
const iconMap: Record<string, React.ReactNode> = {
  Heart: <Heart className="w-6 h-6 text-pink-500" />,
  MapPin: <MapPin className="w-6 h-6 text-pink-500" />,
  Star: <Star className="w-6 h-6 text-pink-500" />,
  Infinity: <InfinityIcon className="w-6 h-6 text-pink-500" />,
};

export default function Timeline() {
  return (
    <section className="py-24 bg-stone-50 overflow-hidden" id="timeline">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-stone-800 mb-4 tracking-wider">
            我们的故事
          </h2>
          <div className="w-24 h-1 bg-pink-300 mx-auto rounded-full" />
        </motion.div>

        <div className="relative">
          {/* 中间的竖线 */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-pink-200 transform md:-translate-x-1/2" />

          {siteConfig.timeline.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <div 
                key={index}
                className={`relative flex items-center justify-between mb-16 w-full ${
                  isEven ? "md:flex-row-reverse" : "md:flex-row"
                }`}
              >
                {/* 移动端排版修正：左侧留空位给线条 */}
                <div className="hidden md:block w-5/12" />
                
                {/* 中间的图标 */}
                <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-white border-4 border-pink-100 shadow-md z-10">
                  {iconMap[item.icon] || <Heart className="w-6 h-6 text-pink-500" />}
                </div>

                {/* 内容卡片 */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="w-full pl-16 md:pl-0 md:w-5/12"
                >
                  <div className={`p-6 bg-white rounded-2xl shadow-lg border border-stone-100 hover:shadow-xl transition-shadow duration-300 relative ${
                    isEven ? "md:text-left" : "md:text-right"
                  }`}>
                    {/* 小三角形指向竖线 */}
                    <div className={`hidden md:block absolute top-6 w-4 h-4 bg-white border-t border-r border-stone-100 transform ${
                      isEven ? "-left-2 -rotate-135 border-b-0 border-l-0" : "-right-2 rotate-45"
                    }`} />
                    
                    <span className="inline-block px-3 py-1 bg-pink-50 text-pink-600 text-sm font-semibold rounded-full mb-3">
                      {item.date}
                    </span>
                    <h3 className="text-xl font-bold text-stone-800 mb-3">{item.title}</h3>
                    <p className="text-stone-600 leading-relaxed text-sm md:text-base">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
