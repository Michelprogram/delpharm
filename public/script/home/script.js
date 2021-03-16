//Front-end de la page home

const send_button = document.querySelectorAll(".send-button")


send_button.forEach((button)=>{
    button.addEventListener('click',(e)=>{
        const div_content = button.parentNode
        const number_div = div_content.attributes[0].textContent.substr(-1)
        const list_input = div_content.querySelectorAll("input,select,#poids_produit,#Variation")



        console.log(list_input)
        switch (number_div){
            case "0": //Partie formulaire
            console.log("formulaire")
                break
            case "1": //Partie produit reference
            const data = {
                name_product : list_input[0].value,
                reference_product : list_input[1].value,
                weight_product : list_input[2].value
            }

            const request = new XMLHttpRequest()
            request.onreadystatechange = ()=>{
                if (request.readyState == XMLHttpRequest.DONE && this.status == 200){
                    console.log("request send")
                }
            }
            request.open("POST","/API/produit_reference")
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            request.send(JSON.stringify(data))
            
            console.log("reference",data)
                break
            case "2": //Partie utilisateur
            console.log("utilisteur")
                break
        }
    })
    
})


//Event sur le bouton envoyer
/*
send_button.addEventListener('click',(e)=>{

    
    num_controleur = numero_controleur.value.trim()
    ref = ref_produit.value.trim()

    if (num_controleur.length == 0){
        invalid_input(numero_controleur)

    }
    else if (ref.length == 0){
        invalid_input(ref_produit)
    }

    else if (service_production.value == "null"){
        invalid_input(service_production)
    }
    else if (nom_poste.value == "null"){
        invalid_input(nom_poste)
    }

    else{
        //Request.formulaire()
    }
})
*/


