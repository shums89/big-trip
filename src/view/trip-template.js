import { formatDate } from '../utils/event.js';

const compare = (a, b) => {
  const dateA = new Date(a.dateFrom);
  const dateB = new Date(b.dateFrom);

  return dateA - dateB;
};

export const createTripTemplate = (events = []) => {
  const totalPrice = events.slice().reduce((acc, cur) => acc + cur.basePrice, 0);

  const sortEvents = events.slice().sort(compare);

  const period = (formatDate(sortEvents[0].dateFrom, 'MM.YYYY') === formatDate(sortEvents.at(-1).dateTo, 'MM.YYYY'))
    ? `${formatDate(sortEvents[0].dateFrom, 'MMM DD')}&nbsp;—&nbsp;${formatDate(sortEvents.at(-1).dateTo, 'DD')}`
    : `${formatDate(sortEvents[0].dateFrom, 'MMM DD')}&nbsp;—&nbsp;${formatDate(sortEvents.at(-1).dateTo, 'MMM DD')}`;

  let cities = sortEvents
    .slice()
    .reduce((acc, cur) => {
      if (acc.at(-1) !== cur.destination.name) {
        return [...acc, cur.destination.name];
      } else {
        return acc;
      }
    }, []);

  cities = (cities.length > 3)
    ? `${cities[0]} — ... — ${sortEvents.at(-1).destination.name}`
    : [...cities].join(' — ');

  return `
    <section class="trip-main__trip-info trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${cities}</h1>
        <p class="trip-info__dates">${period}</p>
      </div>
      <p class="trip-info__cost">
        Total: €&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
      </p>
    </section>
  `;
};
