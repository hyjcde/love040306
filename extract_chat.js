const fs = require('fs');
const path = require('path');

const filePath = '/Users/huangyijun/Desktop/代码项目/Active/WebPages/WeChatRecords/猪猪宝.html';

try {
  const html = fs.readFileSync(filePath, 'utf-8');
  // 提取 chatMessages = [...] 的内容
  const match = html.match(/const chatMessages\s*=\s*(\[.*?\]);/s);
  
  if (match && match[1]) {
    // 这是一个包含 js 对象的字符串，没法直接 JSON.parse，因为有单引号和没加引号的 key。
    // 但是我们可以通过正则表达式提取出所有的 text 属性
    const textMatch = match[1].matchAll(/text:\s*'([^']*)'/g);
    let allTexts = [];
    for (const t of textMatch) {
      if (t[1] && t[1].length > 0 && !t[1].includes('wx.qlogo.cn')) {
        allTexts.push(t[1]);
      }
    }
    
    // 过滤掉只有表情的或者太短的
    const validTexts = allTexts.filter(t => t.length > 2 && !t.includes('微信') && !t.includes('http'));
    
    fs.writeFileSync('./chat_analysis.txt', `Total messages: ${allTexts.length}\n\nSample Messages:\n` + validTexts.slice(-200).join('\n'));
    console.log(`Successfully extracted ${allTexts.length} messages.`);
  } else {
    console.log("Could not find chatMessages array.");
  }
} catch (e) {
  console.error("Error:", e);
}
