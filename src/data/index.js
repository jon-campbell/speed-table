(function(data) {
  "use strict";

  var mongodb = require("mongodb"),
      config = require("./config");

  data.getDb = getDb;

  function getDb(callback) {
    var theDb;
    if (!theDb) {
      mongodb.MongoClient.connect(config.connectionString, function(error, db) {
        if (error) {
          callback(error, null);
        } else {
          theDb = {
            db: db,
            users: db.collection("users")
          };
          callback(null, theDb);
        }
      });
    } else {
      callback(null, theDb);
    }

  };

})(module.exports);
