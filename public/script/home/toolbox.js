//Fichier qui contient toute les variables du DOM et les fonctions utils

const numero_controleur = document.querySelector("#numero-controleur")
const ref_produit = document.querySelector("#ref-produit")
const service_production = document.querySelector("#List_production")
const nom_poste = document.querySelector("#Name_post")
const poids = document.querySelector("#Poids_produit")
const variation  = document.querySelector("#Variation")

const value_slider = document.querySelector("#value-echantillion")
const slider = document.querySelector("#Nb_echantillion")
const send_button = document.querySelector(".send-button")

//Remplir les select
const create_list_production = (start,stop,element,flag) => {
    const ListProduction = document.querySelector(element)

    for (let index = start; index < stop; index++) {
        const option = document.createElement("option")

        if (flag){
            option.value = String.fromCharCode(index)
            option.text = String.fromCharCode(index)
        }else{
            option.value = String(index)
            option.text = String(index)
        }

        option.setAttribute("class","Element_list")
        ListProduction.appendChild(option)

    }
}

//Animation si l'input est mauvais
const invalid_input = (element) =>{
    element.setAttribute('class','numero-controleur-trigger')
    setTimeout(()=>element.removeAttribute('class'),1500)
}

//Gestion des différentes tables
const select_tab = (index) =>{

    for (let i = 1; i < 4; i++) {
        document.querySelector("#tab"+i+"-content").setAttribute("class","display-off")
        document.getElementById("tab"+i).setAttribute("class","title-off")
    }

    document.querySelector("#tab"+index+"-content").setAttribute("class","display-on")
    document.querySelector("#tab"+index).setAttribute("class","title-on")
}