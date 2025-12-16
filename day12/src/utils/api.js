const API_BASE_URL = 'http://localhost:5000/api';

// API utility functions
export const api = {
  // Auth endpoints
  signup: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return response.json();
  },

  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    return response.json();
  },

  // Recharge endpoints
  getPlans: async () => {
    const response = await fetch(`${API_BASE_URL}/plans`);
    return response.json();
  },

  recharge: async (rechargeData) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/recharge`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(rechargeData)
    });
    return response.json();
  },

  getTransactions: async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/transactions`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.json();
  }
};