/**
 * 从 pure_chat_history.txt 中截取 2023-07-08 及以后的聊天，按约 30 万字拆成多个文件。
 * 每个文件单独阅读、总结「喜欢什么」时不会过大。
 * 用法：node scripts/split_chat_from_date.js
 */

const fs = require("fs");
const path = require("path");

const INPUT = path.join(__dirname, "..", "pure_chat_history.txt");
const OUT_DIR = path.join(__dirname, "..", "chat_from_20230708");
const CUTOFF = "2023-07-08"; // 只保留此日期及以后
const CHARS_PER_FILE = 300000; // 约 30 万字一个文件

function parseDate(line) {
  const m = line.match(/^--- (\d{4}-\d{2}-\d{2}) ---$/);
  return m ? m[1] : null;
}

function main() {
  if (!fs.existsSync(INPUT)) {
    console.error("找不到 pure_chat_history.txt，请先确保该文件存在。");
    process.exit(1);
  }

  const raw = fs.readFileSync(INPUT, "utf8");
  const lines = raw.split(/\r?\n/);

  // 按日期块切分，只保留 >= CUTOFF 的块
  const blocks = [];
  let currentDate = null;
  let currentLines = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const date = parseDate(line.trim());

    if (date) {
      if (currentDate !== null && currentLines.length > 0 && currentDate >= CUTOFF) {
        blocks.push({ date: currentDate, lines: currentLines });
      }
      currentDate = date;
      currentLines = [line];
    } else {
      if (currentDate !== null) currentLines.push(line);
    }
  }
  if (currentDate !== null && currentLines.length > 0 && currentDate >= CUTOFF) {
    blocks.push({ date: currentDate, lines: currentLines });
  }

  if (blocks.length === 0) {
    console.log("没有找到 " + CUTOFF + " 及以后的记录，请检查日期或数据。");
    process.exit(0);
  }

  const fullText = blocks.map((b) => b.lines.join("\n")).join("\n\n");
  const totalChars = fullText.length;
  console.log("从 " + CUTOFF + " 起共 " + blocks.length + " 天，总字数约 " + (totalChars / 10000).toFixed(1) + " 万字。");

  fs.mkdirSync(OUT_DIR, { recursive: true });

  const parts = [];
  let rest = fullText;
  let partIndex = 1;

  while (rest.length > 0) {
    let chunk;
    if (rest.length <= CHARS_PER_FILE) {
      chunk = rest;
      rest = "";
    } else {
      const slice = rest.slice(0, CHARS_PER_FILE);
      const lastNewline = slice.lastIndexOf("\n");
      chunk = lastNewline > CHARS_PER_FILE / 2 ? slice.slice(0, lastNewline + 1) : slice;
      rest = rest.slice(chunk.length);
    }

    const filename = "part_" + String(partIndex).padStart(2, "0") + ".txt";
    const filepath = path.join(OUT_DIR, filename);
    fs.writeFileSync(filepath, chunk, "utf8");
    parts.push({ filename, chars: chunk.length });
    partIndex++;
  }

  console.log("已写入 " + OUT_DIR + "：");
  parts.forEach((p) => console.log("  " + p.filename + " 约 " + (p.chars / 10000).toFixed(1) + " 万字"));
  console.log("共 " + parts.length + " 个文件，可逐个打开阅读并总结「喜欢什么」。");
}

main();
