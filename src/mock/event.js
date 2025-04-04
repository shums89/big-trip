import { CITIES, DESCRIPTIONS, EVENT_COUNT, EVENT_TYPES, OFFERS_BY_TYPE } from '../const.js';
import dayjs from 'dayjs';
import { getRandomArrayElement, getRandomInteger, getRandomPositiveInteger, shuffleArray } from '../utils/common.js';
import { nanoid } from 'nanoid';

const generatePictures = (count) => [...new Array(count)]
  .map(() => {
    const picture = {
      src: `https://loremflickr.com/248/152?r=${Math.random()}`,
      description: '',
    };

    return picture;
  });

const generateDestination = (city) => {
  const destination = {};

  destination.description = shuffleArray(DESCRIPTIONS).slice(-getRandomPositiveInteger(1, 5)).join(' ');
  destination.name = city;
  destination.pictures = generatePictures(CITIES.indexOf(city) + 1);

  return destination;
};

const generateEvent = (dateFrom, dateTo, city) => {
  const type = getRandomArrayElement(EVENT_TYPES);
  const offersByType = OFFERS_BY_TYPE.filter((el) => el.type === type)[0].offers;

  city = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight'].some((el) => el === type)
    ? getRandomArrayElement(CITIES)
    : city;

  const offers = (Math.round(Math.random()))
    ? shuffleArray(offersByType)
      .slice(-getRandomPositiveInteger(0, offersByType.length - 1))
      .sort((a, b) => a - b)
    : [];

  const event = {
    id: nanoid(),
    basePrice: getRandomPositiveInteger(1, 10) * 10,
    dateFrom,
    dateTo,
    destination: generateDestination(city),
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
  let dateTo = dayjs().add(getRandomInteger(-10, 7), 'day').toDate();

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
  generateDestination,
  generateEvents,
};
