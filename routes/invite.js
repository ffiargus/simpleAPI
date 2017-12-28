const express = require('express');
const app     = express();
const invite    = express.Router();

module.exports = (data) => {
  invite.get('/', (req, res) => {
    data.getInvites((err, events) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(events);
      }
    });
  });

  invite.get('/:id', (req, res) => {
    data.getInvite(req.params.id, (err, invite) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(invite);
      }
    });
  });

  invite.post('/', (req, res) => {
    data.addInvite(req.body, (err, result) => {
      res.status(201).send();
    });
  });

  invite.put('/:id', (req, res) => {
    data.updateInvite(req.body, (err, result) => {
      res.status(201).send();
    });
  });

  return invite;
}