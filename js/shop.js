let cart = JSON.parse(localStorage.getItem("CART")) || [];
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
                                        <p class="product_price">${price} $</p>
                                        <div onclick="add_to_cart(${id})">
                                            <input type="submit" id="submit" class="btn_submit" value="Add to cart"> 
                                        </div>
                                    </div>        
                                </div>
                                `;
        }
    }

            // Get the category from button
            const remove_filter = document.getElementById('btn_remove_filter');
            const womens = document.getElementById('btn_womens');
            const jewelry = document.getElementById('btn_jewelry');
            const mens = document.getElementById('btn_mens');
            const electronics = document.getElementById('btn_electronics');

            let fetch_url = 'https://fakestoreapi.com/products';

            // Hide button btn_all_products
            remove_filter.style.display = "none";

            // Function to show remove_filter button
            function hide_remove_filter_button() {
                remove_filter.style.display = "none";
            }
            
            // Function to hide remove_filter button
            function show_remove_filter_button() {
                remove_filter.style.display = "block";
            }

            womens.addEventListener('click', function () {
                fetch_url = "https://fakestoreapi.com/products/category/women's%20clothing";
                fetch_products(fetch_url);
                show_remove_filter_button();
            });

            jewelry.addEventListener('click', function () {
                fetch_url = 'https://fakestoreapi.com/products/category/jewelery';
                fetch_products(fetch_url);
                show_remove_filter_button();
            });

            mens.addEventListener('click', function () {
                fetch_url = "https://fakestoreapi.com/products/category/men's%20clothing";
                fetch_products(fetch_url);
                show_remove_filter_button();
            });

            electronics.addEventListener('click', function () {
                fetch_url = 'https://fakestoreapi.com/products/category/electronics';
                fetch_products(fetch_url);
                show_remove_filter_button();
            }); 

            // Event listener for remove_filter button
            remove_filter.addEventListener('click', function () {
                fetch_url = 'https://fakestoreapi.com/products';
                fetch_products(fetch_url);
                hide_remove_filter_button();
            });

            // Fetch all products
            fetch_products(fetch_url);
            
});

function toggleText(product_id) {
    // Construct the id for the text element based on the productId
    const textElement = document.getElementById(`text_id${product_id}`);
    
    // Construct the id for the button element based on the productId
    const buttonElement = document.getElementById(`show_more_description${product_id}`);

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

