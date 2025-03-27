import { render } from './framework/render.js';
import { generateFilter } from './mock/filter.js';
import EventsModel from './model/events-model.js';
import EventsPresenter from './presenter/events-presenter.js';
import TripPresenter from './presenter/trip-presenter.js';
import FilterView from './view/filter-view.js';

const siteHeaderElement = document.querySelector('.page-header');
const siteTripContainer = siteHeaderElement.querySelector('.trip-main');
const siteFiltersContainer = siteHeaderElement.querySelector('.trip-controls__filters');
const siteEventsContainer = document.querySelector('.trip-events');

const eventsModel = new EventsModel();

const filters = generateFilter(eventsModel.events);

const tripPresenter = new TripPresenter({
  tripContainer: siteTripContainer,
  eventsModel,
});

const eventsPresenter = new EventsPresenter({
  eventsContainer: siteEventsContainer,
  eventsModel,
});

render(new FilterView(filters), siteFiltersContainer);

tripPresenter.init();
eventsPresenter.init();
