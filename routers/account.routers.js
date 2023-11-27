const router = require('express').Router();
const accountControllers = require('../controllers/account.controllers.js');

router.post('/account/Login', accountControllers.LoginAccount);

module.exports = router;
