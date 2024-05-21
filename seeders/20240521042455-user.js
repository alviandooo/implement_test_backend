'use strict';

/** @type {import('sequelize-cli').Migration} */
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const hash = await bcrypt.hashSync('secret', 10);
    return queryInterface.bulkInsert('Users', [
      {
        id: uuidv4(),
        roleId: 1,
        fullName: 'Ridho',
        password: hash,
        email: 'ridho@mail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        roleId: 2,
        fullName: 'Muhammad',
        password: hash,
        email: 'muhammad@mail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
