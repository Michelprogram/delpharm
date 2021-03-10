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

module.exports = {
    weight,
    add_rapport,
    variation,
    select_product
}