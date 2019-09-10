const express = require('express');
const logger = require('../models/usagelogger');

const router = express.Router();

router.get('/', async (req, res, next) => {
  const url = req.query['url'];
  const usage = await logger.findUsage(url);

  return res.send(usage);
});

module.exports = router;