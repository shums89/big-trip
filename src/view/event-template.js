import { getDurationFormat, formatDate } from '../utils/event.js';

const createOfferListTemplate = (offers) => offers
  .slice()
  .map((el) =>
    `
    <li class="event__offer">
      <span class="event__offer-title">${el.title}</span>
      +€&nbsp;
      <span class="event__offer-price">${el.price}</span>
    </li>
  `
  )
  .join('');

export const createEventTemplate = (event, Catalog) => {
  const { basePrice, dateFrom, dateTo, destination, isFavorite, offers, type } = event;

  const offersByType = Catalog.OFFERS
    .slice()
    .filter((el) => el.type === type)[0].offers;

  const filteredOffers = offers
    .slice()
    .map((id) => offersByType.filter((el) => el.id === id)[0]);

  const totalPrice = filteredOffers.reduce((acc, cur) => acc + +cur.price, basePrice);

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
          <p class="event__duration">${getDurationFormat(dateFrom, dateTo)}</p>
        </div>
        <p class="event__price">
          €&nbsp;<span class="event__price-value">${totalPrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">${createOfferListTemplate(filteredOffers)}</ul>
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
