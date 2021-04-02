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
    db.query(request, function (err, result , fields){
      if (err) throw err;
      cb(result)
    })
  }

  //Sélectionner un produit de référence par rapport à son Nom
  static select_Produit_name = async (nom)=>{
    const request = `SELECT Reference FROM Produit_reference where Nom = '${nom}'`
    let result = await My_promise(request)
    result = (JSON.parse(JSON.stringify(result)))
    return result[0].Reference
  }


  add_product = ()=>{
    const request =`INSERT INTO Produit_reference(Reference,Nom,Grammes) VALUES 
        ('${this.reference}','${this.nom}','${this.grammes}')`
    db.query(request, (err) => {
      if (err){
        console.log("Erreur lors de l'ajout d'un produit de référence :" + err)
      } else {
        console.log("Produit ajouté")
      }
    })
  }
}

module.exports = Produit