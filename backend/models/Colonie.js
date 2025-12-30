const mongoose = require('mongoose');

const colonieSchema = new mongoose.Schema({
    titre: { type: String, required: true },
    description: { type: String, required: true },
    images: [{ type: String }],
    prix: { type: Number, required: true },
    duree: { type: String, required: true },
    destination: { type: String, required: true },
    activites: [{ type: String }],
    placesDisponibles: { type: Number, default: 20 },
    dateCreation: { type: Date, default: Date.now },
},{timestamps:true});

module.exports = mongoose.model('Colonie', colonieSchema);