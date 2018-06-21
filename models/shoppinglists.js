'use strict';
module.exports = (sequelize, DataTypes) => {
  var shoppinglists = sequelize.define('shoppinglists', {
    name: DataTypes.STRING,
    street: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING
  }, {});
  shoppinglists.associate = function(models) {
    // associations can be defined here
  };
  return shoppinglists;
};