// API Configuration
export const API_CONFIG = {
  BASE_URL: __DEV__ ? 'http://192.168.1.20:3000/api' : 'https://your-production-api.com/api',
  TIMEOUT: 10000,
};

// API Endpoints
export const ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  ME: '/auth/me',
  LOGOUT: '/auth/logout',
  
  // Users
  USERS: '/users',
  USER_SEARCH: '/users/search',
  
  // Payments
  PAYMENTS: '/payments',
  PAYMENT_SEND: (id: string) => `/payments/${id}/send`,
  PAYMENT_PAY: (id: string, participantId: string) => `/payments/${id}/pay/${participantId}`,
  PAYMENT_STATS: '/payments/stats/dashboard',
};
