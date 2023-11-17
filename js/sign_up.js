//Install server: npm install -g json-server
//start server: json-server db.json
//If the server wont start type: Set-ExecutionPolicy RemoteSigned -Scope CurrentUser

// Only use declared variables
'use strict';

//Regex 
const password_validator = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

// Get the url for the json server
const url = 'http://localhost:3000/users'; // Replace with your JSON server endpoint

document.getElementById("frm_signup").addEventListener('submit', async (e)=>{
    e.preventDefault();

    const email_input = document.getElementById("email"); 
    const password_input = document.getElementById("password");
    const confirm_password_input = document.getElementById("confirm_password");
    
    console.log(password_input.value);

    // Validate the password input
        if(!password_input.value.match(password_validator)){
                alert('Enter a valid password');
                return false;
            };

    // Validate the password input
        if(password_input.value !== confirm_password_input.value){
            alert('The passwords dont match');
            return false;
        };

    // Check if the email already exists
    const existing_email_response = await fetch(`${url}?email=${email_input.value}`);
    const existing_emails = await existing_email_response.json();

        if (existing_emails.length > 0) {
            alert('A user with this email already exists. Please use a different email.');
            return false;
        }

    // Create a new user object
    const new_user = {
    email: email_input.value,
    password: password_input.value,
    };

    // Send a POST request to add the new user via try catch
    try {
        const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(new_user),
        });

        if (response.ok) {

            //If the user is added, redirect to the login page after closing the alert
            window.location.href = 'login.html';  

            alert('Sucessfully signed up! You will now be redirected to the login page!');

        }   else{
            alert('Error adding user. Please try again.');
        }

    }catch(error){   
        console.error('Error adding user:', error);
        alert('Error adding user. Please try again.');
    }
});