const weight = (req,res) => {
    //Récupère le poid de la balance et le retourne en format Json
    res.send("test api")
}

const add_rapport = (req,res) =>{
    //Vérifie si chaque champ est conforme
    //Ajoute un rapport à la BDD 
}

const variation = (req,res) =>{
    //Calulcul la variation avec le poids de référence
}

const select_product = (req,res) =>{
    //Retourne la list des produits sélectionner
}

const add_produit_reference = (req,res) =>{

    console.log("Request produit_reference")

    const pat_name = /^[A-Z]\w{1,}$/g
    const pat_reference = /^[0-9]{2}[A-Z][0-9]{2}[A-Z]$/g
    const pat_weight = /^\d{1,}\.\d{1,}$/g

    const name = req.body.name_product
    const reference = req.body.reference_product
    const weight = req.body.weight_product

    let response = {
        result : null
    }

    if (name.match(pat_name) != null){
        if(reference.match(pat_reference) != null){ 
            if (weight.match(pat_weight) != null){
                response.result = "OK"
                //Ajouter à la BDD
            } else {
                response.result = "Le poids est invalide"
            }
        } else {
            response.result = "La référence est invalide"
        }
        
    } else {
        response.result = "Le nom est invalide"
    }
    
    res.json(response)
}

const add_user = (req,res)=>{
    console.log("Request user")

    res.send("salt user")
}

module.exports = {
    weight,
    add_rapport,
    variation,
    select_product,
    add_produit_reference,
    add_user
}