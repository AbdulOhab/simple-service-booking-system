<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreServiceRequest;
use App\Http\Requests\UpdateServiceRequest;
use App\Http\Resources\ServiceResource;
use App\Models\Service;
use Illuminate\Http\JsonResponse;

class ServiceController extends Controller
{
    /**
     * Store new created service.
     */
    public function store(StoreServiceRequest $request): JsonResponse
    {
        try {
            // new service with validated data
            $service = Service::create($request->validated());

            return response()->json([
                'message' => 'Service created successfully',
                'data' => new ServiceResource($service),
            ], 201); // HTTP status code 201 for created
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to create service',
                'error' => $e->getMessage(),
            ], 500); // HTTP status code 500 for server error
        }
    }

    /**
     * Update the specified service.
     */
    public function update(UpdateServiceRequest $request, Service $service): JsonResponse
    {
        try {
            // Upadate service validated data
            $service->update($request->validated());

            return response()->json([
                'message' => 'Service updated successfully',
                'data' => new ServiceResource($service->fresh()),
            ], 200); // HTTP status code 200 for OK
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to update service',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the specified service.
     */
    public function destroy(Service $service): JsonResponse
    {
        try {
            // Check if service has any bookings
            if ($service->bookings()->exists()) {
                return response()->json([
                    'message' => 'Cannot delete service with existing bookings. Consider deactivating instead.',
                ], 422);
            }

            $service->delete();

            return response()->json([
                'message' => 'Service deleted successfully',
            ], 200); // HTTP status code 200 for OK
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to delete service',
                'error' => $e->getMessage(),
            ], 500); // HTTP status code 500 for server error
        }
    }
}
