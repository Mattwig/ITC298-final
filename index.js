var hapi = require("hapi");
var server = new hapi.Server();
var recipe = require("./recipe");

server.connection({port:8000});

server.start();

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

server.route({
  method:"GET",
  path:"/assets/{param*}",
  handler: {
    directory: {
     path: "public"
    }
  }
});

server.route({
    method:"GET",
    path:'/',
    handler: function(req, reply){
        reply.view("listing", recipe);
    }
});

server.route({
  method:"GET",
  path:"/input",
  handler:function(req, reply){
        reply.view("input");
  }
});
