import EventsView from '../view/events-view.js';
import { remove, render } from '../framework/render.js';
import EventPresenter from './event-presenter.js';
import NoEventView from '../view/no-event-view.js';
import SortView from '../view/sort-view.js';
import { SortType, UpdateType, UserAction } from '../const.js';
import { sortByDay, sortByPrice, sortByTime } from '../utils/event.js';

export default class EventsPresenter {
  #eventsContainer = null;
  #eventsModel = null;

  #sortComponent = null;
  #eventsComponent = new EventsView();
  #noEventComponent = new NoEventView();

  #eventPresenters = new Map();
  #currentSortType = SortType.DAY;

  constructor({ eventsContainer, eventsModel }) {
    this.#eventsContainer = eventsContainer;
    this.#eventsModel = eventsModel;

    this.#eventsModel.addObserver(this.#handleModelEvent);
  }

  get events() {
    switch (this.#currentSortType) {
      case SortType.DAY:
        return [...this.#eventsModel.events].sort(sortByDay);
      case SortType.TIME:
        return [...this.#eventsModel.events].sort(sortByTime);
      case SortType.PRICE:
        return [...this.#eventsModel.events].sort(sortByPrice);
    }

    return this.#eventsModel.events;
  }

  init() {
    this.#renderEvents();
  }

  #handleModeChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    console.log(actionType, updateType, update);

    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this.#eventsModel.updateEvent(updateType, update);
        break;
      case UserAction.ADD_EVENT:
        this.#eventsModel.addEvent(updateType, update);
        break;
      case UserAction.DELETE_EVENT:
        this.#eventsModel.deleteEvent(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    console.log(updateType, data);

    // В зависимости от типа изменений решаем, что делать:
    switch (updateType) {
      case UpdateType.PATCH:
        this.#eventPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearEvents();
        this.#renderEvents();
        break;
      case UpdateType.MAJOR:
        this.#clearEvents({ resetSortType: true });
        this.#renderEvents();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearEvents();
    this.#renderEvents();
  };

  #renderSort = () => {
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortComponent, this.#eventsComponent.element);
  };

  #renderEvent = (event) => {
    const eventPresenter = new EventPresenter({
      eventsContainer: this.#eventsComponent.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });
    eventPresenter.init(event);
    this.#eventPresenters.set(event.id, eventPresenter);
  };

  #renderNoEvents = () => {
    render(this.#noEventComponent, this.#eventsComponent.element);
  };

  #clearEvents = ({ resetSortType = false } = {}) => {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();

    remove(this.#sortComponent);
    remove(this.#noEventComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  };

  #renderEvents = () => {
    render(this.#eventsComponent, this.#eventsContainer);

    if (this.events.length === 0) {
      this.#renderNoEvents();
      return null;
    }

    this.#renderSort();
    this.events.forEach((event) => this.#renderEvent(event));
  };
}
