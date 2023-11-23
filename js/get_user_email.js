document.addEventListener('DOMContentLoaded', function () {
    // Retrieve email from sessionStorage
    const user_email = sessionStorage.getItem('user_email');

    // COMMENTED OUT SO WE DON'T HAVE TO BE LOGGED IN WHEN WE TEST
    // // Check if the user is logged in or not
    // if (!user_email) {
    //     // If email is not set, redirect to login page
    //     window.location.href = 'index.html';
    // } else {
        // Else continue loading content and inserting email into a paragraph with id 'userEmailParagraph'
        const user_email_paragraph = document.getElementById('user_logged_in');

        // Check if the element exists before setting textContent
        if (user_email_paragraph) {
            user_email_paragraph.textContent = user_email;
        
        } else {
            console.error("Element with ID 'user_logged_in' not found");
        }
    // }
});