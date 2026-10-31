
import { useEffect, useRef, useState } from "react";

import Header from "./components/Header.jsx";
import ServiceDirectory from "./components/ServiceDirectory.jsx";
import ServiceDetails from "./components/serviceDetails.jsx";
import BookingForm from "./components/BookingForm.jsx";
import BookingReview from "./components/BookingReview.jsx";
import BookingConfirmation from "./components/BookingConfirmation.jsx";

const initialBooking = {
    practitioner: "",
    date: "",
    time: "",
    name: "",
    email: "",
    phone: "",
    accessNeeds: ""
};

export default function App() {
    const [step, setStep] = useState("directory");
    const [selectedService, setSelectedService] = useState(null);
    const [booking, setBooking] = useState(initialBooking);
    const [reference, setReference] = useState("");

    const mainRef = useRef(null);

    useEffect(() => {
        if (step === "directory") {
            mainRef.current?.focus();
        }
    }, [step]);

    function chooseService(service) {
        setSelectedService(service);
        setStep("details");
    }

    function startBooking(service) {
        setSelectedService(service);

        setBooking({
            ...initialBooking,
            practitioner: service.practitioners[0] || ""
        });

        setStep("form");
    }

    function reviewBooking(details) {
        setBooking(details);
        setStep("review");
    }

    function editBooking() {
        setStep("form");
    }

    function confirmBooking() {
        const generatedReference =
            `CHC-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

        setReference(generatedReference);
        setStep("confirmation");
    }

    function startOver() {
        setStep("directory");
        setSelectedService(null);
        setBooking(initialBooking);
        setReference("");
    }

    return (
        <div className="app-shell">
            <Header onHome={startOver} />

            <main
                id="main"
                className="main-content container"
                ref={mainRef}
                tabIndex="-1"
            >
                {step === "directory" && (
                    <ServiceDirectory onChoose={chooseService} />
                )}

                {step === "details" && selectedService && (
                    <ServiceDetails
                        service={selectedService}
                        onBack={() => setStep("directory")}
                        onBook={startBooking}
                    />
                )}

                {step === "form" && selectedService && (
                    <BookingForm
                        service={selectedService}
                        initialBooking={booking}
                        onBack={() => setStep("details")}
                        onReview={reviewBooking}
                    />
                )}

                {step === "review" && booking && (
                    <BookingReview
                        booking={booking}
                        onBack={editBooking}
                        onConfirm={confirmBooking}
                    />
                )}

                {step === "confirmation" && booking && (
                    <BookingConfirmation
                        booking={booking}
                        reference={reference}
                        onStartOver={startOver}
                    />
                )}
            </main>

            <footer className="site-footer">
                <div className="container footer-inner">
                    <p>
                        <strong>Community Healthcare Clinic</strong>
                    </p>

                    <p>
                        If you need urgent medical help, contact
                        your local emergency service.
                    </p>
                </div>
            </footer>
        </div>
    );
}


