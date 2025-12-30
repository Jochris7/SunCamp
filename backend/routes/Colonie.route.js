const express = require('express');
const router = express.Router();
const colonieCtrl = require('../controllers/Colonie.Controller');

router.post('/', colonieCtrl.createColonie);          // POST http://localhost:3000/api/colonies
router.get('/', colonieCtrl.getAllColonies);         // GET  http://localhost:3000/api/colonies
router.get('/:id', colonieCtrl.getColonieById);      // GET  http://localhost:3000/api/colonies/ID_ICI
router.put('/:id', colonieCtrl.updateColonie);       // PUT  http://localhost:3000/api/colonies/ID_ICI
router.delete('/:id', colonieCtrl.deleteColonie);    // DEL  http://localhost:3000/api/colonies/ID_ICI

module.exports = router;