// Fetch the users stored in sessionStorage
function updateDashboard() {
    const users = JSON.parse(sessionStorage.getItem('users')) || [];
    const totalUsers = users.length;
    const totalAdmins = users.filter(user => user.role === 'Admin').length;
    const totalInstructors = users.filter(user => user.role === 'Instructor').length;
    const totalStudents = users.filter(user => user.role === 'Student').length;

    // Update dashboard stats
    document.getElementById('user-count').textContent = totalUsers;
    document.getElementById('admin-count').textContent = totalAdmins;
    document.getElementById('instructor-count').textContent = totalInstructors;
    document.getElementById('student-count').textContent = totalStudents;

    // Update user grid with all users by default
    updateUserGrid(users);
}

// Load users into grid view
function updateUserGrid(users, category = 'all') {
    const userGrid = document.getElementById('user-grid');
    userGrid.innerHTML = ''; // Clear the current grid

    // Filter users based on the selected category
    let filteredUsers = users;
    if (category !== 'all') {
        filteredUsers = users.filter(user => user.role === category);
    }

    // If no users found in the selected category, show a message
    if (filteredUsers.length === 0) {
        userGrid.innerHTML = `<p>No users in the ${category} category.</p>`;
        return;
    }

    // Create user cards for the filtered users
    filteredUsers.forEach(user => {
        const card = document.createElement('div');
        card.classList.add('user-card');
        card.innerHTML = `
            <i class="fas fa-user"></i>
            <h3>${user.name}</h3>
            <p>${user.role}</p>
        `;
        userGrid.appendChild(card);
    });
}

// Handle click events on stat cards
function handleStatCardClick(event) {
    const category = event.target.closest('.stat-card').getAttribute('data-category');
    const users = JSON.parse(sessionStorage.getItem('users')) || [];
    updateUserGrid(users, category);
}

// Set up event listeners for stat cards
const statCards = document.querySelectorAll('.stat-card');
statCards.forEach(card => {
    card.addEventListener('click', handleStatCardClick);
});

// Initial load
updateDashboard();

// Optional: Update dashboard stats when data changes
window.addEventListener('storage', updateDashboard);
