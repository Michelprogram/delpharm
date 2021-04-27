/* Gestion du formulaire Rapport */
const value_slider = document.querySelector('#value-produit')

const num_controleur = document.querySelector('#numero-controleur')
const ref_produit = document.querySelector('#ref-produit')
const num_poste = document.querySelector('#Name-post')
const service_production = document.querySelector('#List-production')
const nb_produit = document.querySelector('#nb-produit')

const span_formulaire = document.querySelector('#span-status-formulaire')

const send_button_formulaire = document.querySelector('#send-button-formulaire')

const balance_animation = document.querySelector('#animation-poids')
const tab_content = document.querySelector('.Container')
const peser_button = document.querySelector('#peser-button')

const span_poids = document.querySelector('#Poids-produit')
const span_variation = document.querySelector('#Variation')
const img_conforme = document.querySelector('#conforme-img')


/* Déclaration de l'objet rapport */
const rapport = new Rapport(balance_animation,tab_content,peser_button,span_poids,span_variation,img_conforme,
    send_button_formulaire,span_formulaire,num_controleur,ref_produit,num_poste,service_production,nb_produit)


/* Valeur du span à celle du slider */
nb_produit.addEventListener('input',()=>value_slider.innerHTML = nb_produit.value)


/*  Lors du click sur le bouton peser
    Vérifie si les inputs ne sont pas vide,
    Animation de la balance en attente de l'appuie du bouton print
*/
rapport.peser_button.addEventListener('click',(e)=>{
    
    if (rapport.verification_inputs()){

        const data = { nom_produit: ref_produit.value,nombre_de_produit: nb_produit.value }
        
        rapport.pop_up_balance()
        Myrequest("/API/balance/weight","POST",data) 
        .then((data)=>{
            rapport.send_button_animation()
            rapport.pop_up_balance()
            rapport.set_span_balance(data.poids,data.variation,data.conforme)
        })
    }
})

/* Appuie du bouton envoyer */
rapport.send_button.addEventListener('click',async ()=>{
    const response = await rapport.send_data()

    if (response.status === null){
        rapport.clean_input()
        rapport.send_button_animation()
    }

    rapport.set_span_request(response)
})
