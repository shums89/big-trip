import { createElement } from '../render.js';

const createTripTemplate = () =>
  `
    <section class="trip-main__trip-info trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">Amsterdam — Chamonix — Geneva</h1>
        <p class="trip-info__dates">Mar 18&nbsp;—&nbsp;20</p>
      </div>
      <p class="trip-info__cost">
        Total: €&nbsp;<span class="trip-info__cost-value">1230</span>
      </p>
    </section>
  `;

export default class TripView {
  getTemplate() {
    return createTripTemplate();
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
