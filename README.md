# Appointo — One Place to Book

A universal appointment-booking MVP for salons, gyms, tutors, doctors, consultants, repair services and other appointment-based businesses.

## What is included

- Modern responsive customer website
- Business discovery with search and category filters
- Business detail pages and service cards
- Date + time-slot booking flow
- Double-booking prevention in the API
- My Bookings page
- Owner dashboard with booking status controls
- Add-business and add-service forms
- Express backend with JSON-file persistence (no PostgreSQL required)
- Ready to migrate to PostgreSQL and real authentication later

## Run locally

### 1. Install Node.js
Use a current LTS version of Node.js.

### 2. Install dependencies
From this folder:

```bash
npm install
npm run install:all
```

### 3. Start both frontend and backend

```bash
npm run dev
```

Frontend: http://localhost:5173
Backend: http://localhost:5000

If you prefer separate terminals:

```bash
npm run server
```

and

```bash
npm run client
```

## Demo behavior

This MVP uses `backend/data/store.json` instead of PostgreSQL so it works without installing a database. Bookings and businesses are persisted to that file while the server is running.

There is intentionally no real password/authentication system in this demo. Before public launch, add secure authentication, PostgreSQL, HTTPS, rate limiting, validation, business ownership checks, payments, email/SMS notifications, and stronger booking concurrency controls.
