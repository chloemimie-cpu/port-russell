const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

/**
 * Schéma d'un utilisateur de la capitainerie.
 * @property {String} username - Nom d'utilisateur.
 * @property {String} email - Adresse de messagerie, unique.
 * @property {String} password - Mot de passe, stocké haché.
 */
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Le nom d'utilisateur est obligatoire"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "L'email est obligatoire"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Adresse email invalide']
  },
  password: {
    type: String,
    required: [true, 'Le mot de passe est obligatoire'],
    minlength: [8, 'Le mot de passe doit contenir au moins 8 caractères']
  }
});

/**
 * Hache le mot de passe avant chaque sauvegarde, si celui-ci a été modifié.
 */
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

/**
 * Compare un mot de passe en clair avec le mot de passe haché stocké.
 * @param {String} candidatePassword - Mot de passe à vérifier.
 * @returns {Promise<Boolean>} Vrai si le mot de passe correspond.
 */
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);