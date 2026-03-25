Project files of Grand-PE Global Limited.
both for the frontend and backend
Kindly view the readme for the frontend
and backend of the project


# Grand-PE Global Limited Platform

Monorepo for Grand-PE Global Limited containing:

- **Frontend**: Next.js e-commerce web app
- **Backend**: NestJS API (planned/active service for products, categories, cart, orders, auth, etc.)

---

## Project Structure


Grand-PE/
├── frontend/      # Next.js frontend
├── backend/       # NestJS API backend
└── [README.md](http://_vscodecontentref_/0)      # This file (overall project readme)

## Tech Stack
Frontend
Next.js (App Router)
TypeScript
Tailwind CSS
Backend
NestJS
TypeScript
PostgreSQL + Prisma or TypeORM
Redis for caching/session enhancements

## Prerequisites
Install the following before running locally:

Node.js 20+ (LTS recommended)
npm / yarn / pnpm
Git
(Backend) Database engine if required by your backend setup (e.g., PostgreSQL)

## Getting Started
1) Clone Repository
git clone <your-repo-url>
cd Grand-PE
2) Setup Frontend
cd frontend
npm install
npm run dev

Frontend should run on: http://localhost:3000

3) Setup Backend (NestJS)
If backend is already scaffolded:
cd ../backend
npm install
npm run start:dev

## Backend default URL:
http://localhost:3001











