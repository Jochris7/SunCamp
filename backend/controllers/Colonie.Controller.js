const Colonie = require('../models/Colonie');


exports.createColonie = async (req, res) => {
    try {
        let imagePaths = [];
        if (req.files) {
            imagePaths = req.files.map(file =>
                `${req.protocol}://${req.get('host')}/public/images/colonies/${file.filename}`
            );
        }

        const newColonie = new Colonie({
            ...req.body,
            images: imagePaths
        });

        const savedColonie = await newColonie.save();
        res.status(201).json(savedColonie);

    } catch (error) {
        res.status(400).json({
            message: "Erreur lors de la création",
            error: error.message
        });
    }
};

exports.getAllColonies = async (req, res) => {
    try {
        const colonies = await Colonie.find({});
        res.status(200).json(colonies);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};


exports.getColonieById = async (req, res) => {
    try {
        const colonie = await Colonie.findById(req.params.id);
        if (!colonie) {
            return res.status(404).json({ message: "Colonie introuvable" });
        }
        res.status(200).json(colonie);
    } catch (error) {
        res.status(500).json({ message: "ID invalide ou erreur serveur", error: error.message });
    }
};


exports.updateColonie = async (req, res) => {
    try {
        const updatedColonie = await Colonie.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedColonie) {
            return res.status(404).json({ message: "Colonie introuvable pour mise à jour" });
        }
        res.status(200).json(updatedColonie);
    } catch (error) {
        res.status(400).json({ message: "Erreur lors de la mise à jour", error: error.message });
    }
};


exports.deleteColonie = async (req, res) => {
    try {
        const deletedColonie = await Colonie.findByIdAndDelete(req.params.id);
        if (!deletedColonie) {
            return res.status(404).json({ message: "Colonie introuvable pour suppression" });
        }
        res.status(200).json({ message: "Colonie supprimée avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression", error: error.message });
    }
};