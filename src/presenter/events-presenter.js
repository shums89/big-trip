import EventsView from '../view/events-view.js';
import { render } from '../framework/render.js';
import EventPresenter from './event-presenter.js';

export default class EventsPresenter {
  #eventsContainer = null;
  #eventsModel = null;
  #events = null;
  #eventPresenters = new Map();

  #eventsComponent = new EventsView();


  constructor({ eventsContainer, eventsModel }) {
    this.#eventsContainer = eventsContainer;
    this.#eventsModel = eventsModel;
  }

  init() {
    this.#events = [...this.#eventsModel.events];

    this.#renderEvents();
  }

  #clearEvents() {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
  }

  #renderEvent = (event) => {
    const eventPresenter = new EventPresenter(this.#eventsComponent.element);
    eventPresenter.init(event);
    this.#eventPresenters.set(event.id, eventPresenter);
  };

  #renderEvents = () => {
    render(this.#eventsComponent, this.#eventsContainer);

    for (let i = 0; i < this.#events.length; i++) {
      this.#renderEvent(this.#events[i]);
    }
  };
}
