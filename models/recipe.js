var backbone = require("backbone");
var db = require("../db");

var LOAD_NAME = "SELECT name FROM recipe WHERE name = $name";
var LOAD_INGREDIENTS = "SELECT name, quantity FROM ingredients WHERE recipeName = $name";
var ADD_NAME = "INSERT INTO recipe VALUES ($name)";
var ADD_INGREDIENTS = "INSERT INTO ingredients VALUES($ingredientName, $quantity, $recipeName)";

module.exports = backbone.Model.extend({
  defaults:{
    name:"",
    ingredientList:{},
    quantity: {}
  },
  setRecipe: function(payload){
    var self = this;
    var nameQuery = db.connection.prepare(ADD_NAME);
    var ingredientQuery = db.connection.prepare(ADD_INGREDIENTS);
    console.log(payload)
    for(var i = 0; i < payload.ingredient.length; i++){
      console.log(i)
        ingredientQuery.run({
          $recipeName: payload.name,
          $ingredientName: payload.ingredient[i],
          $quantity: payload.quantity[i]
      });
    }
    nameQuery.run({
      $name: payload.name
    });
  },
  loadRecipe: function(callback){
    var self = this;
    var nameQuery = db.connection.prepare(LOAD_NAME);
    var data = this.toJSON();
    nameQuery.get({
      $name: data.name
    }, function(err, loaded){
      self.set(loaded);
      callback(err, loaded);
    });
  },
  loadIngredients: function(callback){
    //sets the variable equal to the model at the base level
    var self = this;
    var ingredientQuery = db.connection.prepare(LOAD_INGREDIENTS);
    var data = this.toJSON();
    ingredientQuery.all({
      $name: data.name
    }, function(err, loaded){
      self.set("ingredientList", loaded);
      callback(err, loaded);
    });
  }
});
