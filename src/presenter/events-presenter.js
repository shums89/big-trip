import EventEditView from '../view/event-edit-view.js';
import EventsView from '../view/events-view.js';
import EventView from '../view/event-view.js';

import { render } from '../render.js';

export default class EventsPresenter {
  eventsComponent = new EventsView();

  constructor({ eventsContainer, eventsModel }) {
    this.eventsContainer = eventsContainer;
    this.eventsModel = eventsModel;
  }

  init() {
    this.events = [...this.eventsModel.getEvents()];

    render(this.eventsComponent, this.eventsContainer);
    render(new EventEditView(), this.eventsComponent.getElement());

    for (let i = 0; i < this.events.length; i++) {
      render(new EventView({ event: this.events[i] }), this.eventsComponent.getElement());
    }
  }
}
