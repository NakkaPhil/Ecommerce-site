import stock from "../db/db.js"

export function counter(){
    const itemsCounterItem = document.getElementById('items-counter')
    const totalCostoItem = document.getElementById('total-cost')
    const cartCounter = document.querySelector('#cart-counter')

    const numeroItems = stock.reduce((numeroItems, producto)=>{
        return numeroItems + producto.selected
    }, 0)

    itemsCounterItem.textContent = `${numeroItems} items`

    cartCounter.textContent = `${numeroItems}`

    const totalCosto = stock.reduce((totalCosto, producto) => {
        return totalCosto += (producto.selected * producto.price)
    }, 0)

    totalCostoItem.textContent = `$${totalCosto}.00`
}


export default counter