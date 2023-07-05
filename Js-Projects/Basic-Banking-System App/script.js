// Get the necessary elements from the HTML code
const sendMoneyForm = document.querySelector('#send-money form');
const transactionHistoryTable = document.querySelector('#transaction-history table tbody');
const clearHistoryButton = document.querySelector('#clear-history');
const clearUserButton = document.querySelector('#clear-user');
const addUserForm = document.querySelector('#add-user form');
const userListTable = document.querySelector('#user-list tbody');

// Create an array to store the transaction history data
let transactionHistory = [];

// Create an array to store the user data
let userList = []; 

// Function to add a new transaction to the history array and update the HTML table
function addTransactionToHistory(recipient, email, amount) {
  // Create a new transaction object with the current date and time
  const transaction = { 
    date: new Date(),
    recipient: recipient,
    email: email,
    amount: amount
  };
  
  // Add the transaction to the transaction history array
  transactionHistory.push(transaction);
  
  // Create a new row in the HTML table for the transaction
  const newRow = document.createElement('tr');
  newRow.innerHTML = `
    <td>${transaction.date.toLocaleString()}</td>
    <td>${transaction.recipient}</td>
    <td>${transaction.email}</td>
    <td>${transaction.amount}</td>
  `;
  
  // Add the new row to the HTML table
  transactionHistoryTable.appendChild(newRow);
}

// Event listener for the send money form submission
sendMoneyForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission behavior
  
  // Get the input values from the form
  const recipient = document.querySelector('#recipient').value;
  const email = document.querySelector('#email').value;
  const amount = document.querySelector('#amount').value;

  const sendMoneybtn = document.getElementById("send-money-btn");
  sendMoneybtn.addEventListener("click", function() {
    // Code to add user goes here
    if (!recipient || !email || !amount) {
      alert('Please fill out all fields before submitting the form.');
      return;
    }else{
      // Show alert when user is added
      alert("Money Sending successfully!");
    }

  });
  
  // Add the transaction to the transaction history
  addTransactionToHistory(recipient, email, amount);
  
  // Reset the form
  sendMoneyForm.reset();
});

// Event listener for the clear history button
clearHistoryButton.addEventListener('click', function() {
  // Remove all rows from the HTML table
  transactionHistoryTable.innerHTML = '';
  
  // Clear the transaction history array
  transactionHistory = [];
});

// Function to add a new user to the HTML table
function addUserToTable(username, email, balance) {

  const newUserRow = document.createElement('tr');
  newUserRow.innerHTML = `
    <td>${username}</td>
    <td>${email}</td>
    <td>${balance}</td>
  `;
  
  userListTable.appendChild(newUserRow);
}

// Event listener for the add user form submission
addUserForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission behavior
  
  // Get the input values from the form
  const username = document.querySelector('#username').value;
  const email = document.querySelector('#add-user #email').value;
  const balance = document.querySelector('#balance').value;
  
  const addUserBtn = document.getElementById("add-user-btn");
  addUserBtn.addEventListener("click", function() {
    // Code to add user goes here
    if (!username || !email || !balance) {
      alert('Please fill out all fields before submitting the form.');
      return;
    }else{
      // Show alert when user is added
      alert("User added successfully!");
    }
  });

  // Add the user to the user list
  addUserToTable(username, email, balance);
  
  // Reset the form
  addUserForm.reset();
});

// Event listener for the clear history button
clearUserButton.addEventListener('click', function() {
  // Remove all rows from the HTML table
  userListTable.innerHTML = '';
  
  // Clear the transaction history array
  userList = [];
});



// Populate the user list with some initial data
// addUserToTable('Alice', 'alice@example.com', 1000);
// addUserToTable('Bob', 'bob@example.com', 2000);
