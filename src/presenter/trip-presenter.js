import { render, RenderPosition } from '../framework/render.js';
import TripView from '../view/trip-view.js';

export default class TripPresenter {
  #tripContainer = null;
  #tripComponent = null;
  #eventsModel = null;
  #events = null;

  constructor({ tripContainer, eventsModel }) {
    this.#tripContainer = tripContainer;
    this.#eventsModel = eventsModel;
  }

  init() {
    this.#events = [...this.#eventsModel.events];

    this.#tripComponent = new TripView({ events: this.#events });

    this.#renderTrip(this.#events);
  }

  #renderTrip = () => {
    if (this.#eventsModel.events.length !== 0) {
      render(this.#tripComponent, this.#tripContainer, RenderPosition.AFTERBEGIN);
    }
  };
}
