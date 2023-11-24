import React, { useState, useEffect } from 'react';

const ExpenseList = () => {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/api/expenses/')
            .then(response => response.json())
            .then(data => setExpenses(data));
    }, []);

    return (
        <div>
            <h1>Expense List</h1>
            <u1>
                {expenses.map(expense => (
                    <li key={expense.id}>
                        {expense.description} - ${expense.amount} on {expense.data}
                    </li>
                ))}
            </u1>
        </div>
    );
};

export default ExpenseList;