
const Sequelize = require('sequelize');
const db = require('../config/database');
const Role = require('./role');

const User = db.define(
    'Users',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.UUIDV4
      },
      roleId: {
        type: Sequelize.INTEGER
      },
      fullName: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      email: {
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

User.belongsTo(Role,{
  as: "role",
  foreignKey: "roleId",
  targetKey: "id",
})

module.exports = User