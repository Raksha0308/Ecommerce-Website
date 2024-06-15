

const cart=()=>{ 
    let iconCart = document.querySelector('.icon-cart');
    let iconCart1 = document.querySelector('.icon-cart1');
    let bar = document.getElementById('bar');
    let nav = document.getElementById('navbar');
    let navlink = document.querySelector('.navbar a');
    let close = document.getElementById('close');
    let body = document.querySelector('body');
    let closeCart = document.querySelector('.close');
    let carts=[];


    bar.addEventListener('click', () => {
        nav.classList.add('active');
    });

    close.addEventListener('click', () => {
        nav.classList.remove('active');
    });

    


    iconCart.addEventListener('click', () => {
        body.classList.toggle('showCart');
    });

    iconCart1.addEventListener('click', () => {
        body.classList.toggle('showCart');
    });

    closeCart.addEventListener('click', () => {
        body.classList.toggle('showCart');
    })

    const setProductInCart=(idProduct,quantity,position) =>{
        if(quantity > 0){
            if(position < 0){
                carts.push({
                        product_id:idProduct,
                        quantity:quantity
                    });
        }else{
            carts[position].quantity=quantity;
        }
    }else{
        carts.splice(position,1);
    }
    localStorage.setItem('carts',JSON.stringify(carts));
    refreshCartHTML();
    }


    const refreshCartHTML=() =>{
        let listHTML=document.querySelector('.listCart');
        let totalHTML=document.querySelector('.icon-cart1 span');
        let totalHTML1=document.querySelector('span');
        let totalQuantity=0;
        let totalPrice=0;
        listHTML.innerHTML=null;

        carts.forEach(item =>{
            totalQuantity=totalQuantity + item.quantity;

            let newItem=document.createElement('div');
            newItem.classList.add('item');
            let position=products.findIndex((value)=> value.id==item.product_id);
            let info=products[position]; 
            totalPrice=totalPrice + info.price * item.quantity;
            console.log(totalPrice);
            
           
                newItem.innerHTML=`
                <div class="image">
                        <img src="${info.image}" alt="">
                    </div> 
                    
                    <div class="name">
                    ${info.name}
                    </div>
                    <div class="totalPrice">
                    $${info.price * item.quantity}
                    </div>
                    <div class="quantity">
                        <span class="minus" data-id="${info.id}">-</span>
                        <span>${item.quantity}</span>
                        <span class="plus" data-id="${info.id}">+</span>
                    </div>
                `;
            
                listHTML.appendChild(newItem);

                

        })
            let newItem2=document.createElement('div');
                    newItem2.innerHTML=`
                    <hr><br>
                        <div class="tprice">
                            <p>Total Quantity</p>
                            <p class="totalPrice">${totalQuantity}</p>
                        </div>
                        <div class="tquant">
                            <p>Total Product Price</p>
                            <p class="totalPrice">$${totalPrice}</p>
                        </div>
                        <hr class="hr1">
                    `;
            listHTML.appendChild(newItem2);

        totalHTML.innerText=totalQuantity;
        totalHTML1.innerText=totalQuantity;

        if(totalHTML.innerText<=0){
                let cartEmpty=document.querySelector('.cartEmpty');
                let tprice=document.querySelector('.tprice');
                let tquant=document.querySelector('.tquant');
                let line=document.querySelector('hr');
                let line1=document.querySelector('.hr1');
                cartEmpty.style.display = "flex";
                tprice.style.display = "none";
                tquant.style.display = "none";
                line.style.display="none";
                line1.style.display="none";
            }
            else if(totalHTML.innerText>0){
                let cartEmpty=document.querySelector('.cartEmpty');
                cartEmpty.style.display = "none";
            }

            if(totalHTML1.innerText<=0){
                let cartEmpty=document.querySelector('.cartEmpty');
                let tprice=document.querySelector('.tprice');
                let tquant=document.querySelector('.tquant');
                let line=document.querySelector('hr');
                let line1=document.querySelector('.hr1');
                cartEmpty.style.display = "flex";
                tprice.style.display = "none";
                tquant.style.display = "none";
                line.style.display="none";
                line1.style.display="none";
                
            }
            else if(totalHTML1.innerText>0){
                let cartEmpty=document.querySelector('.cartEmpty');
                cartEmpty.style.display = "none";
            } 
    }

    document.addEventListener('click',(event) =>{
        let buttonClick=event.target;
        let idProduct=buttonClick.dataset.id;
        let position=carts.findIndex((value) => value.product_id == idProduct);
        let quantity =position < 0 ? 0 : carts[position].quantity;

        if(buttonClick.classList.contains('cart') || buttonClick.classList.contains('plus')){
            quantity++;
            setProductInCart(idProduct,quantity,position);
        }else if(buttonClick.classList.contains('minus')){
            quantity--;
            setProductInCart(idProduct,quantity,position);
        }
    })

    const initApp=() =>{
        if(localStorage.getItem('carts')){
            carts=JSON.parse(localStorage.getItem('carts'));
        }
        refreshCartHTML();
    }
    initApp();

}
export default cart;



