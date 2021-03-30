//Rendu du code HTML pour la route /
const readFile = require('fs').readFile
const directory = require('../config/config').directory

//Retourne la page home.html
const home = (req,res) =>{
    const headers = { 'Content-Type' : 'text/html' }

    readFile(directory + "/home/index.html", (err,data) =>{
        if (err){
            res.writeHead(500,headers)
            res.write("Erreur du côter serveur")
        } else {
            res.writeHead(200,headers)
            res.write(data.toString())
        }
        res.end()
    })
}

module.exports = home