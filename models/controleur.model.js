const db = require('./db')

const Controleur = function(controleur) {
    this.Identifiant = controleur.Identifiant;
    this.Nom = controleur.Nom;
    this.Prenom = controleur.Prenom;
    this.Mail = controleur.Mail;
  }
  
  Controleur.select_Controleur = (cb)=>{
  
    db.query("SELECT * FROM Controleur", function (err, result, fields) {
      if (err) throw err;
      cb(result)      
      });
}

module.exports = Controleur