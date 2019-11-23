var express = require('express');
var router = express.Router();
var userController = require('../controllers/UserController');

router.delete('/',userController.delete);

module.exports = router;