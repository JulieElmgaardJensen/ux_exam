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
        const d_zip = document.getElementById('d_zip').value;
        const d_city = document.getElementById('d_city').value;
        const d_country = document.getElementById('d_country').value;
        const b_address = document.getElementById('b_address').value;
        const b_zip = document.getElementById('b_zip').value;
        const b_city = document.getElementById('b_city').value;
        const b_country = document.getElementById('b_country').value;
        const credit_card = document.getElementById('credit_card').value;
        const exp_date = document.getElementById('exp_date').value;
        const cvc = document.getElementById('cvc').value;

        const reg_text_input = /^[a-zA-Z\s]+$/;
            const reg_zip_input = /^\d{4}$/;
            const reg_credit_card = /^\d{16}$/;
            const reg_cvc = /^\d{3}$/;

            if (!name.match(reg_text_input)) {
                alert("Please enter a valid name with only letters and spaces.");
                return false;
            }

            if (d_address.length < 1) {
                alert("Please enter a valid delivery address.");
                return true;
            }
            
            if (!d_zip.match(reg_zip_input)) {
                alert("Please enter a zipcode with 4 digits for your delivery address.");
                return false;
            }
            
            if (!d_city.match(reg_text_input)) {
                alert("Please enter a delivery city with letters.");
                return false;
            }

            if (!d_country.match(reg_text_input)) {
                alert("Please enter a delivery country with letters.");
                return false;
            }

            if (b_address.length < 1) {
                alert("Please enter a billing address.");
                return false;
            }

            if (!b_zip.match(reg_zip_input)) {
                alert("Please enter a zipcode with 4 digits for your billing address.");
                return false;
            }

            if (!b_city.match(reg_text_input)) {
                alert("Please enter a billing city with letters.");
                return false;
            }

            if (!b_country.match(reg_text_input)) {
                alert("Please enter a delivery country with letters.");
                return false;
            }

            if (!credit_card.match(reg_credit_card)) {
                alert("Please enter a valid creditcard number with 16 numbers.");
                return false;
            }

            if (!cvc.match(reg_cvc)) {
                alert("Please enter a valid cvc with 3 numbers.");
                return false;
            } 
        
        
        // If form inputs are filled
        if (name && d_address && d_zip && d_city && b_address && b_zip && b_city && credit_card && exp_date && cvc) {   
            // Clear localStorage
            localStorage.clear();
        
            // Redirect to confirmation message
            window.location.href = 'confirmation.html';        
        } }
});