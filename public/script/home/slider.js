//Script qui s'occupe des sliders et met à jour le texte
const sliders = document.querySelectorAll("input[type='range']")


sliders.forEach((element) =>{
    element.value = 0
    element.addEventListener('input',(e)=>{
        element.nextElementSibling.innerHTML = element.value
    })
})
