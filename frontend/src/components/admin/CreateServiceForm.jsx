import { useState } from 'react';
import api from '../../api/axios';
import toast, { Toaster } from 'react-hot-toast';

export default function CreateServiceForm({ onServiceCreated }) {
    const [form, setForm] = useState({
        name: '',
        description: '',
        price: '',
        status: 'active',
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        try {
            const res = await api.post('/services', form);
            toast.success('Service created successfully!');
            if (onServiceCreated) onServiceCreated(res.data.data);
            setForm({ name: '', description: '', price: '', status: 'active' });
        } catch (err) {
            if (err.response?.data?.errors) {
                setErrors(err.response.data.errors);
            } else {
                toast.error(err.response?.data?.message || 'Failed to create service.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen mx-auto bg-white dark:bg-[#1a1a1a] shadow-lg rounded-xl p-8 mb-8 border border-gray-100 dark:border-[#232323]">
            {/* If Toaster is not present in your app root, you can include it here */}
            <Toaster position="top-right" />
            <h2 className="text-2xl font-bold mb-6 text-[#1b1b18] dark:text-[#EDEDEC] tracking-tight">
                Create New Service
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">
                        Service Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className={`mt-1 block w-full rounded-md border px-3 py-2 text-base shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition
                        dark:bg-[#101010] dark:text-white
                        ${errors.name ? 'border-red-500' : 'border-gray-300 dark:border-[#232323]'}`}
                        placeholder="Enter service name"
                    />
                    {errors.name && (
                        <p className="text-xs text-red-500 mt-1">{errors.name[0]}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">
                        Description
                    </label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        className={`mt-1 block w-full rounded-md border px-3 py-2 text-base shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition
                        dark:bg-[#101010] dark:text-white
                        ${errors.description ? 'border-red-500' : 'border-gray-300 dark:border-[#232323]'}`}
                        placeholder="Describe the service"
                        rows={3}
                    />
                    {errors.description && (
                        <p className="text-xs text-red-500 mt-1">{errors.description[0]}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">
                        Price
                    </label>
                    <input
                        type="number"
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                        className={`mt-1 block w-full rounded-md border px-3 py-2 text-base shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition
                        dark:bg-[#101010] dark:text-white
                        ${errors.price ? 'border-red-500' : 'border-gray-300 dark:border-[#232323]'}`}
                        placeholder="Enter price"
                        min="0"
                        step="0.01"
                    />
                    {errors.price && (
                        <p className="text-xs text-red-500 mt-1">{errors.price[0]}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">
                        Status
                    </label>
                    <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        className={`mt-1 block w-full rounded-md border px-3 py-2 text-base shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition
                        dark:bg-[#101010] dark:text-white
                        ${errors.status ? 'border-red-500' : 'border-gray-300 dark:border-[#232323]'}`}
                    >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                    {errors.status && (
                        <p className="text-xs text-red-500 mt-1">{errors.status[0]}</p>
                    )}
                </div>

                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full flex justify-center items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md
                            hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed text-base`}
                    >
                        {loading && (
                            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                            </svg>
                        )}
                        {loading ? 'Creating...' : 'Create Service'}
                    </button>
                </div>
            </form>
        </div>
    );
}