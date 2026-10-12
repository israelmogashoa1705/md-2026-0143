import { useState } from 'react';

const services = [
    {
        id: 1,
        name: "General consultation",
        category: "Primary care",
        description: "Routine consultations and general health concerns.",

    },
    {
        id: 3,
        name: "Preventive health screening",
        category: "Preventive care",
        description: "Routine screening and health guidance.",
    },
];

function ServiceDirectory({ onChooseService }) {
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState("All services");

    const categories = [
        "All services",
        "Primary care",
        "Mental health",
        "Preventive care",
    ];

    const filteredServices = services.filter((service) => {
        const matchesCategory =
            category === "All services" ||
            service.category === category;

        const matchesQuery = service.name
            .toLowerCase()
            .includes(query.trim().toLowerCase());

        return matchesCategory && matchesQuery;
    });

    return (
        <section aria-labelledby="services-heading">
            <h1 id="services-heading">Find a healthcare service</h1>

            <label htmlFor='service-search'>
                Search healthcare services
            </label>

            <input
                id='service-search'
                type='search'
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder='Search services...'
            />

            <fieldset>
                <legend>Filter by category</legend>

                {categories.map((item) => (
                    <button
                        key={item}
                        type="button"
                        aria-pressed={category === item}
                        onClick={() => setCategory(item)}
                    >
                        {item}
                    </button>
                ))}
            </fieldset>

            <p role='status' aria-live='polite'>
                {filteredServices.length} services found.
            </p>

            {filteredServices.length === 0 ? (
                <p>No services match your search.</p>
            ) : (
                <div className='service-grid'>
                    {filteredServices.map((service) => (
                        <article className="service-card" key={service.id}>
                            <h2>{service.name}</h2>
                            <p>{service.description}</p>
                            <p>Category: {service.category}</p>

                            <button 
                                type='button'
                                onClick={() => onChooseService(service)}
                            >
                                Choose service
                                <span className='sr-only'>
                                    : {service.name}
                                </span>
                            </button>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
}

export default ServiceDirectory