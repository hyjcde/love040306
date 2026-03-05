/**
 * 压缩 public/pic 下的图片：限制最长边 1200px，JPEG 质量 82，显著减小体积
 * 用法：node scripts/compress-images.js
 */

const fs = require("fs");
const path = require("path");

const PIC_DIR = path.join(__dirname, "..", "public", "pic");
const MAX_SIDE = 1200;
const JPEG_QUALITY = 82;

async function main() {
  let sharp;
  try {
    sharp = require("sharp");
  } catch (e) {
    console.error("请先安装 sharp: npm install sharp");
    process.exit(1);
  }

  const exts = [".jpg", ".jpeg", ".JPG", ".JPEG"];
  const files = fs.readdirSync(PIC_DIR).filter((f) => exts.some((e) => f.endsWith(e)));

  if (files.length === 0) {
    console.log("public/pic 下没有找到 jpg 文件");
    return;
  }

  console.log(`找到 ${files.length} 张图片，开始压缩（最长边 ${MAX_SIDE}px，质量 ${JPEG_QUALITY}）...\n`);

  let totalBefore = 0;
  let totalAfter = 0;

  for (const file of files) {
    const inputPath = path.join(PIC_DIR, file);
    const stat = fs.statSync(inputPath);
    const before = stat.size;
    totalBefore += before;

    const tmpPath = inputPath + ".tmp";

    try {
      await sharp(inputPath)
        .resize(MAX_SIDE, MAX_SIDE, { fit: "inside", withoutEnlargement: true })
        .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
        .toFile(tmpPath);

      const after = fs.statSync(tmpPath).size;
      totalAfter += after;
      fs.renameSync(tmpPath, inputPath);

      const pct = before > 0 ? (((before - after) / before) * 100).toFixed(1) : 0;
      console.log(`${file}: ${(before / 1024).toFixed(0)} KB → ${(after / 1024).toFixed(0)} KB (-${pct}%)`);
    } catch (err) {
      if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath);
      console.error(`${file} 压缩失败:`, err.message);
    }
  }

  console.log("\n---");
  console.log(`总大小: ${(totalBefore / 1024 / 1024).toFixed(1)} MB → ${(totalAfter / 1024 / 1024).toFixed(1)} MB`);
  const saved = totalBefore - totalAfter;
  if (totalBefore > 0) {
    console.log(`节省: ${(saved / 1024 / 1024).toFixed(1)} MB (${((saved / totalBefore) * 100).toFixed(1)}%)`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
