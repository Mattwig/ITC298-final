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
    handler: require("./handlers/getRecipes")
  }, {
    method:"POST",
    path:"/getrecipe/{id?}",
    handler: require("./handlers/setRecipe")
  }, {
    method:"POST",
    path:"/register",
    handler: require("./handlers/register")
  }
];
