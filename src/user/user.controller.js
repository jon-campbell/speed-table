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

    app.post("/user", function(req, res){
      userRepository.save({
        name: req.body.name,
        times: req.body.times
      });
      res.sendStatus(201);
    });
  };

})(module.exports);
