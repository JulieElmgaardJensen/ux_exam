document.addEventListener('DOMContentLoaded', function () {
    // Retrieve email from sessionStorage
    const user_email = sessionStorage.getItem('user_email');

    // Insert email into a paragraph with id 'userEmailParagraph'
    const user_email_paragraph = document.getElementById('user_logged_in');

    // Check if the element exists before setting textContent
    if (user_email_paragraph) {
        user_email_paragraph.textContent = user_email;
        
    } else {
        console.error("Element with ID 'user_logged_in' not found");
    }
});
