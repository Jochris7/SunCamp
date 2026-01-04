const express = require('express');
const router = express.Router();
const contactCtrl = require('../controllers/Contact.Controller');


router.post('/', contactCtrl.createInformation);
router.get('/', contactCtrl.getAllInfos);
router.get('/:id', contactCtrl.getOneInfo);
router.delete('/:id', contactCtrl.deleteOneInfo);

module.exports = router;