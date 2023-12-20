"use strict";
module.exports = function (app) {
  var todoList = require("./appController");

  app.route("/storms").get(todoList.list_all_storm);
};
