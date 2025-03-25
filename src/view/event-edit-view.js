import { EVENT_TYPES } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';
import { createEventEditTemplate } from './event-edit-template.js';

const BLANK_EVENT = {
  basePrice: '',
  dateFrom: new Date(),
  dateTo: new Date(),
  destination: {},
  offers: null,
  type: EVENT_TYPES[0],
};

export default class EventEditView extends AbstractView {
  #event = null;

  constructor({ event = BLANK_EVENT }) {
    super();
    this.#event = event;
  }

  get template() {
    return createEventEditTemplate(this.#event);
  }
}
