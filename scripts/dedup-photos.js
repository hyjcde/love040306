/**
 * 按内容哈希去重照片，并生成描述多样化的列表
 * 输出写入 src/lib/photos-deduped.ts，供 data.ts 使用
 * 用法：node scripts/dedup-photos.js
 */

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const PIC_DIR = path.join(__dirname, "..", "public", "pic");

// 前几张固定顺序和描述（与 data 里一致）
const FIXED = [
  { src: "/pic/pic1.jpg", caption: "外滩的夜晚，最美的风景是你" },
  { src: "/pic/pic2.jpg", caption: "黄浦江上的游船" },
  { src: "/pic/pic3.jpg", caption: "宝宝和宝宝，永远在一起" },
  { src: "/pic/1.JPG", caption: "那些开心的瞬间" },
  { src: "/pic/2.JPG", caption: "美好的回忆" },
  { src: "/pic/3.jpg", caption: "点点滴滴" },
  { src: "/pic/16.JPG", caption: "阳光下的你" },
  { src: "/pic/17.JPG", caption: "牵着手走过的路" },
];

// 去重后 fav_ 使用的描述池（轮流用，避免全是「爱宝宝」）
const CAPTIONS = [
  "爱宝宝",
  "我们的瞬间",
  "珍藏",
  "与你",
  "最爱",
  "小确幸",
  "有你的日子",
  "长颈鹿与鱼",
];

function hashFile(filePath) {
  const buf = fs.readFileSync(filePath);
  return crypto.createHash("md5").update(buf).digest("hex");
}

function main() {
  const seen = new Set();
  const result = [...FIXED];

  // 只对 fav_001 ～ fav_305 按内容去重，按编号顺序保留第一次出现的
  for (let i = 1; i <= 305; i++) {
    const name = `fav_${String(i).padStart(3, "0")}.jpg`;
    const filePath = path.join(PIC_DIR, name);
    if (!fs.existsSync(filePath)) continue;

    const h = hashFile(filePath);
    if (seen.has(h)) continue;
    seen.add(h);

    const caption = CAPTIONS[(result.length - FIXED.length) % CAPTIONS.length];
    result.push({ src: `/pic/${name}`, caption });
  }

  const tsContent = `// 由 scripts/dedup-photos.js 生成，请勿手改
export const dedupedPhotos: { src: string; caption: string }[] = ${JSON.stringify(result, null, 2)};
`;

  const outPath = path.join(__dirname, "..", "src", "lib", "photos-deduped.ts");
  fs.writeFileSync(outPath, tsContent, "utf8");
  console.log(`已写入 ${outPath}，共 ${result.length} 张（去重前 313，去重后 ${result.length}）`);
}

main();
