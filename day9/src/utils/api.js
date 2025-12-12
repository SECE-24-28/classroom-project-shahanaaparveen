const API_BASE_URL = 'https://65f8b8e8b4f842e808865b5e.mockapi.io/api/v1';

export const fetchRechargePlans = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/plans`);
    if (!response.ok) {
      throw new Error('Failed to fetch plans');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching plans:', error);
    // Return dummy data as fallback
    return [
      {
        id: '1',
        name: 'Basic Plan',
        price: 199,
        validity: '28 days',
        data: '1.5GB/day',
        type: 'prepaid',
        description: 'Unlimited calls + SMS'
      },
      {
        id: '2',
        name: 'Premium Plan',
        price: 399,
        validity: '56 days',
        data: '2GB/day',
        type: 'prepaid',
        description: 'Unlimited calls + SMS + Disney+ Hotstar'
      },
      {
        id: '3',
        name: 'Super Plan',
        price: 599,
        validity: '84 days',
        data: '3GB/day',
        type: 'prepaid',
        description: 'Unlimited calls + SMS + Netflix + Prime'
      },
      {
        id: '4',
        name: 'Postpaid Basic',
        price: 299,
        validity: '30 days',
        data: '25GB',
        type: 'postpaid',
        description: 'Unlimited calls + SMS + Bill protection'
      }
    ];
  }
};

export const processRecharge = async (rechargeData) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        transactionId: `TXN${Date.now()}`,
        message: 'Recharge successful!'
      });
    }, 2000);
  });
};