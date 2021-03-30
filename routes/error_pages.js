//Middleware route
const routes = require('express').Router()
const error_page_controller = require('../controllers/error_page')

//Route page 404
routes.get('/',error_page_controller)

module.exports = routes