const express = require('express');
const router = express.Router();
const { registerUser, loginUser, renderIndexPage, renderLoginPage } = require('../controllers/signUpUsers')

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/', renderIndexPage);
router.get('/login', renderLoginPage);

module.exports = router;