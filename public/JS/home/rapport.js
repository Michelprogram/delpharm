//Gestion du formulaire Rapport

const num_controleur = document.querySelector('#numero-controleur')
const ref_produit = document.querySelector('#ref-produit')
const num_poste = document.querySelector('#Name-post')
const service_production = document.querySelector('#List-production')
const nb_produit = document.querySelector('#nb-produit')

const span_formulaire = document.querySelector('#formulaire')

const send_button_formulaire = document.querySelector('div.send-button:nth-child(12)')


const rapport = new Rapport(send_button_formulaire,span_formulaire,num_controleur,ref_produit
    ,num_poste,service_production,nb_produit)


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

rapport.send_button.addEventListener('click',async ()=>{
    const response = await rapport.send_data()

    if (response.status === null){
        rapport.clean_input()
        rapport.send_button_animation()
    }

    rapport.set_span_request(response)
})
