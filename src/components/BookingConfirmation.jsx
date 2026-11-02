import { formatDate } from "../data/format.js";

export default function BookingConfirmation({ booking, reference, onStartOver }) {
  return (
    <section className="confirmation-panel" aria-labelledby="confirmation-heading">
      <div className="success-icon" aria-hidden="true">
        ✓
      </div>
      <p className="eyebrow">BOOKING COMPLETE</p>
      <h1 id="confirmation-heading" tabIndex="-1">
        Your booking is confirmed
      </h1>
      <p>
        We will send a confirmation to <strong>{booking.email}</strong> (demonstration only).
      </p>

      <div className="reference-number">
        <span>Reference number</span>
        <strong>{reference}</strong>
      </div>

      <div className="review-card confirmation-summary">
        <h2>Appointment summary</h2>
        <dl className="summary-list">
          <div>
            <dt>Service</dt>
            <dd>{booking.serviceName}</dd>
          </div>
          <div>
            <dt>Practitioner</dt>
            <dd>{booking.practitioner}</dd>
          </div>
          <div>
            <dt>Date</dt>
            <dd>{formatDate(booking.date)}</dd>
          </div>
          <div>
            <dt>Time</dt>
            <dd>{booking.time}</dd>
          </div>
        </dl>
      </div>

      <button className="button button-primary" type="button" onClick={onStartOver}>
        Start a new booking
      </button>
    </section>
  );
}