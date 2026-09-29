const Reservation = require('../models/Reservation');

/**
 * Affiche le tableau de bord avec les réservations en cours.
 * @route GET /dashboard
 */
exports.getDashboard = async (req, res) => {
  try {
    const today = new Date();
    const reservations = await Reservation.find({
      startDate: { $lte: today },
      endDate: { $gte: today }
    });

    res.render('dashboard', {
      username: req.session.username,
      email: req.session.email,
      today: today.toLocaleDateString('fr-FR'),
      reservations
    });
  } catch (error) {
    res.status(500).send('Erreur lors du chargement du tableau de bord');
  }
};