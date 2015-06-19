var backbone = require("backbone");
var db = require("../db");
var basic = require("hapi-auth-basic");
var bcrypt = require("bcrypt");

var ADD = "INSERT INTO users VALUES($username, $password)";
var SELECT = "SELECT * FROM users WHERE username = $username";

module.exports = backbone.Model.extend({
  defaults: {
    username: "admin",
    password:"password"
  },
  register: function(payload){
   var self = this;
   bcrypt.hash(payload.password,8, function(err, hash){
     var q = db.connection.prepare(ADD);
     q.run({
       $username: payload.username,
       $password: hash
     });
   });
  },
  validate: function(callback){
    var self = this;
    var q = db.connection.prepare(SELECT);
    
    
  }
});