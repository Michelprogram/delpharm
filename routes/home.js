const router = require("express").Router()

const fs = require('fs')
const path_html = require('../config').path.html

router.get('/',(req,res)=>{

    fs.readFile(path_html,(err,data)=>{
        res.writeHead(200,{'Content-Type': 'text/html'})
        res.write(data.toString())
        res.end()
    })

})

module.exports = router