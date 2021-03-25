const db = require('./db')
const My_promise = require('./promise')

class Produit{
  constructor(){
    this.Reference = produit.Reference
    this.Nom =  produit.Nom
    this.Grammes = produit.Grammes
  }

  static select_Produit =  (cb)=>{
  
    const request = "SELECT * FROM Produit_reference"
    db.query(request,(err,result)=>{
      if (err) throw err
      cb(result)
    })
  }

  static select_Produit_name = async (nom)=>{
    const request = `SELECT Grammes FROM Produit_reference where Nom = '${nom}'`
    let result = await My_promise(request)
    result = (JSON.parse(JSON.stringify(result)))
    return result[0].Grammes

  }
}

module.exports = Produit