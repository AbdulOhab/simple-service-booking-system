<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BookingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'service_id' => ['required', Rule::exists('services', 'id')],
            'booking_date' => ['required', 'date', 'after_or_equal:today'],
        ];
    }

    public function messages(): array
    {
        return [
            'service_id.required' => 'Service selection is required',
            'service_id.exists' => 'Selected service does not exist',
            'booking_date.required' => 'Booking date is required',
            'booking_date.date' => 'Please provide a valid date',
            'booking_date.after_or_equal' => 'Booking date cannot be in the past',
        ];
    }
}
