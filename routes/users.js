const express = require('express');
const router = express.Router();
const { login, registration, current } = require('../controllers/users')
const { auth } = require('../middleware/auth')

/* GET users listing. */
router.post('/login', login);

router.post('/registration', registration);

router.get('/current',auth, current);

module.exports = router;
