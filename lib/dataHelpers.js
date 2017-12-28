//used for updating tweets using thier object id assigned by mongo
const ObjectId = require("mongodb").ObjectId;
//simple function used to sort events by timestamp
const sortNewestFirst = (a, b) => b.timestamp - a.timestamp;

module.exports = (db) => {
  return {
    getEvents: (callback) => {
      db.collection('events').find().toArray((err, results) => {
        if (err) throw err;
        callback(null, results.sort(sortNewestFirst));
      });
    },

    saveEvent: (newEvent, callback) => {
      db.collection('events').insertOne(newEvent);
      callback(null, true);
    },

    deleteEvent: (event, callback) => {
      db.collection('events').remove({'_id': ObjectId(event)});
      callback(null, true);
    },

    getInvites: (callback) => {
      db.collection('invites').find().toArray((err, results) => {
        if (err) throw err;
        callback(null, results.sort(sortNewestFirst));
      });
    },

    getInvite: (inviteId, callback) => {
      db.collection('invites').findOne({ '_id': new ObjectId(inviteId) }, (err, results) => {
        if (err) throw err;
        callback(null, results);
      });
    },

    addInvite: (newInvitee, callback) => {
      db.collection('events').insertOne(newInvitee);
      callback(null, true);
    },

    updateInvite: (invitee, callback) => {
      db.collection('invites').findOneAndUpdate({ '_id': new ObjectId(invitee._id) }, { $set: { invitee } });
      callback(null, true)
    },
  }
}