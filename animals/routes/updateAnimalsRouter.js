var express = require('express');
var router = express.Router();
var userController = require('../controllers/UserController');

router.get('/', function (req, res, next) {
    res.render('formulario', {error: {bad: false}})
});

router.post('/',userController.register);
module.exports = router;
/* GET users listing. */
