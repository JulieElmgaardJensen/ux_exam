// ONLY USE VARIABLES THAT ARE DECLARED
'use strict';

// VARIABLES

const product_img = document.getElementsByClassName("product_img");
const product_rate = document.getElementsByClassName("product_rate");
const product_count = document.getElementsByClassName("product_count");
const product_category = document.getElementsByClassName("product_category");
const product_title = document.getElementsByClassName("product_title");
const product_description = document.getElementsByClassName("product_description");
const product_price = document.getElementsByClassName("product_price");

const btn_category = document.getElementsByClassName("btn_category");


//------------------------GET ALL PRODUCTS-------------------------------
const get_all_products = fetch('https://fakestoreapi.com/products')
                            .then(res=>res.json())
                            .then(json=>console.log(json))


//------------------------GET ALL PRODUCTS-------------------------------
const get_all_categories = fetch('https://fakestoreapi.com/products/categories')
                            .then(res=>res.json())
                            .then(json=>console.log(json))

const get_category = fetch('https://fakestoreapi.com/products/category/' + category)
                            .then(res=>res.json())
                            .then(json=>console.log(json))







    
