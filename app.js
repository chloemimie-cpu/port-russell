require('dotenv').config();
const express = require('express');
const session = require('express-session');
const connectDB = require('./config/db');
const { isAuthenticated } = require('./middlewares/auth');
const dashboardController = require('./controllers/dashboardController');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 2 }
}));

connectDB();

app.use('/', require('./routes/auth'));
app.use('/catways', require('./routes/catways'));
app.use('/users', require('./routes/users'));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/dashboard', isAuthenticated, dashboardController.getDashboard);
app.get('/catways-page', isAuthenticated, (req, res) => {
  res.render('catways');
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/reservations-page', isAuthenticated, (req, res) => {
  res.render('reservations');
});
app.get('/users-page', isAuthenticated, (req, res) => {
  res.render('users');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));