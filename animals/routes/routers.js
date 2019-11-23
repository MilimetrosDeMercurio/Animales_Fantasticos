var express = require('express');
var router = express.Router();
var userController = require('../controllers/UserController');

router.get('/', function (req, res, next) {
    res.render('jaja', {error: {bad: false}})
});

module.exports = router;
