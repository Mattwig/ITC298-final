var async = require("async");
var sqlite = require("sqlite3");
var db;

// creates an object to be passed into the model to be manipulated
var placeholder = {
  connection:null,
  init: function(ready){
    db = new sqlite.Database("recipe.db", function(err){
      if(err){
        console.error("cant open db");
        process.exit(1);
      }
    });

    placeholder.connection = db;
    

    async.waterfall([
      //create recipes table and insert values via callback after table is created
      function(c){
        db.run("CREATE TABLE IF NOT EXISTS recipe(name);",c);
      },
      //create ingredients table
      function(c){
        db.run("CREATE TABLE IF NOT EXISTS ingredients(name, quantity, recipeName)", c);
      },
      function(c){
        db.run("CREATE TABLE IF NOT EXISTS users(username, password, favorites)", c);
      }
    ],
    function(err){
        if (ready) ready(err);
    });
  },
  getRecipes: function(c){
    db.all("SELECT * FROM recipe",c);
  },
  addRecipe: function(payload){
    db.run("INSERT INTO recipe VALUES ($name)", {
      $name: payload.name
    });
  }
};

module.exports = placeholder;
