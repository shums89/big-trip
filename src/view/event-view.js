import AbstractView from '../framework/view/abstract-view.js';
import { createEventTemplate } from './event-template.js';

export default class EventView extends AbstractView {
  #event = null;
  #handleEditClick = null;
  #handleFavoriteClick = null;

  constructor({ event, onEditClick, onFavoriteClick }) {
    super();
    this.#event = event;
    this.#handleEditClick = onEditClick;
    this.#handleFavoriteClick = onFavoriteClick;

    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#clickHandler);
  }

  get template() {
    return createEventTemplate(this.#event);
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick();
  };
}
