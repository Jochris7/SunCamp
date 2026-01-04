const express = require('express');
const router = express.Router();
const colonieCtrl = require('../controllers/Colonie.Controller');
const simpleUploader = require('../middlewares/simpleUploader')


router.post('/',simpleUploader, colonieCtrl.createColonie);
router.get('/', colonieCtrl.getAllColonies);
router.get('/:id', colonieCtrl.getColonieById);
router.put('/:id',simpleUploader, colonieCtrl.updateColonie);
router.delete('/:id', colonieCtrl.deleteColonie);

module.exports = router;