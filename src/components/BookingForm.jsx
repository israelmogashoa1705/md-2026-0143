import { useEffect, useRef, useState } from "react";

function dateString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}


export default function BookingForm({ service, onBack, onReview }) {
    const headingRef = useRef(null);
    const [practitioner, setPractitioner] = useState(service.practitioners[0] || "");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [accessNeeds, setAccessNeeds] = useState("");
    const [errors, setErrors] = useState({});
    const [attempted, setAttempted] = useState(false);

    useEffect(() => { headingRef.current?.focus(); }, []);

    const today = dateString(new Date());
    const availableTimes = ["09:00", "10:00", "11:30", "13:00", "14:30"];

    function validate() {
        const nextErrors = {};
        if (!name.trim()) nextErrors.name = "Enter your full name.";
        if (!email.trim()) nextErrors.email = "Enter your email address.";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) nextErrors.email = "Enter an email address in a format like name@example.com.";
        if (!phone.trim()) nextErrors.phone = "Enter a contact phone number.";
        if (!practitioner) nextErrors.practitioner = "Choose a practitioner.";
        if (!date) nextErrors.date = "Choose an appointment date.";
        else if (date < today) nextErrors.date = "Choose today or a future date.";
        if (!time) nextErrors.time = "Choose an appointment time.";
        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    }

    function submit(event) {
        event.preventDefault();
        setAttempted(true);
        if (!validate()) {
            document.getElementById(Object.keys(errors)[0] || "name")?.focus();
            return;
        }

        onReview {
            (
                serviceId: service.id,
                serviceName: service.name,
                practitioner,
                date,
                time,
                name: name.trim(),
                    email: email.trim(),
                        phone: phone.trim(),
                            accessNeeds: accessNeeds.trim()
        )
        };

        function errorText(field) {
            return attempted && errors[field] ? <span className="field-error" id={`${field}-error`}>{errors[field]}</span> : null;
        }

        return (
            <section className="booking-panel" aria-labelledby="booking-heading">
                <button className="text-button" type="button" onClick={onBack}>← Back to services</button>
                <div className="step-indicator">STEP 1 OF 2 · APPOINTMENT DETAILS</div>
                <h1 id="booking-heading" ref={headingRef} tabIndex="-1">Book {service.name.toLowerCase()}</h1>
                <p className="muted">{service.description} This is a demonstration booking and does not send information to a clinic.</p>

                {attempted && Object.keys(errors).length > 0 && (
                    <div className="error-summary" role="alert" aria-labelledby="error-summary-heading">
                        <h2 id="error-summary-heading">Please check the following fields</h2>
                        <ul>{Object.entries(errors).map(([field, message]) => <li key={field}><a href={`#${field}`}>{message}</a></li>)}</ul>
                    </div>
                )}
    }