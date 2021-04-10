/*
    Class Formulaire 
    - Prend en paramétre le bouton d'envoie, la span pour informer de l'état des requests et la liste des inputs
*/
class Formulaire{
    constructor(send_button,span_status,...inputs){
        this.send_button = send_button
        this.span_status = span_status
        this.liste_inputs = inputs
        
    }

    //Une fois le formulaire compléter correctement reset les inputs
    clean_input(){

        for (let index = 0; index < this.liste_inputs.length; index++) {
            const element = this.liste_inputs[index]
            const type_of_element = element.type
            switch (type_of_element){
                case "text":
                    element.value = ""
                    break

                case "select-one":
                    element.selectedIndex = 0
                    break

                case "range":
                    element.value = 0
                    break
            }
        }
    }

    //Avant d'envoyer la request vérifie bien que chaque input est remplit
    verification_inputs(){
        let flag = true
        for (let index = 0; (index < this.liste_inputs.length && flag); index++) {
            const element = this.liste_inputs[index]
            const type_of_element = element.type
            if ((type_of_element == "text" && element.value == "") || 
            ((type_of_element == "select-one" || type_of_element == "range") && element.value == "0")){
                this._invalid_input(element)
                this._set_span(element)
                flag = false
            } else {
                this._set_span()
            }
        
        }

        return flag
    }

    //Animation si l'input est mauvais
    _invalid_input = (element) =>{
        element.setAttribute('class','numero-controleur-trigger')
        setTimeout(()=>element.removeAttribute('class'),1500)
    }

    //Met à jour la span status si l'utilisateur n'a pas rempli tous les champs
    _set_span(element){
        if (element){
        const html_tag = element.previousElementSibling.innerText
        this.span_status.innerHTML = `${html_tag} est invalide.`
        } else {
            this.span_status.innerHTML = ''
        }
    }

    //Met à jour la span status après l'envoie de la request
    set_span_request(data){
        data.status != null ? this._invalid_input(this.liste_inputs[data.status]) : null
        this.span_status.setAttribute('class','error-message')
        this.span_status.innerHTML = data.result
    }
}

/*
    Class Rapport qui hérite de la class formulaire
    - Prend les mêmes paramétres que la class Formulaire
*/

class Rapport extends Formulaire{
    constructor(send_button,span_status,...inputs){
        super(send_button,span_status,...inputs)

        this.balance_animation = document.querySelector('#animation-poids')
        this.tab_content = document.querySelector('.Container')
        this.peser_button = document.querySelector('#peser-button')

        this.span_poids = document.querySelector('#Poids-produit')
        this.span_variation = document.querySelector('#Variation')
        this.img_conforme = document.querySelector('#conforme-img')

    }

    //Réécriture de la méthode clean input en rajoutant l'image ainsi que la span poids et variation
    clean_input(){
        super.clean_input()
        this.span_poids.innerHTML = this.span_variation.innerHTML = ""
        this.img_conforme.style.display = "none"
    }

    //Animation pour faire apparaître/cacher la balance
    pop_up_balance(){

        if (window.getComputedStyle(this.tab_content).backgroundColor == "rgb(255, 255, 255)"){
            this.tab_content.style.backgroundColor = "gray"
            this.balance_animation.style.opacity ="1"
            this.balance_animation.style.marginLeft ="45"
        } else {
            this.tab_content.style.backgroundColor = "white"
            this.balance_animation.style.opacity ="0"
            this.balance_animation.style.marginLeft ="-400"
        }

    }

    //Met à jour les spans poids et variation ainsi que l'image
    set_span_balance(poids,variation,conforme){
        this.span_poids.innerHTML = poids
        this.span_variation.innerHTML = variation
        this.img_conforme.style.display = "block"

        if (conforme){
            this.img_conforme.setAttribute('src','/static/images/home/true.svg')
        } else {
            this.img_conforme.setAttribute('src','/static/images/home/false.svg')
        }
    }

    //Si le formulaire est complé après la peser, rend le BTN envoyer clickable
    send_button_animation = () =>{

        if (window.getComputedStyle(this.send_button).opacity == 0.5){
            this.send_button.style.opacity = "1"
            this.send_button.style.pointerEvents = "auto"
        } else {
            this.send_button.style.opacity = "0.5"
            this.send_button.style.pointerEvents = "none"
        }
        
    }

    //Request pour le bouton envoyé
    async send_data(){

        const data = {
            numero_controleur : this.liste_inputs[0].value,
            reference : this.liste_inputs[1].value,
            poste : this.liste_inputs[2].value,
            production : this.liste_inputs[3].value,

            poids : this.span_poids.textContent,
            variation : this.span_variation.textContent,
            
            conform: this.img_conforme.currentSrc.includes('true') ? true :false,
            nombre_produit : this.liste_inputs[4].value
        }

        const response_request = await Myrequest("/API/formulaire/rapport","POST",data)
        return response_request
        
    }

}


class Produit_ref extends Formulaire{
    constructor(send_button,span_status,...inputs){
        super(send_button,span_status,...inputs)
    }

    async send_data(){
        const data = {
            name : this.liste_inputs[0].value,
            reference : this.liste_inputs[1].value,
            weight : this.liste_inputs[2].value
        }

        const request = await Myrequest("/API/formulaire/produit_reference","POST",data)
        console.log(request)
        return request

    }

}


class Controleur extends Formulaire{
    constructor(send_button,span_status,...inputs){
        super(send_button,span_status,...inputs)
    }


    async send_data(){
        
        const data = {
            identifiant : this.liste_inputs[0].value,
            nom : this.liste_inputs[1].value,
            prenom : this.liste_inputs[2].value,
            mail : this.liste_inputs[3].value
    
        }
    
        const request = await Myrequest("/API/formulaire/user","POST",data)
        return request
    }

}