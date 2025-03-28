import { EVENT_TYPES } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';
import { createEventEditTemplate } from './event-edit-template.js';

const BLANK_EVENT = {
  basePrice: '',
  dateFrom: new Date(),
  dateTo: new Date(),
  destination: {},
  offers: null,
  type: EVENT_TYPES[0],
};

export default class EventEditView extends AbstractView {
  #event = null;
  #handleFormSubmit = null;
  #handleRollupClick = null;
  #handleResetClick = null;

  constructor({ event = BLANK_EVENT, onFormSubmit, onRollupClick, onResetClick }) {
    super();
    this.#event = event;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleRollupClick = onRollupClick;
    this.#handleResetClick = onResetClick;

    this.element.addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#clickRollupHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#resetClickHandler);
  }

  get template() {
    return createEventEditTemplate(this.#event);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(this.#event);
  };

  #clickRollupHandler = (evt) => {
    evt.preventDefault();
    this.#handleRollupClick();
  };

  #resetClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleResetClick(this.#event);
  };
}
