import EventEditView from '../view/event-edit-view.js';
import EventListView from '../view/event-list-view.js';
import EventView from '../view/event-view.js';

import { render } from '../render.js';

export default class EventListPresenter {
  eventListComponent = new EventListView();

  constructor({ eventListContainer }) {
    this.eventListContainer = eventListContainer;
  }

  init() {
    render(this.eventListComponent, this.eventListContainer);
    render(new EventEditView(), this.eventListComponent.getElement());

    for (let i = 0; i < 5; i++) {
      render(new EventView(), this.eventListComponent.getElement());
    }
  }
}
