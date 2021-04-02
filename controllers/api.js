const Controleur = require('../models/controleur.model')
const Produit = require('../models/produit.model')
const Rapport = require('../models/rapport.model')

const regex = require('../toolbox/regex')
const calcul = require('../toolbox/calcul')



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

//Route pour ajouer un rapport
const add_rapport = async (req,res) =>{

    console.log("Request pour ajouter un rapport")

    //Si le body est vide alors on renvoie une erreur
    if (body.length ==0) res.json({error:"Body vide"})

    let response = { status : null,result : null}

    const body = req.body

    /*
    const rapport = new Rapport(
        body.numero_controleur,
        parseInt(body.service,10),
        body.poste,
        await Produit.select_Produit_name(body.reference),
        parseInt(body.nombre_produit,10),
        calcul.date(),
        body.conforme == "true" ? true :false,
        parseFloat(body.poids),
        parseFloat(body.variation)
    )
    */

    //Initialisation d'un OBJ Rapport
    const numero_controleur = req.body.numero_controleur
    const production = parseInt(req.body.service,10)
    const poste = req.body.poste

    const reference_produit = await Produit.select_Produit_name(req.body.reference)
    const nombre_produit = parseInt(req.body.nombre_produit,10)

    const date = calcul.date()

    const conforme = req.body.conforme == "true" ? true :false

    const poids = parseFloat(req.body.poids)
    const variation = parseFloat(req.body.variation)

    const rapport = new Rapport(numero_controleur,production,poste,reference_produit,nombre_produit,date,conforme,poids,variation)
    
        
    //Vérifie si le controleur est dans la BDD
    if ( await Controleur.select_controleur_by_id(numero_controleur)){
        //Vérifie si le champ production est bien compris en 1 et 50 inclus
        if (production <= 50 && production >= 1){
            rapport.ajouter_Rapport()
            response.result = "Rapport ajouté !"
        } else {
            response.status = 2
            response.result = "Numero du poste invalide"
        }
    } else {
        response.status = 0
        response.result = "Numéro de contrôleur invalide"
    }

    res.json(response)
}

//Route pour ajouter un produit de référence
const add_produit_reference = (req,res) =>{

    console.log("Request pour ajouter un produit de référence")

    //Si le body est vide alors on renvoie une erreur
    if (body.length ==0) res.json({error:"Body vide"})

    const body = req.body

    const name = body.name
    const reference = body.reference
    const weight = body.weight

    const produit = new Produit(reference,name,weight)
    let response = { status : null,result : null }

    if (name.match(regex.nom_prenom) != null){
        if(reference.match(regex.reference) != null){
            if (weight.match(regex.poids) != null){
                produit.add_product()
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

const add_user = async (req,res)=>{

    console.log("Request pour ajouter un controleur")

    //Si le body est vide alors on renvoie une erreur
    if (req.body.length ==0) res.json({error:"Body vide"})
    
    const body = req.body

    //Initialisation d'un OBJ Controleur
    const identifiant = parseInt(body.identifiant,10)
    const nom = body.nom
    const prenom = body.prenom
    const mail = body.mail

    const controleur = new Controleur(identifiant,nom,prenom,mail)

    let response = { status : null,result : null}

    if (identifiant >= 1 && identifiant <=1000){
        if (nom.match(regex.nom_prenom) != null){
            if (prenom.match(regex.nom_prenom) != null){
                if (mail.match(regex.mail) != null){
                    if (await controleur.verification()){
                        controleur.add_controleur((result)=>console.log(result))
                        response.result = "Utilisateur ajouté !"
                    } else {
                        response.result = "Identifiant ou Mail déjà utilisé"
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