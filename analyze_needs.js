const fs = require('fs');

const inputFile = '/Users/huangyijun/Projects/love-0403/chat_history.csv';
const outputFile = '/Users/huangyijun/Projects/love-0403/src/lib/deepChatAnalysis.ts';

const content = fs.readFileSync(inputFile, 'utf8');
const lines = content.split('\n');

// 统计维度
let herNeeds = [];
let hisNeeds = [];

let monthlyStats = {};
let hourlyStats = new Array(24).fill(0);

// 需要分析的情感词汇或需求相关的关键词
const needKeywords = [
  '想', '要', '喜欢', '希望', '陪', '需要', '不开心', '难过', '好烦', '气', '委屈', '抱抱', '吃'
];

for (let i = 1; i < lines.length; i++) {
  const line = lines[i];
  const parts = line.split(',');
  if (parts.length >= 9) {
    if (parts[2] === '1') { // 文本消息
      const text = parts[7].trim();
      const isSender = parts[4] === '1'; // 1=男方(我) 0=女方(然/猪猪宝)
      const timeStr = parts[8].trim(); // eg: "2023-04-12 08:34:24"
      
      if (text.length < 2 || text.includes('<?xml') || text.includes('http') || /^\[.*\]$/.test(text)) {
        continue;
      }

      // 时间维度统计
      if (timeStr && timeStr.length >= 19) {
        const month = timeStr.substring(0, 7); // "2023-04"
        const hour = parseInt(timeStr.substring(11, 13), 10);
        
        if (!monthlyStats[month]) {
          monthlyStats[month] = { him: 0, her: 0 };
        }
        if (isSender) {
          monthlyStats[month].him++;
        } else {
          monthlyStats[month].her++;
        }
        
        if (!isNaN(hour) && hour >= 0 && hour <= 23) {
          hourlyStats[hour]++;
        }
      }

      // 需求/情绪提取
      if (text.length > 5 && text.length < 100) {
        for (const kw of needKeywords) {
          if (text.includes(kw)) {
            const cleanText = text.replace(/\[.*?\]/g, ''); // 移除表情符号
            if (cleanText.length > 3) {
              if (isSender) {
                if (hisNeeds.length < 200 && Math.random() > 0.8) hisNeeds.push({ text: cleanText, time: timeStr });
              } else {
                if (herNeeds.length < 200 && Math.random() > 0.8) herNeeds.push({ text: cleanText, time: timeStr });
              }
            }
            break;
          }
        }
      }
    }
  }
}

// 分析“然”的高频需求词（简单分析）
const herText = herNeeds.map(n => n.text).join(' ');
const needPatterns = ['想吃', '去吃', '陪我', '好想', '好烦', '不要', '抱抱', '买'];
let herNeedCounts = {};
needPatterns.forEach(pattern => {
  const matches = herText.match(new RegExp(pattern, 'g'));
  herNeedCounts[pattern] = matches ? matches.length : 0;
});

const tsContent = `export const deepChatAnalysis = {
  monthlyActivity: ${JSON.stringify(monthlyStats, null, 2)},
  hourlyActivity: ${JSON.stringify(hourlyStats, null, 2)},
  herExpressions: ${JSON.stringify(herNeeds.slice(0, 30), null, 2)},
  hisExpressions: ${JSON.stringify(hisNeeds.slice(0, 30), null, 2)},
  herNeedsSummary: ${JSON.stringify(herNeedCounts, null, 2)}
};
`;

fs.writeFileSync(outputFile, tsContent, 'utf8');
console.log('Deep analysis generated!');
