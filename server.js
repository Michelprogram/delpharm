//Fichier serveur

//Appel des librairies
const express = require('express')
const bodyParser = require('body-parser').json()

//Déclaration du serveur web
const app = express()

//Import des fichiers nécessaires 
const conf = require('./config/config').conf
const home_routes = require('./routes/home')
const error_routes = require('./routes/error_pages')
const api_routes = require('./routes/api')

//Connection BDD

//Middleware
app.use('/static' , express.static(__dirname + '/public'))
app.use(bodyParser)

//Home page
app.use('/',home_routes)
//API
app.use('/API',api_routes)
//404
app.use("*",error_routes)


/*
//app.use(favicon(__dirname + '/public/images/logo/Logo.ico'))
*/


app.listen(conf.server.port,conf.server.addresse, console.log("Serveur en route"))