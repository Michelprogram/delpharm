//Fichier de la page home
const router = require("express").Router()
const render = require("./toolbox")
const path_html = require('../config').path.html

router.get('/',(req,res)=>{

    render(path_html,res)
})

module.exports = router