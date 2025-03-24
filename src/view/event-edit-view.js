import { createElement } from '../render.js';
import { createEventEditTemplate } from './event-edit-template.js';

export default class EventEditView {
  #element = null;
  #event = null;

  constructor({ event }) {
    this.#event = event;
  }

  get template() {
    return createEventEditTemplate(this.#event);
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
