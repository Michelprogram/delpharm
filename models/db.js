//Connexion à la BDD
const mysql = require('mysql')
const database = require('../config/config').conf.database


const db = mysql.createConnection(database)

db.connect((err)=>{
    if (err){
        console.log("Problème de connexion à la BDD : "+err)
     } else{
        console.log("Connecter à la BDD")
     } 
})

module.exports = db