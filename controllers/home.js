const readFile = require('fs').readFile
const directory = require('../config/config').directory


const home = (req,res) =>{
    //Retourne la page home.html
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