var db = require("../db");

module.exports = function(req, reply){
    db.getRecipes(function(err, recipes){
      console.log(recipes);
      reply.view("listing", {
        recipes: recipes
      });
    });
  };