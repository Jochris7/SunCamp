const express = require('express');
const router = express.Router();
const admin = require('../controllers/Admin.Controller');

router.post('/register', admin.createAdmin);
router.post('/login', admin.loginAdmin);
router.get('/', admin.getAllAdmins);

module.exports = router;