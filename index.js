var hapi = require("hapi");
var server = new hapi.Server();

server.connection({port:8000});

server.start();


server.views({
    engines: {
        html: require("handlebars")
    },
    path: "templates",
    layoutPath: "layouts",
    layout: "default",
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
})



server.route({
    method:"GET",
    path:'/',
    handler: function(req, reply){
        reply.view("index");
    }
});

