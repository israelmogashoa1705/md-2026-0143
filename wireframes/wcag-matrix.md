# WCAG 2.1 AA Mapping Matrix

**Ticket:** MD-2026-0143 · **Project:** Community Healthcare Clinic, Accessible Booking Portal
**Scope:** Wireframes (`/wireframes/*.html`, `main.css`) and the React prototype (`/src`)

Every contrast figure below was computed with the WCAG 2.1 relative-luminance formula, not estimated.

## 1. Success criteria matrix

| # | Criterion (ID and name) | Level | Target component | Technical implementation | Verification strategy |
|---|---|---|---|---|---|
| 1 | **1.1.1** Non-text Content | A | Brand mark, service icons, success tick | Decorative glyphs (`✚`, `✓`, brand mark) carry `aria-hidden="true"`. Meaning is always conveyed by adjacent text ("Your booking is confirmed"). | Inspect accessibility tree: no unnamed images or stray glyph announcements. Run axe rule `image-alt`. |
| 2 | **1.3.1** Info and Relationships | A | Page structure, forms, summaries | Landmarks `header`, `nav`, `main`, `section`, `article`, `footer`. One `h1` per view, with `h2` below it. Forms use `fieldset`/`legend`. Booking summaries use `dl/dt/dd`. Search wrapped in `role="search"`. | Screen-reader landmark list (NVDA `D`, VoiceOver rotor). Headings list (`H`). axe rules `landmark-one-main`, `heading-order`, `region`. |
| 3 | **1.3.5** Identify Input Purpose | AA | Name, email, phone fields | `autocomplete="name"`, `"email"`, `"tel"` on the matching inputs. | Inspect DOM. Browser autofill populates the fields. axe rule `autocomplete-valid`. |
| 4 | **1.4.3** Contrast (Minimum) | AA | All text and button labels | Palette checked against the table in section 2. Lowest body-text ratio is 4.86:1 (placeholder text). All other text is 5.6:1 or higher. | Contrast ratios in section 2. Lighthouse and axe `color-contrast`. |
| 5 | **1.4.4** Resize Text | AA | Whole interface | Sizes in `rem`/`em`/`clamp()`, no fixed-height text containers. Inputs use `min-height`, not `height`. | Browser zoom to 200%: no clipped or overlapping content. |
| 6 | **1.4.10** Reflow | AA | Layout, service grid, forms | Single column below 760px via CSS grid. `min-width: 320px`. Rows use `minmax(0, 1fr)` and `overflow-wrap: anywhere` to prevent horizontal scrolling. | Viewport at 320 CSS px (400% zoom of 1280px): no horizontal scroll. |
| 7 | **1.4.11** Non-text Contrast | AA | Input borders, focus ring, filter buttons, secondary buttons | Focus ring `#a44300` is 6.21:1 on white. Input border `#6b837f` is 4.06:1. Button and chip borders `#5f7b77` are 4.58:1 (see section 3). | Contrast analyser on every border and indicator. axe plus visual check. |
| 8 | **1.4.12** Text Spacing | AA | Body copy, cards | No fixed heights on text blocks. Line-height is 1.45 to 1.7 by default. | Apply the Text Spacing bookmarklet: no clipped or overlapping text. |
| 9 | **2.1.1** Keyboard | A | Filters, cards, forms, wizard buttons | Native `button`, `a`, `input`, `select`, `textarea` only. No `div onClick`. Every action works with Enter or Space. | Complete the whole journey (search, filter, details, book, review, confirm) with keyboard only. |
| 10 | **2.1.2** No Keyboard Trap | A | Whole SPA | No modals or custom widgets that capture focus. Focus can always Tab out of any control. | Tab and Shift+Tab through the full page and each step. |
| 11 | **2.4.1** Bypass Blocks | A | Page header | "Skip to main content" link is the first focusable element. It is hidden off-screen and slides into view on `:focus`. It targets `#main`, which has `tabIndex="-1"`. | Press Tab on page load. Activate the link and confirm focus lands in `main`. |
| 12 | **2.4.2** Page Titled | A | Each wireframe page | Unique `<title>` per wireframe. SPA title is set in `index.html`. | Inspect `<title>`. |
| 13 | **2.4.3** Focus Order | A | Wizard steps (details, form, review, confirmation) | DOM order matches visual order. On each step change, focus moves to that step's `h1` (`ref` + `tabIndex="-1"` + `useEffect`). | Record Tab sequence per screen. Confirm a screen reader reads the new heading on each transition. |
| 14 | **2.4.6** Headings and Labels | AA | Headings, form labels | Headings describe the topic of each section. Labels describe the purpose of each field. Required fields are marked with `*` (`aria-hidden`) plus the helper text "required". | Review the headings list and the form field list in a screen reader. |
| 15 | **2.4.7** Focus Visible | AA | Links, buttons, fields | `:focus-visible { outline: 3px solid #a44300; outline-offset: 3px; }`. Browser outlines are never removed without replacement. | Tab through every control. Confirm the ring is visible on white, tinted and dark backgrounds. |
| 16 | **3.1.1** Language of Page | A | `<html>` | `lang="en"` on every page, including the React `index.html`. | Inspect DOM. axe rule `html-has-lang`. |
| 17 | **3.2.2** On Input | A | Filter chips, selects, date field | Changing a select or typing never navigates or submits. Only explicit buttons advance the wizard. | Change each control and confirm the context does not change. |
| 18 | **3.3.1** Error Identification | A | Booking form | Errors are shown as text beside the field (`.field-error`), with `aria-invalid="true"` and `aria-describedby` pointing at the error id. An error summary at the top links to each invalid field. | Submit an empty form. Confirm each field and the summary are announced. |
| 19 | **3.3.2** Labels or Instructions | A | Booking form | Every input has `<label htmlFor>`. Optional fields say "(optional)". Helper text is linked with `aria-describedby`. | Inspect label associations and accessible names. axe rules `label`, `form-field-multiple-labels`. |
| 20 | **3.3.3** Error Suggestion | AA | Email, date, phone | Messages explain the fix ("Enter an email address in a valid format", "Choose today or a future date"). | Enter bad values and read the messages. |
| 21 | **3.3.4** Error Prevention (Legal, Financial, Data) | AA | Booking flow | Two-step flow: form, then a review page, then explicit "Confirm booking". Users can go back and edit without losing entered data. | Walk the flow. Confirm entered values are retained after Back. |
| 22 | **4.1.2** Name, Role, Value | A | Filter chips, wizard buttons, form controls | Category chips are native buttons with `aria-pressed="true/false"`, driven from React state. Form state is exposed through `aria-invalid`. | Toggle each chip and inspect the accessibility tree. Unit test asserts `aria-pressed`. |
| 23 | **4.1.3** Status Messages | AA | Result count, form errors, confirmation | Result count is in a `role="status"` region (polite). Per-field validation and availability changes use a polite `role="status"` region. The error summary takes focus on a failed submit. | Test in NVDA and VoiceOver: count announced after filtering, errors announced on submit, no focus change on filter. |

