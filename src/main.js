import { render } from './render.js';
import FilterView from './view/filter-view.js';

const siteHeaderElement = document.querySelector('.page-header');
const siteFiltersContainer = siteHeaderElement.querySelector('.trip-controls__filters');

render(new FilterView(), siteFiltersContainer);
