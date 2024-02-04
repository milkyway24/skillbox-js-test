export default class Card {
    constructor(container, cardData, template) {
        this.data = cardData;
        this.appendCard(container, template);
    }

    createCardFromTemplate(cardTemplate) {
        const cardTemp = cardTemplate.content.querySelector('[data-template="element"]');
        const cardWrap = cardTemp.cloneNode(true);
        const card = cardWrap.querySelector('.product-card'),
            label = card.querySelector('.product-card__label'),
            hit = card.querySelector('.product-card__hit'),
            title = card.querySelector('.product-card__title'),
            image = card.querySelector('.product-card__img'),
            date = card.querySelector('.product-card__date'),
            link = card.querySelector('.product-card__shadow-link');

        if (!this.data.hit) hit.remove();
        card.className = `${card.className} ${this.data.classes.join(' ')}`;
        label.textContent = this.data.label;
        title.textContent = this.data.title;
        image.src = this.data.src;
        image.width = this.data.width;
        image.height = this.data.height;
        image.alt = this.data.alt;
        date.textContent = this.data.date;
        link.href = this.data.href;

        return cardWrap;
    }

    appendCard(container, temp) {
        const card = this.createCardFromTemplate(temp);
        container.append(card);
    }
}