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

const get_date = () =>{
    const date = new Date()
    const final_date = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    return final_date
}

const add_rapport = async (req,res) =>{
    //Calculer le timing et la variation

    if (req.body.length ==0){
        res.json({error:"Body vide"})
    }

    let response = { status : null,result : null}

    const numero_controleur = req.body.numero_controleur
    const production = parseInt(req.body.service,10)
    const poste = req.body.poste

    const reference_produit = await Produit.select_Produit_name(req.body.reference)
    const nombre_produit = parseInt(req.body.nombre_produit,10)

    const date = get_date()

    const conforme = req.body.conforme == "true" ? true :false

    const poids = parseFloat(req.body.poids)
    const variation = parseFloat(req.body.variation)

    const rapport = new Rapport(numero_controleur,production,poste,reference_produit,nombre_produit,date,conforme,poids,variation)
    
    console.log(rapport)
    
    
    //Vérifie si le controleur est dans la BDD
    if ( await Controleur.select_controleur_by_id(numero_controleur)){
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