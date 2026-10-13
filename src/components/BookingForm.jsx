import { useEffect, useRef, useState } from "react";

function dateString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}


    function handleSubmit(event) {
        event.preventDefault();

        if (!name.trim()) {
            setError("Please enter your full name.")
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        if (!date) {
            setError("Please select an appointment date.");
            return;
        }

        const selectedDate = new Date(`${date}T00:00:00`);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
            setError("Please select today or future.");
            return;
        }

        setError("");

        onReview({
            service,
            name,
            email,
            date,
            accessNeeds,
        });

    }

    return (
        <section aria-labelledby="booking-heading">
            <h1 id="booking-heading">Book an appointment</h1>

            <p>
                Selected service: <strong>{service.name}</strong>
            </p>

            <form onSubmit={handleSubmit} noValidate>
                {error && (
                    <p id="form-error" role="alert" className="error">
                        {error}
                    </p>
                )}

                <div className="form-field">
                    <label htmlFor="patient-name">Full name *</label>
                    <input
                        id="patient-name"
                        name="name"
                        autoComplete="name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        aria-invalid={Boolean(error && !name.trim())}
                        aria-describedby={error ? "form-error" : undefined}
                        required
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="patient-email">Email address *</label>
                    <input
                        id="patient-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="appointment-date">
                        Appointment date *
                    </label>

                    <input
                        id="appointment-date"
                        name="date"
                        type="date"
                        value={date}
                        onChange={(event) => setDate(event.target.value)}
                        required
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="access-needs">
                        Accessibility or communication needs (optional)
                    </label>

                    <textarea
                        id="access-needs"
                        name="accessNeeds"
                        rows="4"
                        value={accessNeeds}
                        onChange={(event) => setAccessNeeds(event.target.value)}
                    />
                </div>

                <p className="notice">
                    Demonstration only. Do not enter real patient information.
                </p>
                <div className="button-row">
                    <button type="button" onClick={onCancel}>
                        Cancel
                    </button>

                    <button type="submit">Review appointment</button>
                </div>
            </form>
        </section>
    );
}

export default BookingForm;