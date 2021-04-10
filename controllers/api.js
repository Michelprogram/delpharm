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

const select_rapport_by_ref = async (req,res)=>{
    
    let response = {
        poids_reference:0.0,
        liste_poids:null
    }
    const reference = req.params.reference
    const liste_poids = await Rapport.select_rapport_by_reference(reference)
    const poids_reference = await Produit.poids_reference(reference)
    
    response.poids_reference = poids_reference
    response.liste_poids = liste_poids

    res.json(response)
}

//Route pour ajouer un rapport
const add_rapport = async (req,res) =>{

    console.log("Request pour ajouter un rapport")

    const body = req.body

    //Si le body est vide alors on renvoie une erreur
    if (body.length ==0) res.json({error:"Body vide"})

    let response = { status : null,result : null}

    //Initialisation d'un OBJ Rapport
    const numero_controleur = parseInt(body.numero_controleur,10)
    const date = calcul.date()

    const production = body.production
    const poste = parseInt(body.poste,10)

    const reference_produit = await Produit.select_Produit_name(body.reference)

    const poids = parseFloat(body.poids)
    const variation = parseFloat(body.variation)

    const conforme = body.conforme == "true" ? true :false

    const nombre_produit = parseInt(body.nombre_produit,10)
    
    const rapport = new Rapport(numero_controleur,production,poste,reference_produit,nombre_produit,date,conforme,poids,variation)


    //Vérifie si le controleur est dans la BDD
    if ( await Controleur.select_controleur_by_id(numero_controleur)){
        //Vérifie si le champ production est bien compris en 1 et 50 inclus
        if (poste <= 50 && poste >= 1){
            rapport.ajouter_Rapport()
            response.result = "Rapport ajouté !"
        } else {
            response.status = 2
            response.result = "Le numero du poste est invalide"
        }
    } else {
        response.status = 0
        response.result = "Le Controleur n'est pas enregistré"
    }

    res.json(response)
}

//Route pour ajouter un produit de référence
const add_produit_reference = async (req,res) =>{

    console.log("Request pour ajouter un produit de référence")

    const body = req.body

    //Si le body est vide alors on renvoie une erreur
    if (body.length ==0) res.json({error:"Body vide"})

    //Initialisation d'un objet Produit
    const name = body.name
    const reference = body.reference
    const weight = body.weight

    const produit = new Produit(reference,name,weight)
    let response = { status : null,result : null }
    
    //Vérifie si le nom respect la regex
    if (name.match(regex.nom_prenom) != null){
        //Vérifie si la référence respect la regex
        if(reference.match(regex.reference) != null){
            //Vérifie si le poids respect la regex
            if (weight.match(regex.poids) != null){
                //Vérifie dans la BDD si il n'y a pas de doublons
                if (! await produit.verification()){
                    //Ajoute le produit à la BDD
                    produit.add_product()
                    response.result = "Produit de référence ajouter !"
                } else {
                    response.status = 1
                    response.result = "Un Produit avec le même Nom ou Référence existe déjà"
                }
                
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

//Route pour ajouter un user
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

    //Vérifie si l'id de l'utilisateur est entre 1 et 1000 compris
    if (identifiant >= 1 && identifiant <=1000){
        //Vérifie si le nom respect la regex
        if (nom.match(regex.nom_prenom) != null){
            //Vérifie si le prénom respect la regex
            if (prenom.match(regex.nom_prenom) != null){
                //Vérifie si le mail respect la regex
                if (mail.match(regex.mail) != null){
                    //Vérifie dans la BDD si il n'y a pas de doublons
                    if (await controleur.verification()){
                        //Ajoute dans la BDD le nouveau contrôleur
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
    select_rapport_by_ref,
    add_produit_reference,
    add_user
}