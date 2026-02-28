"use client";

import { motion } from "framer-motion";
import { deepChatAnalysis } from "@/lib/deepChatAnalysis";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip, AreaChart, Area, XAxis, YAxis } from "recharts";
import { Activity, HeartHandshake } from "lucide-react";

export default function AnalysisSection() {
  // 处理雷达图数据（分析女方的需求维度）
  const radarData = Object.keys(deepChatAnalysis.herNeeds).map(key => ({
    subject: key,
    A: deepChatAnalysis.herNeeds[key as keyof typeof deepChatAnalysis.herNeeds],
    fullMark: Math.max(...Object.values(deepChatAnalysis.herNeeds)) + 100
  }));

  // 处理活跃度时间分布数据（24小时）
  const hourlyData = deepChatAnalysis.hourly.map((count, hour) => ({
    time: `${hour}:00`,
    messages: count
  }));

  return (
    <section className="py-24 bg-stone-50 overflow-hidden relative">
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-4">
            <Activity className="w-12 h-12 text-indigo-500" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-stone-800 mb-4 tracking-wider">
            深度相处报告
          </h2>
          <div className="w-24 h-1 bg-indigo-300 mx-auto rounded-full mb-6" />
          <p className="text-stone-600 max-w-xl mx-auto text-lg">
            通过数据挖掘，看看猪猪宝（然）最需要什么，以及我们最容易在哪个时间点心跳同频。
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          
          {/* 雷达图：她的需求分析 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white p-8 rounded-3xl shadow-lg border border-stone-100 flex flex-col items-center"
          >
            <h3 className="text-xl font-bold text-stone-700 mb-2 flex items-center gap-2">
              <HeartHandshake className="w-5 h-5 text-pink-500" />
              猪猪宝的情感需求雷达
            </h3>
            <p className="text-stone-400 text-sm mb-6 text-center">基于聊天内容中的情绪词、动词及句式分析</p>
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#57534e', fontSize: 14, fontWeight: 'bold' }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Radar name="表达次数" dataKey="A" stroke="#ec4899" fill="#fbcfe8" fillOpacity={0.6} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            
            {/* 随机展示几句委屈/撒娇的话 */}
            <div className="mt-4 bg-stone-50 p-4 rounded-xl w-full border border-stone-100">
              <p className="text-xs text-stone-400 mb-2 font-mono uppercase tracking-widest">Random Evidence:</p>
              <p className="text-sm text-stone-600 italic">
                "{deepChatAnalysis.quotes[Math.floor(Math.random() * deepChatAnalysis.quotes.length)] || "抱抱我..."}"
              </p>
            </div>
          </motion.div>

          {/* 面积图：24小时活跃度 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white p-8 rounded-3xl shadow-lg border border-stone-100 flex flex-col items-center"
          >
            <h3 className="text-xl font-bold text-stone-700 mb-2">24小时聊天活跃度心电图</h3>
            <p className="text-stone-400 text-sm mb-6 text-center">我们每天在什么时间最黏对方？</p>
            <div className="w-full h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={hourlyData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorMessages" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" tick={{fontSize: 12, fill: '#78716c'}} axisLine={false} tickLine={false} />
                  <YAxis hide={true} />
                  <Tooltip 
                    cursor={{ stroke: '#a8a29e', strokeWidth: 1, strokeDasharray: '3 3' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey="messages" name="消息数" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorMessages)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
