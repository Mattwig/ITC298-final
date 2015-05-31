var backbone = require("backbone");
var db = require("../db");

var LOAD = "SELECT * FROM recipe";

module.exports = backbone.Model.extend({
  defaults:{
    name:"",
    ingredient: [],
    quantity: 0
  },
  load: function(done){
    var self = this;
    var query = db.connection.prepare(LOAD);
    var data = this.toJSON();
    query.get({
      
    }, function(err, loaded){
      self.set(loaded);
    });
  }
});
