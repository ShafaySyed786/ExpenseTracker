import './App.css';
import React, { useState } from 'react';
import ExpenseList from './ExpenseList';
import AddExpenseForm from './AddExpenseForm';

function App() {
  const [expenses, setExpenses] = useState([]);

  const handleAddExpense = (newExpense) => {
    fetch('http://localhost:8000/api/expenses/', {
      method: 'POST',
      headsers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newExpense),
    })
    .then(response => response.json())
    .then(data => {
      // this updates the expenses state with the new expense
      setExpenses([...expenses, data]);
    })
    .catch(error => console.error('Error:', error));
  };

  return (
    <div className="App">
      <AddExpenseForm onAddExpense={handleAddExpense} />
      <ExpenseList espenses={expenses} />
    </div>
  );
}

export default App;
