"use client";

import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import { siteConfig } from "@/lib/data";
import { Heart, Feather } from "lucide-react";

export default function MessageBoard() {
  return (
    <section className="py-24 overflow-hidden relative" id="message">
      {/* Decorative blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-rose-200/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-pink-200/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-100/15 rounded-full blur-3xl" />
      </div>

      <div className="max-w-3xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Letter envelope styling */}
          <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-xl border border-white/80 overflow-hidden">
            {/* Top decorative strip */}
            <div className="h-1.5 bg-linear-to-r from-rose-300 via-pink-300 to-amber-300" />

            <div className="p-8 sm:p-10 md:p-14">
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <motion.div
                  className="relative"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="w-16 h-16 bg-linear-to-br from-rose-50 to-pink-50 rounded-full flex items-center justify-center border border-rose-100/60 shadow-sm">
                    <Feather className="w-7 h-7 text-rose-400" />
                  </div>
                </motion.div>
              </div>

              {/* Title */}
              <h2
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-stone-800 mb-3 tracking-wider"
                style={{ fontFamily: "'Kaiti', 'STKaiti', 'KaiTi', serif" }}
              >
                写给你的信
              </h2>
              <div className="flex justify-center mb-10">
                <Heart className="w-4 h-4 text-rose-300" />
              </div>

              {/* Typewriter content */}
              <div
                className="text-lg sm:text-xl md:text-2xl leading-relaxed sm:leading-loose text-stone-600 min-h-[320px]"
                style={{ fontFamily: "'Kaiti', 'STKaiti', 'KaiTi', serif" }}
              >
                <Typewriter
                  options={{
                    delay: 80,
                    deleteSpeed: 30,
                    autoStart: true,
                    loop: false,
                    cursor: "|",
                  }}
                  onInit={(typewriter) => {
                    let tw = typewriter;
                    siteConfig.messages.forEach((msg, index) => {
                      tw = tw.typeString(msg).pauseFor(600);
                      if (index < siteConfig.messages.length - 1) {
                        tw = tw.typeString("<br/><br/>");
                      }
                    });
                    tw.start();
                  }}
                />
              </div>
            </div>

            {/* Bottom decorative strip */}
            <div className="h-1 bg-linear-to-r from-amber-300 via-pink-300 to-rose-300" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
