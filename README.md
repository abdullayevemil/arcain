# Student Housing Platform

A production-ready web app for students to find rental housing and roommates. Landlords can post and manage listings; students can browse, filter, search, and view details.

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- ShadCN UI
- JSON file storage (no external database)

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Demo Accounts

| Role     | Email              | Password    |
|----------|--------------------|-------------|
| Student  | alex@student.com   | student123  |
| Landlord | jordan@landlord.com| landlord123 |

Students are redirected to `/` after login; landlords to `/admin`.

## Features

- **Public:** Home, About, Contact, Cities, Houses (filter, search, sort, pagination), House details
- **Auth:** Login / Register (role: student or landlord), cookie-based session
- **Admin (landlords):** Dashboard, manage houses (CRUD + image URLs), cities (CRUD), users (CRUD)
- **Image upload:** Simulated via JSON; add image URLs in admin house form (or use placeholder buttons)

## Project Structure

- `src/app/` – App Router pages and API routes
- `src/components/` – UI and layout components
- `src/data/` – JSON data (houses, cities, users)
- `src/lib/` – Data helpers and utils
- `src/types/` – TypeScript types
