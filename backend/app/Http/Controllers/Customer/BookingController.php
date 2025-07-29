<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Http\Requests\Customer\StoreBookingRequest;
use App\Http\Requests\Customer\UpdateBookingRequest;
use App\Http\Resources\BookingResource;
use App\Models\Booking;
use App\Models\Service;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    /**
     * Display user's bookings.
     */
    public function index(Request $request): JsonResponse
    {
        try {
            // user bookings with service and user details
            $bookings = Booking::with(['service', 'user'])
                ->forUser($request->user()->id)
                ->orderBy('created_at', 'desc')
                ->get();

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

    /**
     * Store a new booking.
     */
    public function store(StoreBookingRequest $request): JsonResponse
    {
        try {
            // Validate service exists and is active
            $service = Service::findOrFail($request->service_id);

            if ($service->status !== 'active') {
                return response()->json([
                    'success' => false,
                    'message' => 'Selected service is not available',
                ], 422);
            }

            // Check if user already has a booking
            $existingBooking = Booking::where('user_id', $request->user()->id)
                ->where('service_id', $request->service_id)
                ->where('booking_date', $request->booking_date)
                ->whereIn('status', ['pending', 'confirmed'])
                ->first();

            if ($existingBooking) {
                return response()->json([
                    'success' => false,
                    'message' => 'You already have a booking for this service on the selected date',
                ], 422);
            }

            // Create the booking
            $booking = Booking::create([
                'user_id' => $request->user()->id,
                'service_id' => $request->service_id,
                'booking_date' => $request->booking_date,
                'status' => 'pending',
            ]);

            // Load related service and user for response
            $booking->load(['service', 'user']);

            return response()->json([
                'success' => true,
                'message' => 'Booking created successfully',
                'data' => new BookingResource($booking),
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create booking',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified booking.
     */
    public function show(Request $request, Booking $booking): JsonResponse
    {
        try {
            // Ensure user can only see their own bookings
            if ($booking->user_id !== $request->user()->id) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized access to booking',
                ], 403);
            }

            // Load related service and user for response
            $booking->load(['service', 'user']);

            return response()->json([
                'success' => true,
                'message' => 'Booking retrieved successfully',
                'data' => new BookingResource($booking),
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve booking',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Update the specified booking (limited fields for customers).
     */
    public function update(UpdateBookingRequest $request, Booking $booking): JsonResponse
    {
        try {
            // Ensure user can only update their own bookings
            if ($booking->user_id !== $request->user()->id) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized access to booking',
                ], 403);
            }

            // Customers can only update if booking is pending
            if ($booking->status !== 'pending') {
                return response()->json([
                    'success' => false,
                    'message' => 'Cannot modify booking that is not pending',
                ], 422);
            }

            // Only allow booking_date update for customers
            if ($request->has('booking_date')) {
                // Check for duplicate booking on new date
                $existingBooking = Booking::where('user_id', $request->user()->id)
                    ->where('service_id', $booking->service_id)
                    ->where('booking_date', $request->booking_date)
                    ->where('id', '!=', $booking->id)
                    ->whereIn('status', ['pending', 'confirmed'])
                    ->first();

                if ($existingBooking) {
                    return response()->json([
                        'success' => false,
                        'message' => 'You already have a booking for this service on the selected date',
                    ], 422);
                }

                $booking->update(['booking_date' => $request->booking_date]);
            }

            $booking->load(['service', 'user']);

            return response()->json([
                'success' => true,
                'message' => 'Booking updated successfully',
                'data' => new BookingResource($booking),
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update booking',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Cancel the specified booking.
     */
    public function destroy(Request $request, Booking $booking): JsonResponse
    {
        try {
            // Ensure user can only cancel their own bookings
            if ($booking->user_id !== $request->user()->id) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized access to booking',
                ], 403);
            }

            // Can only cancel pending or confirmed bookings
            if (! in_array($booking->status, ['pending', 'confirmed'])) {
                return response()->json([
                    'success' => false,
                    'message' => 'Cannot cancel booking in current status',
                ], 422);
            }

            // Update booking status to cancelled
            $booking->update(['status' => 'cancelled']);

            return response()->json([
                'success' => true,
                'message' => 'Booking cancelled successfully',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to cancel booking',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
