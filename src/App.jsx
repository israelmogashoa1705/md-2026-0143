import { useState } from "react";
import Header from "./components/Header.jsx";
import ServiceDirectory from "./components/ServiceDirectory.jsx";
import BookingForm from "./components/BookingForm.jsx";
import BookingConfirmation from "./components/BookingConfirmation.jsx";
import "./styles.css";

function App() {
  const [selectedService, setSelectedService] = useState(null);
  const [booking, setBooking] = useState(null);

  function startOver() {
    setSelectedService(null);
    setBooking(null);
  }

  return (
    <>
      <Header />

      <main id="main" className="container main-content">
        {!selectedService && (
          <ServiceDirectory onChooseService={setSelectedService} />
        )}

        {selectedService && !booking && (
          <BookingForm
            service={selectedService}
            onReview={setBooking}
            onCancel={startOver}
          />
        )}
      </main>

      <footer className="site-footer">
        <div className="container">
          <p>Community Clinic — Accessible Booking Prototype</p>
        </div>
      </footer>
    </>
  );
}

export default App;
