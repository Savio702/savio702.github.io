// 平滑滾動
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 導航欄滾動效果
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
});

//幻燈片
let slideIndex = 0;
const slides = document.getElementsByClassName("slide");

function showSlides() {
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove("active");
  }

  slideIndex++;
  if (slideIndex > slides.length) { slideIndex = 1; }

  slides[slideIndex - 1].classList.add("active");
  setTimeout(showSlides, 5000); // 每 5 秒切換
}

showSlides(); // 啟動幻燈片

// EmailJS 初始化
(function() {
    emailjs.init("YOUR_PUBLIC_KEY"); // 需要替換為您的 EmailJS public key
})();

// 聯絡表單處理
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // 更改按鈕狀態
    const submitBtn = document.getElementById('submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '發送中...';
    submitBtn.disabled = true;

    // 準備發送的數據
    const templateParams = {
        to_email: 'changbob2003702@gmail.com',
        from_name: this.user_name.value,
        from_email: this.user_email.value,
        phone: this.user_phone.value,
        message: this.message.value
    };

    // 發送郵件
    emailjs.send('default_service', 'template_id', templateParams) // 需要替換為您的 service ID 和 template ID
        .then(function(response) {
            submitBtn.textContent = '訊息已送出！';
            document.getElementById('contact-form').reset();
            
            // 3秒後恢復按鈕原始狀態
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 3000);
        }, function(error) {
            submitBtn.textContent = '發送失敗，請稍後再試';
            console.error('發送失敗:', error);
            
            // 3秒後恢復按鈕原始狀態
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 3000);
        });
});

// 作品集項目點擊效果
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('click', function() {
        // 添加點擊動畫效果
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        }, 200);
        
        // 這裡可以添加點擊作品後的行為
        console.log('點擊了作品:', this.querySelector('h3').textContent);
    });
});

// 滾動動畫效果
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.portfolio-item, .service-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// 初始化元素樣式
document.querySelectorAll('.portfolio-item, .service-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.4s ease-out';
});

// 監聽滾動事件
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// 等待頁面完全載入
window.onload = function() {
    // 幻燈片控制
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    let currentSlide = 0;
    let slideInterval;

    console.log('幻燈片數量:', slides.length); // 調試用

    // 顯示指定幻燈片
    function showSlide(index) {
        console.log('切換到幻燈片:', index); // 調試用
        
        // 移除所有幻燈片的active類
        slides.forEach(slide => {
            slide.classList.remove('active');
            slide.style.opacity = '0';
        });
        dots.forEach(dot => dot.classList.remove('active'));
        
        // 添加active類到當前幻燈片
        slides[index].classList.add('active');
        slides[index].style.opacity = '1';
        dots[index].classList.add('active');
        currentSlide = index;
    }

    // 下一張幻燈片
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // 上一張幻燈片
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // 初始化
    function initSlideshow() {
        console.log('初始化幻燈片'); // 調試用
        
        // 設置初始狀態
        showSlide(0);
        
        // 設置自動播放
        slideInterval = setInterval(nextSlide, 5000);
        
        // 添加事件監聽器
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                clearInterval(slideInterval);
                prevSlide();
                slideInterval = setInterval(nextSlide, 5000);
            });
            
            nextBtn.addEventListener('click', () => {
                clearInterval(slideInterval);
                nextSlide();
                slideInterval = setInterval(nextSlide, 5000);
            });
        }

        // 點擊指示點切換幻燈片
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                clearInterval(slideInterval);
                showSlide(index);
                slideInterval = setInterval(nextSlide, 5000);
            });
        });

        // 滑鼠懸停時暫停自動播放
        const slideshow = document.querySelector('.slideshow');
        if (slideshow) {
            slideshow.addEventListener('mouseenter', () => {
                console.log('暫停自動播放'); // 調試用
                clearInterval(slideInterval);
            });
            slideshow.addEventListener('mouseleave', () => {
                console.log('恢復自動播放'); // 調試用
                slideInterval = setInterval(nextSlide, 5000);
            });
        }
    }

    // 啟動幻燈片
    if (slides.length > 0) {
        initSlideshow();
    } else {
        console.error('未找到幻燈片元素'); // 調試用
    }

    // 影片處理
    document.addEventListener('DOMContentLoaded', function() {
        const videoThumbnails = document.querySelectorAll('.video-thumbnail');
        
        videoThumbnails.forEach(thumbnail => {
            // 移除原有的點擊事件處理
            thumbnail.addEventListener('click', function(e) {
                // 讓連結正常運作
                return true;
            });
        });
    });

    // 影片播放功能
    const videoModal = document.getElementById('video-modal');
    const videoFrame = document.getElementById('video-frame');
    const closeModal = document.querySelector('.close-modal');

    if (videoModal && videoFrame && closeModal) {
        closeModal.addEventListener('click', function() {
            videoModal.style.display = 'none';
            videoFrame.src = '';
            document.body.style.overflow = 'auto';
        });

        window.addEventListener('click', function(event) {
            if (event.target === videoModal) {
                videoModal.style.display = 'none';
                videoFrame.src = '';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // 平滑滾動
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 漢堡選單控制
    document.addEventListener('DOMContentLoaded', function() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('nav ul');

        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // 點擊選單項目後關閉選單
        const navLinks = document.querySelectorAll('nav ul li a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    });
}; 