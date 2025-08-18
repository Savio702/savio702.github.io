# 圖片資料夾

這個資料夾用於存放您的攝影作品和網站圖片。

## 📁 建議的檔案結構

```
images/
├── hero/           # 首頁主要圖片
│   ├── hero-1.jpg
│   └── hero-2.jpg
├── portfolio/      # 作品集圖片
│   ├── portrait/   # 人像攝影
│   ├── landscape/  # 風景攝影
│   └── commercial/ # 商業攝影
├── about/          # 關於我區塊圖片
│   └── profile.jpg
├── blog/           # 部落格文章圖片
│   ├── post-1.jpg
│   ├── post-2.jpg
│   └── post-3.jpg
└── logo/           # 網站標誌
    └── logo.png
```

## 🖼️ 圖片規格建議

### 首頁圖片 (hero/)
- **尺寸**: 1920x1080px 或 1600x900px
- **格式**: JPG, WebP
- **檔案大小**: 建議小於 500KB

### 作品集圖片 (portfolio/)
- **尺寸**: 800x600px 或 1200x800px
- **格式**: JPG, WebP
- **檔案大小**: 建議小於 300KB
- **比例**: 4:3 或 3:2

### 個人照片 (about/)
- **尺寸**: 600x800px
- **格式**: JPG
- **檔案大小**: 建議小於 200KB

### 部落格圖片 (blog/)
- **尺寸**: 800x400px
- **格式**: JPG, WebP
- **檔案大小**: 建議小於 250KB

## 🎯 圖片優化建議

1. **壓縮圖片**: 使用工具如 TinyPNG 或 ImageOptim
2. **選擇正確格式**: 
   - 照片使用 JPG
   - 圖示或簡單圖片使用 PNG
   - 現代瀏覽器支援 WebP
3. **響應式圖片**: 考慮提供多種尺寸
4. **ALT文字**: 為所有圖片添加描述性ALT文字

## 📝 使用範例

在HTML中使用圖片：

```html
<!-- 作品集圖片 -->
<div class="portfolio-image">
    <img src="images/portfolio/portrait/portrait-1.jpg" 
         alt="自然光人像攝影作品" 
         loading="lazy">
</div>

<!-- 部落格圖片 -->
<div class="blog-image">
    <img src="images/blog/post-1.jpg" 
         alt="攝影技巧分享文章配圖" 
         loading="lazy">
</div>
```

## 🔧 圖片載入優化

- 使用 `loading="lazy"` 屬性實現延遲載入
- 考慮使用 `srcset` 和 `sizes` 屬性提供響應式圖片
- 使用 WebP 格式並提供 JPG 後備方案

## 📱 響應式圖片

```html
<picture>
    <source srcset="images/hero/hero-large.webp" media="(min-width: 1200px)">
    <source srcset="images/hero/hero-medium.webp" media="(min-width: 768px)">
    <img src="images/hero/hero-small.jpg" alt="首頁背景圖片">
</picture>
```

## ⚠️ 注意事項

1. **版權**: 確保您擁有所有圖片的使用權
2. **備份**: 定期備份原始圖片檔案
3. **命名**: 使用描述性的檔案名稱
4. **組織**: 保持資料夾結構整潔
