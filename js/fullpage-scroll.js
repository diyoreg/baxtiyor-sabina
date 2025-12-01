class FullPageScroll {
    constructor() {
        this.sections = document.querySelectorAll('.section');
        this.currentSection = 0;
        this.isScrolling = false;
        this.scrollCooldown = 1000; // 1 soniya
        this.touchStartY = 0;
        this.touchEndY = 0;
        this.pagination = document.getElementById('fullpage-pagination');
        this.sectionNames = ['Bosh sahifa', 'Vaqt', "To'y", 'Xarita', 'Manzil', 'Xabar'];

        this.init();
    }

    init() {
        // Har bir section'ni to'liq ekran qilish
        this.sections.forEach(section => {
            section.style.height = '100vh';
            section.style.minHeight = '100vh';
        });

        // Pagination yaratish
        this.createPagination();

        // Scroll event'larini qo'shish
        this.addEventListeners();

        // Birinchi section'ga o'tish
        this.goToSection(0, false);
    }

    createPagination() {
        this.sections.forEach((section, index) => {
            const dot = document.createElement('div');
            dot.classList.add('fullpage-pagination__dot');
            dot.setAttribute('data-tooltip', this.sectionNames[index] || `Section ${index + 1}`);
            dot.setAttribute('data-section', index);

            dot.addEventListener('click', () => {
                this.goToSection(index);
            });

            this.pagination.appendChild(dot);
        });
    }

    updatePagination() {
        const dots = this.pagination.querySelectorAll('.fullpage-pagination__dot');
        dots.forEach((dot, index) => {
            if (index === this.currentSection) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    addEventListeners() {
        // Mouse wheel scroll
        window.addEventListener('wheel', (e) => this.handleWheel(e), { passive: false });

        // Touch events (mobile uchun)
        window.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
        window.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: false });
        window.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: true });

        // Keyboard navigation
        window.addEventListener('keydown', (e) => this.handleKeyboard(e));

        // Resize
        window.addEventListener('resize', () => this.handleResize());
    }

    handleWheel(e) {
        if (this.isScrolling) {
            e.preventDefault();
            return;
        }

        e.preventDefault();

        if (e.deltaY > 0) {
            // Scroll down
            this.nextSection();
        } else {
            // Scroll up
            this.prevSection();
        }
    }

    handleTouchStart(e) {
        this.touchStartY = e.touches[0].clientY;
    }

    handleTouchMove(e) {
        if (this.isScrolling) {
            e.preventDefault();
        }
    }

    handleTouchEnd(e) {
        if (this.isScrolling) return;

        this.touchEndY = e.changedTouches[0].clientY;
        const diff = this.touchStartY - this.touchEndY;

        // Minimum swipe distance
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                // Swipe up - next section
                this.nextSection();
            } else {
                // Swipe down - previous section
                this.prevSection();
            }
        }
    }

    handleKeyboard(e) {
        if (this.isScrolling) return;

        switch(e.key) {
            case 'ArrowDown':
            case 'PageDown':
                e.preventDefault();
                this.nextSection();
                break;
            case 'ArrowUp':
            case 'PageUp':
                e.preventDefault();
                this.prevSection();
                break;
            case 'Home':
                e.preventDefault();
                this.goToSection(0);
                break;
            case 'End':
                e.preventDefault();
                this.goToSection(this.sections.length - 1);
                break;
        }
    }

    handleResize() {
        // Resize bo'lganda current section'ni qayta o'rnatish
        this.goToSection(this.currentSection, false);
    }

    nextSection() {
        if (this.currentSection < this.sections.length - 1) {
            this.goToSection(this.currentSection + 1);
        }
    }

    prevSection() {
        if (this.currentSection > 0) {
            this.goToSection(this.currentSection - 1);
        }
    }

    goToSection(index, animate = true) {
        if (index < 0 || index >= this.sections.length) return;

        this.isScrolling = true;
        this.currentSection = index;

        const targetSection = this.sections[index];

        // Smooth scroll
        window.scrollTo({
            top: targetSection.offsetTop,
            behavior: animate ? 'smooth' : 'auto'
        });

        // Active class qo'shish
        this.sections.forEach(section => section.classList.remove('active'));
        targetSection.classList.add('active');

        // Pagination yangilash
        this.updatePagination();

        // Cooldown
        setTimeout(() => {
            this.isScrolling = false;
        }, this.scrollCooldown);
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new FullPageScroll();
    });
} else {
    new FullPageScroll();
}
