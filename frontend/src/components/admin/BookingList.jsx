import React, { useEffect, useState } from "react";
import api from '../../api/axios';

const statusColors = {
    pending: "bg-yellow-100 text-yellow-700",
    cancelled: "bg-red-100 text-red-700",
    completed: "bg-green-100 text-green-700",
};

export default function BookingList() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBookings = async () => {
            setLoading(true);
            setError("");
            try {
                const response = await api.get("/admin/bookings");
                setBookings(response.data.data);
            } catch (err) {
                setError(
                    err?.response?.data?.message || "Failed to fetch bookings. Please try again."
                );
            }
            setLoading(false);
        };

        fetchBookings();
    }, []);

    return (
        <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4 text-[#1b1b18] dark:text-[#EDEDEC]">Admin Booking List</h2>
            {loading && <p>Loading bookings...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && bookings.length === 0 && <p>No bookings found.</p>}
            {!loading && !error && bookings.length > 0 && (
                <div className="overflow-x-auto rounded-md shadow border bg-white dark:bg-[#18181b]">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-[#343434]">
                        <thead className="bg-gray-100 dark:bg-[#22223b]">
                            <tr>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">#</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Service</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Customer</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Booking Date</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Total Amount</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Status</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Booking date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-[#2b2b2b]">
                            {bookings.map((booking, idx) => (
                                <tr key={booking.id} className="hover:bg-gray-50 dark:hover:bg-[#232332] transition">
                                    <td className="px-4 py-2">{idx + 1}</td>
                                    <td className="px-4 py-2 font-medium">{booking.service?.name || "N/A"}</td>
                                    <td className="px-4 py-2">
                                        <div className="flex flex-col">
                                            <span className="font-semibold">{booking.customer?.name || "N/A"}</span>
                                            <span className="text-xs text-gray-500">{booking.customer?.email}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-2">{booking.booking_date}</td>
                                    <td className="px-4 py-2">₹{booking.total_amount}</td>
                                    <td className="px-4 py-2">
                                        <span
                                            className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${statusColors[booking.status] || "bg-gray-200 text-gray-700"
                                                }`}
                                        >
                                            {booking.status_label}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2 text-xs text-gray-500">{new Date(booking.created_at).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}