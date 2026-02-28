"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/lib/data";
import Image from "next/image";

export default function Gallery() {
  return (
    <section className="py-24 bg-white overflow-hidden" id="gallery">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-stone-800 mb-4 tracking-wider">
            回忆画廊
          </h2>
          <div className="w-24 h-1 bg-pink-300 mx-auto rounded-full mb-6" />
          <p className="text-stone-500 max-w-xl mx-auto text-lg">
            每一个瞬间，都值得被珍藏。这是属于我们的独家记忆。
          </p>
        </motion.div>

        {/* 瀑布流/网格布局 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {siteConfig.photos.map((photo, index) => {
            // 简单的随机旋转角度，制造拍立得随意摆放的感觉
            const rotation = index % 2 === 0 ? "hover:rotate-2" : "hover:-rotate-2";
            const delay = (index % 4) * 0.1;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay }}
                className={`relative group bg-white p-3 pb-12 rounded-lg shadow-md hover:shadow-2xl transition-all duration-300 ${rotation}`}
              >
                <div className="relative w-full aspect-[4/5] overflow-hidden rounded-md bg-stone-100">
                  <Image
                    src={photo.src}
                    alt={photo.caption}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    unoptimized // 如果图片在本地开发有加载问题，可开启此项
                  />
                  {/* 悬浮黑色遮罩 */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
                {/* 照片下方文字 */}
                <div className="absolute bottom-0 left-0 right-0 p-3 text-center">
                  <p className="text-stone-700 font-medium text-sm md:text-base font-serif" style={{ fontFamily: "'Kaiti', 'STKaiti', serif" }}>
                    {photo.caption}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
