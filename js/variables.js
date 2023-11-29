// Variables.js
'use strict';

// Variable for the section in shop.html
const product = document.getElementsByClassName("product");

// Variables for all elements in each product
const product_img = document.getElementsByClassName("product_img");
const product_rate = document.getElementsByClassName("product_rate");
const product_count = document.getElementsByClassName("product_count");
const product_category = document.getElementsByClassName("product_category");
const product_title = document.getElementsByClassName("product_title");
const product_description = document.getElementsByClassName("product_description");
const product_price = document.getElementsByClassName("product_price");

// Now we can call it outside the fetch_products function
let response;
const cart_items_el = document.querySelector('.cart_items');
const subtotalt_el = document.querySelector('.cart_subtotal_price');
const totalt_el = document.querySelector('.cart_total_price');

// Empty cart array from start - localstorage for saving elements
let cart = JSON.parse(localStorage.getItem("CART")) || [];