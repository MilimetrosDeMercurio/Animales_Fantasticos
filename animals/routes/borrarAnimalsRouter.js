var express = require('express');
var router = express.Router();
var userController = require('../controllers/UserController');

router.get('/', function (req, res, next) {
    res.render('borrar', {error: {bad: false}})
});

router.delete('/:username',userController.delete);
module.exports = router;
/* GET users listing. */

