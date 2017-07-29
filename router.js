const express = require('express');
const index = require('./routes/root.js');

const router = express.Router();

router.route('/events.json')
  .get(index);

module.exports = router;