# WalletPass — Digital Pass Manager

A single-page web application for creating, managing, and sharing customizable QR-coded digital tickets/passes.

## Features

- **Ticket Creation** — Form with event name, category, date/time, venue, seat, holder name, notes, and color theme
- **User-Defined Categories** — Create categories with custom emoji and color labels
- **Live Preview** — See your ticket card update in real-time as you fill out the form
- **QR Code Generation** — Each ticket gets a unique ID encoded as a QR code
- **QR Code Download** — Download QR codes as PNG files
- **Sharing** — Share tickets via Web Share API (mobile) or clipboard link (desktop)
- **Filtering & Search** — Filter by category, date (upcoming/past), search by event or venue
- **Sorting** — Sort tickets by date ascending or descending
- **Expired Tickets** — Past-date tickets are visually dimmed with an "EXPIRED" badge
- **Persistent Storage** — All data saved in localStorage (no backend required)

## Tech Stack

- **React** with Vite
- **qrcode.react** for QR code generation
- **uuid** for unique ticket IDs
- **localStorage** for data persistence

## Getting Started

### Development

```bash
npm install
npm run dev
```

### Production Build

```bash
npm run build
npm run preview
```

### Docker

```bash
docker compose up --build
```

The app will be available at `http://localhost:3000`.

## Design

- Minimal light theme with cream/white backgrounds
- DM Serif Display (headings) + DM Sans (body) typography
- Ticket cards with decorative perforation and dynamic color themes
- Responsive layout for desktop and mobile
