const span_poids = document.querySelector('#Poids_produit')
const span_variation = document.querySelector('#Variation')
const ref_produit = document.querySelector('#ref-produit')
const nb_produit = document.querySelector('#nb_produit')
const tab_content = document.querySelector('.Container')
const span_formulaire = document.querySelector('#formulaire')

const img_conforme = document.querySelector('#Conforme > div:nth-child(2) > img:nth-child(1)')

const peser_button = document.querySelector('#peser-button')

const animation_div = document.querySelector('#animation-poids')

const animation_button = (flag) =>{
    if (flag){
        tab_content.style.backgroundColor = "gray"
        animation_div.style.display = "flex"
        animation_div.style.opacity ="1"
    } else {
        tab_content.style.backgroundColor = "white"
        animation_div.style.display = "none"
        animation_div.style.opacity ="0"
    }
    
}

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


peser_button.addEventListener('click',(e)=>{

    if (ref_produit.value === "Produit"){

        invalid_input(ref_produit)
        span_formulaire.innerHTML = "Sélectionner un produit"

    } else {
        span_formulaire.innerHTML = ""
        const data = {
            nom_produit: ref_produit.value,
            nombre_de_produit: nb_produit.value
        }
    
        animation_button(true)
        Myrequest("/API/balance/weight","POST",data) 
        .then((data)=>{
            animation_button(false)
            span_manager(data.poids,data.variation,data.conforme)
        })
    }
})
