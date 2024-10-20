"use client";
import React from "react";

const Dashboard = () => {
  // Generate random data
  const totalExpense = Math.floor(Math.random() * 10000);
  const expenseSplits = [
    { name: "Food", amount: Math.floor(Math.random() * 3000) },
    { name: "Transport", amount: Math.floor(Math.random() * 2000) },
    { name: "Entertainment", amount: Math.floor(Math.random() * 1500) },
    { name: "Utilities", amount: Math.floor(Math.random() * 1000) },
  ];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">        
        {/* Total Expense Card */}
        <div className="bg-white flex justify-between shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Total Expense</h2>
          <p className="text-4xl font-bold text-indigo-600">&#8377;{totalExpense.toLocaleString()}</p>
        </div>
        
        {/* Expense Splits */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Expense Splits</h2>
          <div className="space-y-4">
            {expenseSplits.map((split, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-600">{split.name}</span>
                <span className="text-lg font-medium text-gray-800">&#8377;{split.amount.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;