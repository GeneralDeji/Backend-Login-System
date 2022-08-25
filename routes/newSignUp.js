const express = require('express');
const router = express.Router();
const { renderIndexPage, renderLoginPage, signup_post, renderDashboard, login_post, logout } = require('../controllers/newSignUp')
const {requiredAuthProcess, checkCurrentUser} = require('../middleware/auth')


router.get('/', renderIndexPage);
router.get('/login', renderLoginPage);
router.get("/dashboard", requiredAuthProcess, checkCurrentUser , renderDashboard)
router.post('/', signup_post)
router.post('/login', login_post)
router.get('/logout', logout)

module.exports = router;