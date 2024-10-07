// Mock data for users
const users = [
    { username: 'admin', password: 'adminpass', role: 'admin' },
    { username: 'employee', password: 'employeepass', role: 'employee' }
];

let employees = [];
let tasks = [];
let employeeTasks = [];
let leaveRequests = []; // Employee leaves to be approved

// Login functionality
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        localStorage.setItem('role', user.role);
        showDashboard(user.role);
    } else {
        document.getElementById('login-error').textContent = 'Invalid username or password';
    }
}

// Show the correct dashboard based on role
function showDashboard(role) {
    document.getElementById('login-page').style.display = 'none';

    if (role === 'admin') {
        document.getElementById('admin-dashboard').style.display = 'block';
    } else if (role === 'employee') {
        document.getElementById('employee-dashboard').style.display = 'block';
        renderEmployeeTasks();
    }
}

// Logout functionality (Redirects to login)
function logout() {
    localStorage.removeItem('role'); // Remove user role from local storage
    window.location.href = 'index.html'; // Redirect to the main login page
}

// Show Employee Settings (Admin functionality)
function showEmployeeSettings() {
    const adminContent = document.getElementById('admin-content');
    adminContent.innerHTML = `
        <div class="dashboard-section">
            <h2>Employee Settings</h2>
            <label for="employee-limit">Employee Limit: </label>
            <input type="number" id="employee-limit" class="input-field" placeholder="Set limit for employee count">
            <button class="blue-button" onclick="saveEmployeeSettings()">Save Changes</button>
            <button class="back-button" onclick="backToAdmin()">Back</button>
        </div>
    `;
}

// Show System Settings (Admin functionality)
function showSystemSettings() {
    const adminContent = document.getElementById('admin-content');
    adminContent.innerHTML = `
        <div class="dashboard-section">
            <h2>System Settings</h2>
            <label for="system-permission">System Permissions: </label>
            <input type="text" id="system-permission" class="input-field" placeholder="Enter system permission level">
            <button class="blue-button" onclick="saveSystemSettings()">Save Changes</button>
            <button class="back-button" onclick="backToAdmin()">Back</button>
        </div>
    `;
}

// Save Employee Settings
function saveEmployeeSettings() {
    const employeeLimit = document.getElementById('employee-limit').value;
    alert(`Employee limit set to: ${employeeLimit}`);
}

// Save System Settings
function saveSystemSettings() {
    const systemPermission = document.getElementById('system-permission').value;
    alert(`System permissions set to: ${systemPermission}`);
}

// Render employee's assigned tasks (Employee functionality)
function renderEmployeeTasks() {
    const employeeTaskList = document.getElementById('employee-task-list');
    employeeTaskList.innerHTML = '';
    employeeTasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task;
        employeeTaskList.appendChild(li);
    });
}

// Submit work report (Employee functionality)
function submitReport() {
    const report = document.getElementById('work-report').value;
    if (report) {
        document.getElementById('work-report').value = '';
        document.getElementById('report-status').textContent = 'Report submitted successfully!';
    }
}

// Request leave (Employee functionality)
function requestLeave() {
    const start = document.getElementById('leave-start').value;
    const end = document.getElementById('leave-end').value;
    if (start && end) {
        leaveRequests.push({ start, end, status: 'Pending' });
        document.getElementById('leave-start').value = '';
        document.getElementById('leave-end').value = '';
        renderLeaveRequests();
    }
}

// Back to Admin Dashboard
function backToAdmin() {
    const adminContent = document.getElementById('admin-content');
    adminContent.innerHTML = `
        <div class="dashboard-section">
            <h2>Admin Settings</h2>
            <button class="blue-button" onclick="showEmployeeSettings()">Employee Settings</button>
            <button class="blue-button" onclick="showSystemSettings()">System Settings</button>
        </div>
    `;
}

// Check for session on page load
document.addEventListener('DOMContentLoaded', () => {
    const role = localStorage.getItem('role');
    if (role) {
        showDashboard(role);
    }
});
