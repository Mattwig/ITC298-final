var backbone = require("backbone");

module.exports = backbone.Model.extend({
  defaults:{
    name:"stuff"
    ingredient: [],
    quantity: 0
  }
});
