'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Check if column already exists to prevent errors
    const tableInfo = await queryInterface.describeTable('Articles')
    if (!tableInfo.authorId) {
      await queryInterface.addColumn('Articles', 'authorId', {
        type: Sequelize.STRING,
        allowNull: false,
        comment: 'Clerk user ID',
        defaultValue: 'unknown' // Adding a default to handle existing records
      })
    }

    if (!tableInfo.authorName) {
      await queryInterface.addColumn('Articles', 'authorName', {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Unknown Author'
      })
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Articles', 'authorId')
    await queryInterface.removeColumn('Articles', 'authorName')
  }
}
