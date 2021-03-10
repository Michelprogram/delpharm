const router = require('express').Router()
const user_controller = require('../controllers/control')

router.get('/',user_controller.home)
router.get("/weight",user_controller.weight)

router.get('*',user_controller.page_404)



module.exports = router