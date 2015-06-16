var db = require("../db");
var Recipe = require("../models/recipe");

module.exports = function(req, reply){
    var payload = req.payload;
    var model = new Recipe();
    model.setRecipe(payload);
    return reply.redirect("/");
};