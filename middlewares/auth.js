/**
 * Vérifie que l'utilisateur est connecté (session active).
 * Bloque l'accès sinon.
 */
exports.isAuthenticated = (req, res, next) => {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ message: 'Non authentifié, veuillez vous connecter' });
  }
  next();
};