import { useMemo, useState } from "react";
import { categories, services } from "../data/services.js";

export default function ServiceDirectory({ onChoose }) {
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState("All services");

    const filteredServices = useMemo(() => {
        const normalQuery = query.trim().toLowerCase();
        return services.filter((service) => {
            const matchesQuery =
                service.name.toLowerCase().includes(normalQuery) ||
                service.description.toLowerCase().includes(normalQuery) ||
                service.category.toLowerCase().includes(normalQuery);
            const matchesCategory = category === "All services" || service.category === category;
            return matchesQuery && matchesCategory;

        });
    }, [query, category]);

    return (
        <section aria-labelledby="directory-heading">
            <div className="hero">
                <p className="eyebrow">YOUR HEALTH, YOUR COMMUNITY</p>
                <h1 id="directory-heading">Find care that works for you.</h1>
                <p>Explore local clinic services and book a demo appointment in a few simple steps.</p>
            </div>

            <div className="directory-controls">
                <div className="field">
                    <label htmlFor="service-search">Search healthcare services</label>
                    <input
                        id="service-search"
                        type="search"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="e.g. consultation, screening"
                    />
                </div>
                <fieldset className="category-fieldset">
                    <legend>Filter by category</legend>
                    <div className="filter-list">
                        {categories.map((item) => (
                            <button
                                type="button"
                                key={item}
                                className={`filter-button ${category === item ? "active" : ""}`}
                                aria-pressed={category === item}
                                onClick={() => setCategory(item)}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </fieldset>
            </div>

            <p className="result-count" role="status" aria-live="polite">
                {filteredServices.length} {filteredServices.length === 1 ? "service" : "services"} found
            </p>

            {filteredServices.length > 0 ? (
                <div className="service-grid">
                    {filteredServices.map((service) => (
                        <article className="service-card" key={service.id}>
                            <div className="service-icon" aria-hidden="true">✚</div>
                            <p className="eyebrow">{service.category}</p>
                            <h2>{service.name}</h2>
                            <p>{service.description}</p>
                            <p className="duration">Appointment length: {service.duration}</p>
                            <div className="service-card-actions">
                                <button className="button button-secondary" type="button" onClick={() => onChoose(service)}>
                                    View service details <span aria-hidden="true">→</span>
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            ) : (
                <div className="empty-state">
                    <h2>No services found</h2>
                    <p>Try another search term or choose a different category.</p>
                    <button
                        className="button button-secondary"
                        type="button"
                        onClick={() => { setQuery(""); setCategory("All services"); }}
                    >
                        Clear filters
                    </button>
                </div>
            )}
        </section>
    );
}
