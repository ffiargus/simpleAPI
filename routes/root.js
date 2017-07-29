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

    data.saveEvent(req.body, (err, result) => {
      res.status(201).send();
    });
  });

  home.delete('/events/:id', (req, res) => {
    data.deleteEvent(req.params.id, (err, result) => {
      res.status(201).send();
    });
  });



  return home;
}