//------------------------GET ALL PRODUCTS FROM SPECIFIC CATEGORIES-------------------------------
const get_category = fetch('https://fakestoreapi.com/products/category/${category}')
                            .then(res=>res.json())
                            .then(json=>console.log(json))