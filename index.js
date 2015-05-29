var hapi = require("hapi");
var server = new hapi.Server();

server.connection({port:8000});

server.start();


var rec = {
  recepieList:[
    {name:"fried chicken"},
    {name:"mashed potatos"},
    {name:"beets"},
    {name:"secret sauce"}
  ]
};

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
        reply.view("recipie", rec);
    }
});

server.route({
  method:"GET",
  path:"/input",
  handler:function(req, reply){
        reply.view("input");
  }
});