That is 23 criteria, against a minimum of 5.

## 2. Computed contrast values

Formula: `(L1 + 0.05) / (L2 + 0.05)` with sRGB relative luminance. Thresholds: 4.5:1 body text, 3:1 large text and UI components.

| Foreground | Background | Ratio | Use | Result |
|---|---|---|---|---|
| `#173331` | `#ffffff` | 13.51:1 | Body text on cards | Pass |
| `#173331` | `#f5f8f7` | 12.64:1 | Body text on page | Pass |
| `#526765` | `#ffffff` | 6.02:1 | Muted text | Pass |
| `#526765` | `#f5f8f7` | 5.64:1 | Muted text on page | Pass |
| `#405956` | `#ffffff` | 7.55:1 | Card description text | Pass |
| `#304d49` | `#e2f1ee` | 7.90:1 | Hero lead text | Pass |
| `#637572` | `#ffffff` | 4.86:1 | Placeholder text | Pass |
| `#ffffff` | `#0b5d57` | 7.73:1 | Primary button | Pass |
| `#ffffff` | `#08433f` | 11.14:1 | Primary button hover | Pass |
| `#0b5d57` | `#e2f1ee` | 6.64:1 | Icon glyph on tint | Pass |
| `#075a76` | `#ffffff` | 7.68:1 | Links | Pass |
| `#075a76` | `#f5f8f7` | 7.19:1 | Links on page | Pass |
| `#08433f` | `#edf6f4` | 10.13:1 | Secondary button hover | Pass |
| `#a32222` | `#ffffff` | 7.48:1 | Invalid-field border | Pass (3:1 needed) |
| `#8d1c1c` | `#ffffff` | 9.07:1 | Field error text | Pass |
| `#761818` | `#fff1f0` | 9.97:1 | Error summary text | Pass |
| `#155b38` | `#d8f1e4` | 6.82:1 | Success tick | Pass |
| `#e0eeeb` | `#173331` | 11.32:1 | Footer small text | Pass |
| `#ffffff` | `#173331` | 13.51:1 | Footer text | Pass |
| `#a44300` | `#ffffff` | 6.21:1 | Focus ring | Pass (3:1 needed) |
| `#a44300` | `#f5f8f7` | 5.81:1 | Focus ring on page | Pass (3:1 needed) |
| `#6b837f` | `#ffffff` | 4.06:1 | Input border | Pass (3:1 needed) |
| `#5f7b77` | `#ffffff` | 4.58:1 | Chip and secondary button border | Pass (3:1 needed) |

## 3. Defects found by the contrast audit, and fixes applied

| Defect | Criterion | Fix |
|---|---|---|
| Filter-chip and secondary-button borders `#8aa9a4` were 2.53:1 on white | 1.4.11 | Changed to `#5f7b77` (4.58:1) in `src/styles.css` |
| Input borders `#819895` passed by only 0.06 (3.06:1) | 1.4.11 | Darkened to `#6b837f` (4.06:1) in both stylesheets |
| Wireframe CSS comments held rounded estimates | Brief, Part A | Replaced with computed ratios in `wireframes/main.css` |
| Error summary used `role="alert"` plus `aria-labelledby` (double announcement) | 4.1.3 | Now `role="group"` with a label; it takes focus on failed submit. Field-level outcomes use the polite live region |
| Helper text was not linked to inputs | 3.3.2 | Each hint has an id and is joined to `aria-describedby` with the error id |

## 4. Manual test log (fill in after running; do not submit blank)

| Test | Tool | Result | Date |
|---|---|---|---|
| Automated scan, landing | axe / Lighthouse | | |
| Automated scan, booking | axe / Lighthouse | | |
| Keyboard-only full journey | Chrome, Tab/Shift+Tab/Enter/Space | | |
| Screen reader, filter + count | NVDA + Firefox | | |
| Screen reader, form errors | NVDA or VoiceOver | | |
| 200% zoom and 320px reflow | Browser | | |
