//Importamos express y las librerias necesarias.
const express = require('express');
const bodyParser = require('body-parser');
const methdOverride = require('method-override');
const mongus = require('mongoose');
const cors = require('cors');

//Acceso al paquete de configuraciones .env
require('dotenv/config');

//Ejecutamos la libreria express.
const app = express();

//Middleware
//Usamos BodyParser para trabajar con JSON
//Method override para sobreescribir metodos de peticion http.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methdOverride());
app.use(cors());

//Importamos las rutas
const rutaPosts = require('./controllers/peliculas');
app.use('/peliculas', rutaPosts);

//Creamos ruta home.
//Peticion html GET.
app.get('/', (req, res) => {
    res.send('Bienvenidos a inicio.');
});

mongus.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('Conectado a base de datos')
);

//Empezamos a escuchar al servidor.
app.listen(3000, function(){
    console.log("Servidor Node corriendo en: http://localhost:3000")
});