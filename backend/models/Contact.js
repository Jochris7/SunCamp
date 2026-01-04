const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    nomComplet: { type: String, required: true },
    email: { type: String, required: true },
    sujet: { type: String, required: true },
    message: { type: String, required: true },
    lu: { type: Boolean, default: false },
    dateReception: { type: Date, default: Date.now }
    },{timestamps:true});

module.exports = mongoose.model('Contact', contactSchema);