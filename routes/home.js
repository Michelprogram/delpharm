//Fichier des routes home
const routes = require('express').Router()
const home_controller = require('../controllers/home')

routes.get('/',home_controller)

module.exports = routes