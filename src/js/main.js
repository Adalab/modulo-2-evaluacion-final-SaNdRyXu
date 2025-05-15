'use strict';



// Constantes
const btn = document.querySelector('.js-button');
const input = document.querySelector('.js-input');
const listProducts = document.querySelector('.js-list-products');
const url = 'https://fakestoreapi.com/products';



//variables

let products = [];
let cart = [];


//funciones 
//pintar los productos en el HTML

   function renderProducts(products) {
    for (let product of products) {
        

        const boxProduct = document.createElement('div');
        boxProduct.className = 'boxProduct';

        const img = document.createElement('img');
        img.src = product.image;
        img.alt = product.title;
        img.className = 'img';

        const h3 = document.createElement('h3');
        h3.innerText = product.title;

    
        
        const price = document.createElement('p');
        price.innerText = product.price + '€';

        const btnBuy = document.createElement('button');
        btnBuy.innerText = 'Buy';
        btnBuy.className = 'btn-buy';

        
        
        boxProduct.appendChild(img);
        boxProduct.appendChild(h3);
        boxProduct.appendChild(btnBuy);
        boxProduct.appendChild(price);
        listProducts.appendChild(boxProduct);
    }
}





//funciones manejadoras


//Almacenar informacion en el local storage


 //mandar datos a la API


 //eventos

 fetch(url)
    .then((response) => response.json())
    .then((data) => {
        products = data;
        console.log(products);
        renderProducts(products);
    });

