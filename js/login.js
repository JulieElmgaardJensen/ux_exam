// Only use declared variables
'use strict';

// GET LOGIN FORM AND RUN ASYNC FUNCTION WHEN SUBMITTED
document.getElementById('frm_login').addEventListener('submit', async function(event) {
    // PREVENTING DEFAULT TO RUN ASYNC FUNCTION (TROR DEN LADER OS KØRER JAVASCRIPT FØR DEN KØRER FRONTEND VALIDATION, SKAL LIGE TJEKKE OP PÅ DET)
    event.preventDefault();

    // GETTING EMAIL AND PASSWORD INPUT FROM FORM AND DECLARING THEM IN CONSTS
    const email_input = document.getElementById('email');
    const password_input = document.getElementById('password');

    // EMAIL AND PASSWORD INPUT
    const email = email_input.value;
    const password = password_input.value;

   // LOGGING EMAIL AND PASSWORD IN CONSOLE
   console.log(email, password);

    try {
        // ASYNC HTTP REQUEST FOR JSON SERVER
        const response = await fetch('http://localhost:3000/users');
        // WAITING FOR DATA FETCH
        const users = await response.json();
    
        console.log('Fetched user data:', users);
    
        // FIND() METHOD RETURNS FIRST ELEMENT THAT MATCHES THE EMAIL
        const user = users.find(u => u.email === email);
    
        // IF THE USER EMAIL VALUE IS ASSIGNED IN THE JSON DATABASE AND THE INPUT PASSWORD MATCHES A PASSWORD IN THE DATABASE THE USER WILL BE REDIRECTED TO THE SHOP
        // ELSE THE USER WILL SEE AN ALERT SAYING WRONG USER CREDENTIALS
        if (user) {
            if (user.password === password) {
                console.log('Login successful!');
                // SAVING EMAIL IN THE SESSION
                sessionStorage.setItem('user_email', email);
                // REDIRECT TO THE SHOP IF USER LOGIN IS VALID AND EXISTS IN JSON DATABASE
                window.location.href = "shop.html?category=btn_all";
            } else {
                console.log('Incorrect password');
                alert('Incorrect password');
            }
        } else {
            console.log('Email does not exist in the database');
            alert('Invalid email');
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
   
});
