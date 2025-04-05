import { UpdateType, UserAction } from '../const.js';
import { remove, render, replace } from '../framework/render.js';
import { checkEquality } from '../utils/event.js';
import EventEditView from '../view/event-edit-view.js';
import EventView from '../view/event-view.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class EventPresenter {
  #eventsContainer = null;
  #event = null;
  #handleDataChange = null;
  #handleModeChange = null;

  #eventComponent = null;
  #eventEditComponent = null;
  #mode = Mode.DEFAULT;

  constructor({ eventsContainer, onDataChange, onModeChange }) {
    this.#eventsContainer = eventsContainer;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(event) {
    this.#event = event;

    const prevEventComponent = this.#eventComponent;
    const prevEventEditComponent = this.#eventEditComponent;

    this.#eventComponent = new EventView({
      event: this.#event,
      onEditClick: this.#handleEditClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#eventEditComponent = new EventEditView({
      event: this.#event,
      onFormSubmit: this.#handleFormSubmit,
      onRollupClick: this.#handleRollupClick,
      onDeleteClick: this.#handleDeleteClick,
    });

    if (prevEventComponent === null || prevEventEditComponent === null) {
      render(this.#eventComponent, this.#eventsContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#eventComponent, prevEventComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#eventEditComponent, prevEventEditComponent);
      this.#mode = Mode.DEFAULT;
    }

    remove(prevEventComponent);
    remove(prevEventEditComponent);
  }

  destroy = () => {
    remove(this.#eventComponent);
    remove(this.#eventEditComponent);
  };

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#eventEditComponent.reset(this.#event);
      this.#replaceFormToCard();
    }
  }

  #replaceCardToForm = () => {
    replace(this.#eventEditComponent, this.#eventComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  };

  #replaceFormToCard = () => {
    replace(this.#eventComponent, this.#eventEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#eventEditComponent.reset(this.#event);
      this.#replaceFormToCard();
    }
  };

  #handleEditClick = () => {
    this.#replaceCardToForm();
  };

  #handleFormSubmit = (update) => {
    const isPatchUpdate =
      checkEquality(this.#event.offers, update.offers) ||
      this.#event.type !== update.type ||
      this.#event.basePrice !== update.basePrice;

    this.#handleDataChange(
      UserAction.UPDATE_EVENT,
      isPatchUpdate ? UpdateType.PATCH : UpdateType.MINOR,
      update,
    );
    this.#replaceFormToCard();
  };

  #handleRollupClick = () => {
    this.#eventEditComponent.reset(this.#event);
    this.#replaceFormToCard();
  };

  #handleDeleteClick = (event) => {
    this.#handleDataChange(
      UserAction.DELETE_EVENT,
      UpdateType.MINOR,
      event,
    );
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange(
      UserAction.UPDATE_EVENT,
      UpdateType.MINOR,
      { ...this.#event, isFavorite: !this.#event.isFavorite },
    );
  };
}
