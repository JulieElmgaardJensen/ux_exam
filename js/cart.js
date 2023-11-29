// Render cart items and subtotal
update_cart();

// Update cart
function update_cart(){
    render_cart_items();
    render_subtotal();

    // localStorage her:
    localStorage.setItem("CART", JSON.stringify(cart));
}

// Show products in cart
function render_cart_items(){

    // Clear cart element
    cart_items_el.innerHTML = "";

    cart.forEach((item) => {
        cart_items_el.innerHTML += `
                <div class="cart_item">
                    <div class="grid">
                        <div class="bg_img">
                            <img class="img_cart" src="${item.image}" alt="${item.title}">
                        </div>
                            <div>
                                <span class="cart_item_title">${item.title}</span>
                                <div class="units flex">
                                    <div class="minus" onclick="change_number_of_units('minus', ${item.id})">-</div>
                                    <span class="cart_number">${item.number_of_units}</span>
                                    <div class="plus" onclick="change_number_of_units('plus', ${item.id})">+</div>
                                </div>
                            </div>
                            <div class="cart_price_remove">
                                <span class="cart_price">${item.price} $</span>
                                <button class="btn_remove fa-solid fa-trash-can fa-lg" onclick="remove_item_from_cart(${item.id})"></button>
                            </div>
                    </div>
                </div>
        `;
    });
}

// Update subtotal
function render_subtotal(){
    let total_price = 0;
    let total_items = 0;
    let total_cart = 0;
    const delivery_fee = 5;

    cart.forEach((item) => {
        total_price += item.price * item.number_of_units;
        total_items += item.number_of_units;
        total_cart = total_price + delivery_fee;
    });

    // toFixed so we only have numbers with two decimals
    subtotalt_el.innerHTML = `${total_price.toFixed(2)} $`;
    totalt_el.innerHTML = `${total_cart.toFixed(2)} $`;
}

// Remove item from cart
function remove_item_from_cart(id){
    // Filter all elements in cart where item id is not the 
    cart = cart.filter( (item) => item.id !== id)

    update_cart();

    location.reload();
}

// Change number of units in cart
function change_number_of_units(action,id){
    // Uses map method will run this function on every element in the cart and return a new updated array
    cart = cart.map((item) => {

        let number_of_units = item.number_of_units

        //find the item with the right id
        if(item.id === id){
            if(action === "minus" && number_of_units > 1){
                number_of_units--
            }else if(action === "plus"){
                number_of_units++
            }
        }
        return {
            ...item,
            number_of_units,
        };
    });
    update_cart();
}

// Checkout cart
const order_purchase = document.getElementById('btn_purchase');

// Event listener listens for click on button with id="btn_purchase"
order_purchase.addEventListener('click', function (event) {
    // Prevent default form submission
    event.preventDefault();

    // Check if there are items in the cart
    const cart_items = document.querySelector('.cart_items');

    // If there are no items in the cart send an alert with error message
    if (cart_items.children.length === 0) {
        alert('Your cart is empty. Add items before confirming the purchase.');
    } else {
        // Form inputs
        const name = document.getElementById('name').value;
        const d_address = document.getElementById('d_address').value;
        const p_code = document.getElementById('p_code').value;
        const city = document.getElementById('city').value;
        const b_address = document.getElementById('b_address').value;
        const b_code = document.getElementById('b_code').value;
        const b_city = document.getElementById('b_city').value;
        const credit_card = document.getElementById('credit_card').value;
        const exp_date = document.getElementById('exp_date').value;
        const cvc = document.getElementById('cvc').value;

        // If form inputs are filled
        if (name && d_address && p_code && city && b_address && b_code && b_city && credit_card && exp_date && cvc) {   
            // Clear localStorage
            localStorage.clear();
        
            // Redirect to confirmation message
            window.location.href = 'confirmation.html';        
        } else {
            // Else alert an error message
            alert('Please fill in all required fields');
        }
    }
});