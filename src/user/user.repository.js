(function(userRepository) {
  "use strict";

  userRepository.getAll = getAll;
  userRepository.save = save;

  var data = require('../data');

  function getAll(callback) {
    data.getDb(function (error, db) {
      db.users.find({}).toArray(function(err, result) {
        callback(err, result);
      });
    });
  };

  function save(user) {
    data.getDb(function(error, db) {
      db.users.insert(user);
    });
  };

})(module.exports);
