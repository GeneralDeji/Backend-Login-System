const express = require('express');
const router = express.Router();
const { renderIndexPage, renderLoginPage, signup_post, renderDashboard, login_post } = require('../controllers/newSignUp')
const requiredAuthProcess = require('../middleware/auth')


router.get('/', renderIndexPage);
router.get('/login', renderLoginPage);
router.get("/dashboard", requiredAuthProcess, renderDashboard)
router.post('/', signup_post)
router.post('/login', login_post)

module.exports = router;