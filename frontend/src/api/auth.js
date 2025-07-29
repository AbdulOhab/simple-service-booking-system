import api from './axios';

export const login = async (email, password, remember = false) => {
  try {
    const response = await api.post('/login', { 
      email, 
      password, 
      remember 
    });
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    if (error.response) {
      // Server responded with error
      return {
        success: false,
        errors: error.response.data.errors || {},
        message: error.response.data.message || 'Login failed',
        status: error.response.status
      };
    } else {
      // Network error
      return {
        success: false,
        message: 'Network error. Please check your connection.'
      };
    }
  }
};

export const register = async (data) => {
  try {
    const response = await api.post('/register', data);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    if (error.response) {
      // esponse return
      return {
        success: false,
        errors: error.response.data.errors || {},
        message: error.response.data.message,
        status: error.response.status
      };
    } else {
      return {
        success: false,
        message: 'Network error. Please check your connection.'
      };
    }
  }
};

export const getUser = async () => {
  try {
    const response = await api.get('/auth/user');
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Network error',
      status: error.response?.status
    };
  }
};

export const logout = async () => {
  try {
    const response = await api.post('/auth/logout');
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Network error',
      status: error.response?.status
    };
  }
};