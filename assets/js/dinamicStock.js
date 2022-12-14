import { counter } from './couter.js';
import { stock} from '../db/db.js';

/*-----Stock--------*/
export function showStock(stockArray) {
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

export function botonesCarrito(botonesPrenda, accion= 'plus'){
    botonesPrenda.forEach((b) => {
        b.addEventListener('click',() => {

            let productoId = parseInt(b.dataset.id);
            let productoIndice = 0
            
            let producto = stock.find((s) => {
                productoIndice = stock.indexOf(s)
                return s.id === productoId
            }) 
            //Buscamos el objeto (producto seleccionado)

            let cantidad = producto.quantity

            if(accion == 'plus'){
                if(producto.quantity < 1){
                    producto.quantity = 0;
                }else{
                    producto.quantity -= 1;
                    producto.selected++
                }
            } else{
                if(producto.quantity > cantidad){
                    producto.quantity = cantidad;
                }else{
                    producto.quantity += 1
                    producto.selected--
                }

            }

            if(accion == 'remove-all'){
                producto.quantity = cantidad
                producto.selected = 0
            }

            stock.splice(productoIndice, 1, producto)
            //Reemplazamos el objeto que est?? siendo tratado, por el nuevo que hemos modificado

            agregarCarrito(stock) //stock iba aqui
            
            counter()

            showStock(stock)
        })       
    })
}

export function agregarCarrito(paramStock){
    let selected = []
    //Cart en el html:
    const cartDiv = document.getElementById('cart')
    cartDiv.innerHTML = ``
    
    selected = paramStock.filter((p) => {
        return p.selected > 0 
    })
    

    let templateHTML = ``

    selected.forEach(p => {
        templateHTML += `
          <div class="item-div">
            <div class="item-img">
              <img src="${p.image}" alt="img-${p.category}">
            </div>
            <div class="item-info">
              <p class="item-name">
                ${p.name}
              </p>
              <p class="item-desc">
                <small>Stock: ${p.quantity} | $${p.price}.00</small>
                <br>
                <small>Subtotal: $${
                    (p.selected * p.price)
                }.00</small>
              </p>
              <div class="count-cart">
                <button class="remove-btn" data-id="${p.id}">-</button>
                <p class="item-counter">${p.selected} units</p>
                <button class="add-btn" data-id="${p.id}">+</button>
              </div>
              
            </div>
            <div class="remove-all">
              <button data-id="${p.id}" class="remove-all-btn">
                <i class='bx bxs-trash'></i>
              </button>
            </div>
          </div>`

    })

    cartDiv.innerHTML = templateHTML;
    
    const add_cart_btn = document.querySelector('#add-cart-btn')
    const add_btn = document.querySelectorAll('.add-btn')
    const remove_btn = document.querySelectorAll('.remove-btn')
    const remove_all_btn = document.querySelectorAll('.remove-all-btn')
    
    
    botonesCarrito(add_btn)
    botonesCarrito(remove_btn, 'remove')
    botonesCarrito(remove_all_btn, 'remove-all')
    
}