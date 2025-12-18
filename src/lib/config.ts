import axios from 'axios';

// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Add request interceptor to include auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle auth errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token if unauthorized
      localStorage.removeItem('authToken');
      // Optionally redirect to login page
      if (typeof window !== 'undefined') {
        window.location.href = '/';
      }
    }
    return Promise.reject(error);
  }
);

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/users/auth/login`,
    REGISTER: `${API_BASE_URL}/users/auth/register`,
    GOOGLE: `${API_BASE_URL}/users/auth/google`,
  },
  EDUCATION: `${API_BASE_URL}/educations`,
  PACKAGES: `${API_BASE_URL}/packages`,
  FORUM: {
    TOPIC: `${API_BASE_URL}/forum-topics`,
    POSTS: `${API_BASE_URL}/forum-posts`,
    COMMENTS: `${API_BASE_URL}/forum-comments`,
  },
  PAGE_CONTENTS: `${API_BASE_URL}/page-contents`,
  USERS: {
    ME: `${API_BASE_URL}/users/me`,
  },
  PAYMENT_GATEWAYS: `${API_BASE_URL}/payment-gateways`,
  PAYMENTS: `${API_BASE_URL}/payments`,
}; 