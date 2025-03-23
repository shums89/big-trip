import { getRandomArrayElement, getRandomPositiveInteger, shuffleArray } from '../utils.js';
import { CITIES, DESCRIPTIONS, EVENT_COUNT, EVENT_TYPES, OFFERS, OFFERS_BY_TYPE } from '../const.js';
import dayjs from 'dayjs';

const generateEvent = (dateFrom, dateTo, city) => {
  const type = getRandomArrayElement(EVENT_TYPES);
  const offersByType = OFFERS_BY_TYPE.filter((el) => el.type === type)[0].offers;
  let offers = [];
  let basePrice = getRandomPositiveInteger(1, 10) * 10;

  if (Math.round(Math.random())) {
    offers = shuffleArray(offersByType).slice(-getRandomPositiveInteger(0, offersByType.length - 1));
  }

  if (offers) {
    basePrice = offers
      .slice()
      .reduce((acc, id) => +acc + +OFFERS.filter((el) => el.id === id)[0].price, basePrice);
  }

  const pictures = [...new Array(getRandomPositiveInteger(0, 5))]
    .map(() => {
      const picture = {
        src: `https://loremflickr.com/248/152?r=${Math.random()}`,
        description: '',
      };

      return picture;
    });

  const destination = {
    description: shuffleArray(DESCRIPTIONS).slice(-getRandomPositiveInteger(1, 5)).join(' '),
    name: ['taxi', 'bus', 'train', 'ship', 'drive', 'flight'].some((el) => el === type) ? getRandomArrayElement(CITIES) : city,
    pictures,
  };

  const event = {
    basePrice,
    dateFrom,
    dateTo,
    destination,
    isFavorite: Boolean(Math.round(Math.random())),
    offers,
    type,
  };

  return event;
};

const generateEvents = () => {
  let events = [];
  let event = {};
  let dateFrom;
  let dateTo = dayjs().add(5, 'day');
  let city = getRandomArrayElement(CITIES);

  for (let i = 0; i < EVENT_COUNT; i++) {
    dateFrom = dayjs(dateTo).add(getRandomPositiveInteger(60, 4320), 'minute').format();
    dateTo = dayjs(dateFrom).add(getRandomPositiveInteger(60, 4320), 'minute').format();

    event = generateEvent(dateFrom, dateTo, city);
    city = event.destination.name;

    events = [...events, event];
  }

  return events;
};

export {
  generateEvents,
};
