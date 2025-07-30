<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BookingResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'service' => [
                'id' => $this->service->id,
                'name' => $this->service->name,
                'description' => $this->service->description,
                'price' => number_format($this->service->price, 2),
            ],
            'customer' => [
                'id' => $this->user->id,
                'name' => $this->user->name,
                'email' => $this->user->email,
            ],
            'booking_date' => $this->booking_date->format('Y-m-d'),
            'total_amount' => number_format($this->total_amount, 2),
            'status' => $this->status,
            'status_label' => ucfirst($this->status),
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at->format('Y-m-d H:i:s'),
        ];
    }
}
