const mongoose = require('mongoose');

/**
 * Connecte l'application à la base MongoDB.
 * L'URL de connexion est lue dans la variable d'environnement MONGO_URI.
 * @returns {Promise<void>}
 */
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connecté');
  } catch (error) {
    console.error('Erreur de connexion à MongoDB :', error.message);
    process.exit(1);
  }
}

module.exports = connectDB;