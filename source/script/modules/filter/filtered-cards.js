import Cards from "./cards.js";

export default class FilteredCards extends Cards {
    tag = '#all';

    constructor(container, templateSelector, data, linksWrapSelector, linkSelector) {
        super(container, templateSelector, data);
        this.linksContainer = document.querySelector(linksWrapSelector);
        this.links = Array.from(this.linksContainer.querySelectorAll(linkSelector));
        this.setLinksListeners();
    }

    get data() {
        if (this.tag && this.tag !== '#all') {
            return this._data.filter((obj) => obj.tags.includes(this.tag));
        }
        return this._data;
    }

    set data(value) {
        this._data = value;
    }

    setActiveLink() {
        const activeLink = this.links.find((link) => link.hash === this.tag);
        this.links.forEach((el) => {
            el.classList.remove('is-active');
        });
        activeLink.classList.add('is-active');
    }

    render(tag) {
        if (tag) {
            this.tag = tag;
        }
        this.setActiveLink();
        super.render();
        this.tag = '#all';
    }

    setLinksListeners() {
        this.links.forEach((link) => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.hash = link.hash;
                this.render(link.hash);
            });
        });
    }
}