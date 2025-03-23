import EventEditView from '../view/event-edit-view.js';
import EventListView from '../view/event-list-view.js';
import EventView from '../view/event-view.js';

import { render } from '../render.js';

export default class EventListPresenter {
  eventListComponent = new EventListView();

  constructor({ eventListContainer, eventsModel }) {
    this.eventListContainer = eventListContainer;
    this.eventsModel = eventsModel;
  }

  init() {
    this.eventList = [...this.eventsModel.getEvents()];

    render(this.eventListComponent, this.eventListContainer);
    render(new EventEditView(), this.eventListComponent.getElement());

    for (let i = 0; i < this.eventList.length; i++) {
      render(new EventView({ event: this.eventList[i] }), this.eventListComponent.getElement());
    }
  }
}
