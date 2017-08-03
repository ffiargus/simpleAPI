//used for updating tweets using thier object id assigned by mongo
const ObjectId = require("mongodb").ObjectId;
//simple function used to sort events by timestamp
const sortNewestFirst = (a, b) => a.timestamp - b.timestamp;

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
    }
  }
}