import { useEffect, useRef } from "react";

export default function BookingReview({ booking, onBack, onConfirm }) {
    const headingRef = useRef(null);
    useEffect(() => { headingRef.current?.focus(); }, []);
    const dateLabel = booking.date ? new Date(`${booking.date}T12:00:00`).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" }) : "";

    return (
        <section className="booking-panel" aria-labelledby="review-heading">
            <button className="text-button" type="button" onClick={onBack}>← Edit details</button>
            <div className="step-indicator">STEP 2 OF 2 · REVIEW</div>
            <h1 id="review-heading" ref={headingRef} tabIndex="-1">Review your booking</h1>
            <p className="muted">Check the information below before confirming this demonstration booking.</p>
            <div className="review-card">
                <h2>Appointment summary</h2>
                <dl className="summary-list">
                    <div><dt>Service</dt><dd>{booking.serviceName}</dd></div>
                    <div><dt>Practitioner</dt><dd>{booking.practitioner}</dd></div>
                    <div><dt>Date</dt><dd>{dateLabel}</dd></div>
                    <div><dt>Time</dt><dd>{booking.time}</dd></div>
                    <div><dt>Duration</dt><dd>{booking.duration}</dd></div>
                </dl>
            </div>
            <div className="review-card">
                <h2>Contact details</h2>
                <dl className="summary-list">
                    <div><dt>Name</dt><dd>{booking.name}</dd></div>
                    <div><dt>Email</dt><dd>{booking.email}</dd></div>
                    <div><dt>Phone</dt><dd>{booking.phone}</dd></div>
                    <div><dt>Accessibility needs</dt><dd>{booking.accessNeeds || "None provided"}</dd></div>
                </dl>
            </div>
            <p className="demo-notice"><strong>Prototype notice:</strong> Confirming will create a reference number.</p>
            <div className="form-actions">
                <button className="button button-secondary" type="button" onClick={onBack}>Edit details</button>
                <button className="button button-primary" type="button" onClick={onConfirm}>Confirm demo booking</button>
            </div>
        </section>
    );
}