const Catway = require('../models/Catway');

/**
 * Récupère la liste de tous les catways.
 * @route GET /catways
 */
exports.getAllCatways = async (req, res) => {
  try {
    const catways = await Catway.find();
    res.status(200).json(catways);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Récupère un catway par son numéro.
 * @route GET /catways/:id
 */
exports.getCatwayById = async (req, res) => {
  try {
    const catway = await Catway.findOne({ catwayNumber: req.params.id });
    if (!catway) {
      return res.status(404).json({ message: 'Catway introuvable' });
    }
    res.status(200).json(catway);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Crée un nouveau catway.
 * @route POST /catways
 */
exports.createCatway = async (req, res) => {
  try {
    const { catwayNumber, catwayType, catwayState } = req.body;
    const catway = await Catway.create({ catwayNumber, catwayType, catwayState });
    res.status(201).json(catway);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Modifie uniquement l'état d'un catway existant.
 * Le numéro et le type ne sont pas modifiables.
 * @route PUT /catways/:id
 */
exports.updateCatwayState = async (req, res) => {
  try {
    const { catwayState } = req.body;
    if (!catwayState) {
      return res.status(400).json({ message: "L'état (catwayState) est requis" });
    }
    const catway = await Catway.findOneAndUpdate(
      { catwayNumber: req.params.id },
      { catwayState },
      { new: true, runValidators: true }
    );
    if (!catway) {
      return res.status(404).json({ message: 'Catway introuvable' });
    }
    res.status(200).json(catway);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Supprime un catway.
 * @route DELETE /catways/:id
 */
exports.deleteCatway = async (req, res) => {
  try {
    const catway = await Catway.findOneAndDelete({ catwayNumber: req.params.id });
    if (!catway) {
      return res.status(404).json({ message: 'Catway introuvable' });
    }
    res.status(200).json({ message: 'Catway supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};