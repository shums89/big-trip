import EventsView from '../view/events-view.js';
import { render } from '../framework/render.js';
import EventPresenter from './event-presenter.js';

export default class EventsPresenter {
  #eventsContainer = null;
  #eventsModel = null;
  #events = null;

  #eventsComponent = new EventsView();

  constructor({ eventsContainer, eventsModel }) {
    this.#eventsContainer = eventsContainer;
    this.#eventsModel = eventsModel;
  }

  init() {
    this.#events = [...this.#eventsModel.events];

    render(this.#eventsComponent, this.#eventsContainer);

    for (let i = 0; i < this.#events.length; i++) {
      this.#renderEvent(this.#events[i]);
    }
  }

  #renderEvent = (event) => {
    const eventPresenter = new EventPresenter(this.#eventsComponent.element);
    eventPresenter.init(event);
  };
}
