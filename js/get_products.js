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
    
    let products = document.querySelector('.product')

    // FETCH PRODUCTS
    async function fetch_products(url) {
        let data = await fetch(url);
        let response = await data.json();

        console.log(response)

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
                                    <div class="container">
                                        <div class="flex">
                                            <i class="fa-solid fa-star"></i>
                                            <p class="product_rate">${rate}</p> 
                                            <p class="product_count">(${count})</p>
                                        </div>
                                        <h4 class="product_category">${category}</h4>
                                        <h3 class="product_title">${title}</h3>
                                        <p class="product_description">${description}</p
                                        <div class="product_price_submit">
                                        <p id="price" class="product_price">${price} $</p>
                                        <!--ID'et skal passes i knappen tror jeg-->
                                        <input type="submit" id="submit" class="btn_submit" value="Add to cart"> 
                                        </div>
                                    </div>
                                </div>
                                `;

        }
        
    }
    fetch_products('https://fakestoreapi.com/products')
});