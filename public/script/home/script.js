//Front-end de la page home

const send_button = document.querySelectorAll(".send-button")


//Animation si l'input est mauvais
const invalid_input = (element) =>{
    element.setAttribute('class','numero-controleur-trigger')
    setTimeout(()=>element.removeAttribute('class'),1500)
}

const traitement = (status,result,span,input) =>{

    status != null ? invalid_input(input) : null
    span.setAttribute('class','error-message')
    span.innerHTML = result
}



send_button.forEach((button)=>{
    button.addEventListener('click',(e)=>{

        const div_content = button.parentNode
        const number_div = div_content.attributes[0].textContent.substr(-1)
        const list_input = div_content.querySelectorAll("input,select,#poids_produit,#Variation")
        const span = div_content.querySelector("span:not(#Poids_produit,#Variation,#value_produit)")
        span.removeAttribute('class')

        let data = {}

        switch (number_div){
            case "0": //Partie formulaire
            
            data = {
                numero_controleur : list_input[0].value,
                reference : list_input[1].value,
                service : list_input[2].value,
                numero_poste : list_input[3].value,
                poids : list_input[4].textContent,
                variation : list_input[5].textContent,
                nombre_produit : list_input[6].value
            }

            Myrequest("/API/formulaire/rapport","POST",data)
            .then((value)=> traitement(value.status,value.result,span,list_input[value.status]))
                break

            case "1": //Partie produit reference

            data = {
                name : list_input[0].value,
                reference : list_input[1].value,
                weight : list_input[2].value
            }

            Myrequest("/API/formulaire/produit_reference","POST",data)
            .then((value)=> traitement(value.status,value.result,span,list_input[value.status]))

                break

            case "2": //Partie utilisateur

            data = {
                identifiant : list_input[0].value,
                nom : list_input[1].value,
                prenom : list_input[2].value,
                mail : list_input[3].value

            }

            Myrequest("/API/formulaire/user","POST",data)
            .then((value)=> traitement(value.status,value.result,span,list_input[value.status]))

                break
        }
    })
    
})
