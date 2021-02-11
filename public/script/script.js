const value_slider = document.querySelector("#value-echantillion")
const slider = document.querySelector("#Nb_echantillion")
const send_button = document.querySelector(".send-button")


send_button.addEventListener('click',(e)=>{
    Request.formulaire()
})


slider.addEventListener('input',(e)=>{
    value_slider.innerHTML = e.target.value
})



