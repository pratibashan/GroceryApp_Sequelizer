'use strict';
module.exports = (sequelize, DataTypes) => {
  var shoppinglists = sequelize.define('shoppinglists', {
    name: DataTypes.STRING,
    street: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING
  }, {});
  shoppinglists.associate = function(models) {
    shoppinglists.hasMany(models.GroceryItem, { as : 'groceryitems', foreignKey : 'shopid'})

  };
  return shoppinglists;
};