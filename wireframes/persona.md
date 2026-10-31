Assistive Technology User Persona
Community Healthcare Clinic – Accessible Booking Portal
1. Persona Overview

Name: Lerato Maseko
Age: 34
Occupation: Administrative Assistant
Location: Pretoria, South Africa
Primary accessibility requirement: Screen reader and keyboard-only navigation
Digital confidence: Intermediate

Lerato is an administrative assistant who regularly uses online public services. She has a visual impairment and relies on screen reader technology to navigate websites, complete forms and access important information.

She needs to book healthcare appointments independently without depending on another person to interpret visual information or operate website controls.

2. Technical Configuration
Configuration	Description
Operating system	Windows 11
Browser	Mozilla Firefox
Assistive technology	NVDA Screen Reader
Input device	Standard keyboard
Navigation method	Tab, Shift+Tab, Enter, Space and arrow keys
Display	Laptop with screen magnification available
Internet connection	Standard broadband

This configuration represents one realistic assistive technology environment. Actual user configurations may differ.

3. Accessibility Requirements

Lerato requires:

A logical heading hierarchy that allows her to navigate between sections.
Clearly identified page landmarks such as header, navigation, main and footer.
Descriptive labels for all form controls.
Screen reader announcements when search results change.
Clear identification of required and invalid form fields.
Keyboard-accessible search and category filters.
Visible focus indicators when navigating.
Predictable focus movement when the application changes between booking stages.
Clear confirmation information after completing an appointment request.
4. Primary Goals
Discover the healthcare services offered by the clinic.
Search for an appropriate service without unnecessary navigation.
Read practitioner and appointment information.
Select an appointment date and time.
Complete the booking form independently.
Review submitted information before confirmation.
Receive an understandable booking reference.
5. Pain Points With Conventional Websites

Lerato frequently experiences the following problems:

Unlabelled form controls: Some websites use placeholder text instead of persistent labels, making it difficult to understand the purpose of fields.

Poor keyboard navigation: Interactive elements sometimes cannot be accessed using the keyboard, or focus moves unpredictably.

Inaccessible dynamic content: Search results and validation messages sometimes change without being announced by the screen reader.

Unclear validation: Error messages are occasionally displayed visually without being associated with their corresponding input fields.

Inadequate focus management: When a new page section or booking stage appears, focus may remain in an irrelevant location.

Poor contrast: Low-contrast text makes information difficult to read, even when magnification is available.

6. Assistive Technology Needs and Project Responses
User need	Proposed implementation
Understand page structure	Semantic HTML5 landmarks
Skip repeated navigation	Skip-to-main-content link
Identify controls	Explicit HTML labels
Understand validation	aria-invalid and aria-describedby
Hear changing results	aria-live="polite"
Understand filter selection	aria-pressed
Follow application stages	Programmatic heading focus
Identify keyboard position	Visible :focus-visible styling
Understand confirmation	Accessible confirmation heading and summary
7. Definition of a Successful Experience

The project will be successful for Lerato when she can complete the entire healthcare service discovery and appointment workflow using only her keyboard and screen reader.

She must be able to identify every interactive control, understand validation feedback, review her information and locate her booking reference without relying on visual interaction.

8. Persona Limitations

This persona represents one type of assistive technology user. It does not represent every disability or accessibility requirement.

Further usability evaluation should include keyboard-only users, screen magnification users, people with cognitive disabilities and users of different screen readers and browsers.