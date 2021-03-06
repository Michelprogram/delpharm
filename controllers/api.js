const Controleur = require('../models/controleur.model')
const Produit = require('../models/produit.model')
const Rapport = require('../models/rapport.model')

const regex = require('../toolbox/regex')
const calcul = require('../toolbox/calcul')


const select_all_controleur = (req,res) =>{
    Controleur.select_all((result)=>{
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

const select_product_graphique = (req,res)=>{
    Rapport.select_product_graphique((result)=>{
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


    //V??rifie si le controleur est dans la BDD
    if ( await Controleur.select_controleur_by_id(numero_controleur)){
        //V??rifie si le champ production est bien compris en 1 et 50 inclus
        if (poste <= 50 && poste >= 1){
            rapport.ajouter()
            response.result = "Rapport ajout?? !"
        } else {
            response.status = 2
            response.result = "Le numero du poste est invalide"
        }
    } else {
        response.status = 0
        response.result = "Le Controleur n'est pas enregistr??"
    }

    res.json(response)
}

//Route pour ajouter un produit de r??f??rence
const add_produit_reference = async (req,res) =>{

    console.log("Request pour ajouter un produit de r??f??rence")

    const body = req.body

    //Si le body est vide alors on renvoie une erreur
    if (body.length ==0) res.json({error:"Body vide"})

    //Initialisation d'un objet Produit
    const name = body.name
    const reference = body.reference
    const weight = body.weight

    const produit = new Produit(reference,name,weight)
    let response = { status : null,result : null }
    
    //V??rifie si le nom respect la regex
    if (name.match(regex.nom_prenom) != null){
        //V??rifie si la r??f??rence respect la regex
        if(reference.match(regex.reference) != null){
            //V??rifie si le poids respect la regex
            if (weight.match(regex.poids) != null){
                //V??rifie dans la BDD si il n'y a pas de doublons
                if (! await produit.verification()){
                    //Ajoute le produit ?? la BDD
                    produit.ajouter()
                    response.result = "Produit de r??f??rence ajouter !"
                } else {
                    response.status = 1
                    response.result = "Un Produit avec le m??me Nom ou R??f??rence existe d??j??"
                }
                
            } else {
                response.status = 2
                response.result = "Le poids est invalide"
            }
        } else {
            response.status = 1
            response.result = "La r??f??rence est invalide"
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

    //V??rifie si l'id de l'utilisateur est entre 1 et 1000 compris
    if (identifiant >= 1 && identifiant <=1000){
        //V??rifie si le nom respect la regex
        if (nom.match(regex.nom_prenom) != null){
            //V??rifie si le pr??nom respect la regex
            if (prenom.match(regex.nom_prenom) != null){
                //V??rifie si le mail respect la regex
                if (mail.match(regex.mail) != null){
                    //V??rifie dans la BDD si il n'y a pas de doublons
                    if (await controleur.verification()){
                        //Ajoute dans la BDD le nouveau contr??leur
                        controleur.ajouter((result)=>console.log(result))
                        response.result = "Utilisateur ajout?? !"
                    } else {
                        response.result = "Identifiant ou Mail d??j?? utilis??"
                    }
                } else {
                    response.status = 3
                    response.result = "Mail invalide"
                }
            } else {
                response.status = 2
                response.result = "Pr??nom invalide"
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
    select_product_graphique,
    select_rapport_by_ref,
    add_produit_reference,
    add_user
}