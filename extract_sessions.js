const fs = require('fs');

const inputFile = '/Users/huangyijun/Projects/love-0403/chat_history.csv';
const content = fs.readFileSync(inputFile, 'utf8');
const lines = content.split('\n');

// 我们按照时间顺序将消息组合成对话块（Chunks）
// 如果两条消息间隔小于 10 分钟，我们就认为它们是同一段对话上下文
let currentSession = [];
let allSessions = [];
let lastTimeMs = 0;

for (let i = 1; i < lines.length; i++) {
  const line = lines[i];
  const parts = line.split(',');
  if (parts.length >= 9 && parts[2] === '1') {
    const text = parts[7].trim();
    if (text.length < 1 || text.includes('<?xml') || text.includes('http')) continue;
    
    const isSender = parts[4] === '1'; // 1: 我(男), 0: 她(女)
    const timeStr = parts[8].trim();
    const timeMs = new Date(timeStr).getTime();
    
    // 清理表情符号方便阅读
    const cleanText = text.replace(/\[.*?\]/g, '').trim();
    if(!cleanText) continue;

    const msgObj = {
      role: isSender ? 'Boy' : 'Girl',
      text: cleanText,
      time: timeStr
    };

    if (lastTimeMs === 0 || (timeMs - lastTimeMs) < 10 * 60 * 1000) {
      currentSession.push(msgObj);
    } else {
      if (currentSession.length > 5) { // 至少一来一回有几句话的才算有效对话
        allSessions.push(currentSession);
      }
      currentSession = [msgObj];
    }
    lastTimeMs = timeMs;
  }
}
if (currentSession.length > 5) allSessions.push(currentSession);

console.log('Total conversational sessions:', allSessions.length);

// 提取包含明显情绪波动、争吵、撒娇、深度沟通的对话块
let deepSessions = [];
const emotionKeywords = ['委屈', '难受', '烦', '生气', '不想理', '怎么这样', '对不起', '抱抱', '没安全感', '想你', '为什么', '可是', '不要', '哭', '需要', '不开心'];

for (const session of allSessions) {
  let hasEmotion = false;
  for (const msg of session) {
    if (msg.role === 'Girl') {
      for (const kw of emotionKeywords) {
        if (msg.text.includes(kw)) {
          hasEmotion = true;
          break;
        }
      }
    }
    if (hasEmotion) break;
  }
  
  // 如果这段对话包含情绪词，且对话长度超过10句（代表有深入交流），我们将其纳入深度分析样本
  if (hasEmotion && session.length >= 10 && session.length <= 100) {
    deepSessions.push(session);
  }
}

console.log('Sessions with deep emotional contexts:', deepSessions.length);

// 提取最长的带有情绪的对话，作为深度分析样本
const sortedByLength = deepSessions.sort((a, b) => b.length - a.length);
const topSamples = sortedByLength.slice(0, 15);

let outputText = '';
topSamples.forEach((session, idx) => {
  outputText += '\n\n========== 深度对话样本 ' + (idx + 1) + ' (' + session[0].time + ') ==========\n';
  let lastRole = '';
  let combinedText = '';
  session.forEach(msg => {
    if (msg.role === lastRole) {
      combinedText += ' ' + msg.text;
    } else {
      if (lastRole) {
        outputText += lastRole + ': ' + combinedText + '\n';
      }
      lastRole = msg.role;
      combinedText = msg.text;
    }
  });
  if (lastRole) outputText += lastRole + ': ' + combinedText + '\n';
});

fs.writeFileSync('/Users/huangyijun/Projects/love-0403/context_samples.txt', outputText, 'utf8');
console.log('Context samples extracted to context_samples.txt');
