import { EVENT_TYPES } from '../const.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { generateDestination } from '../mock/event.js';
import { createEventEditTemplate } from './event-edit-template.js';

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
