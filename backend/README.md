# Service Booking System - Backend API

A comprehensive service booking system built with Laravel 12, featuring role-based authentication, service management, and booking functionality for both customers and administrators.

## Features

-   **User Authentication & Authorization**

    -   Customer registration and login
    -   Admin authentication
    -   Role-based access control
    -   token authentication via Laravel Sanctum

-   **Service Management**

    -   CRUD operations for services
    -   Service status management (active/inactive)
    -   Price and description management

-   **Booking System**

    -   Customer booking creation and management
    -   Admin booking oversight
    -   Booking status tracking (pending, confirmed, cancelled, completed)
    -   Date-based booking system

-   **Admin Panel Features**
    -   User management
    -   Service management
    -   Booking management and approval
    -   System analytics

## 🛠 Tech Stack

-   **Framework**: Laravel 12
-   **PHP Version**: ^8.2
-   **Database**: MySQL
-   **Authentication**: Laravel Sanctum

## 🏗 Installation

1. **Clone the repository**

    ```bash
    git clone <repository-url>
    cd simple-service-booking-system/backend
    ```

2. **Install PHP dependencies**

    ```bash
    composer install
    ```

3. **Install Node.js dependencies**

    ```bash
    npm install
    ```

4. **Environment Setup**

    ```bash
    cp .env.example .env
    php artisan key:generate
    ```

5. **Database Setup**

    ```bash
    Connect database using MySQL throw env
    php artisan migrate
    php artisan db:seed
    ```

6. **Start the development server**

    ```bash
    php artisan serve
    ```

## 🗄 Database Schema

### Users Table

-   `id` - Primary key
-   `name` - User full name
-   `email` - User email (unique)
-   `password` - Hashed password
-   `role` - User role (customer/admin)
-   `email_verified_at` - Email verification timestamp
-   `timestamps`

### Services Table

-   `id` - Primary key
-   `name` - Service name
-   `description` - Service description
-   `price` - Service price (decimal)
-   `status` - Service status (active/inactive)
-   `timestamps`

### Bookings Table

-   `id` - Primary key
-   `user_id` - Foreign key to users
-   `service_id` - Foreign key to services
-   `booking_date` - Date of booking
-   `status` - Booking status (pending/confirmed/cancelled/completed)
-   `timestamps`

## 🔗 API Endpoints

### Authentication

-   `POST /api/register` - Customer registration
-   `POST /api/login` - User login
-   `POST /api/auth/logout` - User logout
-   `GET /api/auth/user` - Get authenticated user

### Customer Routes (Protected)

-   `GET /api/bookings` - List user bookings
-   `POST /api/bookings` - Create new booking
-   `GET /api/bookings/{booking}` - Show booking details
-   `PUT /api/bookings/{booking}` - Update booking
-   `DELETE /api/bookings/{booking}` - Cancel booking
-   `GET /api/services` - List available services

### Admin Routes (Protected)

-   `GET /api/admin/services` - List all services
-   `POST /api/admin/services` - Create new service
-   `GET /api/admin/services/{service}` - Show service details
-   `PUT /api/admin/services/{service}` - Update service
-   `DELETE /api/admin/services/{service}` - Delete service
-   `GET /api/admin/bookings` - List all bookings
-   `PUT /api/admin/bookings/{booking}` - Update booking status

## 🔐 Authentication & Authorization

The system uses Laravel Sanctum for API authentication with role-based access control:

-   **Customer Role**: Can view services, create bookings, and manage their own bookings
-   **Admin Role**: Full system access including user management, service management, and booking oversight
