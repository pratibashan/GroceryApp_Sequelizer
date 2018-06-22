'use strict';



module.exports = {
  up: (queryInterface, Sequelize) => {

    queryInterface.addColumn(
      'GroceryItems',
      'shopid',{
        type : Sequelize.INTEGER,
        allowNull : false,
        references : {
          model : 'shoppinglists',
          key : 'id'
        }
      }
    )

  },

  down: (queryInterface, Sequelize) => {

      queryInterface.removeColumn(
        'GroceryItems',
        'shopid'
      )

  }
};