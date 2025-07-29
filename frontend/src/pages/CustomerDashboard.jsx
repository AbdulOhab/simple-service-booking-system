import { useEffect, useState } from 'react';
import { getUser, logout } from '../api/auth';
import { getCustomerDashboard } from '../api/dashboard';
import { useNavigate } from 'react-router-dom';

export default function CustomerDashboard() {
    const [user, setUser] = useState(null);
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Get user data
                const userResult = await getUser();
                if (!userResult.success) {
                    throw new Error('Failed to get user data');
                }
                setUser(userResult.data.data);

                // Check if user is customer
                if (userResult.data.data.role !== 'customer') {
                    navigate('/admin/dashboard');
                    return;
                }

                // Get dashboard data
                const dashboardResult = await getCustomerDashboard();
                if (dashboardResult.success) {
                    setDashboardData(dashboardResult.data.data);
                }

            } catch (err) {
                setError('Failed to load dashboard');
                setTimeout(() => navigate('/login'), 2000);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await logout();
            localStorage.removeItem('token');
            navigate('/');
        } catch (err) {
            // Force logout anyway
            localStorage.removeItem('token');
            navigate('/');
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#FDFDFC] dark:bg-[#0a0a0a]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1b1b18] mx-auto dark:border-[#EDEDEC]"></div>
                    <p className="mt-4 text-[#1b1b18] dark:text-[#EDEDEC]">Loading...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#FDFDFC] dark:bg-[#0a0a0a]">
                <div className="text-center">
                    <p className="text-red-500">{error}</p>
                    <p className="text-gray-500 mt-2">Redirecting to login...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FDFDFC] dark:bg-[#0a0a0a]">
            {/* Header */}
            <header className="bg-white dark:bg-[#1a1a1a] border-b border-[#19140035] dark:border-[#3E3E3A]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <h1 className="text-xl font-semibold text-[#1b1b18] dark:text-[#EDEDEC]">
                                Customer Dashboard
                            </h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                                    {user?.name?.charAt(0).toUpperCase()}
                                </div>
                                <span className="text-sm font-medium text-[#1b1b18] dark:text-[#EDEDEC]">
                                    {user?.name}
                                </span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    {/* Welcome Section */}
                    <div className="bg-white dark:bg-[#1a1a1a] overflow-hidden shadow rounded-lg mb-6">
                        <div className="px-4 py-5 sm:p-6">
                            <h2 className="text-lg font-medium text-[#1b1b18] dark:text-[#EDEDEC] mb-2">
                                Welcome back, {user?.name}!
                            </h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Here's an overview of your account activity.
                            </p>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    {dashboardData && (
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                            <div className="bg-white dark:bg-[#1a1a1a] overflow-hidden shadow rounded-lg">
                                <div className="p-5">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
                                                <span className="text-white text-sm font-bold">📦</span>
                                            </div>
                                        </div>
                                        <div className="ml-5 w-0 flex-1">
                                            <dl>
                                                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                                                    Total Orders
                                                </dt>
                                                <dd className="text-lg font-medium text-[#1b1b18] dark:text-[#EDEDEC]">
                                                    {dashboardData.total_orders}
                                                </dd>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-[#1a1a1a] overflow-hidden shadow rounded-lg">
                                <div className="p-5">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <div className="w-8 h-8 bg-yellow-600 rounded-md flex items-center justify-center">
                                                <span className="text-white text-sm font-bold">⏳</span>
                                            </div>
                                        </div>
                                        <div className="ml-5 w-0 flex-1">
                                            <dl>
                                                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                                                    Pending Orders
                                                </dt>
                                                <dd className="text-lg font-medium text-[#1b1b18] dark:text-[#EDEDEC]">
                                                    {dashboardData.pending_orders}
                                                </dd>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-[#1a1a1a] overflow-hidden shadow rounded-lg">
                                <div className="p-5">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <div className="w-8 h-8 bg-green-600 rounded-md flex items-center justify-center">
                                                <span className="text-white text-sm font-bold">✅</span>
                                            </div>
                                        </div>
                                        <div className="ml-5 w-0 flex-1">
                                            <dl>
                                                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                                                    Completed Orders
                                                </dt>
                                                <dd className="text-lg font-medium text-[#1b1b18] dark:text-[#EDEDEC]">
                                                    {dashboardData.completed_orders}
                                                </dd>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-[#1a1a1a] overflow-hidden shadow rounded-lg">
                                <div className="p-5">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <div className="w-8 h-8 bg-purple-600 rounded-md flex items-center justify-center">
                                                <span className="text-white text-sm font-bold">💰</span>
                                            </div>
                                        </div>
                                        <div className="ml-5 w-0 flex-1">
                                            <dl>
                                                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                                                    Total Spent
                                                </dt>
                                                <dd className="text-lg font-medium text-[#1b1b18] dark:text-[#EDEDEC]">
                                                    ${dashboardData.total_spent}
                                                </dd>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Recent Activity */}
                    <div className="bg-white dark:bg-[#1a1a1a] shadow overflow-hidden sm:rounded-md mt-6">
                        <div className="px-4 py-5 sm:px-6">
                            <h3 className="text-lg leading-6 font-medium text-[#1b1b18] dark:text-[#EDEDEC]">
                                Recent Activity
                            </h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                                Your latest orders and activities.
                            </p>
                        </div>
                        <div className="border-t border-gray-200 dark:border-gray-600">
                            <div className="px-4 py-4 sm:px-6">
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    No recent activity to display.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}