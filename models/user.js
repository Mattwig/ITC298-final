var backbone = require("backbone");
var db = require("../db");
var basic = require("hapi-auth-basic");
var bcrypt = require("bcrypt");

var ADD = "INSERT INTO users VALUES($username, $password)";
var SELECT = "SELECT password FROM users WHERE username = $username";

module.exports = backbone.Model.extend({
  defaults: {
    username: "admin",
    password:"password"
  },
  // take user creds and load into database
  register: function(payload){
   var self = this;
   // uses bcrypt to hash and salt the password then save to the database in callback
   bcrypt.hash(payload.password,8, function(err, hash){
     var q = db.connection.prepare(ADD);
     q.run({
       $username: payload.username,
       $password: hash
     });
   });
  },
  validate: function(username, password, callback){
    var self = this;
    var q = db.connection.prepare(SELECT);
    // load users password from database and use bcrypt to compare against users input
    q.get({
      $username: username
    }, function(err,loaded){
      if(loaded === undefined){
        return callback(null, false);
      }
      console.log(loaded)
      bcrypt.compare(password, loaded.password, function(err, isValid){
        callback(err, isValid, {});
      });
    });
  }
});