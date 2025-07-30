# Simple Service Booking System

A full-stack web application for managing service bookings with role-based authentication, built with Laravel backend and React frontend.

## Project Overview

This project is a comprehensive service booking system that allows:

- **Customers** to browse services and make bookings
- **Administrators** to manage services and oversee all bookings
- **Role-based authentication** with secure API endpoints
- **Modern, responsive UI** with real-time updates

## Tech Stack

### Backend

- **Framework**: Laravel 12
- **Authentication**: Laravel Sanctum
- **Database**: MySQL
- **API**: RESTful API with JSON responses

### Frontend

- **Framework**: React 19.1.0
- **Build Tool**: Vite
- **Styling**: TailwindCSS 4.1.11
- **State Management**: Redux Toolkit
- **HTTP Client**: Axios

## Project Structure

```
simple-service-booking-system/
├── backend/                    # Laravel API Backend
│   ├── app/Models/            # Eloquent Models (User, Service, Booking)
│   ├── app/Http/Controllers/  # API Controllers
│   ├── database/migrations/   # Database Schema
│   ├── routes/api.php         # API Routes
│   └── ...
├── frontend/                  # React Frontend
│   ├── src/
│   │   ├── auth/             # Authentication Components
│   │   ├── pages/            # Main Page Components
│   │   ├── components/       # Reusable Components
│   │   └── api/              # API Service Functions
│   └── ...
├── api-documentation.md       # Complete API Documentation
└── README.md                 # This file
```

## uick Start Guide

### Prerequisites

- PHP 8.2+
- Composer
- Node.js 18+ & npm
- Git

### 1. Clone Repository

```bash
git clone https://github.com/AbdulOhab/simple-service-booking-system.git
cd simple-service-booking-system
```

### 2. Backend Setup (Laravel)

```bash
cd backend

# Install PHP dependencies
composer install

# Install Node dependencies for asset compilation
npm install

# Environment setup
cp .env.example .env
php artisan key:generate

# Database setup
touch database/database.sqlite
php artisan migrate --seed

# Start backend server
php artisan serve
```

**Backend will be running at:** `http://localhost:8000`

### 3. Frontend Setup (React)

```bash
# Open new terminal
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

**Frontend will be running at:** `http://localhost:5173`

### 4. Test the Application

#### Test Admin Account:

- **Email**: `admin@gmail.com`
- **Password**: `admin12345`

#### Test User Account:

- **Email**: `wahab@example.com`
- **Password**: `password`

#### Create Customer Account:

- Visit: `http://localhost:5173/register`
- Register with any email and password

## Current Implementation Status

### **Completed Features**

#### Backend API (100% Complete)

- ✅ User authentication (register/login)
- ✅ Admin service management (CRUD)
- ✅ Admin booking management
- ✅ Customer booking operations
- ✅ Role-based access control
- ✅ Complete API documentation

#### Frontend (70% Complete)

- ✅ Authentication system
- ✅ Protected routing
- ✅ Admin dashboard with service management
- ✅ Responsive design
- ✅ Modern UI with TailwindCSS

### **API Endpoints Status**

| Endpoint                   | Method          | Status     | Frontend Integration |
| -------------------------- | --------------- | ---------- | -------------------- |
| `/api/register`            | POST            | ✅ Working | ✅ Implemented       |
| `/api/login`               | POST            | ✅ Working | ✅ Implemented       |
| `/api/services` (Admin)    | POST/PUT/DELETE | ✅ Working | ✅ Implemented       |
| `/api/admin/bookings`      | GET             | ✅ Working | ✅ Implemented       |
| `/api/services` (Customer) | GET             | ✅ Working | ❌ Not Integrated    |
| `/api/bookings` (Customer) | POST/GET        | ✅ Working | ❌ Not Integrated    |

## Documentation

- **API Documentation**: [api-documentation.md](./api-documentation.md)
- **Backend README**: [backend/README.md](./backend/README.md)
- **Frontend README**: [frontend/README.md](./frontend/README.md)

## Repository Information

**Repository**: [[GitHub](https://github.com/AbdulOhab/simple-service-booking-system.git)]

---

### Dev Details

**Name**: Abdul Wahab  
**Email**: [abdulohab059@gmail.com](mailto:abdulohab059@gmail.com)  
**GitHub**: [@AbdulOhab](https://github.com/AbdulOhab)

_Developed as part of Mid-Level Laravel Developer Task - July 2025_
