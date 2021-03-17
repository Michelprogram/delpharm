const { response } = require("express")

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
    //Calculer le timing et la conformité

    const pat_ref = /^[A-H]$/g
    const pat_poids = /^\d{1,}\.\d{1,}$/g

    let response = { status : null,result : null}

    const numero_controleur = req.body.numero_controleur
    const reference = req.body.reference
    const service = req.body.service
    const numero_poste = parseInt(req.body.numero_poste,10)
    const poids = req.body.poids
    const variation = req.body.variation
    const nombre_produit = req.body.nombre_produit

    if (true){ //Vérifié controleur dans la BDD
        if(true){ //Vérifié si la reference est dans la BDD
            if (service.match(pat_ref) != null){
                if(numero_poste >= 1 && numero_poste <= 50){
                    if(poids.match(pat_poids) != null){
                        if(variation.match(pat_poids) != null){
                            if(nombre_produit != '0'){
                                //Ajouté le produit à la BDD
                                response.result = "Rapport ajouté"
                            } else {
                                response.status = 6
                                response.result = "nombre de produit invalide invalide"
                            }
                        }
                    } else {
                        response.status = 4
                        response.result = "Poids invalide"
                    }
                } else {
                    response.status = 3
                    response.result = "Numéro de poste invalide"
                }
            } else {
                response.status = 2
                response.result = "Numéro de service invalide"
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

    const pat_name = /^[A-Z]\w{1,}$/g
    const pat_reference = /^[0-9]{2}[A-Z][0-9]{2}[A-Z]$/g
    const pat_weight = /^\d{1,}\.\d{1,}$/g

    const name = req.body.name
    const reference = req.body.reference
    const weight = req.body.weight

    let response = { status : null,result : null }

    if (name.match(pat_name) != null){
        if(reference.match(pat_reference) != null){ 
            if (weight.match(pat_weight) != null){
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

    const pat_name = /^[A-Z][a-z]{1,}$/gm
    const pat_mail = /^[A-Za-z](\w|\d|\.){1,}\@[A-Za-z]{1,}\.(com|fr)$/gm

    const identifiant = parseInt(req.body.identifiant,10)
    const nom = req.body.nom
    const prenom = req.body.prenom
    const mail = req.body.mail

    let response = { status : null,result : null}

    if (identifiant >= 1 && identifiant <=1000){
        if (nom.match(pat_name) != null){
            if (prenom.match(pat_name) != null){
                if (mail.match(pat_mail) != null){
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