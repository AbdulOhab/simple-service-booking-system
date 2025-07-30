<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\BookingResource;
use App\Models\Booking;
use App\Models\Service;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    /**
     * Display a listing of all bookings for admin.
     */
    public function index(Request $request): JsonResponse
    {
        try {
            // user bookings with service and user details
            $bookings = Booking::orderBy('created_at', 'desc')->get();

            // Check if user has any bookings
            return response()->json([
                'success' => true,
                'message' => 'Your bookings retrieved successfully',
                'data' => BookingResource::collection($bookings),
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve bookings',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
