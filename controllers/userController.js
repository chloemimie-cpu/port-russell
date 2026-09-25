const User = require('../models/User');

/**
 * Récupère la liste de tous les utilisateurs.
 * @route GET /users
 */
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Récupère un utilisateur par son email.
 * @route GET /users/:email
 */
exports.getUserByEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email }).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur introuvable' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Crée un nouvel utilisateur.
 * @route POST /users
 */
exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.create({ username, email, password });
    const userWithoutPassword = { _id: user._id, username: user.username, email: user.email };
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Modifie les informations d'un utilisateur.
 * @route PUT /users/:email
 */
exports.updateUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const updateData = {};
    if (username) updateData.username = username;

    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur introuvable' });
    }

    if (username) user.username = username;
    if (password) user.password = password;
    await user.save();

    res.status(200).json({ _id: user._id, username: user.username, email: user.email });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Supprime un utilisateur.
 * @route DELETE /users/:email
 */
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur introuvable' });
    }
    res.status(200).json({ message: 'Utilisateur supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};