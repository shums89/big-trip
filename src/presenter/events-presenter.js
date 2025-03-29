import EventsView from '../view/events-view.js';
import { render } from '../framework/render.js';
import EventPresenter from './event-presenter.js';
import NoEventView from '../view/no-event-view.js';
import SortView from '../view/sort-view.js';
import { updateItem } from '../utils/common.js';
import { SortType } from '../const.js';
import { sortByDay, sortByPrice, sortByTime } from '../utils/event.js';

export default class EventsPresenter {
  #eventsContainer = null;
  #eventsModel = null;

  #sortComponent = null;
  #eventsComponent = new EventsView();
  #noEventComponent = new NoEventView();

  #events = null;
  #eventPresenters = new Map();
  #currentSortType = SortType.DAY;
  #sourcedEvents = [];

  constructor({ eventsContainer, eventsModel }) {
    this.#eventsContainer = eventsContainer;
    this.#eventsModel = eventsModel;
  }

  init() {
    this.#events = [...this.#eventsModel.events];
    this.#sourcedEvents = [...this.#eventsModel.events];

    this.#renderEventsContainder();
  }

  #handleModeChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleEventChange = (updatedEvent) => {
    this.#events = updateItem(this.#events, updatedEvent);
    this.#sourcedEvents = updateItem(this.#sourcedEvents, updatedEvent);
    this.#eventPresenters.get(updatedEvent.id).init(updatedEvent);
  };

  #sortEvents(sortType) {
    switch (sortType) {
      case SortType.TIME:
        this.#events.sort(sortByTime);
        break;
      case SortType.PRICE:
        this.#events.sort(sortByPrice);
        break;
      default:
        this.#events.sort(sortByDay);
      // this.#events = [...this.#sourcedEvents];
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#sortEvents(sortType);
    this.#clearEvents();
    this.#renderEvents();
  };

  #renderSort = () => {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortComponent, this.#eventsComponent.element);
  };

  #clearEvents = () => {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
  };

  #renderEvent = (event) => {
    const eventPresenter = new EventPresenter({
      eventsContainer: this.#eventsComponent.element,
      onDataChange: this.#handleEventChange,
      onModeChange: this.#handleModeChange,
    });
    eventPresenter.init(event);
    this.#eventPresenters.set(event.id, eventPresenter);
  };

  #renderNoEvents = () => {
    render(this.#noEventComponent, this.#eventsComponent.element);
  };

  #renderEvents = () => {
    for (let i = 0; i < this.#events.length; i++) {
      this.#renderEvent(this.#events[i]);
    }
  };

  #renderEventsContainder = () => {
    render(this.#eventsComponent, this.#eventsContainer);

    if (this.#eventsModel.events.length === 0) {
      this.#renderNoEvents();
      return null;
    }

    this.#renderSort();
    this.#renderEvents();
  };
}
