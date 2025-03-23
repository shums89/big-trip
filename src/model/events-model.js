import { generateEvents } from '../mock/event.js';

export default class EventsModel {
  events = generateEvents();

  getEvents() {
    return this.events;
  }
}
