//Front-end de la page home

const send_button = document.querySelectorAll(".send-button")
const span_formulaire = document.querySelector("#formulaire")
const span_reference = document.querySelector("#produit-reference")
const span_utilisateur = document.querySelector("#utilisateur")





send_button.forEach((button)=>{
    button.addEventListener('click',(e)=>{

        const div_content = button.parentNode
        const number_div = div_content.attributes[0].textContent.substr(-1)
        const list_input = div_content.querySelectorAll("input,select,#poids_produit,#Variation")
        let data = {}

        switch (number_div){
            case "0": //Partie formulaire
            console.log("formulaire")
                break

            case "1": //Partie produit reference

            data = {
                name_product : list_input[0].value,
                reference_product : list_input[1].value,
                weight_product : list_input[2].value
            }

            Myrequest("/API/formulaire/produit_reference","POST",data)
            .then((value)=>span_reference.innerHTML = value.result)

                break

            case "2": //Partie utilisateur

            data = {
                identifiant : list_input[0].value,
                nom : list_input[1].value,
                prenom : list_input[2].value,
                mail : list_input[3].value

            }

            Myrequest("/API/formulaire/user","POST",data)
            .then((value)=>console.log(value))

            console.log("utilisteur")
                break
        }
    })
    
})
