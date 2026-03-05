#!/bin/bash
# 把 temp_photos_export 里导出的照片复制到 public/pic，命名为 fav_001、fav_002...
# 只复制图片（.jpg/.jpeg/.heic/.png），跳过视频；若目标已有同名则跳过

set -e
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
SRC="${PROJECT_ROOT}/temp_photos_export"
DEST="${PROJECT_ROOT}/public/pic"

if [ ! -d "$SRC" ]; then
  echo "找不到导出目录：$SRC"
  echo "请先运行 AppleScript 从「照片」导出："
  echo "  osascript \"$SCRIPT_DIR/export-photos-from-apple-photos.applescript\""
  exit 1
fi

mkdir -p "$DEST"
count=0
for f in "$SRC"/*.jpg "$SRC"/*.jpeg "$SRC"/*.JPG "$SRC"/*.JPEG "$SRC"/*.heic "$SRC"/*.HEIC "$SRC"/*.png "$SRC"/*.PNG; do
  [ -f "$f" ] || continue
  count=$((count + 1))
  ext=$(echo "${f##*.}" | tr 'A-Z' 'a-z')
  case "$ext" in
    jpg|jpeg) ext="jpg" ;;
    heic)     ext="heic" ;;
    png)      ext="png" ;;
    *)        ext="jpg" ;;
  esac
  base=$(printf "fav_%03d" "$count")
  destfile="${DEST}/${base}.${ext}"
  if [ -f "$destfile" ]; then
    echo "跳过已存在: $destfile"
  else
    cp "$f" "$destfile"
    echo "已复制: $(basename "$f") -> $(basename "$destfile")"
  fi
done

# 处理子目录（Photos 有时会按日期建子目录）
for sub in "$SRC"/*/; do
  [ -d "$sub" ] || continue
  for f in "$sub"/*.jpg "$sub"/*.jpeg "$sub"/*.JPG "$sub"/*.JPEG "$sub"/*.heic "$sub"/*.HEIC "$sub"/*.png "$sub"/*.PNG; do
    [ -f "$f" ] || continue
    count=$((count + 1))
    ext=$(echo "${f##*.}" | tr 'A-Z' 'a-z')
    case "$ext" in
      jpg|jpeg) ext="jpg" ;;
      heic)     ext="heic" ;;
      png)      ext="png" ;;
      *)        ext="jpg" ;;
    esac
    base=$(printf "fav_%03d" "$count")
    destfile="${DEST}/${base}.${ext}"
    if [ -f "$destfile" ]; then
      echo "跳过已存在: $destfile"
    else
      cp "$f" "$destfile"
      echo "已复制: $(basename "$f") -> $(basename "$destfile")"
    fi
  done
done

echo ""
echo "共复制 $count 张到 public/pic。可在 src/lib/data.ts 的 photos 数组里加入 /pic/fav_001.jpg 等。"
echo "可删除临时目录: rm -rf \"$SRC\""
