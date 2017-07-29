
module.exports = (db) => {
  return {
    getEvents: (callback) => {
      db.collection('events').find().toArray((err, results) => {
        if (err) throw err;
        callback(null, results);
      });
    },

    saveEvent: (newEvent, callback) => {
      db.collection('events').insertOne(newEvent);
      callback(null, true);
    }
  }
}