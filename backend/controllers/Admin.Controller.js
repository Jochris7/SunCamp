const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()


exports.createAdmin = async (req, res) => {
    try {
        const { email, password, nom } = req.body;

        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: "Cet email est déjà utilisé." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newAdmin = await Admin.create({
            email,
            password: hashedPassword,
            nom
        });

        res.status(201).json({
            message: "Administrateur créé avec succès !",
            adminId: newAdmin._id
        });

    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la création", error: error.message });
    }
};

exports.loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: "Email ou Mot de passe incorrect." });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Email ou Mot de passe incorrect." });
        }

        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET ,{ expiresIn: '1h' });

        res.status(200).json({
            message: "Connexion réussie",
            token,
            admin: { id: admin._id, nom: admin.nom, email: admin.email }
        });

    } catch (error) {
        res.status(500).json({ message: "Erreur de connexion", error: error.message });
    }
};

exports.getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.find().select('-password');
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};