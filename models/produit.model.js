//Class Produit
const db = require('./db')
const My_promise = require('./promise')

class Produit{
  constructor(Reference,Nom,Grammes){
    this.reference = Reference
    this.nom =  Nom
    this.grammes = Grammes
  }


  //Sélection de tous les produits de référence
  static select_produit_reference = (cb)=>{
    const request = "SELECT * FROM Produit_reference"
    db.query(request, (err, result ) => {
      err ? console.log("Erreur lors de la sélection de tous les produits de référence : " + err) : cb(result)
    })
  }

  //Sélectionner un produit de référence par rapport à son Nom
  static select_Produit_name = async (nom)=>{
    const request = `SELECT Reference FROM Produit_reference where Nom = '${nom}'`
    let result = await My_promise(request)
    result = (JSON.parse(JSON.stringify(result)))
    return result[0].Reference
  }

  static poids_reference = async (reference) =>{

    let result = null
    const request = `SELECT Grammes FROM Produit_reference where Reference = '${reference}'`

    try {
      const db_request = await My_promise(request)
      result = db_request[0].Grammes
    } catch(err) {
      console.log("Erreur lors de la sélection du poids d'un produit de référence" + err)
    }

    return result
  }

  static poids_name = async (nom) =>{

    let result = null
    const request = `SELECT Grammes FROM Produit_reference where Nom = '${nom}'`

    try {
      const db_request = await My_promise(request)
      result = db_request[0].Grammes
    } catch(err) {
      console.log("Erreur lors de la sélection du poids d'un produit de référence" + err)
    }

    return result
  }

  //Vérifie si il n'y a pas de doublons dans la BDD
  verification = async ()=>{
    let result = null
    const request = `select count(*) as total from Produit_reference where Reference = '${this.reference}' or Nom = '${this.nom}'`
    
    try{

      const db_request = await My_promise(request)
      result = (JSON.parse(JSON.stringify(db_request)))
      result = db_request[0].total

    } catch (err) {

      console.log("Erreur lors de la vérification Reference et Nom d'un Produit de référence " + err)

    }
    
    return result != 0 ?  true : false
  }


  add_product = ()=>{
    const request =`INSERT INTO Produit_reference(Reference,Nom,Grammes) VALUES 
        ('${this.reference}','${this.nom}','${this.grammes}')`
    db.query(request, (err) => {
      err ? console.log("Erreur lors de l'ajout d'un produit de référence :" + err) : console.log("Produit ajouté")
    })
  }
}

module.exports = Produit