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
    path:'/getrecipe/{name?}',
    handler: function(req, reply){
      var name = req.params.name;
      var recipe;
      var ingredients;
      var model = new Recipe({
        name: name
      });
      model.set("name", name);
    
      model.loadRecipe(function(err){
        if (err){
          console.log(err);
        } else
        {
          recipe = model.toJSON();
          console.log("recipe name loaded" + recipe.name);
        }
      });
      model.loadIngredients(function(err){
        if (err){console.log(err)}
        else {
        ingredients = model.toJSON();
        console.log("ingredients loaded" + ingredients);
        }
      });
     
      reply.view("recipe",{
          name: recipe.name,
          ingredients: ingredients
      });
    }
});

server.route({
  method:"GET",
  path:"/",
  handler:function(req, reply){
   db.getRecipes(function(err, recipes){
    reply.view("listing", {
      recipes: recipes
    });
   });
  }
});

server.route({
  method:"POST",
  path:"/recipe/{id?}",
  handler:function(req, reply){
    var payload = req.payload;
    console.log(payload)
    db.addRecipe(payload);
    }
});

server.route({
  method:"GET",
  path:"/recipe/{id?}",
  handler:function(req, reply){
    var id = req.params.id;
    if(id == "new")reply.view("input");
    else{
      db.getRecipe(id, function(err, recipe){
        console.log(recipe.name)
        reply.view("recipe", {
          name: recipe.name
        });
      });
    }
  }
});
