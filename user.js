// Initialize users data
let users = JSON.parse(sessionStorage.getItem('users')) || [];

// Load data into the user table
function loadUserTable() {
    const tableBody = document.getElementById('user-table').querySelector('tbody');
    tableBody.innerHTML = ''; // Clear current table

    users.forEach((user, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${user.name}</td>
            <td>${user.role}</td>
            <td>${user.email}</td>
            <td><button onclick="deleteUser(${index})">Delete</button></td>
        `;
        tableBody.appendChild(row);
    });
}

// Save users to sessionStorage
function saveUsers() {
    sessionStorage.setItem('users', JSON.stringify(users));
}

// Add user to the list
document.getElementById('user-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const role = document.getElementById('role').value;
    const email = document.getElementById('email').value;

    // Create new user object
    const newUser = {
        id: users.length + 1,
        name: name,
        role: role,
        email: email
    };

    users.push(newUser);
    saveUsers();
    loadUserTable(); // Reload the table

    // Reset form
    document.getElementById('user-form').reset();
});

// Delete user
function deleteUser(index) {
    users.splice(index, 1);
    saveUsers();
    loadUserTable();
}

// Initial load
loadUserTable();
