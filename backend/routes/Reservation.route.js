const express = require('express');
const router = express.Router();
const reservationCtrl = require('../controllers/Reservation.Controller');

router.post('/', reservationCtrl.createReservation);
router.get('/', reservationCtrl.getAllReservations);
router.get('/:id', reservationCtrl.getReservationById);
router.delete('/:id', reservationCtrl.deleteReservation);

module.exports = router;