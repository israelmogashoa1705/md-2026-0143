## Community Healthcare Clinic – Accessible Booking Portal
# Project Overview

The Community Healthcare Clinic Accessible Booking Portal is a React single-page application designed to help community members discover healthcare services and complete a demonstration appointment booking process.

The application includes six healthcare services, a searchable service directory, category filters, detailed service information, practitioner selection, appointment scheduling, contact information, booking review and confirmation.

The project prioritises inclusive interaction through semantic HTML, keyboard navigation, visible focus indicators, accessible form validation and screen reader feedback.

Important: This is an educational prototype. It does not connect to a live clinic system, reserve actual appointment slots, store patient records or transmit personal information.

# Architecture and State Management

The application uses React functional components and hooks.

App.jsx manages the main application workflow using useState. The application progresses through five stages: directory, service details, booking form, review and confirmation.

Selected service information and booking details are maintained at application level so that users can return to previous stages without losing entered information.

ServiceDirectory.jsx uses local state for search queries and category filters. useMemo derives the filtered service list. Category buttons communicate their selected state using aria-pressed, while a polite live region communicates changes to the result count.

Booking components use controlled form inputs. Validation updates React state, which determines inline error messages, aria-invalid attributes and aria-describedby references. Focus is moved to the first invalid field after an unsuccessful submission.

When users move between application stages, heading references and useEffect provide programmatic focus management. This helps users understand that a new section of the application has appeared.

# Accessibility Trade-Off Analysis
3.1 Native HTML Controls Versus Custom Styling

Native HTML controls were selected instead of fully custom dropdowns and form inputs. Although custom controls offer greater visual flexibility, they introduce additional keyboard, focus and screen reader implementation requirements. Native controls provide familiar interaction patterns and browser accessibility support. Custom CSS is therefore limited to presentation without replacing native functionality.

3.2 Live Region Feedback Versus Announcement Overload

Live regions communicate search result changes and validation outcomes to assistive technology users. However, announcing every individual input change could create excessive screen reader interruptions. The application uses polite announcements for routine status updates and an alert for invalid form submission. Inline errors are associated with their respective fields so users can access more detailed information when navigating the form.

3.3 Focus Management Versus Continuous Keyboard Navigation

Moving focus to a new stage heading provides context when the single-page application changes views. However, excessive focus movement can interrupt keyboard navigation. Focus is therefore moved only when the application enters a meaningful new stage or when validation identifies an invalid field. Native browser focus behaviour is retained for ordinary interactions.

# Assistive Technology Architecture

React state controls the application workflow and interface states. These states are reflected in the DOM through conditional rendering and accessibility attributes.

Examples include aria-pressed for category selection, aria-invalid for form errors, aria-describedby for field instructions and error messages, and aria-live for status updates.

The application uses useRef and useEffect to focus stage headings after view transitions. Semantic HTML landmarks, heading hierarchy, associated labels and fieldsets provide additional structural information to the accessibility tree.

# Verification and Testing Audit

The project includes a testing strategy covering component behaviour, keyboard operation, semantic structure and assistive technology compatibility.

Automated testing uses Vitest and React Testing Library. Planned component tests cover service discovery, filtering, category selection and service selection. Accessibility scanning should be performed with axe DevTools or an equivalent axe-core integration.

Manual testing must include keyboard-only navigation and screen reader evaluation using NVDA with Firefox. Additional testing with VoiceOver or another supported screen reader is recommended.

Audit results: Actual Lighthouse and axe results must be recorded after running the completed application. No accessibility score or screen reader compatibility result is claimed without verification.

# Limitations and Future Improvements

Future development could introduce secure server-side appointment management, real practitioner availability, persistent booking records, accessible appointment notifications and broader usability testing with people who use different assistive technologies.

The prototype provides a foundation for an inclusive public healthcare booking service, but formal WCAG conformance requires testing of the complete implementation and all relevant interaction states..
