const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AnimalSchema = Schema({
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    clasificacion: String,
    apariencia: String,
    poder: {
        type: String,
        min: 0,
        max: 10000000000,
        required: true
    },
    ubicacion: {
        type: String,
        required: true
    },
    login_count: Number
}, {
    timestamps: true
});

module.exports = mongoose.model("Animal", AnimalSchema);