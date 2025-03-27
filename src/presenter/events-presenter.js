import EventsView from '../view/events-view.js';
import { render } from '../framework/render.js';
import EventPresenter from './event-presenter.js';
import NoEventView from '../view/no-event-view.js';
import SortView from '../view/sort-view.js';

export default class EventsPresenter {
  #eventsContainer = null;
  #eventsModel = null;
  #events = null;
  #eventPresenters = new Map();

  #sortComponent = new SortView();
  #eventsComponent = new EventsView();
  #noEventComponent = new NoEventView();

  constructor({ eventsContainer, eventsModel }) {
    this.#eventsContainer = eventsContainer;
    this.#eventsModel = eventsModel;
  }

  init() {
    this.#events = [...this.#eventsModel.events];

    this.#renderEventsContainder();
  }

  #renderSort = () => {
    render(this.#sortComponent, this.#eventsComponent.element);
  };

  #clearEvents = () => {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
  };

  #renderEvent = (event) => {
    const eventPresenter = new EventPresenter(this.#eventsComponent.element);
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
