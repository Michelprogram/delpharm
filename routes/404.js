//Fichier qui s'occupe de la page 404

const router = require("express").Router()
const render = require("./toolbox")
const path = require('../config').path.notfound

router.get('*',(req,res)=>{

    render(path,res)
})

module.exports = router