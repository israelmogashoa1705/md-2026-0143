import { useEffect, useRef, useState } from "react";
import { fetchAvailability } from "../data/services.js";
import { dateString } from "../data/format.js";

const LABELS = {
  practitioner: "Practitioner",
  date: "Appointment date",
  time: "Appointment time",
  name: "Full name",
  email: "Email address",
  phone: "Contact phone number"
};

const FIELD_ORDER = ["practitioner", "date", "time", "name", "email", "phone"];

function validate(values, today) {
  const errors = {};
  if (!values.practitioner) errors.practitioner = "Choose a practitioner.";
  if (!values.date) errors.date = "Choose an appointment date.";
  else if (values.date < today) errors.date = "Choose today or a future date.";
  if (!values.time) errors.time = "Choose an appointment time.";
  if (!values.name.trim()) errors.name = "Enter your full name.";
  if (!values.email.trim()) errors.email = "Enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
    errors.email = "Enter an email address in a valid format, such as name@example.com.";
  if (!values.phone.trim()) errors.phone = "Enter a contact phone number.";
  else if (values.phone.replace(/\D/g, "").length < 7)
    errors.phone = "Enter a phone number with at least 7 digits.";
  return errors;
}

export default function BookingForm({ service, initialBooking, onBack, onReview }) {
  const today = dateString(new Date());
  const summaryRef = useRef(null);
  const timerRef = useRef(null);

  const firstPractitioner = initialBooking.practitioner || service.practitioners[0] || "";

  const [values, setValues] = useState({
    practitioner: firstPractitioner,
    date: initialBooking.date || "",
    time: initialBooking.time || "",
    name: initialBooking.name || "",
    email: initialBooking.email || "",
    phone: initialBooking.phone || "",
    accessNeeds: initialBooking.accessNeeds || ""
  });
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [times, setTimes] = useState(() => fetchAvailability(firstPractitioner));
  const [loadingTimes, setLoadingTimes] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  // Clear any pending simulated availability request when the form unmounts.
  useEffect(() => () => clearTimeout(timerRef.current), []);

  const errors = validate(values, today);
  const isVisible = (field) => Boolean(errors[field]) && (touched[field] || submitted);
  const visibleErrors = FIELD_ORDER.filter(isVisible);

  function setField(field, value) {
    const hadVisibleError = isVisible(field);
    const next = { ...values, [field]: value };
    setValues(next);
    // Live feedback: tell the user when a field they were told about is now fixed.
    if (hadVisibleError && !validate(next, today)[field]) {
      setAnnouncement(`${LABELS[field]} is now valid.`);
    }
  }

  function blur(field) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (errors[field]) setAnnouncement(`${LABELS[field]}: ${errors[field]}`);
  }

  function changePractitioner(value) {
    setValues((prev) => ({ ...prev, practitioner: value, time: "" }));
    setLoadingTimes(true);
    setAnnouncement(`Checking availability for ${value}.`);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      const available = fetchAvailability(value);
      setTimes(available);
      setLoadingTimes(false);
      setAnnouncement(
        `${available.length} appointment times available with ${value}. Please choose a time.`
      );
    }, 350);
  }

  function focusField(field) {
    document.getElementById(field)?.focus();
  }

  function submit(event) {
    event.preventDefault();
    setSubmitted(true);
    const current = validate(values, today);
    const failing = FIELD_ORDER.filter((f) => current[f]);

    if (failing.length > 0) {
      // Move focus to the error summary so the outcome is announced and links are reachable.
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    onReview({
      serviceId: service.id,
      serviceName: service.name,
      duration: service.duration,
      practitioner: values.practitioner,
      date: values.date,
      time: values.time,
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      accessNeeds: values.accessNeeds.trim()
    });
  }

  function describedBy(field, hasHelp) {
    const ids = [];
    if (hasHelp) ids.push(`${field}-help`);
    if (isVisible(field)) ids.push(`${field}-error`);
    return ids.length ? ids.join(" ") : undefined;
  }

  function fieldProps(field, { help = false } = {}) {
    return {
      id: field,
      "aria-required": field === "accessNeeds" ? undefined : "true",
      "aria-invalid": isVisible(field),
      "aria-describedby": describedBy(field, help),
      onBlur: () => blur(field)
    };
  }

  function errorText(field) {
    return isVisible(field) ? (
      <span className="field-error" id={`${field}-error`}>
        <span className="sr-only">Error: </span>
        {errors[field]}
      </span>
    ) : null;
  }

  return (
    <section className="booking-panel" aria-labelledby="booking-heading">
      <button className="text-button" type="button" onClick={onBack}>
        ← Back to service details
      </button>
      <p className="step-indicator">STEP 1 OF 2 · APPOINTMENT DETAILS</p>
      <h1 id="booking-heading" tabIndex="-1">
        Book {service.name.toLowerCase()}
      </h1>
      <p className="muted">{service.description} Fields marked * are required.</p>

      {/* Polite live region: field-level validation outcomes and availability updates. */}
      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>

      {submitted && visibleErrors.length > 0 && (
        <div
          className="error-summary"
          ref={summaryRef}
          tabIndex="-1"
          role="group"
          aria-labelledby="error-summary-heading"
        >
          <h2 id="error-summary-heading">
            {visibleErrors.length === 1
              ? "There is 1 problem with your booking"
              : `There are ${visibleErrors.length} problems with your booking`}
          </h2>
          <ul>
            {visibleErrors.map((field) => (
              <li key={field}>
                <a
                  href={`#${field}`}
                  onClick={(e) => {
                    e.preventDefault();
                    focusField(field);
                  }}
                >
                  {errors[field]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={submit} noValidate>
        <fieldset>
          <legend>Appointment details</legend>
          <div className="form-grid">
            <div className="field">
              <label htmlFor="practitioner">
                Practitioner <span aria-hidden="true">*</span>
              </label>
              <select
                {...fieldProps("practitioner", { help: true })}
                value={values.practitioner}
                onChange={(e) => changePractitioner(e.target.value)}
              >
                {service.practitioners.map((person) => (
                  <option key={person} value={person}>
                    {person}
                  </option>
                ))}
              </select>
              <small id="practitioner-help">Changing practitioner updates the available times.</small>
              {errorText("practitioner")}
            </div>

            <div className="field">
              <label htmlFor="date">
                Appointment date <span aria-hidden="true">*</span>
              </label>
              <input
                {...fieldProps("date", { help: true })}
                type="date"
                min={today}
                value={values.date}
                onChange={(e) => setField("date", e.target.value)}
              />
              <small id="date-help">Choose today or a later date.</small>
              {errorText("date")}
            </div>

            <div className="field">
              <label htmlFor="time">
                Appointment time <span aria-hidden="true">*</span>
              </label>
              <select
                {...fieldProps("time", { help: true })}
                aria-busy={loadingTimes}
                disabled={loadingTimes}
                value={values.time}
                onChange={(e) => setField("time", e.target.value)}
              >
                <option value="">{loadingTimes ? "Loading times…" : "Select a time"}</option>
                {times.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </select>
              <small id="time-help">
                Demonstration times only. They are not connected to live clinic availability.
              </small>
              {errorText("time")}
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>Your contact details</legend>
          <div className="form-grid">
            <div className="field">
              <label htmlFor="name">
                Full name <span aria-hidden="true">*</span>
              </label>
              <input
                {...fieldProps("name")}
                autoComplete="name"
                value={values.name}
                onChange={(e) => setField("name", e.target.value)}
              />
              {errorText("name")}
            </div>

            <div className="field">
              <label htmlFor="email">
                Email address <span aria-hidden="true">*</span>
              </label>
              <input
                {...fieldProps("email", { help: true })}
                type="email"
                autoComplete="email"
                value={values.email}
                onChange={(e) => setField("email", e.target.value)}
              />
              <small id="email-help">We will send your confirmation here.</small>
              {errorText("email")}
            </div>

            <div className="field">
              <label htmlFor="phone">
                Contact phone number <span aria-hidden="true">*</span>
              </label>
              <input
                {...fieldProps("phone", { help: true })}
                type="tel"
                autoComplete="tel"
                value={values.phone}
                onChange={(e) => setField("phone", e.target.value)}
              />
              <small id="phone-help">Include the area code, for example 012 345 6789.</small>
              {errorText("phone")}
            </div>

            <div className="field field-wide">
              <label htmlFor="accessNeeds">Accessibility or appointment needs (optional)</label>
              <textarea
                {...fieldProps("accessNeeds", { help: true })}
                aria-invalid={undefined}
                rows="3"
                value={values.accessNeeds}
                onChange={(e) => setField("accessNeeds", e.target.value)}
                placeholder="For example: step-free access, an interpreter, or extra time."
              />
              <small id="accessNeeds-help">Only share what you are comfortable sharing.</small>
            </div>
          </div>
        </fieldset>

        <div className="form-actions">
          <button className="button button-secondary" type="button" onClick={onBack}>
            Cancel
          </button>
          <button className="button button-primary" type="submit">
            Review booking →
          </button>
        </div>
      </form>
    </section>
  );
}