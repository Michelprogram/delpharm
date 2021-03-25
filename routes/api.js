//Fichier des routes API 
const routes = require('express').Router()
const api_page_controller = require('../controllers/api')
const balance_route = require('../controllers/balance')

routes.get('/balance/weight',balance_route)

routes.get('/select/all_controleur',api_page_controller.select_all_controleur)

routes.get('/select/all_product',api_page_controller.select_all_product)

routes.get('/select/all_rapport',api_page_controller.select_all_rapport)

routes.post('/formulaire/rapport',api_page_controller.add_rapport)

routes.post('/formulaire/produit_reference',api_page_controller.add_produit_reference)

routes.post('/formulaire/user',api_page_controller.add_user)

module.exports = routes