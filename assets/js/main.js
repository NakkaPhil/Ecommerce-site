import stock from '../db/db.js';

//carrito:
let carrito = []

const loader = document.querySelector('.loader')

document.addEventListener('DOMContentLoaded', ()=>{
    load()
    showStock(stock)
})

function load(){
    setTimeout(() => {
        loader.classList.add('hide')
    }, 3000);
}

const themeButton = document.getElementById('theme-button')
/*------Dark Mode--------*/
themeButton.addEventListener('click', ()=> {
    document.body.classList.toggle('dark-theme')

    if(themeButton.classList.contains('bx-moon')){
        themeButton.classList.replace('bx-moon', 'bx-sun')
    }else{
        themeButton.classList.replace('bx-sun', 'bx-moon')
    }
})

/*---------Carrito-----------*/
const cartOpen = document.getElementById('cart-shop')
const cartClosed = document.getElementById('close-cart')
const cartContainer = document.getElementById('cart-container')

cartOpen.addEventListener('click', () => {
    cartContainer.classList.remove('hide')
})

cartClosed.addEventListener('click', () => {
    cartContainer.classList.add('hide')
})




/*-------SCROLL-------*/
const header = document.getElementById('header')

window.addEventListener('scroll', ()=> {
    if(window.scrollY >= 50){
        header.classList.add('scroll-header')
    }else{
        header.classList.remove('scroll-header')
    }
})


/*---Almacenamiento del carrito ---*/
localStorage.setItem('carrito', 0);


/*-----Stock--------*/
function showStock(stockArray) {
    const sampleDiv = document.getElementById('sampleDiv')
    sampleDiv.innerHTML = `` //Limpiamos el div pq se actualiza siempre
    let templateHTML = ``

    stockArray.map((item, indice)=>{
        templateHTML += `<div class="sample-box">
        <div class="sample-img-box">
            <img class="sample-img" src="${item.image}" alt="img${item.id}">
        </div>
        <div class="sample-desc">
        <button id="boton-prenda" data-id="${item.id}">+</button>
            <p class="sample-p">$${item.price}.00<small> | Stock: ${item.quantity}</small>
            <br>
            ${item.name}
            </p>
        </div>
    </div>`
    })
    sampleDiv.innerHTML += templateHTML;
    
    //Boton de prenda:
    const botonesPrenda = document.querySelectorAll('#boton-prenda')
    //En cada boton, esta el id del producto

    botonesCarrito(botonesPrenda)

}

function botonesCarrito(botonesPrenda){
    botonesPrenda.forEach((b, i) => {
        b.addEventListener('click',() => {

            let productoId = parseInt(b.dataset.id);
            
            let producto = stock.find((s) => s.id === productoId); 
            //Buscamos el objeto (producto seleccionado)

            if(producto.quantity < 1){
                producto.quantity = 0;
            } else{
                producto.quantity -= 1;
                producto.selected++

                carrito.push(producto);
                console.log(carrito);
            }
                stock.splice(i, 1, producto )
                //Reemplazamos el objeto que está siendo tratado, por el nuevo que hemos modificado
                
                showStock(stock)

        })       
    })
}

    const counter = document.getElementById('cart-counter')
    counter.textContent = localStorage.getItem('carrito')




    



