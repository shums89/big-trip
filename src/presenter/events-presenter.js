import EventEditView from '../view/event-edit-view.js';
import EventsView from '../view/events-view.js';
import EventView from '../view/event-view.js';
import { render } from '../framework/render.js';

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
    const eventComponent = new EventView({ event });
    const eventEditComponent = new EventEditView({ event });

    const replaceCardToForm = () => {
      this.#eventsComponent.element.replaceChild(eventEditComponent.element, eventComponent.element);
    };

    const replaceFormToCard = () => {
      this.#eventsComponent.element.replaceChild(eventComponent.element, eventEditComponent.element);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    eventComponent.setClickHandler(() => {
      replaceCardToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    eventEditComponent.setSubmitHandler(() => {
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    eventEditComponent.setClickHandler(() => {
      eventEditComponent.element.reset();
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    eventEditComponent.setResetClickHandler(() => {
      eventEditComponent.element.reset();
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(eventComponent, this.#eventsComponent.element);
  };
}
