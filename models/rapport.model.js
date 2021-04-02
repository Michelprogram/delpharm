//Class Rapport
const db = require('./db')

class Rapport{
  constructor(numero_controleur,production,poste,reference_produit,nombre_produit,date,conforme,poids,variation){
    this.numero_controleur = numero_controleur
    this.production = production
    this.poste = poste
    this.reference_produit = reference_produit
    this.nombre_produit = nombre_produit
    this.date = date
    this.conforme =  conforme
    this.poids = poids
    this.variation = variation

  }

  //Sélection de tous les rapports
  static select_rapport = (cb)=>{
    const request = "SELECT * FROM Rapport"
    db.query(request, function (err, result , fields){
      if (err) throw err
      cb(result)
    })
  }


  //Ajouter rapport
  ajouter_Rapport = ()=>{    
    const request =`INSERT INTO Rapport(Controleur,Time,Production,Poste,Reference,Grammes_peser,Variation,Conforme,Nombre_produits) VALUES 
      (${this.numero_controleur},'${this.date}','${this.production}',${this.poste},'${this.reference_produit}',${this.poids},${this.variation},${this.conforme},${this.nombre_produit})`
    db.query(request, function (err, result) {
      if (err) throw err
    })
  }


}


module.exports = Rapport