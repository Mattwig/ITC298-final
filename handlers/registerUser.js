var db = require("../db");
var User = require("../models/user");

module.exports = function(req, reply){
  var payload = req.payload;
  var model = new User();
  console.log(payload)
  model.register(payload);
  return reply.redirect("/");
};
