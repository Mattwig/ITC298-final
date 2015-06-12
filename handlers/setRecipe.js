var db = require("../db");


module.exports = function(req, reply){
    var payload = req.payload;
    db.addRecipe(payload);
    return reply.redirect("/");
};