var sqlite = require("sqlite3");
var async = require("async");



var db = new sqlite.Database("recipe.db");

db.run("CREATE TABLE IF NOT EXISTS recipe(name);", c)
db.run("CREATE TABLE IF NOT EXISTS ingredients(name, quantity)")
