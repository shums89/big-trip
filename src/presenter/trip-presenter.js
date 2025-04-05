import { remove, render, RenderPosition, replace } from '../framework/render.js';
import TripView from '../view/trip-view.js';

export default class TripPresenter {
  #tripContainer = null;
  #tripComponent = null;
  #eventsModel = null;
  #events = null;

  constructor({ tripContainer, eventsModel }) {
    this.#tripContainer = tripContainer;
    this.#eventsModel = eventsModel;

    this.#eventsModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#events = [...this.#eventsModel.events];

    this.#rerenderTrip();
  }

  #handleModelEvent = () => {
    this.init();
  };

  #rerenderTrip = () => {
    const prevTripComponent = this.#tripComponent;

    if (this.#events.length === 0 && prevTripComponent === null) {
      return;
    }

    if (this.#events.length === 0) {
      remove(prevTripComponent);
      return;
    }

    this.#tripComponent = new TripView({ events: this.#events });

    if (prevTripComponent === null) {
      render(this.#tripComponent, this.#tripContainer, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this.#tripComponent, prevTripComponent);
    remove(prevTripComponent);

  };
}
