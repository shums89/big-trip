import EventEditView from '../view/event-edit-view.js';
import EventsView from '../view/events-view.js';
import EventView from '../view/event-view.js';

import { render } from '../render.js';

export default class EventsPresenter {
  #eventsContainer = null;
  #eventsModel = null;

  #eventsComponent = new EventsView();

  constructor({ eventsContainer, eventsModel }) {
    this.#eventsContainer = eventsContainer;
    this.#eventsModel = eventsModel;
  }

  init() {
    this.events = [...this.#eventsModel.events];

    render(this.#eventsComponent, this.#eventsContainer);
    render(new EventEditView({ event: this.events[0] }), this.#eventsComponent.element);

    for (let i = 1; i < this.events.length; i++) {
      render(new EventView({ event: this.events[i] }), this.#eventsComponent.element);
    }
  }
}
