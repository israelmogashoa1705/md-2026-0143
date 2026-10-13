# Community Healthcare Clinic — Accessible Booking Portal

## Project overview

This coursework project is a React single-page application for exploring community healthcare services and completing a demonstration appointment flow. It includes a service directory, search and category filters, practitioner selection, date and time selection, a contact form, a review step, and a confirmation screen. The confirmation is generated locally; the application does not connect to a clinic, save records to a server, send email, or reserve real appointment slots.

## Requirements

- Node.js (current LTS recommended)
- npm
- Visual Studio Code or another code editor

## Run the project

1. Extract the project folder.
2. Open the folder in VS Code.
3. Open Terminal → New Terminal.
4. Install dependencies:

   ```bash
   npm install
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open the local URL shown in the terminal, usually `http://localhost:5173`.
7. To check whether the app builds, run `npm run build`.

## Project structure

```text
community-healthcare-clinic/
├── index.html
├── package.json
├── README.md
├── persona.md
├── wcag-matrix.md
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── styles.css
│   ├── data/
│   │   └── services.js
│   └── components/
│       ├── Header.jsx
│       ├── ServiceDirectory.jsx
│       ├── BookingForm.jsx
│       ├── BookingReview.jsx
│       └── BookingConfirmation.jsx
└── wireframes/
    ├── index.html
    ├── listing.html
    ├── booking.html
    └── main.css
```

## Architecture and state

`App.jsx` owns the overall workflow state: directory, form, review, and confirmation. It also stores the selected service, booking details, and generated demo reference. Keeping this state at the top level makes it possible to pass booking information between screens and retain details when a user returns to edit the form. `ServiceDirectory.jsx` owns the temporary search query and category filter because these values only affect the directory. The service data is kept separately in `src/data/services.js` so that service descriptions and practitioner options can be maintained without rewriting the UI.

This is a small prototype, so state is held in React rather than a routing library or database. That keeps the application understandable for coursework and avoids unnecessary dependencies. The trade-off is that refreshing the page clears the booking, and the demo reference is not a real reservation.

## Accessibility decisions and trade-offs

The application uses native HTML controls, visible labels, semantic landmarks, heading structure, a skip link, and a visible keyboard focus style. Category filters expose their state with `aria-pressed`. Search results are announced through a status region. Form errors are shown in an error summary and beside the relevant fields, with `aria-invalid` and `aria-describedby` where errors exist. The review step lets users check information before confirming. The heading in each new stage receives focus to help orient keyboard and assistive-technology users.

The design aims to support WCAG 2.2 AA practices, but code alone does not prove conformance. Browser behavior and assistive technology vary, so keyboard and screen-reader checks remain necessary. The included `wcag-matrix.md` lists verification steps and a manual test log template. Complete the log with actual results after testing with keyboard navigation, a screen reader if available, responsive viewports, and axe or Lighthouse. Do not report an audit score until you have run the audit.

## Static wireframes

Open `wireframes/index.html` in a browser to view the discovery wireframe. Use its navigation to open the service listing and booking form wireframes. These are static HTML/CSS layouts and are separate from the React application.
