//------------------------GET ALL CATEGORIES-------------------------------
const get_all_categories = fetch('https://fakestoreapi.com/products/categories')
                            .then(res=>res.json())
                            .then(json=>console.log(json))