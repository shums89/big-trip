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

  constructor({ event = BLANK_EVENT }) {
    super();
    this.#event = event;
  }

  get template() {
    return createEventEditTemplate(this.#event);
  }

  setSubmitHandler = (callback) => {
    this._callback.submit = callback;
    this.element.addEventListener('submit', this.#submitHandler);
  };

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#clickHandler);
  };

  setResetClickHandler = (callback) => {
    this._callback.resetClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#resetClickHandler);
  };

  #submitHandler = (evt) => {
    evt.preventDefault();
    this._callback.submit();
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };

  #resetClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.resetClick();
  };
}
