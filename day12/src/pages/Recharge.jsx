import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../utils/api';

const Recharge = () => {
  const [step, setStep] = useState(1); // 1: Plan Selection, 2: Payment, 3: Success
  const [formData, setFormData] = useState({
    phone: '',
    operator: '',
    amount: '',
    planId: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentData, setPaymentData] = useState({});
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [transaction, setTransaction] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const data = await api.getPlans();
      setPlans(data);
    } catch (error) {
      console.error('Failed to fetch plans');
    }
  };

  const handlePlanSelect = (plan) => {
    setFormData({
      ...formData,
      planId: plan.id.toString(),
      operator: plan.operator,
      amount: plan.amount.toString()
    });
  };

  const proceedToPayment = () => {
    if (formData.phone && formData.planId) {
      setStep(2);
    }
  };

  const processPayment = async () => {
    if (!paymentMethod || !isPaymentDataValid()) return;
    
    setLoading(true);
    try {
      const result = await api.recharge(formData);
      if (result.transaction) {
        setTransaction(result.transaction);
        setStep(3);
      }
    } catch (error) {
      console.error('Payment failed');
    }
    setLoading(false);
  };

  const isPaymentDataValid = () => {
    if (paymentMethod === 'UPI') return paymentData.upiId;
    if (paymentMethod === 'Credit Card' || paymentMethod === 'Debit Card') {
      return paymentData.cardNumber && paymentData.expiryDate && paymentData.cvv && paymentData.cardholderName;
    }
    if (paymentMethod === 'Net Banking') return paymentData.bankName;
    if (paymentMethod === 'Wallet') return paymentData.walletPin;
    return false;
  };

  const resetForm = () => {
    setStep(1);
    setFormData({ phone: '', operator: '', amount: '', planId: '' });
    setPaymentMethod('');
    setPaymentData({});
    setTransaction(null);
  };

  const renderPaymentForm = () => {
    if (!paymentMethod) return null;

    switch (paymentMethod) {
      case 'UPI':
        return (
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                UPI ID
              </label>
              <input
                type="text"
                placeholder="yourname@upi"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={paymentData.upiId || ''}
                onChange={(e) => setPaymentData({...paymentData, upiId: e.target.value})}
              />
            </div>
          </div>
        );
      
      case 'Credit Card':
      case 'Debit Card':
        return (
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Cardholder Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={paymentData.cardholderName || ''}
                onChange={(e) => setPaymentData({...paymentData, cardholderName: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Card Number
              </label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                maxLength="19"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={paymentData.cardNumber || ''}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
                  setPaymentData({...paymentData, cardNumber: value});
                }}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Expiry Date
                </label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  maxLength="5"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  value={paymentData.expiryDate || ''}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').replace(/(\d{2})(?=\d)/, '$1/');
                    setPaymentData({...paymentData, expiryDate: value});
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  CVV
                </label>
                <input
                  type="password"
                  placeholder="123"
                  maxLength="3"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  value={paymentData.cvv || ''}
                  onChange={(e) => setPaymentData({...paymentData, cvv: e.target.value.replace(/\D/g, '')})}
                />
              </div>
            </div>
          </div>
        );
      
      case 'Net Banking':
        return (
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select Bank
              </label>
              <select
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={paymentData.bankName || ''}
                onChange={(e) => setPaymentData({...paymentData, bankName: e.target.value})}
              >
                <option value="">Choose your bank</option>
                <option value="SBI">State Bank of India</option>
                <option value="HDFC">HDFC Bank</option>
                <option value="ICICI">ICICI Bank</option>
                <option value="Axis">Axis Bank</option>
                <option value="PNB">Punjab National Bank</option>
              </select>
            </div>
          </div>
        );
      
      case 'Wallet':
        return (
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Wallet PIN
              </label>
              <input
                type="password"
                placeholder="Enter 4-digit PIN"
                maxLength="4"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={paymentData.walletPin || ''}
                onChange={(e) => setPaymentData({...paymentData, walletPin: e.target.value.replace(/\D/g, '')})}
              />
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  if (step === 3 && transaction) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
            <i className="fas fa-check-circle text-green-500 text-6xl mb-4"></i>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Payment Successful!
            </h2>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Transaction Details
              </h3>
              <div className="space-y-3 text-left">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Transaction ID:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{transaction.transactionId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Phone Number:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{transaction.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Operator:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{transaction.operator}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Amount:</span>
                  <span className="font-medium text-green-600">₹{transaction.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Status:</span>
                  <span className="font-medium text-green-600">{transaction.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Date:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            
            <button 
              onClick={resetForm}
              className="bg-primary hover:bg-secondary text-white px-6 py-3 rounded-lg font-semibold"
            >
              Recharge Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Payment Method
            </h2>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Recharge Summary</h3>
              <p className="text-gray-600 dark:text-gray-300">Phone: {formData.phone}</p>
              <p className="text-gray-600 dark:text-gray-300">Operator: {formData.operator}</p>
              <p className="text-gray-600 dark:text-gray-300">Amount: ₹{formData.amount}</p>
            </div>

            <div className="space-y-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Select Payment Method
              </h3>
              
              {['UPI', 'Credit Card', 'Debit Card', 'Net Banking', 'Wallet'].map(method => (
                <div 
                  key={method}
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    paymentMethod === method 
                      ? 'border-primary bg-red-50 dark:bg-red-900/20' 
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                  onClick={() => {
                    setPaymentMethod(method);
                    setPaymentData({});
                  }}
                >
                  <div className="flex items-center">
                    <i className={`fas ${
                      method === 'UPI' ? 'fa-mobile-alt' :
                      method === 'Credit Card' ? 'fa-credit-card' :
                      method === 'Debit Card' ? 'fa-credit-card' :
                      method === 'Net Banking' ? 'fa-university' : 'fa-wallet'
                    } mr-3 text-primary`}></i>
                    <span className="font-medium text-gray-900 dark:text-white">{method}</span>
                  </div>
                </div>
              ))}
              
              {renderPaymentForm()}
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep(1)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-3 px-4 rounded-lg"
              >
                Back
              </button>
              <button
                onClick={processPayment}
                disabled={loading || !paymentMethod || !isPaymentDataValid()}
                className="flex-1 bg-primary hover:bg-secondary text-white font-semibold py-3 px-4 rounded-lg disabled:opacity-50"
              >
                {loading ? 'Processing...' : `Pay ₹${formData.amount}`}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Mobile Recharge
          </h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter 10-digit phone number"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                maxLength="10"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select Plan
              </label>
              <div className="grid md:grid-cols-2 gap-4">
                {plans.map(plan => (
                  <div 
                    key={plan.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      formData.planId === plan.id.toString() 
                        ? 'border-primary bg-red-50 dark:bg-red-900/20' 
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                    onClick={() => handlePlanSelect(plan)}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {plan.operator}
                      </span>
                      <span className="text-primary font-bold">₹{plan.amount}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {plan.data} • {plan.validity}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {plan.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={proceedToPayment}
              disabled={!formData.phone || !formData.planId}
              className="w-full bg-primary hover:bg-secondary text-white font-semibold py-3 px-4 rounded-lg disabled:opacity-50 transition-colors"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recharge;