/* Gestion du formulaire controleur */
const identifiant_controleur = document.querySelector('#identifiant-utilisateur')
const nom_controleur = document.querySelector('#nom-utilisateur')
const prenom_controleur = document.querySelector('#prenom-utilisateur')
const adresse_mail_controleur = document.querySelector('#mail-utilisateur')

const span_status_controleur = document.querySelector('#spans-status-utilisateur')
const send_button_controleur = document.querySelector('#send-button-controleur')

/* Déclaration de l'objet formulaire */
const controleur = new Formulaire(send_button_controleur,span_status_controleur,identifiant_controleur,
    nom_controleur,prenom_controleur,adresse_mail_controleur)

/*  Appuie sur le bouton envoyer
    Vérifie si les inputs ne sont pas vide,
    Envoie les données à l'api pour enregistrer
*/
controleur.send_button.addEventListener('click', async ()=>{
    if (controleur.verification_inputs()){

        const response = await controleur.send_data()


        if (response.status === null){
            controleur.clean_input()
        }
    
        controleur.set_span_request(response)
    }
})