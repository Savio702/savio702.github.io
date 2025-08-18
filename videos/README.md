# 影片資料夾

這個資料夾用於存放網站的影片檔案，主要用於首頁背景影片。

## 📁 建議的檔案結構

```
videos/
├── hero-video.mp4      # 首頁背景影片 (MP4格式)
├── hero-video.webm     # 首頁背景影片 (WebM格式，較小檔案)
└── README.md           # 本說明文件
```

## 🎬 影片規格建議

### 首頁背景影片 (hero-video)
- **解析度**: 1920x1080px (Full HD) 或 1280x720px (HD)
- **格式**: MP4 (H.264) 和 WebM (VP9)
- **檔案大小**: 建議小於 10MB
- **長度**: 10-30秒 (循環播放)
- **幀率**: 24fps 或 30fps
- **編碼**: 
  - MP4: H.264, 位元率 2-5 Mbps
  - WebM: VP9, 位元率 1-3 Mbps

## 🎯 影片內容建議

### 適合的背景影片類型：
1. **攝影過程**: 相機對焦、調整光圈、按下快門
2. **自然風景**: 緩慢移動的風景，如雲朵、海浪、樹葉
3. **抽象動畫**: 與攝影相關的抽象圖形動畫
4. **工作室場景**: 專業攝影棚的環境展示
5. **城市風景**: 緩慢移動的城市景觀

### 避免的內容：
- 快速移動的畫面
- 文字或標誌
- 人物特寫
- 複雜的動畫效果

## 🔧 影片優化建議

### 1. 壓縮優化
- 使用 HandBrake 或 FFmpeg 壓縮影片
- 移除音軌以減少檔案大小
- 使用適當的位元率設定

### 2. 格式轉換
```bash
# 使用 FFmpeg 轉換為 WebM 格式
ffmpeg -i hero-video.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 hero-video.webm

# 優化 MP4 格式
ffmpeg -i hero-video.mp4 -c:v libx264 -crf 23 -preset medium hero-video-optimized.mp4
```

### 3. 檔案大小控制
- MP4: 目標 5-8MB
- WebM: 目標 3-5MB
- 總計不超過 15MB

## 📱 響應式考量

### 移動裝置優化
- 考慮為移動裝置提供較低解析度的版本
- 使用 `media` 屬性提供不同尺寸的影片

```html
<video autoplay muted loop playsinline>
    <source src="videos/hero-video-desktop.mp4" media="(min-width: 768px)" type="video/mp4">
    <source src="videos/hero-video-mobile.mp4" media="(max-width: 767px)" type="video/mp4">
    <source src="videos/hero-video.webm" type="video/webm">
</video>
```

## ⚠️ 注意事項

### 1. 版權問題
- 確保您擁有影片的使用權
- 考慮使用免費的影片素材網站：
  - Pexels Videos
  - Pixabay
  - Coverr.co
  - Videvo

### 2. 效能考量
- 影片檔案過大會影響載入速度
- 考慮使用 CDN 託管影片檔案
- 實作延遲載入機制

### 3. 瀏覽器相容性
- 並非所有瀏覽器都支援 WebM 格式
- 始終提供 MP4 作為後備格式
- 測試在不同瀏覽器中的播放效果

## 🎨 創意建議

### 自製影片想法：
1. **攝影器材特寫**: 緩慢移動的相機、鏡頭
2. **光線變化**: 自然光線的變化過程
3. **色彩漸變**: 與您攝影風格相符的顏色變化
4. **抽象元素**: 與攝影相關的幾何圖形

### 免費素材來源：
- **Pexels**: https://www.pexels.com/videos/
- **Pixabay**: https://pixabay.com/videos/
- **Coverr**: https://coverr.co/
- **Videvo**: https://www.videvo.net/

## 🔄 更新影片

當您要更新背景影片時：
1. 準備新的影片檔案
2. 確保符合上述規格
3. 測試在不同裝置上的播放效果
4. 更新 HTML 中的檔案路徑
5. 清除瀏覽器快取進行測試

