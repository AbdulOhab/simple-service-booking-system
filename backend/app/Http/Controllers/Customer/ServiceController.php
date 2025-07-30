<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Http\Resources\ServiceResource;
use App\Models\Service;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    /**
     * Display available services for customers.
     */
    public function index(Request $request): JsonResponse
    {
        try {
            // Get only active services for customers
            $services = Service::where('status', 'active')
                ->orderBy('name', 'asc')
                ->get();

            return response()->json([
                'success' => true,
                'message' => 'Available services retrieved successfully',
                'data' => ServiceResource::collection($services),
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve services',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified service.
     */
    public function show(Service $service): JsonResponse
    {
        try {
            // Only show active services to customers
            if ($service->status !== 'active') {
                return response()->json([
                    'success' => false,
                    'message' => 'Service not available',
                ], 404);
            }

            return response()->json([
                'success' => true,
                'message' => 'Service retrieved successfully',
                'data' => new ServiceResource($service),
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve service',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
