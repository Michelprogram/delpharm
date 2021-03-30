//Rendu du code HTML pour la route *
const readFile = require('fs').readFile
const directory = require('../config/config').directory

//Retourne la page 404.html
const page_404 = (req,res) =>{
    const headers = { 'Content-Type' : 'text/html' }

    readFile(directory + "/page_404/404.html", (err,data) =>{
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

module.exports = page_404