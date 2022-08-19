export function DarkMode(){
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
}