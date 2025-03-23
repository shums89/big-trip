import { createElement } from '../render.js';
import { createEventEditTemplate } from './event-edit-template.js';

export default class EventEditView {
  constructor({ event }) {
    this.event = event;
  }

  getTemplate() {
    return createEventEditTemplate(this.event);
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
