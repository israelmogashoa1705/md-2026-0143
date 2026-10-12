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

        

    }
}