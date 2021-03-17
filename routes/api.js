//Fichier des routes API 
const routes = require('express').Router()
const api_page_controller = require('../controllers/api')

routes.get('/weight',api_page_controller.weight)

routes.get('/variation',api_page_controller.variation)

routes.get('/select_product',api_page_controller.select_product)

routes.post('/formulaire/rapport',api_page_controller.add_rapport)

routes.post('/formulaire/produit_reference',api_page_controller.add_produit_reference)

routes.post('/formulaire/user',api_page_controller.add_user)

module.exports = routes