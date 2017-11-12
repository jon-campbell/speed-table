(function(userRepository) {
  "use strict";

  userRepository.getAll = getAll;

  var data = require('../data');

  function getAll(callback) {
    data.getDb(function (error, db) {
      db.users.find({}).toArray(function(err, result) {
        callback(err, result);
      });
    });
  };

})(module.exports);