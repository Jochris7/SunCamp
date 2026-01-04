const Reservation = require('../models/Reservation');

exports.createReservation = async (req, res) => {
    try {
        const newReservation = new Reservation({
            ...req.body,
            statutPaiement: 'en attente'
        });

        const savedReservation = await newReservation.save();
        
        res.status(201).json({
            message: "Réservation enregistrée ! Veuillez procéder au paiement.",
            reservationId: savedReservation._id,
            montantAPayer: `${savedReservation.montantTotal} CFA`
        });
    } catch (error) {
        res.status(400).json({ message: "Erreur lors de la réservation", error: error.message });
    }
};


exports.getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find().populate('colonie', 'titre prix');
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};


exports.getReservationById = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id).populate('colonie');
        if (!reservation) return res.status(404).json({ message: "Réservation introuvable" });
        res.status(200).json(reservation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteReservation = async (req, res) => {
    try {
        const deletedReservation = await Reservation.findByIdAndDelete(req.params.id);
        
        if (!deletedReservation) {
            return res.status(404).json({ message: "Réservation introuvable pour suppression" });
        }
        
        res.status(200).json({
            message: "Réservation supprimée avec succès",
            id: req.params.id
        });
    } catch (error) {
        res.status(500).json({
            message: "Erreur lors de la suppression de la réservation",
            error: error.message
        });
    }
};