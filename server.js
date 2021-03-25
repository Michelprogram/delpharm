//Fichier serveur

//Appel des librairies
const express = require('express')
const bodyParser = require('body-parser')


//Déclaration du serveur web
const app = express()

//Import des fichiers nécessaires 
const conf = require('./config/config').conf
const home_routes = require('./routes/home')
const error_routes = require('./routes/error_pages')
const api_routes = require('./routes/api')

//Connection BDD
const database = require('./models/db')
const balance = require('./balance/balance')

//Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/static' , express.static(__dirname + '/public'))

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