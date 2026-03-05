"use client";

import { motion } from "framer-motion";
import { deepChatAnalysis } from "@/lib/deepChatAnalysis";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
  AreaChart,
  Area,
  XAxis,
  YAxis,
} from "recharts";
import { Activity, HeartHandshake } from "lucide-react";

export default function AnalysisSection() {
  const radarData = Object.keys(deepChatAnalysis.herNeeds).map((key) => ({
    subject: key,
    A: deepChatAnalysis.herNeeds[key as keyof typeof deepChatAnalysis.herNeeds],
    fullMark: Math.max(...Object.values(deepChatAnalysis.herNeeds)) + 100,
  }));

  const hourlyData = deepChatAnalysis.hourly.map((count, hour) => ({
    time: `${hour}:00`,
    messages: count,
  }));

  return (
    <section className="py-24 overflow-hidden relative">
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 rounded-full bg-indigo-50 border border-indigo-100/60 flex items-center justify-center">
              <Activity className="w-7 h-7 text-indigo-400" />
            </div>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-stone-800 tracking-tight">
            深度相处报告
          </h2>
          <div className="mt-4 w-16 h-1 bg-linear-to-r from-indigo-300 to-purple-300 mx-auto rounded-full" />
          <p className="mt-6 text-stone-500 max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
            通过数据挖掘，看看猪猪宝（然）最需要什么，
            <br className="hidden sm:block" />
            以及我们最容易在哪个时间点心跳同频。
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {/* Radar chart */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white/70 backdrop-blur-md p-6 sm:p-8 rounded-3xl shadow-lg border border-stone-100/80 flex flex-col items-center"
          >
            <h3 className="text-lg sm:text-xl font-bold text-stone-700 mb-1 flex items-center gap-2">
              <HeartHandshake className="w-5 h-5 text-rose-400" />
              猪猪宝的情感需求雷达
            </h3>
            <p className="text-stone-400 text-xs sm:text-sm mb-6 text-center">
              基于聊天内容中的情绪词、动词及句式分析
            </p>
            <div className="w-full h-[280px] sm:h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart
                  cx="50%"
                  cy="50%"
                  outerRadius="70%"
                  data={radarData}
                >
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fill: "#57534e", fontSize: 13, fontWeight: "bold" }}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0 4px 12px rgb(0 0 0 / 0.08)",
                    }}
                  />
                  <Radar
                    name="表达次数"
                    dataKey="A"
                    stroke="#f43f5e"
                    fill="#fecdd3"
                    fillOpacity={0.5}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 bg-stone-50 p-4 rounded-xl w-full border border-stone-100">
              <p className="text-xs text-stone-400 mb-2 tracking-widest uppercase">
                Random Evidence
              </p>
              <p className="text-sm text-stone-600 italic leading-relaxed">
                &ldquo;
                {deepChatAnalysis.quotes[
                  Math.floor(Math.random() * deepChatAnalysis.quotes.length)
                ] || "抱抱我..."}
                &rdquo;
              </p>
            </div>
          </motion.div>

          {/* Area chart */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white/70 backdrop-blur-md p-6 sm:p-8 rounded-3xl shadow-lg border border-stone-100/80 flex flex-col items-center"
          >
            <h3 className="text-lg sm:text-xl font-bold text-stone-700 mb-1">
              24小时聊天活跃度心电图
            </h3>
            <p className="text-stone-400 text-xs sm:text-sm mb-6 text-center">
              我们每天在什么时间最黏对方？
            </p>
            <div className="w-full h-[280px] sm:h-[370px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={hourlyData}
                  margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="colorMessages"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.7} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="time"
                    tick={{ fontSize: 11, fill: "#78716c" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis hide />
                  <Tooltip
                    cursor={{
                      stroke: "#a8a29e",
                      strokeWidth: 1,
                      strokeDasharray: "3 3",
                    }}
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0 4px 12px rgb(0 0 0 / 0.08)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="messages"
                    name="消息数"
                    stroke="#8b5cf6"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorMessages)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
