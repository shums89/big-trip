const createFilterItemTemplate = (filter, currentFilterType) => {
  const { type, count } = filter;

  return (
    `
      <div class="trip-filters__filter">
        <input
          id="filter-${type}"
          class="trip-filters__filter-input visually-hidden"
          type="radio"
          name="trip-filter"
          value="${type}"
          ${type === currentFilterType ? 'checked' : ''}
          ${count === 0 ? 'disabled' : ''}
        >
        <label class="trip-filters__filter-label" for="filter-${type}">
          ${type}
          <span class="filter__${type}-count">${count}</span>
        </label>
      </div>
    `
  );
};

export const createFilterTemplate = (filterItems, currentFilterType) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter, currentFilterType))
    .join('');

  return `
    <form class="trip-filters" action="#" method="get">
      ${filterItemsTemplate}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
  `;
};
