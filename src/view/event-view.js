import { createElement } from '../render.js';
import { createEventTemplate } from './event-template.js';

export default class EventView {
  #element = null;
  #event = null;

  constructor({ event }) {
    this.#event = event;
  }

  get template() {
    return createEventTemplate(this.#event);
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
