const db = require('./db')

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

  /*
  static select_Produit = async ()=>{
  
    const request = "SELECT * FROM Produit_reference"
    const r = await new Promise ((resolve,reject)=>{
      db.query(request,(err,result)=>(resolve(result)))
    })
    return r
  }
  */
}

module.exports = Produit