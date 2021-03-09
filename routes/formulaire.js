//Reçois les requêtes pour vérifier la validité des champs
const router = require("express").Router();

router.post('/formulaire', (req, res) => {

    console.log(req.body)
})

class Verification{

    constructor(){

        this.data = {
            numero_controleur: null,
            reference_produit: null,
            service_production: null,
            nom_poste: null,
            poids: null,
            variation: null
        }
    }

    reference = () =>{
        //Check si la référence est dans la BDD
    }

    production_poste_reference = () =>{
        //Vérifie si le champ production ou poste est conforme
    }

    calcul_variation = () =>{
        //Calcul la variation du produit
    }

    ajout_bdd = () =>{
        //Ajouter à la BDD une fois les données vérifier
    }

    controleur = (numero_controleur) => {
        //Check si la syntaxe contrôleur est bonne 
        const pattern = /[\D\W]/g
    
        if (numero_controleur.match(pattern) || (numero_controleur.length > 6 || numero_controleur.length < 6)) {
            this.data.numero_controleur =  "Nom contrôleur invalide"
        }
        else {
            console.log("Request pour vérifier le numéro")
        }
    }
}


module.exports = router;

