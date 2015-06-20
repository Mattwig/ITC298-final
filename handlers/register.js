var db = require("../db");
var User = require("../models/user");

module.exports = function(req, reply){
  reply.view("register");
};
