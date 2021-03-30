//Middleware route
const routes = require('express').Router()
const home_controller = require('../controllers/home')

//Route home
routes.get('/',home_controller)

module.exports = routes