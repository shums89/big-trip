import { createElement } from '../render.js';
import { createTripTemplate } from './trip-template.js';

export default class TripView {
  #element = null;
  #events = null;

  constructor({ events }) {
    this.#events = events;
  }

  get template() {
    return createTripTemplate(this.#events);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
