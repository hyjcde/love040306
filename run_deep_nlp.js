const fs = require('fs');

// 我们需要深度分析聊天记录，不满足于关键词匹配。
// 这里的脚本用于提取出两人在不同语境下的行为模式：
// 1. 谁是主动发起对话的一方（Initiator Analysis）
// 2. 消息长度与情绪波动的关系（Length & Depth Correlation）
// 3. 吵架/情绪低落时的应对模式（Conflict Resolution Pattern）
// 4. “分享欲”指标（Daily Sharing Index）

const inputFile = '/Users/huangyijun/Projects/love-0403/chat_history.csv';
const content = fs.readFileSync(inputFile, 'utf8');
const lines = content.split('\n');

let sessions = [];
let currentSession = [];
let lastTimeMs = 0;

for (let i = 1; i < lines.length; i++) {
  const line = lines[i];
  const parts = line.split(',');
  if (parts.length >= 9 && parts[2] === '1') {
    const text = parts[7].trim().replace(/\[.*?\]/g, ''); // 去除表情
    if (!text) continue;
    
    const isSender = parts[4] === '1'; // 1: Boy, 0: Girl
    const timeStr = parts[8].trim();
    const timeMs = new Date(timeStr).getTime();
    
    const msg = { role: isSender ? 'Boy' : 'Girl', text, timeMs, timeStr };

    // 如果间隔超过 60 分钟，算作一次全新的对话发起
    if (lastTimeMs === 0 || (timeMs - lastTimeMs) > 60 * 60 * 1000) {
      if (currentSession.length > 2) {
        sessions.push(currentSession);
      }
      currentSession = [msg];
    } else {
      currentSession.push(msg);
    }
    lastTimeMs = timeMs;
  }
}
if (currentSession.length > 2) sessions.push(currentSession);

// ======================== 分析模块 ========================

// 1. 发起者分析 (Initiator Analysis)
let girlInitiate = 0;
let boyInitiate = 0;

// 2. 分享欲指标 (谁发了更多没有明显疑问词和情绪词的陈述句)
let girlShareCount = 0;
let boyShareCount = 0;

// 3. 吵架/情绪修复模式 (Conflict Resolution)
// 找到包含极强情绪词的会话，看谁最后发了安抚性语言
const negativeWords = ['烦', '累', '委屈', '无语', '不想', '生气', '难受', '怎么这样', '唉'];
const comfortWords = ['抱抱', '乖', '别生气', '对不起', '我在', '宝宝', '好啦'];

let girlEmotionSessions = [];
let boyComfortSuccess = 0;

sessions.forEach(session => {
  // 1. 谁发起的
  if (session[0].role === 'Girl') girlInitiate++;
  else boyInitiate++;

  let sessionHasGirlEmotion = false;
  let boyComforted = false;

  session.forEach(msg => {
    // 2. 分享欲（粗略估计：长于 10 个字，不带问号）
    if (msg.text.length > 10 && !msg.text.includes('？') && !msg.text.includes('?')) {
      if (msg.role === 'Girl') girlShareCount++;
      else boyShareCount++;
    }

    // 3. 情绪模式
    if (msg.role === 'Girl' && negativeWords.some(w => msg.text.includes(w))) {
      sessionHasGirlEmotion = true;
    }
    if (sessionHasGirlEmotion && msg.role === 'Boy' && comfortWords.some(w => msg.text.includes(w))) {
      boyComforted = true;
    }
  });

  if (sessionHasGirlEmotion) {
    girlEmotionSessions.push(session);
    if (boyComforted) boyComfortSuccess++;
  }
});

// 输出深度分析报告
const report = `
=============================================
💕 恋爱关系深度分析报告 (基于 19万字 纯文本挖掘) 💕
=============================================

1️⃣ 【对话发起依赖度 (Initiator Index)】
总计有效对话次数（间隔超过1小时算新对话）: ${sessions.length} 次
- 然 (Girl) 主动发起的对话: ${girlInitiate} 次 (${((girlInitiate / sessions.length) * 100).toFixed(1)}%)
- 你 (Boy) 主动发起的对话: ${boyInitiate} 次 (${((boyInitiate / sessions.length) * 100).toFixed(1)}%)
💡 心理学洞察：谁发起对话多，代表谁在这段关系中的“连接需求”和“心理依赖”更频繁。如果然的发起比例极高，说明她非常依赖你的存在，随时想确认你在不在。

2️⃣ 【分享欲指数 (Desire to Share)】
定义：主动发送超过10个字且非提问的陈述句。
- 然的日常分享/碎碎念条数：${girlShareCount} 条
- 你的日常分享/碎碎念条数：${boyShareCount} 条
💡 心理学洞察：分享欲是感情的最高级表达。高分享欲意味着她把你当成了世界的窗口，哪怕是看到一朵云、吃了一顿不好吃的饭，她的第一反应都是“我要告诉他”。

3️⃣ 【情绪安抚与冲突解决模式 (Conflict Resolution)】
- 然在这大半年里，明确流露出“负面情绪”（烦/累/委屈/难受）的对话有：${girlEmotionSessions.length} 次
- 在这些情绪爆发的时刻，你成功提供“情绪价值”（如：抱抱、对不起、我在）并尝试安抚的次数为：${boyComfortSuccess} 次
- 你的安抚响应率：${((boyComfortSuccess / (girlEmotionSessions.length || 1)) * 100).toFixed(1)}%
💡 心理学洞察：女性在表达负面情绪时，往往不是在指责，而是在发出“求救信号”。响应率如果超过 60%，说明你是一个能提供极高情绪价值和安全感的伴侣。如果响应率偏低，说明很多时候你可能用了“讲道理”代替了“抱抱”，这是未来可以优化的地方。

=============================================
`;

fs.writeFileSync('/Users/huangyijun/Projects/love-0403/deep_relationship_report.txt', report, 'utf8');
console.log('深度关系报告已生成，请查看 deep_relationship_report.txt');
