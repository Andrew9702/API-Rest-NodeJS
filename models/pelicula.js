//Creamos un schema del modelo
const mongoose = require('mongoose');
Schema = mongoose.Schema;

//En este modelo podemos agregar validaciones a los atributos
//Esto, creando un objeto con las llaves.
var peliculaSchema = new Schema({
    titulo : { 
        type : String,
        required : true
    },
    director : {
        type : String,
        required : true
    },
    anio : { type : Number}, 
    poster : { type: String},
    descripcion : { type: String} 
});

module.exports = mongoose.model('Pelicula', peliculaSchema);