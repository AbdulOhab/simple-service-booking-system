import { useEffect, useState } from 'react';
import api from '../../api/axios';
import toast, { Toaster } from 'react-hot-toast';
import EditServiceForm from './EditServiceForm'; // import your edit form

export default function ServiceList() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editingService, setEditingService] = useState(null);

    useEffect(() => {
        fetchServices();
        // eslint-disable-next-line
    }, []);

    const fetchServices = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await api.get('/services');
            setServices(res.data.data || []);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                'Failed to load services.'
            );
        } finally {
            setLoading(false);
        }
    };

    // Helper function to limit string length
    const limitString = (str, max = 40) => {
        if (!str) return '';
        return str.length > max ? str.slice(0, max) + '...' : str;
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this service?')) return;
        try {
            await api.delete(`/services/${id}`);
            toast.success('Service deleted!');
            fetchServices();
        } catch (err) {
            toast.error('Failed to delete service');
        }
    };

    return (
        <div className="bg-white dark:bg-[#1a1a1a] shadow-lg rounded-xl p-8 mb-8 border border-gray-100 dark:border-[#232323]">
            <Toaster position="top-right" />
            <h2 className="text-2xl font-bold mb-6 text-[#1b1b18] dark:text-[#EDEDEC] tracking-tight">
                Service List
            </h2>
            {editingService && (
                <EditServiceForm
                    service={editingService}
                    onClose={() => setEditingService(null)}
                    onUpdated={fetchServices}
                />
            )}
            {loading ? (
                <div className="text-center py-6">
                    <svg className="animate-spin mx-auto h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                    </svg>
                    <p className="mt-2 text-[#1b1b18] dark:text-[#EDEDEC]">Loading services...</p>
                </div>
            ) : error ? (
                <div className="text-red-500">{error}</div>
            ) : services.length === 0 ? (
                <div className="text-gray-500">No services found.</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-[#232323]">
                        <thead className="bg-gray-50 dark:bg-[#181818]">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">#</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Description</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Price</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-[#1a1a1a] divide-y divide-gray-200 dark:divide-[#232323]">
                            {services.map((service, idx) => (
                                <tr key={service.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{idx + 1}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{limitString(service.name, 20)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{limitString(service.description, 20)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{service.price}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${service.status === 'active'
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-gray-200 text-gray-600 dark:bg-[#232323] dark:text-gray-400'
                                            }`}>
                                            {service.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                                        <button
                                            onClick={() => setEditingService(service)}
                                            className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-xs"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(service.id)}
                                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}