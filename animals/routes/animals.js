var express = require('express');
var router = express.Router();
var animalController = require('../controllers/AnimalController');
//se exportan las primeras 3 lineas y el metodo a usar
/* GET users listing. */
/*router.get('/', function (req, res, next) {
    res.render('formulario', {error: {bad: false}})
});*/

router.get('/:nombre', animalController.getOne);
router.get('/', animalController.getAll);

router.post('/', animalController.register);
router.put('/:nombre', animalController.update);
router.delete('/:nombre', animalController.delete);

module.exports = router;
