// Handle login form submission
document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    // Get the username and password values
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Basic validation for login (in a real-world app, you'd connect to a backend)
    if (username === '' || password === '') {
        alert('Please enter both username and password.');
        return;
    }

    // Assume successful login for now
    alert('Login successful!');

    // Redirect to dashboard (adjust URL as necessary)
    window.location.href = 'dashboard.html';
});

// Show the create account form
document.getElementById('create-account-link').addEventListener('click', function (event) {
    event.preventDefault();
    document.querySelector('.login-container').style.display = 'none';
    document.getElementById('create-account-container').style.display = 'flex';
});

// Handle create account form submission
document.getElementById('create-account-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const newUsername = document.getElementById('new-username').value;
    const newEmail = document.getElementById('new-email').value;
    const newPassword = document.getElementById('new-password').value;

    if (newUsername === '' || newEmail === '' || newPassword === '') {
        alert('Please fill in all fields.');
        return;
    }

    // Simulate account creation (in a real-world app, you'd store the new account data in a database)
    alert('Account created successfully!');

    // Redirect to login page (or dashboard)
    window.location.href = 'index.html';
});

// Show the forgot password form
document.getElementById('forgot-password-link').addEventListener('click', function (event) {
    event.preventDefault();
    document.querySelector('.login-container').style.display = 'none';
    document.getElementById('forgot-password-container').style.display = 'flex';
});

// Handle forgot password form submission
document.getElementById('forgot-password-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const resetEmail = document.getElementById('reset-email').value;

    if (resetEmail === '') {
        alert('Please enter your email.');
        return;
    }

    // Simulate password reset (in a real-world app, you'd send a reset link to the user's email)
    alert('Password reset link sent to ' + resetEmail);

    // Redirect to login page after submitting
    window.location.href = 'login.html';
});

// Go back to login from create account page
document.getElementById('back-to-login').addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById('create-account-container').style.display = 'none';
    document.querySelector('.login-container').style.display = 'flex';
});

// Go back to login from forgot password page
document.getElementById('back-to-login-from-forgot').addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById('forgot-password-container').style.display = 'none';
    document.querySelector('.login-container').style.display = 'flex';
});
