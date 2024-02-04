import fetchData from "./fetch-data.js";
import FilteredCards from "./filtered-cards.js";

const filterSettings = {
    CARDS_URL: "/public/projects.json",
    CARD_TEMPLATE_SELECTOR: '[data-template="project-card"]',
    FILTER_LIST_SELECTOR: '[data-filter="parent"]',
    FILTER_LINK_SELECTOR: '[data-filter="link"]'
}

class Filter {
    constructor(container, settings) {
        this.container = container;
        this.settings = settings;
        this.init();
    }

    getUrlHash() {
        return window.location.hash;
    }

    async init() {
        const tag = this.getUrlHash();
        const data = await fetchData(this.settings.CARDS_URL);
        const cards = new FilteredCards(
            this.container,
            this.settings.CARD_TEMPLATE_SELECTOR,
            data,
            this.settings.FILTER_LIST_SELECTOR,
            this.settings.FILTER_LINK_SELECTOR
        );
        cards.render(tag);
    }
}

const initFilter = () => {
    const list = document.querySelector('[data-project="parent"]');
    if (list) {
        new Filter(list, filterSettings);
    }
}

export default initFilter;