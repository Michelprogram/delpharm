const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser')


const conf = require('./config').conf
const path = require('./config').path

const app = express()


app.use(bodyParser.json());
app.use('/css',express.static(path.css));
app.use('/images',express.static(path.images));
app.use('/script',express.static(path.script));


app.get('/',(req,res)=>{

    fs.readFile(path.html,(err,data)=>{
        res.writeHead(200,{'Content-Type': 'text/html'})
        res.write(data.toString())
        res.end()
    })

})

app.post('/formulaire',(req,res)=>{
    console.log(req.body)
    console.log("test formulaire")
})

app.get('*',(req,res)=>{

    res.writeHead(200,{'Content-Type': 'text/html'})
    res.write("404 not Found")
    res.end()
})

app.listen(conf.port,()=>{
    console.log("écoute du serveur")
})






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