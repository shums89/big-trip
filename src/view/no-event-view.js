import { FilterType } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

const NoEventsTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no event future',
  [FilterType.PAST]: 'There are no event past',
};

const createNoEventTemplate = (filterType) => {
  const noEventTextValue = NoEventsTextType[filterType];

  return (
    `<p class="trip-events__msg">
      ${noEventTextValue}
    </p>`
  );
};

export default class NoEventView extends AbstractView {
  #filterType = null;

  constructor({ filterType }) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoEventTemplate(this.#filterType);
  }
}
