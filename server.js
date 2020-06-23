// Dependancies
const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');

// Express Setup
const PORT = process.env.PORT || 5000;
const app = express();

// Middleware Setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Handlebar Setup
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
require('./routes/routes')(app);
require('./routes/htmlroutes')(app);

// MongoDB connection
const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost/mongoHeadlines';
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

// Starts the server
app.listen(PORT, () =>
  console.log(`Server has started on: http://localhost:${PORT}`)
);
