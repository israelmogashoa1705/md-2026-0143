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
    }
}