const express = require('express');
const app = express();
const home = express.Router();

module.exports = (data) => {
  home.get('/events.json', (req, res) => {
    data.getEvents((err, events) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(events);
      }
    });
  });

  home.post('/events', (req, res) => {
    console.log(req.body);
    // data.saveEvent()
  })
}