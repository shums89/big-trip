import { EVENT_TYPES } from '../const.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { generateDestination } from '../mock/event.js';
import { createEventEditTemplate } from './event-edit-template.js';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

const BLANK_EVENT = {
  basePrice: '',
  dateFrom: new Date(),
  dateTo: new Date(),
  destination: {},
  offers: null,
  type: EVENT_TYPES[0],
};

export default class EventEditView extends AbstractStatefulView {
  #handleFormSubmit = null;
  #handleRollupClick = null;
  #handleResetClick = null;
  #datepicker = null;

  constructor({ event = BLANK_EVENT, onFormSubmit, onRollupClick, onResetClick }) {
    super();
    this._setState(EventEditView.convertEventToState(event));
    this.#handleFormSubmit = onFormSubmit;
    this.#handleRollupClick = onRollupClick;
    this.#handleResetClick = onResetClick;

    this._restoreHandlers();
  }

  get template() {
    return createEventEditTemplate(this._state);
  }

  // Перегружаем метод родителя removeElement,
  // чтобы при удалении удалялся более не нужный календарь
  removeElement() {
    super.removeElement();

    if (this.#datepicker) {
      this.#datepicker.destroy();
      this.#datepicker = null;
    }
  }

  reset(event) {
    this.updateElement(
      EventEditView.convertEventToState(event),
    );
  }

  _restoreHandlers = () => {
    this.element.addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#rollupClickHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#resetClickHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__available-offers')?.addEventListener('change', this.#offersChangeHandler);
    this.element.querySelector('.event__field-group--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceChangeHandler);

    this.#setDatepicker();
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EventEditView.convertStateToEvent(this._state));
  };

  #rollupClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleRollupClick();
  };

  #resetClickHandler = (event) => {
    this.updateElement(
      EventEditView.convertEventToState(event),
    );
    this.#handleResetClick();
  };

  #typeChangeHandler = ({ target }) => {
    this.updateElement({
      type: target.value,
      offers: [],
    });
  };

  #offersChangeHandler = (evt) => {
    evt.preventDefault();

    const offers = [];
    const offerElements = this.element.querySelectorAll('.event__offer-checkbox');

    offerElements.forEach((el) => {
      if (el.checked) {
        offers.push(+el.dataset.eventOfferId);
      }
    });

    this._setState({
      offers,
    });
  };

  #destinationChangeHandler = ({ target }) => {
    let destination = {};

    if (target.value && target.value !== destination.name) {
      destination = generateDestination(target.value);

      this.updateElement({
        destination,
      });
    }
  };

  #priceChangeHandler = ({ target }) => {
    this._setState({
      basePrice: +target.value,
    });
  };

  #dateFromChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate,
    });
  };

  #dateToChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate,
    });
  };

  #setDatepicker() {
    const optional = {
      dateFormat: 'd/m/y H:i',
      enableTime: true,
      time_24hr: true,
      minuteIncrement: 1,
    };

    const dateFromElement = this.element.querySelector('input[id="event-start-time-1"]');
    const dateToElement = this.element.querySelector('input[id="event-end-time-1"]');

    this.#datepicker = flatpickr(
      dateFromElement,
      {
        ...optional,
        defaultDate: new Date(this._state.dateFrom),
        defaultHour: new Date(this._state.dateFrom).getHours(),
        defaultMinute: new Date(this._state.dateFrom).getMinutes(),
        onClose: this.#dateFromChangeHandler,
      },
    );
    this.#datepicker = flatpickr(
      dateToElement,
      {
        ...optional,
        defaultDate: new Date(this._state.dateTo),
        defaultHour: new Date(this._state.dateTo).getHours(),
        defaultMinute: new Date(this._state.dateTo).getMinutes(),
        onClose: this.#dateToChangeHandler,
      },
    );
  }

  static convertEventToState(event) {
    return {
      ...event,
    };
  }

  static convertStateToEvent(state) {
    const event = { ...state };

    return event;
  }
}
