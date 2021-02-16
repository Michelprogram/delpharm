const value_slider = document.querySelector("#value-echantillion")
const slider = document.querySelector("#Nb_echantillion")
const send_button = document.querySelector(".send-button")


send_button.addEventListener('click',(e)=>{

    
    num_controleur = numero_controleur.value.trim()
    ref = ref_produit.value.trim()

    if (num_controleur.length == 0){
        invalid_input(numero_controleur)

    }
    else if (ref.length == 0){
        invalid_input(ref_produit)
    }
    else{
        //Request.formulaire()
    }
})



slider.addEventListener('input',(e)=>{
    value_slider.innerHTML = e.target.value
})

