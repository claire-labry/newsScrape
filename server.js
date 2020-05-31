const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const exphbs = require('express-handlebars');

// Connect Database

mongoose.connect('mongodb://localhost/news_scrape', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Mongoose Connection
var MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost/mongoHeadlines';

mongoose.connect(MONGODB_URI);

// Initializes Express
const app = express();

// Configure middleware
app.use(logger('dev'));
// Parses request body as JSON
app.use(express.json());

// Makes public a static folder
app.use(express.static('public'));

// Sets up handlebars connection
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Router connection
require('./routes/routes')(app);

// Starts the server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
