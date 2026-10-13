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


            )