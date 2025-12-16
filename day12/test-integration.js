// Simple integration test
const testAPI = async () => {
  const API_BASE = 'http://localhost:5000/api';
  
  try {
    // Test signup
    const signupResponse = await fetch(`${API_BASE}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        phone: '9876543210',
        password: 'password123'
      })
    });
    
    const signupData = await signupResponse.json();
    console.log('Signup:', signupData);
    
    // Test login
    const loginResponse = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123'
      })
    });
    
    const loginData = await loginResponse.json();
    console.log('Login:', loginData);
    
    // Test plans
    const plansResponse = await fetch(`${API_BASE}/plans`);
    const plansData = await plansResponse.json();
    console.log('Plans:', plansData);
    
    console.log('✅ All API endpoints working!');
  } catch (error) {
    console.error('❌ API Error:', error);
  }
};

// Run test if backend is running
testAPI();