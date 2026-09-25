require('dotenv').config();
const express = require('express');
const session = require('express-session');
const connectDB = require('./config/db');

const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 2 }
}));

connectDB();

app.use('/catways', require('./routes/catways'));
app.use('/users', require('./routes/users'));

app.get('/', (req, res) => {
  res.send('Le serveur fonctionne');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));

app.use('/', require('./routes/auth'));