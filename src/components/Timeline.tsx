"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/lib/data";
import { Heart, MapPin, Star, Infinity as InfinityIcon } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Heart: <Heart className="w-5 h-5 text-rose-500" />,
  MapPin: <MapPin className="w-5 h-5 text-rose-500" />,
  Star: <Star className="w-5 h-5 text-rose-500" />,
  Infinity: <InfinityIcon className="w-5 h-5 text-rose-500" />,
};

export default function Timeline() {
  return (
    <section className="py-24 overflow-hidden" id="timeline">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <h2 className="text-2xl md:text-4xl font-semibold text-stone-700 tracking-tight">
            我们的故事
          </h2>
          <div className="mt-3 w-12 h-0.5 bg-stone-300 mx-auto rounded-full" />
        </motion.div>

        <div className="relative">
          {/* Center line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-linear-to-b from-rose-200 via-rose-300 to-rose-200 md:-translate-x-px" />

          {siteConfig.timeline.map((item, index) => {
            const isLeft = index % 2 === 0;
            return (
              <div
                key={index}
                className={`relative flex items-start mb-16 last:mb-0 ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Spacer */}
                <div className="hidden md:block md:w-1/2" />

                {/* Center dot */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: 0.2,
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                    }}
                    className="w-12 h-12 rounded-full bg-white border-2 border-rose-200 shadow-lg shadow-rose-100/50 flex items-center justify-center"
                  >
                    {iconMap[item.icon] || <Heart className="w-5 h-5 text-rose-500" />}
                  </motion.div>
                </div>

                {/* Card */}
                <motion.div
                  initial={{
                    opacity: 0,
                    x: isLeft ? -40 : 40,
                    y: 10,
                  }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.7,
                    delay: 0.15,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="w-full pl-20 md:pl-0 md:w-[calc(50%-2rem)]"
                >
                  <div
                    className={`group relative p-6 sm:p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-xl border border-stone-100/80 transition-all duration-500 ${
                      isLeft ? "md:mr-8" : "md:ml-8"
                    }`}
                  >
                    {/* Accent bar on hover */}
                    <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-linear-to-r from-rose-300 to-pink-300 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />

                    <span className="inline-block px-3 py-1 bg-rose-50 text-rose-500 text-xs font-semibold rounded-full mb-4 tracking-wide">
                      {item.date}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-stone-800 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-stone-500 leading-relaxed text-sm sm:text-base">
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
