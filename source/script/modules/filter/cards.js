import Card from "./card.js";

export default class Cards {
    constructor(container, templateSelector, data) {
        this.container = container;
        this.data = data;
        this.cardTemplate = document.querySelector(templateSelector);

        this.setContainerAnimListnr()
    }

    get data() {
        return this._data;
    }

    set data(value) {
        this._data = value;
    }

    setContainerAnimListnr() {
        this.container.addEventListener('animationend', () => {
            this.container.classList.remove('is-active');
        });
    }

    getCards() {
        const fragment = new DocumentFragment();
        const dataArr = this.data;
        
        for (const obj of dataArr) {
            new Card(fragment, obj, this.cardTemplate);
        }

        return fragment;
    }

    render() {
        const cards = this.getCards(this.data);
        this.container.textContent = '';
        this.container.append(cards);
        this.container.classList.add('is-active');
    }
}