class Countdown {
    constructor() {
        // 23-dekabr 2025, 18:00
        this.targetDate = new Date('2025-12-23T17:00:00').getTime();

        // DOM elementlar
        this.daysEl = document.querySelector('.section-card__count:nth-of-type(1)');
        this.hoursEl = document.querySelectorAll('.section-card__count')[1];
        this.minutesEl = document.querySelectorAll('.section-card__count')[2];
        this.secondsEl = document.querySelectorAll('.section-card__count')[3];

        this.init();
    }

    init() {
        // Darhol yangilash
        this.updateCountdown();

        // Har soniyada yangilash
        this.interval = setInterval(() => {
            this.updateCountdown();
        }, 1000);
    }

    updateCountdown() {
        const now = new Date().getTime();
        const distance = this.targetDate - now;

        // Agar vaqt o'tib ketgan bo'lsa
        if (distance < 0) {
            clearInterval(this.interval);
            this.daysEl.textContent = '0';
            this.hoursEl.textContent = '0';
            this.minutesEl.textContent = '0';
            this.secondsEl.textContent = '0';
            return;
        }

        // Vaqtni hisoblash
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // DOM'ga yozish
        this.daysEl.textContent = days;
        this.hoursEl.textContent = hours;
        this.minutesEl.textContent = minutes;
        this.secondsEl.textContent = seconds;
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new Countdown();
    });
} else {
    new Countdown();
}
