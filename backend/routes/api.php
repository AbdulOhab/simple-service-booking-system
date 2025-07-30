<?php

use App\Http\Controllers\Admin\BookingController as AdminBookingController;
use App\Http\Controllers\Admin\ServiceController as AdminServiceController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Customer\BookingController;
use App\Http\Controllers\Customer\ServiceController as CustomerServiceController;
use Illuminate\Support\Facades\Route;

// Public Router
Route::post('/register', [AuthController::class, 'register'])->name('customer.registration');
Route::post('/login', [AuthController::class, 'login'])->name('login');

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::prefix('auth')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
        Route::get('/user', [AuthController::class, 'user']);
    });

    // Customer routes (will be added later)
    Route::middleware('role:customer')->group(function () {
        // Customer Booking Routes
        Route::get('/bookings', [BookingController::class, 'index']);
        Route::post('/bookings', [BookingController::class, 'store']);
        Route::get('/bookings/{booking}', [BookingController::class, 'show']);
        Route::put('/bookings/{booking}', [BookingController::class, 'update']);
        Route::delete('/bookings/{booking}', [BookingController::class, 'destroy']);

        // Customer Service Routes
        Route::get('user/services', [CustomerServiceController::class, 'index'])->name('customer.services.index');
        Route::get('user/services/{service}', [CustomerServiceController::class, 'show'])->name('customer.services.show');
    });

    // Admin routes (will be added later)
    Route::middleware('role:admin')->group(function () {
        // Admin Service Management
        Route::post('/services', [AdminServiceController::class, 'store'])->name('admin.services.store');
        Route::put('/services/{service}', [AdminServiceController::class, 'update'])->name('admin.services.update');
        Route::delete('/services/{service}', [AdminServiceController::class, 'destroy'])->name('admin.services.destroy');

        Route::get('/services', [AdminServiceController::class, 'index'])->name('admin.services.index');
        Route::get('/services/{service}', [AdminServiceController::class, 'show'])->name('admin.services.show');

        // Admin Booking Management
        Route::get('/admin/bookings', [AdminBookingController::class, 'index'])->name('admin.bookings.index');
    });
});
