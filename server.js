//Fichier serveur

const express = require('express')

const conf = require('./config/config').conf

const bodyParser = require('body-parser')

const app = express()

const routes = require('./routes/users')

app.use(bodyParser.json())

app.use('/static' , express.static(__dirname + '/public'))
//app.use(favicon(__dirname + '/public/images/logo/Logo.ico'))


app.get('/', routes.home)
app.get('*', routes.page_404)
app.get('/weight', routes.weight)

app.listen(conf.server.port,conf.server.addresse, console.log("Serveur en marche"))