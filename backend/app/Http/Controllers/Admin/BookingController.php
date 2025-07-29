<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\BookingResource;
use App\Models\Booking;
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
            $query = Booking::with(['user', 'service']);

            // Filter by status if provided
            if ($request->has('status')) {
                $query->where('status', $request->status);
            }

            // Filter by date range if provided
            if ($request->has('from_date')) {
                $query->whereDate('booking_date', '>=', $request->from_date);
            }

            if ($request->has('to_date')) {
                $query->whereDate('booking_date', '<=', $request->to_date);
            }

            // Filter by service if provided
            if ($request->has('service_id')) {
                $query->where('service_id', $request->service_id);
            }

            // Sort by latest bookings first
            $query->orderBy('created_at', 'desc');

            $bookings = $query->paginate($request->get('per_page', 15));

            return response()->json([
                'message' => 'Bookings retrieved successfully',
                'data' => BookingResource::collection($bookings),
                'meta' => [
                    'current_page' => $bookings->currentPage(),
                    'last_page' => $bookings->lastPage(),
                    'per_page' => $bookings->perPage(),
                    'total' => $bookings->total(),
                ],
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to retrieve bookings',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
