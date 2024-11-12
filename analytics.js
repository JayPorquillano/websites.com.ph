// Initialize users array (in case sessionStorage is empty)
let users = [];

// Load data from sessionStorage or initialize empty users array
function loadData() {
    const savedData = sessionStorage.getItem('users');
    if (savedData) {
        users.length = 0; // Clear existing users array
        users.push(...JSON.parse(savedData)); // Load saved users data
    }
}

// Save data to sessionStorage
function saveData() {
    sessionStorage.setItem('users', JSON.stringify(users));
}

// Update the analytics data based on the current users
function updateAnalytics() {
    loadData();

    const studentCount = users.filter(user => user.role === 'Student').length;
    const instructorCount = users.filter(user => user.role === 'Instructor').length;
    const adminCount = users.filter(user => user.role === 'Admin').length;

    // Update the DOM with user counts
    document.getElementById('student-count').textContent = studentCount;
    document.getElementById('instructor-count').textContent = instructorCount;
    document.getElementById('admin-count').textContent = adminCount;

    document.getElementById('total-users').textContent = users.length;

    // Update charts
    updateCharts(studentCount, instructorCount, adminCount);
}

// Create charts with Chart.js
function updateCharts(studentCount, instructorCount, adminCount) {
    const ctx = document.getElementById('userRoleChart').getContext('2d');

    if (window.chartInstance) {
        window.chartInstance.destroy(); // Destroy previous chart if it exists
    }

    window.chartInstance = new Chart(ctx, {
        type: 'line',  // Change to 'line' for line chart
        data: {
            labels: ['Students', 'Instructors', 'Admins'],
            datasets: [{
                label: 'User Distribution by Role',
                data: [studentCount, instructorCount, adminCount],
                backgroundColor: ['#800000', '#FF6600', '#0066CC'],
                borderColor: ['#800000', '#FF6600', '#0066CC'],
                borderWidth: 2,
                fill: false, // Spline chart without fill
                tension: 0.4 // Spline effect
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        precision: 0 // Remove decimals on Y axis
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return tooltipItem.label + ': ' + tooltipItem.raw;
                        }
                    }
                }
            }
        }
    });
}

// Initialize analytics on page load
updateAnalytics();

// Generate CSV report
function generateCSV() {
    const csvHeader = 'ID,Name,Role,Email\n';
    const csvRows = users.map(user => `${user.id},${user.name},${user.role},${user.email}`).join('\n');
    const csvContent = csvHeader + csvRows;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'user_report.csv';
    link.click();
}

// Generate and print PDF report
function generatePDF() {
    const doc = new jsPDF();
    const title = 'User Report';
    const header = ['ID', 'Name', 'Role', 'Email'];
    const body = users.map(user => [user.id, user.name, user.role, user.email]);

    doc.text(title, 20, 20);
    doc.autoTable({
        head: [header],
        body: body,
        startY: 30
    });

    // Trigger the print dialog instead of saving as PDF
    doc.autoPrint();
    doc.output('dataurlnewwindow');
}

// Add event listeners for generating reports
document.getElementById('generate-csv').addEventListener('click', generateCSV);
document.getElementById('generate-pdf').addEventListener('click', generatePDF);

// Optionally, listen for changes (if real-time data updates are needed)
window.addEventListener('storage', updateAnalytics);  // Updates when storage changes
