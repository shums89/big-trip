import { render } from './framework/render.js';
import EventsModel from './model/events-model.js';
import FilterModel from './model/filter-model.js';
import EventsPresenter from './presenter/events-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import TripPresenter from './presenter/trip-presenter.js';
import NewEventButtonView from './view/new-event-button-view.js';

const siteHeaderElement = document.querySelector('.page-header');
const siteTripContainer = siteHeaderElement.querySelector('.trip-main');
const siteFiltersContainer = siteHeaderElement.querySelector('.trip-controls__filters');
const siteEventsContainer = document.querySelector('.trip-events');

const eventsModel = new EventsModel();
const filterModel = new FilterModel();

const tripPresenter = new TripPresenter({
  tripContainer: siteTripContainer,
  eventsModel,
});

const filterPresenter = new FilterPresenter({
  filterContainer: siteFiltersContainer,
  filterModel,
  eventsModel,
});

const eventsPresenter = new EventsPresenter({
  eventsContainer: siteEventsContainer,
  eventsModel,
  filterModel,
  onNewEventDestroy: handleNewEventFormClose,
});

const newEventButtonComponent = new NewEventButtonView({
  onClick: handleNewEventButtonClick,
});

function handleNewEventFormClose() {
  newEventButtonComponent.element.disabled = false;
}

function handleNewEventButtonClick() {
  eventsPresenter.createEvent();
  newEventButtonComponent.element.disabled = true;
}

render(newEventButtonComponent, siteTripContainer);

tripPresenter.init();
filterPresenter.init();
eventsPresenter.init();
