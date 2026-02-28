const fs = require('fs');

const inputFile = '/Users/huangyijun/Projects/love-0403/chat_history.csv';
const outputFile = '/Users/huangyijun/Projects/love-0403/pure_chat_history.txt';

console.log('开始读取和清洗几十万条聊天记录...');

const content = fs.readFileSync(inputFile, 'utf8');
const lines = content.split('\n');

// 使用 writeStream 来处理大文件写入，防止内存溢出
const writeStream = fs.createWriteStream(outputFile, 'utf8');

let validCount = 0;
let lastDate = '';

// 第 0 行是表头，从第 1 行开始
for (let i = 1; i < lines.length; i++) {
  const line = lines[i];
  const parts = line.split(',');
  
  // 确保数据行格式基本正确
  if (parts.length >= 9) {
    // parts[2] 表示 Type，微信记录里 1 通常表示纯文本消息
    if (parts[2] === '1') {
      const isSender = parts[4] === '1'; // 1 表示“我”发出的，0 表示“对方”发出的
      const rawText = parts[7].trim();
      const timeStr = parts[8].trim(); // 格式：2023-04-12 08:30:57
      
      // 过滤规则：
      // 1. 不能为空
      // 2. 去除包含 XML 代码的系统消息、链接、小程序卡片等
      // 3. 去掉纯表情符号，比如全都是 [流泪] 这种
      if (rawText && 
          !rawText.includes('<?xml') && 
          !rawText.includes('http') && 
          !rawText.includes('msg>') &&
          rawText.replace(/\[.*?\]/g, '').trim().length > 0) {
        
        const cleanText = rawText.replace(/\[.*?\]/g, '').trim(); // 清理所有的 [表情] 标记
        const role = isSender ? '男' : '女';
        
        // 为了方便阅读，如果是一天里的第一条消息，加个日期分割线
        const currentDate = timeStr.split(' ')[0];
        if (currentDate && currentDate !== lastDate) {
          writeStream.write(`\n--- ${currentDate} ---\n`);
          lastDate = currentDate;
        }

        // 提取时分秒
        const timeOnly = timeStr.split(' ')[1] || timeStr;
        
        // 格式化输出： [08:30:57] 男: 文本内容
        writeStream.write(`[${timeOnly}] ${role}: ${cleanText}\n`);
        validCount++;
      }
    }
  }
}

writeStream.end();

writeStream.on('finish', () => {
  console.log(`清洗完成！成功提取了 ${validCount} 条纯净的文字对话，已保存至 ${outputFile}`);
});
