function empty_cart_message() {
    const cart_message = document.getElementById('cart_message');
    const cart_items = document.getElementsByClassName('cart_items')[0];

    const cartArray = JSON.parse(localStorage.getItem('CART')) || [];

    console.log('Cart Array:', cartArray);

    if (cartArray.length === 0) {
        console.log('Cart is empty. Displaying message.');
        cart_message.style.display = 'block';
        cart_items.style.display = 'none';
    } else {
        console.log('Cart is not empty. Hiding message.');
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