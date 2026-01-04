const Contact = require('../models/Contact');


exports.createInformation = async (req, res) => {
    try {
        const newContact = await Contact.create(req.body);
        res.status(201).json(newContact);
    } catch (error) {
        res.status(400).json({ message: "Erreur lors de l'envoi du message", error: error.message });
    }
};

exports.getAllInfos = async (req, res) => {
    try {
        const contacts = await Contact.find({}).sort({ dateReception: -1 });
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

exports.getOneInfo = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: "Message introuvable" });
        }
        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({ message: "ID invalide", error: error.message });
    }
};

exports.deleteOneInfo = async (req, res) => {
    try {
        const deletedContact = await Contact.findByIdAndDelete(req.params.id);
        if (!deletedContact) {
            return res.status(404).json({ message: "Message introuvable pour suppression" });
        }
        res.status(200).json({ message: "Message supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression", error: error.message });
    }
};