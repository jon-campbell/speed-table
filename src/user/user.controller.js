(function(userController) {
  "use strict";

  userController.init = init;

  var userRepository = require("./user.repository");

  function init(app) {
    app.get("/user", function(req, res) {
      userRepository.getAll(function(error, users) {
        res.send(users);
      });
    });
  };

})(module.exports);
