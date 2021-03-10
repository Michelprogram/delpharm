//Fichier de route page 404
const routes = require('express').Router()
const error_page_controller = require('../controllers/error_page')

routes.get('/',error_page_controller)

module.exports = routes