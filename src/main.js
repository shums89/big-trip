import { render } from './framework/render.js';
import EventsModel from './model/events-model.js';
import FilterModel from './model/filter-model.js';
import EventsPresenter from './presenter/events-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import TripPresenter from './presenter/trip-presenter.js';
import NewEventButtonView from './view/new-event-button-view.js';
import { generateRandomString } from './utils/common.js';
import EventsApiService from './api-services/events-api-service.js';
import CatalogModel from './model/catalog-model.js';
import CatalogApiService from './api-services/catalog-api-service.js';

const END_POINT = 'https://17.ecmascript.htmlacademy.pro/big-trip';

let keyAuthorization = sessionStorage.getItem('authorization');

if (!keyAuthorization) {
  keyAuthorization = `Basic ${generateRandomString(16)}`;
  sessionStorage.setItem('authorization', keyAuthorization);
}

const siteHeaderElement = document.querySelector('.page-header');
const siteTripContainer = siteHeaderElement.querySelector('.trip-main');
const siteFiltersContainer = siteHeaderElement.querySelector('.trip-controls__filters');
const siteEventsContainer = document.querySelector('.trip-events');

const eventsApiService = new EventsApiService(END_POINT, keyAuthorization);
const catalogApiService = new CatalogApiService(END_POINT, keyAuthorization);

const eventsModel = new EventsModel({ eventsApiService });
const catalogModel = new CatalogModel({ catalogApiService });
const filterModel = new FilterModel();

const tripPresenter = new TripPresenter({
  tripContainer: siteTripContainer,
  eventsModel,
});

const newEventButtonComponent = new NewEventButtonView({
  onClick: handleNewEventButtonClick,
});

const filterPresenter = new FilterPresenter({
  filterContainer: siteFiltersContainer,
  filterModel,
  eventsModel,
});

const eventsPresenter = new EventsPresenter({
  eventsContainer: siteEventsContainer,
  eventsModel,
  catalogModel,
  filterModel,
  newEventButtonComponent,
  onNewEventDestroy: handleNewEventFormClose,
});

function handleNewEventFormClose() {
  newEventButtonComponent.element.disabled = false;
}

function handleNewEventButtonClick() {
  eventsPresenter.createEvent();
  newEventButtonComponent.element.disabled = true;
}

tripPresenter.init();
filterPresenter.init();
eventsPresenter.init();

render(newEventButtonComponent, siteTripContainer);

catalogModel.init()
  .then(() => {
    eventsModel.init();
  });
