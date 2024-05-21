const express = require('express');
const router = express.Router();
const controllers = require('../controllers/index')

router.post('/login', controllers.auth.login)

module.exports = router;
