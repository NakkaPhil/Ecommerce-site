import stock from '../db/db.js';
import { DarkMode } from './darkMode.js';
import {showStock} from './dinamicStock.js';

const loader = document.querySelector('.loader')

document.addEventListener('DOMContentLoaded', ()=>{
    load()
    DarkMode()
    showStock(stock)
})

function load(){
    setTimeout(() => {
        loader.classList.add('hide')
    }, 3000);
}



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







    



