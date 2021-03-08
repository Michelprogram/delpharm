const readFile = require('fs').readFile
const directory = require('../config/config').directory

const render = (html,res) => {
    const headers = {
        'Content-Type': 'text/html'
    }
    readFile(html, (err, data) => {
        
        if (err) {
            res.writeHead(500,headers)
            res.write("Erreur file")
            console.log(err)
        } else {
            res.writeHead(200, headers)
            res.write(data.toString())
        }
        res.end()
    })
}

exports.home = (req,res) =>{
    render(directory+"/home/index.html",res)
}

exports.page_404 = (req, res) => {
    render("../public/404.html",res)
}