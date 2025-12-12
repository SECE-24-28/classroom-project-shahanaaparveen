import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [recentTransactions, setRecentTransactions] = useState([]);

  useEffect(() => {
    // Load recent transactions from localStorage
    const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    setRecentTransactions(transactions.slice(0, 5));
  }, []);

  const quickRechargeAmounts = [99, 199, 399, 599];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome back, {user?.name}!</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">Manage your mobile recharges and view transaction history</p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link to="/recharge" className="card hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Mobile Recharge</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Recharge your mobile</p>
              </div>
            </div>
          </Link>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-500 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Bill Payment</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Pay utility bills</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Offers</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Special deals</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">History</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Transaction history</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Recharge */}
        <div className="card mb-8">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Quick Recharge</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickRechargeAmounts.map(amount => (
              <Link
                key={amount}
                to={`/recharge?amount=${amount}`}
                className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg text-center hover:border-primary hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="text-lg font-semibold text-gray-900 dark:text-white">₹{amount}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Quick recharge</div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Recent Transactions</h2>
          {recentTransactions.length > 0 ? (
            <div className="space-y-4">
              {recentTransactions.map((transaction, index) => (
                <div key={index} className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <div className="font-medium dark:text-white">{transaction.phone}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">{transaction.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-green-600">₹{transaction.amount}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">{transaction.status}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <p className="dark:text-gray-400">No recent transactions</p>
              <Link to="/recharge" className="text-primary hover:text-secondary">
                Make your first recharge
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;