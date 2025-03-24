import TripView from '../view/trip-view.js';

import { render, RenderPosition } from '../render.js';

export default class TripPresenter {
  #tripContainer = null;
  #eventsModel = null;
  #events = null;

  constructor({ tripContainer, eventsModel }) {
    this.#tripContainer = tripContainer;
    this.#eventsModel = eventsModel;
  }

  init() {
    this.#events = [...this.#eventsModel.events];

    render(new TripView({ events: this.#events }), this.#tripContainer, RenderPosition.AFTERBEGIN);
  }
}
