import products from "./products.js";
import cart from "./cart.js";
let header = document.getElementById('header');


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

const initApp = () => {
    let idProduct = new URLSearchParams(window.location.search).get('id');
    let info = products.filter(value => value.id == idProduct)[0];
    if(!info){
        window.location.href = "/";
    }

    let detail = document.querySelector('#prodetails');
    detail.querySelector('.single-pro-image .img').src = info.image;
    detail.querySelector('.single-pro-image .img1').src = info.image;
    detail.querySelector('.single-pro-image .img2').src = info.image1;
    detail.querySelector('.single-pro-image .img3').src = info.image2;
    detail.querySelector('.single-pro-image .img4').src = info.image3;

    detail.querySelector('.single-product-details h6').innerText = info.title;
    detail.querySelector('.single-product-details h4').innerText = info.name;
    detail.querySelector('.single-product-details h2').innerText = '$' + info.price;
    detail.querySelector('.single-product-details .desc').innerText =info.description;
    detail.querySelector('.single-product-details .cart').dataset.id = info.id;


    let listProduct = document.querySelector('.listProduct');
    listProduct.innerHTML=null;
    products.filter((value)=> value.id != idProduct).forEach(product =>{
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
                            <h4>$ ${product.price}</h4>
                        </div>
                        <i data-id="${product.id}" class="fa-solid fa-cart-shopping cart cart1" ></i>
            `;
        listProduct.appendChild(newProduct);
});

}