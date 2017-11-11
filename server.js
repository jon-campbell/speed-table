(function() {
  "use strict";
  const express = require("express");
  const app = express();

  app.set("view engine", "vash");

  app.use(express.static(__dirname + "/public"));

  app.get("/", function (req, res) {
    res.render("index", {title: "Speed Table"});
  });

  app.listen(8888, function () {
    //
  });
})(module.exports);
