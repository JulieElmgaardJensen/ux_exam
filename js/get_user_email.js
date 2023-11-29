document.addEventListener('DOMContentLoaded', function () {
    // Retrieve email from sessionStorage
    const user_email = sessionStorage.getItem('user_email');

    // COMMENTED OUT SO WE DON'T HAVE TO BE LOGGED IN WHEN WE TEST
    // Redirect to index.html if user is not logged in
    // if (!user_email) {
    //     window.location.href = 'index.html';
    // } else {
        // Else continue loading content and inserting email into a paragraph with id 'user_email_paragraph'
        const user_email_paragraph = document.getElementById('user_logged_in');

        // Check if the element exists before setting textContent
        if (user_email_paragraph) {
            user_email_paragraph.textContent = user_email;
        
        } else {
            console.error("Element with ID 'user_logged_in' not found");
        }
    // }
});