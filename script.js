// 導航欄功能
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// 關閉導航選單當點擊連結
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// 平滑滾動到錨點
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 導航欄滾動效果
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// 作品集篩選功能 + 隨機顯示四張
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

const shuffleArray = (arr) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
};

const showOnlyItems = (itemsToShow) => {
    portfolioItems.forEach(item => {
        if (itemsToShow.includes(item)) {
            item.style.display = 'block';
            item.style.animation = 'fadeInUp 0.6s ease';
        } else {
            item.style.display = 'none';
        }
    });
};

const showRandomFourAll = () => {
    const shuffled = shuffleArray(Array.from(portfolioItems));
    const pick = shuffled.slice(0, 4);
    showOnlyItems(pick);
};

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');
        if (filterValue === 'all') {
            showRandomFourAll();
            return;
        }

        const matched = Array.from(portfolioItems).filter(
            item => item.getAttribute('data-category') === filterValue
        );
        showOnlyItems(matched);
    });
});

// 技能條動畫
const skillBars = document.querySelectorAll('.skill-progress');

const animateSkillBars = () => {
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
};

// 當關於我區塊進入視窗時觸發技能條動畫
const aboutSection = document.querySelector('.about');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars();
            observer.unobserve(entry.target);
        }
    });
});

if (aboutSection) {
    observer.observe(aboutSection);
}

// 聯絡表單處理
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // 獲取表單數據
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const subject = contactForm.querySelector('input[placeholder="主旨"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // 簡單的表單驗證
        if (!name || !email || !message) {
            alert('請填寫所有必填欄位');
            return;
        }
        
        // 這裡可以添加實際的表單提交邏輯
        // 例如發送到後端API或電子郵件服務
        
        // 顯示成功訊息
        alert('感謝您的訊息！我們會盡快回覆您。');
        contactForm.reset();
    });
}

// 圖片載入動畫
const imagePlaceholders = document.querySelectorAll('.image-placeholder');

const animateImages = () => {
    imagePlaceholders.forEach((placeholder, index) => {
        setTimeout(() => {
            placeholder.style.opacity = '0.8';
            placeholder.style.transform = 'scale(1.02)';
        }, index * 200);
    });
};

// 頁面載入完成後觸發動畫
window.addEventListener('load', () => {
    animateImages();
});

// 滾動動畫
const scrollElements = document.querySelectorAll('.portfolio-item, .blog-card, .about-content, .contact-content');

const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
        elementTop <=
        (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
};

const displayScrollElement = (element) => {
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
};

const hideScrollElement = (element) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 1.25)) {
            displayScrollElement(el);
        } else {
            hideScrollElement(el);
        }
    });
};

// 初始化滾動動畫
scrollElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

window.addEventListener('scroll', handleScrollAnimation);
window.addEventListener('load', handleScrollAnimation);

// 自動設定縮圖（YouTube）
const setAutoThumbnails = () => {
    const items = document.querySelectorAll('.portfolio-item[data-video-url]');
    items.forEach(item => {
        const url = item.getAttribute('data-video-url');
        if (!url) return;
        if (!/youtu\.be|youtube\.com/.test(url)) return; // 目前僅針對 YouTube 自動縮圖

        const id = extractYouTubeId(url);
        if (!id) return;
        const thumbUrl = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

        const container = item.querySelector('.portfolio-image');
        if (!container) return;
        const img = document.createElement('img');
        img.src = thumbUrl;
        const title = item.querySelector('.portfolio-overlay h3');
        img.alt = title ? title.textContent : '影片縮圖';
        img.loading = 'lazy';

        // 置換原有內容
        container.innerHTML = '';
        container.appendChild(img);
    });
};

window.addEventListener('load', () => {
    setAutoThumbnails();
    showRandomFourAll(); // 預設：全部（all）顯示隨機四張
});

// 作品集項目點擊播放影片（燈箱）
const lightbox = document.getElementById('video-lightbox');
const videoWrapper = document.getElementById('video-wrapper');
const videoCloseBtn = document.querySelector('.video-close');

const extractYouTubeId = (url) => {
    // 支援 youtu.be, watch?v=, shorts, embed 形式
    const patterns = [
        /(?:v=)([\w-]{6,})/i,                 // watch?v=
        /youtu\.be\/([\w-]{6,})/i,           // youtu.be/
        /youtube\.com\/shorts\/([\w-]{6,})/i,// shorts/
        /youtube\.com\/embed\/([\w-]{6,})/i  // embed/
    ];
    for (const p of patterns) {
        const m = url.match(p);
        if (m && m[1]) return m[1];
    }
    return '';
};

const openLightboxWithUrl = (url) => {
    if (!url) return;
    let embed;
    if (/youtu\.be|youtube\.com/.test(url)) {
        const videoId = extractYouTubeId(url);
        embed = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
    } else if (/vimeo\.com/.test(url)) {
        const idMatch = url.match(/vimeo\.com\/(\d+)/);
        const id = idMatch ? idMatch[1] : '';
        embed = `<iframe src="https://player.vimeo.com/video/${id}?autoplay=1" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
    } else {
        embed = `<video src="${url}" controls autoplay playsinline></video>`;
    }
    videoWrapper.innerHTML = embed;
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
};

const closeLightbox = () => {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    videoWrapper.innerHTML = '';
    document.body.style.overflow = '';
};

portfolioItems.forEach(item => {
    item.addEventListener('click', () => {
        const url = item.getAttribute('data-video-url');
        if (url) {
            openLightboxWithUrl(url);
        }
    });
});

if (videoCloseBtn) {
    videoCloseBtn.addEventListener('click', closeLightbox);
}

if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
}

// 社交媒體連結處理
const socialLinks = document.querySelectorAll('.social-link');
socialLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const platform = link.querySelector('i').className;
        let url = '#';
        
        // 根據平台設定URL
        if (platform.includes('facebook')) {
            url = 'https://facebook.com/yourprofile';
        } else if (platform.includes('instagram')) {
            url = 'https://instagram.com/yourprofile';
        } else if (platform.includes('twitter')) {
            url = 'https://twitter.com/yourprofile';
        } else if (platform.includes('linkedin')) {
            url = 'https://linkedin.com/in/yourprofile';
        }
        
        window.open(url, '_blank');
    });
});

// 部落格文章點擊事件
const blogCards = document.querySelectorAll('.blog-card');
blogCards.forEach(card => {
    card.addEventListener('click', () => {
        const title = card.querySelector('h3').textContent;
        console.log(`點擊了部落格文章: ${title}`);
        // 這裡可以導向詳細的部落格頁面
    });
});

// 返回頂部按鈕
const createBackToTopButton = () => {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.className = 'back-to-top';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: #3498db;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        font-size: 1.2rem;
    `;
    
    document.body.appendChild(backToTop);
    
    // 顯示/隱藏按鈕
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });
    
    // 點擊返回頂部
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // 懸停效果
    backToTop.addEventListener('mouseenter', () => {
        backToTop.style.background = '#2980b9';
        backToTop.style.transform = 'translateY(-3px)';
    });
    
    backToTop.addEventListener('mouseleave', () => {
        backToTop.style.background = '#3498db';
        backToTop.style.transform = 'translateY(0)';
    });
};

// 初始化返回頂部按鈕
createBackToTopButton();

// 載入動畫
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// 頁面載入時的淡入效果
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';

