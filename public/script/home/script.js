//Front-end de la page home

//Event sur le bouton envoyer
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

//Value du slider en texte
slider.value = 0
slider.addEventListener('input',(e)=>{
    value_slider.innerHTML = e.target.value
})

slider_produit.value = 0
slider_produit.addEventListener('input', (e) =>{
    nb_produit.innerHTML = e.target.value
})



create_list_production(65,73,"#List_production",true)
create_list_production(1,51,"#Name_post",false)