const data = require('../data/message.json')
module.exports = class ObesidadService {
    constructor() { }
    static async init() {

        return new ObesidadService();
    }
    //recuperar todos los nombres e identificaciones de los estados
    async getAll() {
        const results = data.features.map(feature => ({
            FID: feature.properties.FID,
            NAME: feature.properties.NAME,
            OBESITY: feature.properties.Obesity
        }));

        return results;
    }
    async getById(req, res) {
        const id = req.query.idEstado;

        const fidToFind = parseInt(id); // Parse the parameter to an integer
        const result = data.features.find(feature => feature.properties.FID === fidToFind);
        let response = []
        if (result) {
            response = {
                Obesity: result.properties.Obesity,
                coordinates: result.geometry.coordinates
            };

        } else {
            res.status(404).json({ error: 'FID not found' });
        }
        return response
    }
    async getNameIndice() {
        let highestObesity = -1; // Inicializamos con un valor negativo
        let stateNames = [];

        data.features.forEach(feature => {
            if (feature.properties.Obesity > highestObesity) {
                highestObesity = feature.properties.Obesity;
                stateNames = [feature.properties.NAME];
            } else if (feature.properties.Obesity === highestObesity) {
                stateNames.push(feature.properties.NAME);
            }
        });
        const resultado = [stateNames, highestObesity];
        return resultado;
    }
    async getNameIndiceMenor() {
        let lowestObesity = Number.MAX_VALUE; // Inicializamos con un valor muy alto
        let stateNames = [];

        data.features.forEach(feature => {
            if (feature.properties.Obesity < lowestObesity) {
                lowestObesity = feature.properties.Obesity;
                stateNames = [feature.properties.NAME];
            } else if (feature.properties.Obesity === lowestObesity) {
                stateNames.push(feature.properties.NAME);
            }
        });
        const resultado = [stateNames, lowestObesity];
        return resultado;
    }
    async getPromedio(get, res) {
        const totalObesity = data.features.reduce((acc, feature) => acc + feature.properties.Obesity, 0);
        const averageObesity = totalObesity / data.features.length;
        res.json({ averageObesity: averageObesity.toFixed(4) });
    }
}