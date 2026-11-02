import { useState } from "react";
import { services, categories } from "../data/services.js";

export default function ServiceDirectory({ onChoose }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All services");
  const [filtersOpen, setFiltersOpen] = useState(true);

  const term = query.trim().toLowerCase();
  const results = services.filter((service) => {
    const matchesCategory = category === "All services" || service.category === category;
    const haystack = `${service.name} ${service.description} ${service.category}`.toLowerCase();
    return matchesCategory && (!term || haystack.includes(term));
  });

  const countText =
    results.length === 1 ? "1 service found" : `${results.length} services found`;

  function clearFilters() {
    setQuery("");
    setCategory("All services");
  }

  return (
    <section aria-labelledby="directory-heading">
      <div className="hero">
        <p className="eyebrow">COMMUNITY HEALTHCARE CLINIC</p>
        <h1 id="directory-heading" tabIndex="-1">
          Find care that works for you
        </h1>
        <p>
          Search our services, choose the one that suits you, and book an appointment. Every step
          works with a keyboard and a screen reader.
        </p>
      </div>

      <div className="directory-controls">
        <form role="search" aria-label="Search and filter services" onSubmit={(e) => e.preventDefault()}>
          <div className="field">
            <label htmlFor="service-search">Search healthcare services</label>
            <input
              id="service-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-describedby="service-search-help"
              placeholder="For example: screening"
              autoComplete="off"
            />
            <small id="service-search-help">Results update as you type.</small>
          </div>

          <button
            type="button"
            className="button button-secondary filter-toggle"
            aria-expanded={filtersOpen}
            aria-controls="category-filters"
            onClick={() => setFiltersOpen((open) => !open)}
          >
            {filtersOpen ? "Hide category filters" : "Show category filters"}
          </button>

          <fieldset className="category-fieldset" id="category-filters" hidden={!filtersOpen}>
            <legend>Filter by category</legend>
            <div className="filter-list">
              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  className="filter-button"
                  aria-pressed={category === item}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </fieldset>
        </form>

        <div>
          <p className="result-count" role="status">
            {countText}
          </p>

          {results.length === 0 ? (
            <div className="empty-state">
              <h2>No services match your search</h2>
              <p>Try a different word, or clear the filters to see every service.</p>
              <button type="button" className="button button-secondary" onClick={clearFilters}>
                Clear search and filters
              </button>
            </div>
          ) : (
            <ul className="service-grid" aria-label="Healthcare services">
              {results.map((service) => (
                <li key={service.id} className="service-item">
                  <article className="service-card">
                    <span className="service-icon" aria-hidden="true">
                      ✚
                    </span>
                    <p className="eyebrow">{service.category}</p>
                    <h2>{service.name}</h2>
                    <p>{service.description}</p>
                    <p className="duration">Typical visit: {service.duration}</p>
                    <div className="service-card-actions">
                      <button
                        type="button"
                        className="button button-primary"
                        onClick={() => onChoose(service)}
                      >
                        View service details
                        <span className="sr-only"> for {service.name}</span>
                      </button>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}