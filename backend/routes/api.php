<?php

use App\Http\Controllers\Auth\AuthController;
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
        Route::get('/dashboard', function () {
            return response()->json([
                'success' => true,
                'message' => 'Welcome to customer Dashboard',
                'data' => [
                    'total_users' => 150,
                    'total_customers' => 140,
                    'total_admins' => 10,
                    'total_orders' => 500,
                    'monthly_revenue' => 15000.00,
                ],
            ]);
        });
    });

    // Admin routes (will be added later)
    Route::middleware('role:admin')->prefix('admin')->group(function () {
        Route::get('/dashboard', function () {
            return response()->json([
                'success' => true,
                'message' => 'Welcome to Admin Dashboard',
                'data' => [
                    'total_users' => 150,
                    'total_customers' => 140,
                    'total_admins' => 10,
                    'total_orders' => 500,
                    'monthly_revenue' => 15000.00,
                ],
            ]);
        });
    });
});
