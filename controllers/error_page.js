const readFile = require('fs').readFile
const directory = require('../config/config').directory

const page_404 = (req,res) =>{
    //Retourne la page 404.html
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