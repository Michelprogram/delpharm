const nom_produit_ref = document.querySelector('#nom-produit-reference')
const reference_produit = document.querySelector('#reference-produit')
const poids_produit_ref = document.querySelector('#poids-produit-reference')

const span_status_ref = document.querySelector('#span-status-produit-reference')
const send_button_produit = document.querySelector("#send-button-produit-ref")

const produit_reference = new Formulaire(send_button_produit,span_status_ref,
    nom_produit_ref,reference_produit,poids_produit_ref)


produit_reference.send_button.addEventListener('click', async ()=>{
    if (produit_reference.verification_inputs()){

        const response = await produit_reference.send_data()


        if (response.status === null){
            produit_reference.clean_input()
        }
    
        produit_reference.set_span_request(response)
    }
})