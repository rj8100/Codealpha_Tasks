// Variables to access DOM elements
const expenseForm = document.getElementById('expense-form');
const expenseNameInput = document.getElementById('expense-name');
const expenseAmountInput = document.getElementById('expense-amount');
const expenseList = document.getElementById('expense-list');
const totalExpense = document.getElementById('total-expense');

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// Function to update the total expense
function updateTotal() {
    const total = expenses.reduce((acc, expense) => acc + parseFloat(expense.amount), 0);
    totalExpense.textContent = total.toFixed(2);
}

// Function to render expenses in the UI
function renderExpenses() {
    expenseList.innerHTML = ''; // Clear the list
    expenses.forEach((expense, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${expense.name} - $${expense.amount}
            <button onclick="editExpense(${index})">Edit</button>
            <button onclick="deleteExpense(${index})">Delete</button>
        `;
        expenseList.appendChild(li);
    });
    updateTotal();
}

// Function to add a new expense
function addExpense(e) {
    e.preventDefault();
    const expenseName = expenseNameInput.value;
    const expenseAmount = expenseAmountInput.value;

    if (expenseName && expenseAmount) {
        const expense = { name: expenseName, amount: expenseAmount };
        expenses.push(expense);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        renderExpenses();
        expenseForm.reset();
    }
}

// Function to edit an expense
function editExpense(index) {
    const expense = expenses[index];
    expenseNameInput.value = expense.name;
    expenseAmountInput.value = expense.amount;
    deleteExpense(index); // Remove it to re-add it later
}

// Function to delete an expense
function deleteExpense(index) {
    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    renderExpenses();
}

// Initial rendering of the expenses
renderExpenses();

// Event listener for form submission
expenseForm.addEventListener('submit', addExpense);
