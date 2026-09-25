const User = require('../models/User');

/**
 * Connecte un utilisateur : vérifie l'email et le mot de passe,
 * puis ouvre une session.
 * @route POST /login
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email et mot de passe requis' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Identifiants incorrects' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Identifiants incorrects' });
    }

    req.session.userId = user._id;
    req.session.username = user.username;
    req.session.email = user.email;

    res.status(200).json({ message: 'Connexion réussie', username: user.username, email: user.email });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Déconnecte l'utilisateur en détruisant la session.
 * @route GET /logout
 */
exports.logout = (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      return res.status(500).json({ message: 'Erreur lors de la déconnexion' });
    }
    res.clearCookie('connect.sid');
    res.status(200).json({ message: 'Déconnexion réussie' });
  });
};