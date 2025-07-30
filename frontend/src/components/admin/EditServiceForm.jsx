import { useState, useEffect } from 'react';
import api from '../../api/axios';
import toast from 'react-hot-toast';

export default function EditServiceForm({ service, onClose, onUpdated }) {
    // Keep form in sync with props (in case a different service is selected)
    const [form, setForm] = useState({
        name: service.name || "",
        description: service.description || "",
        price: service.price || "",
        status: service.status || "active",
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setForm({
            name: service.name || "",
            description: service.description || "",
            price: service.price || "",
            status: service.status || "active",
        });
    }, [service]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        // If price, keep as number or blank
        setForm((prev) => ({
            ...prev,
            [name]: name === "price" ? value.replace(/^0+/, '') : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Ensure price is sent as number (if your backend expects it)
        const payload = {
            ...form,
            price: Number(form.price),
        };

        try {
            await api.put(`/services/${service.id}`, payload);
            toast.success('Service updated!');
            if (typeof onUpdated === "function") onUpdated();
            if (typeof onClose === "function") onClose();
        } catch (err) {
            console.error("Update error:", err, err?.response?.data); // for debugging
            toast.error(
                err?.response?.data?.message ||
                "Failed to update service. Please check your input and try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-[#1a1a1a] rounded-lg p-6 w-full max-w-lg shadow-lg relative">
                <button
                    className="absolute top-3 right-3 text-2xl"
                    onClick={onClose}
                    type="button"
                    disabled={loading}
                >&times;</button>
                <h3 className="text-xl font-bold mb-4">Edit Service</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block font-medium mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            required
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Description</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            required
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Price</label>
                        <input
                            type="number"
                            name="price"
                            value={form.price}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            required
                            min="0"
                            step="0.01"
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Status</label>
                        <select
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            disabled={loading}
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
                    >
                        {loading ? 'Updating...' : 'Update'}
                    </button>
                </form>
            </div>
        </div>
    );
}