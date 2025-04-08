import EventsView from '../view/events-view.js';
import { remove, render, RenderPosition } from '../framework/render.js';
import EventPresenter from './event-presenter.js';
import NoEventView from '../view/no-event-view.js';
import SortView from '../view/sort-view.js';
import { FilterType, SortType, UpdateType, UserAction } from '../const.js';
import { sortByDay, sortByPrice, sortByTime } from '../utils/event.js';
import { filter } from '../utils/filter.js';
import NewEventPresenter from './new-event-presenter.js';
import LoadingView from '../view/loading-view.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class EventsPresenter {
  #eventsContainer = null;
  #eventsModel = null;
  #catalogModel = null;
  #filterModel = null;

  #sortComponent = null;
  #newEventButtonComponent = null;
  #eventsComponent = new EventsView();
  #noEventComponent = null;
  #loadingComponent = new LoadingView();

  #eventPresenters = new Map();
  #newEventPresenter = null;
  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;
  #isLoading = true;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  constructor({ eventsContainer, eventsModel, catalogModel, filterModel, newEventButtonComponent, onNewEventDestroy }) {
    this.#eventsContainer = eventsContainer;
    this.#eventsModel = eventsModel;
    this.#catalogModel = catalogModel;
    this.#filterModel = filterModel;
    this.#newEventButtonComponent = newEventButtonComponent;

    this.#newEventPresenter = new NewEventPresenter({
      eventListContainer: this.#eventsComponent.element,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewEventDestroy,
    });

    this.#eventsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get events() {
    this.#filterType = this.#filterModel.filter;
    const events = this.#eventsModel.events;
    const filteredEvents = filter[this.#filterType](events);

    switch (this.#currentSortType) {
      case SortType.DAY:
        return filteredEvents.sort(sortByDay);
      case SortType.TIME:
        return filteredEvents.sort(sortByTime);
      case SortType.PRICE:
        return filteredEvents.sort(sortByPrice);
    }

    return filteredEvents;
  }

  get Catalog() {
    return this.#catalogModel.Catalog;
  }

  init() {
    this.#renderEvents();
  }

  createEvent() {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newEventPresenter.init(this.Catalog);
  }

  #handleModeChange = () => {
    this.#newEventPresenter.destroy();
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this.#eventPresenters.get(update.id).setSaving();
        try {
          await this.#eventsModel.updateEvent(updateType, update);
        } catch (err) {
          this.#eventPresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_EVENT:
        this.#newEventPresenter.setSaving();
        try {
          await this.#eventsModel.addEvent(updateType, update);
        } catch (err) {
          this.#newEventPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_EVENT:
        this.#eventPresenters.get(update.id).setDeleting();
        try {
          await this.#eventsModel.deleteEvent(updateType, update);
        } catch (err) {
          this.#eventPresenters.get(update.id).setAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    // В зависимости от типа изменений решаем, что делать:
    switch (updateType) {
      case UpdateType.PATCH:
        this.#eventPresenters.get(data.id).init(data, this.Catalog);
        break;
      case UpdateType.MINOR:
        this.#clearEvents();
        this.#renderEvents();
        break;
      case UpdateType.MAJOR:
        this.#clearEvents({ resetSortType: true });
        this.#renderEvents();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
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

    eventPresenter.init(event, this.Catalog);

    this.#eventPresenters.set(event.id, eventPresenter);
  };

  #renderLoading() {
    render(this.#loadingComponent, this.#eventsContainer, RenderPosition.AFTERBEGIN);
  }

  #renderNoEvents = () => {
    this.#noEventComponent = new NoEventView({
      filterType: this.#filterType,
    });

    render(this.#noEventComponent, this.#eventsComponent.element);
  };

  #clearEvents = ({ resetSortType = false } = {}) => {
    this.#newEventPresenter.destroy();
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();

    remove(this.#sortComponent);
    remove(this.#loadingComponent);

    if (this.#noEventComponent) {
      remove(this.#noEventComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  };

  #renderEvents = () => {
    render(this.#eventsComponent, this.#eventsContainer);

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    this.#newEventButtonComponent.element.disabled = false;

    if (this.events.length === 0) {
      this.#renderNoEvents();
      return null;
    }

    this.#renderSort();
    this.events.forEach((event) => this.#renderEvent(event));
  };
}
