import dayjs from 'dayjs';
import { OFFERS } from '../const';

const getTotalEventPrice = (event) => event.offers
  .slice()
  .map((id) => OFFERS.filter((el) => el.id === id)[0])
  .reduce((acc, cur) => acc + +cur.price, event.basePrice);

const formatDate = (date, format) => date ? dayjs(date).format(format) : '';

const getDuration = (date1, date2) => {
  const startDate = dayjs(date1);
  const endDate = dayjs(date2);

  return endDate.diff(startDate, 'minute');
};

const getDurationFormat = (date1, date2) => {
  const duration = getDuration(date1, date2);

  let minutes = parseInt(duration % 60, 10);
  let hours = parseInt((duration / 60) % 24, 10);
  let days = parseInt(duration / (60 * 24), 10);

  days = (days > 0) ? `0${days}D`.slice(-3) : '';
  hours = (hours > 0) ? `0${hours}H`.slice(-3) : '';
  minutes = (minutes > 0) ? `0${minutes}M`.slice(-3) : '';

  return `${days} ${hours} ${minutes}`;
};

const getFirstCapitalLetter = (word) => word ? word.replace(/(?:^.)/g, (a) => a.toUpperCase()) : '';

const isEventFuture = (date) => dayjs().isBefore(date, 'day');
const isEventPast = (date) => dayjs().isAfter(date, 'day');

const sortByDay = (eventA, eventB) => dayjs(eventA.dateFrom).diff(dayjs(eventB.dateFrom));
const sortByTime = (eventA, eventB) => getDuration(eventB.dateFrom, eventB.dateTo) - getDuration(eventA.dateFrom, eventA.dateTo);
const sortByPrice = (eventA, eventB) => getTotalEventPrice(eventB) - getTotalEventPrice(eventA);

const isEqual = (array1, array2) => JSON.stringify(array1) === JSON.stringify(array2);

export {
  getTotalEventPrice,
  formatDate,
  getDuration,
  getDurationFormat,
  getFirstCapitalLetter,
  isEventFuture,
  isEventPast,
  sortByDay,
  sortByTime,
  sortByPrice,
  isEqual,
};
