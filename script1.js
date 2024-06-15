import cart from "./cart.js";
import products from "./products.js";

let header = document.getElementById('header');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');
let proContainer = document.querySelector('.pro-container');



const loadTemplate=() =>{
    fetch('/template.html')
    .then(response => response.text())
    .then(html =>{
        header.innerHTML=html;
        cart();
        initApp();
    })
    
}
loadTemplate();

const initApp=() =>{

    proContainer.innerHTML=null;
    products.forEach(product =>{
        let newProduct=document.createElement('div');
        newProduct.classList.add('pro');
        newProduct.innerHTML=`

        <a href="/sproduct.html?id=${product.id}">
            <img src="${product.image}" alt="" class="pro-img cart1">
        </a>
                    <div class="des cart1">
                        <span>${product.title}</span>
                        <h5>${product.name}</h5>
                        <div class="star">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                        </div>
                        <h4>$${product.price}</h4>
                    </div>
                    <i data-id="${product.id}" class="fa-solid fa-cart-shopping cart cart1" ></i>
        `;
        proContainer.appendChild(newProduct);
    })
}