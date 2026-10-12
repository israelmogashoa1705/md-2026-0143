# WCAG 2.1 AA Mapping Matrix

| Criterion | Interface component | Implementation | Verification |
|---|---|---|---|
| 1.3.1 Info and Relationships | Page landmarks, headings, forms | Semantic HTML, ordered headings, fieldsets and legends | Inspect DOM and accessibility tree |
| 1.4.3 Contrast (Minimum) | Body text, buttons, error messages | Verified foreground/background combinations | Measure contrast ratios |
| 1.4.11 Non-text Contrast | Input borders, focus indicators, controls | Clearly distinguishable component boundaries and states | Contrast analyser and visual inspection |
| 2.1.1 Keyboard | Navigation, filters, booking controls | Native links, buttons, inputs and logical DOM order | Complete workflow using keyboard only |
| 2.4.3 Focus Order | Booking stages and interactive controls | DOM order follows the visual and task sequence | Record Tab and Shift+Tab sequence |
| 2.4.7 Focus Visible | Links, buttons, fields | Visible :focus-visible outline | Tab through all controls |
| 3.3.1 Error Identification | Booking form | Textual field errors and aria-invalid | Submit invalid values and inspect output |
| 3.3.2 Labels or Instructions | Form inputs | Associated labels, helper text, required-field guidance | Inspect label associations and accessible names |
| 4.1.2 Name, Role, Value | Filter buttons and controls | Native controls and synchronized ARIA states | Inspect accessibility tree and toggle states |
| 4.1.3 Status Messages | Search count, validation, confirmation | Appropriate role=status live announcements | Test with NVDA or VoiceOver |