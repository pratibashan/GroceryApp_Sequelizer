'use strict';
module.exports = (sequelize, DataTypes) => {
  var GroceryItem = sequelize.define('GroceryItem', {
    name: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    price: DataTypes.INTEGER
    
  }, {});
  GroceryItem.associate = function(models) {
    // associations can be defined here
  };
  return GroceryItem;
};