
const Sequelize = require('sequelize');
const db = require('../config/database');

const Role = db.define(
    'roles',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      roleName: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    },
    {
        schema: 'public',
        freezeTableName: true,
    }
);

module.exports = Role