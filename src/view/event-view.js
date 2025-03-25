import AbstractView from '../framework/view/abstract-view.js';
import { createEventTemplate } from './event-template.js';

export default class EventView extends AbstractView {
  #event = null;

  constructor({ event }) {
    super();
    this.#event = event;
  }

  get template() {
    return createEventTemplate(this.#event);
  }
}
