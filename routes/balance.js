//Middleware route
const routes = require('express').Router()


const balance_route = require('../controllers/balance')

//Route pour avoir le poids du produit
routes.get('/weight',balance_route.poids_produit)


module.exports = routes
