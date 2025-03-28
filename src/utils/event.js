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

  return endDate.diff(startDate);
};

const getDurationFormat = (date1, date2) => {
  const duration = getDuration(date1, date2);

  // let seconds = parseInt((duration / 1000) % 60, 10);
  let minutes = parseInt((duration / (1000 * 60)) % 60, 10);
  let hours = parseInt((duration / (1000 * 60 * 60)) % 24, 10);
  const days = parseInt(duration / (1000 * 60 * 60 * 24), 10);

  hours = (hours < 10) ? `0${hours}` : hours;
  minutes = (minutes < 10) ? `0${minutes}` : minutes;
  // seconds = (seconds < 10) ? `0${seconds}` : seconds;

  return `${days > 0 ? `${days}D ` : ''}${hours}H ${minutes}M`;
};

const getFirstCapitalLetter = (word) => word ? word.replace(/(?:^.)/g, (a) => a.toUpperCase()) : '';

const isEventFuture = (date) => dayjs().isBefore(date, 'day');
const isEventPast = (date) => dayjs().isAfter(date, 'day');

const sortByDay = (eventA, eventB) => dayjs(eventA.dateFrom).diff(dayjs(eventB.dateFrom));
const sortByTime = (eventA, eventB) => getDuration(eventB.dateFrom, eventB.dateTo) - getDuration(eventA.dateFrom, eventA.dateTo);
const sortByPrice = (eventA, eventB) => getTotalEventPrice(eventB) - getTotalEventPrice(eventA);

export {
  getTotalEventPrice,
  formatDate,
  getDurationFormat,
  getFirstCapitalLetter,
  isEventFuture,
  isEventPast,
  sortByDay,
  sortByTime,
  sortByPrice,
};
