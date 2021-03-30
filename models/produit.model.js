//Class Produit
const db = require('./db')
const My_promise = require('./promise')

class Produit{
  constructor(){
    this.Reference = produit.Reference
    this.Nom =  produit.Nom
    this.Grammes = produit.Grammes
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
    const request = `SELECT Grammes FROM Produit_reference where Nom = '${nom}'`
    let result = await My_promise(request)
    result = (JSON.parse(JSON.stringify(result)))
    return result[0].Grammes

  }
}

module.exports = Produit