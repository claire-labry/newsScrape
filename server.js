// NPM Packages/Dependencies

const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');

// Express Initalization
const PORT = process.env.PORT || 5000;
const app = express();

// Configure Middleware
// Parses request body as JSON
// Makes public a static folder
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Handlebar set up
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
require('./routes/routes')(app);

// MongoDB + Mongoose connection

const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost/mongoHeadlines';
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Starts the server

app.listen(PORT, () =>
  console.log(`Server has started on: http://localhost:${PORT}`)
);
