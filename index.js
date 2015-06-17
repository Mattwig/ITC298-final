var hapi = require("hapi");
var basic = require("hapi-auth-basic");
var Recipe = require("./models/recipe");
var async = require("async");
var db = require("./db");
var Bcrypt = require("bcrypt")


var server = new hapi.Server();
server.connection({port:8000});

var users = {
    admin: {
        username: 'admin',
        password: '$2a$10$iqJSHD.BGr0E2IxQwYgJmeP3NvhPrXAeLSaGCj6IR/XU5QtjVu5Tm',   // 'secret'
        name: 'admin',
        id: '2'
    }
};


var validate = function (username, password, callback) {
  var user = users[username];
  if (!user) {
    console.log("nope");
    return callback(null, false);
  }
  Bcrypt.compare(password, user.password, function(err, isValid){
    console.log(isValid);
    callback(err, isValid, {id: user.id, name: user.name});
  });
};


server.register(basic, function(err){
  server.auth.strategy('simple', 'basic', {validateFunc: validate});
  server.route({
    method: 'GET',
    path: '/auth',
    config: {
      auth: 'simple',
      handler: function(req, reply){
        reply("hello, " +request.auth.credientals.name);
      }
    }
  });
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
