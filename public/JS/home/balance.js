//Liaison avec la balance qui récupère le poids et gestion des animations
const span_poids = document.querySelector('#Poids-produit')
const span_variation = document.querySelector('#Variation')
const ref_produit = document.querySelector('#ref-produit')
const nb_produit = document.querySelector('#nb-produit')
const tab_content = document.querySelector('.Container')
const span_formulaire = document.querySelector('#formulaire')

const img_conforme = document.querySelector('#Conforme > div:nth-child(2) > img:nth-child(1)')

const peser_button = document.querySelector('#peser-button')

const animation_div = document.querySelector('#animation-poids')

const num_controleur = document.querySelector('#numero-controleur')
const num_poste = document.querySelector('#Name-post')

const send_button_formulaire = document.querySelector('#send-button-formulaire')

//Gestion de la Pop-up
const animation_button = (flag) =>{
    if (flag){
        tab_content.style.backgroundColor = "gray"
        animation_div.style.opacity ="1"
        animation_div.style.marginLeft ="45"
    } else {
        tab_content.style.backgroundColor = "white"
        animation_div.style.opacity ="0"
        animation_div.style.marginLeft ="-400"
    }
    
}

//Ajouter les valeurs récupèrer par la balance
const span_manager = (poids,variation,conforme)=>{
    span_poids.innerHTML = poids
    span_variation.innerHTML = variation
    img_conforme.style.display = "block"

    if (conforme){
        img_conforme.setAttribute('src','/static/images/home/true.svg')
    } else {
        img_conforme.setAttribute('src','/static/images/home/false.svg')
    }

}

//Vérifie si les inputs ne sont pas vide
const verification_input = () =>{
    let flag = true


    if (num_controleur.value == ""){
        invalid_input(num_controleur)
        span_formulaire.innerHTML = "Renseigner un numéro de controleur"
        flag = false
    }


    else if (ref_produit.value === "Produit"){
        invalid_input(ref_produit)
        span_formulaire.innerHTML = "Sélectionner un produit"
        flag = false
    } 

    else if (num_poste.value == ""){
        invalid_input(num_poste)
        span_formulaire.innerHTML = "Renseigner un numéro de poste"
        flag = false
    }

    return flag
}

const send_button_animation = () =>{

    if (window.getComputedStyle(send_button_formulaire).opacity == 0.5){
        send_button_formulaire.style.opacity = "1"
        send_button_formulaire.style.pointerEvent = "auto"
    } else {
        send_button_formulaire.style.opacity = "0.5"
        send_button_formulaire.style.pointerEvent = "none"
    }
    
}

//Request à la balance quand on appuie sur le bouton
peser_button.addEventListener('click',(e)=>{

    if (verification_input()){

        span_formulaire.innerHTML = ""

        const data = {
            nom_produit: ref_produit.value,
            nombre_de_produit: nb_produit.value
        }
    
        animation_button(true)
        Myrequest("/API/balance/weight","POST",data) 
        .then((data)=>{
            animation_button(false)
            send_button_animation()
            span_manager(data.poids,data.variation,data.conforme)
        })
    }

})
