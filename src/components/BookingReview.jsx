import { useEffect, useRef } from "react";

export default function BookingReview({ booking, onBack, onConfirm }) {
    const headingRef = useRef(null);
    useEffect(() => { headingRef.current?.focus(); }, []);
    const dateLabel = booking.date ? new Date(`${booking.date}T12:00:00`).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" }) : "";