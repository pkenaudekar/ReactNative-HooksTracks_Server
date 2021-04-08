require('./models/User');
require('./models/Track');
const express = require('express');
const mongoose = require('mongoose');
const key = require('../config/dev');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const trackRouter = require('./routes/trackRoutes');
const requireAuth = require('./middlewares/requireAuth');

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRouter);

mongoose.connect(key.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to mongo instance');
});

mongoose.connection.on('error', (err) => {
  console.log('Error connecting to mongo', err);
});

app.get('/', requireAuth, (req, res) => {
  res.send(`Your email:${req.user.email}`);
});

app.listen(3000, () => {
  console.log('Listening to port 3000');
});
