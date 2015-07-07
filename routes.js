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
    //user must be registered to post a new recipe
    method:"POST",
    path:"/getrecipe/{id?}",
    config: {
      auth: "simple",
      handler: require("./handlers/setRecipe")
    }
  }, {
    method:"POST",
    path:"/signin",
    handler: require("./handlers/registerUser")
  }, {
    method:"GET",
    path:"/signin",
    handler: require("./handlers/register")
  }, {
    method:"POST",
    path:"/register",
    handler: require("./handlers/registerUser")
  }, {
    method:"GET",
    path:"/register",
    handler: require("./handlers/register")
  }, {
    method:"POST",
    path:"/favorite/{name}",
    handler: require("./handlers/favorite")
  }
];
