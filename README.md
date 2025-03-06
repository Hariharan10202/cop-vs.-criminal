This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

<!-- page.tsx (Landing Page) -->

This is the main landing page of the Fugitive Capture Game. It contains a title and a button to start the game. Clicking the Start Chase button navigates to the city selection page.

<!-- city-selection.tsx (City Selection Page) -->

This page allows players to select cities for three police officers. It retrieves available cities using a query and ensures valid selections using form validation with Zod and React Hook Form. Upon submission, selected cities are saved, and the user is navigated to the next step (vehicle selection).

<!-- SelectComponent.tsx (Custom Select Dropdown) -->

A reusable select dropdown component used in the city selection page. It integrates with React Hook Form, displays city images, and ensures unique selections per cop. Disabled options prevent duplicate selections.

<!-- data.ts (City Selection Data Actions) -->

Handles saving city selections in the database. It first clears existing selections and then assigns cities to three police officers. If an error occurs, an error message is returned.

<!-- vehicle-selection.tsx (Vehicle Selection Page) -->

This page allows players to assign a vehicle to each cop. It retrieves available vehicle options using a query and ensures valid selections using Zod and React Hook Form. Upon submission, the selected vehicles are saved, and the user is redirected to the result page.

Uses React Hook Form for managing form state and validation.
Fetches available vehicles using TanStack Query.
Prevents duplicate selections across cops.
Displays an error message if validation fails.
saveVehicleSelections.ts (Vehicle Selection Data Actions)
This function updates the selected vehicle for each cop in the database.

Extracts the vehicle ID from the selection.
Updates the corresponding cop’s vehicle in the database.
Returns success or an error message if the update fails.

<!-- result.tsx (Game Result Page) -->

This page displays the outcome of the game, determining whether the fugitive was captured or escaped. It fetches the result using checkCapture() and dynamically renders the outcome.

If the fugitive is captured, it shows:
The cop responsible.
The vehicle used.
The city where the capture occurred.
If the fugitive escapes, it provides an option to re-investigate or play again.
Uses Next.js Image for visual representation of the results.
checkCapture.ts (Capture Logic)
This function determines if any cop successfully captures the fugitive.

Randomly selects a city where the fugitive is hiding.
Retrieves all cops with their assigned city and vehicle.
Checks if any cop is in the same city and has a vehicle with enough range to cover the required distance.
Returns the capturing cop if a match is found, otherwise returns null (indicating escape).
