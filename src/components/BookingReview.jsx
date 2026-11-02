import { formatDate } from "../data/format.js";

export default function BookingReview({ booking, onBack, onConfirm }) {
  return (
    <section className="booking-panel" aria-labelledby="review-heading">
      <button className="text-button" type="button" onClick={onBack}>
        ← Edit details
      </button>
      <p className="step-indicator">STEP 2 OF 2 · REVIEW</p>
      <h1 id="review-heading" tabIndex="-1">
        Review your booking
      </h1>
      <p className="muted">
        Check the information below before confirming this demonstration booking.
      </p>

      <div className="review-card">
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
          <div>
            <dt>Duration</dt>
            <dd>{booking.duration}</dd>
          </div>
        </dl>
      </div>

      <div className="review-card">
        <h2>Contact details</h2>
        <dl className="summary-list">
          <div>
            <dt>Name</dt>
            <dd>{booking.name}</dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd>{booking.email}</dd>
          </div>
          <div>
            <dt>Phone</dt>
            <dd>{booking.phone}</dd>
          </div>
          <div>
            <dt>Accessibility needs</dt>
            <dd>{booking.accessNeeds || "None provided"}</dd>
          </div>
        </dl>
      </div>

      <p className="notice">
        <strong>Prototype notice:</strong> Confirming creates a demonstration reference number. No
        real appointment is made.
      </p>

      <div className="form-actions">
        <button className="button button-secondary" type="button" onClick={onBack}>
          Edit details
        </button>
        <button className="button button-primary" type="button" onClick={onConfirm}>
          Confirm booking
        </button>
      </div>
    </section>
  );
}