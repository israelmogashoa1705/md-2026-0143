import { useEffect, useRef, useState } from "react";
import Header from "./components/Header.jsx";
import ServiceDirectory from "./components/ServiceDirectory.jsx";
import ServiceDetails from "./components/ServiceDetails.jsx";
import BookingForm from "./components/BookingForm.jsx";
import BookingReview from "./components/BookingReview.jsx";
import BookingConfirmation from "./components/BookingConfirmation.jsx";

export default function App() {
  const [step, setStep] = useState("directory");
  const [selectedService, setSelectedService] = useState(null);
  const [booking, setBooking] = useState(null);
  const [reference, setReference] = useState("");
  const mainRef = useRef(null);

  useEffect(() => {
    if (step === "directory") mainRef.current?.focus();
  }, [step]);

  function chooseService(service) {
    setSelectedService(service);
    setStep("form");
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function reviewBooking(details) {
    setBooking(details);
    setStep("review");
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function confirmBooking() {
    const generatedReference = `CHC-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    setReference(generatedReference);
    setStep("confirmation");
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function startOver() {
    setStep("directory");
    setSelectedService(null);
    setBooking(null);
    setReference("");
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  return (
    <div className="app-shell">
      <Header onHome={startOver} />
      <main id="main" className="main-content container" ref={mainRef} tabIndex="-1">
        {step === "directory" && <ServiceDirectory onChoose={chooseService} />}
        {step === "form" && selectedService && <BookingForm service={selectedService} onBack={() => setStep("directory")} onReview={reviewBooking} />}
        {step === "review" && booking && <BookingReview booking={booking} onBack={() => setStep("form")} onConfirm={confirmBooking} />}
        {step === "confirmation" && booking && <BookingConfirmation booking={booking} reference={reference} onStartOver={startOver} />}
      </main>
      <footer className="site-footer">
        <div className="container footer-inner">
          <p><strong>Community Healthcare Clinic</strong></p>
          <p>If you need urgent medical help, contact your local emergency service.</p>
        </div>
      </footer>
    </div>
  );
}

