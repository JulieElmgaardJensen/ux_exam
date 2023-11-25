document.addEventListener('DOMContentLoaded', async (e) => {
    e.preventDefault();

    let url; // Define the URL variable in the global scope

    // FETCH PRODUCTS
    async function fetch_products(url) {
        try {
            let data = await fetch(url);
            return await data.json();   
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error; // Rethrow the error to handle it in the calling function
        }
    }

    async function redirect_to_shop(category) {
        try {
            // Build the URL with the selected category and sorting parameter
            url = `https://fakestoreapi.com/products/category/${encodeURIComponent(category.toLowerCase())}`;

            // Log the URL for debugging
            console.log('Redirecting to:', url);

            // Fetch the products for the specified category
            const products = await fetch_products(url);
            console.log('JSON Response:', products);

            // Redirect to the shop page with the specified category and sorting
            window.location.href = `/html/shop.html?category=${encodeURIComponent(category.toLowerCase())}`;

        } catch (error) {
            console.error('Error redirecting to shop:', error);
        }
    }

    // Get the category buttons
    const womens = document.getElementById('btn_womens');
    const mens = document.getElementById('btn_mens');
    const jewelery = document.getElementById('btn_jewelery');
    const electronics = document.getElementById('btn_electronics');

    // Log the elements to check if they are null
    console.log('womens:', womens);
    console.log('mens:', mens);
    console.log('jewelery:', jewelery);
    console.log('electronics:', electronics);

    // Check if any element is null
    if (!womens || !jewelery || !mens || !electronics) {
        console.error('One or more category buttons are null.');
        return;
    }

    // Event listener for women's clothing
    womens.addEventListener('click', function () {
        url = "https://fakestoreapi.com/products/category/women's%20clothing";
        redirect_to_shop("Women's Clothing");
    });

    // Event listener for men's clothing
    mens.addEventListener('click', function () {
        url = "https://fakestoreapi.com/products/category/men's%20clothing";
        redirect_to_shop("Men's Clothing");
    });

    // Event listener for jewelery
    jewelery.addEventListener('click', function () {
        url = 'https://fakestoreapi.com/products/category/jewelery';
        redirect_to_shop('Jewelery');
    });

    // Event listener for electronics
    electronics.addEventListener('click', function () {
        url = 'https://fakestoreapi.com/products/category/electronics';
        redirect_to_shop('Electronics');
    });
});