//Gestion des boutons envoyé
const send_button = document.querySelectorAll(".send-button")


//Animation si l'input est mauvais
const invalid_input = (element) =>{
    element.setAttribute('class','numero-controleur-trigger')
    setTimeout(()=>element.removeAttribute('class'),1500)
}

//Gestion des messages d'erreurs
const traitement = (status="",result="",span="",input="") =>{
    status != null ? invalid_input(input) : null
    span.setAttribute('class','error-message')
    span.innerHTML = result
}

//Vide les inputs si la request précedente c'est bien passée



//Evénement pour chaque bouton send
send_button.forEach((button)=>{
    button.addEventListener('click',(e)=>{
        console.log("test")

        
        //Récupère la liste des inputs 
        const div_content = button.parentNode
        const number_div = div_content.attributes[0].textContent.substr(-1)
        const list_input = div_content.querySelectorAll("input,select,#poids-produit,#Variation,#conforme-img")
        const span = div_content.querySelector("span:not(#Poids-produit,#Variation,#value-produit,#Conforme)")
        span.removeAttribute('class')

        let data = {}

        switch (number_div){
            //Formulaire
            case "0": 

            data = {
                numero_controleur : list_input[0].value,
                reference : list_input[1].value,
                poste : list_input[2].value,
                production : list_input[3].value,

                poids : list_input[4].textContent,
                variation : list_input[5].textContent,
                
                conform: list_input[6].currentSrc.includes('true') ? true :false,
                nombre_produit : list_input[7].value
            }
             
            Myrequest("/API/formulaire/rapport","POST",data)
            .then((value)=> {
                traitement(value.status,value.result,span,list_input[value.status])
                if (value.status === null ){
                    send_button_animation()
                }
            })
            
                break

            //Produit de référence
            case "1": 

            data = {
                name : list_input[0].value,
                reference : list_input[1].value,
                weight : list_input[2].value
            }

            Myrequest("/API/formulaire/produit_reference","POST",data)
            .then((value)=> traitement(value.status,value.result,span,list_input[value.status]))

                break

            //Contrôleur
            case "2": 

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
