var hapi = require("hapi");
var server = new hapi.Server();
var Recipe = require("./models/recipe");
var async = require("async");
var db = require("./db");

server.connection({port:8000});

db.init(function(err) {
  if (err) {
    console.log(err)
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
