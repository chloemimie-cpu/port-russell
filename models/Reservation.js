const mongoose = require('mongoose');

/**
 * Schéma d'une réservation de catway.
 * @property {Number} catwayNumber - Numéro du catway réservé.
 * @property {String} clientName - Nom du client.
 * @property {String} boatName - Nom du bateau.
 * @property {Date} startDate - Date de début de la réservation.
 * @property {Date} endDate - Date de fin de la réservation.
 */
const reservationSchema = new mongoose.Schema({
  catwayNumber: {
    type: Number,
    required: [true, 'Le numéro de catway est obligatoire']
  },
  clientName: {
    type: String,
    required: [true, 'Le nom du client est obligatoire'],
    trim: true
  },
  boatName: {
    type: String,
    required: [true, 'Le nom du bateau est obligatoire'],
    trim: true
  },
  startDate: {
    type: Date,
    required: [true, 'La date de début est obligatoire']
  },
  endDate: {
    type: Date,
    required: [true, 'La date de fin est obligatoire'],
    validate: {
      validator: function (value) {
        return value > this.startDate;
      },
      message: 'La date de fin doit être postérieure à la date de début'
    }
  }
}, { timestamps: true });

module.exports = mongoose.model('Reservation', reservationSchema);