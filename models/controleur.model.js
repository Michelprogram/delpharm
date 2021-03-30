//Class Controleur
const db = require('./db')
const My_promise = require('./promise')

class Controleur{
  constructor(controleur){
    this.Identifiant = controleur.Identifiant
    this.Nom = controleur.Nom
    this.Prenom = controleur.Prenom
    this.Mail = controleur.Mail
  }


  //Sélection de tous les contrôleurs
  static select_controleur = (cb)=>{
    const request = "SELECT * FROM Controleur"
    db.query(request, function (err, result , fields){
      if (err) throw err;
      cb(result)
    })
  }

  //Savoir si l'identifiant ou le mail est déjà utilisé
  static check = async (identifiant,mail) =>{
    let result = undefined
    const request = `select count(*) as total from Controleur where Identifiant = ${identifiant} or Mail = '${mail}'`
    let db_request = await My_promise(request)
    result = (JSON.parse(JSON.stringify(db_request)))
    result = db_request[0].total

    return result != 0 ?  false : true
  }
  
  //Ajouter un contrôleur
  static add_controleur = (identifiant,nom,prenom,mail,cb)=>{
    const request = `INSERT INTO Controleur(Identifiant,Nom,Prenom,Mail) VALUES (${identifiant},'${nom}','${prenom}','${mail}')`
    const db_request = db.query(request,(err,result)=>{
      if (err) throw err;
      cb(result)  
    })
  }
  
}

module.exports = Controleur