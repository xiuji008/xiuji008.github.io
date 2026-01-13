(function() {
  class Lightbox {
    constructor(options = {}) {
      this.options = Object.assign({
        animationDuration: 300,
        closeOnOverlayClick: true,
        onOpen: null,
        onClose: null,
        onNavigate: null,
        // 新增：GitHub页面特定配置
        isGitHubPage: false,
        // 新增：重试机制
        maxRetries: 3,
        retryDelay: 1000
      }, options);

      this.images = [];
      this.currentIndex = 0;
      this.isOpen = false;
      this.zoomLevel = 1;
      this.touchStartX = 0;
      this.touchEndX = 0;
      this.wheelTimer = null;
      this.preloadedImages = {};
      this.retryCount = 0; // 重试计数器

      this.init();
    }

    init() {
      this.createStyles();
      this.createLightbox();
      this.bindEvents();
    }

    createStyles() {
      const style = document.createElement('style');
      style.textContent = `
        .lb-lightbox-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.95);
          backdrop-filter: blur(5px);
          display: flex;
          justify-content: center;
          align-items: center;
          opacity: 0;
          transition: opacity ${this.options.animationDuration}ms ease;
          pointer-events: none;
          z-index: 99999;
        }
        .lb-lightbox-overlay.active {
          pointer-events: auto;
          opacity: 1;
        }
        .lb-lightbox-content-wrapper {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
        }
        .lb-lightbox-container {
          width: 100%;
          height: 100%;
          position: relative;
          transition: transform ${this.options.animationDuration}ms cubic-bezier(0.25, 0.1, 0.25, 1);
          overflow: hidden;
        }
        .lb-lightbox-image-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          overflow: hidden;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1;
        }
        .lb-lightbox-image {
          max-width: 95%;
          max-height: 90%;
          height: auto;
          object-fit: contain;
          border-radius: 8px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
          transition: transform ${this.options.animationDuration}ms cubic-bezier(0.25, 0.1, 0.25, 1), opacity ${this.options.animationDuration}ms ease;
          opacity: 0;
          cursor: move;
        }
        .lb-lightbox-image.loaded {
          opacity: 1;
        }
        .lb-lightbox-image.error {
          filter: grayscale(100%);
          opacity: 0.5;
        }
        .lb-lightbox-nav, .lb-lightbox-close {
          position: absolute;
          background-color: rgba(255, 255, 255, 0.95);
          color: #333;
          border: none;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          width: 56px;
          height: 56px;
          font-size: 28px;
          font-weight: bold;
          z-index: 2;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          justify-content: center;
          align-items: center;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
        .lb-lightbox-nav:hover {
          background-color: rgba(255, 255, 255, 1);
          transform: scale(1.15);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
        }
        .lb-lightbox-nav:disabled {
          opacity: 0.3;
          cursor: not-allowed;
          transform: none !important;
        }
        .lb-lightbox-prev {
          left: 30px;
          top: 50%;
          transform: translateY(-50%);
        }
        .lb-lightbox-next {
          right: 30px;
          top: 50%;
          transform: translateY(-50%);
        }
        .lb-lightbox-close {
          top: 30px;
          right: 30px;
          background-color: rgba(255, 255, 255, 0.9);
          font-size: 32px;
          width: 56px;
          height: 56px;
        }
        .lb-lightbox-close:hover {
          background-color: rgba(255, 255, 255, 1);
          transform: rotate(90deg) scale(1.1);
        }
        .lb-lightbox-caption {
          position: absolute;
          bottom: 40px;
          left: 0;
          right: 0;
          text-align: center;
          color: white;
          font-size: 16px;
          font-weight: 500;
          padding: 12px 24px;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-radius: 12px;
          margin: 0 auto;
          max-width: 80%;
          z-index: 2;
          line-height: 1.5;
          opacity: 0.9;
          transition: opacity 0.3s ease;
        }
        .lb-lightbox-caption:hover {
          opacity: 1;
        }
        .lb-lightbox-loader {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 48px;
          height: 48px;
          border: 4px solid rgba(255, 255, 255, 0.1);
          border-top: 4px solid rgba(255, 255, 255, 0.8);
          border-radius: 50%;
          animation: spin 1s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite;
          z-index: 2;
          display: none;
        }
        .lb-lightbox-error {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          text-align: center;
          font-size: 16px;
          background: rgba(255, 0, 0, 0.2);
          padding: 20px 30px;
          border-radius: 12px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          z-index: 2;
          display: none;
          max-width: 80%;
        }
        .lb-lightbox-counter {
          position: absolute;
          top: 30px;
          left: 30px;
          color: white;
          font-size: 16px;
          font-weight: 500;
          background: rgba(0, 0, 0, 0.5);
          padding: 8px 16px;
          border-radius: 20px;
          backdrop-filter: blur(10px);
          z-index: 2;
          opacity: 0.8;
        }
        @keyframes spin {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .lb-lightbox-image.fade-in {
          animation: fadeIn ${this.options.animationDuration}ms ease;
        }
        @media (max-width: 768px) {
          .lb-lightbox-nav, .lb-lightbox-close {
            width: 44px;
            height: 44px;
            font-size: 22px;
          }
          .lb-lightbox-close {
            width: 44px;
            height: 44px;
            font-size: 26px;
            top: 20px;
            right: 20px;
          }
          .lb-lightbox-prev {
            left: 15px;
          }
          .lb-lightbox-next {
            right: 15px;
          }
          .lb-lightbox-caption {
            font-size: 14px;
            bottom: 20px;
            padding: 10px 16px;
          }
          .lb-lightbox-counter {
            top: 20px;
            left: 20px;
            font-size: 14px;
            padding: 6px 12px;
          }
          .lb-lightbox-image {
            max-width: 98%;
            max-height: 85%;
          }
        }
        @media (max-width: 480px) {
          .lb-lightbox-nav {
            width: 40px;
            height: 40px;
            font-size: 20px;
          }
          .lb-lightbox-caption {
            font-size: 13px;
            bottom: 15px;
          }
        }
      `;
      document.head.appendChild(style);
    }

    createLightbox() {
      this.overlay = document.createElement('div');
      this.overlay.className = 'lb-lightbox-overlay';
      this.overlay.setAttribute('aria-hidden', 'true');
      this.overlay.setAttribute('role', 'dialog');
      this.overlay.setAttribute('aria-label', 'Image lightbox');

      this.contentWrapper = document.createElement('div');
      this.contentWrapper.className = 'lb-lightbox-content-wrapper';

      this.container = document.createElement('div');
      this.container.className = 'lb-lightbox-container';

      this.imageWrapper = document.createElement('div');
      this.imageWrapper.className = 'lb-lightbox-image-wrapper';

      this.image = document.createElement('img');
      this.image.className = 'lb-lightbox-image';
      this.image.setAttribute('draggable', 'false');

      // 加载器
      this.loader = document.createElement('div');
      this.loader.className = 'lb-lightbox-loader';

      // 错误信息
      this.errorElement = document.createElement('div');
      this.errorElement.className = 'lb-lightbox-error';

      // 计数器
      this.counter = document.createElement('div');
      this.counter.className = 'lb-lightbox-counter';

      // 标题
      this.caption = document.createElement('div');
      this.caption.className = 'lb-lightbox-caption';

      // 导航按钮
      this.prevButton = document.createElement('button');
      this.prevButton.className = 'lb-lightbox-nav lb-lightbox-prev';
      this.prevButton.innerHTML = '&#10094;';
      this.prevButton.setAttribute('aria-label', 'Previous image');
      this.prevButton.setAttribute('tabindex', '0');

      this.nextButton = document.createElement('button');
      this.nextButton.className = 'lb-lightbox-nav lb-lightbox-next';
      this.nextButton.innerHTML = '&#10095;';
      this.nextButton.setAttribute('aria-label', 'Next image');
      this.nextButton.setAttribute('tabindex', '0');

      this.closeButton = document.createElement('button');
      this.closeButton.className = 'lb-lightbox-close';
      this.closeButton.innerHTML = '&times;';
      this.closeButton.setAttribute('aria-label', 'Close lightbox');
      this.closeButton.setAttribute('tabindex', '0');

      // 组装元素
      this.imageWrapper.appendChild(this.image);
      this.imageWrapper.appendChild(this.loader);
      this.imageWrapper.appendChild(this.errorElement);
      this.container.appendChild(this.imageWrapper);
      this.contentWrapper.appendChild(this.container);
      this.contentWrapper.appendChild(this.prevButton);
      this.contentWrapper.appendChild(this.nextButton);
      this.contentWrapper.appendChild(this.closeButton);
      this.contentWrapper.appendChild(this.counter);
      this.contentWrapper.appendChild(this.caption);

      this.overlay.appendChild(this.contentWrapper);
      document.body.appendChild(this.overlay);
    }

    bindEvents() {
      // 使用事件委托绑定图片点击事件
      document.addEventListener('click', this.handleImageClick.bind(this));
      this.overlay.addEventListener('click', this.handleOverlayClick.bind(this));
      
      // 按钮事件
      this.prevButton.addEventListener('click', (e) => {
        e.stopPropagation();
        this.showPreviousImage();
      });
      
      this.nextButton.addEventListener('click', (e) => {
        e.stopPropagation();
        this.showNextImage();
      });
      
      this.closeButton.addEventListener('click', (e) => {
        e.stopPropagation();
        this.close();
      });

      // 键盘事件
      document.addEventListener('keydown', this.handleKeyDown.bind(this));
      
      // 滚轮事件
      this.overlay.addEventListener('wheel', this.handleWheel.bind(this), { passive: false });
      
      // 触摸事件
      this.overlay.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
      this.overlay.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: true });
      this.overlay.addEventListener('touchend', this.handleTouchEnd.bind(this));
      
      // 双击缩放
      this.image.addEventListener('dblclick', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (this.zoomLevel === 1) {
          this.zoomLevel = 2;
          this.image.style.transform = `scale(${this.zoomLevel})`;
        } else {
          this.zoomLevel = 1;
          this.image.style.transform = `scale(${this.zoomLevel})`;
        }
      });
    }

    handleImageClick(event) {
      if (this.isOpen) return;
      
      let target = event.target;
      
      // 检查是否是图片元素
      while (target && target !== document) {
        if (target.tagName === 'IMG') {
          event.preventDefault();
          event.stopPropagation();
          
          // 收集所有图片
          this.collectImages();
          this.currentIndex = this.images.findIndex(img => 
            img === target || img.src === target.src
          );
          
          if (this.currentIndex !== -1) {
            this.open();
          }
          return;
        }
        target = target.parentElement;
      }
    }

    collectImages() {
      // 收集页面中所有非图标/装饰性的图片
      this.images = Array.from(document.querySelectorAll('img')).filter(img => {
        // 过滤掉太小的图片（可能是图标）
        const rect = img.getBoundingClientRect();
        const isLargeEnough = rect.width > 50 && rect.height > 50;
        
        // 过滤掉常见的图标类
        const isIcon = img.classList.contains('icon') || 
                      img.src.includes('icon') ||
                      img.alt?.toLowerCase().includes('icon') ||
                      /\.svg$/i.test(img.src);
        
        // 过滤data URLs和blob URLs
        const isDataUrl = img.src.startsWith('data:') || img.src.startsWith('blob:');
        
        return isLargeEnough && !isIcon && !isDataUrl;
      });
    }

    handleOverlayClick(event) {
      if (event.target === this.overlay && this.options.closeOnOverlayClick) {
        this.close();
      }
    }

    handleKeyDown(event) {
      if (!this.isOpen) return;
      
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          this.showPreviousImage();
          break;
        case 'ArrowRight':
          event.preventDefault();
          this.showNextImage();
          break;
        case 'Escape':
          event.preventDefault();
          this.close();
          break;
        case ' ':
          event.preventDefault();
          this.showNextImage();
          break;
      }
    }

    handleWheel(event) {
      if (!this.isOpen) return;
      
      event.preventDefault();

      if (event.ctrlKey || event.metaKey) {
        // Ctrl/Cmd + 滚轮缩放
        const delta = event.deltaY > 0 ? -0.2 : 0.2;
        this.zoomLevel = Math.max(0.5, Math.min(this.zoomLevel + delta, 5));
        this.image.style.transform = `scale(${this.zoomLevel})`;
      } else {
        // 水平滚动切换图片
        clearTimeout(this.wheelTimer);
        this.wheelTimer = setTimeout(() => {
          const delta = Math.sign(event.deltaY);
          if (delta > 0) {
            this.showNextImage();
          } else {
            this.showPreviousImage();
          }
        }, 150);
      }
    }

    handleTouchStart(event) {
      if (!this.isOpen) return;
      this.touchStartX = event.touches[0].clientX;
      this.touchStartY = event.touches[0].clientY;
      this.isSwiping = false;
    }

    handleTouchMove(event) {
      if (!this.isOpen) return;
      this.touchEndX = event.touches[0].clientX;
      this.touchEndY = event.touches[0].clientY;
      
      const diffX = Math.abs(this.touchStartX - this.touchEndX);
      const diffY = Math.abs(this.touchStartY - this.touchEndY);
      
      if (diffX > diffY && diffX > 10) {
        this.isSwiping = true;
        event.preventDefault();
      }
    }

    handleTouchEnd() {
      if (!this.isOpen || !this.isSwiping) return;
      
      const difference = this.touchStartX - this.touchEndX;
      const threshold = 80;
      
      if (Math.abs(difference) > threshold) {
        if (difference > 0) {
          this.showNextImage();
        } else {
          this.showPreviousImage();
        }
      }
      
      this.isSwiping = false;
    }

    open() {
      this.isOpen = true;
      this.retryCount = 0; // 重置重试计数器
      this.overlay.classList.add('active');
      this.overlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = this.getScrollbarWidth() + 'px';
      
      // 重置状态
      this.hideError();
      this.loader.style.display = 'block';
      this.image.style.opacity = '0';
      this.image.classList.remove('loaded', 'error', 'fade-in');
      
      // 显示第一张图片
      this.showCurrentImage();
      
      if (typeof this.options.onOpen === 'function') {
        this.options.onOpen(this.currentIndex, this.images.length);
      }
      
      // 预加载相邻图片
      this.preloadImages();
    }

    showCurrentImage() {
      if (this.currentIndex < 0 || this.currentIndex >= this.images.length) return;
      
      const currentImage = this.images[this.currentIndex];
      const imgSrc = currentImage.src;
      
      // 更新计数器
      this.updateCounter();
      
      // 设置标题
      this.setCaption(currentImage);
      
      // 显示加载器
      this.loader.style.display = 'block';
      this.errorElement.style.display = 'none';
      
      // 重置缩放
      this.zoomLevel = 1;
      this.image.style.transform = 'scale(1)';
      
      // 创建新的Image对象来检查图片是否可加载
      const testImage = new Image();
      
      // 设置超时
      const loadTimeout = setTimeout(() => {
        this.handleImageError('加载超时');
      }, 10000);
      
      testImage.onload = () => {
        clearTimeout(loadTimeout);
        this.retryCount = 0; // 重置重试计数器
        
        // 主图片加载
        this.image.onload = () => {
          this.image.classList.add('loaded', 'fade-in');
          this.image.style.opacity = '1';
          this.loader.style.display = 'none';
          this.updateNavigation();
        };
        
        this.image.onerror = () => {
          this.handleImageError('图片加载失败');
        };
        
        // 设置src开始加载
        this.image.src = imgSrc;
        
        // 对于GitHub Camo图片，可能需要设置referrer policy
        if (this.options.isGitHubPage && imgSrc.includes('camo.githubusercontent.com')) {
          this.image.crossOrigin = 'anonymous';
          this.image.referrerPolicy = 'no-referrer';
        }
      };
      
      testImage.onerror = () => {
        clearTimeout(loadTimeout);
        this.retryImageLoad(imgSrc);
      };
      
      // 开始测试加载
      testImage.src = imgSrc;
    }

    retryImageLoad(imgSrc) {
      if (this.retryCount < this.options.maxRetries) {
        this.retryCount++;
        console.log(`重试加载图片 (${this.retryCount}/${this.options.maxRetries}):`, imgSrc);
        
        // 显示重试信息
        this.showError(`正在重试加载... (${this.retryCount}/${this.options.maxRetries})`);
        
        // 延迟重试
        setTimeout(() => {
          this.showCurrentImage();
        }, this.options.retryDelay);
      } else {
        this.handleImageError('图片无法加载，请检查网络连接');
      }
    }

    handleImageError(message) {
      console.error('图片加载失败:', this.images[this.currentIndex]?.src);
      this.loader.style.display = 'none';
      this.showError(message || '图片加载失败');
      this.image.classList.add('error');
      this.updateNavigation();
    }

    showError(message) {
      this.errorElement.textContent = message;
      this.errorElement.style.display = 'block';
    }

    hideError() {
      this.errorElement.style.display = 'none';
    }

    updateCounter() {
      this.counter.textContent = `${this.currentIndex + 1} / ${this.images.length}`;
    }

    close() {
      this.isOpen = false;
      this.overlay.classList.remove('active');
      this.overlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      
      // 隐藏所有状态元素
      this.loader.style.display = 'none';
      this.hideError();
      
      // 清理
      this.clearPreloadedImages();
      
      if (typeof this.options.onClose === 'function') {
        this.options.onClose();
      }
    }

    showPreviousImage() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
        this.showCurrentImage();
        this.animateButton(this.prevButton);
        
        if (typeof this.options.onNavigate === 'function') {
          this.options.onNavigate(this.currentIndex, this.images.length);
        }
      }
    }

    showNextImage() {
      if (this.currentIndex < this.images.length - 1) {
        this.currentIndex++;
        this.showCurrentImage();
        this.animateButton(this.nextButton);
        
        if (typeof this.options.onNavigate === 'function') {
          this.options.onNavigate(this.currentIndex, this.images.length);
        }
      }
    }

    animateButton(button) {
      button.style.transform = button.style.transform.replace('scale(1.15)', 'scale(1.3)');
      setTimeout(() => {
        button.style.transform = button.style.transform.replace('scale(1.3)', 'scale(1.15)');
      }, 200);
    }

    setCaption(imageElement) {
      const caption = 
        imageElement.getAttribute('alt') || 
        imageElement.getAttribute('title') || 
        imageElement.dataset.caption || 
        '';
      
      if (caption && caption.trim().length > 0) {
        this.caption.textContent = caption.trim();
        this.caption.style.display = 'block';
      } else {
        this.caption.style.display = 'none';
      }
    }

    updateNavigation() {
      this.prevButton.disabled = this.currentIndex === 0;
      this.nextButton.disabled = this.currentIndex === this.images.length - 1;
      
      // 更新aria标签
      this.prevButton.setAttribute('aria-label', 
        this.currentIndex === 0 ? '没有更多图片' : '上一张图片');
      this.nextButton.setAttribute('aria-label',
        this.currentIndex === this.images.length - 1 ? '没有更多图片' : '下一张图片');
    }

    preloadImages() {
      const indices = [
        this.currentIndex - 1,
        this.currentIndex + 1,
        this.currentIndex - 2,
        this.currentIndex + 2
      ].filter(index => index >= 0 && index < this.images.length && !this.preloadedImages[index]);

      indices.forEach(index => {
        if (!this.preloadedImages[index]) {
          const img = new Image();
          img.src = this.images[index].src;
          
          // GitHub Camo图片特殊处理
          if (this.options.isGitHubPage && img.src.includes('camo.githubusercontent.com')) {
            img.crossOrigin = 'anonymous';
            img.referrerPolicy = 'no-referrer';
          }
          
          this.preloadedImages[index] = img;
        }
      });
    }

    clearPreloadedImages() {
      Object.values(this.preloadedImages).forEach(img => {
        if (img && img.src) {
          img.src = '';
        }
      });
      this.preloadedImages = {};
    }

    getScrollbarWidth() {
      return window.innerWidth - document.documentElement.clientWidth;
    }

    // 公共方法：手动绑定图片
    bindImages(selector = 'img') {
      const images = document.querySelectorAll(selector);
      this.images = Array.from(images).filter(img => {
        const rect = img.getBoundingClientRect();
        return rect.width > 50 && rect.height > 50;
      });
      
      this.images.forEach((img, index) => {
        img.style.cursor = 'zoom-in';
        img.dataset.lightboxIndex = index;
      });
    }
  }

  // 暴露到全局
  window.Lightbox = Lightbox;

  // DOM加载完成后自动初始化（针对GitHub页面优化）
  document.addEventListener('DOMContentLoaded', () => {
    const isGitHub = window.location.hostname.includes('github.com');
    
    const lightbox = new Lightbox({
      isGitHubPage: isGitHub,
      maxRetries: 2,
      retryDelay: 1500,
      onOpen: (index, total) => {
        console.log(`Lightbox opened: ${index + 1}/${total}`);
      },
      onClose: () => {
        console.log('Lightbox closed');
      }
    });
    
    // 延迟绑定，确保所有图片已加载
    setTimeout(() => {
      lightbox.bindImages('img:not([src*=".svg"]):not([src*="icon"])');
    }, 500);
    
    // 监听动态内容加载
    if (isGitHub) {
      const observer = new MutationObserver(() => {
        setTimeout(() => {
          lightbox.bindImages('img:not([src*=".svg"]):not([src*="icon"])');
        }, 300);
      });
      
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    }
  });
})();
