const Controleur = require('../models/controleur.model')
const Produit = require('../models/produit.model')
const Rapport = require('../models/rapport.model')

const regex = {
    service_de_production : /^[A-H]$/gm,
    poids : /^\d{1,}\.\d{1,}$/gm,
    nom_prenom : /^[A-Z]\w{1,}$/gm,
    reference : /^[0-9]{2}[A-Z][0-9]{2}[A-Z]$/gm,
    mail : /^[A-Za-z](\w|\d|\.){1,}\@[A-Za-z]{1,}\.(com|fr)$/gm
}


const select_all_controleur = (req,res) =>{
    Controleur.select_controleur((result)=>{
        res.json(result)
    })
}

const select_all_product = (req,res) =>{
    Produit.select_produit_reference((result)=>{
        res.json(result)
    })
    
}

const select_all_rapport = (req,res)=>{
    Rapport.select_rapport((result)=>{
        res.send(result)
    })
}

const add_rapport = (req,res) =>{
    //Calculer le timing et la variation

    if (req.body.length ==0){
        res.json({error:"Body vide"})
    }

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

    if (req.body.length ==0){
        res.json({error:"Body vide"})
    }

    const name = req.body.name
    const reference = req.body.reference
    const weight = req.body.weight

    const produit_reference = new Produit(reference,name,weight)
    let response = { status : null,result : null }

    if (name.match(regex.nom_prenom) != null){
        if(reference.match(regex.reference) != null){
            if (weight.match(regex.poids) != null){
                Produit.add_product(produit_reference)
                response.result = "Produit de référence ajouter !"
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

//Finaliser en check user name
const add_user = async (req,res)=>{

    console.log("Request user")

    if (req.body.length ==0){
        res.json({error:"Body vide"})
    }

    const identifiant = parseInt(req.body.identifiant,10)
    const nom = req.body.nom
    const prenom = req.body.prenom
    const mail = req.body.mail

    const controleur = new Controleur(identifiant,nom,prenom,mail)

    let response = { status : null,result : null}

    if (identifiant >= 1 && identifiant <=1000){
        if (nom.match(regex.nom_prenom) != null){
            if (prenom.match(regex.nom_prenom) != null){
                if (mail.match(regex.mail) != null){
                    if (await Controleur.check(identifiant,mail)){
                        Controleur.add_controleur(controleur,(result)=>console.log(result))
                        response.result = "Utilisateur ajouté !"
                    } else {
                        response.result = "Identifiant déjà utilisé"
                    }
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
    add_rapport,
    select_all_controleur,
    select_all_product,
    select_all_rapport,
    add_produit_reference,
    add_user
}