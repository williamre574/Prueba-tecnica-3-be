const { Router } = require('express');
const router = Router();
const asyncHandler = require('express-async-handler');
const OBESIDADS_SERVICE = 'obecidadsService';

//recuperar todos los nombres e identificaciones de los estados
router.get('/', asyncHandler(async (req, res) => {
    res.send(await res.app.get(OBESIDADS_SERVICE).getAll());
}));
//enviar IDF, recuperar el indice de obesidad, coordenadas 
router.get('/id', asyncHandler(async (req, res) => {
    res.send(await res.app.get(OBESIDADS_SERVICE).getById(req,res));
}));
//recuperar el nombre y valor del indice mayor
router.get('/mayor', asyncHandler(async (req, res) => {
    res.send(await res.app.get(OBESIDADS_SERVICE).getNameIndice(req,res));
}));
//recuperar el nombre y valor del indice menor
router.get('/menor', asyncHandler(async (req, res) => {
    res.send(await res.app.get(OBESIDADS_SERVICE).getNameIndiceMenor(req,res));
}));
router.get('/promedio', asyncHandler(async (req, res) => {
    const promedio = await res.app.get(OBESIDADS_SERVICE).getPromedio(req, res);
    res.status(200).json(promedio);
}));

module.exports = router;