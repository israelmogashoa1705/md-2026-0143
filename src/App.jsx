import { useEffect, useRef, useState } from "react";

import Header from "./components/Header.jsx";
import ServiceDirectory from "./components/ServiceDirectory.jsx";
import ServiceDetails from "./components/ServiceDetails.jsx";
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

const titles = {
  directory: "Find a service",
  details: "Service details",
  form: "Appointment details",
  review: "Review your booking",
  confirmation: "Booking confirmed"
};

export default function App() {
  const [step, setStep] = useState("directory");
  const [selectedService, setSelectedService] = useState(null);
  const [booking, setBooking] = useState(initialBooking);
  const [reference, setReference] = useState("");

  const mainRef = useRef(null);
  const isFirstRender = useRef(true);

  // View switches: update the page title and move focus to the new view's <h1>.
  // Skipped on first load so screen readers start reading from the top of the page.
  useEffect(() => {
    document.title = `${titles[step]} | Community Healthcare Clinic`;
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const heading = mainRef.current?.querySelector("h1");
    (heading ?? mainRef.current)?.focus();
  }, [step]);

  function chooseService(service) {
    setSelectedService(service);
    setStep("details");
  }

  function startBooking(service) {
    setSelectedService(service);
    setBooking({ ...initialBooking, practitioner: service.practitioners[0] || "" });
    setStep("form");
  }

  function reviewBooking(details) {
    setBooking(details);
    setStep("review");
  }

  function confirmBooking() {
    setReference(`CHC-${Math.random().toString(36).slice(2, 8).toUpperCase()}`);
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

      <main id="main" className="main-content container" ref={mainRef} tabIndex="-1">
        {step === "directory" && <ServiceDirectory onChoose={chooseService} />}

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
            onBack={() => setStep("form")}
            onConfirm={confirmBooking}
          />
        )}

        {step === "confirmation" && booking && (
          <BookingConfirmation booking={booking} reference={reference} onStartOver={startOver} />
        )}
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <p>
            <strong>Community Healthcare Clinic</strong>
          </p>
          <p>If you need urgent medical help, contact your local emergency service.</p>
        </div>
      </footer>
    </div>
  );
}


