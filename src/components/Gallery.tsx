"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { siteConfig } from "@/lib/data";

const PHOTOS_PER_PAGE = 12;

// 根据索引生成确定的随机旋转角度（-3° 到 3°），保持一致性
function getRotation(index: number): number {
  const seed = index * 7;
  return ((seed % 7) - 3) * 1; // -3, -2, -1, 0, 1, 2, 3
}

export default function Gallery() {
  const photos = siteConfig.photos;
  const totalCount = photos.length;

  const [displayCount, setDisplayCount] = useState(PHOTOS_PER_PAGE);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const visiblePhotos = photos.slice(0, displayCount);
  const hasMore = displayCount < totalCount;

  const loadMore = useCallback(() => {
    setDisplayCount((prev) => Math.min(prev + PHOTOS_PER_PAGE, totalCount));
  }, [totalCount]);

  // Lightbox 键盘导航
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxIndex(null);
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev - 1 + totalCount) % totalCount
        );
      } else if (e.key === "ArrowRight") {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % totalCount
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, totalCount]);

  const goPrev = () =>
    setLightboxIndex((prev) =>
      prev === null ? null : (prev - 1 + totalCount) % totalCount
    );
  const goNext = () =>
    setLightboxIndex((prev) =>
      prev === null ? null : (prev + 1) % totalCount
    );

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  return (
    <section
      className="relative py-24 overflow-hidden bg-linear-to-b from-rose-50/80 via-white to-amber-50/50"
      id="gallery"
    >
      {/* 装饰性背景 */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-rose-200/20 blur-3xl" />
        <div className="absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-amber-200/20 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* 标题区 */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-stone-800 tracking-tight">
            回忆画廊
          </h2>
          <div className="mt-4 h-1 w-20 mx-auto rounded-full bg-linear-to-r from-rose-300 to-amber-300" />
          <p className="mt-6 text-stone-500 max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
            每一个瞬间，都值得被珍藏。这是属于我们的独家记忆。
          </p>

          {/* 照片计数器 */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-4 text-sm text-rose-400/90 font-medium"
          >
            已展示 {visiblePhotos.length} / 总共 {totalCount} 张
          </motion.p>
        </motion.div>

        {/* 照片网格 - 拍立得风格 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {visiblePhotos.map((photo, index) => {
              const rotation = getRotation(index);
              const isNewBatch = index >= displayCount - PHOTOS_PER_PAGE && index < displayCount;

              return (
                <motion.article
                  key={index}
                  layout
                  initial={isNewBatch ? { opacity: 0, y: 20, scale: 0.95 } : false}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.5,
                    delay: (index % PHOTOS_PER_PAGE) * 0.04,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{
                    rotate: rotation + (rotation >= 0 ? 2 : -2),
                    scale: 1.02,
                    transition: { duration: 0.3 },
                  }}
                  className="group relative cursor-pointer"
                  style={{ rotate: rotation }}
                  onClick={() => openLightbox(index)}
                >
                  {/* 拍立得卡片 - 白色边框 + 阴影 */}
                  <div className="relative bg-white p-3 sm:p-4 pb-14 sm:pb-16 rounded-sm shadow-lg shadow-stone-200/60 group-hover:shadow-xl group-hover:shadow-rose-200/40 transition-all duration-300">
                    <div className="relative w-full aspect-4/5 overflow-hidden rounded-sm bg-stone-100">
                      <Image
                        src={photo.src}
                        alt={photo.caption}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        unoptimized
                        priority={index < 8}
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    {/* 拍立得底部手写文字区 */}
                    <div className="absolute bottom-3 left-0 right-0 px-2 text-center">
                      <p
                        className="text-stone-600 text-sm sm:text-base font-medium"
                        style={{ fontFamily: "'Kaiti', 'STKaiti', 'KaiTi', serif" }}
                      >
                        {photo.caption}
                      </p>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>

        {/* 加载更多按钮 */}
        <AnimatePresence>
          {hasMore && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-14 flex justify-center"
            >
              <motion.button
                onClick={loadMore}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3.5 rounded-full bg-linear-to-r from-rose-400 to-amber-400 text-white font-medium shadow-lg shadow-rose-300/40 hover:shadow-rose-400/50 transition-shadow duration-300"
              >
                加载更多
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Lightbox 全屏 overlay */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            onClick={closeLightbox}
          >
            {/* 关闭按钮 */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.1 }}
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
              className="absolute top-6 right-6 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="关闭"
            >
              <X size={24} strokeWidth={2} />
            </motion.button>

            {/* 左箭头 */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.1 }}
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="上一张"
            >
              <ChevronLeft size={32} strokeWidth={2} />
            </motion.button>

            {/* 右箭头 */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.1 }}
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="下一张"
            >
              <ChevronRight size={32} strokeWidth={2} />
            </motion.button>

            {/* 图片容器 - 阻止点击冒泡 */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-5xl max-h-[85vh] mx-4 aspect-4/3 sm:aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={photos[lightboxIndex].src}
                alt={photos[lightboxIndex].caption}
                fill
                sizes="100vw"
                className="object-contain"
                unoptimized
                priority
              />
              <p
                className="absolute bottom-0 left-0 right-0 py-3 text-center text-white/90 text-sm sm:text-base"
                style={{ fontFamily: "'Kaiti', 'STKaiti', 'KaiTi', serif" }}
              >
                {photos[lightboxIndex].caption}
              </p>
            </motion.div>

            {/* 底部页码 */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.15 }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm"
            >
              {lightboxIndex + 1} / {totalCount}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
