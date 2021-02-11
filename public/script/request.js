const numero_controleur = document.querySelector("#numero-controleur")
const ref_produit = document.querySelector("#ref-produit")
const service_production = document.querySelector("#List_production")
const nom_poste = document.querySelector("#Name_post")
const poids = document.querySelector("#Poids_produit")
const variation  = document.querySelector("#Variation")

class Request{

    static formulaire() {
        const data = {
            "numero_controleur" : numero_controleur.value,
            "reference_produit" : ref_produit.value,
            "service_production" : service_production.value,
            "nom_poste" : nom_poste.value,
            "poids" : poids.textContent,
            "variation" : variation.textContent
        }
        const request = new XMLHttpRequest()
        request.onreadystatechange = ()=>{
            if (request.readyState == XMLHttpRequest.DONE && this.status == 200){
                console.log("request send")
            }
        }
        request.open("POST","/formulaire")
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        request.send(JSON.stringify(data))
    }
}
