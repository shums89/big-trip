import AbstractView from '../framework/view/abstract-view.js';
import { createTripTemplate } from './trip-template.js';

export default class TripView extends AbstractView {
  #events = null;

  constructor({ events }) {
    super();
    this.#events = events;
  }

  get template() {
    return createTripTemplate(this.#events);
  }
}
