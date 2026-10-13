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
        
    )
}

