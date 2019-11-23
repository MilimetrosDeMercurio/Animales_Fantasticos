var Animal = require('../models/animal');
var debug = require('debug')('animals:animal_controller');

// Search a one animal y database
module.exports.getOne = (req, res, next) => {
    debug("Search Animal", req.params);
    Animal.findOne({
            Nombre: req.params.nombre
        }, "-name -login_count")
        .then((foundAnimal) => {
            if (foundAnimal)
                return res.status(200).json(foundAnimal);
            else
                return res.status(400).json(null)
        })
        .catch(err => {
            next(err);
        });
}

//Conseguir todos
module.exports.getAll = (req, res, next) => {
    var perPage = Number(req.query.size) || 10,
        page = req.query.page > 0 ? req.query.page : 0;

    var sortProperty = req.query.sortby || "createdAt",
        sort = req.query.sort || "desc";

    debug("Animal List",{size:perPage,page, sortby:sortProperty,sort});

    Animal.find({}, "-nombre -login_count ")
        .limit(perPage)
        .skip(perPage * page)
        .sort({ [sortProperty]: sort})
        .then((users) => {
           return res
           .status(200).json(animals)
        }).catch(err => {
            next(err);
        })

}

//Crear animal
module.exports.register = (req, res, next) => {
    
    
    debug("New Animal", {
        body: req.body
    });
    Animal.findOne({
            nombre:eq.body.nombre
        }, "-nombre -login_count")
        .then((foundAnimal) => {
            if (foundAnimal) {
                debug("Animal duplicado");
                throw new Error(`Animal duplicado ${req.body.nombre}`);
            } else {
                let newAnimal = new Animal({
                    nombre: req.body.nombre,
                    clasificacion: req.body.clasificacion || "",
                    apariencia: req.body.apariencia || "",
                    poder: req.body.poder,
                    ubicacion: req.body.ubicacion /*TODO: Modificar, hacer hash del password*/
                });
                return newAnimal.save(); // Retornamos la promesa para poder concater una sola linea de then
            }
        }).then(animal => { // Con el usario almacenado retornamos que ha sido creado con exito
            return res
                .header('Location', '/animals/' + animal._id)
                .status(201)
                .render('botones')
                .json({
                    _id: animal._id,nombre: animal.nombre
                    
                });
        }).catch(err => {
            next(err);
        });
}

//Update Animal
module.exports.update = (req, res, next) => {
    console.log("update");
    debug("Update animal", {
        nombre: req.params.nombre,        
        ...req.body
    });
    
    let update = {
        ...req.body
    };
    console.log("----------------");
    
    console.log(req.body);
    console.log("----------------");
    
    Animal.findOneAndUpdate({
            nombre: req.params.nombre,
        },update)
        .then((updated) => {
            if (updated)
                return res.status(200).json(updated);
            else
                return res.status(400).json(null);
        }).catch(err => {
            next(err);
        });
}

//Delete User
module.exports.delete = (req, res, next) => {

    debug("Delete animal", {
        nombre: req.params.nombre,
    });

    Animal.findOneAndDelete({nombre: req.params.nombre})
    .then((data) =>{
        if (data) res.status(200).json(data);
        else res.status(404).send();
    }).catch( err => {
        next(err);
    })
}