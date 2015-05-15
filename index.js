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
    layout: "default"
});



server.route({
    method:"GET",
    path:'/',
    handler: function(req, reply){
        reply.view("index");
    }
});
