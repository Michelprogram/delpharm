//Fichier qui s'occupe de la page 404

const router = require("express").Router()
const fs = require('fs')
const path = require('../config').path.notfound

router.get('*',(req,res)=>{

    fs.readFile(path,(err,data)=>{
        res.writeHead(200,{'Content-Type': 'text/html'})
        res.write(data.toString())
        res.end()
    })
})

module.exports = router