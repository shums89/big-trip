import { render, RenderPosition } from '../framework/render.js';
import TripView from '../view/trip-view.js';

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
