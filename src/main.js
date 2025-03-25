import { render } from './framework/render.js';
import EventsModel from './model/events-model.js';
import EventsPresenter from './presenter/events-presenter.js';
import TripPresenter from './presenter/trip-presenter.js';
import FilterView from './view/filter-view.js';
import NoEventView from './view/no-event-view.js';
import SortView from './view/sort-view.js';

const siteHeaderElement = document.querySelector('.page-header');
const siteTripContainer = siteHeaderElement.querySelector('.trip-main');
const siteFiltersContainer = siteHeaderElement.querySelector('.trip-controls__filters');
const siteEventsContainer = document.querySelector('.trip-events');

const eventsModel = new EventsModel();

if (eventsModel.events.length === 0) {
  render(new NoEventView(), siteEventsContainer);
} else {
  const tripPresenter = new TripPresenter({
    tripContainer: siteTripContainer,
    eventsModel,
  });

  const eventsPresenter = new EventsPresenter({
    eventsContainer: siteEventsContainer,
    eventsModel,
  });

  render(new FilterView(), siteFiltersContainer);
  render(new SortView(), siteEventsContainer);

  tripPresenter.init();
  eventsPresenter.init();
}
