// let cart = JSON.parse(localStorage.getItem("CART")) || [];
function redirect_to_shop() {
    if ( window.location.href != `html/shop.html`) {
        window.location.href = `shop.html`
    }
} 

// Get the category from button
const womens = document.getElementById('btn_womens');
const jewelery = document.getElementById('btn_jewelry');
const mens = document.getElementById('btn_mens');
const electronics = document.getElementById('btn_electronics');

let fetch_url = 'https://fakestoreapi.com/products';

    // FETCH PRODUCTS
async function fetch_products(url) {
    let data = await fetch(url);
    let products = document.querySelector('.product');
    response = await data.json();
    console.log("x");

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

// Waiting for the DOM content to be fully loaded before executing the code
document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault();
    console.log(location.href);
    console.log(location.pathname);

    if ( window.location.pathname == `/html/shop.html`) {
        fetch_products(fetch_url);
        return console.log("a");
    }

    console.log("x");
    // Fetch all products
    
});

womens.addEventListener('click', function () {
    fetch_url = "https://fakestoreapi.com/products/category/women's%20clothing";
    fetch_products(fetch_url);
});

mens.addEventListener('click', function () {
    fetch_url = "https://fakestoreapi.com/products/category/men's%20clothing";
    fetch_products(fetch_url);
});

jewelery.addEventListener('click', function () {
        fetch_url = 'https://fakestoreapi.com/products/category/jewelery';
        fetch_products(fetch_url);
});

electronics.addEventListener('click', function () {
    fetch_url = 'https://fakestoreapi.com/products/category/electronics';
    fetch_products(fetch_url);
}); 


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
    localStorage.setItem("CART", JSON.stringify(cart));

    alert('Item added to cart!');
}

