(function() {
  class Lightbox {
    constructor(options = {}) {
      this.options = Object.assign({
        animationDuration: 300,
        closeOnOverlayClick: true,
        onOpen: null,
        onClose: null,
        onNavigate: null
      }, options);

      this.images = [];
      this.currentIndex = 0;
      this.isOpen = false;
      this.zoomLevel = 1;
      this.touchStartX = 0;
      this.touchEndX = 0;
      this.wheelTimer = null;
      this.preloadedImages = {};

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
          background-color: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(5px);
          display: flex;
          justify-content: center;
          align-items: center;
          opacity: 0;
          transition: opacity ${this.options.animationDuration}ms ease;
          pointer-events: none;
          z-index: 10000;
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
          max-width: 100%;
          max-height: 100%;
          height: auto;
          object-fit: contain;
          border-radius: 8px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          transition: transform ${this.options.animationDuration}ms cubic-bezier(0.25, 0.1, 0.25, 1), opacity ${this.options.animationDuration}ms ease;
          opacity: 0;
        }
        .lb-lightbox-image.loaded {
          opacity: 1;
        }
        .lb-lightbox-nav, .lb-lightbox-close {
          position: absolute;
          background-color: rgba(255, 255, 255, 0.9);
          color: #333;
          border: none;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
          width: 50px;
          height: 50px;
          font-size: 24px;
          z-index: 2;
          transition: all 0.2s ease;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .lb-lightbox-nav:hover {
          background-color: rgba(255, 255, 255, 1);
          transform: scale(1.1);
        }
        .lb-lightbox-prev {
          left: 20px;
          top: 50%;
          transform: translateY(-50%);
        }
        .lb-lightbox-next {
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
        }
        .lb-lightbox-close {
          top: 20px;
          right: 20px;
          background-color: rgba(255, 255, 255, 0.9);
        }
        .lb-lightbox-close:hover {
          background-color: rgba(255, 255, 255, 1);
          transform: rotate(90deg);
        }
        .lb-lightbox-caption {
          position: absolute;
          bottom: 20px;
          left: 0;
          right: 0;
          text-align: center;
          color: white;
          font-size: 16px;
          padding: 10px 20px;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 4px;
          margin: 0 auto;
          max-width: 80%;
          z-index: 2;
        }
        .lb-lightbox-loader {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 40px;
          height: 40px;
          border: 4px solid rgba(255, 255, 255, 0.3);
          border-top: 4px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          z-index: 2;
        }
        @keyframes spin {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @media (max-width: 768px) {
          .lb-lightbox-nav, .lb-lightbox-close {
            width: 40px;
            height: 40px;
            font-size: 20px;
          }
          .lb-lightbox-caption {
            font-size: 14px;
            bottom: 10px;
          }
        }
      `;
      document.head.appendChild(style);
    }

    createLightbox() {
      this.overlay = document.createElement('div');
      this.overlay.className = 'lb-lightbox-overlay';

      this.contentWrapper = document.createElement('div');
      this.contentWrapper.className = 'lb-lightbox-content-wrapper';

      this.container = document.createElement('div');
      this.container.className = 'lb-lightbox-container';

      this.imageWrapper = document.createElement('div');
      this.imageWrapper.className = 'lb-lightbox-image-wrapper';

      this.image = document.createElement('img');
      this.image.className = 'lb-lightbox-image';

      // 添加加载器
      this.loader = document.createElement('div');
      this.loader.className = 'lb-lightbox-loader';

      // 添加标题
      this.caption = document.createElement('div');
      this.caption.className = 'lb-lightbox-caption';

      this.prevButton = document.createElement('button');
      this.prevButton.className = 'lb-lightbox-nav lb-lightbox-prev';
      this.prevButton.innerHTML = '&#10094;';
      this.prevButton.setAttribute('aria-label', 'Previous image');

      this.nextButton = document.createElement('button');
      this.nextButton.className = 'lb-lightbox-nav lb-lightbox-next';
      this.nextButton.innerHTML = '&#10095;';
      this.nextButton.setAttribute('aria-label', 'Next image');

      this.closeButton = document.createElement('button');
      this.closeButton.className = 'lb-lightbox-close';
      this.closeButton.innerHTML = '&times;';
      this.closeButton.setAttribute('aria-label', 'Close lightbox');

      this.imageWrapper.appendChild(this.image);
      this.imageWrapper.appendChild(this.loader);
      this.container.appendChild(this.imageWrapper);
      this.contentWrapper.appendChild(this.container);
      this.contentWrapper.appendChild(this.prevButton);
      this.contentWrapper.appendChild(this.nextButton);
      this.contentWrapper.appendChild(this.closeButton);
      this.contentWrapper.appendChild(this.caption);

      this.overlay.appendChild(this.contentWrapper);
      document.body.appendChild(this.overlay);
    }

    bindEvents() {
      // 使用事件委托绑定图片点击事件
      document.addEventListener('click', this.handleImageClick.bind(this));
      this.overlay.addEventListener('click', this.handleOverlayClick.bind(this));
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
      document.addEventListener('keydown', this.handleKeyDown.bind(this));
      this.overlay.addEventListener('wheel', this.handleWheel.bind(this), { passive: false });
      this.overlay.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
      this.overlay.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: true });
      this.overlay.addEventListener('touchend', this.handleTouchEnd.bind(this));
    }

    handleImageClick(event) {
      // 检查点击的是否是图片
      const target = event.target;
      
      // 如果点击的是图片或者图片的子元素
      if (target.tagName === 'IMG' && !this.isOpen) {
        event.preventDefault();
        event.stopPropagation();
        
        // 获取所有图片
        this.images = Array.from(document.querySelectorAll('img'));
        this.currentIndex = this.images.indexOf(target);
        
        if (this.currentIndex === -1) {
          // 如果没找到，尝试查找所有图片
          this.images = Array.from(document.querySelectorAll('img'));
          this.currentIndex = this.images.findIndex(img => img.src === target.src);
        }
        
        if (this.currentIndex !== -1) {
          this.open();
        }
      }
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
      }
    }

    handleWheel(event) {
      if (!this.isOpen) return;
      
      event.preventDefault();

      if (event.ctrlKey || event.metaKey) {
        // Ctrl+滚轮缩放
        this.zoomLevel += event.deltaY > 0 ? -0.1 : 0.1;
        this.zoomLevel = Math.max(0.5, Math.min(this.zoomLevel, 5));
        this.image.style.transform = `scale(${this.zoomLevel})`;
      } else {
        // 普通滚轮切换图片
        clearTimeout(this.wheelTimer);
        this.wheelTimer = setTimeout(() => {
          const delta = Math.sign(event.deltaY);
          if (delta > 0) {
            this.showNextImage();
          } else {
            this.showPreviousImage();
          }
        }, 100);
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
      
      // 水平滑动距离大于垂直滑动距离时，才认为是滑动切换
      if (diffX > diffY && diffX > 10) {
        this.isSwiping = true;
        event.preventDefault();
      }
    }

    handleTouchEnd() {
      if (!this.isOpen || !this.isSwiping) return;
      
      const difference = this.touchStartX - this.touchEndX;
      const threshold = 50;
      
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
      this.overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      
      // 显示加载器
      this.loader.style.display = 'block';
      this.image.style.opacity = '0';
      this.image.classList.remove('loaded');
      
      const currentImage = this.images[this.currentIndex];
      this.showImage(currentImage.src);
      
      // 设置标题
      this.setCaption(currentImage);
      
      if (typeof this.options.onOpen === 'function') {
        this.options.onOpen(this.currentIndex, this.images.length);
      }
      
      // 预加载相邻图片
      this.preloadImages();
    }

    close() {
      this.isOpen = false;
      this.overlay.classList.remove('active');
      document.body.style.overflow = '';
      this.zoomLevel = 1;
      this.image.style.transform = 'scale(1)';
      
      // 隐藏加载器
      this.loader.style.display = 'none';
      
      // 清理预加载的图片
      this.clearPreloadedImages();
      
      if (typeof this.options.onClose === 'function') {
        this.options.onClose();
      }
    }

    showPreviousImage() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
        this.showImage(this.images[this.currentIndex].src);
        this.setCaption(this.images[this.currentIndex]);
        this.animateButton(this.prevButton);
        
        if (typeof this.options.onNavigate === 'function') {
          this.options.onNavigate(this.currentIndex, this.images.length);
        }
      }
    }

    showNextImage() {
      if (this.currentIndex < this.images.length - 1) {
        this.currentIndex++;
        this.showImage(this.images[this.currentIndex].src);
        this.setCaption(this.images[this.currentIndex]);
        this.animateButton(this.nextButton);
        
        if (typeof this.options.onNavigate === 'function') {
          this.options.onNavigate(this.currentIndex, this.images.length);
        }
      }
    }

    animateButton(button) {
      button.style.transform = 'scale(1.2)';
      setTimeout(() => {
        button.style.transform = '';
      }, 200);
    }

    showImage(imgSrc) {
      // 显示加载器
      this.loader.style.display = 'block';
      this.image.style.opacity = '0';
      this.image.classList.remove('loaded');
      
      const newImage = new Image();
      newImage.src = imgSrc;

      newImage.onload = () => {
        // 隐藏加载器
        this.loader.style.display = 'none';
        
        this.image.src = imgSrc;
        this.image.style.opacity = '1';
        this.image.classList.add('loaded');
        this.image.style.transform = `scale(${this.zoomLevel})`;
        
        // 更新导航按钮状态
        this.updateNavigation();
        
        // 预加载更多图片
        this.preloadImages();
      };

      newImage.onerror = () => {
        console.error('Failed to load image:', imgSrc);
        this.loader.style.display = 'none';
        this.image.alt = 'Failed to load image';
      };
    }

    setCaption(imageElement) {
      // 尝试从多个属性获取标题
      const caption = 
        imageElement.getAttribute('alt') || 
        imageElement.getAttribute('title') || 
        imageElement.dataset.caption || 
        '';
      
      if (caption) {
        this.caption.textContent = caption;
        this.caption.style.display = 'block';
      } else {
        this.caption.style.display = 'none';
      }
    }

    updateNavigation() {
      this.prevButton.style.display = this.currentIndex === 0 ? 'none' : 'flex';
      this.nextButton.style.display = this.currentIndex === this.images.length - 1 ? 'none' : 'flex';
    }

    preloadImages() {
      const preloadNext = this.currentIndex + 1;
      const preloadPrev = this.currentIndex - 1;

      if (preloadNext < this.images.length && !this.preloadedImages[preloadNext]) {
        this.preloadedImages[preloadNext] = new Image();
        this.preloadedImages[preloadNext].src = this.images[preloadNext].src;
      }

      if (preloadPrev >= 0 && !this.preloadedImages[preloadPrev]) {
        this.preloadedImages[preloadPrev] = new Image();
        this.preloadedImages[preloadPrev].src = this.images[preloadPrev].src;
      }
    }

    clearPreloadedImages() {
      Object.keys(this.preloadedImages).forEach(key => {
        delete this.preloadedImages[key];
      });
      this.preloadedImages = {};
    }

    // 添加一个公共方法来手动绑定图片
    bindImages(selector = 'img') {
      this.images = Array.from(document.querySelectorAll(selector));
      
      this.images.forEach((img, index) => {
        img.style.cursor = 'pointer';
        img.dataset.lightboxIndex = index;
      });
    }
  }

  // 暴露到全局
  window.Lightbox = Lightbox;

  // DOM加载完成后初始化
  document.addEventListener('DOMContentLoaded', () => {
    const lightbox = new Lightbox();
    
    // 手动绑定所有图片（确保能捕获点击）
    setTimeout(() => {
      lightbox.bindImages('img');
    }, 100);
  });
})();
