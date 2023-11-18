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

// Waiting for the DOM content to be fully loaded before executing the code
document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault();
    
    let products = document.querySelector('.product');

    // FETCH PRODUCTS
    async function fetch_products(url) {
        let data = await fetch(url);
        let response = await data.json();

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
                                        <img src="${image}" alt="" class="product_img">
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
                                        <p id="price" class="product_price">${price} $</p>
                                        <!--ID'et skal passes i knappen tror jeg-->
                                        <input type="submit" id="submit" class="btn_submit" value="Add to cart"> 
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

function toggleText(productId) {
    // Construct the id for the text element based on the productId
    var textElement = document.getElementById(`text_id${productId}`);
    
    // Construct the id for the button element based on the productId
    var buttonElement = document.getElementById(`show_more_description${productId}`);

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