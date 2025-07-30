# Service Booking System API Documentation

A comprehensive REST API for managing service bookings with role-based authentication, service management, and booking operations.

## Table of Contents

- [Authentication](#-authentication)
- [Services Management (Admin)](#-services-management-admin)
- [Customer Bookings](#-customer-bookings)
- [Admin Bookings](#-admin-bookings)
- [Error Responses](#-error-responses)

---

## Authentication

This API uses Bearer Token authentication (Laravel Sanctum). Include the token in the Authorization header:

### Register New Customer

**Endpoint:** `POST /register`

**Request Body:**

```json
{
  "name": "Abdul Wahab",
  "email": "wahab@example.com",
  "password": "password",
  "password_confirmation": "password"
}
```

**Success Response:** `201 Created`

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": 2,
      "name": "Abdul Wahab",
      "email": "wahab@example.com",
      "role": "customer",
      "is_active": null,
      "email_verified_at": null,
      "created_at": "2025-07-28 21:06:09",
      "updated_at": "2025-07-28 21:06:09"
    },
    "token": "1|PmvSdFnNYpulJQpprjcDzmxwZu5YGSgTwYbQGZ9Vdea9d91a",
    "token_type": "Bearer"
  }
}
```

### User Login

**Endpoint:** `POST /login`

**Request Body:**

```json
{
  "email": "wahab@example.com",
  "password": "password"
}
```

**Success Response:** `200 OK`

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 2,
      "name": "Abdul Wahab",
      "email": "wahab@example.com",
      "role": "customer",
      "is_active": true,
      "email_verified_at": null,
      "created_at": "2025-07-28 21:06:09",
      "updated_at": "2025-07-28 21:06:09"
    },
    "token": "2|YBmjg5Rd0JB9AkDChiCcjmw99idVOrBzeoxUr59W5ce85c2e",
    "token_type": "Bearer"
  }
}
```

**Error Response:** `422 Unprocessable Entity`

```json
{
  "message": "The provided credentials are incorrect.",
  "errors": {
    "email": ["The provided credentials are incorrect."]
  }
}
```

### User Logout

**Endpoint:** `POST /auth/logout`

**Headers Required:**
| Header | Value |
|--------|-------|
| `Authorization` | `Bearer {token}` |
| `Accept` | `application/json` |

**Success Response:** `200 OK`

```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

### Get Authenticated User

**Endpoint:** `GET /auth/user`

**Headers Required:**
| Header | Value |
|--------|-------|
| `Authorization` | `Bearer {token}` |
| `Accept` | `application/json` |

**Success Response:** `200 OK`

```json
{
  "user": {
    "id": 2,
    "name": "Abdul Wahab",
    "email": "wahab@example.com",
    "role": "customer",
    "is_active": true,
    "email_verified_at": null,
    "created_at": "2025-07-28 21:06:09",
    "updated_at": "2025-07-28 21:06:09"
  }
}
```

---

## Services Management (Admin)

> **Note:** All service management endpoints require admin authentication

### Create New Service

**Endpoint:** `POST /services`

**Headers Required:**
| Header | Value |
|--------|-------|
| `Authorization` | `Bearer {admin_token}` |
| `Content-Type` | `application/json` |

**Request Body:**

```json
{
  "name": "Web Development",
  "description": "Complete web development service including frontend and backend",
  "price": 1500.0,
  "status": "active"
}
```

**Success Response:** `201 Created`

```json
{
  "message": "Service created successfully",
  "data": {
    "id": 1,
    "name": "Web Development",
    "description": "Complete web development service including frontend and backend",
    "price": "1,500.00",
    "status": "active",
    "created_at": "2025-07-29 12:18:28",
    "updated_at": "2025-07-29 12:18:28"
  }
}
```

**Error Response:** `403 Forbidden`

```json
{
  "success": false,
  "message": "Forbidden. You do not have permission to access this resource."
}
```

**Validation Error:** `422 Unprocessable Entity`

```json
{
  "message": "Validation failed",
  "errors": {
    "name": ["Service name is required"],
    "description": ["Service description is required"],
    "price": ["Price must be a valid number"],
    "status": ["Status must be either active or inactive"]
  }
}
```

### List All Services

**Endpoint:** `GET /services`

**Headers Required:**
| Header | Value |
|--------|-------|
| `Authorization` | `Bearer {admin_token}` |

**Success Response:** `200 OK`

```json
{
  "message": "Services retrieved successfully",
  "data": [
    {
      "id": 10,
      "name": "API Development",
      "description": "RESTful API development and integration services for seamless system communication",
      "price": "1,100.00",
      "status": "active",
      "created_at": "2025-07-29 12:21:24",
      "updated_at": "2025-07-29 12:21:24"
    },
    {
      "id": 9,
      "name": "Content Management System",
      "description": "Custom CMS development for easy content management and website administration",
      "price": "1,300.00",
      "status": "active",
      "created_at": "2025-07-29 12:21:18",
      "updated_at": "2025-07-29 12:21:18"
    }
  ]
}
```

### Get Single Service

**Endpoint:** `GET /services/{id}`

**Headers Required:**
| Header | Value |
|--------|-------|
| `Authorization` | `Bearer {admin_token}` |

**Success Response:** `200 OK`

```json
{
  "message": "Service retrieved successfully",
  "data": {
    "id": 10,
    "name": "API Development",
    "description": "RESTful API development and integration services for seamless system communication",
    "price": "1,100.00",
    "status": "active",
    "created_at": "2025-07-29 12:21:24",
    "updated_at": "2025-07-29 12:21:24"
  }
}
```

### Update Service

**Endpoint:** `PUT /services/{id}`

**Headers Required:**
| Header | Value |
|--------|-------|
| `Authorization` | `Bearer {admin_token}` |
| `Content-Type` | `application/json` |

**Request Body:**

```json
{
  "name": "Advanced Web Development",
  "description": "Complete full-stack web development with React, Laravel, and cloud deployment",
  "price": 1800.0,
  "status": "active"
}
```

**Success Response:** `200 OK`

```json
{
  "message": "Service updated successfully",
  "data": {
    "id": 1,
    "name": "Advanced Web Development",
    "description": "Complete full-stack web development with React, Laravel, and cloud deployment",
    "price": "1,800.00",
    "status": "active",
    "created_at": "2025-07-29 12:18:28",
    "updated_at": "2025-07-29 15:30:45"
  }
}
```

### Delete Service

**Endpoint:** `DELETE /services/{id}`

**Headers Required:**
| Header | Value |
|--------|-------|
| `Authorization` | `Bearer {admin_token}` |

**Success Response:** `200 OK`

```json
{
  "success": true,
  "message": "Service deleted successfully"
}
```

---

## Customer Bookings

> **Note:** All customer booking endpoints require customer authentication

### Create New Booking

**Endpoint:** `POST /bookings`

**Headers Required:**
| Header | Value |
|--------|-------|
| `Authorization` | `Bearer {customer_token}` |
| `Content-Type` | `application/json` |

**Request Body:**

```json
{
  "service_id": 1,
  "booking_date": "2025-08-01"
}
```

**Success Response:** `201 Created`

```json
{
  "success": true,
  "message": "Booking created successfully",
  "data": {
    "id": 1,
    "service": {
      "id": 1,
      "name": "Web Development",
      "description": "Complete web development service including frontend and backend",
      "price": "1,500.00"
    },
    "customer": {
      "id": 2,
      "name": "Abdul Wahab",
      "email": "wahab@example.com"
    },
    "booking_date": "2025-08-01",
    "total_amount": "1,500.00",
    "status": "pending",
    "status_label": "Pending",
    "created_at": "2025-07-29 14:32:47",
    "updated_at": "2025-07-29 14:32:47"
  }
}
```

**Validation Error:** `422 Unprocessable Entity`

```json
{
  "message": "Validation failed",
  "errors": {
    "service_id": ["Selected service does not exist"]
  }
}
```

### List Customer Bookings

**Endpoint:** `GET /bookings`

**Headers Required:**
| Header | Value |
|--------|-------|
| `Authorization` | `Bearer {customer_token}` |

**Success Response:** `200 OK`

```json
{
  "success": true,
  "message": "Your bookings retrieved successfully",
  "data": [
    {
      "id": 3,
      "service": {
        "id": 1,
        "name": "Web Development",
        "description": "Complete web development service including frontend and backend",
        "price": "1,500.00"
      },
      "customer": {
        "id": 2,
        "name": "Abdul Wahab",
        "email": "wahab@example.com"
      },
      "booking_date": "2025-08-20",
      "total_amount": "1,500.00",
      "status": "pending",
      "status_label": "Pending",
      "created_at": "2025-07-29 14:37:35",
      "updated_at": "2025-07-29 14:37:35"
    },
    {
      "id": 2,
      "service": {
        "id": 2,
        "name": "Mobile App Development",
        "description": "Native and cross-platform mobile application development for iOS and Android",
        "price": "2,000.00"
      },
      "customer": {
        "id": 2,
        "name": "Abdul Wahab",
        "email": "wahab@example.com"
      },
      "booking_date": "2025-08-10",
      "total_amount": "2,000.00",
      "status": "pending",
      "status_label": "Pending",
      "created_at": "2025-07-29 14:36:28",
      "updated_at": "2025-07-29 14:36:28"
    }
  ]
}
```

### Update Booking

**Endpoint:** `PUT /bookings/{id}`

**Headers Required:**
| Header | Value |
|--------|-------|
| `Authorization` | `Bearer {customer_token}` |
| `Content-Type` | `application/json` |

**Request Body:**

```json
{
  "booking_date": "2025-08-03"
}
```

**Success Response:** `200 OK`

```json
{
  "success": true,
  "message": "Booking updated successfully",
  "data": {
    "id": 1,
    "service": {
      "id": 1,
      "name": "Web Development",
      "description": "Complete web development service including frontend and backend",
      "price": "1,500.00"
    },
    "customer": {
      "id": 2,
      "name": "Abdul Wahab",
      "email": "wahab@example.com"
    },
    "booking_date": "2025-08-03",
    "total_amount": "1,500.00",
    "status": "pending",
    "status_label": "Pending",
    "created_at": "2025-07-29 14:32:47",
    "updated_at": "2025-07-29 14:45:11"
  }
}
```

### Cancel Booking

**Endpoint:** `DELETE /bookings/{id}`

**Headers Required:**
| Header | Value |
|--------|-------|
| `Authorization` | `Bearer {customer_token}` |

**Success Response:** `200 OK`

```json
{
  "success": true,
  "message": "Booking cancelled successfully"
}
```

---

## Admin Bookings

### List All Bookings (Admin)

**Endpoint:** `GET /admin/bookings`

**Headers Required:**
| Header | Value |
|--------|-------|
| `Authorization` | `Bearer {admin_token}` |

**Success Response:** `200 OK`

```json
{
  "success": true,
  "message": "All bookings retrieved successfully",
  "data": [
    {
      "id": 3,
      "service": {
        "id": 1,
        "name": "Web Development",
        "description": "Complete web development service including frontend and backend",
        "price": "1,500.00"
      },
      "customer": {
        "id": 2,
        "name": "Abdul Wahab",
        "email": "wahab@example.com"
      },
      "booking_date": "2025-08-20",
      "total_amount": "1,500.00",
      "status": "pending",
      "status_label": "Pending",
      "created_at": "2025-07-29 14:37:35",
      "updated_at": "2025-07-29 14:37:35"
    },
    {
      "id": 1,
      "service": {
        "id": 1,
        "name": "Web Development",
        "description": "Complete web development service including frontend and backend",
        "price": "1,500.00"
      },
      "customer": {
        "id": 2,
        "name": "Abdul Wahab",
        "email": "wahab@example.com"
      },
      "booking_date": "2025-08-03",
      "total_amount": "1,500.00",
      "status": "cancelled",
      "status_label": "Cancelled",
      "created_at": "2025-07-29 14:32:47",
      "updated_at": "2025-07-29 14:47:03"
    }
  ]
}
```

### Update Booking Status (Admin)

**Endpoint:** `PUT /admin/bookings/{id}`

**Headers Required:**
| Header | Value |
|--------|-------|
| `Authorization` | `Bearer {admin_token}` |
| `Content-Type` | `application/json` |

**Request Body:**

```json
{
  "status": "confirmed"
}
```

**Success Response:** `200 OK`

```json
{
  "success": true,
  "message": "Booking status updated successfully",
  "data": {
    "id": 1,
    "service": {
      "id": 1,
      "name": "Web Development",
      "description": "Complete web development service including frontend and backend",
      "price": "1,500.00"
    },
    "customer": {
      "id": 2,
      "name": "Abdul Wahab",
      "email": "wahab@example.com"
    },
    "booking_date": "2025-08-03",
    "total_amount": "1,500.00",
    "status": "confirmed",
    "status_label": "Confirmed",
    "created_at": "2025-07-29 14:32:47",
    "updated_at": "2025-07-29 16:15:30"
  }
}
```

---

## Error Responses

### Common HTTP Status Codes

| Status Code | Description                              |
| ----------- | ---------------------------------------- |
| `200`       | OK - Request successful                  |
| `201`       | Created - Resource created successfully  |
| `400`       | Bad Request - Invalid request data       |
| `401`       | Unauthorized - Authentication required   |
| `403`       | Forbidden - Insufficient permissions     |
| `404`       | Not Found - Resource not found           |
| `422`       | Unprocessable Entity - Validation errors |
| `500`       | Internal Server Error - Server error     |

---

_Last updated: July 30, 2025_
