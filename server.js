const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cheerio = require('cheerio');
const exphbs = require('express-handlebars');

// Initializes Express
const app = express();

// Configure middleware
app.use(express.urlencoded({ extended: true }));
// Parses request body as JSON
app.use(express.json());

// Makes public a static folder
app.use(express.static('public'));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Starts the server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server has started on ${PORT}`));
