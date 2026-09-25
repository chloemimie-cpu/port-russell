const Reservation = require('../models/Reservation');
const Catway = require('../models/Catway');

/**
 * Récupère toutes les réservations d'un catway donné.
 * @route GET /catways/:id/reservations
 */
exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({ catwayNumber: req.params.id });
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Récupère une réservation précise d'un catway.
 * @route GET /catways/:id/reservations/:idReservation
 */
exports.getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findOne({
      _id: req.params.idReservation,
      catwayNumber: req.params.id
    });
    if (!reservation) {
      return res.status(404).json({ message: 'Réservation introuvable' });
    }
    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Crée une réservation pour un catway.
 * Vérifie que le catway existe avant de créer la réservation.
 * @route POST /catways/:id/reservations
 */
exports.createReservation = async (req, res) => {
  try {
    const catway = await Catway.findOne({ catwayNumber: req.params.id });
    if (!catway) {
      return res.status(404).json({ message: 'Catway introuvable' });
    }

    const { clientName, boatName, startDate, endDate } = req.body;
    const reservation = await Reservation.create({
      catwayNumber: req.params.id,
      clientName,
      boatName,
      startDate,
      endDate
    });
    res.status(201).json(reservation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Modifie une réservation existante.
 * @route PUT /catways/:id/reservations/:idReservation
 */
exports.updateReservation = async (req, res) => {
  try {
    const { clientName, boatName, startDate, endDate } = req.body;

    if (!clientName || !boatName || !startDate || !endDate) {
      return res.status(400).json({ message: 'Tous les champs sont requis' });
    }

    if (new Date(endDate) <= new Date(startDate)) {
      return res.status(400).json({ message: 'La date de fin doit être postérieure à la date de début' });
    }

    const reservation = await Reservation.findOneAndUpdate(
      { _id: req.params.idReservation, catwayNumber: req.params.id },
      { clientName, boatName, startDate, endDate },
      { new: true }
    );
    if (!reservation) {
      return res.status(404).json({ message: 'Réservation introuvable' });
    }
    res.status(200).json(reservation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Supprime une réservation.
 * @route DELETE /catways/:id/reservations/:idReservation
 */
exports.deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findOneAndDelete({
      _id: req.params.idReservation,
      catwayNumber: req.params.id
    });
    if (!reservation) {
      return res.status(404).json({ message: 'Réservation introuvable' });
    }
    res.status(200).json({ message: 'Réservation supprimée' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};