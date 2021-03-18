const { response } = require("express")

const regex = {
    service_de_production : /^[A-H]$/gm,
    poids : /^\d{1,}\.\d{1,}$/gm,
    nom_prenom : /^[A-Z]\w{1,}$/gm,
    reference : /^[0-9]{2}[A-Z][0-9]{2}[A-Z]$/gm,
    mail : /^[A-Za-z](\w|\d|\.){1,}\@[A-Za-z]{1,}\.(com|fr)$/gm
}

const weight = (req,res) => {
    //Récupère le poid de la balance et le retourne en format Json
    res.send("test api")
}

const variation = (req,res) =>{
    //Calulcul la variation avec le poids de référence
}

const select_product = (req,res) =>{
    //Retourne la list des produits sélectionner
}

const add_rapport = (req,res) =>{
    //Calculer le timing et la variation

    let response = { status : null,result : null}

    const numero_controleur = req.body.numero_controleur
    const reference = req.body.reference
    const numero_poste = parseInt(req.body.numero_poste,10)

    const poids = req.body.poids

    //Vérifié dans la BDD après
    if (numero_controleur >= 1 && numero_controleur <=1000){
        //Vérifié si c'est dans la BDD
        if(reference.match(regex.reference) != null){
            if(numero_poste => 1 && numero_poste <=50){
                if(poids.match(regex.poids) != null){
                    response.result = "Rapport ajouté"

                } else {
                    response.status = 4
                    response.result = "poids invalide"
                }

            } else {
                response.status = 2
                response.result = "numero du poste invalide"
            }

        } else {
            response.status = 1
            response.result = "Référence du produit invalide"
        }

    } else {
        response.status = 0
        response.result = "Numéro de contrôleur invalide"
    }

    

    res.json(response)
}

const add_produit_reference = (req,res) =>{

    console.log("Request produit_reference")

    const name = req.body.name
    const reference = req.body.reference
    const weight = req.body.weight

    let response = { status : null,result : null }

    if (name.match(regex.nom_prenom) != null){
        if(reference.match(regex.reference) != null){ 
            if (weight.match(regex.poids) != null){
                response.result = "Produit de référence ajouter !"
                //Ajouter à la BDD
            } else {
                response.status = 2
                response.result = "Le poids est invalide"
            }
        } else {
            response.status = 1
            response.result = "La référence est invalide"
        }
    } else {
        response.status = 0
        response.result = "Le nom est invalide"
    }
    
    res.json(response)
}

const add_user = (req,res)=>{

    console.log("Request user")

    const identifiant = parseInt(req.body.identifiant,10)
    const nom = req.body.nom
    const prenom = req.body.prenom
    const mail = req.body.mail

    let response = { status : null,result : null}

    if (identifiant >= 1 && identifiant <=1000){
        if (nom.match(regex.nom_prenom) != null){
            if (prenom.match(regex.nom_prenom) != null){
                if (mail.match(regex.mail) != null){
                    response.result = "Utilisateur ajouté !"
                    //Ajouté l'utilisateur
                } else {
                    response.status = 3
                    response.result = "Mail invalide"
                }
            } else {
                response.status = 2
                response.result = "Prénom invalide"
            }
        } else {
            response.status = 1
            response.result = "Nom invalide"
        }
    } else {
        response.status = 0
        response.result = "Identifiant invalide"
    }

    res.json(response)
}

module.exports = {
    weight,
    add_rapport,
    variation,
    select_product,
    add_produit_reference,
    add_user
}