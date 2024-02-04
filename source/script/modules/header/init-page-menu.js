class BurgerNav {
    _isOpen = false;

    constructor(btnSelector, logoSelector, navSelector, itemsSelector) {
        this.btn = document.querySelector(btnSelector);
        this.logo = document.querySelector(logoSelector);
        this.nav = document.querySelector(navSelector);
        this.items = Array.from(this.nav.querySelectorAll(itemsSelector));
        this.setListeners();
    }

    get isOpen() {
        return this._isOpen;
    }

    set isOpen(value) {
        this._isOpen = value;
    }

    getToggleMethod() {
        return !this.isOpen ? 'add' : 'remove';
    }

    toggleItemsTransitionDelay() {
        let delay = 0.15;
        for (let i = 1; i < this.items.length; i += 1) {
            this.items[i].style.transitionDelay = !this.isOpen ? `${delay}s` : '';
            if (!this.isOpen) delay += delay;
        }
    }

    setProps() {
        this.btn.classList[this.getToggleMethod()]('is-active');
        this.btn.setAttribute('aria-pressed', !this.isOpen);
        this.logo.classList[this.getToggleMethod()]('is-menu');
        this.nav.classList[this.getToggleMethod()]('is-active');
    }

    toggleScroll() {
        const paddingOffset = `${window.innerWidth - document.body.offsetWidth}px`;
        document.body.style.paddingRight = !this.isOpen ? paddingOffset : '';
        document.body.classList[this.getToggleMethod()]('scroll-lock');
    }

    toggleNav() {
        this.toggleScroll();
        this.toggleItemsTransitionDelay();
        this.setProps();
        this.isOpen = !this.isOpen;
    }

    setResizeListener() {
        const BURGER_MAX_WIDTH = 1023;
        const observer = new ResizeObserver((entries) => {
            if (this.isOpen && entries[0].contentRect.width > BURGER_MAX_WIDTH) {
                console.log('RES TOGGLE');
                this.toggleNav();
            }
        });
        observer.observe(document.body);
    }

    setOnEscClickListener() {
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.toggleNav();
            }
        });
    }

    setListeners() {
        this.btn.addEventListener('click', this.toggleNav.bind(this));
        this.setResizeListener();
        this.setOnEscClickListener();
    }
}

// Не уверен, что правильно понял условие №1 "При реализации логики используйте data атрибуты". А именно, что значит в данном случае использовать data атрибуты в логике. Этого достаточно, или на них прямо логика выполнения должна быть как-то завязана в процессе работы кода?

// Также заметил на видео, что на body при открытии меню появляется атрибут data-scroll и свойство top: 0px в стилях. Я не стал этого делать, т.к. не догадался для чего они служат. Оставил только класс для блокировки скролла и padding-right для фикса скачка страницы при открытии меню.

const initPageMenu = () => {
    new BurgerNav(
        '[data-sandwich="data-sandwich"]',
        '[data-header-logo="data-header-logo"]',
        '[data-main-nav="nav"]',
        '[data-nav-item="item"]'
    );
}

export default initPageMenu;
