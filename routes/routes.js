const axios = require('axios');
const cheerio = require('cheerio');
const db = require('../models');

module.exports = function (router) {
  router.get('/', function (req, res) {
    res.redirect('/articles');
  });

  router.get('/scrape', function (req, res) {
    axios.get('https://www.buzzfeed.com/').then(function (response) {
      var $ = cheerio.load(response.data);

      $('article h2').each(function (i, element) {
        var result = {};

        result.title = $(this).children('a').text();

        result.link = $(this).children('a').attr('href');

        db.Article.create(result)
          .then(function (dbArticle) {
            console.log(dbArticle);
          })
          .catch(function (err) {
            console.log(err);
          });
      });

      res.send('Scrape Complete!');
    });
  });

  router.get('/articles', function (req, res) {
    db.Article.find({})
      .then(function (dbArticle) {
        res.json(dbArticle);
      })
      .catch(function (err) {
        res.json(err);
      });
  });

  router.get('/articles/:id', function (req, res) {
    db.Article.findOne({ _id: req.params.id })
      .populate('note')
      .then(function (dbArticle) {
        res.json(dbArticle);
      })
      .catch(function (err) {
        res.json(err);
      });
  });

  router.get('/articles/:id', function (req, res) {
    db.Note.create(req.body)
      .then(function (dbNote) {
        return db.Article.findOneAndUpdate(
          { _id: req.params.id },
          { note: dbNote._id },
          { new: true }
        );
      })
      .then(function (dbArticle) {
        res.json(dbArticle);
      })
      .catch(function (err) {
        res.json(err);
      });
  });
};
