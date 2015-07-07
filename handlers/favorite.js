var User = require("../models/user");

module.exports = function(req, reply){
  var user = new User()
  
  console.log(user.name)
  reply.redirect("/");
};