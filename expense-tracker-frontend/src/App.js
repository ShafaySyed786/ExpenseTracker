import './App.css';
import React, { useState, useEffect } from 'react';
import ExpenseList from './ExpenseList';
import ExpenseChart from './ExpenseChart';
import AddExpenseForm from './AddExpenseForm';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


function App() {
  const [expenses, setExpenses] = useState([]);

  const [analytics, setAnalytics] = useState({
    totalExpensesPerMonth: [],
    averageExpense: 0
  });

  const handleAddExpense = (newExpense) => {
    fetch('http://localhost:8000/api/expenses/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newExpense),
    })
    .then(response => response.json())
    .then(data => {
      setExpenses(prevExpenses => [...prevExpenses, data]);
    })
    .catch(error => console.error('Error:', error));
  };
  
  const calculateAnalytics = (expensesData) => {
    // Group expenses by month and calculate totals
    const totalsByMonth = expensesData.reduce((acc, expense) => {
      const month = expense.date.substring(0, 7); // 'YYYY-MM'
      if (!acc[month]) {
        acc[month] = 0;
      }
      acc[month] += expense.amount;
      return acc;
    }, {});
  
    // Convert to the format suitable for Chart.js
    const analyticsData = {
      totalExpensesPerMonth: Object.entries(totalsByMonth).map(([month, total]) => ({ month, total })),
    };
  
    return analyticsData;
  };
  

  const formatChartData = () => {
    return {
      labels: analytics.totalExpensesPerMonth.map(item => item.month),
      datasets: [
        {
          label: 'Total Expenses Per Month',
          data: analytics.totalExpensesPerMonth.map(item => item.total),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        }
      ],
    };
  };  

  useEffect(() => {
    const analyticsData = calculateAnalytics(expenses);
    setAnalytics(analyticsData);
  }, [expenses]);  
     
  useEffect(() => {
    fetch('http://localhost:8000/api/expenses/')
      .then(response => response.json())
      .then(data => {
        setExpenses(data);
        // We will calculate analytics data based on this data
      })
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div className="App">
      <AddExpenseForm onAddExpense={handleAddExpense} />
      <ExpenseList expenses={expenses} />
      <ExpenseChart chartData={formatChartData()} />
    </div>
  );
}

export default App;
