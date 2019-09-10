const express = require('express');
const validUrl = require('valid-url');
const urlShorter = require('../models/urlshorter');
const usageLogger = require('../models/usagelogger');

const router = express.Router();

router.post('/', async (req, res, next) => {
  const url = req.body['url'];

  if (!validUrl.isUri(url)) {
    res.status(400);
    return res.send({error: 'not valid url'});
  }
  const message = {
    source: url,
    shortUrl : 'http://localhost:8888/url/' + await urlShorter.add(url)
  };
  usageLogger.logMakeUrl(url);

  res.status(201);
  return res.send(message);
});

router.get('/:id', async (req, res, next) => {
  const id = req.params['id'];
  const url = await urlShorter.findById(id);

  if (!url) {
    res.status(404);
    next();
  } else {
    res.redirect(url);
    usageLogger.logVisitUrl(url);
  }
});

module.exports = router;