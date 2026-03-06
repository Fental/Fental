# SEO 资源文件

## 📋 需要创建的图片文件

以下文件需要手动创建并放置在 `images/` 目录下：

### 1. Open Graph 图片（重要）

**文件名**: `og-image.png`
**尺寸**: 1200 x 630 像素
**格式**: PNG（推荐）或 JPG
**大小**: < 500KB
**用途**: 社交媒体分享预览

**建议内容**:
```
┌─────────────────────────────────┐
│                              │
│    [ 博客 Logo - 小图标 ]    │
│                              │
│        Fental's Blog           │
│                              │
│    前端 • JS • AI • OpenClaw  │
│                              │
└─────────────────────────────────┘
```

**设计建议**:
- 背景色：#06b6d4（主强调色）
- 文字色：白色或深色
- 字体：SF Pro Display 或类似
- 布局：简洁清晰
- 添加装饰元素（如简单的几何图形）

**创建方法**:
1. 使用设计工具（Figma、Sketch、Canva）
2. 创建 1200x630 的画布
3. 添加内容和样式
4. 导出为 PNG
5. 压缩到 < 500KB（可选）

---

### 2. Favicon 文件

#### 2.1 16x16 Favicon

**文件名**: `favicon-16x16.png`
**尺寸**: 16 x 16 像素
**格式**: PNG
**用途**: 浏览器标签页小图标

**建议**: 使用简化版的 Logo 或首字母 "F"

---

#### 2.2 32x32 Favicon

**文件名**: `favicon-32x32.png`
**尺寸**: 32 x 32 像素
**格式**: PNG
**用途**: 浏览器标签页中等图标

**建议**: 使用 Logo 或首字母 "F"

---

#### 2.3 Apple Touch Icon

**文件名**: `apple-touch-icon.png`
**尺寸**: 180 x 180 像素
**格式**: PNG
**用途**: iOS 设备添加到主屏幕

**建议**: 使用完整的 Logo

---

### 3. Logo 文件

**文件名**: `logo.png`
**尺寸**: 建议 500 x 500 像素（方形）
**格式**: PNG（支持透明背景）
**用途**: 结构化数据和网站标识

**建议内容**:
```
┌─────────────────────┐
│                   │
│    [ Logo 图标 ]   │
│                   │
│       Fental       │
│                   │
└─────────────────────┘
```

**设计建议**:
- 背景：透明
- Logo：简洁的图形或文字
- 适合深色和浅色背景

---

## 🎨 快速创建指南

### 使用 Canva（在线，免费）

1. 访问 https://www.canva.com/
2. 创建自定义尺寸（1200x630）
3. 使用模板或从零开始设计
4. 下载 PNG 文件

### 使用 Figma

1. 下载 Figma https://www.figma.com/
2. 创建新画布（1200x630）
3. 设计 Open Graph 图片
4. 导出 PNG

### 使用命令行工具（高级）

```bash
# 安装 ImageMagick
brew install imagemagick

# 创建简单的文字图片
convert -size 1200x630 xc:#06b6d4 \
  -pointsize 80 -fill white \
  -gravity center \
  -annotate +0+0 "Fental's Blog" \
  images/og-image.png
```

---

## ✅ 创建完成后

将以下文件放置在 `images/` 目录：

```
images/
├── og-image.png          # Open Graph (1200x630)
├── favicon-16x16.png      # 小 Favicon (16x16)
├── favicon-32x32.png      # 中 Favicon (32x32)
├── apple-touch-icon.png  # iOS 图标 (180x180)
└── logo.png             # Logo (500x500)
```

创建后，SEO 将完全生效！

---

## 🔍 验证工具

创建完成后，使用以下工具验证：

1. **Facebook Sharing Debugger**
   https://developers.facebook.com/tools/debug/

2. **Twitter Card Validator**
   https://cards-dev.twitter.com/validator

3. **Google Rich Results Test**
   https://search.google.com/test/rich-results

4. **Favicon Checker**
   https://realfavicongenerator.net/

---

**需要我帮你使用代码生成简单的占位符图片吗？** 或者你想自己创建这些文件？
