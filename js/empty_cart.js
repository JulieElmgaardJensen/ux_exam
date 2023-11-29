// If the cart is empty display the cart message, else display none
function empty_cart_message() {
    const cart_message = document.getElementById('cart_message');
    const cart_items = document.getElementsByClassName('cart_items')[0];

    const cart_array = JSON.parse(localStorage.getItem('CART')) || [];

    if (cart_array.length === 0) {
        cart_message.style.display = 'block';
        cart_items.style.display = 'none';
    } else {
        cart_message.style.display = 'none';
        cart_items.style.display = 'block';
    }
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', empty_cart_message);

// Listen for changes in the localStorage
window.addEventListener('storage', function (event) {
    // Check if the CART key is modified
    if (event.key === 'CART') {
        empty_cart_message();
    }
});