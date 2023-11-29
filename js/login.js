// Only use declared variables
'use strict';

// Get login form and run async function when form is submitted
document.getElementById('frm_login').addEventListener('submit', async function(event) {
    event.preventDefault();

    const email_input = document.getElementById('email');
    const password_input = document.getElementById('password');

    // Email and password input value
    const email = email_input.value;
    const password = password_input.value;

    try {
        // Fetch request to JSON server
        const response = await fetch('http://localhost:3000/users');
        
        // Check response is ok
        if (!response.ok) {
            throw new Error('Error fetching user data!');
        }

        const users = await response.json();
    
        // Using function find() to find email in server
        const user = users.find(u => u.email === email);

        // Redirect to shop.html if user email and password is valid
        if (user) {
            if (user.password === password) {
                // Saving user email in session
                sessionStorage.setItem('user_email', email);
                // Redirect to shop.html
                window.location.href = '/html/shop.html?category=all';
            } else {
                alert('Invalid password');
            }
        } else {
            alert('Invalid email');
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
});
