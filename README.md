# hotel-frontend-website
# Hotel Grand Horizon - Reservation System

A professional, responsive hotel reservation portal built for guests to explore suites, select premium amenities, and manage their bookings. This project features real-time price calculations and a robust, state-managed receipt system.

## Website Type
Hotel Reservation & Booking Website

## Technologies Used
- HTML5
- Tailwind CSS
- JavaScript (ES6+)
- GitHub
- Netlify

## Pages Included
- **Home:** Property overview and call-to-action.
- **About:** Hotel mission and philosophy.
- **Rooms:** Detailed suite tier selection.
- **Gallery:** Visual showcase of the property.
- **Amenities:** Premium service offerings.
- **Booking:** Core reservation form with real-time ledger.
- **Contact:** Guest support and inquiries.

## Features
- **Responsive Design:** Seamless experience across mobile, tablet, and desktop.
- **Real-Time Ledger:** Dynamic price calculations based on room tier, duration, and selected amenities.
- **Form Validation:** Client-side JavaScript validation for secure booking inputs.
- **State-Managed Receipt Modal:** A professional booking confirmation system with the ability to print or cancel reservations.
- **Deep-Clean UI Logic:** Automated system reset (`purgeAndResetForm`) to ensure modal states, styles, and form data are fully cleared between bookings.
- **SEO Optimized:** Structured meta-tags and accessible image alt-text.

## How to Run
1. Clone this repository to your local machine.
2. Open `index.html` in any modern web browser.
3. For real-time updates while coding, use the **Live Server** extension in VS Code.

## Rectification & Stability Fixes
- **Modal State Persistence:** Rectified bugs where "Booking Cancelled" states would persist into new bookings by implementing a factory-reset function that clears CSS classes, text content, and button visibility.
- **Animation Syncing:** Resolved UI "blank screen" issues by integrating a smooth exit animation timeout with a form-clearing function.
- **Blocking Alert Removal:** Replaced system-level `alert()` calls with dynamic DOM updates to prevent browser-freezing during booking confirmation/cancellation.

## Netlify Deployment Steps
1. Create a GitHub repository and push all project files.
2. Log in to your [Netlify](https://www.netlify.com/) account.
3. Click **"Add new site"** > **"Import an existing project"**.
4. Connect your GitHub repository.
5. Click **"Deploy"**.
6.
