//Fichier qui contient toute les variables du DOM et les fonctions utiles

const numero_controleur = document.querySelector("#numero-controleur")
const ref_produit = document.querySelector("#ref-produit")
const service_production = document.querySelector("#List_production")
const nom_poste = document.querySelector("#Name_post")
const poids = document.querySelector("#Poids_produit")
const variation  = document.querySelector("#Variation")





//Animation si l'input est mauvais
const invalid_input = (element) =>{
    element.setAttribute('class','numero-controleur-trigger')
    setTimeout(()=>element.removeAttribute('class'),1500)
}


