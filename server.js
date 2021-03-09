//Fichier serveur

const express = require('express')
const conf = require('./config/config').conf

const bodyParser = require('body-parser')

const app = express()

const routes = require('./routes/users')

app.use(bodyParser.json())


app.get('/', routes.home)
//app.get('*', routes.page_404)

app.listen(conf.port, console.log("Serveur en marche"))


app.use('/static' , express.static(__dirname + '/public'))


/*
const http = require("http")
const fs = require('fs')
const path = require('path')

const port = 8080
const hostname = "127.0.0.1"
const current_path = __dirname.split("/server")[0]
const path_html = current_path+"/public/html/index.html"


const server = http.createServer((req,res)=>{


    const url = req.url


    if (url == "/"){
        console.log(url)
        fs.readFile(path_html,(err,data)=>{
            res.writeHead(200,{'Content-Type': 'text/html'})
            res.write(data.toString())
            res.end()
        })

    }
    else{
        res.write("Invalid url")
        res.end()
    }



})
server.listen(port,hostname,()=>{
    console.log("Serveur en écoute")
})

server.on("connection",(req,res)=>{

    console.log("Connecter")
})

server.on("clientError",(req,res)=>{
    console.log("errur")
})
*/