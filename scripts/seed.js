require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const Catway = require('../models/Catway');
const Reservation = require('../models/Reservation');

/**
 * Importe les fichiers catways.json et reservations.json dans la base MongoDB.
 * Supprime d'abord les collections existantes pour éviter les doublons.
 */
async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connecté pour l\'import');

    const catways = JSON.parse(fs.readFileSync('./catways.json', 'utf-8'));
    const reservations = JSON.parse(fs.readFileSync('./reservations.json', 'utf-8'));

    await Catway.deleteMany({});
    await Reservation.deleteMany({});

    await Catway.insertMany(catways);
    await Reservation.insertMany(reservations);

    console.log(`${catways.length} catways importés`);
    console.log(`${reservations.length} réservations importées`);

    process.exit(0);
  } catch (error) {
    console.error("Erreur lors de l'import :", error.message);
    process.exit(1);
  }
}

seed();