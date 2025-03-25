import AbstractView from '../framework/view/abstract-view.js';
import { createSortTemplate } from './sort-template.js';

export default class SortView extends AbstractView {
  get template() {
    return createSortTemplate();
  }
}
