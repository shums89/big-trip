import TripView from '../view/trip-view.js';

import { render, RenderPosition } from '../render.js';

export default class TripPresenter {
  #tripContainer = null;

  #tripComponent = new TripView();

  constructor({ tripContainer }) {
    this.#tripContainer = tripContainer;
  }

  init() {
    render(this.#tripComponent, this.#tripContainer, RenderPosition.AFTERBEGIN);
  }
}
