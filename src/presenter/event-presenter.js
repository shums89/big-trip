import { render, replace } from '../framework/render.js';
import EventEditView from '../view/event-edit-view.js';
import EventView from '../view/event-view.js';

export default class EventPresenter {
  #event = null;
  #eventsContainer = null;
  #eventComponent = null;
  #eventEditComponent = null;

  constructor(eventsContainer) {
    this.#eventsContainer = eventsContainer;
  }

  init(event) {
    this.#event = event;

    this.#eventComponent = new EventView({ event: this.#event });
    this.#eventEditComponent = new EventEditView({ event: this.#event });

    this.#eventComponent.setClickHandler(this.#handleClick);
    this.#eventEditComponent.setSubmitHandler(this.#handleFormSubmit);
    this.#eventEditComponent.setClickHandler(this.#handleEditClick);
    this.#eventEditComponent.setResetClickHandler(this.#handleEditResetClick);

    render(this.#eventComponent, this.#eventsContainer);
  }

  #replaceCardToForm = () => {
    replace(this.#eventEditComponent, this.#eventComponent);
  };

  #replaceFormToCard = () => {
    replace(this.#eventComponent, this.#eventEditComponent);
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToCard();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  #handleClick = () => {
    this.#replaceCardToForm();
    document.addEventListener('keydown', this.#onEscKeyDown);
  };

  #handleFormSubmit = () => {
    this.#replaceFormToCard();
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #handleEditClick = () => {
    this.#eventEditComponent.reset();
    this.#replaceFormToCard();
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #handleEditResetClick = () => {
    this.#eventEditComponent.reset();
    this.#replaceFormToCard();
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };
}
