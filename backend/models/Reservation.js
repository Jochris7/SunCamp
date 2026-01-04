const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
    nom: String,
    prenom: String,
    dateNaissance: Date,
    type: { type: String, enum: ['enfant', 'adulte'] },
    allergies: String
});

const reservationSchema = new mongoose.Schema({
    colonie: { type: mongoose.Schema.Types.ObjectId, ref: 'Colonie', required: true },
    emailContact: { type: String, required: true },
    participants: [participantSchema],
    montantTotal: Number,
    statutPaiement: {
    type: String,
    enum: ['en attente', 'payé', 'annulé'],
    default: 'en attente'
    },
    methodePaiement: { type: String, enum: ['carte', 'mobile_money', 'agence'] },
    dateReservation: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Reservation', reservationSchema);