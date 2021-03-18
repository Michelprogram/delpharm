const db = require('./db')

const Rapport = function(rapport) {
    this.Id = rapport.Id;
    this.Controleur =  rapport.Controleur;
    this.time = rapport.time;
    this.Production = rapport.Production;
    this.Poste =  rapport.Poste;
    this.Reference = rapport.Reference;
    this.grammes_peser = rapport.grammes_peser;
    this.Variation =  rapport.Variation;
    this.Conforme = rapport.Conforme;
    this.Nombre_produits = rapport.Nombre_produits;
  }
  
  
  Rapport.select_Rapport = (cb)=>{
  
    db.query("SELECT * FROM Rapport", function (err, result, fields) {
      if (err) throw err;
      cb(result)      
      });
}

module.exports = Rapport