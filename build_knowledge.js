const fs = require('fs');

const inputFile = '/Users/huangyijun/Projects/love-0403/chat_history.csv';
const outputFile = '/Users/huangyijun/Projects/love-0403/src/lib/chatData.ts';

// 读取整个文件
const content = fs.readFileSync(inputFile, 'utf8');
const lines = content.split('\n');

// 提取有效的文本消息和有趣的句子
let interestingMessages = [];
let allText = "";

for (let i = 1; i < lines.length; i++) {
  const line = lines[i];
  // 简单的 CSV 解析（非标准，但够用）
  const parts = line.split(',');
  if (parts.length >= 9) {
    // parts[2] = 1 表示是文本消息
    if (parts[2] === '1') {
      const text = parts[7];
      const isSender = parts[4] === '1'; // 1=自己发出的, 0=对方发来的
      const time = parts[8];
      
      // 去除只发表情和没有意义的短句
      if (text && text.length > 2 && text.length < 50 && !text.includes('<?xml') && !text.includes('http') && !/^\[.*\]$/.test(text)) {
        allText += text + " ";
        
        // 我们随机抽取一些带有情绪或好玩的词的句子作为金句盲盒
        if (text.includes('宝宝') || text.includes('哈哈') || text.includes('开心') || text.includes('喜欢') || 
            text.includes('猪猪') || text.includes('想你') || text.includes('可爱') || text.includes('气') ||
            text.includes('狗')) {
          interestingMessages.push({
            text: text.replace(/\[.*?\]/g, ''), // 移除 [表情]
            isSender,
            time: time.trim()
          });
        }
      }
    }
  }
}

// 随机打乱并只取前 50 句有趣的对话
const shuffled = interestingMessages.sort(() => 0.5 - Math.random());
const selectedMessages = shuffled.slice(0, 50).filter(m => m.text.trim().length > 0);

// 生成词频统计（简易版）
// 由于没有 jieba 库，我们用正则简单提取 2 个字以上的词组，然后剔除掉一些无意义的助词
const cleanText = allText.replace(/[^\u4e00-\u9fa5]/g, ''); 
const wordsMap = {};
// 粗略的两字词语提取
for (let i = 0; i < cleanText.length - 1; i++) {
  const word = cleanText.substring(i, i + 2);
  wordsMap[word] = (wordsMap[word] || 0) + 1;
}

// 过滤停用词
const stopWords = ['我是','你是','的话','可以','什么','然后','这个','那个','就是','我们','觉得','可能','因为','所以','还是','如果','怎么','但是','这样','一下','或者'];
const wordEntries = Object.entries(wordsMap)
  .filter(([word, count]) => !stopWords.includes(word) && count > 50)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 80);

const tsContent = `// 自动由聊天记录生成的知识库
export const chatKnowledge = {
  totalMessages: ${lines.length},
  firstChatTime: "2023-04-12 08:30:57",
  randomQuotes: ${JSON.stringify(selectedMessages, null, 2)},
  wordCloud: ${JSON.stringify(wordEntries.map(e => ({text: e[0], value: e[1]})), null, 2)}
};
`;

fs.writeFileSync(outputFile, tsContent, 'utf8');
console.log('Successfully generated knowledge base in src/lib/chatData.ts');
