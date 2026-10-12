import { useState } from "react";

function BookingForm({ service, onReview, onCancel }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [date, setDate] = useState("");
    const [accessNeeds, setAccessNeeds] = useState("");
    const [error, setError] = useState("");

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
            </form>

        </section>
    )
}