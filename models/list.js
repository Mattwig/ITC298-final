var backbone = require("backbone");

module.exports = backbone.Model.extend({
  defaults:{
    ingredient: "",
    quantity: 0
  }  
});
