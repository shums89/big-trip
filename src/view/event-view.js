import { OFFERS } from '../const.js';
import { createElement } from '../render.js';
import { dateDiff, formatDate } from '../utils.js';

const getOfferList = (offers) => offers
  .slice()
  .map((id) =>
    `
    <li class="event__offer">
      <span class="event__offer-title">${OFFERS.filter((el) => el.id === id)[0].title}</span>
      +€&nbsp;
      <span class="event__offer-price">${OFFERS.filter((el) => el.id === id)[0].price}</span>
    </li>
  `
  )
  .join('');

const createEventTemplate = (event) => {
  const { basePrice, dateFrom, dateTo, destination, isFavorite, offers, type } = event;

  return `
    <li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${formatDate(dateFrom, 'YYYY-MM-DD')}">${formatDate(dateFrom, 'MMM DD')}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${destination.name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${dateFrom}">${formatDate(dateFrom, 'HH:mm')}</time>
            —
            <time class="event__end-time" datetime="${dateTo}')}">${formatDate(dateTo, 'HH:mm')}</time>
          </p>
          <p class="event__duration">${dateDiff(dateFrom, dateTo)}</p>
        </div>
        <p class="event__price">
          €&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">${getOfferList(offers)}</ul>
        <button class="event__favorite-btn ${isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>
  `;
};

export default class EventView {
  constructor({ event }) {
    this.event = event;
  }

  getTemplate() {
    return createEventTemplate(this.event);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
