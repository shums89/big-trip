import EventsModel from './model/events-model.js';
import EventsPresenter from './presenter/events-presenter.js';
import TripPresenter from './presenter/trip-presenter.js';
import { render } from './render.js';
import FilterView from './view/filter-view.js';
import SortView from './view/sort-view.js';

const siteHeaderElement = document.querySelector('.page-header');
const siteTripContainer = siteHeaderElement.querySelector('.trip-main');
const siteFiltersContainer = siteHeaderElement.querySelector('.trip-controls__filters');
const siteEventsContainer = document.querySelector('.trip-events');

const eventsModel = new EventsModel();
const tripPresenter = new TripPresenter({ tripContainer: siteTripContainer });

const eventsPresenter = new EventsPresenter({
  eventsContainer: siteEventsContainer,
  eventsModel,
});

render(new FilterView(), siteFiltersContainer);
render(new SortView(), siteEventsContainer);

tripPresenter.init();
eventsPresenter.init();
