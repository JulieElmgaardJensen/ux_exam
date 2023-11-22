// ONLY USES VARIABLES THAT ARE DECLARED
'use strict';

// VARIABLE FOR THE SECTION IN shop.html
const product = document.getElementsByClassName("product");

// VARIABLES FOR ALL ELEMENTS IN EACH PRODUCT
const product_img = document.getElementsByClassName("product_img");
const product_rate = document.getElementsByClassName("product_rate");
const product_count = document.getElementsByClassName("product_count");
const product_category = document.getElementsByClassName("product_category");
const product_title = document.getElementsByClassName("product_title");
const product_description = document.getElementsByClassName("product_description");
const product_price = document.getElementsByClassName("product_price");

//now we can call it outside the fetch_products function
let response;
const cart_items_el = document.querySelector('.cart_items');
const subtotalt_el = document.querySelector('.cart_subtotal_price');
const totalt_el = document.querySelector('.cart_total_price');

// Waiting for the DOM content to be fully loaded before executing the code
document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault();
    
    let products = document.querySelector('.product');

    // FETCH PRODUCTS
    async function fetch_products(url) {
        let data = await fetch(url);
        response = await data.json();

        // Clear existing products
        products.innerHTML = '';

    // LOOP ELEMENTS IN
    for (let i = 0; i < response.length; i++) {

        // INDIVIDUAL ATTRIBUTES FOR EACH PRODUCT
        const id = response[i].id;
        const title = response[i].title;
        const price = response[i].price;
        const description = response[i].description;
        const category = response[i].category;
        const image = response[i].image;
        const rate = response[i].rating.rate;
        const count = response[i].rating.count;
        
        products.innerHTML += ` <div class="card">
                                    <div class="bg_img">
                                        <img src="${image}" alt="${title}" class="product_img">
                                    </div>
                                    
                                    <div class="flex">
                                        <i class="fa-solid fa-star"></i>
                                        <p class="product_rate">${rate}</p> 
                                        <p class="product_count">(${count})</p>
                                    </div>
                                    <h4 class="product_category">${category}</h4>
                                    <h3 class="product_title">${title}</h3>
                                    <p id="text_id${id}" class="show_text">${description}</p>
                                    <button id="show_more_description${id}" onclick="toggleText('${id}')" class="btn_show_description">Show More</button>
                                    <div class="product_price_submit">
                                        <p id="price ${id}" class="product_price">${price} $</p>
                                        <div onclick="add_to_cart(${id})">
                                            <input type="submit" id="submit" class="btn_submit" value="Add to cart"> 
                                        </div>
                                    </div>        
                                </div>
                                `;              
        }
    }

            // Get the category from button
            const womens = document.getElementById('btn_womens');
            const jewelery = document.getElementById('btn_jewelery');
            const mens = document.getElementById('btn_mens');
            const electronics = document.getElementById('btn_electronics');

            let fetch_url = 'https://fakestoreapi.com/products';

            womens.addEventListener('click', function () {
                fetch_url = "https://fakestoreapi.com/products/category/women's%20clothing";
                fetch_products(fetch_url);
            });

            jewelery.addEventListener('click', function () {
                fetch_url = 'https://fakestoreapi.com/products/category/jewelery';
                fetch_products(fetch_url);
            });

            mens.addEventListener('click', function () {
                fetch_url = "https://fakestoreapi.com/products/category/men's%20clothing";
                fetch_products(fetch_url);
            });

            electronics.addEventListener('click', function () {
                fetch_url = 'https://fakestoreapi.com/products/category/electronics';
                fetch_products(fetch_url);
            }); 

            // Fetch all products
            fetch_products(fetch_url);
            
});


// Empty cart array from start - localstorage for saving elements
let cart = JSON.parse(localStorage.getItem("CART")) || [];
//render cart items and subtotal
update_cart();

// Add to cart
function add_to_cart(id){
    //check if product already exist in cart
    if(cart.some((item) => item.id === id)){
        change_number_of_units("plus", id);
    }else{
        const item = response.find((product) => product.id === id);
        //tilføjer en ekstra attribut til hvert produkt
        cart.push({
            ...item,
            number_of_units : 1
        });
    }
    update_cart();
}

// Update cart
function update_cart(){
    render_cart_items();
    render_subtotal();

    // localStorage her:
    localStorage.setItem("CART", JSON.stringify(cart));
}

// Update subtotal
function render_subtotal(){
    let total_price = 0;
    let total_items = 0;
    let total_cart = 0;
    let delviery_fee = 5;

    cart.forEach((item) => {
        total_price += item.price * item.number_of_units;
        total_items += item.number_of_units;
        //virker ikke ordenligt
        total_cart += (item.price * item.number_of_units) + delviery_fee;
    });

    //toFixed so we only have numbers with two decimals
    subtotalt_el.innerHTML = `${total_price.toFixed(2)} $`;
    //Virker ikke ordenligt
    totalt_el.innerHTML = `${total_cart.toFixed(2)} $`;
}

// Show products in cart
function render_cart_items(){
    //clear cart element
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
// Remove item from cart
function remove_item_from_cart(id){
    //filter all elements in cart where item id is not the 
    cart = cart.filter( (item) => item.id !== id)

    update_cart();
}
// Change number of units in cart
function change_number_of_units(action,id){
    //uses map method will run this function on every element in the cart and return a new updated array
    cart = cart.map((item) => {

        let number_of_units = item.number_of_units

        //find the item with the right id
        if(item.id === id){
            if(action === "minus"){
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


function toggleText(product_id) {
    // Construct the id for the text element based on the productId
    var textElement = document.getElementById(`text_id${product_id}`);
    
    // Construct the id for the button element based on the productId
    var buttonElement = document.getElementById(`show_more_description${product_id}`);

    // Check if the textElement has the 'show_text' class
    if (textElement.classList.contains('show_text')) {
        // If it has the class, remove it to hide the text
        textElement.classList.remove('show_text');
        // Change the button text to 'Show Less'
        buttonElement.textContent = 'Show Less';
    } else {
        // If it doesn't have the class, add it to display the full text
        textElement.classList.add('show_text');
        // Change the button text to 'Show More'
        buttonElement.textContent = 'Show More';
    }
}