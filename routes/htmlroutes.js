const db = require('../models');

module.exports = function (app) {
  app.get('/', function (req, res) {
    //displays the scraped articles on index page
    db.Article.find({})
      .lean()
      .then(function (data) {
        res.render('index', {
          message: 'Your Daily Inspiring News',
          article: data,
          nothing: 'Get Articles',
        });
      })
      .catch(function (err) {
        res.json(err);
      });
  });
  // displays the saved news on the saved page
  app.get('/saved', function (req, res) {
    db.Article.find({ saved: true })
      .lean()
      .then(function (data) {
        res.render('saved', {
          message: 'Your saved news',
          saved: data,
          nothing: 'You have no saved articles',
        });
      });
  });
};
