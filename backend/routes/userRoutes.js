const express = require('express')
const router = express.Router()
const {userLogin, userRegister, getMe} = require('../controllers/userController')

const {protect} = require('../middleware/authMiddleware')

router.post('/', userRegister)
router.post('/login', userLogin)
router.get('/me',protect, getMe)
module.exports = router