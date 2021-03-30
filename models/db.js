//Connexion à la BDD
const mysql = require('mysql')
const database = require('../config/config').conf.database


const db = mysql.createConnection({
    host : database.address,
    user : database.login,
    password : database.password,
    database : database.base
})

db.connect((err)=>{
    if (err){
        throw "Problème de connexion à la BDD"+err
     } else{
        console.log("Connecter à la BDD")
     } 
})

module.exports = db