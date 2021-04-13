//Gestion du formulaire Rapport
const value_slider = document.querySelector('#value-produit')

const num_controleur = document.querySelector('#numero-controleur')
const ref_produit = document.querySelector('#ref-produit')
const num_poste = document.querySelector('#Name-post')
const service_production = document.querySelector('#List-production')
const nb_produit = document.querySelector('#nb-produit')

const span_formulaire = document.querySelector('#span-status-formulaire')

const send_button_formulaire = document.querySelector('#send-button-formulaire')


const rapport = new Rapport(send_button_formulaire,span_formulaire,num_controleur,ref_produit
    ,num_poste,service_production,nb_produit)


//Liée la valeur du slider à celle du span
nb_produit.addEventListener('input',()=>{
    value_slider.innerHTML = nb_produit.value
})



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
