var Recipe = require("../models/recipe");
var User = require("../models/user")
var async = require("async");

module.exports = function(req, reply){
  var name = req.params.name;
  if(name == "new"){
    reply.view("input");
  }
  else{
    var model = new Recipe({
      name: name
    });
    model.set("name", name);
    async.parallel([
      function(callback){
        model.loadRecipe(function(err){
          callback(err);
        });
      }, function(callback){
        model.loadIngredients(function(err){
          callback(err);
        });
      }], function(){
        var data = model.toJSON();
        reply.view("recipe", {
          name: data.name,
          ingredients: data.ingredientList,
          quantity: data.quantity
        });
      }
  )}
  };
