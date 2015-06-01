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
    console.log(db);
    
    async.waterfall([
      //create recipes table and insert values via callback after table is created
      function(c){
        db.run("CREATE TABLE IF NOT EXISTS recipe(name);",c);
      },
      //create ingredients table
      function(c){
      db.run("CREATE TABLE IF NOT EXISTS ingredients(name, quantity)", c);
      },
      function(c){
            db.run("INSERT INTO recipe VALUES ('five');");
            db.run("INSERT INTO recipe VALUES ('two');");
            db.run("INSERT INTO recipe VALUES ('three');", c);
      }
    ],
    function(err){
        if (ready) ready(err);
    });
  },
  getRecipes: function(c){
    console.log(db);
    db.all("SELECT * FROM recipe",c);
  }
};

module.exports = placeholder;