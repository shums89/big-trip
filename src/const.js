const EVENT_COUNT = 10;
const CITIES = ['Amsterdam', 'Chamonix', 'Geneva', 'London', 'Paris'];
const EVENT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const OFFERS_BY_TYPE = [
  { type: 'taxi', offers: [1, 5] },
  { type: 'bus', offers: [3] },
  { type: 'train', offers: [3, 7, 11] },
  { type: 'ship', offers: [2, 3, 6, 7, 11] },
  { type: 'drive', offers: [4] },
  { type: 'flight', offers: [2, 3, 10, 11] },
  { type: 'check-in', offers: [] },
  { type: 'sightseeing', offers: [8, 9] },
  { type: 'restaurant', offers: [3, 5] },
];

const OFFERS = [
  { id: 1, title: 'Upgrade to a business class', price: 120 },
  { id: 2, title: 'Add luggage', price: 30 },
  { id: 3, title: 'Choose seats', price: 5 },
  { id: 4, title: 'Rent a car', price: 20 },
  { id: 5, title: 'Order Uber', price: 20 },
  { id: 6, title: 'Add breakfast', price: 50 },
  { id: 7, title: 'Add lunch', price: 70 },
  { id: 8, title: 'Book tickets', price: 40 },
  { id: 9, title: 'Lunch in city', price: 70 },
  { id: 10, title: 'Add meal', price: 15 },
  { id: 11, title: 'Switch to comfort class', price: 100 },
];

const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.'
];

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

const SortType = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price',
};

export {
  EVENT_COUNT,
  CITIES,
  EVENT_TYPES,
  OFFERS,
  OFFERS_BY_TYPE,
  DESCRIPTIONS,
  FilterType,
  SortType,
};
