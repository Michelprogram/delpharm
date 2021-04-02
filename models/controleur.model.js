//Appel des fichiers supplémentaire
const db = require('./db')
const My_promise = require('./promise')


//Class Controleur qui s'occupe de communiquer avec la Table Contrôleur de la BDD Delpharm
class Controleur{

  constructor(Identifiant,Nom,Prenom,Mail){
    this.identifiant = Identifiant
    this.nom = Nom
    this.prenom = Prenom
    this.mail = Mail
  }

  //Sélection de tous les contrôleurs
  static select_controleur = (cb)=>{
    const request = "SELECT * FROM Controleur"
    db.query(request, (err, result )=>{
      if (err){
        console.log("Erreur lors de la sélection de tous les contrôleurs :" + err)
      } else {
        cb(result)
      }
    })
  }

  //Sélection d'un controleur
  static select_controleur_by_id = async(id) =>{
    const request = `select * from Controleur where Identifiant = ${id}`
    const db_request = await My_promise(request)
    return db_request.length != 0 ? true : false
  }

  //Savoir si l'identifiant ou le mail est déjà utilisé
  verification = async () =>{
    let result = undefined
    const request = `select count(*) as total from Controleur where Identifiant = ${this.identifiant} or Mail = '${this.mail}'`
    
    try{

      const db_request = await My_promise(request)
      result = (JSON.parse(JSON.stringify(db_request)))
      result = db_request[0].total

    } catch (err) {

      console.log("Erreur lors de la vérification Identifiant et Mail d'un contrôleur " + err)

    }
    
    return result != 0 ?  false : true
  }

  //Ajouter un contrôleur
  add_controleur = (cb) =>{
    const request =`INSERT INTO Controleur(Identifiant,Nom,Prenom,Mail) VALUES 
        (${this.identifiant},'${this.nom}','${this.prenom}','${this.mail}')`
    db.query(request, (err) =>{
      if (err) {
        console.log("Erreur lors de l'ajout d'un contrôleur :" + err)
      } else {
        console.log("Ajouté controleur");
      }
    })
  }
}

module.exports = Controleur