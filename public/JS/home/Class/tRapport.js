

/*
    Class Rapport qui hérite de la class formulaire
    - Prend les mêmes paramétres que la class Formulaire
*/

class Rapport extends Formulaire{
    constructor(balance_animation,tab_content,peser_button,span_poids,span_variation,img_conforme,
        send_button,span_status,...inputs){
        super(send_button,span_status,...inputs)

        this.balance_animation = balance_animation
        this.tab_content = tab_content
        this.peser_button = peser_button

        this.span_poids = span_poids
        this.span_variation = span_variation
        this.img_conforme = img_conforme

        this._init_select()

    }

    _init_select(){
        const select = this.liste_inputs[1]
        Request.send("/API/select/all_product","GET")
        .then((data)=>{
            for (const key in data) {
                const name = data[key].Nom
                const reference = data[key].Reference
                const option = document.createElement('option')
                option.value = reference
                option.innerHTML = name
                select.appendChild(option)
                
            }
        })
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
            this.balance_animation.setAttribute('class','animation-true')
        } else {
            this.tab_content.style.backgroundColor = "white"
            this.balance_animation.setAttribute('class','animation-false')
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
        return await Request.send("/API/formulaire/rapport","POST",data)
    }

}