const express = require('express');

const router = express.Router();

const Pelicula = require('../models/pelicula');
//Creamos rutas
/*
    Podemos crear las rutas que sean y se guardaran con el prefijo posts por 
    que en app.js usamos middleware que ejecuta esta codigo con cada ruta /posts
*/

//Metodo GET de http.
//Para obtener todos las peliculas de la base de datos.
router.get('/', async (req, res) => {
    try{
        const peliculas = await Pelicula.find();
        res.json(peliculas);
    } catch(err){
        res.json({message:err});
    }
});

//Obtener una pelicula en especifico
router.get('/:peliculaId', async (req, res) => {
    try{
        const peliculas = await Pelicula.findById(req.params.peliculaId);
        res.json(peliculas);
    } catch(err){
        res.json({message:err});
    }
});

//Ruta nueva con metodo post, para guardar una nueva pelicula.
router.post('/', async (req, res) => {
    const pelicula = new Pelicula({
        titulo: req.body.titulo,
        director: req.body.director,
        anio : req.body.anio,
        poster : req.body.poster,
        descripcion : req.body.descripcion
    });

    try{
        const peliculaGuardada = await pelicula.save();
        res.json(peliculaGuardada);
    } catch(err){
        res.json({message:err});
    }
});

//Eliminar una pelicula
router.delete('/:peliculaId', async (req, res) =>{
    try{
        const peliculaEliminada = await Pelicula.remove({ _id : req.params.peliculaId});
        res.json(peliculaEliminada);
    } catch(err){
        res.json({message:err});
    }
    
});

//Actualizar una pelicula
router.patch('/:peliculaId', (req, res) =>{
    try{
        Pelicula.findById(req.params.peliculaId, function(err, pelicula){
            pelicula.titulo = (req.body.titulo != null) ? req.body.titulo : pelicula.titulo;
            pelicula.director = (req.body.director != null) ? req.body.director : pelicula.director;
            pelicula.anio = (req.body.anio != null) ? req.body.anio : pelicula.anio;
            pelicula.poster = (req.body.poster != null) ? req.body.poster : pelicula.poster;
            pelicula.descripcion = (req.body.descripcion != null) ? req.body.descripcion : pelicula.descripcion;
            pelicula.save(function(err){
                if(err) return res.status(500).send(err.message);
                res.status(200).jsonp(pelicula);
            });
        });
    } catch(err){
        res.json({message:err});
    }
});

//Se exporta el router para ser usado en el proyecto.
module.exports = router;