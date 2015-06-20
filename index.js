var hapi = require("hapi");
var basic = require("hapi-auth-basic");
var Recipe = require("./models/recipe");
var async = require("async");
var db = require("./db");
var User = require("./models/user");

// module to encrypt passwords
var Bcrypt = require("bcrypt");


var server = new hapi.Server();
server.connection({port:8000});

// register scheme of basic from the hapi-auth-basic module
// create a strategty that uses the basic scheme and takes a function
// that is passed from out user model
server.register(basic, function(err){
  var user = new User();
  server.auth.strategy('simple', 'basic', {validateFunc: user.validate});
});

db.init(function(err) {
  if (err) {
    console.log(err);
    return console.error("broken");
  }
  console.log("Database ready, starting server...");
  server.start(function() {
    console.log("Server ready!");
  });
});


server.views({
    engines: {
        html: require("handlebars")
    },
    path: "templates",
    layoutPath: "layouts",
    layout: "default",
    partialsPath:"templates/partials",
    isCached:false
});

server.route(require("./routes"));
