import { createElement } from '../render.js';

const createEventEditTemplate = () =>
  `
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header"></header>
        <section class="event__details"></section>
      </form>
    </li>
  `;

export default class EventEditView {
  getTemplate() {
    return createEventEditTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
