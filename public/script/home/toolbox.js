//Fichier qui contient toute les variables du DOM et les fonctions utiles

const numero_controleur = document.querySelector("#numero-controleur")
const ref_produit = document.querySelector("#ref-produit")
const service_production = document.querySelector("#List_production")
const nom_poste = document.querySelector("#Name_post")
const poids = document.querySelector("#Poids_produit")
const variation  = document.querySelector("#Variation")

const send_button = document.querySelector(".send-button")


//Remplir les selects
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


