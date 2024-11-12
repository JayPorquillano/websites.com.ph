// Function to save all settings
function saveSettings(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Get the settings values
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const theme = document.getElementById('theme').value;
    const notifications = document.getElementById('notifications').checked;
    const inAppNotifications = document.getElementById('inapp-notifications').checked;
    const language = document.getElementById('language').value;

    // Save settings to localStorage
    localStorage.setItem('username', username);
    localStorage.setItem('email', email);
    localStorage.setItem('password', password); // This could be hashed and securely stored
    localStorage.setItem('theme', theme);
    localStorage.setItem('notifications', notifications);
    localStorage.setItem('inapp-notifications', inAppNotifications);
    localStorage.setItem('language', language);

    // Apply the theme to the body immediately
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);

    // Apply the language settings immediately (if you have dynamic language options, this part will need to be expanded)
    document.documentElement.lang = language;

    // Alert the user that settings are saved
    alert('Settings saved successfully!');

    // You can redirect to another page or update the UI as needed after saving.
}

// Function to cancel settings and revert to last saved settings
function cancelSettings() {
    loadSettings(); // Reset settings to the saved state in localStorage
}

// Function to load the saved settings
function loadSettings() {
    const username = localStorage.getItem('username') || '';
    const email = localStorage.getItem('email') || '';
    const theme = localStorage.getItem('theme') || 'light'; // Default to light
    const notifications = localStorage.getItem('notifications') === 'true';
    const inAppNotifications = localStorage.getItem('inapp-notifications') === 'true';
    const language = localStorage.getItem('language') || 'en';

    // Apply theme to the page
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);

    // Populate the form with saved values
    document.getElementById('username').value = username;
    document.getElementById('email').value = email;
    document.getElementById('theme').value = theme;
    document.getElementById('notifications').checked = notifications;
    document.getElementById('inapp-notifications').checked = inAppNotifications;
    document.getElementById('language').value = language;

    // Apply language settings (if you have dynamic content, this can be expanded)
    document.documentElement.lang = language;
}

// Add event listeners
document.getElementById('save-settings').addEventListener('click', saveSettings);
document.getElementById('cancel-settings').addEventListener('click', cancelSettings);

// Load settings on page load
window.onload = loadSettings;
