'use strict';



// Constantes
const btn = document.querySelector('.js-button');
const input = document.querySelector('.js-input');
const listProducts = document.querySelector('.js-list-products');
const url = 'https://fakestoreapi.com/products';


//variables

let products = [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];



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

        const stars = document.createElement('p');
        stars.innerText = product.rating.rate + '⭐';

        const btnBuy = document.createElement('button');
        btnBuy.innerText = 'Comprar';
        btnBuy.className = 'btn-buy';
        btnBuy.setAttribute("data-id", product.id);
        btnBuy.addEventListener("click", (event) => toggleCart(product, event.target));

        updateButtonState(btnBuy, product);

        
        
        boxProduct.appendChild(img);
        boxProduct.appendChild(h3);
        boxProduct.appendChild(btnBuy);
        boxProduct.appendChild(price) + boxProduct.appendChild(stars);
        listProducts.appendChild(boxProduct);
    }
}

function updateButtonState(button, product) {
    const exists = cart.find(item => item.id === product.id) !== undefined;

    if (exists) {
        button.innerText = "Eliminar";
        button.classList.add("added");
    } else {
        button.innerText = "Comprar";
        button.classList.remove("added");
    }
}
// cambiar el boton de comprar a eliminar
 function toggleCart(product, button) {
    const exists = cart.find(item => item.id === product.id) !== undefined;

    if (!exists) {
        cart.push(product);
        
    } else {
        cart = cart.filter(item => item.id !== product.id);
        
    }

    updateCartStorage();
    renderCart();
    updateButtonState(button, product);
} 


// añadir el producto al carrito
function renderCart() {
    const cartList = document.querySelector(".js-list-cart");
    cartList.innerHTML = "";

    cart.forEach(product => {
        const cartItem = document.createElement("li");
        cartItem.className = "boxProductcart";

        const img = document.createElement("img");
        img.src = product.image;
        img.alt = product.title;
        img.className = "img";

        const title = document.createElement("h3");
        title.innerText = product.title;

        const price = document.createElement("p");
        price.innerText = product.price + "€";

        const btnRemove = document.createElement("button");
        btnRemove.innerText = "Quitar";
        btnRemove.className = "btn-remove";
        btnRemove.addEventListener("click", () => toggleCart(product, document.querySelector(`[data-id="${product.id}"]`)));

        cartItem.appendChild(img);
        cartItem.appendChild(title);
        cartItem.appendChild(price);
        cartItem.appendChild(btnRemove);
        cartList.appendChild(cartItem);
    });
}


//funciones manejadoras

//funcion para manejar el evento mientras busca en el input
function handleSearch(event) {
    const valueSearch = event.target.value.toLowerCase();

    // pinta en el momento que el usuario escribe
    const resultado = products.filter(productItem => 
        productItem.title.toLowerCase().includes(valueSearch)
    );

    listProducts.innerHTML = ""; 
    renderProducts(resultado);
}
// no esta en uso porque esta la funcion handleSearch.
function handleClick(event){ 
    event.preventDefault(); 
    const valueSearch = input.value.toLowerCase(); 
    const resultado = products.filter(productItem => productItem.title.toLowerCase().includes(valueSearch.toLowerCase())); console.log(resultado);
    listProducts.innerHTML = '';
    renderProducts(resultado);
    input.value = ''; 
};


//Almacenar informacion en el local storage

function updateCartStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
}



 //eventos

 fetch(url)
    .then((response) => response.json())
    .then((data) => {
        products = data;
        console.log(products);
        renderProducts(products);
    });


input.addEventListener('input', handleSearch);

document.addEventListener("DOMContentLoaded", renderCart);