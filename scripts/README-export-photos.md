# 从 Mac「照片」导出收藏 / 宝儿照片到网站

只导出**个人收藏**或**指定相簿**（如宝儿的相簿），不会把整个图库都拷出来。

## 步骤

### 1. 在「照片」里准备好要导出的内容

- 把想放到网站的照片**加入「个人收藏」**（点爱心），或  
- 建一个相簿（例如「宝儿」），把相关照片放进去。

### 2. 运行 AppleScript 导出

在项目根目录执行（会弹出「照片」和选择相簿的窗口）：

```bash
osascript scripts/export-photos-from-apple-photos.applescript
```

在列表里**只选**「个人收藏」和/或「宝儿」等相簿，点确定。导出的文件会放在 `temp_photos_export/`。

### 3. 复制到网站图库

```bash
./scripts/copy-exported-to-pic.sh
```

会把 `temp_photos_export/` 里的图片复制到 `public/pic/`，命名为 `fav_001.jpg`、`fav_002.heic` 等。

### 4. 在页面里使用

在 `src/lib/data.ts` 的 `photos` 数组里加上新照片，例如：

```ts
{ src: "/pic/fav_001.jpg", caption: "收藏的一刻" },
{ src: "/pic/fav_002.heic", caption: "宝儿" },
```

### 5. 清理（可选）

导出并复制完成后可删掉临时目录：

```bash
rm -rf temp_photos_export
```
