import dayjs from 'dayjs';

const formatDate = (date, format) => date ? dayjs(date).format(format) : '';

const dateDiff = (date1, date2) => {
  const startDate = new Date(date1);
  const endDate = new Date(date2);
  const duration = Math.abs(endDate - startDate);

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

export {
  formatDate,
  dateDiff,
  getFirstCapitalLetter,
  isEventFuture,
  isEventPast,
};
