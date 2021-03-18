const db = require('./db')

const Produit = function(produit) {
    this.Reference = produit.Reference;
    this.Nom =  produit.Nom;
    this.Grammes = produit.Grammes;
  }
  
  
Produit.select_Produit = (cb)=>{
  
    db.query("SELECT * FROM Produit_reference", function (err, result, fields) {
      if (err) throw err;
      cb(result)      
      });
}

module.exports = Produit