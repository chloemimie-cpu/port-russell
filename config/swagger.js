const swaggerJsdoc = require('swagger-jsdoc');

/**
 * Configuration de la documentation Swagger de l'API.
 */
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Port de plaisance de Russell',
      version: '1.0.0',
      description: 'API de gestion des catways, réservations et utilisateurs pour la capitainerie.'
    },
    servers: [
      { url: 'http://localhost:3000', description: 'Serveur local' }
    ]
  },
  apis: ['./routes/*.js']
};

module.exports = swaggerJsdoc(options);