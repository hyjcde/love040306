const fs = require('fs');

const inputFile = '/Users/huangyijun/Projects/love-0403/chat_history.csv';
const outputFile = '/Users/huangyijun/Projects/love-0403/her_deep_sample.txt';

const content = fs.readFileSync(inputFile, 'utf8');
const lines = content.split('\n');

let herLongMessages = [];

for (let i = 1; i < lines.length; i++) {
  const line = lines[i];
  const parts = line.split(',');
  if (parts.length >= 9 && parts[2] === '1') {
    const isSender = parts[4] === '1'; // 1=男, 0=女
    const text = parts[7].trim();
    
    // 只提取女方的长消息（通常长消息包含更多情绪和深层需求）
    // 过滤掉包含链接、XML等无意义的内容
    if (!isSender && text.length > 15 && text.length < 200 && !text.includes('<?xml') && !text.includes('http')) {
        // 去除表情符号以便更好地阅读文本
        const cleanText = text.replace(/\[.*?\]/g, '');
        if (cleanText.length > 15) {
            herLongMessages.push(cleanText);
        }
    }
  }
}

// 为了保证样本的多样性，我们随机打乱，并取出具有代表性的 300 条长消息
const shuffled = herLongMessages.sort(() => 0.5 - Math.random());
const sample = shuffled.slice(0, 300);

fs.writeFileSync(outputFile, sample.join('\n'), 'utf8');
console.log('Successfully extracted ' + sample.length + ' deep messages for AI analysis.');
