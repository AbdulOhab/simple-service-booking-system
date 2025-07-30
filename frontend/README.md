# Service Booking System - Frontend

A modern React-based frontend application for the Service Booking System, built with Vite, TailwindCSS, and Redux Toolkit for state management.

## Project Overview

This is a responsive web application that provides interfaces for both customers and administrators to manage service bookings. The application features role-based dashboards, authentication, and real-time booking management.

### Core Technologies

- **Framework**: React 19.1.0
- **Build Tool**: Vite
- **Language**: JavaScript (ES6+)
- **Styling**: TailwindCSS 4.1.11

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Backend API running on `http://localhost:8000`

### Installation

1. **Navigate to frontend directory**

   ```bash
   cd frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Access the application**
   ```
   http://localhost:5173
   ```

### Available Scripts

| Script            | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run ESLint               |

## Development Roadmap Current State

### Phase 1: Core Functionality

- ✅ Authentication system (POST /api/register, POST /api/login)
- ✅ Basic routing and navigation
- ✅ Protected routes implementation

### Phase 2: Admin Features

- ✅ Service CRUD operations
  - ✅ POST /api/services – Create a new service
  - ✅ PUT /api/services/{id} – Update service
  - ✅ DELETE /api/services/{id} – Delete service
- ✅ Booking management dashboard
  - ✅ GET /api/admin/bookings – List all bookings

### Phase 3: Customer Features ❌ NOT IMPLEMENTED

- ✅ Service listing
  - ✅ GET /api/services – List available services
- ❌ Booking creation and management
  - ❌ POST /api/bookings – Book a service
  - ❌ GET /api/bookings – List logged-in user's bookings
- ❌ User profile management

**Note**: The backend API is fully functional, but the frontend customer features are not implemented yet. Admin functionality is complete, but customer dashboard needs to be built to consume the customer-specific API endpoints.

_Last updated: July 30, 2025_
