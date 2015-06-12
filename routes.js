var db = require("./db");
var Recipe = require("./models/recipe");
var async = require("async");

module.exports = [
  {
    method:"GET",
    path:"/assets/{param*}",
    handler: {
      directory: {
        path: "public"
      }
    }
  }, {
    method:"GET",
    path:'/getrecipe/{name?}',
    handler:  require("./handlers/getRecipe")
}, {
  method:"GET",
  path:"/",
  handler:function(req, reply){
    db.getRecipes(function(err, recipes){
      console.log(recipes)
      reply.view("listing", {
        recipes: recipes
      });
    });
  }
}, {
  method:"POST",
  path:"/recipe/{id?}",
  handler:function(req, reply){
    var payload = req.payload;
    console.log(payload)
    db.addRecipe(payload);
    }
}, {
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
}
];
