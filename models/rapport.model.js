//Class Rapport
const db = require('./db')
const My_promise = require('./promise')

class Rapport {
  constructor(numero_controleur, production, poste, reference_produit, nombre_produit, date, conforme, poids, variation) {
    this.numero_controleur = numero_controleur
    this.production = production
    this.poste = poste
    this.reference_produit = reference_produit
    this.nombre_produit = nombre_produit
    this.date = date
    this.conforme = conforme
    this.poids = poids
    this.variation = variation

  }

  //Sélection de tous les rapports
  static select_rapport = (cb) => {
    const request = "SELECT * FROM Rapport"
    db.query(request, function (err, result) {
      try {
        cb(result)
      }
      catch(err){
        console.log("Erreur lors de la request pour selectionner tous les rapports")
      }
    })
  }

  //Sélection de tous les produits ayant un rapport
  static select_product_graphique = (cb) => {
    const request = 'select distinct Produit_reference.Reference,Produit_reference.Nom from Produit_reference,Rapport where Rapport.Reference = Produit_reference.Reference;'
    db.query(request,(err,result)=>{
      try {
        cb(result)
      } catch(err){
        console.log("Erreur lors de la request product graphique")
      }
    })
  }

  //Sélection des rapports d'un même ID
  static select_rapport_by_reference = async (reference) => {
    let liste_poids = []
    const request = `SELECT Grammes_peser FROM Rapport WHERE Reference = '${reference}'`
    const db_request = await My_promise(request)
    for (let i = 0; i < db_request.length; i++)
      liste_poids.push(db_request[i].Grammes_peser)

    return liste_poids
  }


  //Ajouter rapport
  ajouter = () => {
    const request = `INSERT INTO Rapport(Controleur,Time,Production,Poste,Reference,Grammes_peser,Variation,Conforme,Nombre_produits) VALUES 
      (${this.numero_controleur},'${this.date}','${this.production}',${this.poste},'${this.reference_produit}',${this.poids},${this.variation},${this.conforme},${this.nombre_produit})`
    db.query(request, function (err, result) {
      if (err) throw err
    })
  }


}


module.exports = Rapport