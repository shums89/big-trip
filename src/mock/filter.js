import { filter } from '../utils/filter.js';

export const generateFilter = (events) => Object.entries(filter).map(
  ([filterName, filterEvents]) => ({
    type: filterName,
    count: filterEvents(events).length,
  }),
);
