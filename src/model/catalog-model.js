export default class CatalogModel {
  #Catalog = {};
  #catalogApiService = null;

  constructor({ catalogApiService }) {
    this.#catalogApiService = catalogApiService;
  }

  get Catalog() {
    return this.#Catalog;
  }

  async init() {
    try {
      const offers = await this.#catalogApiService.offers;

      this.#Catalog = { ...this.#Catalog, OFFERS: offers };
    } catch (err) {
      this.#Catalog = { ...this.#Catalog, OFFERS: [] };
    }

    try {
      const destinations = await this.#catalogApiService.destinations;

      this.#Catalog = { ...this.#Catalog, DESTINATIONS: destinations };
    } catch (err) {
      this.#Catalog = { ...this.#Catalog, DESTINATIONS: [] };
    }
  }
}
