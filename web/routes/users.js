var express = require('express');
var router = express.Router();
var { client } = require('../../bot/index');
var bot = require('../utils/botClient');
/* GET home page. */
router.get('/', function (req, res, next) {
  const details = bot.gatherDetails(client);
  res.render('index', { details: details });
});

router.get('/commands', (req, res) => {
  const list = bot.commands(client);
  const details = bot.gatherDetails(client);
  res.render('pages/commands', { list: list, details: details });
});

router.get('/command/', (req, res) => {
  const details = bot.gatherDetails(client)
    res.render('pages/command.hbs', { details });
});

router.get('/about', (req, res) => {
  const details = bot.gatherDetails(client);
  res.render('pages/about', { details });
});

module.exports = router;
