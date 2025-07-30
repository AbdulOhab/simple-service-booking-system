import React, { useEffect, useState } from "react";
import api from '../../api/axios';

// BookingList: Admin booking list component
export default function BookingList() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        // You may need to set the correct base URL and authentication header (token)
        const fetchBookings = async () => {
            setLoading(true);
            setError("");
            try {
                const response = await axios.get("/api/admin/bookings", {
                    headers: {
                        // Adjust this if you use a different method for authentication
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        Accept: "application/json",
                    },
                });
                setBookings(response.data.data);
            } catch (err) {
                setError(
                    err.response?.data?.message ||
                    "Failed to fetch bookings. Please try again."
                );
            }
            setLoading(false);
        };

        fetchBookings();
    }, []);

    return (
        <div>
            <h2>Admin Booking List</h2>
            {loading && <p>Loading bookings...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {!loading && bookings.length === 0 && <p>No bookings found.</p>}
            {!loading && bookings.length > 0 && (
                <table border="1" cellPadding="8" cellSpacing="0" width="100%">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Service</th>
                            <th>User</th>
                            <th>Status</th>
                            <th>Date</th>
                            {/* Add more columns as needed */}
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking.id}>
                                <td>{booking.id}</td>
                                <td>
                                    {booking.service?.name ||
                                        booking.service?.title ||
                                        "N/A"}
                                </td>
                                <td>
                                    {booking.user?.name ||
                                        booking.user?.email ||
                                        "N/A"}
                                </td>
                                <td>{booking.status || "N/A"}</td>
                                <td>
                                    {booking.created_at
                                        ? new Date(booking.created_at).toLocaleString()
                                        : "N/A"}
                                </td>
                                {/* Add more cells as needed */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}