import AbstractView from '../framework/view/abstract-view.js';
import { createSortTemplate } from './sort-template.js';

export default class SortView extends AbstractView {
  #currentSortType = null;
  #handleSortTypeChange = null;

  constructor({ currentSortType, onSortTypeChange }) {
    super();
    this.#currentSortType = currentSortType;
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('change', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate(this.#currentSortType);
  }

  #sortTypeChangeHandler = (evt) => {
    if (!evt.target.classList.contains('trip-sort__input')) {
      return;
    }

    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
