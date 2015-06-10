var backbone = require("backbone");
var db = require("../db");

var LOAD_NAME = "SELECT name FROM recipe WHERE name = $name";
var LOAD_INGREDIENTS = "SELECT ingredientName FROM recipe_ingredients WHERE recipeName = $name";

module.exports = backbone.Model.extend({
  defaults:{
    name:"",
    ingredientName: [],
    quantity: 0
  },
  loadRecipe: function(callback){
    var self = this;
    var nameQuery = db.connection.prepare(LOAD_NAME);
    var data = this.toJSON();
    nameQuery.get({
      $name: data.name
    }, function(err, loaded){
     //console.log(loaded)
      self.set(loaded);
      callback(err);
    });
  },
  loadIngredients: function(callback){
    //sets the variable equal to the model at the base level
    var self = this;
    var ingredientQuery = db.connection.prepare(LOAD_INGREDIENTS);
    var data = this.toJSON();
    //console.log(data)
    ingredientQuery.all({
      $name: data.name
    }, function(err, loaded){
      //console.log(loaded);
      self.set("ingredientName", loaded);
      //console.log(self.toJSON());
      callback(err);
    });
  }
});
