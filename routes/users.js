const router = require('express').Router()
const user_controller = require('../controllers/control')

exports.home = router.get('/',user_controller.home)

exports.page_404 = router.get('*',user_controller.page_404)

exports.weight = router.get("/weight",user_controller.weight)
