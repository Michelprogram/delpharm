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
        const html_tag = element.type == "select-one" || element.type == "range" ? element.name : element.nextElementSibling.innerText
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

    async send_data(status){
        let data = {}
        let request = ""

        if (status == "produit"){
            data = {
                name : this.liste_inputs[0].value,
                reference : this.liste_inputs[1].value,
                weight : this.liste_inputs[2].value
            }

            request = "/API/formulaire/produit_reference"

        } else {
            data = {
                identifiant : this.liste_inputs[0].value,
                nom : this.liste_inputs[1].value,
                prenom : this.liste_inputs[2].value,
                mail : this.liste_inputs[3].value
        
            }
            
            request = "/API/formulaire/user"
        }

        return await Request.send(request,"POST",data)

    }
}