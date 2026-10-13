import { useEffect, useRef } from "react";

export default function BookingConfirmation({ booking, reference, onStartOver }) {
    const headingRef = useRef(null);
    useEffect(() => { headingRef.current?.focus(); }, []);
    const dateLabel = new Date(`${booking.date}T12:00:00`).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
}

function BookingConfirmation({ booking, onStartOver }) {
  return (
    <section aria-labelledby="confirmation-heading">
      <h1 id="confirmation-heading" tabIndex={-1}>
        Demo booking confirmed
      </h1>

      <p role="status" aria-live="polite">
        Your demonstration booking workflow is complete.
      </p>

      <dl className="review-list">
        <dt>Service</dt>
        <dd>{booking.service.name}</dd>

        <dt>Patient name</dt>
        <dd>{booking.name}</dd>

        <dt>Email address</dt>
        <dd>{booking.email}</dd>

        <dt>Appointment date</dt>
        <dd>{booking.date}</dd>

        <dt>Accessibility needs</dt>
        <dd>{booking.accessNeeds || "Not provided"}</dd>
      </dl>

      <p className="notice">
        This is a prototype. No real clinic appointment has been created.
      </p>

      <button type="button" onClick={onStartOver}>
        Start again
      </button>
    </section>
  );
}

export default BookingConfirmation;