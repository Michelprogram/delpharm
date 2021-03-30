//Middleware route
const routes = require('express').Router()

//Route API
const api_page_controller = require('../controllers/api')
const balance_route = require('../controllers/balance')

//Route pour avoir le poids du produit
routes.post('/balance/weight',balance_route)

//Route pour sélectionner tous les controleurs
routes.get('/select/all_controleur',api_page_controller.select_all_controleur)

//Route pour sélectionner tous les produits de référence
routes.get('/select/all_product',api_page_controller.select_all_product)

//Route pour sélectionner tous les rapports
routes.get('/select/all_rapport',api_page_controller.select_all_rapport)

//Route pour ajouter un rapport
routes.post('/formulaire/rapport',api_page_controller.add_rapport)

//Route pour ajouter un produit de référence
routes.post('/formulaire/produit_reference',api_page_controller.add_produit_reference)

//Route pour ajouter un controleur
routes.post('/formulaire/user',api_page_controller.add_user)

module.exports = routes