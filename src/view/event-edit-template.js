import { CITIES, EVENT_TYPES, OFFERS, OFFERS_BY_TYPE } from '../const.js';
import { formatDate, getFirstCapitalLetter } from '../utils/event.js';

const getOfferList = (type, offers) => {
  const offersByType = OFFERS_BY_TYPE.slice().filter((el) => el.type === type)[0].offers;

  if (offersByType.length === 0) {
    return '';
  }

  const offerList = OFFERS
    .slice()
    .filter((el) => offersByType.some((it) => it === el.id))
    .map((offer) => {
      const typeFromId = offer.title.replace(/\s/g, '-').toLowerCase();

      return `
      <div class='event__offer-selector'>
        <input
          class='event__offer-checkbox visually-hidden'
          id='event-offer-${typeFromId}-1' type='checkbox'
          name='event-offer-${typeFromId}'
          ${(offers?.some((el) => el === offer.id)) ? 'checked' : ''}
        >
        <label class='event__offer-label' for='event-offer-${typeFromId}-1'>
          <span class='event__offer-title'>Add ${offer.title}</span>
          +€&nbsp;
          <span class='event__offer-price'>30</span>
        </label>
      </div>
    `;
    })
    .join('');

  return `
    <section class='event__section event__section--offers'>
      <h3 class='event__section-title event__section-title--offers'>Offers</h3>

      <div class='event__available-offers'>${offerList}</div>
    </section>
  `;
};

const getTypeList = () => EVENT_TYPES
  .slice()
  .map((el) =>
    `
      <div class='event__type-item'>
        <input id='event-type-${el}-1' class='event__type-input visually-hidden' type='radio' name='event-type' value='${el}'>
        <label class='event__type-label event__type-label--${el}' for='event-type-${el}-1'>
          ${getFirstCapitalLetter(el)}
        </label>
      </div>
    `
  )
  .join('');

const getDestination = (destination) => {
  if (Object.keys(destination).length === 0) {
    return '';
  }

  const pictureList = destination.pictures
    .slice()
    .map((el) => `<img class='event__photo' src='${el.src}' alt='${el.description}'>`)
    .join('');

  return `
    <section class='event__section event__section--destination'>
      <h3 class='event__section-title event__section-title--destination'>Destination</h3>
      <p class='event__destination-description'>${destination.description}</p>

      <div class='event__photos-container'>
        <div class='event__photos-tape'>${pictureList}</div>
      </div>
    </section>
  `;
};

export const createEventEditTemplate = (event = {}) => {
  const {
    basePrice = '',
    dateFrom = new Date(),
    dateTo = new Date(),
    destination = {},
    offers = null,
    type = EVENT_TYPES[0],
  } = event;

  const cityList = CITIES.slice().map((el) => `<option value='${el}'></option>`).join('');

  return `
    <form class='event event--edit' action='#' method='post'>
      <header class='event__header'>
        <div class='event__type-wrapper'>
          <label class='event__type event__type-btn' for='event-type-toggle-1'>
            <span class='visually-hidden'>Choose event type</span>
            <img class='event__type-icon' width='17' height='17' src='img/icons/${type}.png' alt='Event type icon'>
          </label>
          <input class='event__type-toggle visually-hidden' id='event-type-toggle-1' type='checkbox'>
          <div class='event__type-list'>
            <fieldset class='event__type-group'>
              <legend class='visually-hidden'>Event type</legend>
              ${getTypeList()}
            </fieldset>
          </div>
        </div>

        <div class='event__field-group event__field-group--destination'>
          <label class='event__label event__type-output' for='event-destination-1'>${type}</label>
          <input
            class='event__input event__input--destination' id='event-destination-1' type='text' name='event-destination'
            value='${destination?.name || ''}' list='destination-list-1'
          >
          <datalist id='destination-list-1'>${cityList}</datalist>
        </div>

        <div class='event__field-group event__field-group--time'>
          <label class='visually-hidden' for='event-start-time-1'>From</label>
          <input
            class='event__input event__input--time' id='event-start-time-1' type='text' name='event-start-time'
            value='${formatDate(dateFrom, 'DD/MM/YY HH:mm')}'
          >
          —
          <label class='visually-hidden' for='event-end-time-1'>To</label>
          <input
            class='event__input event__input--time' id='event-end-time-1' type='text' name='event-end-time'
            value='${formatDate(dateTo, 'DD/MM/YY HH:mm')}'
          >
        </div>

        <div class='event__field-group event__field-group--price'>
          <label class='event__label' for='event-price-1'><span class='visually-hidden'>Price</span>€</label>
          <input
            class='event__input event__input--price' id='event-price-1' type='text' name='event-price'
            value='${basePrice}'
          >
        </div>

        <button class='event__save-btn btn btn--blue' type='submit'>Save</button>
        <button class='event__reset-btn' type='reset'>Cancel</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class='event__details'>
        ${getOfferList(type, offers)}
        ${getDestination(destination)}
      </section>
    </form>
  `;
};
