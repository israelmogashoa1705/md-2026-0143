export default function ServiceDetails({ service, onBack, onBook }) {
    if (!service) return null;
    return (
        <section className="details-panel" aria-labelledby="service-details-heading">
            <button className="text-button" type="button" onClick={onBack}>← Back to all services</button>
            <div className="details-hero">
                <span className="service-icon" aria-hidden="true">✚</span>
                <p className="eyebrow">{service.category}</p>
                <h1 id="service-details-heading">{service.name}</h1>
                <p className="details-lead">{service.description}</p>
                <div className="details-meta">
                    <span><strong>Typical visit:</strong> {service.duration}</span>
                    <span><strong>Appointment type:</strong> {service.appointmentType || "In-person clinic visit"}</span>
                </div>
                <button className="button button-primary" type="button" onClick={() => onBook(service)}>Book this service <span aria-hidden="true">→</span></button>
            </div>
            <div className="details-grid">
                <article className="details-card">
                    <h2>What this service includes</h2>
                    <ul>{(service.includes || []).map((item) => <li key={item}>{item}</li>)}</ul>
                </article>
            </div>

        </section>
    )
}