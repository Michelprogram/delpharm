//Fichier des routes API 
const routes = require('express').Router()
const api_page_controller = require('../controllers/api')

routes.post('/add_rapport',api_page_controller.add_rapport)

routes.get('/weight',api_page_controller.weight)

routes.get('/variation',api_page_controller.variation)

routes.get('/select_product',api_page_controller.select_product)

module.exports = routes