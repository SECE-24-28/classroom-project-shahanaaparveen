import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { validateForm } from '../utils/validation';
import { fetchRechargePlans, processRecharge } from '../utils/api';

const Recharge = () => {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    phone: '',
    operator: '',
    amount: searchParams.get('amount') || '',
    planType: 'prepaid'
  });
  const [errors, setErrors] = useState({});
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  
  const { user } = useAuth();
  const navigate = useNavigate();

  const operators = [
    'Airtel', 'Jio', 'Vi (Vodafone Idea)', 'BSNL', 'Aircel'
  ];

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    try {
      const plansData = await fetchRechargePlans();
      setPlans(plansData);
    } catch (error) {
      console.error('Error loading plans:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleNext = () => {
    const validationErrors = validateForm(formData, ['phone', 'amount']);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    if (!formData.operator) {
      setErrors({ operator: 'Please select an operator' });
      return;
    }
    
    setStep(2);
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setFormData(prev => ({
      ...prev,
      amount: plan.price.toString()
    }));
  };

  const handleRecharge = async () => {
    setLoading(true);
    
    try {
      const rechargeData = {
        ...formData,
        plan: selectedPlan,
        userId: user.id,
        timestamp: new Date().toISOString()
      };
      
      const result = await processRecharge(rechargeData);
      
      if (result.success) {
        // Save transaction to localStorage
        const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
        transactions.unshift({
          ...rechargeData,
          transactionId: result.transactionId,
          status: 'Success',
          date: new Date().toLocaleDateString()
        });
        localStorage.setItem('transactions', JSON.stringify(transactions));
        
        // Show success and redirect
        alert(`Recharge successful! Transaction ID: ${result.transactionId}`);
        navigate('/dashboard');
      }
    } catch (error) {
      alert('Recharge failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filteredPlans = plans.filter(plan => plan.type === formData.planType);

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Mobile Recharge</h1>
          <p className="text-gray-600 mt-2">Recharge your mobile with the best plans</p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-primary text-white' : 'bg-gray-300'}`}>
              1
            </div>
            <div className={`w-16 h-1 ${step >= 2 ? 'bg-primary' : 'bg-gray-300'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-primary text-white' : 'bg-gray-300'}`}>
              2
            </div>
          </div>
        </div>

        {step === 1 && (
          <div className="card max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold mb-6">Enter Recharge Details</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  className={`input-field ${errors.phone ? 'border-red-500' : ''}`}
                  placeholder="Enter 10-digit mobile number"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Operator
                </label>
                <select
                  name="operator"
                  className={`input-field ${errors.operator ? 'border-red-500' : ''}`}
                  value={formData.operator}
                  onChange={handleChange}
                >
                  <option value="">Select Operator</option>
                  {operators.map(operator => (
                    <option key={operator} value={operator}>{operator}</option>
                  ))}
                </select>
                {errors.operator && <p className="mt-1 text-sm text-red-600">{errors.operator}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Plan Type
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="planType"
                      value="prepaid"
                      checked={formData.planType === 'prepaid'}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    Prepaid
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="planType"
                      value="postpaid"
                      checked={formData.planType === 'postpaid'}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    Postpaid
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount (₹)
                </label>
                <input
                  type="number"
                  name="amount"
                  className={`input-field ${errors.amount ? 'border-red-500' : ''}`}
                  placeholder="Enter amount"
                  value={formData.amount}
                  onChange={handleChange}
                />
                {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount}</p>}
              </div>

              <button
                onClick={handleNext}
                className="w-full btn-primary"
              >
                Continue to Plans
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <div className="card mb-6">
              <h2 className="text-xl font-semibold mb-4">Select Recharge Plan</h2>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p><strong>Mobile:</strong> {formData.phone}</p>
                <p><strong>Operator:</strong> {formData.operator}</p>
                <p><strong>Type:</strong> {formData.planType}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {filteredPlans.map(plan => (
                <div
                  key={plan.id}
                  className={`card cursor-pointer transition-all ${
                    selectedPlan?.id === plan.id 
                      ? 'border-2 border-primary bg-gray-50' 
                      : 'hover:shadow-lg'
                  }`}
                  onClick={() => handlePlanSelect(plan)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg">{plan.name}</h3>
                    <span className="text-2xl font-bold text-primary">₹{plan.price}</span>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p><strong>Validity:</strong> {plan.validity}</p>
                    <p><strong>Data:</strong> {plan.data}</p>
                    <p>{plan.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => setStep(1)}
                className="btn-secondary"
              >
                Back
              </button>
              <button
                onClick={handleRecharge}
                disabled={!selectedPlan || loading}
                className="btn-primary flex-1 disabled:opacity-50"
              >
                {loading ? 'Processing...' : `Recharge ₹${selectedPlan?.price || formData.amount}`}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recharge;