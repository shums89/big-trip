import { createElement } from '../render.js';

const createEventsTemplate = () => '<ul class="trip-events__list"></ul>';

export default class EventsView {
  #element = null;

  get template() {
    return createEventsTemplate();
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
