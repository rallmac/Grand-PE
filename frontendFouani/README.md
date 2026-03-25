# Grand-PE Frontend

A modern ecommerce frontend built with Next.js 14, TypeScript, and Tailwind CSS.

This project showcases a polished shopping experience with category filtering, product detail pages, and a localStorage-backed cart flow.

## Highlights

- App Router architecture with reusable UI sections for a scalable storefront
- Product catalog experience: home promos, category filtering, and product detail pages
- Cart experience with quantity updates, subtotal calculation, and persistent state
- Local font integration (Poppins family) for consistent brand presentation
- Tailwind-powered styling with responsive layouts across pages

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- `embla-carousel-react` for carousel interactions
- `lucide-react` for iconography

## Project Routes

- `/` — Home page with hero, promos, featured products, and brand sections
- `/categories` — Product listing with sidebar-based category filters
- `/product/[slug]` — Dynamic product details
- `/cart` — Shopping cart and order summary

## Getting Started

### Prerequisites

- Node.js 18+ (recommended)
- npm 9+ (or compatible)

### Installation

```bash
npm install
```

### Run in Development

```bash
npm run dev
```

Then open `http://localhost:3000`.

## Available Scripts

- `npm run dev` — Start development server
- `npm run build` — Create production build
- `npm run start` — Start production server
- `npm run lint` — Run lint checks

## Folder Overview

```text
app/            # App Router pages and layout
components/     # Reusable UI components
data/           # Mock catalog data (products, categories, brands)
lib/            # Shared app logic (cart provider/state, utilities)
public/         # Static assets (images, fonts)
styles/         # Global style extensions
```

## Cart Behavior

- Cart state is managed via `CartProvider` in `lib/cart.tsx`
- Items are persisted in `localStorage` under the `cart` key
- Quantity changes and totals are computed client-side

## Configuration Notes

- Next.js image domain allowlist includes `placehold.co` in `next.config.js`
- Local Poppins font files are loaded via `next/font/local` in `app/layout.tsx`

## Status

This frontend currently uses local/mock data sources and is ready for integration with a backend API when needed.
