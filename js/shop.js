// Get the category from button
const category_buttons = document.querySelectorAll('.category_buttons a')

// Fetch products
async function fetch_products(input) {
    // Check for category parameter in the URL
    let params = new URLSearchParams(document.location.search);
    // If category parameter exists, set input to its value
    if (params.get('category')) {
        input = params.get('category')
        // Remove the category parameter from the URL to avoid confusion
        window.history.replaceState({}, document.title, "/" + "html/shop.html");
    }

    // Default URL
    let url = 'https://fakestoreapi.com/products/'

    switch (input) {
        case "btn_womens":
            url = "https://fakestoreapi.com/products/category/women's%20clothing"; 
            break;
        case "btn_mens":
            url = "https://fakestoreapi.com/products/category/men's%20clothing"; 
            break;
        case "btn_jewelry":
            url = "https://fakestoreapi.com/products/category/jewelery"; 
            break;
        case "btn_electronics":
            url = "https://fakestoreapi.com/products/category/electronics"; 
            break;
        case "btn_all":
            url = "https://fakestoreapi.com/products/";
            break;
    }
    
    // Fetch data from the API
    let data = await fetch(url);
    let products = document.querySelector('.product');

    // Parse JSON response
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
                                    <button id="show_more_description${id}" onclick="toggle_text('${id}')" class="btn_show_description">Show More</button>
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

// Waiting for the DOM content to be fully loaded before executing the code
document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault();

    // If the current page is shop.html, fetch and render products
    if ( window.location.pathname == `/html/shop.html`) {
        fetch_products();
    }        
});

// Add click event listeners to category buttons
category_buttons.forEach(button => {
    button.addEventListener('click', function () {
        fetch_products(this.id); // Fetch and render products for the selected category
    })
})

// show more and show less
function toggle_text(product_id) {
    // Construct the id for the text element based on the productId
    const text_element = document.getElementById(`text_id${product_id}`);
    
    // Construct the id for the button element based on the productId
    const button_element = document.getElementById(`show_more_description${product_id}`);

    // Check if the textElement has the 'show_text' class
    if (text_element.classList.contains('show_text')) {
        // If it has the class, remove it to hide the text
        text_element.classList.remove('show_text');
        // Change the button text to 'Show Less'
        button_element.textContent = 'Show Less';
    } else {
        // If it doesn't have the class, add it to display the full text
        text_element.classList.add('show_text');
        // Change the button text to 'Show More'
        button_element.textContent = 'Show More';
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

// Change number of units in cart
function change_number_of_units(action,id){
    //uses map method will run this function on every element in the cart and return a new updated array
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
    localStorage.setItem("CART", JSON.stringify(cart));
}