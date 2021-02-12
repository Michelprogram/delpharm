const router = require("express").Router();

router.post('/formulaire', (req, res) => {

    const data = {
        numero_controleur: true,
        reference_produit: true,
        service_production: true,
        nom_poste: true,
        poids: true,
        variation: true
    }

    console.log(req.body)
    check_controleur(req.body.numero_controleur)

})


const check_controleur = (numero_controleur) => {
    //Check si la syntaxe contrôleur est bonne 
    const pattern = /[\D\W]/g

    if (numero_controleur.match(pattern) || (numero_controleur.length > 6 || numero_controleur.length < 6)) {
        return "Nom contrôleur invalide"
    }
    else {
        console.log("Request pour vérifier le numéro")
    }
}

const check_reference = () => {
    //Check si la référence est dans la BDD
}

const check_production_poste = () =>{
    //Vérifie si le champ production ou poste est conforme
}

const calcul_variation = () =>{
    //Calcul la variation du produit
}

const ajout_bdd = () =>{
    //Ajouter à la BDD une fois les données vérifier
}



module.exports = router;

