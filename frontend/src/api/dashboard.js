import api from './axios';

export const getCustomerDashboard = async () => {
  try {
    const response = await api.get('/customer/dashboard');
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to load dashboard',
      status: error.response?.status
    };
  }
};

export const getAdminDashboard = async () => {
  try {
    const response = await api.get('/admin/dashboard');
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to load dashboard',
      status: error.response?.status
    };
  }
};