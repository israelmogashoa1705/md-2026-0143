import { useEffect, useRef } from "react";

export default function BookingConfirmation({ booking, reference, onStartOver }) {
  const headingRef = useRef(null);
  useEffect(() => { headingRef.current?.focus(); }, []);
  const dateLabel = new Date(`${booking.date}T12:00:00`).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });

  return (
    <section className="confirmation-panel" aria-labelledby="confirmation-heading">
      <div className="success-icon" aria-hidden="true">✓</div>
      <p className="eyebrow">DEMO BOOKING COMPLETE</p>
      <h1 id="confirmation-heading" ref={headingRef} tabIndex="-1">Your demo booking is confirmed</h1>
      <p>This confirmation is for the coursework prototype only. No real appointment has been made.</p>
      <div className="reference-number">
        <span>Demo reference number</span>
        <strong>{reference}</strong>
      </div>
      <div className="review-card confirmation-summary">
        <h2>Appointment summary</h2>
        <dl className="summary-list">
          <div><dt>Service</dt><dd>{booking.serviceName}</dd></div>
          <div><dt>Practitioner</dt><dd>{booking.practitioner}</dd></div>
          <div><dt>Date</dt><dd>{dateLabel}</dd></div>
          <div><dt>Time</dt><dd>{booking.time}</dd></div>
        </dl>
      </div>
      <p>In a real service, the clinic would provide verified booking details and next steps.</p>
      <button className="button button-primary" type="button" onClick={onStartOver}>Start a new booking</button>
    </section>
  );
}