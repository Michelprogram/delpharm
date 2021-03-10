//Fichier serveur

const express = require('express')

const conf = require('./config/config').conf

const bodyParser = require('body-parser')

const app = express()


const routes = require('./routes/routes')

//Connection BDD

//Middleware

//Home page

//API

//404



/*
app.set('views','./views')
app.set('views engine' , 'ejs')
//app.use(favicon(__dirname + '/public/images/logo/Logo.ico'))

*/
app.use(bodyParser.json())

app.use('/static' , express.static(__dirname + '/public'))


app.use(routes)

app.listen(conf.server.port,conf.server.addresse, console.log("Serveur en marche"))