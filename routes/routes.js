const db = require('../models');
const axios = require('axios');
const cheerio = require('cheerio');

module.exports = function (app) {
  app.get('/scrape', function (req, res) {
    axios.get('https://www.buzzfeed.com/').then(function (response) {
      const $ = cheerio.load(response.data);

      $('article data-buzzblock').each(function (i, element) {
        let result = {};

        // Main Headlines
        result.title = $(this)
          .children('div')
          .children('div')
          .children('a')
          .children('h2')
          .attr('featured-card_headline link-gray');

        // Sub Headlines
        result.title = $(this)
          .children('div')
          .children('div')
          .children('div')
          .children('h2')
          .children('a')
          .attr('js-card__link link-gray');

        // Link to Main Headlines
        result.link = $(this)
          .children('div')
          .children('div')
          .children('div')
          .children('a')
          .attr('href');

        // Link to subheadlines
        result.link = $(this)
          .children('div')
          .children('div')
          .children('div')
          .children('h2')
          .children('a')
          .attr('href');

        // Image for headlines
        result.img = $(this)
          .children('div')
          .children('div')
          .attr('wire-frame__img featured-image xs-relative card__image--big');

        db.Article.findOne({ title: result.title }, function (err, found) {
          if (err) {
            console.log(err);
          }
          if (found) {
            console.log('This article has been scraped!');
          } else {
            db.Article.create(result)
              .then(function (dbArticle) {
                console.log(dbArticle);
              })
              .catch(function (err) {
                console.log(err);
              });
          }
        });
      });

      res.send('Scrape Complete!');
    });
  });

  app.get('/', function (req, res) {
    db.Article.find()
      .lean()
      .then(function (data) {
        res.render('index', {
          message: 'Your scraped news',
          article: data,
          nothing: 'Click button for articles',
        });
      })
      .catch(function (err) {
        res.json(err);
      });
  });

  app.get('/articles', function (req, res) {
    db.Article.find({})
      .then(function (dbArticle) {
        res.json(dbArticle);
      })
      .catch(function (err) {
        res.json(err);
      });
  });

  app.get('/articles/:id', function (req, res) {
    db.Article.findOne({ _id: req.params.id })
      .populate('note')
      .then(function (dbArticle) {
        res.json(dbArticle);
      })
      .catch(function (err) {
        res.json(err);
      });
  });

  app.get('/articles/:id', function (req, res) {
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
