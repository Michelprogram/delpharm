const routes = require('express').Router()

const route_impression = require('../controllers/impression')

routes.post('/unitaire',route_impression.impression_rapport_unitaire)

module.exports = routes